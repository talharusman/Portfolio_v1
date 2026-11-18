import { ArrowRight } from "lucide-react";
import { HeroPortrait } from "@/sections/HeroPortrait";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { TextLink } from "@/components/ui/TextLink";
import { home } from "@/data/home";
import { revealDelay } from "@/lib/utils";

export function Hero() {
  const { label, headline, description } = home.hero;

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="bg-accent-wash absolute inset-0" />
        <div className="bg-grid-fade absolute inset-0" />
      </div>
      <Container className="relative grid items-center gap-x-10 gap-y-12 py-12 grid-cols-[minmax(0,1fr)] lg:min-h-[calc(100svh-4.5rem)] lg:grid-cols-12 lg:py-10">
        <div className="min-w-0 lg:col-span-7">
          <p
            className="reveal inline-flex items-center gap-3 border border-rule bg-background px-3 py-1.5 font-mono text-label text-accent uppercase"
            style={revealDelay(0)}
          >
            <span aria-hidden className="relative flex size-2">
              <span className="animate-ping-soft absolute inset-0 rounded-full bg-accent" />
              <span className="relative size-2 rounded-full bg-accent" />
            </span>
            {label}
          </p>
          <h1
            id="hero-title"
            className="reveal mt-6 font-semiwide text-hero font-semibold text-balance uppercase wrap-break-word lg:text-[clamp(2.25rem,min(1rem+3.4vw,6.4vh),4.25rem)]"
            style={revealDelay(100)}
          >
            {headline}
          </h1>
          <p
            className="reveal mt-6 max-w-xl font-serif text-lead lg:text-[clamp(1.0625rem,2.7vh,1.5rem)]"
            style={revealDelay(260)}
          >
            {description}
          </p>
          <div
            className="reveal mt-8 flex flex-wrap items-center gap-x-3 gap-y-2"
            style={revealDelay(360)}
          >
            <ButtonLink href="/projects">Explore My Work</ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              Get In Touch
            </ButtonLink>
            <TextLink
              href="/resume"
              className="inline-flex sm:ml-3 min-h-11 items-center gap-2"
            >
              Download Resume
              <ArrowRight aria-hidden className="size-4" />
            </TextLink>
          </div>
        </div>

        <div className="reveal min-w-0 lg:col-span-5 lg:justify-self-end" style={revealDelay(500)}>
          <HeroPortrait />
        </div>
      </Container>
    </section>
  );
}
