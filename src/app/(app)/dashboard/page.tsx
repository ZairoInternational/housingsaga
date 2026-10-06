import Link from "next/link";

import AccountPageHeader from "@/components/account/AccountPageHeader";
import WishlistGrid from "@/components/account/WishlistGrid";
import OwnerAccessLinkCard from "@/components/profile/OwnerAccessLinkCard";
import OwnerListingsPreview from "@/components/profile/OwnerListingsPreview";
import OwnerSummaryCards from "@/components/profile/OwnerSummaryCards";
import ProfileShell from "@/components/profile/ProfileShell";
import {
  loadOwnerListings,
  loadWishlistHomes,
  requireAccount,
} from "@/lib/account";

export default async function DashboardPage() {
  const account = await requireAccount("/dashboard");
  const isOwner = account.role === "owner";

  if (isOwner) {
    const listings = await loadOwnerListings(account.userId);
    const activeListings = listings.filter((listing) => listing.isActive).length;
    const pendingListings = listings.filter((listing) => !listing.isVerified).length;

    return (
      <ProfileShell>
        <AccountPageHeader
          eyebrow="Owner dashboard"
          title={`Welcome back, ${account.name}`}
          subtitle="See how your listings are performing and jump back into the ones that need attention."
        />
        <div className="mb-6 flex flex-wrap gap-3">
          <Link
            href="/add-property"
            className="inline-flex rounded-full bg-lime-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-lime-700"
          >
            Add a property
          </Link>
          <Link
            href="/my-listings"
            className="inline-flex rounded-full border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-800 hover:bg-gray-50 dark:border-white/15 dark:text-white dark:hover:bg-white/5"
          >
            All listings
          </Link>
        </div>
        <OwnerAccessLinkCard />
        <OwnerSummaryCards
          totalListings={listings.length}
          activeListings={activeListings}
          pendingListings={pendingListings}
        />
        <OwnerListingsPreview listings={listings.slice(0, 4)} />
      </ProfileShell>
    );
  }

  const homes = await loadWishlistHomes(account.savedPropertyIds);

  return (
    <ProfileShell>
      <AccountPageHeader
        eyebrow="Buyer dashboard"
        title={`Welcome back, ${account.name}`}
        subtitle="Your wishlist is the shortlist you come back to before you enquire or make an offer."
      />
      <section className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <article className="rounded-2xl border border-gray-200 bg-[#f7f6f3] p-5 dark:border-white/10 dark:bg-[#13161f]">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
            Saved homes
          </p>
          <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
            {homes.length}
          </p>
        </article>
        <article className="rounded-2xl border border-gray-200 bg-[#f7f6f3] p-5 dark:border-white/10 dark:bg-[#13161f]">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
            Purchases in progress
          </p>
          <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">0</p>
        </article>
        <article className="rounded-2xl border border-gray-200 bg-[#f7f6f3] p-5 sm:col-span-1 dark:border-white/10 dark:bg-[#13161f]">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
            Next step
          </p>
          <Link
            href="/my-purchases"
            className="mt-3 inline-flex text-sm font-semibold text-lime-700 hover:text-lime-800"
          >
            Open purchases
          </Link>
        </article>
      </section>
      <WishlistGrid homes={homes} />
    </ProfileShell>
  );
}
