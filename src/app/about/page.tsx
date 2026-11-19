import type { Metadata } from "next";
import { ObsidianPage } from "@/components/ObsidianPage";
import { about } from "@/data/about";
import { AboutBackground } from "@/sections/AboutBackground";
import { AboutCtaBanner } from "@/sections/AboutCtaBanner";
import { AboutHero } from "@/sections/AboutHero";
import { AreasOfInterest } from "@/sections/AreasOfInterest";
import { BeyondDevelopment } from "@/sections/BeyondDevelopment";
import { EngineeringPhilosophy } from "@/sections/EngineeringPhilosophy";

export const metadata: Metadata = {
  title: "About",
  description: about.hero.intro,
};

export default function AboutPage() {
  return (
    <ObsidianPage>
      <AboutHero />
      <AboutBackground />
      <EngineeringPhilosophy />
      <AreasOfInterest />
      <BeyondDevelopment />
      <AboutCtaBanner />
    </ObsidianPage>
  );
}
