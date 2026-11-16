import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { ContactCta } from "@/sections/ContactCta";
import { FilteredProjects } from "@/sections/FilteredProjects";
import { ProjectsBrowser } from "@/sections/ProjectsBrowser";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A collection of intelligent applications, full-stack products, machine learning systems, and backend engineering projects.",
};

export default function ProjectsPage(props: PageProps<"/projects">) {
  return (
    <>
      <PageHeader
        statement
        label="Selected engineering work"
        title="Thoughtfully engineered. Built to solve real problems."
        lead="A collection of intelligent applications, full-stack products, machine learning systems, and backend engineering projects."
      />
      {/* The unfiltered list is the fallback, so the page is complete before the filter resolves. */}
      <Suspense fallback={<ProjectsBrowser active="all" />}>
        <FilteredProjects searchParams={props.searchParams} />
      </Suspense>
      <ContactCta />
    </>
  );
}
