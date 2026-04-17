import { HousingUsers } from "@/models/housingUser";
import { Payment } from "@/models/payment";
import {
  createFirstAddressQuotaToken,
  isFirstAddressQuotaToken,
} from "@/lib/entitlement-quota";

const MAX_TOKENS = 50;

type GrantEntitlementInput = {
  paymentId: string;
  userId: string;
  addressKey: string;
  planSlug: string | null;
  paidAt: Date;
  propertiesAllowed?: number;
};

export async function isAddressPaid(
  userId: string,
  addressKey: string,
): Promise<boolean> {
  const dbUser = await HousingUsers.findById(userId).lean<{
    paidListingAddresses?: string[];
  } | null>();

  const paidListingAddresses = dbUser?.paidListingAddresses ?? [];
  const hasRealAddressEntitlement = paidListingAddresses.includes(addressKey);
  const hasFirstAddressQuota = paidListingAddresses.some((token) =>
    isFirstAddressQuotaToken(token),
  );

  // If the owner paid from pricing without providing an address, we store a
  // one-time "first address quota" placeholder token. Treat it as paid for
  // any address until it is consumed on submission.
  return hasRealAddressEntitlement || hasFirstAddressQuota;
}

export async function grantAddressEntitlement({
  paymentId,
  userId,
  addressKey,
  planSlug,
  paidAt,
  propertiesAllowed,
}: GrantEntitlementInput): Promise<void> {
  void paidAt;
  const tokenCount = Math.min(
    MAX_TOKENS,
    Math.max(1, Math.trunc(Number(propertiesAllowed) || 1)),
  );
  const claim = await Payment.updateOne(
    { _id: paymentId, entitlementGranted: { $ne: true } },
    { $set: { entitlementGranted: true } },
  );
  if (claim.modifiedCount === 0) return;

  const extraTokens = Array.from({ length: tokenCount - 1 }, () =>
    createFirstAddressQuotaToken(userId),
  );

  await HousingUsers.updateOne(
    { _id: userId },
    {
      $addToSet: {
        paidListingAddresses: {
          $each: [addressKey, ...extraTokens],
        },
      },
      $set: {
        subscriptionPlan: planSlug,
        paymentStatus: "active",
      },
    },
  );
  console.info("[HS Entitlement] granted", {
    userId,
    paymentId,
    tokenCount,
  });
}

type ConsumeAddressQuotaInput = {
  userId: string;
  addressKey: string;
};

export async function consumeAddressQuotaIfNeeded({
  userId,
  addressKey,
}: ConsumeAddressQuotaInput): Promise<boolean> {
  const dbUser = await HousingUsers.findById(userId).lean<{
    paidListingAddresses?: string[];
  } | null>();

  const paidListingAddresses = dbUser?.paidListingAddresses ?? [];

  // Always try to remove a quota token if it exists.
  const quotaToken = paidListingAddresses.find((token) =>
    isFirstAddressQuotaToken(token),
  );

  // If the concrete address is already paid, we should not grant anything
  // new, but we *must* consume the quota token (if present) to prevent
  // unlocking other addresses later.
  if (paidListingAddresses.includes(addressKey)) {
    if (!quotaToken) return true;

    await HousingUsers.updateOne(
      { _id: userId },
      { $pull: { paidListingAddresses: quotaToken } },
    );

    return true;
  }

  if (!quotaToken) return false;

  // Mongo can reject a single update that modifies the same array field in
  // multiple ways (e.g. $pull + $addToSet) due to update path conflicts.
  // Do it in two safe steps: remove quota token, then add the real addressKey.
  await HousingUsers.updateOne(
    { _id: userId },
    { $pull: { paidListingAddresses: quotaToken } },
  );

  await HousingUsers.updateOne(
    { _id: userId },
    { $addToSet: { paidListingAddresses: addressKey } },
  );

  return true;
}

