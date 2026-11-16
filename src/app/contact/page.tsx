import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactForm } from "@/components/ContactForm";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { SpecList } from "@/components/ui/SpecList";
import { TextLink } from "@/components/ui/TextLink";
import { profile } from "@/data/profile";
import { ContactFormSection } from "@/sections/ContactFormSection";

const description =
  "I’m always interested in meaningful engineering challenges, AI-powered products, and opportunities to collaborate.";

export const metadata: Metadata = {
  title: "Contact",
  description,
};

export default function ContactPage() {
  const linkClass = "inline-flex min-h-11 items-center";
  const [linkedin, github] = profile.links;

  return (
    <>
      <PageHeader
        statement
        label="Let’s connect"
        title="Have something interesting to build?"
        lead={description}
      />

      <Section id="details" title="Contact information">
        <SpecList
          items={[
            {
              term: "Email",
              detail: (
                <TextLink
                  href={`mailto:${profile.email}`}
                  className={linkClass}
                  translate="no"
                >
                  {profile.email}
                </TextLink>
              ),
            },
            {
              term: linkedin.label,
              detail: (
                <TextLink href={linkedin.href} className={linkClass} translate="no">
                  linkedin.com/in/talharusman
                </TextLink>
              ),
            },
            {
              term: github.label,
              detail: (
                <TextLink href={github.href} className={linkClass} translate="no">
                  github.com/talharusman
                </TextLink>
              ),
            },
            { term: "Location", detail: profile.location },
          ]}
        />
      </Section>

      <Section id="message" title="Send a message">
        {/* Disabled until the server is configured; the real state resolves at request time. */}
        <Suspense fallback={<ContactForm disabled email={profile.email} />}>
          <ContactFormSection />
        </Suspense>
      </Section>

      <section aria-labelledby="closing-title" className="border-t border-rule">
        <Container className="py-section">
          <h2
            id="closing-title"
            className="max-w-5xl font-semiwide text-h1 font-semibold text-balance uppercase"
          >
            Good software starts with a good conversation.
          </h2>
        </Container>
      </section>
    </>
  );
}
