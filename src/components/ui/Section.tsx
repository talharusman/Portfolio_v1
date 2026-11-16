import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

type SectionProps = {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
  /** Sets the title in capitals, for sections the brief specifies that way. */
  uppercase?: boolean;
};

/**
 * A ruled section. The title sits in a narrow left column, like an annotation
 * on a drawing sheet; the content takes the wide column.
 */
export function Section({
  id,
  title,
  children,
  className,
  uppercase,
}: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t border-rule">
      <Container
        className={cn(
          "grid gap-x-6 gap-y-8 py-section lg:grid-cols-12",
          className,
        )}
      >
        <h2
          id={`${id}-title`}
          className={cn(
            "font-wide text-h3 font-semibold lg:sticky lg:top-24 lg:col-span-3 lg:self-start lg:pr-6",
            uppercase && "uppercase",
          )}
        >
          {title}
        </h2>
        <div className="min-w-0 lg:col-span-9">{children}</div>
      </Container>
    </section>
  );
}
