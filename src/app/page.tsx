import { Capabilities } from "@/sections/Capabilities";
import { ContactCta } from "@/sections/ContactCta";
import { EngineeringOverview } from "@/sections/EngineeringOverview";
import { FeaturedProjects } from "@/sections/FeaturedProjects";
import { Hero } from "@/sections/Hero";

export default function Home() {
  return (
    <>
      <Hero />
      <EngineeringOverview />
      <FeaturedProjects />
      <Capabilities />
      <ContactCta />
    </>
  );
}
