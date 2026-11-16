export type Discipline = "AI" | "Full-stack";

export type FilterId =
  | "ai-ml"
  | "full-stack"
  | "backend"
  | "deep-learning"
  | "research";

/** Content the owner still has to supply. Rendered as a visible, labeled placeholder. */
export type Todo = { todo: string };

export const isTodo = (value: unknown): value is Todo =>
  typeof value === "object" && value !== null && "todo" in value;

export type ArchitectureNode = { name: string; detail?: string };
export type ArchitectureLayer = { label: string; nodes: ArchitectureNode[] };

export type Architecture = {
  /** "draft" shows a Draft tag until the owner confirms the diagram against the repository. */
  status: "draft" | "confirmed";
  caption: string;
  layers: ArchitectureLayer[];
};

export type ImplementationBlock = {
  title: string;
  technologies: string[];
  /** The role these technologies play in the system. */
  role: string;
};

export type Challenge = { title: string; body: string };

export type GalleryItem = {
  /** Path under /public/projects/<slug>/. Leave unset until the real asset exists. */
  src?: string;
  alt: string;
  caption: string;
};

export type CaseStudy = {
  problem: {
    statement: string;
    importance: string | Todo;
    limitations: string | Todo;
  };
  solution: { summary: string; points: string[] };
  contribution: string | Todo;
  architecture: Architecture;
  implementation: ImplementationBlock[];
  challenges: Challenge[] | Todo;
  results: string[] | Todo;
  learnings: string[] | Todo;
  gallery: GalleryItem[];
};

export type Project = {
  slug: string;
  title: string;
  /** Category line as supplied by the owner. */
  category: string;
  filters: FilterId[];
  disciplines: Discipline[];
  /** One-sentence overview, from the owner's description. */
  summary: string;
  stack: string[];
  /** Owner-listed technical highlights. */
  highlights: string[];
  featured?: boolean;
  /** Main image under /public/projects/<slug>/. Unset until a real screenshot exists. */
  image?: string;
  /** Set only when the owner supplies the real URL. */
  repoUrl?: string;
  liveUrl?: string;
  caseStudy: CaseStudy;
};

export const todo = (what: string): Todo => ({ todo: what });

/** Three screenshot slots shared by every project until real images are supplied. */
export const defaultGallery = (title: string): GalleryItem[] => [
  { alt: `${title}: main interface`, caption: "Main interface" },
  { alt: `${title}: key workflow`, caption: "Key workflow" },
  { alt: `${title}: implementation view`, caption: "Implementation view" },
];
