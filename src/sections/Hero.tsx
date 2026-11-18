import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { home } from "@/data/home";
import { revealDelay } from "@/lib/utils";
import { HeroPortrait } from "@/sections/HeroPortrait";

const button =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-6 text-sm font-semibold transition-all duration-300 ease-(--ob-ease)";

export function Hero() {
  const { label, headline, description } = home.hero;

  return (
    <section aria-labelledby="hero-title" className="relative">
      <Container className="relative grid grid-cols-[minmax(0,1fr)] items-center gap-x-10 gap-y-12 py-12 md:min-h-[min(calc(100svh-4.5rem),52rem)] md:grid-cols-12 md:py-10">
        <div className="min-w-0 md:col-span-7">
          <p
            className="reveal inline-flex items-center gap-3 rounded-md border border-(color:--ob-line) bg-(--ob-surface) px-3 py-1.5 font-(family-name:--font-jetbrains) text-xs font-medium tracking-[0.14em] text-(color:--ob-accent) uppercase"
            style={revealDelay(0)}
          >
            <span aria-hidden className="relative flex size-2">
              <span className="animate-ping-soft absolute inset-0 rounded-full bg-(--ob-accent)" />
              <span className="relative size-2 rounded-full bg-(--ob-accent)" />
            </span>
            {label}
          </p>
          <h1
            id="hero-title"
            className="reveal mt-6 font-(family-name:--font-space-grotesk) text-[clamp(1.875rem,0.7rem+5.6vw,5rem)] leading-[0.95] font-bold tracking-[-0.04em] text-balance text-(color:--ob-text) uppercase wrap-break-word md:text-[clamp(2.25rem,min(1rem+3.8vw,7vh),4.75rem)]"
            style={revealDelay(100)}
          >
            {headline}
          </h1>
          <p
            className="reveal mt-6 max-w-xl text-lg leading-relaxed text-(color:--ob-muted) md:text-[clamp(1rem,2.5vh,1.25rem)]"
            style={revealDelay(260)}
          >
            {description}
          </p>
          <div
            className="reveal mt-8 flex w-fit flex-col gap-3 lg:flex-row lg:items-center"
            style={revealDelay(360)}
          >
            <div className="flex gap-3 lg:contents">
            <Link
              href="/projects"
              className={`${button} bg-(--ob-accent) text-(color:--ob-on-accent) hover:-translate-y-0.5 hover:bg-(--ob-accent-hover) hover:shadow-[0_14px_30px_-14px_rgba(20,158,126,0.8)]`}
            >
              Explore My Work
            </Link>
            <Link
              href="/contact"
              className={`${button} border border-(color:--ob-line) bg-(--ob-surface) text-(color:--ob-text) hover:border-(color:--ob-line-hover)`}
            >
              Get In Touch
            </Link>
            </div>
            <Link
              href="/resume"
              className={`${button} group w-full lg:w-auto border border-(color:--ob-line) text-(color:--ob-text) hover:border-(color:--ob-line-hover) hover:text-(color:--ob-accent)`}
            >
              Download Resume
              <ArrowRight
                aria-hidden
                className="size-4 transition-transform duration-300 ease-(--ob-ease) group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>

        <div className="reveal min-w-0 md:col-span-5 md:justify-self-end" style={revealDelay(500)}>
          <HeroPortrait />
        </div>
      </Container>
    </section>
  );
}
