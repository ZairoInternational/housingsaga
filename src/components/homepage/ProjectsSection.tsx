import ProjectsSectionClient from "@/components/homepage/ProjectsSectionClient";
import { getHighlightedProjectCards } from "@/lib/get-projects-page-data";

export default async function ProjectsSection() {
  const projects = await getHighlightedProjectCards(5);
  return <ProjectsSectionClient projects={projects} />;
}
