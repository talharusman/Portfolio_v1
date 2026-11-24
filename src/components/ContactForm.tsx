"use client";

import { useActionState, useEffect, useRef } from "react";
import { ArrowRight, CircleAlert } from "lucide-react";
import { submitContact } from "@/app/contact/actions";
import { Button } from "@/components/ui/Button";
import { TextAreaField, TextField } from "@/components/ui/TextField";
import { TextLink } from "@/components/ui/TextLink";
import { contactLimits, initialContactState } from "@/lib/contact";



type ContactFormProps = {
  /** True while the server is not configured to send mail. */
  disabled?: boolean;
  email: string;
};

/**
 * Contact form. It never reports success unless the server confirmed that the
 * message was accepted by the mail provider.
 */
export function ContactForm({ disabled = false, email }: ContactFormProps) {
  const [state, formAction, pending] = useActionState(
    submitContact,
    initialContactState,
  );
  const formRef = useRef<HTMLFormElement>(null);

  // After a failed submit, move focus to the first field that needs fixing.
  useEffect(() => {
    if (state.status !== "error") return;
    formRef.current
      ?.querySelector<HTMLElement>('[aria-invalid="true"]')
      ?.focus();
  }, [state]);

  if (state.status === "success") {
    return (
      <div role="status" className="border border-accent p-6">
        <p className="font-wide text-h3 font-semibold">Message sent</p>
        <p className="mt-3 max-w-measure font-serif text-body">
          Your message was delivered. Replies go to the email address you entered.
        </p>
      </div>
    );
  }

  return (
    <form ref={formRef} action={formAction} noValidate className="max-w-measure">
      <noscript>
        <p className="mb-6 flex items-start gap-2 font-medium">
          <CircleAlert aria-hidden className="mt-0.5 size-4 shrink-0" />
          <span>
            Sending a message needs JavaScript. Email{" "}
            <TextLink href={`mailto:${email}`}>{email}</TextLink> instead.
          </span>
        </p>
      </noscript>
      <fieldset disabled={disabled || pending} className="min-w-0 space-y-6">
        <legend className="mb-6 font-serif text-body text-muted">
          All fields are required.
        </legend>

        <TextField
          label="Name"
          name="name"
          autoComplete="name"
          required
          maxLength={contactLimits.name}
          defaultValue={state.values.name}
          error={state.errors.name}
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          spellCheck={false}
          required
          maxLength={contactLimits.email}
          hint="Replies are sent to this address."
          defaultValue={state.values.email}
          error={state.errors.email}
        />
        <TextField
          label="Subject"
          name="subject"
          autoComplete="off"
          required
          maxLength={contactLimits.subject}
          defaultValue={state.values.subject}
          error={state.errors.subject}
        />
        <TextAreaField
          label="Message"
          name="message"
          autoComplete="off"
          required
          maxLength={contactLimits.message}
          defaultValue={state.values.message}
          error={state.errors.message}
        />

        {/* Honeypot: hidden from people and assistive tech, tempting to bots. */}
        <div inert className="absolute left-[-9999px]">
          <label>
            Website
            <input type="text" name="website" autoComplete="off" />
          </label>
        </div>

        <Button type="submit">
          {pending ? "Sending…" : "Send Message"}
          {pending ? null : <ArrowRight aria-hidden className="size-4" />}
        </Button>
      </fieldset>

      <div aria-live="polite" className="mt-6 space-y-2">
        {disabled ? (
          <p className="flex items-start gap-2 font-medium">
            <CircleAlert aria-hidden className="mt-0.5 size-4 shrink-0" />
            <span>
              This form is not set up to send messages yet. Email{" "}
              <TextLink href={`mailto:${email}`}>{email}</TextLink> instead.
            </span>
          </p>
        ) : null}
        {state.status === "unavailable" || state.status === "error" ? (
          <p className="flex items-start gap-2 font-medium">
            <CircleAlert aria-hidden className="mt-0.5 size-4 shrink-0" />
            <span>
              {state.message}
              {state.status === "unavailable" ? (
                <>
                  {" "}
                  Email <TextLink href={`mailto:${email}`}>{email}</TextLink> instead.
                </>
              ) : null}
            </span>
          </p>
        ) : null}
      </div>
    </form>
  );
}
