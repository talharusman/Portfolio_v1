import Link from "next/link";
import { MainNav } from "@/components/layout/MainNav";
import { Container } from "@/components/ui/Container";
import { navigation } from "@/data/navigation";
import { profile } from "@/data/profile";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-background">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center font-wide font-semibold tracking-[0.06em] uppercase"
        >
          {profile.name}
        </Link>
        <MainNav items={navigation} availability={profile.availability} />
      </Container>
    </header>
  );
}
