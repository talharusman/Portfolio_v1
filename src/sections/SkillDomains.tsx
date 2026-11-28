import { projects } from "@/data/projects";
import { skillDomains } from "@/data/skills";
import { projectsUsing } from "@/lib/skill-evidence";
import { SkillsMatrix, type MatrixDomain } from "@/sections/SkillsMatrix";

// Each technology maps only to projects whose stack or highlights name it.
const domains: MatrixDomain[] = skillDomains.map((domain) => ({
  id: domain.id,
  title: domain.title,
  description: domain.description,
  skills: domain.skills.map((skill) => ({
    name: skill.name,
    projectSlugs: projectsUsing(skill).map((project) => project.slug),
  })),
}));

const projectList = projects.map(({ slug, title }) => ({ slug, title }));

export function SkillDomains() {
  return <SkillsMatrix domains={domains} projects={projectList} />;
}
