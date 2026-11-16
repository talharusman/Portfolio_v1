import { connection } from "next/server";
import { ContactForm } from "@/components/ContactForm";
import { profile } from "@/data/profile";
import { isContactConfigured } from "@/lib/contact";

/**
 * Checks the mail configuration at request time, so setting the environment
 * variables on the server takes effect without rebuilding the site.
 */
export async function ContactFormSection() {
  await connection();
  return <ContactForm disabled={!isContactConfigured()} email={profile.email} />;
}
