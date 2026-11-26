import { projects } from "@/data/projects";
import { isFilterId } from "@/data/projects/filters";
import { ProjectsExplorer } from "@/sections/ProjectsExplorer";

/**
 * Reads `?category=` at request time. Kept in its own component, wrapped in
 * Suspense by the page, so the static shell can prerender while only this
 * part waits for the search params (Cache Components requirement).
 */
export async function FilteredProjectsExplorer({
  searchParams,
}: {
  searchParams: Promise<{ category?: string | string[] }>;
}) {
  const { category } = await searchParams;
  const value = Array.isArray(category) ? category[0] : category;

  return <ProjectsExplorer projects={projects} initialCategory={isFilterId(value) ? value : "all"} />;
}
