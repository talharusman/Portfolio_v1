// Contact form logic. Self-contained (no path aliases) so it can run outside Next.js.

export type ContactValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type ContactErrors = Partial<Record<keyof ContactValues, string>>;

export type ContactState = {
  status: "idle" | "success" | "error" | "unavailable";
  values: ContactValues;
  errors: ContactErrors;
  message?: string;
};

export const emptyValues: ContactValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export const initialContactState: ContactState = {
  status: "idle",
  values: emptyValues,
  errors: {},
};

export const contactLimits = {
  name: 100,
  email: 254,
  subject: 150,
  message: 5000,
} as const;

const MIN_MESSAGE = 10;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Every error says what to fix. Server-side and authoritative. */
export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};

  if (!values.name) errors.name = "Enter your name.";
  else if (values.name.length > contactLimits.name)
    errors.name = `Use ${contactLimits.name} characters or fewer.`;

  if (!values.email) errors.email = "Enter your email address.";
  else if (
    !emailPattern.test(values.email) ||
    values.email.length > contactLimits.email
  )
    errors.email = "Enter an email address in the form name@example.com.";

  if (!values.subject) errors.subject = "Add a subject.";
  else if (values.subject.length > contactLimits.subject)
    errors.subject = `Use ${contactLimits.subject} characters or fewer.`;

  if (!values.message) errors.message = "Write a message.";
  else if (values.message.length < MIN_MESSAGE)
    errors.message = `Write at least ${MIN_MESSAGE} characters so the request is clear.`;
  else if (values.message.length > contactLimits.message)
    errors.message = `Use ${contactLimits.message} characters or fewer.`;

  return errors;
}

type Env = Record<string, string | undefined>;

/** The form can send only when a mail provider key and a destination address are set. */
export function isContactConfigured(env: Env = process.env): boolean {
  return Boolean(env.RESEND_API_KEY && env.CONTACT_TO_EMAIL);
}

export type SendResult = "sent" | "unavailable" | "failed";

const oneLine = (value: string) => value.replace(/[\r\n]+/g, " ").trim();

/**
 * Sends the message through Resend's REST API. Returns "sent" only when the
 * provider confirms acceptance (2xx); anything else is reported honestly.
 * Secrets come from the environment and are never logged.
 */
export async function sendContactEmail(
  values: ContactValues,
  env: Env = process.env,
  fetchImpl: typeof fetch = fetch,
): Promise<SendResult> {
  if (!isContactConfigured(env)) return "unavailable";

  try {
    // RESEND_API_URL exists so tests can point at a local mock; leave it unset in production.
    const response = await fetchImpl(env.RESEND_API_URL || "https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: env.CONTACT_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>",
        to: [env.CONTACT_TO_EMAIL],
        reply_to: oneLine(values.email),
        subject: `Portfolio message: ${oneLine(values.subject)}`,
        text: `From: ${oneLine(values.name)} <${oneLine(values.email)}>\n\n${values.message}`,
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      console.error(`Contact email provider returned ${response.status}`);
      return "failed";
    }
    return "sent";
  } catch {
    console.error("Contact email request failed");
    return "failed";
  }
}
