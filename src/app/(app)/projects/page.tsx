import { Suspense } from "react";
import ProjectsHero from "@/components/projects/ProjectsHero";
import ProjectsSearchableResults from "@/components/projects/ProjectsSearchableResults";
import ProjectsResultsSkeleton from "@/components/projects/ProjectsResultsSkeleton";

export default function ProjectsPage() {
  return (
    <main className="flex flex-col bg-gray-50 dark:bg-[#050816] min-h-screen">
      <ProjectsHero />
      <Suspense fallback={<ProjectsResultsSkeleton />}>
        <ProjectsSearchableResults limit={9} />
      </Suspense>
    </main>
  );
}
