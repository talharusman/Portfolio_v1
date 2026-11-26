const accent =
  "pointer-events-none absolute size-3 border-(--ob-accent) opacity-40 transition-all duration-300 ease-(--ob-ease) group-hover:size-5 group-hover:opacity-100 group-hover:drop-shadow-[0_0_6px_rgba(242,96,12,0.8)]";

const reticle =
  "pointer-events-none absolute size-2 border-(--ob-reticle) transition-colors duration-200 ease-out group-hover:border-(--ob-accent)";

/**
 * L-brackets in the corners of a card. The parent must be `relative` and carry the
 * `group` class so the brackets can react to hover.
 * - "accent": orange, top-left and bottom-right, grow on hover (home page).
 * - "reticle": 8px hairline, all four corners, turn orange on hover (About page).
 */
export function CornerBrackets({ variant = "accent" }: { variant?: "accent" | "reticle" }) {
  if (variant === "reticle") {
    return (
      <>
        <span aria-hidden className={`${reticle} top-2 left-2 border-t border-l`} />
        <span aria-hidden className={`${reticle} top-2 right-2 border-t border-r`} />
        <span aria-hidden className={`${reticle} bottom-2 left-2 border-b border-l`} />
        <span aria-hidden className={`${reticle} right-2 bottom-2 border-r border-b`} />
      </>
    );
  }
  return (
    <>
      <span aria-hidden className={`${accent} top-3 left-3 border-t-2 border-l-2`} />
      <span aria-hidden className={`${accent} right-3 bottom-3 border-r-2 border-b-2`} />
    </>
  );
}
