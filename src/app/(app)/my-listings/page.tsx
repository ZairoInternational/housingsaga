import Link from "next/link";

import AccountPageHeader from "@/components/account/AccountPageHeader";
import OwnerListingsPreview from "@/components/profile/OwnerListingsPreview";
import ProfileShell from "@/components/profile/ProfileShell";
import { loadOwnerListings, requireAccount } from "@/lib/account";

export default async function MyListingsPage() {
  const account = await requireAccount("/my-listings");

  if (account.role !== "owner") {
    return (
      <ProfileShell>
        <AccountPageHeader
          eyebrow="Listings"
          title="My listings"
          subtitle="Listing management is available on property owner accounts."
        />
        <Link
          href="/dashboard"
          className="inline-flex rounded-full bg-lime-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-lime-700"
        >
          Go to dashboard
        </Link>
      </ProfileShell>
    );
  }

  const listings = await loadOwnerListings(account.userId);

  return (
    <ProfileShell>
      <AccountPageHeader
        eyebrow="Owner"
        title={`${account.name}'s listings`}
        subtitle="Review every property you have submitted, then edit, publish, or check verification status."
      />
      <OwnerListingsPreview listings={listings} showIntro={false} />
    </ProfileShell>
  );
}
