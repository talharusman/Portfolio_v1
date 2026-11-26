import { Container } from "@/components/ui/Container";
import { projects } from "@/data/projects";
import { navigation } from "@/data/navigation";
import { coreDomainLabels } from "@/lib/project-display";
import { revealDelay } from "@/lib/utils";

const telemetry = [
  { label: "Systems shipped", value: String(projects.length).padStart(2, "0") },
  { label: "Core domains", value: coreDomainLabels(projects, 2).join(" / ") },
  { label: "Architecture", value: "Production-ready" },
];

const pageIndex = navigation.findIndex((item) => item.href === "/projects") + 1;

export function ProjectsHero() {
  return (
    <section aria-labelledby="projects-title" className="relative overflow-x-clip">
      <Container className="relative py-12 sm:py-16 md:py-20">
        <div
          className="reveal flex items-center justify-between gap-4"
          style={revealDelay(0)}
        >
          <p className="inline-flex items-center gap-2.5 font-(family-name:--font-jetbrains) text-[0.6875rem] font-medium tracking-[0.1em] text-(color:--ob-accent) uppercase sm:text-xs sm:tracking-[0.14em]">
            <span aria-hidden className="relative flex size-2">
              <span className="animate-ping-soft absolute inset-0 rounded-full bg-(--ob-accent)" />
              <span className="relative size-2 rounded-full bg-(--ob-accent)" />
            </span>
            Selected engineering work
          </p>
          <p className="hidden font-(family-name:--font-jetbrains) text-xs font-medium tracking-[0.08em] text-(color:--ob-meta) uppercase sm:block">
            {`${String(pageIndex).padStart(2, "0")} // Archive & case studies`}
          </p>
        </div>

        <h1
          id="projects-title"
          className="reveal mt-6 font-(family-name:--font-space-grotesk) text-[clamp(2rem,1rem+5.4vw,5.5rem)] leading-[0.94] font-bold tracking-[-0.04em] text-balance text-(color:--ob-text) uppercase wrap-break-word"
          style={revealDelay(100)}
        >
          Thoughtfully engineered.
          <br />
          Built to solve{" "}
          <span className="text-(color:--ob-accent)">real problems.</span>
        </h1>

        <div
          className="reveal mt-10 grid gap-x-10 gap-y-8 lg:grid-cols-12 lg:items-end"
          style={revealDelay(260)}
        >
          <dl className="grid grid-cols-1 gap-x-4 gap-y-3 border-t border-(color:--ob-line) pt-4 sm:grid-cols-3 sm:gap-y-1 lg:col-span-6">
            {telemetry.map((item) => (
              <div key={item.label} className="min-w-0">
                <dt className="font-(family-name:--font-jetbrains) text-[0.625rem] font-medium tracking-[0.08em] text-(color:--ob-meta) uppercase sm:text-[0.6875rem]">
                  {item.label}
                </dt>
                <dd className="mt-1 font-(family-name:--font-jetbrains) text-sm font-medium text-balance text-(color:--ob-text) sm:text-base">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
          <p className="max-w-xl text-base leading-relaxed text-(color:--ob-muted) lg:col-span-6 lg:col-start-7 lg:text-lg">
            A collection of intelligent applications, full-stack products,
            machine learning systems, and backend engineering projects.
          </p>
        </div>
      </Container>
    </section>
  );
}
