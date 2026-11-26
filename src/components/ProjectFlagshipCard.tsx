import { ArrowUpRight } from "lucide-react";
import { ProjectActionLinks } from "@/components/ProjectActionLinks";
import { ProjectMiniDiagram } from "@/components/ProjectMiniDiagram";
import type { Project } from "@/data/projects";
import { primaryDomainLabel } from "@/lib/project-display";

export function ProjectFlagshipCard({
  project,
  onInspect,
}: {
  project: Project;
  onInspect: (event: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <article className="reveal relative grid gap-x-10 gap-y-8 rounded-2xl border border-(color:--ob-line) bg-(--ob-surface) p-6 shadow-(--ob-card-shadow) sm:p-8 lg:grid-cols-12 lg:p-10">
      <div className="min-w-0 lg:col-span-7">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-(color:--ob-accent) bg-(--ob-accent)/10 px-3 py-1 font-(family-name:--font-jetbrains) text-[0.6875rem] font-medium tracking-[0.08em] text-(color:--ob-accent) uppercase">
            Featured architecture
          </span>
          <span className="font-(family-name:--font-jetbrains) text-sm font-medium text-(color:--ob-meta) tabular-nums">
            01
          </span>
          <span className="rounded-md border border-(color:--ob-line) px-2 py-0.5 font-(family-name:--font-jetbrains) text-[0.6875rem] font-medium text-(color:--ob-muted) uppercase">
            {primaryDomainLabel(project)}
          </span>
        </div>

        <h2 className="mt-5 font-(family-name:--font-space-grotesk) text-3xl font-bold tracking-[-0.02em] text-balance text-(color:--ob-text) sm:text-4xl">
          {project.title}
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-(color:--ob-muted) sm:text-lg">
          {project.caseStudy.problem.statement}
        </p>

        <ul className="mt-6 grid grid-cols-3 gap-4 border-t border-(color:--ob-line) pt-4">
          <li>
            <p className="font-(family-name:--font-jetbrains) text-[0.625rem] font-medium tracking-[0.08em] text-(color:--ob-meta) uppercase">
              Layers
            </p>
            <p className="mt-1 font-(family-name:--font-jetbrains) text-lg font-medium text-(color:--ob-text)">
              {project.caseStudy.architecture.layers.length}
            </p>
          </li>
          <li>
            <p className="font-(family-name:--font-jetbrains) text-[0.625rem] font-medium tracking-[0.08em] text-(color:--ob-meta) uppercase">
              Technologies
            </p>
            <p className="mt-1 font-(family-name:--font-jetbrains) text-lg font-medium text-(color:--ob-text)">
              {project.stack.length}
            </p>
          </li>
          <li>
            <p className="font-(family-name:--font-jetbrains) text-[0.625rem] font-medium tracking-[0.08em] text-(color:--ob-meta) uppercase">
              Disciplines
            </p>
            <p className="mt-1 truncate font-(family-name:--font-jetbrains) text-lg font-medium text-(color:--ob-text)">
              {project.disciplines.join(" + ")}
            </p>
          </li>
        </ul>

        <ul aria-label={`${project.title} stack`} className="mt-6 flex flex-wrap gap-1.5">
          {project.stack.map((item) => (
            <li
              key={item}
              translate="no"
              className="rounded-md border border-(color:--ob-line) px-2.5 py-1 font-(family-name:--font-jetbrains) text-xs text-(color:--ob-muted)"
            >
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onInspect}
            className="group inline-flex min-h-11 items-center gap-2 rounded-lg bg-(--ob-accent) px-5 text-sm font-semibold text-(color:--ob-on-accent) transition-all duration-300 ease-(--ob-ease) hover:-translate-y-0.5 hover:bg-(--ob-accent-hover) hover:shadow-[0_14px_30px_-14px_rgba(242,96,12,0.8)]"
          >
            Inspect architecture
            <ArrowUpRight aria-hidden className="size-4 transition-transform duration-300 ease-(--ob-ease) group-hover:translate-x-1 group-hover:-translate-y-1" />
          </button>
          <ProjectActionLinks project={project} className="rounded-lg border border-(color:--ob-line) p-1" />
        </div>
      </div>

      <div className="min-w-0 lg:col-span-5 lg:flex lg:items-center">
        <ProjectMiniDiagram
          architecture={project.caseStudy.architecture}
          title={project.title}
          size="large"
          className="w-full"
        />
      </div>
    </article>
  );
}
