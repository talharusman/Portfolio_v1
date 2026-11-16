import { Section } from "@/components/ui/Section";
import { SpecList } from "@/components/ui/SpecList";
import { about } from "@/data/about";

export function BeyondDevelopment() {
  return (
    <Section id="beyond" title="Beyond development">
      <SpecList
        items={about.beyond.map((entry) => ({
          term: entry.kind,
          detail: (
            <>
              <p className="font-medium">{entry.title}</p>
              <p className="text-muted">{entry.context}</p>
            </>
          ),
        }))}
      />
    </Section>
  );
}
