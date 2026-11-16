import { Section } from "@/components/ui/Section";
import { TagList } from "@/components/ui/Tag";
import type { Project } from "@/data/projects";

/** E. Technical implementation: grouped by concern, with the role of each technology. */
export function CaseStudyImplementation({ project }: { project: Project }) {
  return (
    <Section id="implementation" title="Technical implementation">
      <ul className="border-b border-rule">
        {project.caseStudy.implementation.map((block) => (
          <li
            key={block.title}
            className="grid gap-x-8 gap-y-3 border-t border-rule py-6 md:grid-cols-[13rem_1fr]"
          >
            <h3 className="font-wide text-body font-semibold">{block.title}</h3>
            <div className="min-w-0 space-y-4">
              <p className="max-w-measure font-serif text-body">{block.role}</p>
              <TagList
                label={`${block.title} technologies`}
                items={block.technologies}
              />
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
