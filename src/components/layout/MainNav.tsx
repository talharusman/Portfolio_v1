"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import type { NavItem } from "@/data/navigation";
import { cn } from "@/lib/utils";

const linkClass =
  "underline decoration-transparent decoration-2 underline-offset-8 transition-colors hover:decoration-rule aria-[current=page]:decoration-accent";

export function MainNav({
  items,
  availability,
}: {
  items: NavItem[];
  availability: string | null;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      // The panel is about to be hidden; keep keyboard focus on a visible control.
      buttonRef.current?.focus();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const isCurrent = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <nav aria-label="Main" className="ml-auto hidden lg:block">
        <ul className="flex items-center gap-7">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isCurrent(item.href) ? "page" : undefined}
                className={linkClass}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex items-center">
        {availability ? (
          <p className="mr-3 hidden items-center gap-2 text-label text-muted xl:flex">
            <span aria-hidden className="size-2 bg-accent" />
            {availability}
          </p>
        ) : null}
        <ThemeToggle />
        <button
          ref={buttonRef}
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="inline-flex size-11 items-center justify-center rounded-control transition-colors hover:bg-surface lg:hidden"
        >
          {open ? (
            <X aria-hidden className="size-5" />
          ) : (
            <Menu aria-hidden className="size-5" />
          )}
        </button>
      </div>

      <nav
        id="mobile-menu"
        aria-label="Main"
        hidden={!open}
        className={cn(
          "absolute inset-x-0 top-full overscroll-contain border-b border-rule bg-background lg:hidden",
        )}
      >
        <ul className="px-gutter py-2">
          {items.map((item) => (
            <li key={item.href} className="border-t border-rule first:border-t-0">
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={isCurrent(item.href) ? "page" : undefined}
                className="flex min-h-12 items-center font-wide text-h3 font-semibold aria-[current=page]:text-accent"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
