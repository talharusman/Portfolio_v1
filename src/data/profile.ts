// Confirmed facts only (see PROJECT_CONTEXT.md). Contact details were supplied
// by the owner. The phone number in the resume PDF is intentionally not shown
// anywhere on the site.
export type ProfileLink = { label: string; href: string };

export const profile = {
  name: "Talha Rusman",
  role: "Full-Stack Developer | AI Engineer",
  education: "BS Artificial Intelligence, FAST-NUCES, Karachi",
  location: "Karachi, Pakistan",
  email: "talharusman2004@gmail.com",
  // Availability indicator in the header. Set a short status (for example
  // "Open to opportunities") only when the owner confirms it; null hides it.
  availability: null as string | null,
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/talharusman/" },
    { label: "GitHub", href: "https://github.com/talharusman" },
  ] as ProfileLink[],
};
