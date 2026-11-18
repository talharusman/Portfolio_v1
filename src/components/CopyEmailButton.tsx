"use client";

import { Check, Copy } from "lucide-react";
import { useRef, useState } from "react";

/** Copies the address to the clipboard and confirms with a toast. */
export function CopyEmailButton({ email }: { email: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setState("copied");
    } catch {
      setState("failed");
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), 2200);
  }

  const message =
    state === "copied"
      ? "Email copied to clipboard"
      : state === "failed"
        ? "Could not copy the email"
        : "";

  return (
    <>
      <button
        type="button"
        onClick={copy}
        className="relative z-10 inline-flex min-h-9 items-center gap-1.5 rounded-md border border-(color:--ob-line) bg-white/5 px-3 font-(family-name:--font-jetbrains) text-xs font-medium text-(color:--ob-text) transition-colors duration-200 hover:border-(color:--ob-accent) hover:text-(color:--ob-accent)"
      >
        {state === "copied" ? (
          <Check aria-hidden className="size-3.5 text-(color:--ob-accent)" />
        ) : (
          <Copy aria-hidden className="size-3.5" />
        )}
        Copy
      </button>
      <div
        role="status"
        aria-live="polite"
        className={`pointer-events-none fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-lg border border-(color:--ob-line) bg-(--ob-surface) px-4 py-3 text-sm font-medium text-(color:--ob-text) shadow-lg transition-all duration-300 ease-(--ob-ease) ${
          message ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
        }`}
      >
        {message}
      </div>
    </>
  );
}
