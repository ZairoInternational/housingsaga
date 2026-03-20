"use client";

import React, { useCallback, useMemo, useState } from "react";
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
  };
}

export default function ProjectsSearchableResults({
  initialCards,
  initialPagination,
  initialHasError,
  limit,
}: {
  initialCards: PropertyCardData[];
  initialPagination: ProjectsPagination | null;
  initialHasError: boolean;
  limit: number;
}) {
  const [filters, setFilters] = useState<ProjectsSearchFilters>({});
  const [cards, setCards] = useState<PropertyCardData[]>(initialCards);
  const [pagination, setPagination] = useState<ProjectsPagination | null>(
    initialPagination,
  );
  const [hasError, setHasError] = useState<boolean>(initialHasError);
  const [loading, setLoading] = useState<boolean>(false);

  const isEmpty = !hasError && cards.length === 0;

  const request = useCallback(async (nextFilters: ProjectsSearchFilters, nextPage: number) => {
    setLoading(true);
    setHasError(false);

    const res = await fetch("/api/properties/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        locationQuery: nextFilters.locationQuery,
        roomsMin: nextFilters.roomsMin,
        bathroomsMin: nextFilters.bathroomsMin,
        page: nextPage,
        limit,
      }),
    });

    if (!res.ok) {
      setHasError(true);
      setLoading(false);
      return;
    }

    const json = (await res.json()) as {
      data: ProjectsApiHouse[];
      pagination: ProjectsPagination;
    };

    setCards(json.data.map(mapHouseToPropertyCardData));
    setPagination(json.pagination);
    setLoading(false);
  }, [limit]);

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

  return (
    <>
      <SearchHeader
        onSearch={async (nextFilters) => {
          setFilters(nextFilters);
          await request(nextFilters, 1);
        }}
      />

      <section className="py-2 sm:py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {hasError && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            We&apos;re having trouble loading properties right now. Please
            try again in a moment.
          </div>
        )}

        {isEmpty && !hasError && !loading && (
          <div className="rounded-xl border border-gray-200 bg-white px-4 py-6 text-center text-sm text-gray-600 dark:bg-[#0f172a] dark:border-gray-800 dark:text-gray-300">
            No properties found yet. New listings will appear here as soon
            as they are available.
          </div>
        )}

        {!hasError && !isEmpty && (
          <>
            <div className="mb-6 flex items-center justify-between gap-3">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
                Available Projects
              </h2>
              {resultsHeader}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                <div className="col-span-full text-sm text-gray-600 dark:text-gray-300">
                  Searching…
                </div>
              ) : (
                cards.map((card) => (
                  <PropertyCard key={card.id} card={card} size="compact" />
                ))
              )}
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

