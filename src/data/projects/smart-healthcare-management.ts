import { defaultGallery, todo, type Project } from "@/data/projects/types";

const title = "Smart Healthcare Management System";

export const smartHealthcareManagement: Project = {
  slug: "smart-healthcare-management",
  title,
  category: "Full-Stack Engineering",
  filters: ["full-stack"],
  disciplines: ["Full-stack"],
  summary:
    "A healthcare management application built around structured patient and operational workflows.",
  stack: ["React", "Next.js", "Node.js", "Express", "MySQL", "JWT", "REST APIs"],
  highlights: [
    "Next.js and React",
    "Node.js and Express",
    "MySQL",
    "JWT authentication",
    "REST APIs",
  ],
  caseStudy: {
    problem: {
      statement:
        "Healthcare operations depend on structured patient and operational workflows that need to be recorded and managed consistently.",
      importance: todo("Why this system was worth building."),
      limitations: todo("What existing or manual workflows lacked."),
    },
    solution: {
      summary:
        "A web application with a React and Next.js front end, a Node.js and Express REST API, MySQL storage, and JWT authentication.",
      points: [
        "Next.js and React provide the front end.",
        "Node.js and Express expose REST APIs.",
        "MySQL stores the application data.",
        "JWT authentication protects access.",
      ],
    },
    contribution: todo("What you designed and built yourself, and anything done as part of a team."),
    architecture: {
      status: "draft",
      caption: "Layered view built from the project’s technology list.",
      layers: [
        { label: "Frontend", nodes: [{ name: "React / Next.js application" }] },
        {
          label: "API layer",
          nodes: [
            { name: "Express on Node.js", detail: "REST APIs" },
            { name: "JWT authentication" },
          ],
        },
        { label: "Data", nodes: [{ name: "MySQL" }] },
      ],
    },
    implementation: [
      {
        title: "Frontend",
        technologies: ["Next.js", "React"],
        role: "The interface is built with React through Next.js.",
      },
      {
        title: "API",
        technologies: ["Node.js", "Express", "REST APIs"],
        role: "Express on Node.js exposes the REST APIs the front end calls.",
      },
      {
        title: "Authentication",
        technologies: ["JWT"],
        role: "JWT identifies the signed-in user on each request.",
      },
      {
        title: "Storage",
        technologies: ["MySQL"],
        role: "MySQL stores the application data in relational tables.",
      },
    ],
    challenges: todo("Real technical challenges, decisions and fixes from building this system."),
    results: todo("Verified outcomes only. Do not add user counts or impact that was not measured."),
    learnings: todo("What you learned building this project."),
    gallery: defaultGallery(title),
  },
};
