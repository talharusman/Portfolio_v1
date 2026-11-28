"use client";

import { BrainCircuit, Cpu, Database, Layers, Server, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CornerBrackets } from "@/components/CornerBrackets";
import { Container } from "@/components/ui/Container";

export type MatrixSkill = { name: string; projectSlugs: string[] };
export type MatrixDomain = { id: string; title: string; description: string; skills: MatrixSkill[] };
export type MatrixProject = { slug: string; title: string };

// Oversized line-art watermark per domain, in the same order as the data.
const watermarks = [BrainCircuit, Layers, Server, Database, Cpu];

const pad = (value: number) => String(value).padStart(2, "0");

const chip =
  "inline-flex min-h-9 items-center rounded-lg border px-3 font-(family-name:--font-jetbrains) text-xs font-medium transition-colors duration-200";

type Inspected = { domainIndex: number; skill: MatrixSkill };

export function SkillsMatrix({
  domains,
  projects,
}: {
  domains: MatrixDomain[];
  projects: MatrixProject[];
}) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [inspected, setInspected] = useState<Inspected | null>(null);

  const active = projects.find((project) => project.slug === activeSlug) ?? null;
  const titleOf = (slug: string) => projects.find((project) => project.slug === slug)?.title ?? slug;

  const matchCount = active
    ? domains.reduce(
        (total, domain) =>
          total + domain.skills.filter((skill) => skill.projectSlugs.includes(active.slug)).length,
        0,
      )
    : 0;

  useEffect(() => {
    if (!inspected) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setInspected(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [inspected]);

  function toggleProject(slug: string) {
    setActiveSlug((current) => (current === slug ? null : slug));
  }

  return (
    <>
      <Container>
        <div className="border-b border-(color:--ob-line) pb-6">
          <p
            id="project-filter-label"
            className="font-(family-name:--font-jetbrains) text-[0.6875rem] font-medium tracking-[0.1em] text-(color:--ob-meta) uppercase"
          >
            Trace a project’s stack
          </p>
          <div role="group" aria-labelledby="project-filter-label" className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              aria-pressed={active === null}
              onClick={() => setActiveSlug(null)}
              className={`${chip} ${
                active === null
                  ? "border-(color:--ob-accent) bg-(--ob-accent) text-(color:--ob-on-accent)"
                  : "border-(color:--ob-line) bg-(--ob-surface) text-(color:--ob-muted) hover:border-(color:--ob-line-hover) hover:text-(color:--ob-text)"
              }`}
            >
              All technologies
            </button>
            {projects.map((project) => {
              const selected = project.slug === activeSlug;
              return (
                <button
                  key={project.slug}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => toggleProject(project.slug)}
                  className={`${chip} ${
                    selected
                      ? "border-(color:--ob-accent) bg-(--ob-accent) text-(color:--ob-on-accent)"
                      : "border-(color:--ob-line) bg-(--ob-surface) text-(color:--ob-muted) hover:border-(color:--ob-line-hover) hover:text-(color:--ob-text)"
                  }`}
                >
                  {project.title}
                </button>
              );
            })}
          </div>

          <div aria-live="polite" className="mt-4 min-h-9">
            {active ? (
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <p className="font-(family-name:--font-jetbrains) text-xs font-medium tracking-[0.06em] text-(color:--ob-text) uppercase">
                  {`Showing ${pad(matchCount)} ${matchCount === 1 ? "technology" : "technologies"} used in `}
                  <span className="text-(color:--ob-accent)">{active.title}</span>
                </p>
                <button
                  type="button"
                  onClick={() => setActiveSlug(null)}
                  className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-(color:--ob-line) px-3 text-xs font-semibold text-(color:--ob-text) transition-colors duration-200 hover:border-(color:--ob-line-hover)"
                >
                  Clear filter
                  <X aria-hidden className="size-3.5" />
                </button>
                <Link
                  href={`/projects/${active.slug}`}
                  className="inline-flex min-h-9 items-center text-xs font-semibold text-(color:--ob-accent) underline decoration-(--ob-accent)/40 underline-offset-4 hover:decoration-(--ob-accent)"
                >
                  Open the case study
                </Link>
              </div>
            ) : (
              <p className="text-sm text-(color:--ob-muted)">
                Choose a project to highlight every technology it uses.
              </p>
            )}
          </div>
        </div>
      </Container>

      {domains.map((domain, domainIndex) => {
        const Watermark = watermarks[domainIndex] ?? Cpu;
        const titleId = `${domain.id}-title`;
        const appliedIn = projects.filter((project) =>
          domain.skills.some((skill) => skill.projectSlugs.includes(project.slug)),
        );

        return (
          <section
            key={domain.id}
            id={domain.id}
            aria-labelledby={titleId}
            className="border-t border-(color:--ob-line) first-of-type:border-t-0"
          >
            <Container className="grid gap-x-10 gap-y-6 py-12 sm:py-14 min-[960px]:grid-cols-12 min-[960px]:py-20">
              <div className="min-w-0 min-[960px]:sticky min-[960px]:top-24 min-[960px]:col-span-4 min-[960px]:self-start">
                <p className="font-(family-name:--font-jetbrains) text-sm font-medium text-(color:--ob-accent) tabular-nums">
                  {pad(domainIndex + 1)}
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
                  {domain.skills.map((skill) => {
                    const applied = skill.projectSlugs.length > 0;
                    const matches = active ? skill.projectSlugs.includes(active.slug) : false;
                    const dimmed = active !== null && !matches;
                    const selected =
                      inspected?.domainIndex === domainIndex && inspected.skill.name === skill.name;

                    const tone = matches || selected
                      ? "border-(color:--ob-accent) bg-(--ob-accent)/20 text-(color:--ob-text)"
                      : applied
                        ? "border-(color:--ob-accent) bg-(--ob-accent)/10 text-(color:--ob-text)"
                        : "border-(color:--ob-line) text-(color:--ob-muted) hover:border-(color:--ob-line-hover)";

                    return (
                      <li key={skill.name}>
                        <button
                          type="button"
                          translate="no"
                          aria-pressed={selected}
                          onClick={() => setInspected(selected ? null : { domainIndex, skill })}
                          className={`inline-flex min-h-8 items-center gap-1.5 rounded-md border px-2.5 font-(family-name:--font-jetbrains) text-xs transition-[opacity,transform,border-color,background-color] duration-300 ease-(--ob-ease) ${tone} ${
                            dimmed ? "opacity-[0.28]" : "opacity-100"
                          } ${matches ? "scale-[1.02]" : ""} ${selected ? "ring-2 ring-(--ob-accent)/40" : ""}`}
                        >
                          {applied ? <span aria-hidden className="size-1.5 rounded-full bg-(--ob-accent)" /> : null}
                          {skill.name}
                          {applied ? <span className="sr-only"> (used in a project on this site)</span> : null}
                        </button>
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
                      {appliedIn.map((project) => {
                        const selected = project.slug === activeSlug;
                        return (
                          <li key={project.slug}>
                            <button
                              type="button"
                              aria-pressed={selected}
                              onClick={() => toggleProject(project.slug)}
                              className={`inline-flex min-h-11 items-center rounded-lg border px-3.5 text-sm font-semibold transition-colors duration-200 ${
                                selected
                                  ? "border-(color:--ob-accent) bg-(--ob-accent)/15 text-(color:--ob-accent)"
                                  : "border-(color:--ob-line) bg-(--ob-surface-2) text-(color:--ob-text) hover:border-(color:--ob-line-hover) hover:text-(color:--ob-accent)"
                              }`}
                            >
                              {project.title}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ) : null}
              </div>
            </Container>
          </section>
        );
      })}

      {inspected ? (
        <div
          role="region"
          aria-label="Technology inspector"
          className="inspector-in fixed bottom-5 left-1/2 z-40 w-[min(calc(100%-2rem),40rem)] rounded-2xl border border-(color:--ob-line) bg-(--ob-glass) p-4 shadow-2xl backdrop-blur-[12px] sm:p-5"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0" aria-live="polite">
              <p className="font-(family-name:--font-jetbrains) text-[0.6875rem] font-medium tracking-[0.08em] text-(color:--ob-accent) uppercase">
                {`${pad(inspected.domainIndex + 1)} // ${domains[inspected.domainIndex].title}`}
              </p>
              <p translate="no" className="mt-1 font-(family-name:--font-space-grotesk) text-xl font-bold text-(color:--ob-text)">
                {inspected.skill.name}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setInspected(null)}
              aria-label="Close the technology inspector"
              className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-(color:--ob-line) text-(color:--ob-muted) transition-colors duration-200 hover:border-(color:--ob-line-hover) hover:text-(color:--ob-text)"
            >
              <X aria-hidden className="size-4" />
            </button>
          </div>

          {inspected.skill.projectSlugs.length > 0 ? (
            <ul className="mt-3 flex flex-wrap gap-2">
              {inspected.skill.projectSlugs.map((slug) => (
                <li key={slug}>
                  <button
                    type="button"
                    aria-pressed={slug === activeSlug}
                    onClick={() => setActiveSlug(slug)}
                    className={`${chip} ${
                      slug === activeSlug
                        ? "border-(color:--ob-accent) bg-(--ob-accent) text-(color:--ob-on-accent)"
                        : "border-(color:--ob-line) bg-(--ob-surface) text-(color:--ob-text) hover:border-(color:--ob-line-hover)"
                    }`}
                  >
                    {titleOf(slug)}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-(color:--ob-muted)">
              Not named in a project on this site yet.
            </p>
          )}
        </div>
      ) : null}
    </>
  );
}
