import { Network, BrainCircuit, RefreshCcw, Target } from "lucide-react";
import { CornerBrackets } from "@/components/CornerBrackets";
import { EditorialSection } from "@/components/EditorialSection";
import { about } from "@/data/about";

// Oversized line-art watermarks, one per principle.
const watermarks = [Target, Network, BrainCircuit, RefreshCcw];

export function EngineeringPhilosophy() {
  return (
    <EditorialSection
      id="philosophy"
      index="02"
      label="Principles"
      title="Engineering philosophy"
    >
      <ol className="grid gap-3 sm:grid-cols-2 sm:gap-4">
        {about.philosophy.map((item, index) => {
          const Watermark = watermarks[index];
          return (
            <li
              key={item.title}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-(color:--ob-line) bg-(--ob-surface) p-5 shadow-(--ob-card-shadow) transition-[color,border-color,translate] sm:p-6 duration-300 ease-out hover:-translate-y-0.5 hover:border-(color:--ob-line-hover) lg:p-8"
            >
              <CornerBrackets variant="reticle" />
              <Watermark
                aria-hidden
                strokeWidth={1}
                className="pointer-events-none absolute -right-8 -bottom-8 size-48 text-(--ob-accent) opacity-[0.065] transition-transform duration-500 ease-(--ob-ease) group-hover:-rotate-6 group-hover:scale-110"
              />
              <p className="relative font-(family-name:--font-jetbrains) text-sm font-medium text-(color:--ob-accent) tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="relative mt-3 font-(family-name:--font-jakarta) text-lg leading-[1.08] sm:mt-4 sm:text-xl font-bold tracking-[-0.025em] text-balance text-(color:--ob-text) uppercase">
                {item.title}
              </h3>
              <p className="relative mt-2.5 max-w-[56ch] text-[0.9375rem] leading-[1.6] sm:mt-4 sm:text-base sm:leading-[1.65] text-(color:--ob-muted)">
                {item.text}
              </p>
            </li>
          );
        })}
      </ol>
    </EditorialSection>
  );
}
