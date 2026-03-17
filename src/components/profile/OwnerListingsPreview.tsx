import Image from "next/image";
import Link from "next/link";
import {
  RiHotelBedLine,
  RiBuilding4Line,
  RiMapPin2Line,
  RiAddLine,
  RiCheckboxCircleLine,
  RiTimeLine,
  RiCircleLine,
  RiShowersLine,
  RiEditLine,
} from "react-icons/ri";

interface OwnerListingPreviewItem {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  propertyType: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  image?: string;
  isActive: boolean;
  isVerified: boolean;
}

interface OwnerListingsPreviewProps {
  listings: OwnerListingPreviewItem[];
}

function formatPropertyType(value: string) {
  return value
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function OwnerListingsPreview({
  listings,
}: OwnerListingsPreviewProps) {
  return (
    <section className="py-10">
      {/* Section header */}
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
          <a
            href="/add-property"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-lime-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-lime-700 transition-all shadow-sm"
          >
            <RiAddLine className="h-4 w-4" />
            List your first property
          </a>
        </article>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          {listings.map((listing) => (
            <Link
              key={listing.id}
              href={`/add-property?id=${listing.id}&edit=true`}
              className="group block overflow-hidden rounded-2xl border border-gray-200 dark:border-white/8 bg-[#f7f6f3] dark:bg-[#13161f] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              {/* Image */}
              <div className="relative h-48 bg-gray-100 dark:bg-[#0d0f17] overflow-hidden">
                {listing.image ? (
                  <Image
                    src={listing.image}
                    alt={listing.name}
                    fill
                    sizes="(min-width: 1280px) 420px, 100vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <RiBuilding4Line className="h-12 w-12 text-gray-200 dark:text-gray-700" />
                  </div>
                )}

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                {/* Badges */}
                <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                  <span className="rounded-full bg-black/30 backdrop-blur-sm border border-white/15 px-3 py-1 text-xs font-medium text-white">
                    {formatPropertyType(listing.propertyType)}
                  </span>
                </div>

                <div className="absolute top-4 right-4 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-lime-500 text-white px-3 py-1.5 text-xs font-semibold shadow-lg">
                    <RiEditLine className="h-3.5 w-3.5" />
                    Edit listing
                  </span>
                </div>

                {/* Status badges bottom-right */}
                <div className="absolute bottom-3 right-3 flex gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-sm border ${
                      listing.isActive
                        ? "bg-lime-500/20 border-lime-400/30 text-lime-300"
                        : "bg-black/20 border-white/10 text-gray-300"
                    }`}
                  >
                    <RiCircleLine
                      className={`h-2.5 w-2.5 ${listing.isActive ? "text-lime-400" : "text-gray-400"}`}
                    />
                    {listing.isActive ? "Active" : "Inactive"}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-sm border ${
                      listing.isVerified
                        ? "bg-sky-500/20 border-sky-400/30 text-sky-300"
                        : "bg-amber-500/20 border-amber-400/30 text-amber-300"
                    }`}
                  >
                    {listing.isVerified ? (
                      <RiCheckboxCircleLine className="h-3 w-3" />
                    ) : (
                      <RiTimeLine className="h-3 w-3" />
                    )}
                    {listing.isVerified ? "Verified" : "Pending"}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="min-w-0">
                    <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                      {listing.name}
                    </h3>
                    <div className="mt-1 flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500">
                      <RiMapPin2Line className="h-3.5 w-3.5 shrink-0" />
                      <span className="truncate">
                        {listing.address}, {listing.city}, {listing.state}
                      </span>
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-lg font-bold text-gray-900 dark:text-white tabular-nums">
                      {formatCurrency(listing.price)}
                    </p>
                  </div>
                </div>

                {/* Stats row */}
                <div className="mt-4 flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-white/6">
                  <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                    <RiHotelBedLine className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      {listing.bedrooms}
                    </span>
                    <span className="text-xs">beds</span>
                  </div>
                  <div className="h-3.5 w-px bg-gray-200 dark:bg-white/10" />
                  <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                    <RiShowersLine className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      {listing.bathrooms}
                    </span>
                    <span className="text-xs">baths</span>
                  </div>
                  <span className="ml-auto text-xs font-semibold text-lime-600 dark:text-lime-400">
                    Hover to edit
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
