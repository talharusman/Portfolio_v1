import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

type SectionProps = {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
  /** Sets the title in capitals, for sections the brief specifies that way. */
  uppercase?: boolean;
  /** Mono marker above the title, for example "01". Use only where the brief numbers sections. */
  number?: string;
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
  number,
}: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t border-rule">
      <Container
        className={cn(
          "scroll-reveal grid gap-x-6 gap-y-8 py-section lg:grid-cols-12",
          className,
        )}
      >
        <div className="min-w-0 lg:sticky lg:top-24 lg:col-span-4 lg:self-start lg:pr-6 xl:col-span-3">
          {number ? (
            <p aria-hidden className="mb-2 font-mono text-label text-accent tabular-nums">
              {number}
            </p>
          ) : null}
          <h2
            id={`${id}-title`}
            // Long single words (such as "Infrastructure") must never overflow the
            // narrow title column: uppercase titles are set a step smaller, and all
            // titles may hyphenate as a last resort.
            className={cn(
              "font-wide font-semibold wrap-break-word hyphens-auto",
              uppercase
                ? "text-[1.375rem] leading-[1.15] uppercase"
                : "text-h3",
            )}
          >
            {title}
          </h2>
        </div>
        <div className="min-w-0 lg:col-span-8 xl:col-span-9">{children}</div>
      </Container>
    </section>
  );
}
