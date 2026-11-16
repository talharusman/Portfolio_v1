import { Section } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Tag";
import { TextLink } from "@/components/ui/TextLink";
import { skillDomains, type SkillDomain } from "@/data/skills";
import { projectsUsing } from "@/lib/skill-evidence";

function DomainContent({ domain }: { domain: SkillDomain }) {
  const evidence = domain.skills.map((skill) => ({
    skill,
    projects: projectsUsing(skill),
  }));

  // Unique projects across the domain, in the order the projects are listed.
  const appliedIn = new Map(
    evidence.flatMap(({ projects }) =>
      projects.map((project) => [project.slug, project] as const),
    ),
  );

  return (
    <div className="space-y-6">
      <p className="max-w-measure font-serif text-body text-muted">
        {domain.description}
      </p>

      <ul aria-label={`${domain.title} skills`} className="flex flex-wrap gap-2">
        {evidence.map(({ skill, projects }) => (
          <li key={skill.name}>
            <Tag tone={projects.length > 0 ? "accent" : "neutral"}>
              {skill.name}
              {projects.length > 0 ? (
                <span className="sr-only"> (used in a project below)</span>
              ) : null}
            </Tag>
          </li>
        ))}
      </ul>

      {appliedIn.size > 0 ? (
        <div className="border-t border-rule pt-4">
          <p className="font-mono text-label text-muted">Applied in</p>
          <ul className="mt-2 flex flex-wrap gap-x-6 gap-y-1">
            {[...appliedIn.values()].map((project) => (
              <li key={project.slug}>
                <TextLink
                  href={`/projects/${project.slug}`}
                  className="inline-flex min-h-11 items-center"
                >
                  {project.title}
                </TextLink>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export function SkillDomains() {
  return (
    <>
      {skillDomains.map((domain, index) => (
        <Section
          key={domain.id}
          id={domain.id}
          title={domain.title}
          number={String(index + 1).padStart(2, "0")}
          uppercase
        >
          <DomainContent domain={domain} />
        </Section>
      ))}
    </>
  );
}
