import Link from "next/link";
import { cn, isInternalHref } from "@/lib/utils";

type Variant = "primary" | "secondary";

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-control border px-5 text-small font-medium transition-colors duration-150 disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "border-accent bg-accent text-on-accent hover:border-foreground hover:bg-foreground hover:text-background",
  secondary:
    "border-foreground text-foreground hover:bg-foreground hover:text-background",
};

export function buttonClasses(variant: Variant = "primary", className?: string) {
  return cn(base, variants[variant], className);
}

type ButtonProps = React.ComponentProps<"button"> & { variant?: Variant };

export function Button({
  variant = "primary",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button type={type} className={buttonClasses(variant, className)} {...props} />
  );
}

type ButtonLinkProps = Omit<React.ComponentProps<"a">, "href"> & {
  href: string;
  variant?: Variant;
};

export function ButtonLink({
  href,
  variant = "primary",
  className,
  ...props
}: ButtonLinkProps) {
  const classes = buttonClasses(variant, className);
  if (isInternalHref(href)) {
    return <Link href={href} className={classes} {...props} />;
  }
  return <a href={href} className={classes} {...props} />;
}
