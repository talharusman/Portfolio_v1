import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { primaryDomainLabel } from "@/lib/project-display";

export function ProjectLedgerRow({
  project,
  index,
  onInspect,
}: {
  project: Project;
  index: string;
  onInspect: (event: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <li className="page-in group grid grid-cols-[2.5rem_1fr] items-center gap-4 border-b border-(color:--ob-line) py-4 sm:grid-cols-[3rem_1fr_9rem_1fr_6rem] sm:gap-6">
      <span className="font-(family-name:--font-jetbrains) text-xs font-medium text-(color:--ob-meta) tabular-nums">
        {index}
      </span>

      <div className="min-w-0">
        <p className="truncate font-(family-name:--font-space-grotesk) text-base font-bold text-(color:--ob-text)">
          {project.title}
        </p>
        <p className="mt-0.5 truncate text-xs text-(color:--ob-muted) sm:hidden">
          {primaryDomainLabel(project)}
        </p>
      </div>

      <p className="hidden truncate font-(family-name:--font-jetbrains) text-xs font-medium text-(color:--ob-muted) uppercase sm:block">
        {primaryDomainLabel(project)}
      </p>

      <p translate="no" className="hidden truncate text-sm text-(color:--ob-muted) sm:block">
        {project.stack.slice(0, 3).join(", ")}
      </p>

      <button
        type="button"
        onClick={onInspect}
        className="relative ml-auto flex min-h-11 items-center gap-1.5 overflow-hidden rounded-md px-3 text-sm font-semibold text-(color:--ob-text) transition-colors duration-200 group-hover:text-(color:--ob-accent)"
      >
        <span
          aria-hidden
          className="absolute inset-0 -z-10 origin-right scale-x-0 bg-(--ob-accent)/10 transition-transform duration-300 ease-(--ob-ease) group-hover:scale-x-100"
        />
        Inspect
        <ArrowUpRight aria-hidden className="size-3.5" />
      </button>
    </li>
  );
}
