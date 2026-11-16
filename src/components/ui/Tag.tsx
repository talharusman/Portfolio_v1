import { cn } from "@/lib/utils";

type TagProps = React.ComponentProps<"span"> & { tone?: "neutral" | "accent" };

/** Technology or discipline label, set in the technical (mono) face. */
export function Tag({ tone = "neutral", className, ...props }: TagProps) {
  return (
    <span
      translate="no"
      className={cn(
        "inline-flex items-center rounded-control border px-2 py-0.5 font-mono text-label",
        tone === "accent"
          ? "border-accent text-accent"
          : "border-rule text-muted",
        className,
      )}
      {...props}
    />
  );
}

export function TagList({
  items,
  tone,
  label,
}: {
  items: string[];
  tone?: TagProps["tone"];
  label: string;
}) {
  return (
    <ul aria-label={label} className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <li key={item}>
          <Tag tone={tone}>{item}</Tag>
        </li>
      ))}
    </ul>
  );
}
