import { Container } from "@/components/ui/Container";

type EditorialSectionProps = {
  id: string;
  /** Monospace index, for example "01". */
  index: string;
  /** Monospace label after the index, for example "Education". */
  label: string;
  title: string;
  children: React.ReactNode;
};

/**
 * Asymmetric 12-column section. From 900px the left four columns (index and
 * title) stay sticky while the right eight scroll; below that it stacks.
 */
export function EditorialSection({ id, index, label, title, children }: EditorialSectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="border-t border-(color:--ob-line)"
    >
      <Container className="scroll-reveal grid gap-x-8 gap-y-8 py-20 min-[900px]:grid-cols-12 min-[900px]:py-28">
        <div className="min-w-0 min-[900px]:sticky min-[900px]:top-28 min-[900px]:col-span-4 min-[900px]:self-start min-[900px]:pr-6">
          <p className="font-(family-name:--font-jetbrains) text-xs font-medium tracking-[0.18em] text-(color:--ob-accent) uppercase">
            {`${index} // ${label}`}
          </p>
          <h2
            id={`${id}-title`}
            className="mt-4 font-(family-name:--font-space-grotesk) text-[clamp(1.75rem,1.1rem+2.4vw,3rem)] leading-[0.95] font-bold tracking-[-0.04em] text-balance text-(color:--ob-text) uppercase wrap-break-word"
          >
            {title}
          </h2>
        </div>
        <div className="min-w-0 min-[900px]:col-span-8">{children}</div>
      </Container>
    </section>
  );
}
