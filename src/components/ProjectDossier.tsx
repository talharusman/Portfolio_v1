"use client";

import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { ProjectActionLinks } from "@/components/ProjectActionLinks";
import { ProjectMiniDiagram } from "@/components/ProjectMiniDiagram";
import type { Project } from "@/data/projects";
import { isTodo } from "@/data/projects/types";
import { primaryDomainLabel } from "@/lib/project-display";

function DossierSection({
  index,
  label,
  children,
}: {
  index: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-(color:--ob-line) px-6 py-6 sm:px-8">
      <p className="font-(family-name:--font-jetbrains) text-[0.6875rem] font-medium tracking-[0.1em] text-(color:--ob-accent) uppercase">
        {`${index} // ${label}`}
      </p>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-(color:--ob-muted)">
        {children}
      </div>
    </section>
  );
}

function Placeholder({ children }: { children: string }) {
  return (
    <p className="rounded-md border border-dashed border-(color:--ob-line) p-3 text-(color:--ob-meta)">
      <span className="mr-2 inline-flex items-center rounded-md border border-(color:--ob-line) px-1.5 py-0.5 font-(family-name:--font-jetbrains) text-[0.625rem] uppercase">
        To be added
      </span>
      {children}
    </p>
  );
}

export function ProjectDossier({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;
    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const { problem, architecture, implementation, challenges, results } = project.caseStudy;

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label={`${project.title}: system architecture dossier`}>
      <button
        type="button"
        onClick={onClose}
        aria-label="Close dossier"
        className="page-in absolute inset-0 bg-black/50 backdrop-blur-sm"
      />

      <div className="drawer-in absolute inset-y-0 right-0 flex w-full max-w-xl flex-col overflow-y-auto border-l border-(color:--ob-line) bg-(--ob-bg) font-(family-name:--font-jakarta) text-(color:--ob-text) shadow-2xl">
        <header className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-(color:--ob-line) bg-(--ob-bg) px-6 py-6 sm:px-8">
          <div className="min-w-0">
            <p className="font-(family-name:--font-jetbrains) text-[0.6875rem] font-medium tracking-[0.08em] text-(color:--ob-accent) uppercase">
              System architecture dossier
            </p>
            <h2 className="mt-2 font-(family-name:--font-space-grotesk) text-2xl font-bold tracking-[-0.02em] text-balance">
              {project.title}
            </h2>
            <p className="mt-1 font-(family-name:--font-jetbrains) text-xs font-medium text-(color:--ob-muted) uppercase">
              {primaryDomainLabel(project)}
            </p>
            <ProjectActionLinks project={project} className="mt-3" />
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-(color:--ob-line) text-(color:--ob-muted) transition-colors duration-200 hover:border-(color:--ob-line-hover) hover:text-(color:--ob-text)"
          >
            <X aria-hidden className="size-4" />
          </button>
        </header>

        <DossierSection index="01" label="Problem statement & context">
          <p>{problem.statement}</p>
          {isTodo(problem.importance) ? (
            <Placeholder>{problem.importance.todo}</Placeholder>
          ) : (
            <p>{problem.importance}</p>
          )}
        </DossierSection>

        <DossierSection index="02" label="System architecture & data flow">
          <ProjectMiniDiagram architecture={architecture} title={project.title} size="large" />
          <ul className="space-y-2">
            {architecture.layers.map((layer) => (
              <li key={layer.label} className="rounded-lg border border-(color:--ob-line) p-3">
                <p className="font-(family-name:--font-jetbrains) text-[0.6875rem] font-medium text-(color:--ob-accent) uppercase">
                  {layer.label}
                </p>
                <ul className="mt-1.5 flex flex-wrap gap-1.5">
                  {layer.nodes.map((node) => (
                    <li key={node.name} className="rounded-md bg-(--ob-surface-2) px-2 py-1 text-xs text-(color:--ob-text)">
                      {node.name}
                      {node.detail ? <span className="text-(color:--ob-meta)"> — {node.detail}</span> : null}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          {architecture.status === "draft" ? (
            <p className="text-xs text-(color:--ob-meta)">
              Draft diagram, built from the project&apos;s technology list — not yet checked against the repository.
            </p>
          ) : null}
        </DossierSection>

        <DossierSection index="03" label="Key engineering decisions & trade-offs">
          <ul className="space-y-3">
            {implementation.map((block) => (
              <li key={block.title}>
                <p className="font-semibold text-(color:--ob-text)">{block.title}</p>
                <p className="mt-0.5">{block.role}</p>
              </li>
            ))}
          </ul>
          {isTodo(challenges) ? (
            <Placeholder>{challenges.todo}</Placeholder>
          ) : (
            <ul className="space-y-3">
              {challenges.map((challenge) => (
                <li key={challenge.title}>
                  <p className="font-semibold text-(color:--ob-text)">{challenge.title}</p>
                  <p className="mt-0.5">{challenge.body}</p>
                </li>
              ))}
            </ul>
          )}
        </DossierSection>

        <DossierSection index="04" label="Measured impact & benchmarks">
          {isTodo(results) ? (
            <Placeholder>{results.todo}</Placeholder>
          ) : (
            <ul className="list-disc space-y-1.5 pl-4">
              {results.map((result) => (
                <li key={result}>{result}</li>
              ))}
            </ul>
          )}
        </DossierSection>

        <section className="border-t border-(color:--ob-line) px-6 py-6 sm:px-8">
          <p className="font-(family-name:--font-jetbrains) text-[0.6875rem] font-medium tracking-[0.1em] text-(color:--ob-accent) uppercase">
            Complete tech stack
          </p>
          <ul aria-label={`${project.title} complete stack`} className="mt-3 flex flex-wrap gap-1.5">
            {project.stack.map((item) => (
              <li
                key={item}
                translate="no"
                className="rounded-md border border-(color:--ob-line) px-2.5 py-1 font-(family-name:--font-jetbrains) text-xs text-(color:--ob-muted)"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-auto border-t border-(color:--ob-line) px-6 py-6 sm:px-8">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-(color:--ob-accent) underline decoration-(--ob-accent)/40 underline-offset-4 hover:decoration-(--ob-accent)"
          >
            View full case study
          </Link>
        </div>
      </div>
    </div>
  );
}
