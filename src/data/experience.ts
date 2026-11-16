import type { Todo } from "@/data/projects/types";

export type ExperienceEntryData = {
  organization: string;
  position: string;
  /** Duration as written on the resume. Leave unset until the owner supplies it. */
  period?: string;
  location?: string;
  summary: string;
  /** Leave unset when the source only lists accomplishments. */
  responsibilities?: string[] | Todo;
  technologies?: string[];
  contributions: string[] | Todo;
};

// Technical experience, from the owner's resume PDF (public/resume/resume.pdf),
// most recent start date first. Figures are the owner's own; do not edit them
// without checking the resume.
export const technicalExperience: ExperienceEntryData[] = [
  {
    organization: "Bank Alfalah Limited",
    position: "AI/ML Intern, IT Big Data Department",
    period: "Jun 2026 – Jul 2026",
    location: "Karachi, Pakistan",
    summary:
      "Designed and deployed the Secure AI Banking Gateway, a privacy-aware FastAPI service that routes sensitive requests between local and cloud LLMs.",
    technologies: ["FastAPI", "Qwen 2.5", "LoRA", "GGUF", "llama.cpp", "RAG", "JWT"],
    contributions: [
      "Built NLP detection and redaction, RAG, JWT authentication, rate limiting, conversation memory, and OpenAI-compatible APIs.",
      "Fine-tuned Qwen 2.5 0.5B with LoRA on 5,000 banking-support examples: eval loss 0.1885, perplexity 1.2074.",
      "Converted the model to GGUF and deployed it through llama.cpp for CPU-based local inference.",
    ],
  },
  {
    organization: "Freelance",
    position: "Full Stack Developer (Contract)",
    period: "Jun 2025 – Aug 2025",
    location: "Remote",
    summary: "Next.js, React and API development for client projects.",
    technologies: ["Next.js 14", "React", "REST APIs", "Stripe", "OAuth 2.0"],
    contributions: [
      "Delivered 3 production-ready full-stack applications using Next.js 14 and REST APIs; achieved 90+ Lighthouse scores and a 40% LCP improvement through code splitting and lazy loading.",
      "Implemented Stripe payment flows, OAuth 2.0 authentication, and third-party API integrations; delivered all client projects on time through Agile sprints.",
    ],
  },
  {
    organization: "FAST-NUCES",
    position: "Teaching Assistant, Programming Fundamentals",
    period: "Jan 2025 – Dec 2025",
    location: "Karachi",
    summary: "Teaching assistant for the Programming Fundamentals course.",
    technologies: ["C++"],
    contributions: [
      "Mentored 50+ students in C++ and algorithms; designed 15+ assignments, improving the class average by 20%.",
    ],
  },
];

// Leadership: roles and descriptions are owner-supplied (Phase 5 brief and the
// resume). Dates have not been supplied, so none are shown.
// OPEN QUESTION for the owner: the brief says "AI Division Leadership" for the
// Robotics and Automation Society, the resume says "Head, Robotics & Automation
// Society". The brief's wording is kept until the owner decides.
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
    contributions: [
      "Led an AI competition track evaluating ML solutions from 50+ participants across Pakistan.",
    ],
  },
  {
    organization: "Robotics and Automation Society",
    position: "AI Division Leadership",
    summary: "Leadership role in the society’s AI division at FAST-NUCES.",
    responsibilities: [
      "Organized university-wide AI/ML workshops and inter-university hackathons",
    ],
    contributions: ["Grew technical community engagement by 150%."],
  },
];

// Achievements as stated by the owner. The LeetCode figures are unverified:
// confirm the current problem count and badge count before publishing.
export const achievements = [
  { title: "Second Place", context: "Web Hunt" },
  { title: "400+ problems solved", context: "LeetCode" },
  { title: "Six badges", context: "LeetCode" },
] as const;
