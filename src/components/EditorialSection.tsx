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
      <Container className="scroll-reveal grid gap-x-8 gap-y-6 max-w-[75rem] py-12 sm:gap-y-8 sm:py-14 min-[900px]:grid-cols-12 min-[900px]:py-16">
        <div className="min-w-0 min-[900px]:sticky min-[900px]:top-28 min-[900px]:col-span-4 min-[900px]:self-start min-[900px]:pr-6">
          <p className="font-(family-name:--font-jetbrains) text-[0.6875rem] font-medium tracking-[0.12em] sm:text-xs text-(color:--ob-accent) uppercase">
            {`${index} // ${label}`}
          </p>
          <h2
            id={`${id}-title`}
            className="mt-4 font-(family-name:--font-jakarta) text-[1.625rem] sm:text-[clamp(1.75rem,1.2rem+2.2vw,2.5rem)] min-[900px]:text-[clamp(1.5rem,0.5rem+2.2vw,2.5rem)] leading-[1.08] font-bold tracking-[-0.025em] text-balance text-(color:--ob-text) uppercase wrap-break-word"
          >
            {title}
          </h2>
        </div>
        <div className="min-w-0 min-[900px]:col-span-8">{children}</div>
      </Container>
    </section>
  );
}
