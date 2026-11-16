import { Prose } from "@/components/ui/Prose";
import { Section } from "@/components/ui/Section";
import { SpecList } from "@/components/ui/SpecList";
import { about } from "@/data/about";

export function AboutBackground() {
  const { paragraphs, facts } = about.background;

  return (
    <Section id="background" title="My background">
      <div className="grid gap-x-8 gap-y-10 xl:grid-cols-2">
        <Prose>
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Prose>
        <SpecList className="self-start" items={[...facts]} />
      </div>
    </Section>
  );
}
