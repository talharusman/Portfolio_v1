import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { about } from "@/data/about";
import { AboutBackground } from "@/sections/AboutBackground";
import { AreasOfInterest } from "@/sections/AreasOfInterest";
import { BeyondDevelopment } from "@/sections/BeyondDevelopment";
import { ContactCta } from "@/sections/ContactCta";
import { EngineeringPhilosophy } from "@/sections/EngineeringPhilosophy";

export const metadata: Metadata = {
  title: "About",
  description: about.hero.intro,
};

export default function AboutPage() {
  const { label, headline, intro } = about.hero;

  return (
    <>
      <PageHeader label={label} title={headline} lead={intro} statement />
      <AboutBackground />
      <EngineeringPhilosophy />
      <AreasOfInterest />
      <BeyondDevelopment />
      <ContactCta />
    </>
  );
}
