import { ProjectFeature } from "@/components/ProjectFeature";
import { Container } from "@/components/ui/Container";
import { TextLink } from "@/components/ui/TextLink";
import { featuredProjects } from "@/data/projects";

export function FeaturedProjects() {
  return (
    <section aria-labelledby="featured-title">
      <Container className="pt-section pb-8">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 pb-10">
          <h2 id="featured-title" className="font-wide text-h1 font-semibold">
            Selected projects
          </h2>
          <TextLink href="/projects" className="inline-flex min-h-11 items-center">
            All Projects
          </TextLink>
        </div>
        <div>
          {featuredProjects.map((project, index) => (
            <ProjectFeature
              key={project.slug}
              project={project}
              number={String(index + 1).padStart(2, "0")}
              reversed={index % 2 === 1}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
