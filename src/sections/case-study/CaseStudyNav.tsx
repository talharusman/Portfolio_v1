import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { getAdjacentProjects } from "@/data/projects";

const linkClass = "group block min-h-11 py-2 transition-colors hover:text-accent";

/** I. Navigation: previous project, back to all projects, next project. */
export function CaseStudyNav({ slug }: { slug: string }) {
  const { previous, next } = getAdjacentProjects(slug);

  return (
    <nav aria-label="Project navigation" className="border-t border-rule">
      <Container className="grid gap-x-8 gap-y-6 py-12 lg:grid-cols-3">
        <Link href={`/projects/${previous.slug}`} className={linkClass}>
          <span className="flex items-center gap-2 font-mono text-label text-muted">
            <ArrowLeft aria-hidden className="size-4" />
            Previous Project
          </span>
          <span className="mt-2 block font-wide text-h3 font-semibold text-balance">
            {previous.title}
          </span>
        </Link>
        <Link href="/projects" className={`${linkClass} lg:text-center`}>
          <span className="font-mono text-label text-muted">All Work</span>
          <span className="mt-2 block font-wide text-h3 font-semibold">
            Back to All Projects
          </span>
        </Link>
        <Link
          href={`/projects/${next.slug}`}
          className={`${linkClass} lg:text-right`}
        >
          <span className="flex items-center gap-2 font-mono text-label text-muted lg:justify-end">
            Next Project
            <ArrowRight aria-hidden className="size-4" />
          </span>
          <span className="mt-2 block font-wide text-h3 font-semibold text-balance">
            {next.title}
          </span>
        </Link>
      </Container>
    </nav>
  );
}
