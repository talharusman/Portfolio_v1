import { ProjectFigure } from "@/components/ProjectFigure";
import { Container } from "@/components/ui/Container";
import { SpecList } from "@/components/ui/SpecList";
import { Tag, TagList } from "@/components/ui/Tag";
import { TextLink } from "@/components/ui/TextLink";
import type { Project } from "@/data/projects";

/** A. Project introduction: name, category, overview, stack, links, main image. */
export function CaseStudyIntro({ project }: { project: Project }) {
  return (
    <header>
      <Container className="grid gap-x-8 gap-y-10 pt-16 pb-12 md:pt-24 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="font-mono text-label text-accent">{project.category}</p>
          <h1 className="mt-4 font-wide text-h1 font-semibold text-balance">
            {project.title}
          </h1>
          <p className="mt-6 max-w-measure font-serif text-lead text-muted">
            {project.summary}
          </p>
        </div>

        <SpecList
          className="self-end lg:col-span-5"
          items={[
            {
              term: "Discipline",
              detail: (
                <TagList label="Disciplines" tone="accent" items={project.disciplines} />
              ),
            },
            {
              term: "Stack",
              detail: <TagList label="Stack" items={project.stack} />,
            },
            {
              term: "GitHub",
              detail: project.repoUrl ? (
                <TextLink href={project.repoUrl}>Repository</TextLink>
              ) : (
                <Tag>Link to be added</Tag>
              ),
            },
            ...(project.liveUrl
              ? [
                  {
                    term: "Live demo",
                    detail: <TextLink href={project.liveUrl}>Open demo</TextLink>,
                  },
                ]
              : []),
          ]}
        />

        <div className="lg:col-span-12">
          <ProjectFigure
            src={project.image}
            alt={`${project.title} main screenshot`}
            label="Main project image"
            sizes="(min-width: 1280px) 1152px, 100vw"
            className="aspect-video"
          />
        </div>
      </Container>
    </header>
  );
}
