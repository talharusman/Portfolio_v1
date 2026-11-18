import { BrainCircuit, Database, Layers } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { expertise } from "@/data/expertise";

const icons = [BrainCircuit, Layers, Database];

export function Capabilities() {
  return (
    <section id="capabilities" aria-labelledby="capabilities-title">
      <Container className="scroll-reveal py-section">
        <div className="flex items-center gap-6">
          <h2
            id="capabilities-title"
            className="min-w-0 font-(family-name:--font-space-grotesk) text-[clamp(1.75rem,1.1rem+2.6vw,3.25rem)] leading-[1] font-bold tracking-[-0.04em] text-balance text-(color:--ob-text) uppercase wrap-break-word md:shrink-0"
          >
            Engineering capabilities
          </h2>
          <span aria-hidden className="hidden h-px flex-1 bg-(--ob-accent)/60 md:block" />
        </div>
        <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {expertise.map((group, index) => {
            const Icon = icons[index] ?? Layers;
            return (
              <li
                key={group.title}
                className="group relative overflow-hidden rounded-xl border border-(color:--ob-line) bg-(--ob-surface) p-6 transition-colors duration-300 ease-(--ob-ease) hover:border-white/25 md:last:col-span-2 lg:p-8 lg:last:col-span-1"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-(--ob-accent) shadow-[0_0_12px_rgba(20,158,126,0.9)] transition-transform duration-500 ease-(--ob-ease) group-hover:scale-x-100"
                />
                <Icon
                  aria-hidden
                  strokeWidth={1}
                  className="pointer-events-none absolute -right-6 -bottom-6 size-40 text-(color:--ob-accent)/10 transition-all duration-500 ease-(--ob-ease) group-hover:-rotate-6 group-hover:scale-110 group-hover:text-(color:--ob-accent)/20"
                />
                <span className="relative flex size-12 items-center justify-center rounded-lg border border-(color:--ob-accent)/50 text-(color:--ob-accent) transition-colors duration-300 group-hover:bg-(--ob-accent) group-hover:text-(color:--ob-on-accent)">
                  <Icon aria-hidden className="size-6" />
                </span>
                <h3 className="relative mt-6 mb-5 text-xl font-semibold text-(color:--ob-text)">
                  {group.title}
                </h3>
                <ul
                  aria-label={group.title}
                  className="relative flex flex-wrap gap-2"
                >
                  {group.items.map((item) => (
                    <li
                      key={item}
                      translate="no"
                      className="rounded-md border border-(color:--ob-line) bg-(--ob-bg)/60 px-2.5 py-1 font-(family-name:--font-jetbrains) text-xs text-(color:--ob-muted) transition-colors duration-200 hover:border-(color:--ob-accent) hover:text-(color:--ob-accent)"
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
