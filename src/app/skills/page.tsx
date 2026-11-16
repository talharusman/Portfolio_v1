import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Tag } from "@/components/ui/Tag";
import { ContactCta } from "@/sections/ContactCta";
import { SkillDomains } from "@/sections/SkillDomains";

const description =
  "My work combines software engineering, intelligent systems, data processing, and application architecture.";

export const metadata: Metadata = {
  title: "Expertise",
  description,
};

export default function SkillsPage() {
  return (
    <>
      <PageHeader
        statement
        title="The technologies behind what I build."
        lead={description}
      />
      <Container className="pb-12">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-2 text-muted">
          <Tag tone="accent">Accent label</Tag>
          appears in the stack of a project on this site. Plain labels are areas of
          knowledge without a listed project yet.
        </p>
      </Container>
      <SkillDomains />
      <ContactCta />
    </>
  );
}
