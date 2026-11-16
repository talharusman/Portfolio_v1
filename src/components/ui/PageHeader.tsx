import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

type PageHeaderProps = {
  title: string;
  lead?: string;
  /** Short mono label above the title. */
  label?: string;
  /** Large uppercase statement headline instead of a standard page title. */
  statement?: boolean;
};

export function PageHeader({ title, lead, label, statement }: PageHeaderProps) {
  return (
    <header>
      <Container className="grid gap-x-6 gap-y-6 pt-16 pb-12 md:pt-24 md:pb-20 lg:grid-cols-12">
        {label ? (
          <p
            className={cn(
              "font-mono text-label text-accent lg:col-span-12",
              statement && "uppercase",
            )}
          >
            {label}
          </p>
        ) : null}
        <h1
          className={cn(
            "font-semibold text-balance",
            statement
              ? "font-semiwide text-statement uppercase [overflow-wrap:break-word] lg:col-span-12"
              : "font-wide text-h1 lg:col-span-10",
          )}
        >
          {title}
        </h1>
        {lead ? (
          <p className="max-w-measure font-serif text-lead text-muted lg:col-span-7 lg:col-start-4">
            {lead}
          </p>
        ) : null}
      </Container>
    </header>
  );
}
