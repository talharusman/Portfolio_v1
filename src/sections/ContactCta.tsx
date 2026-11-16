import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { home } from "@/data/home";

export function ContactCta() {
  const { headline, description } = home.cta;

  return (
    <section aria-labelledby="cta-title" className="border-t border-rule">
      <Container className="grid gap-x-6 gap-y-8 py-section lg:grid-cols-12">
        <h2
          id="cta-title"
          className="font-semiwide text-h1 font-semibold text-balance uppercase lg:col-span-9"
        >
          {headline}
        </h2>
        <div className="space-y-8 lg:col-span-6 lg:col-start-4">
          <p className="font-serif text-lead text-muted">{description}</p>
          <ButtonLink href="/contact">
            Start a Conversation
            <ArrowRight aria-hidden className="size-4" />
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
