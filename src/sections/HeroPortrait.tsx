import Image from "next/image";
import { profile } from "@/data/profile";

/**
 * Hero portrait: the owner's transparent cut-out, standing on a baseline rule
 * with an emerald glow behind it so the dark suit separates from the page.
 * Height follows the viewport so the hero fits short laptop screens.
 */
const chips = [
  { label: "Python", className: "top-[14%] left-0 lg:-left-8", delay: "0s" },
  { label: "Next.js", className: "top-[38%] right-0 lg:-right-6", delay: "-1.7s" },
  { label: "FastAPI", className: "bottom-[20%] left-0 lg:-left-10", delay: "-3.2s" },
];

export function HeroPortrait() {
  return (
    <figure className="w-full max-w-56 sm:max-w-72 md:ml-auto md:w-auto md:max-w-none">
      <div className="relative aspect-433/577 md:h-[min(60svh,34rem,46vw)]">
        <div
          aria-hidden
          className="absolute inset-x-[-10%] top-[10%] bottom-0 rounded-full bg-[radial-gradient(closest-side,rgba(20,158,126,0.4),transparent)] md:inset-x-[-25%]"
        />
        <Image
          src="/images/talha-rusman.png"
          alt={`Portrait of ${profile.name}`}
          fill
          priority
          sizes="(min-width: 1024px) 28rem, 18rem"
          className="relative object-contain object-bottom"
        />
        {chips.map((chip) => (
          <span
            key={chip.label}
            aria-hidden
            translate="no"
            style={{ animationDelay: chip.delay }}
            className={`animate-float absolute hidden items-center gap-2 rounded-md border border-(color:--ob-line) bg-(--ob-surface) px-3 py-1.5 font-(family-name:--font-jetbrains) text-xs font-medium text-(color:--ob-text) shadow-[0_10px_30px_-12px_rgba(20,158,126,0.6)] lg:flex ${chip.className}`}
          >
            <span className="size-1.5 rounded-full bg-(--ob-accent)" />
            {chip.label}
          </span>
        ))}
      </div>
      <div aria-hidden className="h-0.5 bg-(--ob-accent)" />
      <figcaption className="mt-3 font-(family-name:--font-jetbrains) text-xs">
        <span className="text-(color:--ob-text)">{profile.name}</span>
        <span className="text-(color:--ob-muted)"> — {profile.role}</span>
      </figcaption>
    </figure>
  );
}
