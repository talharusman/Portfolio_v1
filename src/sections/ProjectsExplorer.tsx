"use client";

import { useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import { ProjectBentoCard } from "@/components/ProjectBentoCard";
import { ProjectDossier } from "@/components/ProjectDossier";
import { ProjectFlagshipCard } from "@/components/ProjectFlagshipCard";
import { ProjectLedgerRow } from "@/components/ProjectLedgerRow";
import { ProjectsControlDock } from "@/components/ProjectsControlDock";
import { Container } from "@/components/ui/Container";
import type { FilterId, Project } from "@/data/projects";
import { filters } from "@/data/projects/filters";
import { flagshipProject } from "@/lib/project-display";

type View = "bento" | "ledger";

export function ProjectsExplorer({
  projects,
  initialCategory,
}: {
  projects: Project[];
  initialCategory: FilterId | "all";
}) {
  const router = useRouter();
  const [category, setCategory] = useState<FilterId | "all">(initialCategory);
  const [query, setQuery] = useState("");
  const [view, setView] = useState<View>("bento");
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const flagship = flagshipProject(projects);

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: projects.length };
    for (const filter of filters) {
      if (filter.id === "all") continue;
      const id = filter.id;
      map[id] = projects.filter((project) => project.filters.includes(id)).length;
    }
    return map;
  }, [projects]);

  const byCategory =
    category === "all" ? projects : projects.filter((project) => project.filters.includes(category));

  const trimmedQuery = query.trim().toLowerCase();
  const searched = trimmedQuery
    ? byCategory.filter((project) =>
        [project.title, project.category, ...project.stack].some((value) =>
          value.toLowerCase().includes(trimmedQuery),
        ),
      )
    : byCategory;

  const showFlagship = category === "all" && trimmedQuery === "";
  const gridProjects = showFlagship
    ? searched.filter((project) => project.slug !== flagship.slug)
    : searched;

  const activeProject = projects.find((project) => project.slug === openSlug) ?? null;

  function handleFilterChange(id: FilterId | "all") {
    setCategory(id);
    router.replace(id === "all" ? "/projects" : `/projects?category=${id}`, { scroll: false });
  }

  function openDossier(slug: string, event: React.MouseEvent<HTMLButtonElement>) {
    triggerRef.current = event.currentTarget;
    setOpenSlug(slug);
  }

  function closeDossier() {
    setOpenSlug(null);
    triggerRef.current?.focus();
  }

  return (
    <section aria-label="Projects">
      <Container>
        <ProjectsControlDock
          filters={filters}
          counts={counts}
          active={category}
          onFilterChange={handleFilterChange}
          query={query}
          onQueryChange={setQuery}
          view={view}
          onViewChange={setView}
        />

        <p aria-live="polite" className="mt-6 font-(family-name:--font-jetbrains) text-xs text-(color:--ob-meta)">
          Showing {searched.length} of {projects.length} projects
        </p>

        {showFlagship ? (
          <div className="mt-6">
            <ProjectFlagshipCard project={flagship} onInspect={(event) => openDossier(flagship.slug, event)} />
          </div>
        ) : null}

        {gridProjects.length > 0 ? (
          view === "bento" ? (
            <div className="mt-8 grid gap-6 pb-section sm:grid-cols-2">
              {gridProjects.map((project) => (
                <ProjectBentoCard
                  key={project.slug}
                  project={project}
                  index={String(projects.indexOf(project) + 1).padStart(2, "0")}
                  onInspect={(event) => openDossier(project.slug, event)}
                />
              ))}
            </div>
          ) : (
            <ul className="mt-8 border-t border-(color:--ob-line) pb-section">
              {gridProjects.map((project) => (
                <ProjectLedgerRow
                  key={project.slug}
                  project={project}
                  index={String(projects.indexOf(project) + 1).padStart(2, "0")}
                  onInspect={(event) => openDossier(project.slug, event)}
                />
              ))}
            </ul>
          )
        ) : (
          <div className="mt-8 border-t border-(color:--ob-line) py-16">
            <p className="font-(family-name:--font-space-grotesk) text-xl font-bold text-(color:--ob-text)">
              No projects match
            </p>
            <p className="mt-2 max-w-md text-(color:--ob-muted)">
              Try a different category, or clear the search.
            </p>
          </div>
        )}
      </Container>

      <ProjectDossier project={activeProject} onClose={closeDossier} />
    </section>
  );
}
