import { defaultGallery, todo, type Project } from "@/data/projects/types";

const title = "Real Estate Marketplace";

export const realEstateMarketplace: Project = {
  slug: "real-estate-marketplace",
  title,
  category: "Full-Stack Engineering",
  filters: ["full-stack"],
  disciplines: ["Full-stack"],
  summary:
    "A full-stack real estate marketplace designed to connect users with property listings and modern transaction workflows.",
  stack: [
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Prisma",
    "Supabase",
    "Kinde",
    "Stripe",
  ],
  highlights: [
    "Next.js, TypeScript and Tailwind CSS",
    "Prisma and Supabase",
    "Kinde authentication",
    "Stripe integration",
  ],
  caseStudy: {
    problem: {
      statement:
        "Users need one place to find property listings and to complete the transaction workflows that follow.",
      importance: todo("Why this marketplace was worth building."),
      limitations: todo("What existing listing or transaction workflows lacked."),
    },
    solution: {
      summary:
        "A Next.js and TypeScript marketplace with authenticated users, a database layer built on Prisma and Supabase, and Stripe handling payments.",
      points: [
        "Next.js, TypeScript and Tailwind CSS build the application.",
        "Prisma and Supabase provide data access and storage.",
        "Kinde handles authentication.",
        "Stripe is integrated for transactions.",
      ],
    },
    contribution: todo("What you designed and built yourself, and anything done as part of a team."),
    architecture: {
      status: "draft",
      caption: "Layered view built from the project’s technology list.",
      layers: [
        {
          label: "Frontend",
          nodes: [{ name: "Next.js application", detail: "TypeScript, Tailwind CSS" }],
        },
        { label: "Authentication", nodes: [{ name: "Kinde" }] },
        { label: "Data", nodes: [{ name: "Prisma" }, { name: "Supabase" }] },
        { label: "External services", nodes: [{ name: "Stripe", detail: "payments" }] },
      ],
    },
    implementation: [
      {
        title: "Application",
        technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
        role: "Next.js provides the application framework, TypeScript adds static typing, and Tailwind CSS handles styling.",
      },
      {
        title: "Data layer",
        technologies: ["Prisma", "Supabase"],
        role: "Prisma is the type-safe database client, and Supabase provides the hosted database.",
      },
      {
        title: "Authentication",
        technologies: ["Kinde"],
        role: "Kinde manages user sign-in and sessions.",
      },
      {
        title: "Payments",
        technologies: ["Stripe"],
        role: "Stripe processes payments for transaction workflows.",
      },
    ],
    challenges: todo("Real technical challenges, decisions and fixes from building this marketplace."),
    results: todo("Verified outcomes only. Do not add user counts, revenue or traffic that were not measured."),
    learnings: todo("What you learned building this project."),
    gallery: defaultGallery(title),
  },
};
