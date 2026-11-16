import Link from "next/link";
import { ProjectFilters } from "@/components/ProjectFilters";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { Container } from "@/components/ui/Container";
import { projects, type FilterId } from "@/data/projects";
import { filters } from "@/data/projects/filters";

/** Filter bar and the filtered, alternating project list. */
export function ProjectsBrowser({ active }: { active: FilterId | "all" }) {
  const visible =
    active === "all"
      ? projects
      : projects.filter((project) => project.filters.includes(active));
  const activeLabel = filters.find((filter) => filter.id === active)?.label;

  return (
    <section aria-label="Projects">
      <Container>
        <ProjectFilters projects={projects} active={active} />
        <p
          aria-live="polite"
          className="mt-4 font-mono text-label text-muted tabular-nums"
        >
          Showing {visible.length} of {projects.length} projects
        </p>

        {visible.length > 0 ? (
          <div className="mt-8 border-t border-rule">
            {visible.map((project, index) => (
              <ProjectShowcase
                key={project.slug}
                project={project}
                number={String(projects.indexOf(project) + 1).padStart(2, "0")}
                reversed={index % 2 === 1}
              />
            ))}
          </div>
        ) : (
          <div className="mt-8 border-t border-rule py-16">
            <p className="font-wide text-h3 font-semibold">
              No projects in {activeLabel} yet
            </p>
            <p className="mt-3 max-w-measure font-serif text-body text-muted">
              Projects will appear here when they are added to this category.
            </p>
            <Link
              href="/projects"
              scroll={false}
              className="mt-6 inline-flex min-h-11 items-center underline decoration-accent decoration-2 underline-offset-4"
            >
              View All Projects
            </Link>
          </div>
        )}
      </Container>
    </section>
  );
}
