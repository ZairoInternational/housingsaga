import { Suspense } from "react";
import ProjectsHero from "@/components/projects/ProjectsHero";
import type { PropertyCardData } from "@/components/ui/propertyCard";
import ProjectsSearchableResults from "@/components/projects/ProjectsSearchableResults";
import type { ProjectsSearchFilters } from "@/components/projects/SearchHeader";
import { getProjectsPageData } from "@/lib/get-projects-page-data";

interface ProjectsPageProps {
  searchParams?: Promise<{
    page?: string;
    minPrice?: string;
    maxPrice?: string;
    roomsMin?: string;
    bathroomsMin?: string;
    locationQuery?: string;
  }>;
}

interface ProjectsApiHouse {
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
}

interface ProjectsPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

function mapProjectsToCards(projects: ProjectsApiHouse[]): PropertyCardData[] {
  return projects.map((project) => ({
    id: String(project._id),
    img: project.images?.[0] ?? "/property.jpeg",
    title: project.name,
    tag: `${project.city}, ${project.state}`,
    area: project.carpetArea.toString(),
    beds: project.bedrooms,
    baths: project.bathrooms,
    cars: project.balconies ?? 0,
    price: typeof project.price === "number" ? project.price : undefined,
  }));
}

function parseOptionalNumber(value?: string): number | undefined {
  if (!value) return undefined;
  const n = Number(value);
  return Number.isFinite(n) ? n : undefined;
}

function ResultsSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6 h-12 rounded-2xl bg-gray-200 animate-pulse" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-[260px] rounded-2xl bg-gray-200 animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}

async function ProjectsResults({
  searchParams,
}: {
  searchParams?: ProjectsPageProps["searchParams"];
}) {
  const resolved = searchParams ? await searchParams : undefined;
  const page = Math.max(Number(resolved?.page) || 1, 1);
  const limit = 9;

  const initialFilters: ProjectsSearchFilters = {
    ...(parseOptionalNumber(resolved?.minPrice) !== undefined
      ? { minPrice: parseOptionalNumber(resolved?.minPrice) }
      : {}),
    ...(parseOptionalNumber(resolved?.maxPrice) !== undefined
      ? { maxPrice: parseOptionalNumber(resolved?.maxPrice) }
      : {}),
    ...(parseOptionalNumber(resolved?.roomsMin) !== undefined
      ? { roomsMin: parseOptionalNumber(resolved?.roomsMin) }
      : {}),
    ...(parseOptionalNumber(resolved?.bathroomsMin) !== undefined
      ? { bathroomsMin: parseOptionalNumber(resolved?.bathroomsMin) }
      : {}),
    ...(resolved?.locationQuery?.trim()
      ? { locationQuery: resolved.locationQuery.trim() }
      : {}),
  };

  let cards: PropertyCardData[] = [];
  let pagination: ProjectsPagination | null = null;
  let hasError = false;

  try {
    const { data, pagination: pageMeta } = await getProjectsPageData(
      page,
      limit,
      initialFilters,
    );
    cards = mapProjectsToCards(data as unknown as ProjectsApiHouse[]);
    pagination = pageMeta;
  } catch (error) {
    console.error("Error fetching projects:", error);
    hasError = true;
  }

  return (
    <ProjectsSearchableResults
      initialCards={cards}
      initialPagination={pagination}
      initialHasError={hasError}
      initialFilters={initialFilters}
      limit={limit}
    />
  );
}

export default function ProjectsPage({ searchParams }: ProjectsPageProps) {
  return (
    <main className="flex flex-col bg-gray-50 dark:bg-[#050816] min-h-screen">
      <ProjectsHero />
      <Suspense fallback={<ResultsSkeleton />}>
        <ProjectsResults searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
