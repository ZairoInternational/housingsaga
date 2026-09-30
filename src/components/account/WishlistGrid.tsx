import Link from "next/link";
import { RiHeartLine, RiMapPin2Line } from "react-icons/ri";

import SaveHomeButton from "@/components/account/SaveHomeButton";
import { formatEurAmount } from "@/lib/format-currency";
import type { WishlistHome } from "@/lib/account";

export default function WishlistGrid({ homes }: { homes: WishlistHome[] }) {
  if (homes.length === 0) {
    return (
      <article className="rounded-2xl border border-dashed border-gray-200 dark:border-white/10 bg-[#f7f6f3] dark:bg-[#13161f] px-6 py-14 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white dark:bg-white/5">
          <RiHeartLine className="h-7 w-7 text-lime-500" />
        </div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Your wishlist is empty
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-gray-500 dark:text-gray-400">
          Save homes while you browse. They stay here so you can compare them
          before you enquire.
        </p>
        <Link
          href="/projects"
          className="mt-5 inline-flex rounded-full bg-lime-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-lime-700"
        >
          Browse properties
        </Link>
      </article>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {homes.map((home) => (
        <article
          key={home.id}
          className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#13161f]"
        >
          <div className="relative h-44 bg-gray-100 dark:bg-[#0d0f17]">
            {home.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={home.image}
                alt={home.title}
                className="h-full w-full object-cover"
              />
            ) : null}
            <SaveHomeButton
              propertyId={home.id}
              initiallySaved
              className="absolute top-3 right-3 z-50"
            />
          </div>
          <div className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                  <Link href={`/projects/${home.id}`} className="hover:text-lime-700">
                    {home.title}
                  </Link>
                </h3>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-gray-500">
                  <RiMapPin2Line className="h-3.5 w-3.5 shrink-0" />
                  {home.city}, {home.state}
                </p>
              </div>
              {typeof home.price === "number" && (
                <p className="shrink-0 font-bold text-gray-900 dark:text-white">
                  {formatEurAmount(home.price)}
                </p>
              )}
            </div>
            <p className="mt-3 text-sm text-gray-500">
              {home.bedrooms} beds · {home.bathrooms} baths
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
