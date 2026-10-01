import Link from "next/link";
import { RiAddLine, RiBuilding4Line } from "react-icons/ri";

import OwnerListingCard, {
  type OwnerListingCardItem,
} from "@/components/profile/OwnerListingCard";

interface OwnerListingsPreviewProps {
  listings: OwnerListingCardItem[];
  showIntro?: boolean;
}

export default function OwnerListingsPreview({
  listings,
  showIntro = true,
}: OwnerListingsPreviewProps) {
  return (
    <section className="py-10">
      {showIntro && (
        <div className="flex items-end justify-between gap-4 mb-6">
          <div>
            <p className="text-lime-500 font-semibold uppercase tracking-widest text-xs mb-3">
              Your Properties
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Your listings
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Manage properties you&apos;ve published or submitted for review.
            </p>
          </div>
        </div>
      )}

      {listings.length === 0 ? (
        <article className="rounded-2xl border border-dashed border-gray-200 dark:border-white/10 bg-[#f7f6f3] dark:bg-[#13161f] px-6 py-16 text-center">
          <div className="mx-auto h-14 w-14 rounded-2xl bg-white dark:bg-white/5 flex items-center justify-center mb-4">
            <RiBuilding4Line className="h-7 w-7 text-gray-300 dark:text-gray-600" />
          </div>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">
            No listings yet
          </h3>
          <p className="mt-1.5 text-sm text-gray-400 dark:text-gray-500 max-w-xs mx-auto">
            Start by adding your first property — it will appear here once
            submitted.
          </p>
          <Link
            href="/add-property"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-lime-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-lime-700 transition-all shadow-sm"
          >
            <RiAddLine className="h-4 w-4" />
            List your first property
          </Link>
        </article>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          {listings.map((listing) => (
            <OwnerListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </section>
  );
}
