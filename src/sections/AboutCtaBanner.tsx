import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

const button =
  "group inline-flex min-h-14 items-center justify-center gap-3 rounded-xl px-7 text-base font-semibold transition-all duration-300 ease-(--ob-ease)";

/** Closing card: where to go next, with the projects as the main step and contact as the second. */
export function AboutCtaBanner() {
  return (
    <section aria-labelledby="about-cta-title">
      <Container className="scroll-reveal pb-20 min-[900px]:pb-28">
        <div className="rounded-3xl border border-(color:--ob-line) bg-(--ob-surface) p-8 shadow-(--ob-card-shadow) sm:p-12">
          <p className="font-(family-name:--font-jetbrains) text-sm font-normal tracking-[0.2em] text-(color:--ob-accent) uppercase">
            Continue exploring
          </p>
          <h2
            id="about-cta-title"
            className="mt-5 text-[clamp(1.5rem,1.1rem+1.6vw,2.25rem)] leading-tight font-bold tracking-[-0.01em] md:whitespace-nowrap max-md:text-balance text-(color:--ob-text)"
          >
            Ready to inspect the architecture in production?
          </h2>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/projects"
              className={`${button} bg-(--ob-accent) text-(color:--ob-on-accent) hover:-translate-y-0.5 hover:bg-(--ob-accent-hover) hover:shadow-[0_14px_30px_-14px_rgba(20,158,126,0.8)]`}
            >
              Next: Explore Selected Projects
              <ArrowRight
                aria-hidden
                className="size-5 transition-transform duration-300 ease-(--ob-ease) group-hover:translate-x-1"
              />
            </Link>
            <Link
              href="/contact"
              className={`${button} border border-(color:--ob-line) bg-(--ob-bg) text-(color:--ob-text) hover:border-(color:--ob-line-hover)`}
            >
              Get In Touch
              <ArrowUpRight
                aria-hidden
                className="size-4 text-(color:--ob-accent) transition-transform duration-300 ease-(--ob-ease) group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
