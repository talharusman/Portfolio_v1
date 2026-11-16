// Confirmed facts only (see PROJECT_CONTEXT.md). Add social links and the
// public email here once the owner supplies them; nothing is linked until then.
export type ProfileLink = { label: string; href: string };

export const profile = {
  name: "Talha Rusman",
  role: "Full-Stack Developer | AI Engineer",
  education: "BS Artificial Intelligence, FAST-NUCES, Karachi",
  // Availability indicator in the header. Set a short status (for example
  // "Open to opportunities") only when the owner confirms it; null hides it.
  availability: null as string | null,
  links: [] as ProfileLink[],
};
