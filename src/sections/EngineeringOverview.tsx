import { BrainCircuit, Layers, Server, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { home } from "@/data/home";

const icons = [Layers, BrainCircuit, Server, Sparkles];

export function EngineeringOverview() {
  return (
    <section
      aria-label="Engineering overview"
      className="border-y border-(color:--ob-line) bg-(--ob-surface)/60"
    >
      <Container>
        <ul className="grid grid-cols-2 lg:grid-cols-4">
          {home.overview.map((item, index) => {
            const Icon = icons[index];
            return (
              <li
                key={item}
                className="group relative flex flex-col items-start gap-3 border-b border-(color:--ob-line) px-4 py-5 text-sm font-semibold text-(color:--ob-text) transition-colors duration-300 ease-(--ob-ease) odd:border-r hover:bg-(--ob-surface-2) max-lg:nth-last-[-n+2]:border-b-0 sm:text-base lg:flex-row lg:items-center lg:gap-4 lg:border-r lg:border-b-0 lg:px-6 lg:py-8 lg:first:pl-0 lg:last:border-r-0"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-(--ob-accent) shadow-[0_0_12px_rgba(242,96,12,0.9)] transition-transform duration-500 ease-(--ob-ease) group-hover:scale-x-100"
                />
                <span className="flex size-12 shrink-0 items-center justify-center rounded-lg border border-(color:--ob-line) bg-(--ob-bg) text-(color:--ob-accent) transition-all duration-300 ease-(--ob-ease) group-hover:border-(color:--ob-accent) group-hover:bg-(--ob-accent) group-hover:text-(color:--ob-on-accent)">
                  <Icon aria-hidden className="size-6" />
                </span>
                <span className="flex min-w-0 flex-col gap-0.5">
                  <span
                    aria-hidden
                    className="font-(family-name:--font-jetbrains) text-xs font-medium text-(color:--ob-meta)"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {item}
                </span>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
