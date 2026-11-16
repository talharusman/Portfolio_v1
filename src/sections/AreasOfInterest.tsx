import { Section } from "@/components/ui/Section";
import { about } from "@/data/about";

export function AreasOfInterest() {
  return (
    <Section id="interests" title="Areas of interest">
      <ul className="grid border-t border-rule md:grid-cols-2 md:gap-x-10">
        {about.interests.map((interest) => (
          <li
            key={interest}
            className="border-b border-rule py-4 font-wide text-h3 font-semibold"
          >
            {interest}
          </li>
        ))}
      </ul>
    </Section>
  );
}
