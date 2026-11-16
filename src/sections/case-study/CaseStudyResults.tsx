import { PlaceholderNote } from "@/components/ui/PlaceholderNote";
import { Section } from "@/components/ui/Section";
import type { Project } from "@/data/projects";
import { isTodo, type Todo } from "@/data/projects/types";

function Findings({ heading, items }: { heading: string; items: string[] | Todo }) {
  return (
    <div>
      <h3 className="font-wide text-h3 font-semibold">{heading}</h3>
      <div className="mt-4">
        {isTodo(items) ? (
          <PlaceholderNote>{items.todo}</PlaceholderNote>
        ) : (
          <ul className="max-w-measure list-disc space-y-2 pl-5 font-serif text-body marker:text-accent">
            {items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/** G. Results and learnings. Verified outcomes only. */
export function CaseStudyResults({ project }: { project: Project }) {
  const { results, learnings } = project.caseStudy;

  return (
    <Section id="results" title="Results and learnings">
      <div className="grid gap-x-10 gap-y-10 xl:grid-cols-2">
        <Findings heading="Verified results" items={results} />
        <Findings heading="Learnings" items={learnings} />
      </div>
    </Section>
  );
}
