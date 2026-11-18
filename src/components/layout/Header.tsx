"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MainNav } from "@/components/layout/MainNav";
import { Container } from "@/components/ui/Container";
import { navigation } from "@/data/navigation";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

/**
 * Sticky top bar. On the home page it is a glass obsidian bar to match the
 * Inverted Obsidian landing page; every other page keeps the standard bar.
 */
export function Header() {
  const home = usePathname() === "/";

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b",
        home
          ? "obsidian border-(color:--ob-line) bg-(--ob-glass) transition-colors duration-300 ease-(--ob-ease) font-(family-name:--font-jakarta) text-(color:--ob-text) backdrop-blur-[12px] [&_#mobile-menu]:border-(color:--ob-line) [&_#mobile-menu]:bg-(--ob-bg) [&_a]:decoration-(color:--ob-line)"
          : "border-rule bg-background",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link
          href="/"
          className={cn(
            "inline-flex min-h-11 items-center font-semibold tracking-[0.06em] uppercase",
            home
              ? "font-(family-name:--font-space-grotesk) font-bold tracking-[0.04em]"
              : "font-wide",
          )}
        >
          {profile.name}
        </Link>
        <MainNav items={navigation} availability={profile.availability} />
      </Container>
    </header>
  );
}
