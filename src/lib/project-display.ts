import type { FilterId, Project } from "@/data/projects";
import { filters } from "@/data/projects/filters";

/** The filter's label for a project's first category, for a card's domain badge. */
export function primaryDomainLabel(project: Project) {
  const match = filters.find((filter) => filter.id === project.filters[0]);
  return match?.label ?? project.category;
}

/** The architecture layer labels, in order, for the bespoke flow diagram. */
export function layerFlowLabels(project: Project) {
  return project.caseStudy.architecture.layers.map((layer) => layer.label);
}

/**
 * Distinct, in-use filter categories (excluding "all" and empty ones), for the
 * telemetry strip's "core domains" readout. Derived from real project data.
 */
export function coreDomainLabels(projects: Project[], limit = 3) {
  const used = new Set<FilterId>(projects.flatMap((project) => project.filters));
  return filters
    .filter((filter) => filter.id !== "all" && used.has(filter.id as FilterId))
    .slice(0, limit)
    .map((filter) => filter.label.toUpperCase());
}

/** The project to lead with on the unfiltered view: the first featured project, in list order. */
export function flagshipProject(projects: Project[]) {
  return projects.find((project) => project.featured) ?? projects[0];
}
