import { defaultGallery, todo, type Project } from "@/data/projects/types";

const title = "Next Best Offer Recommendation System";

export const nextBestOffer: Project = {
  slug: "next-best-offer",
  title,
  category: "Machine Learning / Data Engineering",
  filters: ["ai-ml"],
  disciplines: ["AI"],
  summary:
    "A recommendation pipeline that analyzes customer transaction and product data to generate personalized product recommendations.",
  stack: ["Python", "SQL Server", "PyODBC", "StandardScaler", "PCA", "KMeans"],
  highlights: [
    "Python and SQL Server",
    "PyODBC database integration",
    "Data preprocessing with StandardScaler",
    "PCA and KMeans clustering",
    "Recommendation pipeline",
  ],
  featured: true,
  caseStudy: {
    problem: {
      statement:
        "Personalized product recommendations depend on understanding how customers transact and which products they use, and that data lives in a relational database.",
      importance: todo("Why next-best-offer recommendations mattered for this project."),
      limitations: todo("What generic or manual approaches to recommendation lacked."),
    },
    solution: {
      summary:
        "A Python pipeline that reads customer transaction and product data from SQL Server, prepares it, groups customers with PCA and KMeans, and produces personalized product recommendations.",
      points: [
        "PyODBC connects the pipeline to SQL Server.",
        "StandardScaler puts features on a common scale before modeling.",
        "PCA reduces the feature space and KMeans clusters customers.",
        "The recommendation pipeline turns the results into product recommendations.",
      ],
    },
    contribution: todo("What you designed and built yourself, and anything done as part of a team."),
    architecture: {
      status: "draft",
      caption: "Layered view built from the project’s technology list.",
      layers: [
        { label: "Data", nodes: [{ name: "SQL Server", detail: "customer transaction and product data" }] },
        { label: "Integration", nodes: [{ name: "PyODBC", detail: "database access from Python" }] },
        {
          label: "AI / ML",
          nodes: [
            { name: "Data preprocessing" },
            { name: "StandardScaler" },
            { name: "PCA" },
            { name: "KMeans clustering" },
          ],
        },
        { label: "Output", nodes: [{ name: "Recommendation pipeline", detail: "personalized product recommendations" }] },
      ],
    },
    implementation: [
      {
        title: "Data access",
        technologies: ["SQL Server", "PyODBC"],
        role: "PyODBC connects Python to SQL Server so the pipeline can read customer transaction and product data directly from the database.",
      },
      {
        title: "Preprocessing",
        technologies: ["Data preprocessing", "StandardScaler"],
        role: "StandardScaler rescales each feature to zero mean and unit variance, so features with large ranges do not dominate distance-based methods.",
      },
      {
        title: "Dimensionality reduction",
        technologies: ["PCA"],
        role: "PCA projects the scaled features onto fewer components that keep most of the variance, which simplifies clustering.",
      },
      {
        title: "Customer segmentation",
        technologies: ["KMeans"],
        role: "KMeans groups customers into clusters of similar behavior.",
      },
      {
        title: "Recommendation and integration",
        technologies: ["Recommendation pipeline", "Database integration"],
        role: "The pipeline turns the segmentation into personalized product recommendations and integrates with the database.",
      },
    ],
    challenges: todo("Real technical challenges, decisions and fixes from building this pipeline."),
    results: todo("Verified outcomes only, such as evaluation results. Do not add figures that were not measured."),
    learnings: todo("What you learned building this project."),
    gallery: defaultGallery(title),
  },
};
