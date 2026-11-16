import type { FilterId, Project } from "@/data/projects/types";

export const filters: { id: FilterId | "all"; label: string }[] = [
  { id: "all", label: "All Projects" },
  { id: "ai-ml", label: "AI / ML" },
  { id: "full-stack", label: "Full-Stack" },
  { id: "backend", label: "Backend Systems" },
  { id: "deep-learning", label: "Deep Learning" },
  { id: "research", label: "Research" },
];

export const isFilterId = (value: string | undefined): value is FilterId =>
  filters.some((filter) => filter.id === value && filter.id !== "all");

export const countFor = (projects: Project[], id: FilterId | "all") =>
  id === "all"
    ? projects.length
    : projects.filter((project) => project.filters.includes(id)).length;
