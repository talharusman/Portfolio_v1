import { ArrowRight } from "lucide-react";
import { ProjectFigure } from "@/components/ProjectFigure";
import { Tag, TagList } from "@/components/ui/Tag";
import { TextLink } from "@/components/ui/TextLink";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

type ProjectFeatureProps = {
  project: Project;
  /** Display number, for example "01". */
  number: string;
  /** Puts the image on the right at `lg` and above. */
  reversed?: boolean;
};

/** Large editorial project layout used on the home page. Alternates sides. */
export function ProjectFeature({ project, number, reversed }: ProjectFeatureProps) {
  return (
    <article className="grid items-center gap-x-10 gap-y-8 border-t border-rule py-12 first:border-t-0 lg:grid-cols-12 lg:py-16">
      <div className={cn("min-w-0 lg:col-span-7", reversed && "lg:order-last")}>
        <ProjectFigure project={project} />
      </div>

      <div className="min-w-0 space-y-6 lg:col-span-5">
        <div className="flex items-center gap-4">
          <span className="font-wide text-h2 font-semibold text-accent tabular-nums">
            {number}
          </span>
          <Tag>{project.category}</Tag>
        </div>
        <h3 className="font-wide text-h2 font-semibold text-balance">
          {project.title}
        </h3>
        <p className="font-serif text-body text-muted">{project.summary}</p>
        <TagList label={`${project.title} stack`} items={project.stack} />
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
          ) : null}
        </div>
      </div>
    </article>
  );
}
