"use client";

import { LayoutGrid, Rows3, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { FilterId } from "@/data/projects";

type FilterOption = { id: FilterId | "all"; label: string };

type ProjectsControlDockProps = {
  filters: FilterOption[];
  counts: Record<string, number>;
  active: FilterId | "all";
  onFilterChange: (id: FilterId | "all") => void;
  query: string;
  onQueryChange: (value: string) => void;
  view: "bento" | "ledger";
  onViewChange: (view: "bento" | "ledger") => void;
};

export function ProjectsControlDock({
  filters,
  counts,
  active,
  onFilterChange,
  query,
  onQueryChange,
  view,
  onViewChange,
}: ProjectsControlDockProps) {
  const tabRefs = useRef(new Map<string, HTMLButtonElement>());
  const [glider, setGlider] = useState<{ left: number; width: number } | null>(null);

  useEffect(() => {
    const update = () => {
      const el = tabRefs.current.get(active);
      if (el) setGlider({ left: el.offsetLeft, width: el.offsetWidth });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [active, filters]);

  return (
    <div className="sticky top-16 z-30 border-y border-(color:--ob-line) bg-(--ob-glass) backdrop-blur-[12px]">
      <div className="flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <div role="group" aria-label="Filter by category" className="relative flex gap-1 overflow-x-auto">
          {glider ? (
            <span
              aria-hidden
              className="absolute top-1 bottom-1 rounded-lg bg-(--ob-accent) transition-all duration-300 ease-(--ob-ease)"
              style={{ left: glider.left, width: glider.width }}
            />
          ) : null}
          {filters.map((filter) => {
            const selected = filter.id === active;
            return (
              <button
                key={filter.id}
                ref={(el) => {
                  if (el) tabRefs.current.set(filter.id, el);
                }}
                type="button"
                aria-pressed={selected}
                onClick={() => onFilterChange(filter.id)}
                className={`relative z-10 inline-flex min-h-9 shrink-0 items-center gap-1.5 rounded-lg px-3.5 font-(family-name:--font-jetbrains) text-xs font-medium whitespace-nowrap transition-colors duration-300 ${
                  selected ? "text-(color:--ob-on-accent)" : "text-(color:--ob-muted) hover:text-(color:--ob-text)"
                }`}
              >
                {filter.label}
                <span className={selected ? "opacity-80" : "text-(color:--ob-meta)"}>
                  {String(counts[filter.id] ?? 0).padStart(2, "0")}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <label className="relative flex min-w-0 flex-1 items-center sm:w-64">
            <Search aria-hidden className="pointer-events-none absolute left-3 size-4 text-(color:--ob-meta)" />
            <span className="sr-only">Filter projects by technology</span>
            <input
              type="search"
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              placeholder="Filter by tech, e.g. FastAPI, React, PyTorch..."
              className="min-h-9 w-full rounded-lg border border-(color:--ob-line) bg-(--ob-surface) py-1.5 pr-3 pl-9 font-(family-name:--font-jetbrains) text-xs text-(color:--ob-text) outline-none transition-colors duration-200 placeholder:text-(color:--ob-meta) focus-visible:border-(color:--ob-accent)"
            />
          </label>

          <div role="group" aria-label="Switch view" className="flex shrink-0 gap-1 rounded-lg border border-(color:--ob-line) p-0.5">
            <button
              type="button"
              aria-pressed={view === "bento"}
              onClick={() => onViewChange("bento")}
              aria-label="Bento grid view"
              title="Bento grid"
              className={`flex size-8 items-center justify-center rounded-md transition-colors duration-200 ${
                view === "bento" ? "bg-(--ob-accent) text-(color:--ob-on-accent)" : "text-(color:--ob-muted) hover:text-(color:--ob-text)"
              }`}
            >
              <LayoutGrid aria-hidden className="size-4" />
            </button>
            <button
              type="button"
              aria-pressed={view === "ledger"}
              onClick={() => onViewChange("ledger")}
              aria-label="Index ledger view"
              title="Index ledger"
              className={`flex size-8 items-center justify-center rounded-md transition-colors duration-200 ${
                view === "ledger" ? "bg-(--ob-accent) text-(color:--ob-on-accent)" : "text-(color:--ob-muted) hover:text-(color:--ob-text)"
              }`}
            >
              <Rows3 aria-hidden className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
