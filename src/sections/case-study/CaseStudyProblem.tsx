import { TextOrPlaceholder } from "@/components/ui/PlaceholderNote";
import { Section } from "@/components/ui/Section";
import { SpecList } from "@/components/ui/SpecList";
import type { Project } from "@/data/projects";

/** B. The problem: what existed, why it mattered, what other approaches lacked. */
export function CaseStudyProblem({ project }: { project: Project }) {
  const { problem } = project.caseStudy;

  return (
    <Section id="problem" title="The problem">
      <div className="space-y-8">
        <p className="max-w-measure font-serif text-lead">{problem.statement}</p>
        <SpecList
          items={[
            {
              term: "Why it mattered",
              detail: <TextOrPlaceholder value={problem.importance} />,
            },
            {
              term: "Other approaches",
              detail: <TextOrPlaceholder value={problem.limitations} />,
            },
          ]}
        />
      </div>
    </Section>
  );
}
