"use client";

import Image from "next/image";
import { useRef } from "react";
import { profile } from "@/data/profile";

const chips = [
  { label: "Python", className: "top-[14%] -left-3 lg:-left-10", delay: "0s" },
  { label: "Next.js", className: "top-[40%] -right-3 lg:-right-8", delay: "-1.7s" },
  { label: "FastAPI", className: "bottom-[18%] -left-3 lg:-left-12", delay: "-3.2s" },
];

const bracket = "pointer-events-none absolute size-4 border-(--ob-accent)";

/**
 * Studio portrait stage: the owner's transparent cut-out on a dark architectural
 * panel with an emerald backlight, L-brackets and a gentle 3D tilt on desktop hover.
 * Height follows the viewport so the hero fits short laptop screens.
 */
export function HeroPortrait() {
  const stage = useRef<HTMLDivElement>(null);

  function tilt(event: React.PointerEvent<HTMLDivElement>) {
    const el = stage.current;
    if (!el || event.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
  }

  function reset() {
    if (stage.current) stage.current.style.transform = "";
  }

  return (
    <figure className="mx-auto w-full max-w-60 sm:max-w-72 md:mr-0 md:ml-auto md:w-auto md:max-w-none">
      <div onPointerMove={tilt} onPointerLeave={reset} className="md:mx-auto md:w-fit">
        <div
          ref={stage}
          className="relative aspect-4/5 rounded-2xl border border-(color:--ob-line) bg-(--ob-surface) shadow-(--ob-card-shadow) transition-transform duration-300 ease-(--ob-ease) will-change-transform md:h-[min(56svh,32rem,42vw)]"
        >
          <div aria-hidden className="absolute inset-0 overflow-hidden rounded-2xl">
            <div className="obsidian-grid absolute inset-0 opacity-70" />
            <div className="absolute inset-x-[-10%] top-[8%] bottom-[-10%] rounded-full bg-[radial-gradient(closest-side,var(--ob-backlight),transparent)]" />
          </div>
          <div className="absolute inset-x-3 top-6 bottom-0 overflow-hidden rounded-b-2xl">
            <Image
              src="/images/talha-rusman.png"
              alt={`Portrait of ${profile.name}`}
              fill
              priority
              sizes="(min-width: 1024px) 24rem, 15rem"
              className="object-contain object-bottom"
            />
          </div>

          <span aria-hidden className={`${bracket} top-2.5 left-2.5 border-t-2 border-l-2`} />
          <span aria-hidden className={`${bracket} top-2.5 right-2.5 border-t-2 border-r-2`} />
          <span aria-hidden className={`${bracket} bottom-2.5 left-2.5 border-b-2 border-l-2`} />
          <span aria-hidden className={`${bracket} right-2.5 bottom-2.5 border-r-2 border-b-2`} />

          {chips.map((chip) => (
            <span
              key={chip.label}
              aria-hidden
              translate="no"
              style={{ animationDelay: chip.delay }}
              className={`animate-float absolute hidden items-center gap-2 rounded-lg border border-(color:--ob-line) bg-(--ob-surface)/85 px-3 py-1.5 font-(family-name:--font-jetbrains) text-xs font-medium text-(color:--ob-text) shadow-[0_10px_30px_-12px_rgba(20,158,126,0.6)] backdrop-blur-[8px] lg:flex ${chip.className}`}
            >
              <span className="size-1.5 rounded-full bg-(--ob-accent)" />
              {chip.label}
            </span>
          ))}
        </div>
      </div>
      <figcaption className="mt-3 rounded-lg border border-(color:--ob-line) bg-(--ob-surface) px-4 py-2.5 font-(family-name:--font-jetbrains) text-xs">
        <span className="text-(color:--ob-text)">{profile.name}</span>
        <span className="text-(color:--ob-muted)"> — {profile.role}</span>
      </figcaption>
    </figure>
  );
}
