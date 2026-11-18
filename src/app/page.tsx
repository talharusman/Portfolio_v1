import { JsonLd } from "@/components/JsonLd";
import { profile } from "@/data/profile";
import { resume } from "@/data/resume";
import { siteUrl } from "@/lib/site";
import { Capabilities } from "@/sections/Capabilities";
import { ContactCta } from "@/sections/ContactCta";
import { EngineeringOverview } from "@/sections/EngineeringOverview";
import { FeaturedProjects } from "@/sections/FeaturedProjects";
import { Hero } from "@/sections/Hero";

// Facts only: name, title, links and school come from the owner's data files.
const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: siteUrl,
  jobTitle: "Full-Stack Developer and AI Engineer",
  description: resume.summary,
  sameAs: profile.links.map((link) => link.href),
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: resume.education.school,
  },
};

export default function Home() {
  return (
    <>
      <JsonLd data={person} />
      <Hero />
      <EngineeringOverview />
      <FeaturedProjects />
      <Capabilities />
      <ContactCta />
    </>
  );
}
