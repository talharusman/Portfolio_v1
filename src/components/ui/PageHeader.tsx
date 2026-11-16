import { Container } from "@/components/ui/Container";

type PageHeaderProps = {
  title: string;
  lead?: string;
};

export function PageHeader({ title, lead }: PageHeaderProps) {
  return (
    <header>
      <Container className="grid gap-x-6 gap-y-6 pt-16 pb-12 md:pt-24 md:pb-20 lg:grid-cols-12">
        <h1 className="font-wide text-h1 font-semibold text-balance lg:col-span-10">
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
