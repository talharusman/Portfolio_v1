import Image from "next/image";
import type { Project } from "@/data/projects";

/**
 * Project image frame. Shows the real screenshot when `project.image` is set;
 * until then it is an honest, labeled placeholder, never a fake screenshot.
 */
export function ProjectFigure({ project }: { project: Project }) {
  return (
    <div className="relative aspect-[4/3] overflow-hidden border border-rule bg-grid">
      {project.image ? (
        <Image
          src={project.image}
          alt={`${project.title} screenshot`}
          fill
          sizes="(min-width: 1024px) 58vw, 100vw"
          className="object-cover object-top"
        />
      ) : (
        <div className="flex h-full flex-col justify-between p-4 font-mono text-label text-muted">
          <span>{project.category}</span>
          <span>Screenshot to be added</span>
        </div>
      )}
    </div>
  );
}
