import { Container } from "@/components/ui/Container";
import { about } from "@/data/about";
import { SystemBlueprint } from "@/components/SystemBlueprint";
import { revealDelay } from "@/lib/utils";

export function AboutHero() {
  const { label, headline, intro } = about.hero;

  return (
    <section aria-labelledby="about-title" className="relative">
      <Container className="grid grid-cols-[minmax(0,1fr)] items-center gap-x-10 gap-y-12 py-14 md:grid-cols-12 md:py-20">
        <div className="min-w-0 md:col-span-7">
          <p
            className="reveal inline-flex max-w-full items-center gap-2.5 rounded-md border border-(color:--ob-line) bg-(--ob-surface) px-3 py-1.5 font-(family-name:--font-jetbrains) text-[0.6875rem] font-medium tracking-[0.06em] text-(color:--ob-accent) uppercase sm:gap-3 sm:text-xs sm:tracking-[0.14em]"
            style={revealDelay(0)}
          >
            <span aria-hidden className="relative flex size-2">
              <span className="animate-ping-soft absolute inset-0 rounded-full bg-(--ob-accent)" />
              <span className="relative size-2 rounded-full bg-(--ob-accent)" />
            </span>
            {label}
          </p>
          <h1
            id="about-title"
            className="reveal mt-6 font-(family-name:--font-space-grotesk) text-[clamp(1.875rem,0.7rem+5.2vw,4.75rem)] leading-[0.95] font-bold tracking-[-0.04em] text-balance text-(color:--ob-text) uppercase wrap-break-word md:text-[clamp(2rem,1rem+3.4vw,4.25rem)]"
            style={revealDelay(100)}
          >
            {headline}
          </h1>
          <p
            className="reveal mt-6 max-w-xl text-lg leading-relaxed text-(color:--ob-muted)"
            style={revealDelay(260)}
          >
            {intro}
          </p>
        </div>

        <div className="reveal min-w-0 md:col-span-5" style={revealDelay(420)}>
          <SystemBlueprint />
        </div>
      </Container>
    </section>
  );
}
