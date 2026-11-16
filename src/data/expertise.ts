export type ExpertiseGroup = { title: string; items: string[] };

// Owner-supplied technology groups for the home page preview.
export const expertise: ExpertiseGroup[] = [
  {
    title: "AI & Machine Learning",
    items: [
      "Python",
      "Machine Learning",
      "Deep Learning",
      "NLP",
      "Computer Vision",
      "Scikit-learn",
      "TensorFlow / Keras",
    ],
  },
  {
    title: "Full-Stack Development",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "FastAPI",
      "Node.js",
      "Express",
    ],
  },
  {
    title: "Data & Infrastructure",
    items: ["SQL", "MySQL", "Supabase", "Docker", "Git", "REST APIs", "Redis"],
  },
];
