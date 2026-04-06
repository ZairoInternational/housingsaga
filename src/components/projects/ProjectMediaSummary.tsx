import Image from "next/image";
import { Euro } from "lucide-react";
import { RiAspectRatioLine, RiBuildingLine, RiCalendarEventLine } from "react-icons/ri";

export interface ListingBadge {
  id: string;
  label: string;
}

export interface ProjectMediaSummaryProps {
  mainImage: string;
  name: string;
  summary?: string;
  city?: string;
  state?: string;
  projectType?: string;
  areaSqft?: number;
  /** Shown as the third stat when set (replaces legacy start date). */
  constructionYear?: number;
  /** @deprecated Prefer `constructionYear` for the third stat. */
  startDateLabel?: string;
  priceRangeLabel?: string;
  listingBadges?: ListingBadge[];
}

const statItems = [
  {
    key: "projectType",
    label: "Project Type",
    Icon: RiBuildingLine,
  },
  {
    key: "areaSqft",
    label: "Project Area",
    Icon: RiAspectRatioLine,
  },
  {
    key: "yearOrStart",
    label: "Year built",
    Icon: RiCalendarEventLine,
  },
  {
    key: "priceRangeLabel",
    label: "Price Range",
    Icon: Euro,
  },
] as const;

export default function ProjectMediaSummary({
  mainImage,
  name,
  summary,
  city,
  state,
  projectType,
  areaSqft,
  constructionYear,
  startDateLabel,
  priceRangeLabel,
  listingBadges,
}: ProjectMediaSummaryProps) {
  const yearOrStartLabel =
    constructionYear !== undefined
      ? String(constructionYear)
      : startDateLabel;

  const values: Record<string, string | undefined> = {
    projectType,
    areaSqft:
      areaSqft !== undefined ? `${areaSqft.toLocaleString()} Sqft` : undefined,
    yearOrStart: yearOrStartLabel,
    priceRangeLabel,
  };

  const activeStats = statItems
    .map((s) =>
      s.key === "yearOrStart" && constructionYear !== undefined
        ? { ...s, label: "Construction year" }
        : s.key === "yearOrStart" && startDateLabel && !constructionYear
          ? { ...s, label: "Start date" }
          : s,
    )
    .filter((s) => values[s.key] !== undefined);

  return (
    <section className="mt-10 sm:mt-12">
      <div className="max-w-6xl md:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title block */}
        <div className="mb-4">
          {(city || state) && (
            <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-lime-500 mb-1">
              {[city, state].filter(Boolean).join(", ")}
            </p>
          )}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
              {name}
            </h1>
            {listingBadges && listingBadges.length > 0 && (
              <ul className="flex flex-wrap gap-2 shrink-0">
                {listingBadges.map((b) => (
                  <li key={b.id}>
                    <span className="inline-flex items-center rounded-full border border-lime-200 bg-lime-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-lime-800">
                      {b.label}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {summary && (
            <p className="mt-3 text-[15px] sm:text-[16px] leading-relaxed text-gray-600">
              {summary}
            </p>
          )}
        </div>

        {/* Card */}
        <div className="rounded-3xl overflow-hidden border border-gray-200 bg-white shadow-md">
          {/* Hero image */}
          <div className="relative h-[240px] sm:h-[320px] md:h-screen w-full">
            <Image
              src={mainImage}
              alt={name}
              fill
              priority
              className="object-cover"
            />
          </div>

          {/* Stats bar */}
          {activeStats.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-gray-100 border-t border-gray-100 bg-white">
              {activeStats.map(({ key, label, Icon }) => (
                <div key={key} className="flex items-center gap-3 px-5 py-4">
                  <span className="flex-shrink-0 flex h-11 w-11 items-center justify-center rounded-full bg-lime-100 ">
                    <Icon className="h-6 w-6 " strokeWidth={0.1} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-lime-500 mb-0.5">
                      {label}
                    </p>
                    <p className="text-[13px] font-semibold text-gray-900 truncate">
                      {values[key]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
