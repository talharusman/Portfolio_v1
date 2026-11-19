/** Faint decorative bars for a card's top-right corner. Purely visual, so hidden from assistive tech. */
export function TelemetryBars({
  heights,
  className = "",
}: {
  heights: number[];
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute top-5 right-6 flex h-4 items-end gap-[3px] opacity-60 transition-opacity duration-200 group-hover:opacity-100 ${className}`}
    >
      {heights.map((h, i) => (
        <span
          key={i}
          style={{ height: `${h}%` }}
          className="w-[2px] rounded-full bg-(--ob-accent)/60"
        />
      ))}
    </span>
  );
}
