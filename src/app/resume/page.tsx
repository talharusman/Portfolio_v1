import type { Metadata } from "next";
import { Download } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { PlaceholderNote } from "@/components/ui/PlaceholderNote";
import { resume } from "@/data/resume";
import {
  Achievements,
  LeadershipActivities,
  TechnicalExperience,
} from "@/sections/ExperienceSections";
import {
  ResumeEducation,
  ResumeIntroduction,
  ResumePreview,
  ResumeProjects,
  ResumeSkills,
  resumePdfAvailable,
} from "@/sections/ResumeSections";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Resume of Talha Rusman: education, technical skills, projects, experience, leadership and achievements.",
};

export default function ResumePage() {
  const available = resumePdfAvailable();

  return (
    <>
      <PageHeader statement title="My professional journey, at a glance." />

      <Container className="pb-12">
        {available ? (
          <ButtonLink
            href={resume.file.publicPath}
            download={resume.file.downloadName}
          >
            <Download aria-hidden className="size-4" />
            Download Resume
          </ButtonLink>
        ) : (
          <PlaceholderNote className="max-w-measure">
            The resume PDF has not been added yet. The download button appears when
            the file is at public/resume/resume.pdf.
          </PlaceholderNote>
        )}
      </Container>

      <ResumeIntroduction />
      <ResumeEducation />
      <ResumeSkills />
      <ResumeProjects />
      <TechnicalExperience />
      <LeadershipActivities />
      <Achievements />
      <ResumePreview available={available} />
    </>
  );
}
