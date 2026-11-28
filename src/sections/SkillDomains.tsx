import { BrainCircuit, Cpu, Database, Layers, Server } from "lucide-react";
import Link from "next/link";
import { CornerBrackets } from "@/components/CornerBrackets";
import { Container } from "@/components/ui/Container";
import { skillDomains, type SkillDomain } from "@/data/skills";
import { projectsUsing } from "@/lib/skill-evidence";

// Oversized line-art watermark per domain, in the same order as the data.
const watermarks = [BrainCircuit, Layers, Server, Database, Cpu];

function DomainSection({ domain, index }: { domain: SkillDomain; index: number }) {
  const Watermark = watermarks[index] ?? Cpu;
  const number = String(index + 1).padStart(2, "0");
  const titleId = `${domain.id}-title`;

  const evidence = domain.skills.map((skill) => ({ skill, projects: projectsUsing(skill) }));

  // Unique projects across the domain, in project-list order.
  const appliedIn = [
    ...new Map(
      evidence.flatMap(({ projects }) => projects.map((project) => [project.slug, project] as const)),
    ).values(),
  ];

  return (
    <section id={domain.id} aria-labelledby={titleId} className="border-t border-(color:--ob-line)">
      <Container className="grid gap-x-10 gap-y-6 py-12 sm:py-14 min-[960px]:grid-cols-12 min-[960px]:py-20">
        <div className="min-w-0 min-[960px]:sticky min-[960px]:top-24 min-[960px]:col-span-4 min-[960px]:self-start">
          <p className="font-(family-name:--font-jetbrains) text-sm font-medium text-(color:--ob-accent) tabular-nums">
            {number}
          </p>
          <h2
            id={titleId}
            className="mt-3 font-(family-name:--font-space-grotesk) text-[clamp(1.625rem,1.1rem+1.8vw,2.5rem)] leading-[1] font-bold tracking-[-0.04em] text-balance text-(color:--ob-text) uppercase wrap-break-word"
          >
            {domain.title}
          </h2>
          <p className="mt-4 inline-flex rounded-md border border-(color:--ob-line) px-2.5 py-1 font-(family-name:--font-jetbrains) text-[0.6875rem] font-medium tracking-[0.08em] text-(color:--ob-muted) uppercase">
            {`${domain.skills.length} technologies`}
          </p>
        </div>

        <div className="group relative min-w-0 overflow-hidden rounded-2xl border border-(color:--ob-line) bg-(--ob-surface) p-6 shadow-(--ob-card-shadow) transition-colors duration-300 ease-(--ob-ease) hover:border-(color:--ob-line-hover) sm:p-8 min-[960px]:col-span-8">
          <CornerBrackets />
          <Watermark
            aria-hidden
            strokeWidth={1}
            className="pointer-events-none absolute -right-10 -bottom-10 size-56 text-(--ob-accent) opacity-[0.06]"
          />

          <p className="relative max-w-[56ch] text-base leading-relaxed text-(color:--ob-muted)">
            {domain.description}
          </p>

          <ul aria-label={`${domain.title} technologies`} className="relative mt-6 flex flex-wrap gap-2">
            {evidence.map(({ skill, projects }) => {
              const applied = projects.length > 0;
              return (
                <li
                  key={skill.name}
                  translate="no"
                  className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 font-(family-name:--font-jetbrains) text-xs ${
                    applied
                      ? "border-(color:--ob-accent) bg-(--ob-accent)/10 text-(color:--ob-text)"
                      : "border-(color:--ob-line) text-(color:--ob-muted)"
                  }`}
                >
                  {applied ? <span aria-hidden className="size-1.5 rounded-full bg-(--ob-accent)" /> : null}
                  {skill.name}
                  {applied ? <span className="sr-only"> (used in a project on this site)</span> : null}
                </li>
              );
            })}
          </ul>

          {appliedIn.length > 0 ? (
            <div className="relative mt-8 border-t border-(color:--ob-line) pt-5">
              <p className="font-(family-name:--font-jetbrains) text-[0.6875rem] font-medium tracking-[0.1em] text-(color:--ob-meta) uppercase">
                Applied in
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {appliedIn.map((project) => (
                  <li key={project.slug}>
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex min-h-11 items-center rounded-lg border border-(color:--ob-line) bg-(--ob-surface-2) px-3.5 text-sm font-semibold text-(color:--ob-text) transition-colors duration-200 hover:border-(color:--ob-line-hover) hover:text-(color:--ob-accent)"
                    >
                      {project.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}

export function SkillDomains() {
  return (
    <>
      {skillDomains.map((domain, index) => (
        <DomainSection key={domain.id} domain={domain} index={index} />
      ))}
    </>
  );
}
