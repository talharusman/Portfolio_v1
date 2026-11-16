import { defaultGallery, todo, type Project } from "@/data/projects/types";

const title = "Super Tic-Tac-Toe AI";

export const superTicTacToeAi: Project = {
  slug: "super-tic-tac-toe-ai",
  title,
  category: "AI / Full-Stack Development",
  filters: ["ai-ml", "full-stack"],
  disciplines: ["AI", "Full-stack"],
  summary:
    "An intelligent Super Tic-Tac-Toe application with nine interconnected boards and an AI opponent.",
  stack: [
    "Python",
    "FastAPI",
    "HTML",
    "CSS",
    "JavaScript",
    "Minimax",
    "Alpha-Beta pruning",
  ],
  highlights: [
    "FastAPI and Python",
    "HTML, CSS and JavaScript interface",
    "Minimax algorithm",
    "Alpha-Beta pruning",
    "Game-state management",
  ],
  featured: true,
  caseStudy: {
    problem: {
      statement:
        "Super Tic-Tac-Toe has nine interconnected boards, so its state space is far larger than standard tic-tac-toe, and a computer opponent has to search it efficiently.",
      importance: todo("Why you chose this game and what made the AI opponent worth building."),
      limitations: todo("What simpler approaches to the opponent lacked."),
    },
    solution: {
      summary:
        "A web application with an interactive browser interface, a FastAPI backend that manages game state, and an AI opponent that uses Minimax with Alpha-Beta pruning.",
      points: [
        "The interface is built with HTML, CSS and JavaScript.",
        "FastAPI and Python provide the backend.",
        "Game-state management tracks the nine boards.",
        "Minimax with Alpha-Beta pruning chooses the AI’s moves.",
      ],
    },
    contribution: todo("What you designed and built yourself, and anything done as part of a team."),
    architecture: {
      status: "draft",
      caption: "Layered view built from the project’s technology list.",
      layers: [
        {
          label: "Frontend",
          nodes: [{ name: "Interactive interface", detail: "HTML, CSS, JavaScript" }],
        },
        { label: "API layer", nodes: [{ name: "FastAPI", detail: "Python backend" }] },
        {
          label: "Game logic",
          nodes: [
            { name: "Game-state management", detail: "nine boards" },
            { name: "AI opponent", detail: "Minimax with Alpha-Beta pruning" },
          ],
        },
      ],
    },
    implementation: [
      {
        title: "Interface",
        technologies: ["HTML", "CSS", "JavaScript"],
        role: "The browser interface renders the nine interconnected boards and handles player input.",
      },
      {
        title: "Backend",
        technologies: ["Python", "FastAPI"],
        role: "A FastAPI backend written in Python provides the application server.",
      },
      {
        title: "Game state",
        technologies: ["Game-state management"],
        role: "Game-state management keeps track of the state of all nine boards as moves are played.",
      },
      {
        title: "AI opponent",
        technologies: ["Minimax", "Alpha-Beta pruning"],
        role: "Minimax searches the game tree assuming both players play optimally. Alpha-Beta pruning skips branches that cannot change the result, which makes deeper search practical.",
      },
    ],
    challenges: todo("Real technical challenges, decisions and fixes, for example how the search depth or evaluation was chosen."),
    results: todo("Verified outcomes only, such as how the AI performs against a baseline. Do not add figures that were not measured."),
    learnings: todo("What you learned building this project."),
    gallery: defaultGallery(title),
  },
};
