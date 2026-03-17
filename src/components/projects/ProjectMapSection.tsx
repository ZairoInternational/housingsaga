import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export interface ProjectMapSectionProps {
  latitude?: number;
  longitude?: number;
  address?: string;
  previousTitle?: string;
  previousHref?: string;
  nextTitle?: string;
  nextHref?: string;
}

export default function ProjectMapSection({
  latitude,
  longitude,
  address,
  previousTitle,
  previousHref = "#",
  nextTitle,
  nextHref = "#",
}: ProjectMapSectionProps) {
  const hasCoords =
    typeof latitude === "number" &&
    Number.isFinite(latitude) &&
    typeof longitude === "number" &&
    Number.isFinite(longitude);

const mapSrc = address
  ? `https://www.google.com/maps?q=${encodeURIComponent(
      address,
    )}&hl=en&z=14&output=embed`
  : hasCoords
    ? `https://www.google.com/maps?q=${latitude},${longitude}&hl=en&z=14&output=embed`
    : undefined;

  return (
    <section className="mt-12 sm:mt-16 mb-12 sm:mb-16">
      <div className="max-w-6xl md:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-5">
          Map &amp; Location
        </h2>

        <div className="rounded-3xl overflow-hidden border border-gray-200 bg-white shadow-sm">
          <div className="h-[420px] sm:h-screen">
            {mapSrc ? (
              <iframe
                src={mapSrc}
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Property location map"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-gray-50 text-sm text-gray-400">
                Map preview is not available for this property.
              </div>
            )}
          </div>
        </div>

        {/* Prev / Next navigation */}
        {(previousTitle || nextTitle) && (
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            {previousTitle && (
              <Link
                href={previousHref}
                className="flex-1 flex items-center gap-4 rounded-2xl border border-gray-200 bg-white px-4 py-3 hover:shadow-md transition-shadow group"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-gray-50 group-hover:bg-lime-50 group-hover:border-lime-200 transition-colors">
                  <ChevronLeft className="h-4 w-4 text-gray-500 group-hover:text-lime-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400 mb-0.5">
                    Previous Post
                  </p>
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {previousTitle}
                  </p>
                </div>
              </Link>
            )}
            {nextTitle && (
              <Link
                href={nextHref}
                className="flex-1 flex items-center justify-end gap-4 rounded-2xl border border-gray-200 bg-white px-4 py-3 hover:shadow-md transition-shadow group text-right"
              >
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400 mb-0.5">
                    Next Post
                  </p>
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {nextTitle}
                  </p>
                </div>
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-gray-50 group-hover:bg-lime-50 group-hover:border-lime-200 transition-colors">
                  <ChevronRight className="h-4 w-4 text-gray-500 group-hover:text-lime-600" />
                </div>
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
