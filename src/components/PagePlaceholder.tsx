import { PageHeader } from "@/components/ui/PageHeader";

/** Temporary body for routes whose phase has not started. Removed page by page. */
export function PagePlaceholder({ title }: { title: string }) {
  return (
    <PageHeader
      title={title}
      lead="This page is still being built."
    />
  );
}
