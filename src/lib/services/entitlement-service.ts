import { HousingUsers } from "@/models/housingUser";

type GrantEntitlementInput = {
  userId: string;
  addressKey: string;
  planSlug: string | null;
  paidAt: Date;
};

export async function isAddressPaid(
  userId: string,
  addressKey: string,
): Promise<boolean> {
  const dbUser = await HousingUsers.findById(userId).lean<{
    paidListingAddresses?: string[];
  } | null>();

  return Boolean(dbUser?.paidListingAddresses?.includes(addressKey));
}

export async function grantAddressEntitlement({
  userId,
  addressKey,
  planSlug,
  paidAt,
}: GrantEntitlementInput): Promise<void> {
  void paidAt;
  await HousingUsers.updateOne(
    { _id: userId },
    {
      $addToSet: {
        paidListingAddresses: addressKey,
      },
      $set: {
        subscriptionPlan: planSlug,
        paymentStatus: "active",
      },
    },
  );
}

