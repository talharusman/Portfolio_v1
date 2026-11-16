import { ArrowRight } from "lucide-react";
import { ProjectFigure } from "@/components/ProjectFigure";
import { SpecList } from "@/components/ui/SpecList";
import { Tag, TagList } from "@/components/ui/Tag";
import { TextLink } from "@/components/ui/TextLink";
import type { Project } from "@/data/projects";
import { isTodo } from "@/data/projects/types";
import { cn } from "@/lib/utils";

type ProjectShowcaseProps = {
  project: Project;
  /** Stable display number, for example "01". */
  number: string;
  /** Puts the image on the right at `lg` and above. */
  reversed?: boolean;
};

/** Full editorial entry for the Projects page. Alternates image and text sides. */
export function ProjectShowcase({ project, number, reversed }: ProjectShowcaseProps) {
  const { caseStudy } = project;

  return (
    <article
      id={project.slug}
      className="scroll-reveal grid items-start gap-x-10 gap-y-8 border-t border-rule py-12 first:border-t-0 lg:grid-cols-12 lg:py-16"
    >
      <div className={cn("min-w-0 lg:col-span-7", reversed && "lg:order-last")}>
        <ProjectFigure
          src={project.image}
          alt={`${project.title} screenshot`}
          label={project.category}
        />
      </div>

      <div className="min-w-0 space-y-6 lg:col-span-5">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="font-wide text-h2 font-semibold text-accent tabular-nums">
            {number}
          </span>
          <Tag>{project.category}</Tag>
        </div>
        <h2 className="font-wide text-h2 font-semibold text-balance">
          {project.title}
        </h2>
        <p className="font-serif text-body">{project.summary}</p>

        <SpecList
          items={[
            { term: "Problem", detail: caseStudy.problem.statement },
            {
              term: "Contribution",
              detail: isTodo(caseStudy.contribution) ? (
                <Tag>To be added</Tag>
              ) : (
                caseStudy.contribution
              ),
            },
            {
              term: "Implementation",
              detail: (
                <ul className="list-disc space-y-1 pl-4 marker:text-muted">
                  {project.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              ),
            },
            {
              term: "Stack",
              detail: <TagList label={`${project.title} stack`} items={project.stack} />,
            },
          ]}
        />

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2">
          <TextLink
            href={`/projects/${project.slug}`}
            className="inline-flex min-h-11 items-center gap-2"
          >
            View Case Study
            <ArrowRight aria-hidden className="size-4" />
          </TextLink>
          {project.repoUrl ? (
            <TextLink href={project.repoUrl} className="inline-flex min-h-11 items-center">
              GitHub
            </TextLink>
          ) : (
            <span className="inline-flex min-h-11 items-center text-muted">
              GitHub link to be added
            </span>
          )}
          {project.liveUrl ? (
            <TextLink href={project.liveUrl} className="inline-flex min-h-11 items-center">
              Live Demo
            </TextLink>
          ) : null}
        </div>
      </div>
    </article>
  );
}
