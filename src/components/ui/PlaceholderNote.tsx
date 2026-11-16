import { Tag } from "@/components/ui/Tag";
import { isTodo, type Todo } from "@/data/projects/types";
import { cn } from "@/lib/utils";

/** Visible, labeled placeholder for content the owner has not supplied yet. */
export function PlaceholderNote({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("border border-dashed border-muted p-4", className)}>
      <Tag>To be added</Tag>
      <p className="mt-2 text-muted">{children}</p>
    </div>
  );
}

/** Renders text, or a placeholder note when the value is still a `todo`. */
export function TextOrPlaceholder({ value }: { value: string | Todo }) {
  return isTodo(value) ? (
    <PlaceholderNote>{value.todo}</PlaceholderNote>
  ) : (
    <p>{value}</p>
  );
}
