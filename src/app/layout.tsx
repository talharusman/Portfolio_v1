import type { Metadata, Viewport } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { profile } from "@/data/profile";
import {
  archivo,
  jakarta,
  jetbrainsMono,
  plexMono,
  sourceSerif,
  spaceGrotesk,
} from "@/lib/fonts";
import { siteUrl } from "@/lib/site";
import { themeScript } from "@/lib/theme";
import "@/styles/globals.css";

const description = `Portfolio of ${profile.name}, ${profile.role}. Full-stack applications, machine learning systems and AI engineering projects.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name}: ${profile.role}`,
    template: `%s | ${profile.name}`,
  },
  description,
  authors: [{ name: profile.name }],
  alternates: { canonical: "./" },
  openGraph: {
    type: "website",
    siteName: profile.name,
    locale: "en",
  },
  twitter: { card: "summary_large_image" },
};

// Browser chrome follows the system theme; values are the owner background colors.
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F4F3EF" },
    { media: "(prefers-color-scheme: dark)", color: "#0B0B0A" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // The theme script sets data-theme before hydration, so React must not
    // treat the attribute difference as an error.
    <html
      lang="en"
      suppressHydrationWarning
      className={`${archivo.variable} ${sourceSerif.variable} ${plexMono.variable} ${spaceGrotesk.variable} ${jakarta.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-foreground focus:px-4 focus:py-3 focus:text-background"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
