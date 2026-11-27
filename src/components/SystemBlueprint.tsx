"use client";

import { useRef, useState } from "react";

type Layer = { tag: string; title: string };

const layers: Layer[] = [
  { tag: "01 // INTERFACE", title: "Thoughtful User Experiences" },
  { tag: "02 // INFRASTRUCTURE", title: "Reliable Backend Systems" },
  { tag: "03 // INTELLIGENCE", title: "Practical AI & ML Models" },
];

const bracket =
  "pointer-events-none absolute size-3 border-(--ob-accent) opacity-50 transition-[width,height,opacity,filter] duration-300 ease-(--ob-ease) sm:size-4 sm:group-hover:size-6 group-hover:opacity-100 group-hover:drop-shadow-[0_0_6px_rgba(20,158,126,0.8)]";

/**
 * Interactive system architecture card: a 3D-tilting panel with three layers
 * joined by lines that carry a pulsing data-flow dot. Hovering, focusing or
 * clicking a layer selects it and updates the readout at the bottom.
 */
export function SystemBlueprint() {
  const stage = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(layers.length - 1);

  function tilt(event: React.PointerEvent<HTMLDivElement>) {
    const el = stage.current;
    if (!el || event.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
  }

  function reset() {
    if (stage.current) stage.current.style.transform = "";
  }

  return (
    <div onPointerMove={tilt} onPointerLeave={reset}>
      <div
        ref={stage}
        className="group relative rounded-2xl border border-(color:--ob-line) bg-(--ob-surface) shadow-(--ob-card-shadow) transition-[transform,border-color] duration-300 ease-(--ob-ease) will-change-transform hover:border-(color:--ob-line-hover)"
      >
        <span aria-hidden className={`${bracket} top-2 left-2 sm:top-2.5 sm:left-2.5 border-t-2 border-l-2`} />
        <span aria-hidden className={`${bracket} top-2 right-2 sm:top-2.5 sm:right-2.5 border-t-2 border-r-2`} />
        <span aria-hidden className={`${bracket} bottom-2 left-2 sm:bottom-2.5 sm:left-2.5 border-b-2 border-l-2`} />
        <span aria-hidden className={`${bracket} right-2 bottom-2 sm:right-2.5 sm:bottom-2.5 border-r-2 border-b-2`} />

        <div className="flex items-center justify-between gap-3 border-b border-(color:--ob-line) px-5 py-3 sm:px-6 sm:py-4 [@media(max-height:700px)]:py-2.5 font-(family-name:--font-jetbrains) text-xs font-medium text-(color:--ob-muted)">
          <span>SYSTEM BLUEPRINT</span>
          <span aria-hidden className="relative flex size-2">
            <span className="animate-ping-soft absolute inset-0 rounded-full bg-(--ob-accent)" />
            <span className="relative size-2 rounded-full bg-(--ob-accent)" />
          </span>
        </div>

        <ol className="px-4 py-4 sm:px-6 sm:py-6 [@media(max-height:700px)]:py-3">
          {layers.map((layer, index) => {
            const selected = index === active;
            return (
              <li key={layer.tag}>
                <button
                  type="button"
                  aria-pressed={selected}
                  onPointerEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  onClick={() => setActive(index)}
                  className={`block w-full rounded-xl border px-3.5 py-3 sm:px-4 sm:py-4 [@media(max-height:700px)]:py-2.5 text-left transition-[border-color,background-color] duration-300 ease-(--ob-ease) ${
                    selected
                      ? "border-(color:--ob-accent) bg-(--ob-accent)/10"
                      : "border-(color:--ob-line) bg-(--ob-surface-2) hover:border-(color:--ob-line-hover)"
                  }`}
                >
                  <span
                    className={`block font-(family-name:--font-jetbrains) text-xs font-medium tracking-[0.12em] transition-colors duration-300 ${
                      selected ? "text-(color:--ob-accent)" : "text-(color:--ob-meta)"
                    }`}
                  >
                    {layer.tag}
                  </span>
                  <span className="mt-1.5 flex items-center justify-between gap-3">
                    <span className="text-[0.9375rem] font-semibold text-(color:--ob-text) sm:text-base">{layer.title}</span>
                    <span
                      aria-hidden
                      className={`size-2 shrink-0 rounded-full bg-(--ob-accent) transition-[opacity,box-shadow] duration-300 ${
                        selected ? "opacity-100 shadow-[0_0_8px_var(--ob-accent)]" : "opacity-0"
                      }`}
                    />
                  </span>
                </button>
                {index < layers.length - 1 ? (
                  <div
                    aria-hidden
                    className="flex h-5 sm:h-7 [@media(max-height:700px)]:h-5 items-center justify-center font-(family-name:--font-jetbrains) text-sm text-(color:--ob-meta)"
                  >
                    +
                  </div>
                ) : null}
              </li>
            );
          })}
        </ol>

        <p
          aria-live="polite"
          className="border-t border-(color:--ob-line) px-5 py-3 sm:px-6 sm:py-4 [@media(max-height:700px)]:py-2.5 font-(family-name:--font-jetbrains) text-xs font-medium text-(color:--ob-muted)"
        >
          ACTIVE LAYER: <span className="text-(color:--ob-accent)">{layers[active].tag}</span>
        </p>
      </div>
    </div>
  );
}
