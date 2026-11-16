import { existsSync } from "node:fs";
import path from "node:path";
import { ArrowRight } from "lucide-react";
import { PlaceholderNote } from "@/components/ui/PlaceholderNote";
import { Prose } from "@/components/ui/Prose";
import { Section } from "@/components/ui/Section";
import { SpecList } from "@/components/ui/SpecList";
import { TagList } from "@/components/ui/Tag";
import { TextLink } from "@/components/ui/TextLink";
import { resume } from "@/data/resume";

/** True when the real PDF has been placed in public/. Nothing links to a missing file. */
export const resumePdfAvailable = () =>
  existsSync(path.join(process.cwd(), "public", resume.file.publicPath));

export function ResumeIntroduction() {
  return (
    <Section id="introduction" title="Professional introduction">
      <Prose>
        <p>{resume.summary}</p>
      </Prose>
    </Section>
  );
}

export function ResumeEducation() {
  const { education } = resume;

  return (
    <Section id="education" title="Education">
      <div className="grid gap-x-8 gap-y-3 md:grid-cols-[11rem_1fr]">
        <div className="space-y-1 font-mono text-label text-muted tabular-nums">
          <p>{education.period}</p>
          <p>{education.location}</p>
        </div>
        <div className="min-w-0 space-y-6">
          <div>
            <h3 className="font-wide text-h3 font-semibold text-balance">
              {education.degree}
            </h3>
            <p className="mt-1 text-accent">{education.school}</p>
          </div>
          <div>
            <p className="font-mono text-label text-muted">Coursework</p>
            <div className="mt-2">
              <TagList label="Coursework" items={[...education.coursework]} />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

export function ResumeSkills() {
  return (
    <Section id="skills" title="Technical skills">
      <SpecList
        items={resume.skills.map((group) => ({
          term: group.group,
          detail: <TagList label={group.group} items={[...group.items]} />,
        }))}
      />
    </Section>
  );
}

export function ResumeProjects() {
  return (
    <Section id="projects" title="Projects">
      <ol className="border-b border-rule">
        {resume.projects.map((project) => (
          <li
            key={project.title}
            className="grid gap-x-8 gap-y-3 border-t border-rule py-8 md:grid-cols-[11rem_1fr]"
          >
            <p className="font-mono text-label text-muted tabular-nums">
              {project.period}
            </p>
            <div className="min-w-0 space-y-4">
              <h3 className="font-wide text-h3 font-semibold text-balance">
                {project.title}
              </h3>
              <TagList label={`${project.title} stack`} items={[...project.stack]} />
              <ul className="max-w-measure list-disc space-y-1 pl-5 font-serif text-body marker:text-accent">
                {project.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
              {"caseStudySlug" in project ? (
                <TextLink
                  href={`/projects/${project.caseStudySlug}`}
                  className="inline-flex min-h-11 items-center gap-2"
                >
                  View Case Study
                  <ArrowRight aria-hidden className="size-4" />
                </TextLink>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}

/** Document-style frame around the real PDF; a labeled placeholder until the file exists. */
export function ResumePreview({ available }: { available: boolean }) {
  const { publicPath, downloadName } = resume.file;

  return (
    <Section id="preview" title="Document preview">
      <div className="mx-auto max-w-2xl border border-rule bg-grid p-4 sm:p-8">
        <div className="aspect-17/22 border border-muted bg-background">
          {available ? (
            <object
              data={`${publicPath}#view=FitH`}
              type="application/pdf"
              aria-label="Resume PDF preview"
              className="size-full"
            >
              <div className="flex h-full flex-col items-start justify-center gap-3 p-6">
                <p className="font-serif text-body">
                  Your browser cannot show the PDF here.
                </p>
                <TextLink
                  href={publicPath}
                  download={downloadName}
                  className="inline-flex min-h-11 items-center"
                >
                  Download the PDF
                </TextLink>
              </div>
            </object>
          ) : (
            <div className="flex h-full items-center p-6">
              <PlaceholderNote>
                Resume preview. Place the PDF at public/resume/resume.pdf and it appears
                here.
              </PlaceholderNote>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
