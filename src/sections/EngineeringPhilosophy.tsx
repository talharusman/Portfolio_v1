import { Section } from "@/components/ui/Section";
import { about } from "@/data/about";

export function EngineeringPhilosophy() {
  return (
    <Section id="philosophy" title="Engineering philosophy">
      <ol className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
        {about.philosophy.map((item, index) => (
          <li key={item.title} className="border-t border-rule pt-6">
            <p className="font-wide text-h2 font-semibold text-accent tabular-nums">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-4 font-wide text-h3 font-semibold text-balance uppercase">
              {item.title}
            </h3>
            <p className="mt-3 font-serif text-body text-muted">{item.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
