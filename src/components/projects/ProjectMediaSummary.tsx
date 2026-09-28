import Image from "next/image";
import { Euro } from "lucide-react";
import {
  RiAspectRatioLine,
  RiBuildingLine,
  RiCalendarEventLine,
} from "react-icons/ri";
import GoldenVisaRibbon from "@/components/ui/GoldenVisaRibbon";

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
  constructionYear?: number;
  /** @deprecated Prefer `constructionYear` for the third stat. */
  startDateLabel?: string;
  priceRangeLabel?: string;
  price?: number;
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
    label: "Price",
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
  price,
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
    <section className="mt-8 sm:mt-10">
      <div className="max-w-6xl md:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-5">
          {(city || state) && (
            <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-lime-600 mb-1.5">
              {[city, state].filter(Boolean).join(", ")}
            </p>
          )}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight min-w-0">
              {name}
            </h1>
            {listingBadges && listingBadges.length > 0 && (
              <ul className="flex flex-wrap gap-2 shrink-0 sm:max-w-[45%] sm:justify-end">
                {listingBadges.map((b) => (
                  <li key={b.id}>
                    <span className="inline-flex items-center rounded-full border border-lime-200 bg-lime-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-lime-800">
                      {b.label}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {summary && (
            <p className="mt-3 max-w-3xl text-[15px] sm:text-[16px] leading-relaxed text-gray-600">
              {summary}
            </p>
          )}
        </div>

        <div className="rounded-2xl sm:rounded-3xl overflow-hidden border border-gray-200 bg-white shadow-sm">
          <div className="relative w-full h-[240px] sm:h-[340px] lg:h-[420px]">
            <Image
              src={mainImage}
              alt={name}
              fill
              priority
              sizes="(min-width: 1280px) 1280px, 100vw"
              className="object-cover"
            />
            <GoldenVisaRibbon price={price} size="md" />
          </div>

          {activeStats.length > 0 && (
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-gray-100 border-t border-gray-100">
              {activeStats.map(({ key, label, Icon }) => (
                <div
                  key={key}
                  className="flex items-center gap-3 px-4 sm:px-5 py-4 min-w-0"
                >
                  <span className="flex-shrink-0 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-lime-100 text-lime-700">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-lime-600 mb-0.5">
                      {label}
                    </p>
                    <p className="text-[13px] sm:text-sm font-semibold text-gray-900 truncate">
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
