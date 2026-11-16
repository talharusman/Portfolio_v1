import Link from "next/link";
import { countFor, filters } from "@/data/projects/filters";
import type { FilterId, Project } from "@/data/projects";
import { cn } from "@/lib/utils";

/**
 * Category filters as real links: the URL carries the state (?category=),
 * links work with middle-click and without JavaScript.
 */
export function ProjectFilters({
  projects,
  active,
}: {
  projects: Project[];
  active: FilterId | "all";
}) {
  return (
    <nav aria-label="Project categories">
      <ul className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <li key={filter.id}>
            <Link
              href={filter.id === "all" ? "/projects" : `/projects?category=${filter.id}`}
              scroll={false}
              aria-current={active === filter.id ? "true" : undefined}
              className={cn(
                "inline-flex min-h-11 items-center gap-2 rounded-control border px-4 text-small transition-colors",
                active === filter.id
                  ? "border-foreground bg-foreground text-background"
                  : "border-rule hover:border-foreground",
              )}
            >
              {filter.label}
              <span className="font-mono text-label tabular-nums opacity-70">
                {countFor(projects, filter.id)}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
