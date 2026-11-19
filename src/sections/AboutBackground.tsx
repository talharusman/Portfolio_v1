import { CornerBrackets } from "@/components/CornerBrackets";
import { EditorialSection } from "@/components/EditorialSection";
import { about } from "@/data/about";

export function AboutBackground() {
  const { paragraphs, facts } = about.background;

  return (
    <EditorialSection id="background" index="01" label="Education" title="My background">
      <div className="space-y-6">
        <div className="space-y-5 rounded-xl border border-(color:--ob-line) border-l-[3px] border-l-(--ob-accent) bg-(--ob-surface) p-6 shadow-(--ob-card-shadow) sm:p-8">
          {paragraphs.map((paragraph) => (
            <p key={paragraph} className="max-w-prose text-base leading-relaxed text-(color:--ob-muted) sm:text-lg">
              {paragraph}
            </p>
          ))}
        </div>

        <dl className="grid gap-4 sm:grid-cols-3">
          {facts.map((fact) => (
            <div
              key={fact.term}
              className="group relative flex min-h-32 flex-col justify-between gap-6 rounded-xl border border-(color:--ob-line) bg-(--ob-surface) p-5 shadow-(--ob-card-shadow) transition-colors duration-300 ease-(--ob-ease) hover:border-(color:--ob-line-hover)"
            >
              <CornerBrackets />
              <dt className="font-(family-name:--font-jetbrains) text-xs font-medium tracking-[0.14em] text-(color:--ob-meta) uppercase">
                {fact.term}
              </dt>
              <dd className="text-base font-semibold text-(color:--ob-text)">{fact.detail}</dd>
            </div>
          ))}
        </dl>
      </div>
    </EditorialSection>
  );
}
