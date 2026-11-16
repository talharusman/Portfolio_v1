import { ExperienceEntry } from "@/components/ExperienceEntry";
import { PlaceholderNote } from "@/components/ui/PlaceholderNote";
import { Section } from "@/components/ui/Section";
import { SpecList } from "@/components/ui/SpecList";
import { TextLink } from "@/components/ui/TextLink";
import { achievements, leadership, technicalExperience } from "@/data/experience";

export function TechnicalExperience() {
  return (
    <Section id="technical-experience" title="Technical experience">
      {technicalExperience.length > 0 ? (
        <ol className="border-b border-rule">
          {technicalExperience.map((entry) => (
            <ExperienceEntry
              key={`${entry.organization}-${entry.position}`}
              entry={entry}
            />
          ))}
        </ol>
      ) : (
        <div className="space-y-4">
          <PlaceholderNote>
            Internships and engineering work go here: organization, position,
            duration, responsibilities, technologies and your contributions.
          </PlaceholderNote>
          <p className="max-w-measure font-serif text-body text-muted">
            The engineering work shown so far is in the{" "}
            <TextLink href="/projects">project case studies</TextLink>.
          </p>
        </div>
      )}
    </Section>
  );
}

export function LeadershipActivities() {
  return (
    <Section id="leadership" title="Leadership & activities">
      <ol className="border-b border-rule">
        {leadership.map((entry) => (
          <ExperienceEntry
            key={`${entry.organization}-${entry.position}`}
            entry={entry}
          />
        ))}
      </ol>
    </Section>
  );
}

export function Achievements() {
  return (
    <Section id="achievements" title="Achievements">
      <SpecList
        items={achievements.map((achievement) => ({
          term: achievement.context,
          detail: (
            <p className="font-wide text-h3 font-semibold">{achievement.title}</p>
          ),
        }))}
      />
    </Section>
  );
}
