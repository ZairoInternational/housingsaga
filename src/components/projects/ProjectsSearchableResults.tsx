"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import PropertyCard, {
  type PropertyCardData,
} from "@/components/ui/propertyCard";
import ProjectsPagination from "@/components/projects/ProjectsPagination";
import type { ProjectsSearchFilters } from "@/components/projects/SearchHeader";
import SearchHeader from "@/components/projects/SearchHeader";
import { PropertyCardSkeleton } from "@/components/projects/ProjectsResultsSkeleton";
import { useLocale } from "next-intl";

type ProjectsApiHouse = {
  _id: string;
  name: string;
  city: string;
  state: string;
  carpetArea: number;
  bedrooms: number;
  bathrooms: number;
  balconies?: number;
  images?: string[];
  price?: number;
  goldenVisaEligible?: boolean;
};

type ProjectsPagination = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

function mapHouseToPropertyCardData(
  house: ProjectsApiHouse,
  locale: string,
): PropertyCardData {
  return {
    id: house._id,
    img: house.images?.[0] ?? "/property.jpeg",
    title: house.name,
    tag: `${house.city}, ${house.state}`,
    area: house.carpetArea.toLocaleString(locale === "el" ? "el-GR" : "en-US"),
    beds: house.bedrooms,
    baths: house.bathrooms,
    cars: house.balconies ?? 0,
    price: typeof house.price === "number" ? house.price : undefined,
    goldenVisaEligible: house.goldenVisaEligible,
  };
}

function readOptionalNumber(params: URLSearchParams, key: string) {
  const raw = params.get(key);
  if (!raw) return undefined;
  const n = Number(raw);
  return Number.isFinite(n) ? n : undefined;
}

function readFiltersFromUrl(params: URLSearchParams): {
  filters: ProjectsSearchFilters;
  page: number;
} {
  const minPrice = readOptionalNumber(params, "minPrice");
  const maxPrice = readOptionalNumber(params, "maxPrice");
  const roomsMin = readOptionalNumber(params, "roomsMin");
  const bathroomsMin = readOptionalNumber(params, "bathroomsMin");
  const locationQuery = params.get("locationQuery")?.trim();

  return {
    page: Math.max(readOptionalNumber(params, "page") ?? 1, 1),
    filters: {
      ...(minPrice !== undefined ? { minPrice } : {}),
      ...(maxPrice !== undefined ? { maxPrice } : {}),
      ...(roomsMin !== undefined ? { roomsMin } : {}),
      ...(bathroomsMin !== undefined ? { bathroomsMin } : {}),
      ...(locationQuery ? { locationQuery } : {}),
    },
  };
}

export default function ProjectsSearchableResults({
  limit,
}: {
  limit: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const locale = useLocale();
  const didInitialFetch = useRef(false);
  const initialFromUrl = readFiltersFromUrl(
    new URLSearchParams(searchParams?.toString() ?? ""),
  );

  const [filters, setFilters] = useState<ProjectsSearchFilters>(
    initialFromUrl.filters,
  );
  const [cards, setCards] = useState<PropertyCardData[]>([]);
  const [pagination, setPagination] = useState<ProjectsPagination | null>(null);
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(true);

  const isEmpty = !hasError && !loading && cards.length === 0;

  const syncUrl = useCallback(
    (nextFilters: ProjectsSearchFilters, nextPage: number) => {
      const params = new URLSearchParams(searchParams?.toString() ?? "");
      if (nextPage > 1) params.set("page", String(nextPage));
      else params.delete("page");

      const setOrDelete = (key: string, value?: string | number) => {
        if (value === undefined || value === "") params.delete(key);
        else params.set(key, String(value));
      };

      setOrDelete("minPrice", nextFilters.minPrice);
      setOrDelete("maxPrice", nextFilters.maxPrice);
      setOrDelete("roomsMin", nextFilters.roomsMin);
      setOrDelete("bathroomsMin", nextFilters.bathroomsMin);
      setOrDelete("locationQuery", nextFilters.locationQuery);

      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  const request = useCallback(
    async (
      nextFilters: ProjectsSearchFilters,
      nextPage: number,
      updateUrl = true,
    ) => {
      setLoading(true);
      setHasError(false);

      try {
        const res = await fetch("/api/properties/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            locationQuery: nextFilters.locationQuery,
            roomsMin: nextFilters.roomsMin,
            bathroomsMin: nextFilters.bathroomsMin,
            minPrice: nextFilters.minPrice,
            maxPrice: nextFilters.maxPrice,
            page: nextPage,
            limit,
          }),
        });

        if (!res.ok) {
          setHasError(true);
          return;
        }

        const json = (await res.json()) as {
          data: ProjectsApiHouse[];
          pagination: ProjectsPagination;
        };

        setCards(json.data.map((house) => mapHouseToPropertyCardData(house, locale)));
        setPagination(json.pagination);
        if (updateUrl) syncUrl(nextFilters, nextPage);
      } catch {
        setHasError(true);
      } finally {
        setLoading(false);
      }
    },
    [limit, locale, syncUrl],
  );

  const seenLocale = useRef(locale);
  useEffect(() => {
    if (seenLocale.current === locale) return;
    seenLocale.current = locale;
    void request(filters, pagination?.page ?? 1, false);
  }, [filters, locale, pagination?.page, request]);

  useEffect(() => {
    if (didInitialFetch.current) return;
    didInitialFetch.current = true;
    const { filters: fromUrl, page } = readFiltersFromUrl(
      new URLSearchParams(searchParams?.toString() ?? ""),
    );
    setFilters(fromUrl);
    void request(fromUrl, page, false);
  }, [request, searchParams]);

  const onPageChange = useCallback(
    async (nextPage: number) => {
      await request(filters, nextPage);
    },
    [filters, request],
  );

  const resultsHeader = useMemo(() => {
    if (!pagination) return null;
    return (
      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
        {pagination.total} results
      </p>
    );
  }, [pagination]);

  const hasPriceFilter =
    typeof filters.minPrice === "number" || typeof filters.maxPrice === "number";

  return (
    <>
      <SearchHeader
        initialValue={filters}
        onSearch={async (nextFilters) => {
          setFilters(nextFilters);
          await request(nextFilters, 1);
        }}
      />

      <section className="py-2 sm:py-4 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {hasError && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 mb-6">
              We&apos;re having trouble loading properties right now. Please try
              again in a moment.
            </div>
          )}

          {isEmpty && (
            <div className="rounded-xl border border-gray-200 bg-white px-4 py-8 text-center text-sm text-gray-600 dark:bg-[#0f172a] dark:border-gray-800 dark:text-gray-300">
              {hasPriceFilter
                ? "No properties found in this price range. Try adjusting the filter."
                : "No properties found yet. New listings will appear here as soon as they are available."}
            </div>
          )}

          {!hasError && (!isEmpty || loading) && (
            <>
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
                    Available Projects
                  </h2>
                  {hasPriceFilter && (
                    <p className="mt-1 text-xs sm:text-sm text-lime-700">
                      Showing matches for your selected investment range
                    </p>
                  )}
                </div>
                {resultsHeader}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading
                  ? Array.from({ length: 6 }).map((_, i) => (
                      <PropertyCardSkeleton key={i} index={i} />
                    ))
                  : cards.map((card, i) => (
                      <div
                        key={card.id}
                        className="animate-[fadeUp_0.45s_ease-out_both]"
                        style={{ animationDelay: `${i * 50}ms` }}
                      >
                        <PropertyCard card={card} size="compact" />
                      </div>
                    ))}
              </div>

              {pagination && !loading && (
                <ProjectsPagination
                  page={pagination.page}
                  totalPages={pagination.totalPages}
                  onPageChange={onPageChange}
                />
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
