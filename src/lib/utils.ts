import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** True for site-relative paths and in-page anchors; false for http(s) and mailto. */
export function isInternalHref(href: string) {
  return href.startsWith("/") || href.startsWith("#");
}

/** Inline style that staggers a `reveal` element by the given milliseconds. */
export const revealDelay = (ms: number) =>
  ({ "--reveal-delay": `${ms}ms` }) as React.CSSProperties;
