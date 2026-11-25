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
    <article className="scroll-reveal grid items-center gap-x-10 gap-y-8 border-t border-rule py-12 first:border-t-0 lg:grid-cols-12 lg:py-16">
      <div className={cn("min-w-0 lg:col-span-7", reversed && "lg:order-last")}>
        {project.image ? (
          <ProjectFigure
            src={project.image}
            alt={`${project.title} screenshot`}
            label={project.category}
          />
        ) : (
          <div className="group relative aspect-4/3 overflow-hidden border border-foreground/40 bg-grid shadow-[8px_8px_0_0_var(--rule)] transition-all duration-300 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[10px_10px_0_0_var(--accent)]">
            <div aria-hidden className="bg-accent-wash absolute inset-0" />
            <span
              aria-hidden
              className="text-outline absolute -right-2 -bottom-6 font-wide text-[min(32vw,15rem)] leading-none font-bold tabular-nums transition-colors duration-300 group-hover:text-accent/15"
            >
              {number}
            </span>
            <div className="relative flex h-full flex-col justify-between p-4 font-mono text-label text-muted sm:p-5">
              <span className="flex items-center gap-2 text-foreground">
                <span aria-hidden className="size-2 bg-accent" />
                {project.category}
              </span>
              <span>Screenshot to be added</span>
            </div>
          </div>
        )}
      </div>

      <div className="min-w-0 space-y-6 lg:col-span-5">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
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
