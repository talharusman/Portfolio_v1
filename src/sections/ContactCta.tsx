import { ArrowRight, ArrowUpRight, Mail, Terminal } from "lucide-react";
import Link from "next/link";
import { CopyEmailButton } from "@/components/CopyEmailButton";
import { ProjectBrief } from "@/components/ProjectBrief";
import { Container } from "@/components/ui/Container";
import { home } from "@/data/home";
import { profile } from "@/data/profile";

// Shows the real address without the protocol, for example "github.com/name".
const display = (href: string) =>
  href.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

const bracket =
  "pointer-events-none absolute size-3 border-(color:--ob-accent) opacity-40 transition-all duration-300 ease-(--ob-ease) group-hover:size-5 group-hover:opacity-100 group-hover:drop-shadow-[0_0_6px_rgba(20,158,126,0.8)]";

/** With `briefScopes`, the banner opens the project brief modal instead of linking to /contact. */
export function ContactCta({ briefScopes }: { briefScopes?: string[] } = {}) {
  const { headline, description } = home.cta;

  const contacts = [
    {
      label: "Email",
      value: profile.email,
      href: `mailto:${profile.email}`,
      icon: <Mail aria-hidden className="size-5" />,
      external: false,
    },
    ...profile.links.map((link) => ({
      label: link.label,
      value: display(link.href),
      href: link.href,
      icon:
        link.label === "GitHub" ? (
          <Terminal aria-hidden className="size-5" />
        ) : (
          <span aria-hidden className="text-base leading-none font-bold">
            in
          </span>
        ),
      external: true,
    })),
  ];

  return (
    <section
      aria-labelledby="cta-title"
      className="obsidian relative overflow-hidden bg-(--ob-bg) font-(family-name:--font-jakarta) text-(color:--ob-text)"
    >

      <Container className="scroll-reveal relative py-20 lg:py-24">
        <div className="grid items-end gap-x-10 gap-y-6 lg:grid-cols-12">
          <h2
            id="cta-title"
            className="font-(family-name:--font-space-grotesk) text-[clamp(2.25rem,0.8rem+5.4vw,5.25rem)] leading-[0.95] font-bold tracking-[-0.04em] text-balance text-(color:--ob-text) uppercase lg:col-span-7 lg:text-[clamp(2.25rem,min(0.8rem+5vw,10svh),5.25rem)]"
          >
            {headline}
          </h2>
          <p className="max-w-md text-base leading-relaxed font-normal text-(color:--ob-muted) lg:col-span-5 lg:justify-self-end lg:pb-1">
            {description}
          </p>
        </div>

        {briefScopes ? (
          <ProjectBrief scopes={briefScopes} email={profile.email} />
        ) : (
        <Link
          href="/contact"
          className="group mt-8 flex min-h-24 items-center justify-between gap-4 rounded-xl bg-(--ob-accent) px-5 text-(color:--ob-on-accent) transition-all duration-300 ease-(--ob-ease) hover:-translate-y-1 hover:shadow-[0_18px_40px_-18px_rgba(20,158,126,0.7)] sm:min-h-28 sm:px-8"
        >
          <span className="flex flex-col gap-1">
            <span
              aria-hidden
              className="font-(family-name:--font-jetbrains) text-xs font-medium tracking-[0.18em] uppercase opacity-75 max-sm:hidden"
            >
              Launch project brief
            </span>
            <span className="text-xl font-semibold sm:text-2xl">Start a conversation</span>
          </span>
          <span
            aria-hidden
            className="flex size-12 shrink-0 items-center justify-center rounded-full border-2 border-(color:--ob-on-accent)"
          >
            <ArrowRight className="size-5 transition-transform duration-300 ease-(--ob-ease) group-hover:-rotate-45" />
          </span>
        </Link>
        )}

        <ul className="mt-4 grid gap-4 lg:grid-cols-3">
          {contacts.map(({ label, value, href, icon, external }) => (
            <li
              key={href}
              className="group relative flex min-h-32 flex-col justify-between gap-6 rounded-xl border border-(color:--ob-line) bg-(--ob-surface) p-5 shadow-(--ob-card-shadow) transition-colors duration-300 ease-(--ob-ease) hover:border-(color:--ob-line-hover) sm:p-6"
            >
              <span aria-hidden className={`${bracket} top-2.5 left-2.5 border-t-2 border-l-2`} />
              <span aria-hidden className={`${bracket} right-2.5 bottom-2.5 border-r-2 border-b-2`} />

              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-3 text-base font-semibold">
                  {icon}
                  {label}
                </span>
                <span className="flex items-center gap-3">
                  {label === "Email" ? <CopyEmailButton email={profile.email} /> : null}
                  <ArrowUpRight
                    aria-hidden
                    className="size-5 text-(color:--ob-muted) transition-all duration-300 ease-(--ob-ease) group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-(color:--ob-accent)"
                  />
                </span>
              </div>
              <a
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                translate="no"
                className="font-(family-name:--font-jetbrains) text-sm font-normal break-all text-(color:--ob-muted) transition-colors duration-200 group-hover:text-(color:--ob-text) after:absolute after:inset-0 after:rounded-xl after:content-['']"
              >
                {value}
                {external ? <span className="sr-only"> ({label}, opens in a new tab)</span> : null}
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
