import bcrypt from "bcryptjs";
import { randomInt } from "crypto";
import mongoose from "mongoose";
import { cookies } from "next/headers";

import { renderOwnerAccessEmail } from "@/lib/email-templates/owner-access";
import { connectDb } from "@/lib/db";
import { sendEmail } from "@/lib/mailer";
import {
  ACCESS_GRANT_TTL_MS,
  SESSION_TTL_MS,
  OWNER_SESSION_COOKIE,
  clearAnonymousPinFailures,
  clientAddress,
  generateOwnerAccessToken,
  generateOwnerSessionToken,
  hashOwnerSecret,
  isAccessLocked,
  isAnonymousPinLocked,
  isValidOwnerPin,
  isValidOwnerSecret,
  nextPinFailure,
  registerAnonymousPinFailure,
} from "@/lib/owner-access-policy";
import { listPropertiesForOwner } from "@/lib/owner-properties";
import type { OwnerPortalProperty } from "@/lib/owner-access-policy";
import { HousingUsers } from "@/models/housingUser";
import { OwnerAccessGrant } from "@/models/ownerAccessGrant";
import { OwnerAccessSession } from "@/models/ownerAccessSession";

/**
 * Precomputed bcrypt hash used only to keep failed lookups on a similar
 * timeline when the access link does not exist. It is not a real PIN.
 */
const DUMMY_PIN_HASH = "$2b$10$QpQE/vYfc4wxHy6Y4Iz5vOglHLKXkqNLKSpJCxWLeYraWPzOR/auS";

export type OwnerAuthSuccess = {
  ok: true;
  sessionToken: string;
  mustSetPin: boolean;
};

export type OwnerAuthFailure = {
  ok: false;
  reason: "invalid" | "locked";
};

async function ensureDatabase(): Promise<void> {
  await connectDb();
  if (mongoose.connection.readyState !== 1) {
    throw new Error("Database unavailable");
  }
}

async function ownerIsActive(ownerId: mongoose.Types.ObjectId): Promise<boolean> {
  const owner = await HousingUsers.findById(ownerId).select("role");
  return owner?.role === "owner";
}

async function revokeSessionByRawToken(rawToken: string | undefined): Promise<void> {
  if (!rawToken || !isValidOwnerSecret(rawToken)) return;
  await OwnerAccessSession.updateOne(
    { sessionHash: hashOwnerSecret(rawToken), revokedAt: null },
    { $set: { revokedAt: new Date() } },
  );
}

async function revokeActiveGrantsForOwner(ownerId: mongoose.Types.ObjectId): Promise<void> {
  const now = new Date();
  const grants = await OwnerAccessGrant.find({ owner: ownerId, revokedAt: null }).select("_id");
  if (grants.length === 0) return;
  const accessIds = grants.map((grant) => grant._id);
  await OwnerAccessGrant.updateMany(
    { _id: { $in: accessIds } },
    { $set: { revokedAt: now } },
  );
  await OwnerAccessSession.updateMany(
    { accessId: { $in: accessIds }, revokedAt: null },
    { $set: { revokedAt: now } },
  );
}

/**
 * Creates a private owner link, stores only hashes, and emails the link plus a temporary PIN.
 * Previous links for this owner stop working.
 */
export async function createOwnerAccessLink(
  ownerId: string,
  origin: string,
): Promise<{ emailedTo: string }> {
  if (!mongoose.Types.ObjectId.isValid(ownerId)) {
    throw new Error("Owner not found");
  }

  await ensureDatabase();
  const owner = await HousingUsers.findById(ownerId).select("role email name");
  if (!owner || owner.role !== "owner" || !owner.email) {
    throw new Error("Owner not found");
  }

  await revokeActiveGrantsForOwner(owner._id);

  const pin = randomInt(0, 10000).toString().padStart(4, "0");
  const token = generateOwnerAccessToken();
  const pinHash = await bcrypt.hash(pin, 10);
  const grant = await OwnerAccessGrant.create({
    owner: owner._id,
    tokenHash: hashOwnerSecret(token),
    pinHash,
    expiresAt: new Date(Date.now() + ACCESS_GRANT_TTL_MS),
    revokedAt: null,
    failedAttempts: 0,
    lockedUntil: null,
    lastAuthenticatedAt: null,
    mustSetPin: true,
  });

  const accessUrl = `${origin.replace(/\/$/, "")}/owner-access/${token}`;
  try {
    const { subject, html, text } = renderOwnerAccessEmail({
      name: owner.name,
      accessUrl,
      pin,
    });
    await sendEmail({ to: owner.email, subject, html, text });
  } catch {
    await OwnerAccessGrant.deleteOne({ _id: grant._id });
    console.error("[owner-access] email failed");
    throw new Error("Email could not be sent");
  }

  return { emailedTo: owner.email };
}

/**
 * Creates a private owner link for a PIN the caller already has.
 * Only a hash of the token and PIN is stored.
 */
export async function issueOwnerAccessLink(input: {
  ownerId: string;
  pin: string;
  expiresAt?: Date;
}): Promise<{ token: string; path: string }> {
  if (!mongoose.Types.ObjectId.isValid(input.ownerId)) {
    throw new Error("Owner not found");
  }
  if (!isValidOwnerPin(input.pin)) {
    throw new Error("PIN must be 4 digits");
  }

  await ensureDatabase();
  const owner = await HousingUsers.findById(input.ownerId).select("role");
  if (!owner || owner.role !== "owner") {
    throw new Error("Owner not found");
  }

  const token = generateOwnerAccessToken();
  const pinHash = await bcrypt.hash(input.pin, 10);
  await OwnerAccessGrant.create({
    owner: owner._id,
    tokenHash: hashOwnerSecret(token),
    pinHash,
    expiresAt: input.expiresAt ?? new Date(Date.now() + ACCESS_GRANT_TTL_MS),
    revokedAt: null,
    failedAttempts: 0,
    lockedUntil: null,
    lastAuthenticatedAt: null,
    mustSetPin: true,
  });

  return { token, path: `/owner-access/${token}` };
}

/** Revokes an emailed link and every session created from it. */
export async function revokeOwnerAccessLink(token: string): Promise<void> {
  if (!isValidOwnerSecret(token)) return;
  await ensureDatabase();
  const grant = await OwnerAccessGrant.findOneAndUpdate(
    { tokenHash: hashOwnerSecret(token), revokedAt: null },
    { $set: { revokedAt: new Date() } },
  );
  if (!grant) return;
  await OwnerAccessSession.updateMany(
    { accessId: grant._id, revokedAt: null },
    { $set: { revokedAt: new Date() } },
  );
}

export async function authenticateOwnerAccess(input: {
  token: string;
  pin: string;
  request: Request;
}): Promise<OwnerAuthSuccess | OwnerAuthFailure> {
  const address = clientAddress(input.request);
  const now = new Date();

  if (isAnonymousPinLocked(address, now.getTime())) {
    return { ok: false, reason: "locked" };
  }

  const pin = input.pin.trim();
  const tokenLooksValid = isValidOwnerSecret(input.token);
  const pinLooksValid = isValidOwnerPin(pin);

  await ensureDatabase();

  const grant =
    tokenLooksValid
      ? await OwnerAccessGrant.findOne({ tokenHash: hashOwnerSecret(input.token) })
      : null;

  const grantUsable =
    Boolean(grant) &&
    !grant?.revokedAt &&
    grant!.expiresAt.getTime() > now.getTime() &&
    (await ownerIsActive(grant!.owner));

  if (!grant || !grantUsable) {
    await bcrypt.compare(pinLooksValid ? pin : "0000", DUMMY_PIN_HASH);
    const anonymous = registerAnonymousPinFailure(address, now.getTime());
    return { ok: false, reason: anonymous.locked ? "locked" : "invalid" };
  }

  if (isAccessLocked(grant.lockedUntil, now)) {
    await bcrypt.compare(pinLooksValid ? pin : "0000", grant.pinHash);
    return { ok: false, reason: "locked" };
  }

  const pinMatches = pinLooksValid && (await bcrypt.compare(pin, grant.pinHash));
  if (!pinMatches) {
    const failure = nextPinFailure(grant.failedAttempts ?? 0, now);
    await OwnerAccessGrant.updateOne(
      { _id: grant._id },
      {
        $set: {
          failedAttempts: failure.failedAttempts,
          lockedUntil: failure.lockedUntil,
        },
      },
    );
    const anonymous = registerAnonymousPinFailure(address, now.getTime());
    return { ok: false, reason: failure.locked || anonymous.locked ? "locked" : "invalid" };
  }

  clearAnonymousPinFailures(address);
  await OwnerAccessGrant.updateOne(
    { _id: grant._id },
    {
      $set: {
        failedAttempts: 0,
        lockedUntil: null,
        lastAuthenticatedAt: now,
      },
    },
  );

  const jar = await cookies();
  await revokeSessionByRawToken(jar.get(OWNER_SESSION_COOKIE)?.value);

  const sessionToken = generateOwnerSessionToken();
  await OwnerAccessSession.create({
    accessId: grant._id,
    ownerId: grant.owner,
    sessionHash: hashOwnerSecret(sessionToken),
    expiresAt: new Date(now.getTime() + SESSION_TTL_MS),
    revokedAt: null,
  });

  return { ok: true, sessionToken, mustSetPin: grant.mustSetPin === true };
}

/** Replaces the emailed temporary PIN. The new value is stored only as a hash. */
export async function setOwnerAccessPin(pin: string): Promise<"ok" | "invalid" | "same" | "unauthorized"> {
  if (!isValidOwnerPin(pin)) return "invalid";
  const auth = await getAuthenticatedOwner();
  if (!auth) return "unauthorized";

  await ensureDatabase();
  const grant = await OwnerAccessGrant.findOne({
    _id: auth.accessId,
    revokedAt: null,
    expiresAt: { $gt: new Date() },
    mustSetPin: true,
  });
  if (!grant) return "unauthorized";

  const matchesTemporaryPin = await bcrypt.compare(pin, grant.pinHash);
  if (matchesTemporaryPin) return "same";

  const pinHash = await bcrypt.hash(pin, 10);
  const updated = await OwnerAccessGrant.updateOne(
    { _id: grant._id, mustSetPin: true },
    { $set: { pinHash, mustSetPin: false, failedAttempts: 0, lockedUntil: null } },
  );
  return updated.modifiedCount === 1 ? "ok" : "unauthorized";
}

export async function getAuthenticatedOwner(): Promise<{
  ownerId: string;
  accessId: string;
} | null> {
  const jar = await cookies();
  const raw = jar.get(OWNER_SESSION_COOKIE)?.value;
  if (!raw || !isValidOwnerSecret(raw)) return null;

  await ensureDatabase();
  const now = new Date();
  const session = await OwnerAccessSession.findOne({
    sessionHash: hashOwnerSecret(raw),
    revokedAt: null,
    expiresAt: { $gt: now },
  });
  if (!session) return null;

  const grant = await OwnerAccessGrant.findOne({
    _id: session.accessId,
    revokedAt: null,
    expiresAt: { $gt: now },
  });
  if (!grant) return null;
  if (!(await ownerIsActive(grant.owner))) return null;

  return {
    ownerId: String(grant.owner),
    accessId: String(grant._id),
  };
}

export async function resolveOwnerPortal(urlToken: string): Promise<
  | { view: "pin" }
  | { view: "expired" }
  | { view: "set-pin" }
  | { view: "dashboard"; properties: OwnerPortalProperty[] }
> {
  if (!isValidOwnerSecret(urlToken)) {
    return { view: "expired" };
  }

  await ensureDatabase();
  const now = new Date();
  const grant = await OwnerAccessGrant.findOne({
    tokenHash: hashOwnerSecret(urlToken),
  }).select("_id revokedAt expiresAt mustSetPin");

  if (!grant || grant.revokedAt || grant.expiresAt.getTime() <= now.getTime()) {
    return { view: "expired" };
  }

  const auth = await getAuthenticatedOwner();
  if (!auth || auth.accessId !== String(grant._id)) {
    return { view: "pin" };
  }
  if (grant.mustSetPin === true) return { view: "set-pin" };
  const properties = await listPropertiesForOwner(auth.ownerId);
  return { view: "dashboard", properties };
}

export async function signOutOwnerAccess(): Promise<void> {
  const jar = await cookies();
  await ensureDatabase();
  await revokeSessionByRawToken(jar.get(OWNER_SESSION_COOKIE)?.value);
}
