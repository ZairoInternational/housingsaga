import ProjectsHero from "@/components/projects/ProjectsHero";
import type { PropertyCardData } from "@/components/ui/propertyCard";
import ProjectsSearchableResults from "@/components/projects/ProjectsSearchableResults";
import { getProjectsPageData } from "@/lib/get-projects-page-data";

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

function mapProjectsToCards(
  projects: ProjectsApiHouse[],
): PropertyCardData[] {
  return projects.map((project) => ({
    id: String(project._id),
    img: project.images?.[0] ?? "/property.jpeg",
    title: project.name,
    tag: `${project.city}, ${project.state}`,
    area: project.carpetArea.toString(),
    beds: project.bedrooms,
    baths: project.bathrooms,
    cars: project.balconies ?? 0,
  }));
}

async function loadProjectsPage(page: number, limit: number) {
  const { data, pagination } = await getProjectsPageData(page, limit);
  const projects = data as unknown as ProjectsApiHouse[];
  return {
    cards: mapProjectsToCards(projects),
    pagination,
  };
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
    const result = await loadProjectsPage(page, limit);
    cards = result.cards;
    pagination = result.pagination;
  } catch (error) {
    console.error("Error fetching projects:", error);
    hasError = true;
  }

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

