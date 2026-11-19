"use client";

import { useState } from "react";

type Category = "all" | "ai" | "systems";

const filters: { id: Category; label: string }[] = [
  { id: "all", label: "All" },
  { id: "ai", label: "AI & ML" },
  { id: "systems", label: "Systems & Product" },
];

// Which filter each interest belongs to.
const category: Record<string, Exclude<Category, "all">> = {
  "Artificial Intelligence": "ai",
  "Applied Machine Learning": "ai",
  "Deep Learning": "ai",
  "Backend Architecture": "systems",
  "Full-Stack Product Development": "systems",
  "Computer Vision": "ai",
  "Intelligent Automation": "ai",
};

/** Numbered two-column matrix of interests with category filter pills. */
export function InterestsMatrix({ interests }: { interests: readonly string[] }) {
  const [filter, setFilter] = useState<Category>("all");
  const total = String(interests.length).padStart(2, "0");

  return (
    <div>
      <div role="group" aria-label="Filter areas of interest" className="flex flex-wrap gap-2">
        {filters.map(({ id, label }) => {
          const selected = filter === id;
          return (
            <button
              key={id}
              type="button"
              aria-pressed={selected}
              onClick={() => setFilter(id)}
              className={`inline-flex min-h-11 items-center rounded-full border px-5 font-(family-name:--font-jetbrains) text-xs font-medium transition-colors duration-300 ease-(--ob-ease) ${
                selected
                  ? "border-(color:--ob-accent) bg-(--ob-accent) text-(color:--ob-on-accent)"
                  : "border-(color:--ob-line) bg-(--ob-surface) text-(color:--ob-muted) hover:border-(color:--ob-line-hover) hover:text-(color:--ob-text)"
              }`}
            >
              {label}
              {id === "all" ? ` (${total})` : ""}
            </button>
          );
        })}
      </div>

      <ul aria-live="polite" className="mt-8 grid border-t border-(color:--ob-line) md:grid-cols-2 md:gap-x-10">
        {interests.map((interest, index) => {
          if (filter !== "all" && category[interest] !== filter) return null;
          return (
            <li
              key={interest}
              className="group relative flex items-center gap-4 border-b border-(color:--ob-line) py-5 pl-5 transition-transform duration-300 ease-(--ob-ease) hover:translate-x-1.5"
            >
              <span
                aria-hidden
                className="absolute inset-y-3 left-0 w-1 origin-left scale-x-0 rounded-full bg-(--ob-accent) transition-transform duration-300 ease-(--ob-ease) group-hover:scale-x-100"
              />
              <span
                aria-hidden
                className="font-(family-name:--font-jetbrains) text-xs font-medium text-(color:--ob-meta) tabular-nums"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-lg font-semibold text-(color:--ob-text)">{interest}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
