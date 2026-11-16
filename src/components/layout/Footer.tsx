import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { TextLink } from "@/components/ui/TextLink";
import { navigation } from "@/data/navigation";
import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="border-t border-rule">
      <Container className="grid gap-x-6 gap-y-10 py-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="font-wide text-h3 font-semibold">{profile.name}</p>
          <p className="mt-2 text-muted">{profile.role}</p>
          <p className="mt-1 text-muted">{profile.education}</p>
        </div>

        <nav aria-label="Footer" className="lg:col-span-4 lg:col-start-7">
          <ul className="space-y-1">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-11 items-center underline decoration-transparent decoration-2 underline-offset-4 transition-colors hover:decoration-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="space-y-1 lg:col-span-2">
          {[...profile.links, { label: "Email", href: `mailto:${profile.email}` }].map(
            (link) => (
              <li key={link.href}>
                <TextLink
                  href={link.href}
                  className="inline-flex min-h-11 items-center"
                >
                  {link.label}
                </TextLink>
              </li>
            ),
          )}
        </ul>
      </Container>
    </footer>
  );
}
