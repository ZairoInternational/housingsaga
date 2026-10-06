import { createHash, randomBytes } from "crypto";

/** Cookie that carries the owner-portal session. The value is a random token; only its hash is stored. */
export const OWNER_SESSION_COOKIE = "hs_owner_session";

export const PIN_LENGTH = 4;
export const MAX_PIN_ATTEMPTS = 5;
export const LOCKOUT_MS = 15 * 60 * 1000;
/** How long a successful PIN login stays valid. */
export const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;
/** How long an emailed access link stays valid unless it is revoked earlier. */
export const ACCESS_GRANT_TTL_MS = 180 * 24 * 60 * 60 * 1000;

const TOKEN_PATTERN = /^[A-Za-z0-9_-]{43}$/;

export const INCORRECT_PIN_TITLE = "Incorrect PIN";
export const INCORRECT_PIN_MESSAGE = "Please check your PIN and try again.";
export const LOCKOUT_MESSAGE = "Too many incorrect attempts. Please try again later.";

export type OwnerPortalProperty = {
  id: string;
  name: string;
  location: string;
  propertyType: string;
  image: string | null;
  price: number | null;
  status: "available" | "sold";
};

export function isValidOwnerSecret(value: string): boolean {
  return TOKEN_PATTERN.test(value);
}

export function isValidOwnerPin(pin: string): boolean {
  return /^\d{4}$/.test(pin);
}

/** One-way hash for access links and session tokens. The raw value is never stored. */
export function hashOwnerSecret(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

export function generateOwnerAccessToken(): string {
  return randomBytes(32).toString("base64url");
}

export function generateOwnerSessionToken(): string {
  return randomBytes(32).toString("base64url");
}

export function isAccessLocked(lockedUntil: Date | null | undefined, now: Date): boolean {
  return Boolean(lockedUntil && lockedUntil.getTime() > now.getTime());
}

/**
 * Next lockout state after one failed PIN check.
 * The fifth failure starts a temporary lock and clears the counter so the
 * owner gets a fresh set of attempts when the lock expires.
 */
export function nextPinFailure(failedAttempts: number, now: Date): {
  failedAttempts: number;
  lockedUntil: Date | null;
  locked: boolean;
} {
  const next = failedAttempts + 1;
  if (next >= MAX_PIN_ATTEMPTS) {
    return {
      failedAttempts: 0,
      lockedUntil: new Date(now.getTime() + LOCKOUT_MS),
      locked: true,
    };
  }
  return { failedAttempts: next, lockedUntil: null, locked: false };
}

type AttemptBucket = { count: number; lockedUntil: number };

const anonymousAttempts = new Map<string, AttemptBucket>();

export function isAnonymousPinLocked(key: string, now = Date.now()): boolean {
  const bucket = anonymousAttempts.get(key);
  return Boolean(bucket && bucket.lockedUntil > now);
}

/** Slows repeated guesses against unknown links on this server process. */
export function registerAnonymousPinFailure(key: string, now = Date.now()): { locked: boolean } {
  const current = anonymousAttempts.get(key);
  if (current && current.lockedUntil > now) {
    return { locked: true };
  }
  const count = current && current.lockedUntil === 0 ? current.count + 1 : 1;
  if (count >= MAX_PIN_ATTEMPTS) {
    anonymousAttempts.set(key, { count: 0, lockedUntil: now + LOCKOUT_MS });
    return { locked: true };
  }
  anonymousAttempts.set(key, { count, lockedUntil: 0 });
  return { locked: false };
}

export function clearAnonymousPinFailures(key: string): void {
  anonymousAttempts.delete(key);
}

export function clientAddress(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

export function isSecureOwnerRequest(request: Request): boolean {
  if (process.env.NODE_ENV !== "production") return true;
  const forwarded = request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim();
  if (forwarded) return forwarded === "https";
  return new URL(request.url).protocol === "https:";
}

export function isSameOriginOwnerRequest(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  const host = request.headers.get("host");
  if (!host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export function ownerSessionCookie(maxAgeSeconds: number) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: maxAgeSeconds,
  };
}
