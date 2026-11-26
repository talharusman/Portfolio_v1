import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectEntry } from "@/components/ProjectEntry";
import { Button, ButtonLink } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { Prose } from "@/components/ui/Prose";
import { Section } from "@/components/ui/Section";
import { SpecList } from "@/components/ui/SpecList";
import { Tag, TagList } from "@/components/ui/Tag";
import { TextAreaField, TextField } from "@/components/ui/TextField";
import { TextLink } from "@/components/ui/TextLink";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Design system",
  robots: { index: false },
};

const palette = [
  { token: "background", light: "#F7F5F2", dark: "#0A0A0A", cls: "bg-background" },
  { token: "foreground", light: "#141414", dark: "#F5F5F3", cls: "bg-foreground" },
  { token: "accent", light: "#C23D06", dark: "#F2600C", cls: "bg-accent" },
  { token: "muted", light: "62% mix", dark: "62% mix", cls: "bg-muted" },
  { token: "rule", light: "16% mix", dark: "16% mix", cls: "bg-rule" },
  { token: "surface", light: "4% mix", dark: "4% mix", cls: "bg-surface" },
];

const scale = [
  { name: "display", cls: "font-wide text-display font-semibold", sample: "Talha" },
  { name: "h1", cls: "font-wide text-h1 font-semibold", sample: "Systems that ship" },
  { name: "h2", cls: "font-wide text-h2 font-semibold", sample: "Architecture and trade-offs" },
  { name: "h3", cls: "font-wide text-h3 font-semibold", sample: "Secure AI Banking Gateway" },
  { name: "lead", cls: "font-serif text-lead", sample: "A short introduction set in the serif face." },
  { name: "body", cls: "font-serif text-body", sample: "Body copy is set in Source Serif at 17px with a 65-character measure." },
  { name: "small", cls: "text-small", sample: "Interface text, navigation and captions." },
  { name: "label", cls: "font-mono text-label", sample: "FastAPI, llama.cpp, PostgreSQL" },
];

// Development reference only: not part of the shipped site.
export default function DesignSystemPage() {
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <>
      <PageHeader
        title="Design system"
        lead="Reference for tokens and components. Visible in development only."
      />

      <Section id="color" title="Color">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {palette.map((item) => (
            <li key={item.token} className="border border-rule">
              <div className={`h-20 ${item.cls}`} />
              <div className="space-y-1 p-3">
                <p className="font-medium">{item.token}</p>
                <p className="font-mono text-label text-muted">
                  light {item.light}
                </p>
                <p className="font-mono text-label text-muted">
                  dark {item.dark}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="type" title="Typography">
        <ul className="space-y-8">
          {scale.map((item) => (
            <li
              key={item.name}
              className="grid gap-2 border-t border-rule pt-4 sm:grid-cols-[6rem_1fr]"
            >
              <span className="font-mono text-label text-muted">{item.name}</span>
              <span className={item.cls}>{item.sample}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="actions" title="Buttons and links">
        <div className="space-y-8">
          <div className="flex flex-wrap gap-3">
            <Button>Primary button</Button>
            <Button variant="secondary">Secondary button</Button>
            <Button disabled>Disabled</Button>
            <ButtonLink href="/projects">View projects</ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              Contact
            </ButtonLink>
          </div>
          <Prose>
            <p>
              Inline links use an accent underline:{" "}
              <TextLink href="/about">an internal link</TextLink> and{" "}
              <TextLink href="https://nextjs.org">an external link</TextLink>{" "}
              that opens in a new tab.
            </p>
          </Prose>
        </div>
      </Section>

      <Section id="labels" title="Technology labels">
        <div className="space-y-4">
          <TagList label="Stack example" items={["FastAPI", "Qwen2.5", "llama.cpp", "JWT"]} />
          <TagList label="Discipline example" tone="accent" items={["AI", "Full-stack"]} />
          <p className="text-muted">
            A single <Tag>Tag</Tag> can also be used inline.
          </p>
        </div>
      </Section>

      <Section id="projects" title="Project presentation">
        <div className="space-y-12">
          <div>
            {projects.slice(0, 3).map((project) => (
              <ProjectEntry key={project.slug} project={project} />
            ))}
          </div>
          <SpecList
            items={[
              { term: "Education", detail: "BS Artificial Intelligence, FAST-NUCES" },
              { term: "Focus", detail: "Full-stack engineering and AI engineering" },
            ]}
          />
        </div>
      </Section>

      <Section id="forms" title="Form components">
        <form className="max-w-measure space-y-6" noValidate>
          <TextField label="Name" name="name" autoComplete="name" />
          <TextField
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            hint="Used only to reply to you."
            error="Enter an email address in the form name@example.com."
            defaultValue="talha@"
          />
          <TextAreaField label="Message" name="message" />
          <Button type="submit">Send message</Button>
        </form>
      </Section>
    </>
  );
}
