import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { SpecList } from "@/components/ui/SpecList";
import { TagList } from "@/components/ui/Tag";
import { TextLink } from "@/components/ui/TextLink";
import { getProject, projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata(
  props: PageProps<"/projects/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);
  return project ? { title: project.title, description: project.summary } : {};
}

// Phase 2 stand-in: confirmed facts only. The full case study is built in Phase 3.
export default async function ProjectPage(
  props: PageProps<"/projects/[slug]">,
) {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <>
      <PageHeader title={project.title} lead={project.summary} />
      <Section id="overview" title="At a glance">
        <div className="space-y-8">
          <SpecList
            items={[
              { term: "Category", detail: project.category },
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
              ...(project.repoUrl
                ? [
                    {
                      term: "Source",
                      detail: (
                        <TextLink href={project.repoUrl}>Repository</TextLink>
                      ),
                    },
                  ]
                : []),
            ]}
          />
          <p className="max-w-measure font-serif text-body text-muted">
            The full case study, covering architecture, implementation,
            challenges and results, is being written.
          </p>
        </div>
      </Section>
    </>
  );
}
