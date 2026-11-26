import { ArrowUpRight } from "lucide-react";
import { CornerBrackets } from "@/components/CornerBrackets";
import { ProjectActionLinks } from "@/components/ProjectActionLinks";
import { ProjectMiniDiagram } from "@/components/ProjectMiniDiagram";
import type { Project } from "@/data/projects";
import { primaryDomainLabel } from "@/lib/project-display";

export function ProjectBentoCard({
  project,
  index,
  onInspect,
}: {
  project: Project;
  index: string;
  onInspect: (event: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  const layerCount = project.caseStudy.architecture.layers.length;
  const visibleStack = project.stack.slice(0, 5);
  const remaining = project.stack.length - visibleStack.length;

  return (
    <article className="group page-in relative flex flex-col rounded-2xl border border-(color:--ob-line) bg-(--ob-surface) shadow-(--ob-card-shadow) transition-colors duration-300 ease-(--ob-ease) hover:border-(color:--ob-line-hover)">
      <CornerBrackets />

      <div className="flex items-center justify-between gap-3 px-5 pt-5 sm:px-6 sm:pt-6">
        <div className="flex items-center gap-3">
          <span className="font-(family-name:--font-jetbrains) text-xs font-medium text-(color:--ob-meta) tabular-nums">
            {index}
          </span>
          <span className="inline-flex items-center rounded-md border border-(color:--ob-line) px-2 py-0.5 font-(family-name:--font-jetbrains) text-[0.6875rem] font-medium text-(color:--ob-muted) uppercase">
            {primaryDomainLabel(project)}
          </span>
        </div>
        <ProjectActionLinks project={project} />
      </div>

      <div className="px-5 pt-4 sm:px-6">
        <ProjectMiniDiagram architecture={project.caseStudy.architecture} title={project.title} />
      </div>

      <div className="flex flex-1 flex-col gap-3 px-5 pt-5 pb-6 sm:px-6">
        <h3 className="font-(family-name:--font-space-grotesk) text-xl font-bold tracking-[-0.01em] text-(color:--ob-text)">
          {project.title}
        </h3>
        <p className="line-clamp-3 text-sm leading-relaxed text-(color:--ob-muted)">
          {project.summary}
        </p>
        <span className="inline-flex w-fit items-center rounded-md border border-(color:--ob-line) bg-(--ob-surface-2) px-2.5 py-1 font-(family-name:--font-jetbrains) text-[0.6875rem] font-medium text-(color:--ob-accent)">
          {layerCount}-layer architecture
        </span>
        <ul aria-label={`${project.title} stack`} className="flex flex-wrap gap-1.5">
          {visibleStack.map((item) => (
            <li
              key={item}
              translate="no"
              className="rounded-md border border-(color:--ob-line) px-2 py-0.5 font-(family-name:--font-jetbrains) text-[0.6875rem] text-(color:--ob-muted)"
            >
              {item}
            </li>
          ))}
          {remaining > 0 ? (
            <li className="rounded-md border border-dashed border-(color:--ob-line) px-2 py-0.5 font-(family-name:--font-jetbrains) text-[0.6875rem] text-(color:--ob-meta)">
              +{remaining}
            </li>
          ) : null}
        </ul>

        <button
          type="button"
          onClick={onInspect}
          className="group/btn mt-auto flex min-h-11 items-center justify-between gap-2 border-t border-(color:--ob-line) pt-4 text-left text-sm font-semibold text-(color:--ob-text) transition-colors duration-200 hover:text-(color:--ob-accent)"
        >
          Inspect system architecture
          <ArrowUpRight
            aria-hidden
            className="size-4 shrink-0 transition-transform duration-300 ease-(--ob-ease) group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1"
          />
        </button>
      </div>
    </article>
  );
}
