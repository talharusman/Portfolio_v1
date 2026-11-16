export type Discipline = "AI" | "Full-stack";

export type Project = {
  slug: string;
  title: string;
  summary: string;
  /** Technical category shown on feature layouts. Draft: owner to confirm. */
  category: string;
  disciplines: Discipline[];
  stack: string[];
  featured?: boolean;
  /** Public path under /public/projects, e.g. "/projects/<slug>/cover.png". */
  image?: string;
  /** Only set when the owner supplies the real repository URL. */
  repoUrl?: string;
};

// Stacks are owner-supplied. Summaries and categories are drafts derived only
// from those stacks; the owner must confirm them before the case studies are written.
export const projects: Project[] = [
  {
    slug: "secure-ai-banking-gateway",
    title: "Secure AI Banking Gateway",
    summary:
      "A gateway that serves a fine-tuned Qwen2.5 model behind authentication, rate limiting and sensitive-data redaction.",
    category: "AI infrastructure",
    disciplines: ["AI", "Full-stack"],
    stack: [
      "FastAPI",
      "Qwen2.5",
      "LoRA",
      "GGUF",
      "llama.cpp",
      "JWT",
      "Rate limiting",
      "Data redaction",
    ],
    featured: true,
  },
  {
    slug: "next-best-offer",
    title: "Next Best Offer Recommendation System",
    summary:
      "A customer recommendation pipeline that segments SQL Server data with PCA and KMeans.",
    category: "Machine learning",
    disciplines: ["AI"],
    stack: ["Python", "SQL Server", "PyODBC", "StandardScaler", "PCA", "KMeans"],
    featured: true,
  },
  {
    slug: "super-tic-tac-toe-ai",
    title: "Super Tic-Tac-Toe AI",
    summary:
      "Super Tic-Tac-Toe against an opponent that searches with Minimax and Alpha-Beta pruning.",
    category: "Game AI",
    disciplines: ["AI", "Full-stack"],
    stack: [
      "Python",
      "FastAPI",
      "HTML",
      "CSS",
      "JavaScript",
      "Minimax",
      "Alpha-Beta pruning",
    ],
    featured: true,
  },
  {
    slug: "fake-job-posting-prediction",
    title: "Fake Job Posting Prediction",
    summary:
      "A text classifier for fake job postings, served by a Flask API with a React front end.",
    category: "NLP and classification",
    disciplines: ["AI", "Full-stack"],
    stack: ["TF-IDF", "SMOTE", "Keras", "Flask", "React", "Docker"],
    featured: true,
  },
  {
    slug: "real-estate-marketplace",
    title: "Real Estate Marketplace",
    summary:
      "A property marketplace with Kinde authentication and Stripe payments on Next.js.",
    category: "Full-stack web application",
    disciplines: ["Full-stack"],
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Prisma",
      "Supabase",
      "Kinde",
      "Stripe",
    ],
  },
  {
    slug: "smart-healthcare-management",
    title: "Smart Healthcare Management",
    summary:
      "A healthcare management system with a Node.js and Express API, MySQL and JWT authentication.",
    category: "Full-stack web application",
    disciplines: ["Full-stack"],
    stack: ["React", "Next.js", "Node.js", "Express", "MySQL", "JWT"],
  },
];

export const getProject = (slug: string) =>
  projects.find((project) => project.slug === slug);

export const featuredProjects = projects.filter((project) => project.featured);
