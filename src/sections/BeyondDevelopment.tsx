import { BrainCircuit, Bot, Code, Trophy } from "lucide-react";
import { CornerBrackets } from "@/components/CornerBrackets";
import { EditorialSection } from "@/components/EditorialSection";
import { about } from "@/data/about";

// One icon per entry, in the same order as the data.
const icons = [BrainCircuit, Bot, Trophy, Code];

export function BeyondDevelopment() {
  return (
    <EditorialSection id="beyond" index="04" label="Leadership" title="Leadership">
      <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4">
        {about.beyond.map((entry, index) => {
          const Icon = icons[index] ?? Code;
          return (
            <li
              key={entry.title}
              className="group relative flex min-h-36 flex-col justify-between gap-6 rounded-2xl sm:min-h-44 sm:gap-8 border border-(color:--ob-line) bg-(--ob-surface) p-5 shadow-(--ob-card-shadow) transition-colors duration-300 ease-(--ob-ease) hover:border-(color:--ob-line-hover) sm:p-6 lg:p-8"
            >
              <CornerBrackets variant="reticle" />
              <div className="flex items-center justify-between gap-4">
                <span className="flex size-12 items-center justify-center rounded-lg border border-(color:--ob-accent)/50 text-(color:--ob-accent) transition-colors duration-300 group-hover:bg-(--ob-accent) group-hover:text-(color:--ob-on-accent)">
                  <Icon aria-hidden className="size-6" />
                </span>
                <span className="font-(family-name:--font-jetbrains) text-xs font-medium tracking-[0.14em] text-(color:--ob-meta) uppercase">
                  {entry.kind}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-balance sm:text-xl text-(color:--ob-text)">
                  {entry.title}
                </h3>
                <p className="mt-1.5 text-base text-(color:--ob-muted)">{entry.context}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </EditorialSection>
  );
}
