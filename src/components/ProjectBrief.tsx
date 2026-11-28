"use client";

import { ArrowRight, CircleAlert, X } from "lucide-react";
import { useActionState, useEffect, useRef, useState } from "react";
import { submitContact } from "@/app/contact/actions";
import { contactLimits, initialContactState } from "@/lib/contact";

const field =
  "mt-2 w-full rounded-lg border bg-(--ob-bg) px-3.5 py-2.5 text-base text-(color:--ob-text) transition-colors duration-200 placeholder:text-(color:--ob-meta) focus-visible:border-(color:--ob-accent)";
const label = "block text-sm font-semibold text-(color:--ob-text)";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 flex items-start gap-1.5 text-sm font-medium text-(color:--ob-text)">
      <CircleAlert aria-hidden className="mt-0.5 size-4 shrink-0 text-(color:--ob-accent)" />
      <span>Error: {message}</span>
    </p>
  );
}

/**
 * Brief form inside the modal. Sends through the same server action as the
 * contact page, so it reports success only when the mail provider accepted it.
 */
function BriefForm({ scopes, email }: { scopes: string[]; email: string }) {
  const [state, formAction, pending] = useActionState(submitContact, initialContactState);
  const [scope, setScope] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status !== "error") return;
    formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
  }, [state]);

  if (state.status === "success") {
    return (
      <div role="status" className="rounded-xl border border-(color:--ob-accent) bg-(--ob-accent)/10 p-5">
        <p className="font-(family-name:--font-space-grotesk) text-xl font-bold text-(color:--ob-text)">
          Brief sent
        </p>
        <p className="mt-2 text-(color:--ob-muted)">
          Your brief was delivered. Replies go to the email address you entered.
        </p>
      </div>
    );
  }

  const { errors, values } = state;

  return (
    <form ref={formRef} action={formAction} noValidate className="space-y-5">
      <fieldset disabled={pending} className="min-w-0 space-y-5">
        <legend className="text-sm text-(color:--ob-muted)">All fields are required.</legend>

        <fieldset aria-describedby={errors.subject ? "brief-subject-error" : undefined}>
          <legend className={label}>Project scope</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {scopes.map((option, index) => (
              <label
                key={option}
                className="inline-flex min-h-10 cursor-pointer items-center rounded-full border border-(color:--ob-line) px-3.5 font-(family-name:--font-jetbrains) text-xs font-medium text-(color:--ob-muted) transition-colors duration-200 hover:border-(color:--ob-line-hover) hover:text-(color:--ob-text) has-checked:border-(color:--ob-accent) has-checked:bg-(--ob-accent) has-checked:text-(color:--ob-on-accent) has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-(--ob-accent)"
              >
                <input
                  type="radio"
                  name="scope"
                  value={option}
                  checked={option === scope}
                  onChange={() => setScope(option)}
                  aria-invalid={errors.subject && index === 0 ? true : undefined}
                  className="sr-only"
                />
                {option}
              </label>
            ))}
          </div>
          <input type="hidden" name="subject" value={scope ? `Project brief: ${scope}` : ""} />
          <FieldError id="brief-subject-error" message={errors.subject ? "Choose a project scope." : undefined} />
        </fieldset>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="brief-name" className={label}>
              Name
            </label>
            <input
              id="brief-name"
              name="name"
              autoComplete="name"
              required
              maxLength={contactLimits.name}
              defaultValue={values.name}
              aria-invalid={errors.name ? true : undefined}
              aria-describedby={errors.name ? "brief-name-error" : undefined}
              className={`${field} ${errors.name ? "border-(color:--ob-text)" : "border-(color:--ob-line)"}`}
            />
            <FieldError id="brief-name-error" message={errors.name} />
          </div>
          <div>
            <label htmlFor="brief-email" className={label}>
              Email
            </label>
            <input
              id="brief-email"
              name="email"
              type="email"
              autoComplete="email"
              spellCheck={false}
              required
              maxLength={contactLimits.email}
              defaultValue={values.email}
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={errors.email ? "brief-email-error" : undefined}
              className={`${field} ${errors.email ? "border-(color:--ob-text)" : "border-(color:--ob-line)"}`}
            />
            <FieldError id="brief-email-error" message={errors.email} />
          </div>
        </div>

        <div>
          <label htmlFor="brief-message" className={label}>
            Message
          </label>
          <textarea
            id="brief-message"
            name="message"
            rows={5}
            required
            maxLength={contactLimits.message}
            defaultValue={values.message}
            placeholder="What are you building, and where could I help…"
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={errors.message ? "brief-message-error" : undefined}
            className={`${field} resize-y ${errors.message ? "border-(color:--ob-text)" : "border-(color:--ob-line)"}`}
          />
          <FieldError id="brief-message-error" message={errors.message} />
        </div>

        {/* Honeypot: hidden from people and assistive tech, tempting to bots. */}
        <div inert className="absolute left-[-9999px]">
          <label>
            Website
            <input type="text" name="website" autoComplete="off" />
          </label>
        </div>

        <button
          type="submit"
          className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-(--ob-accent) px-6 text-sm font-semibold text-(color:--ob-on-accent) transition-colors duration-200 hover:bg-(--ob-accent-hover)"
        >
          {pending ? "Sending…" : "Send brief"}
          {pending ? null : <ArrowRight aria-hidden className="size-4" />}
        </button>
      </fieldset>

      <div aria-live="polite">
        {state.status === "unavailable" || (state.status === "error" && state.message) ? (
          <p className="flex items-start gap-2 text-sm font-medium text-(color:--ob-text)">
            <CircleAlert aria-hidden className="mt-0.5 size-4 shrink-0 text-(color:--ob-accent)" />
            <span>
              {state.message}{" "}
              {state.status === "unavailable" ? (
                <>
                  Email{" "}
                  <a href={`mailto:${email}`} translate="no" className="text-(color:--ob-accent) underline underline-offset-4">
                    {email}
                  </a>{" "}
                  instead.
                </>
              ) : null}
            </span>
          </p>
        ) : null}
      </div>
    </form>
  );
}

/** The "Start a conversation" banner, opening the brief in a native modal dialog. */
export function ProjectBrief({ scopes, email }: { scopes: string[]; email: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  // Remounts the form on every open, so a sent brief does not stay on screen.
  const [openCount, setOpenCount] = useState(0);

  function open() {
    setOpenCount((count) => count + 1);
    dialogRef.current?.showModal();
  }

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-haspopup="dialog"
        className="group mt-8 flex min-h-24 w-full items-center justify-between gap-4 rounded-xl bg-(--ob-accent) px-5 text-left text-(color:--ob-on-accent) transition-[transform,box-shadow] duration-300 ease-(--ob-ease) hover:-translate-y-1 hover:shadow-[0_18px_40px_-18px_rgba(20,158,126,0.7)] sm:min-h-28 sm:px-8"
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
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby="brief-title"
        className="m-auto w-[min(calc(100%-2rem),40rem)] overscroll-contain rounded-2xl border border-(color:--ob-line) bg-(--ob-surface) p-0 font-(family-name:--font-jakarta) text-(color:--ob-text) shadow-2xl backdrop:bg-black/60 backdrop:backdrop-blur-sm"
      >
        <div className="flex items-start justify-between gap-4 border-b border-(color:--ob-line) px-6 py-5 sm:px-8">
          <div>
            <p className="font-(family-name:--font-jetbrains) text-[0.6875rem] font-medium tracking-[0.1em] text-(color:--ob-accent) uppercase">
              Project brief
            </p>
            <h2 id="brief-title" className="mt-1 font-(family-name:--font-space-grotesk) text-2xl font-bold tracking-[-0.02em]">
              Tell me what you’re building
            </h2>
          </div>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label="Close the project brief"
            className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-(color:--ob-line) text-(color:--ob-muted) transition-colors duration-200 hover:border-(color:--ob-line-hover) hover:text-(color:--ob-text)"
          >
            <X aria-hidden className="size-4" />
          </button>
        </div>
        <div className="max-h-[70vh] overflow-y-auto px-6 py-6 sm:px-8">
          <BriefForm key={openCount} scopes={scopes} email={email} />
        </div>
      </dialog>
    </>
  );
}
