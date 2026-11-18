import { expertise } from "@/data/expertise";

const items = Array.from(new Set(expertise.flatMap((group) => group.items)));

const edgeFade =
  "linear-gradient(to right, transparent, black 12%, black 88%, transparent)";

/** One slow drift of the owner's technologies, faded at both edges. The duplicate set is hidden from assistive tech. */
export function TechTicker() {
  return (
    <section
      aria-label="Technologies"
      className="overflow-hidden border-b border-(color:--ob-line) py-5"
      style={{ maskImage: edgeFade, WebkitMaskImage: edgeFade }}
    >
      <div className="animate-drift flex w-max">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1 || undefined}
            className="flex shrink-0 items-center"
          >
            {items.map((item) => (
              <li
                key={item}
                translate="no"
                className="flex items-center font-(family-name:--font-jetbrains) text-sm text-(color:--ob-muted)"
              >
                <span className="px-6">{item}</span>
                <span aria-hidden className="size-1.5 rounded-full bg-(--ob-accent)" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
