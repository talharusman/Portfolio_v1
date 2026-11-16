import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { Section } from "@/components/ui/Section";
import type { Project } from "@/data/projects";

/** D. System architecture: only the layers this project actually has. */
export function CaseStudyArchitecture({ project }: { project: Project }) {
  return (
    <Section id="architecture" title="System architecture">
      <ArchitectureDiagram
        architecture={project.caseStudy.architecture}
        title={project.title}
      />
    </Section>
  );
}
