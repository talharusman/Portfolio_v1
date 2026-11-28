import type { Metadata } from "next";
import { ObsidianPage } from "@/components/ObsidianPage";
import { ContactCta } from "@/sections/ContactCta";
import { SkillDomains } from "@/sections/SkillDomains";
import { SkillsHero } from "@/sections/SkillsHero";

const description =
  "My work combines software engineering, intelligent systems, data processing, and application architecture.";

export const metadata: Metadata = {
  title: "Expertise",
  description,
};

export default function SkillsPage() {
  return (
    <ObsidianPage>
      <SkillsHero description={description} />
      <SkillDomains />
      <ContactCta />
    </ObsidianPage>
  );
}
