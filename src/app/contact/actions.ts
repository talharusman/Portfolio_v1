"use server";

import { headers } from "next/headers";
import {
  emptyValues,
  sendContactEmail,
  validateContact,
  type ContactState,
  type ContactValues,
} from "@/lib/contact";
import { rateLimit } from "@/lib/rate-limit";

const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;

const read = (formData: FormData, key: string) => {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
};

export async function submitContact(
  _previous: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const values: ContactValues = {
    name: read(formData, "name"),
    email: read(formData, "email"),
    subject: read(formData, "subject"),
    message: read(formData, "message"),
  };

  // Honeypot: a hidden field real visitors never fill in. Bots get a plain failure.
  if (read(formData, "website")) {
    return {
      status: "error",
      values,
      errors: {},
      message: "Your message could not be sent.",
    };
  }

  const errors = validateContact(values);
  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      values,
      errors,
      message: "Fix the highlighted fields and send again.",
    };
  }

  const requestHeaders = await headers();
  const client =
    requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    requestHeaders.get("x-real-ip") ||
    "unknown";
  if (!rateLimit(`contact:${client}`, RATE_LIMIT, RATE_WINDOW_MS).allowed) {
    return {
      status: "error",
      values,
      errors: {},
      message:
        "Too many messages from this connection. Wait a few minutes and try again, or use the email address above.",
    };
  }

  const result = await sendContactEmail(values);

  if (result === "sent") {
    return { status: "success", values: emptyValues, errors: {} };
  }
  if (result === "unavailable") {
    return {
      status: "unavailable",
      values,
      errors: {},
      message: "This form is not set up to send messages yet.",
    };
  }
  return {
    status: "error",
    values,
    errors: {},
    message: "Your message could not be sent. Try again in a moment, or use the email address above.",
  };
}
