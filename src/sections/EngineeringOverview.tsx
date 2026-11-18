import { BrainCircuit, Layers, Server, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { home } from "@/data/home";

const icons = [Layers, BrainCircuit, Server, Sparkles];

export function EngineeringOverview() {
  return (
    <section aria-label="Engineering overview" className="border-y border-rule">
      <Container>
        <ul className="divide-y divide-rule lg:grid lg:grid-cols-4 lg:divide-x lg:divide-y-0">
          {home.overview.map((item, index) => {
            const Icon = icons[index];
            return (
              <li
                key={item}
                className="group flex items-center gap-4 py-6 text-small font-medium transition-colors duration-200 hover:bg-surface lg:px-6 lg:first:pl-0"
              >
                <span className="flex size-10 shrink-0 items-center justify-center border border-rule text-accent transition-colors duration-200 group-hover:border-accent group-hover:bg-accent group-hover:text-on-accent">
                  <Icon aria-hidden className="size-5" />
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
