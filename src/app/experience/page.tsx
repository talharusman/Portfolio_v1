import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { ContactCta } from "@/sections/ContactCta";
import {
  Achievements,
  LeadershipActivities,
  TechnicalExperience,
} from "@/sections/ExperienceSections";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Technical experience, leadership and achievements, and where I have applied my skills.",
};

export default function ExperiencePage() {
  return (
    <>
      <PageHeader statement title="Where I’ve applied my skills." />
      <TechnicalExperience />
      <LeadershipActivities />
      <Achievements />
      <ContactCta />
    </>
  );
}
