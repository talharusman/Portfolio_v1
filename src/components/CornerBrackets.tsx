const base =
  "pointer-events-none absolute size-3 border-(--ob-accent) opacity-40 transition-all duration-300 ease-(--ob-ease) group-hover:size-5 group-hover:opacity-100 group-hover:drop-shadow-[0_0_6px_rgba(20,158,126,0.8)]";

/**
 * Emerald L-brackets in the top-left and bottom-right corners. The parent must be
 * `relative` and carry the `group` class so the brackets can react to hover.
 */
export function CornerBrackets() {
  return (
    <>
      <span aria-hidden className={`${base} top-3 left-3 border-t-2 border-l-2`} />
      <span aria-hidden className={`${base} right-3 bottom-3 border-r-2 border-b-2`} />
    </>
  );
}
