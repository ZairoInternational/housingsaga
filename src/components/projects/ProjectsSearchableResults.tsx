"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import PropertyCard, {
  type PropertyCardData,
} from "@/components/ui/propertyCard";
import ProjectsPagination from "@/components/projects/ProjectsPagination";
import type { ProjectsSearchFilters } from "@/components/projects/SearchHeader";
import SearchHeader from "@/components/projects/SearchHeader";

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
};

type ProjectsPagination = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

function mapHouseToPropertyCardData(house: ProjectsApiHouse): PropertyCardData {
  return {
    id: house._id,
    img: house.images?.[0] ?? "/property.jpeg",
    title: house.name,
    tag: `${house.city}, ${house.state}`,
    area: house.carpetArea.toString(),
    beds: house.bedrooms,
    baths: house.bathrooms,
    cars: house.balconies ?? 0,
    price: typeof house.price === "number" ? house.price : undefined,
  };
}

function PropertyCardSkeleton({ index }: { index: number }) {
  return (
    <div
      className="rounded-2xl overflow-hidden bg-[#111] shadow-lg animate-pulse"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="h-[260px] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800" />
        <div className="absolute top-3.5 left-3.5 h-8 w-28 rounded-full bg-white/10" />
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
          <div className="space-y-2 w-2/3">
            <div className="h-5 rounded bg-white/15" />
            <div className="h-3 w-1/2 rounded bg-lime-400/30" />
          </div>
          <div className="h-8 w-8 rounded-full bg-lime-400/40" />
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSearchableResults({
  initialCards,
  initialPagination,
  initialHasError,
  limit,
  initialFilters = {},
}: {
  initialCards: PropertyCardData[];
  initialPagination: ProjectsPagination | null;
  initialHasError: boolean;
  limit: number;
  initialFilters?: ProjectsSearchFilters;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<ProjectsSearchFilters>(initialFilters);
  const [cards, setCards] = useState<PropertyCardData[]>(initialCards);
  const [pagination, setPagination] = useState<ProjectsPagination | null>(
    initialPagination,
  );
  const [hasError, setHasError] = useState<boolean>(initialHasError);
  const [loading, setLoading] = useState<boolean>(false);

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
    async (nextFilters: ProjectsSearchFilters, nextPage: number) => {
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

        setCards(json.data.map(mapHouseToPropertyCardData));
        setPagination(json.pagination);
        syncUrl(nextFilters, nextPage);
      } catch {
        setHasError(true);
      } finally {
        setLoading(false);
      }
    },
    [limit, syncUrl],
  );

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
                        className="opacity-0 animate-[fadeUp_0.45s_ease-out_forwards]"
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
