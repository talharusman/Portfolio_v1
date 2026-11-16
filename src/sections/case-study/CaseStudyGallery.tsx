import { ProjectFigure } from "@/components/ProjectFigure";
import { Section } from "@/components/ui/Section";
import type { Project } from "@/data/projects";

/** H. Project gallery: real screenshots and diagrams; labeled placeholders until supplied. */
export function CaseStudyGallery({ project }: { project: Project }) {
  return (
    <Section id="gallery" title="Project gallery">
      <ul className="grid gap-x-6 gap-y-8 sm:grid-cols-2">
        {project.caseStudy.gallery.map((item) => (
          <li key={item.caption}>
            <figure>
              <ProjectFigure
                src={item.src}
                alt={item.alt}
                label={item.caption}
                sizes="(min-width: 1024px) 36vw, (min-width: 640px) 45vw, 100vw"
              />
              <figcaption className="mt-2 font-mono text-label text-muted">
                {item.caption}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Section>
  );
}
