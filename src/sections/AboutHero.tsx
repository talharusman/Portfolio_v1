import { Container } from "@/components/ui/Container";
import { about } from "@/data/about";
import { SystemBlueprint } from "@/components/SystemBlueprint";
import { revealDelay } from "@/lib/utils";

export function AboutHero() {
  const { label, headline, intro } = about.hero;

  return (
    <section aria-labelledby="about-title" className="relative overflow-x-clip">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 right-0 size-[28rem] -translate-y-1/2 rounded-full bg-[rgba(255,90,31,0.12)] blur-[120px]" />
      </div>
      <Container className="relative grid max-w-[75rem] grid-cols-[minmax(0,1fr)] items-center gap-x-10 gap-y-9 py-10 sm:gap-y-12 sm:py-14 md:grid-cols-12 md:py-[clamp(1.25rem,7vh,5rem)]">
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
            className="reveal mt-5 font-(family-name:--font-jakarta) text-[1.75rem] sm:mt-6 sm:text-[clamp(1.875rem,0.7rem+5.2vw,4.5rem)] leading-[1.08] font-bold tracking-[-0.025em] text-balance text-(color:--ob-text) uppercase wrap-break-word md:text-[clamp(1.75rem,min(1rem+3vw,7vh),3.75rem)]"
            style={revealDelay(100)}
          >
            {headline}
          </h1>
          <p
            className="reveal mt-5 max-w-[56ch] border-l-2 border-(--ob-accent)/50 pl-4 text-[0.9375rem] leading-[1.6] text-(color:--ob-muted) sm:mt-6 sm:border-l-0 sm:pl-0 sm:text-[1.0625rem] sm:leading-[1.65] [@media(max-height:700px)]:mt-4 [@media(max-height:700px)]:text-[0.9375rem] [@media(max-height:700px)]:leading-[1.55]"
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
