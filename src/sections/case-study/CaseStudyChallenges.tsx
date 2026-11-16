import { PlaceholderNote } from "@/components/ui/PlaceholderNote";
import { Section } from "@/components/ui/Section";
import type { Project } from "@/data/projects";
import { isTodo } from "@/data/projects/types";

/** F. Engineering challenges: problems met, decisions made, how they were solved. */
export function CaseStudyChallenges({ project }: { project: Project }) {
  const { challenges } = project.caseStudy;

  return (
    <Section id="challenges" title="Engineering challenges">
      {isTodo(challenges) ? (
        <PlaceholderNote>{challenges.todo}</PlaceholderNote>
      ) : (
        <ul className="border-b border-rule">
          {challenges.map((challenge) => (
            <li key={challenge.title} className="border-t border-rule py-6">
              <h3 className="font-wide text-h3 font-semibold">{challenge.title}</h3>
              <p className="mt-3 max-w-measure font-serif text-body">
                {challenge.body}
              </p>
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}
