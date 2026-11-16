import { Section } from "@/components/ui/Section";
import { SpecList } from "@/components/ui/SpecList";
import { TagList } from "@/components/ui/Tag";
import { expertise } from "@/data/expertise";

export function Capabilities() {
  return (
    <Section id="capabilities" title="Engineering capabilities" uppercase>
      <SpecList
        items={expertise.map((group) => ({
          term: group.title,
          detail: <TagList label={group.title} items={group.items} />,
        }))}
      />
    </Section>
  );
}
