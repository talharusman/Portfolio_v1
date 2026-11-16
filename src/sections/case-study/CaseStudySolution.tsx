import { TextOrPlaceholder } from "@/components/ui/PlaceholderNote";
import { Section } from "@/components/ui/Section";
import { SpecList } from "@/components/ui/SpecList";
import type { Project } from "@/data/projects";

/** C. The solution: the system that was built and how it addresses the problem. */
export function CaseStudySolution({ project }: { project: Project }) {
  const { solution, contribution } = project.caseStudy;

  return (
    <Section id="solution" title="The solution">
      <div className="space-y-8">
        <p className="max-w-measure font-serif text-lead">{solution.summary}</p>
        <ul className="max-w-measure list-disc space-y-2 pl-5 font-serif text-body marker:text-accent">
          {solution.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
        <SpecList
          items={[
            {
              term: "My contribution",
              detail: <TextOrPlaceholder value={contribution} />,
            },
          ]}
        />
      </div>
    </Section>
  );
}
