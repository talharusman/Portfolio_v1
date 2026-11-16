import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn, isInternalHref } from "@/lib/utils";

const classes =
  "underline decoration-accent decoration-2 underline-offset-4 transition-colors hover:decoration-foreground";

type TextLinkProps = Omit<React.ComponentProps<"a">, "href"> & { href: string };

/** Inline link. Internal paths use client navigation; http(s) links open in a new tab. */
export function TextLink({ href, className, children, ...props }: TextLinkProps) {
  if (isInternalHref(href)) {
    return (
      <Link href={href} className={cn(classes, className)} {...props}>
        {children}
      </Link>
    );
  }

  const opensNewTab = href.startsWith("http");
  return (
    <a
      href={href}
      className={cn(classes, className)}
      {...(opensNewTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    >
      {children}
      {opensNewTab ? (
        <>
          <ArrowUpRight
            aria-hidden
            className="ml-0.5 inline size-[1em] align-[-0.1em]"
          />
          <span className="sr-only"> (opens in a new tab)</span>
        </>
      ) : null}
    </a>
  );
}
