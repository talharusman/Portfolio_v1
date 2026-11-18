import Image from "next/image";
import { profile } from "@/data/profile";

/**
 * Hero portrait: the owner's transparent cut-out, standing on a baseline rule
 * with a soft accent glow behind it so the dark suit separates from the page.
 * Height follows the viewport so the hero fits short laptop screens.
 */
export function HeroPortrait() {
  return (
    <figure className="w-full max-w-64 sm:max-w-72 lg:ml-auto lg:w-auto lg:max-w-none">
      <div className="relative aspect-433/577 lg:h-[min(60svh,34rem)]">
        <div
          aria-hidden
          className="absolute inset-x-[-10%] lg:inset-x-[-25%] top-[10%] bottom-0 rounded-full bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--accent)_45%,transparent),transparent)]"
        />
        <Image
          src="/images/talha-rusman.png"
          alt={`Portrait of ${profile.name}`}
          fill
          priority
          sizes="(min-width: 1024px) 28rem, 18rem"
          className="relative object-contain object-bottom"
        />
      </div>
      <div aria-hidden className="h-0.5 bg-accent" />
      <figcaption className="mt-3 font-mono text-label">
        {profile.name}
        <span className="text-muted"> — {profile.role}</span>
      </figcaption>
    </figure>
  );
}
