import Link from "next/link";
import { SpecList } from "@/components/ui/SpecList";
import { TagList } from "@/components/ui/Tag";
import type { Project } from "@/data/projects";

/**
 * One row of the project index. The left column names the project; the right
 * column is its title block (disciplines and stack). The whole row is the link.
 */
export function ProjectEntry({ project }: { project: Project }) {
  return (
    <article className="group relative -mx-4 grid gap-x-8 gap-y-6 border-t border-rule px-4 py-8 transition-colors hover:bg-surface has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-0 has-[:focus-visible]:outline-accent lg:grid-cols-12">
      <div className="lg:col-span-5">
        <h3 className="font-wide text-h3 font-semibold">
          <Link
            href={`/projects/${project.slug}`}
            className="underline decoration-transparent decoration-2 underline-offset-4 transition-colors after:absolute after:inset-0 group-hover:decoration-accent focus-visible:outline-none"
          >
            {project.title}
          </Link>
        </h3>
        <p className="mt-3 max-w-measure font-serif text-body text-muted">
          {project.summary}
        </p>
      </div>
      <SpecList
        className="lg:col-span-7"
        items={[
          {
            term: "Discipline",
            detail: (
              <TagList
                label="Disciplines"
                tone="accent"
                items={project.disciplines}
              />
            ),
          },
          {
            term: "Stack",
            detail: <TagList label="Stack" items={project.stack} />,
          },
        ]}
      />
    </article>
  );
}
