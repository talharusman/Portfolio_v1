import { ArrowUpRight, Lock, Terminal } from "lucide-react";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

/**
 * GitHub / live-demo links. Renders a real, working link when the owner has
 * supplied the URL, and an honest disabled state otherwise — never a dead
 * link or a fake button.
 */
export function ProjectActionLinks({
  project,
  className,
}: {    
  project: Project;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {project.repoUrl ? (
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} source code (opens in a new tab)`}
          className="inline-flex size-9 items-center justify-center rounded-lg border border-(color:--ob-line) text-(color:--ob-muted) transition-colors duration-200 ease-(--ob-ease) hover:border-(color:--ob-line-hover) hover:text-(color:--ob-accent)"
        >
          <Terminal aria-hidden className="size-4" />
        </a>
      ) : (
        <span
          aria-label={`${project.title} source code: link to be added`}
          title="Repository link to be added"
          className="inline-flex size-9 items-center justify-center rounded-lg border border-dashed border-(color:--ob-line) text-(color:--ob-meta)"
        >
          <Lock aria-hidden className="size-3.5" />
        </span>
      )}
      {project.liveUrl ? (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} live demo (opens in a new tab)`}
          className="inline-flex size-9 items-center justify-center rounded-lg border border-(color:--ob-line) text-(color:--ob-muted) transition-colors duration-200 ease-(--ob-ease) hover:border-(color:--ob-line-hover) hover:text-(color:--ob-accent)"
        >
          <ArrowUpRight aria-hidden className="size-4" />
        </a>
      ) : null}
    </div>
  );
}
