import { expertise } from "@/data/expertise";

const items = Array.from(new Set(expertise.flatMap((group) => group.items)));

/** One slow drift of the owner's technologies. The duplicate set is hidden from assistive tech. */
export function TechTicker() {
  return (
    <section
      aria-label="Technologies"
      className="overflow-hidden border-b border-(color:--ob-line) py-5 [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]"
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
                <span aria-hidden className="size-1.5 rotate-45 bg-(--ob-accent)" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
