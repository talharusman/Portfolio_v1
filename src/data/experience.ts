import { todo, type Todo } from "@/data/projects/types";

export type ExperienceEntryData = {
  organization: string;
  position: string;
  /** Duration, for example "Mar 2026 to Aug 2026". Leave unset until the owner supplies it. */
  period?: string;
  summary: string;
  responsibilities: string[] | Todo;
  technologies?: string[];
  contributions: string[] | Todo;
};

// Technical experience: none supplied. Add internships or engineering roles here
// with real organizations and dates only. While empty, the page shows a placeholder.
export const technicalExperience: ExperienceEntryData[] = [];

// Leadership: roles and the descriptions below are owner-supplied. Dates and
// specific responsibilities have not been supplied, so none are shown.
export const leadership: ExperienceEntryData[] = [
  {
    organization: "PROCOM’26 AI Grand Prix",
    position: "Head of AI Module",
    summary:
      "Led the AI module for an F1-themed machine learning competition involving 35 teams.",
    responsibilities: [
      "Competition planning",
      "AI module coordination",
      "Technical collaboration",
      "Team coordination",
    ],
    contributions: todo(
      "Specific contributions and outcomes, such as what you built or ran for the competition. Only what you can verify.",
    ),
  },
  {
    organization: "Robotics and Automation Society",
    position: "AI Division Leadership",
    summary: "Leadership role in the society’s AI division.",
    responsibilities: todo(
      "The actual responsibilities and activities of your role in the AI division.",
    ),
    contributions: todo(
      "Specific contributions, projects or events you led. Only what you can verify.",
    ),
  },
];

// Achievements as stated by the owner. The LeetCode figures are unverified:
// confirm the current problem count and badge count before publishing.
export const achievements = [
  { title: "Second Place", context: "Web Hunt" },
  { title: "400+ problems solved", context: "LeetCode" },
  { title: "Six badges", context: "LeetCode" },
] as const;
