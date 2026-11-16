import { PlaceholderNote } from "@/components/ui/PlaceholderNote";
import { Tag, TagList } from "@/components/ui/Tag";
import { isTodo } from "@/data/projects/types";
import type { ExperienceEntryData } from "@/data/experience";

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-1 pl-5 marker:text-accent">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function Detail({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="font-mono text-label text-muted">{label}</p>
      <div className="mt-2 max-w-measure font-serif text-body">{children}</div>
    </div>
  );
}

/**
 * One timeline entry: the period in a narrow column, the details beside it.
 * A missing period shows a labeled placeholder, never an invented date.
 */
export function ExperienceEntry({ entry }: { entry: ExperienceEntryData }) {
  const { responsibilities, contributions, technologies } = entry;

  return (
    <li className="grid gap-x-8 gap-y-3 border-t border-rule py-8 md:grid-cols-[11rem_1fr]">
      <div className="space-y-1 font-mono text-label text-muted tabular-nums">
        <p>{entry.period ? entry.period : <Tag>Dates to be added</Tag>}</p>
        {entry.location ? <p>{entry.location}</p> : null}
      </div>

      <div className="min-w-0 space-y-6">
        <div>
          <h3 className="font-wide text-h3 font-semibold text-balance">
            {entry.organization}
          </h3>
          <p className="mt-1 text-accent">{entry.position}</p>
        </div>

        <p className="max-w-measure font-serif text-body">{entry.summary}</p>

        {responsibilities ? (
          <Detail label="Responsibilities">
            {isTodo(responsibilities) ? (
              <PlaceholderNote>{responsibilities.todo}</PlaceholderNote>
            ) : (
              <BulletList items={responsibilities} />
            )}
          </Detail>
        ) : null}

        {technologies && technologies.length > 0 ? (
          <div>
            <p className="font-mono text-label text-muted">Technologies</p>
            <div className="mt-2">
              <TagList label={`${entry.organization} technologies`} items={technologies} />
            </div>
          </div>
        ) : null}

        <Detail label="Contributions">
          {isTodo(contributions) ? (
            <PlaceholderNote>{contributions.todo}</PlaceholderNote>
          ) : (
            <BulletList items={contributions} />
          )}
        </Detail>
      </div>
    </li>
  );
}
