import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/data/projects";
import { CaseStudyArchitecture } from "@/sections/case-study/CaseStudyArchitecture";
import { CaseStudyChallenges } from "@/sections/case-study/CaseStudyChallenges";
import { CaseStudyGallery } from "@/sections/case-study/CaseStudyGallery";
import { CaseStudyImplementation } from "@/sections/case-study/CaseStudyImplementation";
import { CaseStudyIntro } from "@/sections/case-study/CaseStudyIntro";
import { CaseStudyNav } from "@/sections/case-study/CaseStudyNav";
import { CaseStudyProblem } from "@/sections/case-study/CaseStudyProblem";
import { CaseStudyResults } from "@/sections/case-study/CaseStudyResults";
import { CaseStudySolution } from "@/sections/case-study/CaseStudySolution";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata(
  props: PageProps<"/projects/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);
  return project ? { title: project.title, description: project.summary } : {};
}

export default async function ProjectPage(
  props: PageProps<"/projects/[slug]">,
) {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <>
      <CaseStudyIntro project={project} />
      <CaseStudyProblem project={project} />
      <CaseStudySolution project={project} />
      <CaseStudyArchitecture project={project} />
      <CaseStudyImplementation project={project} />
      <CaseStudyChallenges project={project} />
      <CaseStudyResults project={project} />
      <CaseStudyGallery project={project} />
      <CaseStudyNav slug={project.slug} />
    </>
  );
}
