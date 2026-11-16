import { ArrowRight } from "lucide-react";
import { HeroVisual } from "@/sections/HeroVisual";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { TextLink } from "@/components/ui/TextLink";
import { home } from "@/data/home";
import { revealDelay } from "@/lib/utils";

export function Hero() {
  const { label, headline, description } = home.hero;

  return (
    <section aria-labelledby="hero-title">
      <Container className="pt-14 pb-16 md:pt-20 md:pb-24">
        <p
          className="reveal font-mono text-label text-accent uppercase"
          style={revealDelay(0)}
        >
          {label}
        </p>
        <h1
          id="hero-title"
          className="reveal mt-6 font-semiwide text-hero font-semibold text-balance uppercase wrap-break-word"
          style={revealDelay(100)}
        >
          {headline}
        </h1>

        <div className="mt-12 grid gap-x-8 gap-y-12 lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-5">
            <p
              className="reveal font-serif text-lead"
              style={revealDelay(260)}
            >
              {description}
            </p>
            <div
              className="reveal mt-8 flex flex-wrap gap-3"
              style={revealDelay(360)}
            >
              <ButtonLink href="/projects">Explore My Work</ButtonLink>
              <ButtonLink href="/contact" variant="secondary">
                Get In Touch
              </ButtonLink>
            </div>
            <p className="reveal mt-6" style={revealDelay(440)}>
              <TextLink
                href="/resume"
                className="inline-flex min-h-11 items-center gap-2"
              >
                Download Resume
                <ArrowRight aria-hidden className="size-4" />
              </TextLink>
            </p>
          </div>

          <div className="reveal min-w-0 lg:col-span-7" style={revealDelay(500)}>
            <HeroVisual />
          </div>
        </div>
      </Container>
    </section>
  );
}
