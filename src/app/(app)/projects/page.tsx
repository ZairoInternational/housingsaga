import ProjectsHero from "@/components/projects/ProjectsHero";
import type { PropertyCardData } from "@/components/ui/propertyCard";
import ProjectsSearchableResults from "@/components/projects/ProjectsSearchableResults";

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

      <ProjectsSearchableResults
        initialCards={cards}
        initialPagination={pagination}
        initialHasError={hasError}
        limit={limit}
      />
    </main>
  );
}

