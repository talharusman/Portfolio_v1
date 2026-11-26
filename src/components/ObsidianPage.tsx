import { CtaGlow } from "@/components/CtaGlow";

/**
 * Page shell for the Obsidian / Alabaster design: theme-aware background, 48px
 * architectural grid, a pointer-following orange spotlight and a fixed film
 * grain overlay. Colors come from the --ob-* tokens, which follow the theme toggle.
 */
export function ObsidianPage({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <>
      <div aria-hidden className="noise-overlay" />
      <div className={`obsidian relative isolate overflow-x-clip ${className ?? ""} bg-(--ob-bg) font-(family-name:--font-jakarta) text-(color:--ob-text) transition-colors duration-300 ease-(--ob-ease)`}>
        <div aria-hidden className="obsidian-grid pointer-events-none absolute inset-0 -z-10" />
        <CtaGlow />
        {children}
      </div>
    </>
  );
}
