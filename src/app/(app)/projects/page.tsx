import ProjectsHero from "@/components/projects/ProjectsHero";
import ProjectsPagination from "@/components/projects/ProjectsPagination";
import PropertyCard, {
  type PropertyCardData,
} from "@/components/ui/propertyCard";

interface ProjectsPageProps {
  searchParams?: Promise<{
    page?: string;
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
}

interface ProjectsPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_BASE_URL) {
    return process.env.NEXT_PUBLIC_BASE_URL;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}

async function fetchProjects(page: number, limit: number) {
  const baseUrl = getBaseUrl();
  const url = new URL(
    `/api/projects/getProjects?page=${page}&limit=${limit}`,
    baseUrl,
  );

  const res = await fetch(url.toString(), {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch projects");
  }

  const data = (await res.json()) as {
    data: ProjectsApiHouse[];
    pagination: ProjectsPagination;
  };

  const cards: PropertyCardData[] = data.data.map((project) => ({
    id: project._id,
    img: project.images?.[0] ?? "/property.jpeg",
    title: project.name,
    tag: `${project.city}, ${project.state}`,
    area: project.carpetArea.toString(),
    beds: project.bedrooms,
    baths: project.bathrooms,
    cars: project.balconies ?? 0,
  }));

  return { cards, pagination: data.pagination };
}

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const resolved = searchParams ? await searchParams : undefined;
  const pageParam = resolved?.page;
  const page = Math.max(Number(pageParam) || 1, 1);
  const limit = 9;

  let cards: PropertyCardData[] = [];
  let pagination: ProjectsPagination | null = null;
  let hasError = false;

  try {
    const result = await fetchProjects(page, limit);
    cards = result.cards;
    pagination = result.pagination;
  } catch (error) {
    console.error("Error fetching projects:", error);
    hasError = true;
  }

  const isEmpty = !hasError && cards.length === 0;

  return (
    <main className="flex flex-col bg-gray-50 dark:bg-[#050816] min-h-screen">
      <ProjectsHero />

      <section className="py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {hasError && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              We&apos;re having trouble loading projects right now. Please try
              again in a moment.
            </div>
          )}

          {isEmpty && !hasError && (
            <div className="rounded-xl border border-gray-200 bg-white px-4 py-6 text-center text-sm text-gray-600 dark:bg-[#0f172a] dark:border-gray-800 dark:text-gray-300">
              No projects found yet. New listings will appear here as soon as
              they are available.
            </div>
          )}

          {!hasError && !isEmpty && (
            <>
              <div className="mb-6 flex items-center justify-between gap-3">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
                  Available Projects
                </h2>
                {pagination && (
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    {pagination.total} results
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cards.map((card) => (
                  <PropertyCard key={card.id} card={card} size="compact" />
                ))}
              </div>

              {pagination && (
                <ProjectsPagination
                  page={pagination.page}
                  totalPages={pagination.totalPages}
                />
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
}

