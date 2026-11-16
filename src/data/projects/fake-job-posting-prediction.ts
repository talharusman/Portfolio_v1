import { defaultGallery, todo, type Project } from "@/data/projects/types";

const title = "Fake Job Posting Prediction";

export const fakeJobPostingPrediction: Project = {
  slug: "fake-job-posting-prediction",
  title,
  category: "Machine Learning / Full-Stack",
  filters: ["ai-ml", "full-stack", "deep-learning"],
  disciplines: ["AI", "Full-stack"],
  summary:
    "An intelligent application that analyzes job descriptions and predicts whether a job posting may be fraudulent.",
  stack: ["TF-IDF", "SMOTE", "Keras", "Flask", "React", "Docker"],
  highlights: [
    "TF-IDF text features",
    "SMOTE for class balance",
    "Keras model",
    "Flask API",
    "React front end",
    "Docker",
    "Machine learning classification",
  ],
  featured: true,
  caseStudy: {
    problem: {
      statement:
        "People reading a job posting need a way to judge whether it may be fraudulent, based on the description.",
      importance: todo("Why fraudulent job postings are a problem worth solving."),
      limitations: todo("What manual checking or simple rules lacked."),
    },
    solution: {
      summary:
        "A text-classification application: job descriptions are turned into TF-IDF features, a Keras model predicts whether the posting may be fraudulent, and a Flask API with a React front end makes it usable.",
      points: [
        "TF-IDF converts posting text into numeric features.",
        "SMOTE addresses class imbalance in the training data.",
        "A Keras model performs the classification.",
        "Flask serves the model and React provides the interface.",
        "Docker packages the application.",
      ],
    },
    contribution: todo("What you designed and built yourself, and anything done as part of a team."),
    architecture: {
      status: "draft",
      caption: "Layered view built from the project’s technology list.",
      layers: [
        { label: "Frontend", nodes: [{ name: "React interface", detail: "job description input" }] },
        { label: "API layer", nodes: [{ name: "Flask API" }] },
        {
          label: "AI / ML",
          nodes: [
            { name: "TF-IDF features" },
            { name: "Keras classifier" },
            { name: "SMOTE", detail: "applied to training data" },
          ],
        },
        { label: "Infrastructure", nodes: [{ name: "Docker" }] },
      ],
    },
    implementation: [
      {
        title: "Text features",
        technologies: ["TF-IDF"],
        role: "TF-IDF weights each term by how distinctive it is across postings, turning job descriptions into numeric features.",
      },
      {
        title: "Class balance",
        technologies: ["SMOTE"],
        role: "SMOTE oversamples the minority class by creating synthetic examples, so the classifier does not simply favor the majority class.",
      },
      {
        title: "Classification model",
        technologies: ["Keras", "Machine learning classification"],
        role: "A Keras model classifies a posting as likely fraudulent or not.",
      },
      {
        title: "API",
        technologies: ["Flask"],
        role: "Flask exposes the model so the front end can request predictions.",
      },
      {
        title: "Interface",
        technologies: ["React"],
        role: "React provides the interface where a job description is submitted and the prediction is shown.",
      },
      {
        title: "Packaging",
        technologies: ["Docker"],
        role: "Docker packages the application so it runs the same way across environments.",
      },
    ],
    challenges: todo("Real technical challenges, decisions and fixes, for example around imbalanced data."),
    results: todo("Verified outcomes only, such as evaluation metrics you measured. Do not add figures that were not measured."),
    learnings: todo("What you learned building this project."),
    gallery: defaultGallery(title),
  },
};
