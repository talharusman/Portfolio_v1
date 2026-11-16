import { Archivo, IBM_Plex_Mono, Source_Serif_4 } from "next/font/google";

// Archivo carries headings and interface text; its width axis gives the
// expanded lettering used for display type (`font-wide`).
export const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

// Long-form reading text.
export const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  display: "swap",
});

// Technical labels, dates and stack lists.
export const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});
