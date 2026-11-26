import { BrainCircuit, Database, Layers } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { expertise } from "@/data/expertise";

const icons = [BrainCircuit, Layers, Database];

const bracket =
  "pointer-events-none absolute size-3 border-(--ob-accent) opacity-40 transition-all duration-300 ease-(--ob-ease) group-hover:size-5 group-hover:opacity-100 group-hover:drop-shadow-[0_0_6px_rgba(242,96,12,0.8)]";

export function Capabilities() {
  return (
    <section id="capabilities" aria-labelledby="capabilities-title">
      <Container className="scroll-reveal py-24 lg:py-28">
        <p className="font-(family-name:--font-jetbrains) text-xs font-medium tracking-[0.18em] text-(color:--ob-accent) uppercase">
          02 // Technical architecture
        </p>
        <div className="mt-4 flex items-center gap-6">
          <h2
            id="capabilities-title"
            className="min-w-0 font-(family-name:--font-space-grotesk) text-[clamp(1.75rem,1.1rem+2.6vw,3.25rem)] leading-[0.95] font-bold tracking-[-0.04em] text-balance text-(color:--ob-text) uppercase wrap-break-word md:shrink-0"
          >
            Engineering capabilities
          </h2>
          <span aria-hidden className="hidden h-px flex-1 bg-(--ob-accent)/60 md:block" />
        </div>
        <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {expertise.map((group, index) => {
            const Icon = icons[index] ?? Layers;
            return (
              <li
                key={group.title}
                className="group relative overflow-hidden rounded-2xl border border-(color:--ob-line) bg-(--ob-surface) p-6 shadow-(--ob-card-shadow) transition-colors duration-300 ease-(--ob-ease) hover:border-(color:--ob-line-hover) md:last:col-span-2 lg:p-8 lg:last:col-span-1"
              >
                <span aria-hidden className={`${bracket} top-3 left-3 border-t-2 border-l-2`} />
                <span aria-hidden className={`${bracket} right-3 bottom-3 border-r-2 border-b-2`} />
                <Icon
                  aria-hidden
                  strokeWidth={1}
                  className="pointer-events-none absolute -right-6 -bottom-6 size-44 text-(color:--ob-accent)/10 transition-all duration-500 ease-(--ob-ease) group-hover:-rotate-6 group-hover:scale-110 group-hover:text-(color:--ob-accent)/20"
                />
                <span className="relative flex size-12 items-center justify-center rounded-lg border border-(color:--ob-accent)/50 text-(color:--ob-accent) transition-colors duration-300 group-hover:bg-(--ob-accent) group-hover:text-(color:--ob-on-accent)">
                  <Icon aria-hidden className="size-6" />
                </span>
                <h3 className="relative mt-6 mb-5 text-xl font-semibold text-(color:--ob-text)">
                  {group.title}
                </h3>
                <ul aria-label={group.title} className="relative flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      translate="no"
                      className="rounded-md border border-(color:--ob-line) bg-(--ob-surface-2) px-2.5 py-1 font-(family-name:--font-jetbrains) text-xs text-(color:--ob-muted) transition-colors duration-200 hover:border-(color:--ob-line-hover) hover:text-(color:--ob-accent)"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
