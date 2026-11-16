import { fakeJobPostingPrediction } from "@/data/projects/fake-job-posting-prediction";
import { nextBestOffer } from "@/data/projects/next-best-offer";
import { realEstateMarketplace } from "@/data/projects/real-estate-marketplace";
import { secureAiBankingGateway } from "@/data/projects/secure-ai-banking-gateway";
import { smartHealthcareManagement } from "@/data/projects/smart-healthcare-management";
import { superTicTacToeAi } from "@/data/projects/super-tic-tac-toe-ai";
import type { Project } from "@/data/projects/types";

export type { Discipline, FilterId, Project } from "@/data/projects/types";

// Order here is the order shown on the Projects page and in Previous / Next navigation.
// Stacks, categories and highlights are owner-supplied. Problem, solution and
// implementation wording is derived from them; every other detail the owner
// has not supplied is a `todo` placeholder (see data/projects/types.ts).
export const projects: Project[] = [
  secureAiBankingGateway,
  nextBestOffer,
  superTicTacToeAi,
  fakeJobPostingPrediction,
  realEstateMarketplace,
  smartHealthcareManagement,
];

export const getProject = (slug: string) =>
  projects.find((project) => project.slug === slug);

export const featuredProjects = projects.filter((project) => project.featured);

/** Previous and next project in list order, wrapping around at the ends. */
export function getAdjacentProjects(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  return {
    previous: projects[(index - 1 + projects.length) % projects.length],
    next: projects[(index + 1) % projects.length],
  };
}
