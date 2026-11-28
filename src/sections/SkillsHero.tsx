import { Container } from "@/components/ui/Container";
import { navigation } from "@/data/navigation";
import { projects } from "@/data/projects";
import { skillDomains } from "@/data/skills";
import { revealDelay } from "@/lib/utils";

const pad = (value: number) => String(value).padStart(2, "0");

const telemetry = [
  { label: "Core domains", value: pad(skillDomains.length) },
  {
    label: "Technologies",
    value: pad(skillDomains.reduce((total, domain) => total + domain.skills.length, 0)),
  },
  { label: "Shipped systems", value: pad(projects.length) },
];

const pageIndex = pad(navigation.findIndex((item) => item.href === "/skills") + 1);

export function SkillsHero({ description }: { description: string }) {
  return (
    <section aria-labelledby="skills-title" className="relative overflow-x-clip">
      <Container className="relative py-12 sm:py-16 md:py-20">
        <div className="reveal flex items-center justify-between gap-4" style={revealDelay(0)}>
          <p className="inline-flex items-center gap-2.5 font-(family-name:--font-jetbrains) text-[0.6875rem] font-medium tracking-[0.1em] text-(color:--ob-accent) uppercase sm:text-xs sm:tracking-[0.14em]">
            <span aria-hidden className="relative flex size-2">
              <span className="animate-ping-soft absolute inset-0 rounded-full bg-(--ob-accent)" />
              <span className="relative size-2 rounded-full bg-(--ob-accent)" />
            </span>
            {"Technical stack // Capability matrix"}
          </p>
          <p className="hidden font-(family-name:--font-jetbrains) text-xs font-medium tracking-[0.08em] text-(color:--ob-meta) uppercase sm:block">
            {`${pageIndex} // Expertise`}
          </p>
        </div>

        <h1
          id="skills-title"
          className="reveal mt-6 font-(family-name:--font-space-grotesk) text-[clamp(2rem,1rem+5.4vw,5.5rem)] leading-[0.94] font-bold tracking-[-0.04em] text-balance text-(color:--ob-text) uppercase wrap-break-word"
          style={revealDelay(100)}
        >
          The technologies
          <br />
          behind what I <span className="text-(color:--ob-accent)">build.</span>
        </h1>

        <div
          className="reveal mt-10 grid gap-x-10 gap-y-8 lg:grid-cols-12 lg:items-end"
          style={revealDelay(260)}
        >
          <dl className="grid grid-cols-3 gap-x-4 border-t border-(color:--ob-line) pt-4 lg:col-span-6">
            {telemetry.map((item) => (
              <div key={item.label} className="min-w-0">
                <dt className="font-(family-name:--font-jetbrains) text-[0.625rem] font-medium tracking-[0.08em] text-(color:--ob-meta) uppercase sm:text-[0.6875rem]">
                  {item.label}
                </dt>
                <dd className="mt-1 font-(family-name:--font-jetbrains) text-lg font-medium text-(color:--ob-text) tabular-nums sm:text-xl">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
          <p className="max-w-xl text-base leading-relaxed text-(color:--ob-muted) lg:col-span-6 lg:col-start-7 lg:text-lg">
            {description}
          </p>
        </div>

        <ul
          className="reveal mt-10 flex flex-col gap-3 border-y border-(color:--ob-line) py-4 font-(family-name:--font-jetbrains) text-xs text-(color:--ob-muted) sm:flex-row sm:items-center sm:gap-8"
          style={revealDelay(360)}
        >
          <li className="flex items-center gap-2.5">
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-(color:--ob-accent) bg-(--ob-accent)/10 px-2 py-0.5 whitespace-nowrap text-(color:--ob-accent)">
              <span aria-hidden className="size-1.5 rounded-full bg-(--ob-accent)" />
              Emerald border
            </span>
            Named in the stack of a project on this site
          </li>
          <li className="flex items-center gap-2.5">
            <span className="shrink-0 rounded-md border border-(color:--ob-line) px-2 py-0.5 whitespace-nowrap text-(color:--ob-text)">
              Applied in
            </span>
            Links to the projects that use them
          </li>
        </ul>
      </Container>
    </section>
  );
}
