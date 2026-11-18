"use client";

import { useEffect } from "react";

// Set once the first page has mounted. A template remounts on every navigation,
// so later instances know they are a client-side navigation and play the fade.
// The first load is not faded: that would only delay first paint and the LCP.
let hasNavigated = false;

export default function Template({ children }: { children: React.ReactNode }) {
  const fade = hasNavigated;

  useEffect(() => {
    hasNavigated = true;
  }, []);

  return <div className={fade ? "page-in" : undefined}>{children}</div>;
}
