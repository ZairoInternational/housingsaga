import ProjectsSectionClient from "@/components/homepage/ProjectsSectionClient";
import { getHighlightedProjectCards } from "@/lib/get-projects-page-data";

export default async function ProjectsSection() {
  const projects = await getHighlightedProjectCards(20);
  return <ProjectsSectionClient projects={projects} />;
}
