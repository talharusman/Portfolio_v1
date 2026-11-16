import { projects, type Project } from "@/data/projects";
import type { Skill } from "@/data/skills";

const normalize = (value: string) => value.trim().toLowerCase();

// Built once at module load: every term a project names in its stack or highlights.
const projectTerms = projects.map((project) => ({
  project,
  terms: new Set([...project.stack, ...project.highlights].map(normalize)),
}));

/**
 * Projects on this site whose stack or highlights name the skill (or one of its
 * aliases). This is the only evidence the skills page shows, so it never
 * claims more than the project data does.
 */
export function projectsUsing(skill: Skill): Project[] {
  const names = [skill.name, ...(skill.aliases ?? [])].map(normalize);
  return projectTerms
    .filter(({ terms }) => names.some((name) => terms.has(name)))
    .map(({ project }) => project);
}
