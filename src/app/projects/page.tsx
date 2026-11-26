import type { Metadata } from "next";
import { Suspense } from "react";
import { ObsidianPage } from "@/components/ObsidianPage";
import { projects } from "@/data/projects";
import { ContactCta } from "@/sections/ContactCta";
import { FilteredProjectsExplorer } from "@/sections/FilteredProjectsExplorer";
import { ProjectsExplorer } from "@/sections/ProjectsExplorer";
import { ProjectsHero } from "@/sections/ProjectsHero";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A collection of intelligent applications, full-stack products, machine learning systems, and backend engineering projects.",
};

export default function ProjectsPage(props: PageProps<"/projects">) {
  return (
    <ObsidianPage>
      <ProjectsHero />
      {/* The unfiltered list is the fallback, so the page is complete before the filter resolves. */}
      <Suspense fallback={<ProjectsExplorer projects={projects} initialCategory="all" />}>
        <FilteredProjectsExplorer searchParams={props.searchParams} />
      </Suspense>
      <ContactCta />
    </ObsidianPage>
  );
}
