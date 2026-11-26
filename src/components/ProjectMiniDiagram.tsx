import { ArrowRight } from "lucide-react";
import type { Architecture } from "@/data/projects/types";
import { cn } from "@/lib/utils";

type ProjectMiniDiagramProps = {
  architecture: Architecture;
  title: string;
  /** "compact" for bento cards, "large" for the flagship card and the dossier drawer. */
  size?: "compact" | "large";
  className?: string;
};

/**
 * Bespoke data-flow strip built from the project's own architecture layers
 * (never a generic icon set): one chip per layer, joined by arrows.
 */
export function ProjectMiniDiagram({
  architecture,
  title,
  size = "compact",
  className,
}: ProjectMiniDiagramProps) {
  const large = size === "large";

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-(color:--ob-line) bg-(--ob-surface-2)",
        large ? "px-5 py-6 sm:px-7 sm:py-8" : "px-4 py-5",
        className,
      )}
    >
      <div aria-hidden className="obsidian-grid pointer-events-none absolute inset-0 opacity-60" />
      <p
        className={cn(
          "relative font-(family-name:--font-jetbrains) font-medium text-(color:--ob-meta) uppercase",
          large ? "text-[0.6875rem] tracking-[0.1em]" : "text-[0.625rem] tracking-[0.08em]",
        )}
      >
        {`${title} // data flow`}
      </p>
      <ol
        aria-label={`${title}: architecture layers, in order`}
        className={cn(
          "relative mt-3 flex flex-wrap items-center gap-x-1.5 gap-y-2",
          large && "mt-4 gap-x-2.5",
        )}
      >
        {architecture.layers.map((layer, index) => (
          <li key={layer.label} className="flex items-center gap-1.5">
            {index > 0 ? (
              <ArrowRight aria-hidden className={cn("shrink-0 text-(color:--ob-accent)", large ? "size-4" : "size-3")} />
            ) : null}
            <span
              className={cn(
                "inline-flex items-center rounded-md border border-(color:--ob-line) bg-(--ob-surface) font-(family-name:--font-jetbrains) font-medium text-(color:--ob-text)",
                large ? "px-3 py-1.5 text-xs" : "px-2 py-1 text-[0.6875rem]",
              )}
            >
              {layer.label}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
