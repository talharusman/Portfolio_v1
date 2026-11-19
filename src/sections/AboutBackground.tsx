import { CornerBrackets } from "@/components/CornerBrackets";
import { TelemetryBars } from "@/components/TelemetryBars";
import { EditorialSection } from "@/components/EditorialSection";
import { about } from "@/data/about";

// One bar pattern per card.
const bars = [
  [40, 70, 55, 100, 65],
  [70, 45, 90, 60, 80],
  [55, 85, 40, 75, 95],
];

export function AboutBackground() {
  const { paragraphs, facts } = about.background;

  return (
    <EditorialSection id="background" index="01" label="Education" title="My background">
      <div className="space-y-6">
        <div className="space-y-4 rounded-xl border sm:space-y-5 border-(color:--ob-line) border-l-[3px] border-l-(--ob-accent) bg-(--ob-surface) p-5 shadow-(--ob-card-shadow) sm:p-8">
          {paragraphs.map((paragraph) => (
            <p key={paragraph} className="max-w-[56ch] text-[0.9375rem] leading-[1.6] text-(color:--ob-muted) sm:text-base sm:leading-[1.65]">
              {paragraph}
            </p>
          ))}
        </div>

        <dl className="grid gap-3 sm:grid-cols-3 sm:gap-4">
          {facts.map((fact, index) => (
            <div
              key={fact.term}
              className="group relative flex items-center justify-between gap-4 rounded-xl max-sm:py-4 sm:min-h-32 sm:flex-col sm:items-stretch sm:gap-6 border border-(color:--ob-line) bg-(--ob-surface) px-5 sm:py-5 shadow-(--ob-card-shadow) transition-colors duration-300 ease-(--ob-ease) hover:border-(color:--ob-line-hover)"
            >
              <CornerBrackets variant="reticle" />
              <TelemetryBars heights={bars[index]} className="max-sm:hidden" />
              <dt className="w-24 shrink-0 font-(family-name:--font-jetbrains) text-[0.6875rem] font-medium tracking-[0.14em] sm:w-auto sm:text-xs text-(color:--ob-meta) uppercase">
                {fact.term}
              </dt>
              <dd className="text-sm font-semibold text-(color:--ob-text) max-sm:text-right sm:text-base">{fact.detail}</dd>
            </div>
          ))}
        </dl>
      </div>
    </EditorialSection>
  );
}
