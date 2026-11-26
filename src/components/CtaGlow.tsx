"use client";

import { useEffect, useRef } from "react";

/** Orange glow that follows the pointer across its parent section. Static for touch and reduced motion. */
export function CtaGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const section = el?.parentElement;
    if (!el || !section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        section.style.setProperty("--mx", `${event.clientX - rect.left}px`);
        section.style.setProperty("--my", `${event.clientY - rect.top}px`);
      });
    };

    section.addEventListener("pointermove", onMove);
    return () => {
      cancelAnimationFrame(frame);
      section.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <div ref={ref} aria-hidden className="obsidian-glow pointer-events-none absolute inset-0" />;
}
