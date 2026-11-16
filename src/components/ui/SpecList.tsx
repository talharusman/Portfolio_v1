import { cn } from "@/lib/utils";

type SpecListProps = {
  items: { term: string; detail: React.ReactNode }[];
  className?: string;
};

/**
 * Title-block style specification list: ruled rows, mono term, plain detail.
 * Used for project facts (stack, discipline) and later for experience details.
 */
export function SpecList({ items, className }: SpecListProps) {
  return (
    <dl className={cn("divide-y divide-rule border-y border-rule", className)}>
      {items.map(({ term, detail }) => (
        <div
          key={term}
          className="grid grid-cols-[6.5rem_1fr] gap-4 py-3 sm:grid-cols-[8rem_1fr]"
        >
          <dt className="pt-0.5 font-mono text-label text-muted">{term}</dt>
          <dd className="min-w-0">{detail}</dd>
        </div>
      ))}
    </dl>
  );
}
