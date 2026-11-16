import { ProjectsBrowser } from "@/sections/ProjectsBrowser";
import { isFilterId } from "@/data/projects/filters";

/**
 * Reads `?category=` at request time. Kept in its own component so the page
 * shell can prerender while only this part waits for the search params.
 */
export async function FilteredProjects({
  searchParams,
}: {
  searchParams: Promise<{ category?: string | string[] }>;
}) {
  const { category } = await searchParams;
  const value = Array.isArray(category) ? category[0] : category;

  return <ProjectsBrowser active={isFilterId(value) ? value : "all"} />;
}
