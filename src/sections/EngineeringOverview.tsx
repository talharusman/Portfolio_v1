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
        <ul className="divide-y divide-(--ob-line) lg:grid lg:grid-cols-4 lg:divide-x lg:divide-y-0">
          {home.overview.map((item, index) => {
            const Icon = icons[index];
            return (
              <li
                key={item}
                className="group flex items-center gap-4 py-6 text-base font-semibold text-(color:--ob-text) transition-colors duration-300 ease-(--ob-ease) hover:bg-white/[0.03] lg:px-6 lg:py-8 lg:first:pl-0"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-lg border border-(color:--ob-line) bg-(--ob-bg) text-(color:--ob-accent) transition-all duration-300 ease-(--ob-ease) group-hover:border-(color:--ob-accent) group-hover:bg-(--ob-accent) group-hover:text-(color:--ob-on-accent)">
                  <Icon aria-hidden className="size-6" />
                </span>
                {item}
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
