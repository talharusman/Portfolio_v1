export type Skill = {
  name: string;
  /**
   * Other names under which this skill appears in a project stack or highlight
   * list (for example the scikit-learn classes used in the recommendation pipeline).
   */
  aliases?: string[];
};

export type SkillDomain = {
  id: string;
  title: string;
  description: string;
  skills: Skill[];
};

// Owner-supplied lists. PyTorch was confirmed by the owner's resume (and the
// ZeroController project). Redis is in the owner's brief but not in the resume:
// confirm it can be explained in an interview.
export const skillDomains: SkillDomain[] = [
  {
    id: "ai-ml",
    title: "AI & Machine Learning",
    description:
      "Building, training and evaluating machine learning and deep learning models.",
    skills: [
      { name: "Python" },
      { name: "NumPy" },
      { name: "Pandas" },
      { name: "Scikit-learn", aliases: ["StandardScaler", "PCA", "KMeans"] },
      { name: "PyTorch" },
      { name: "TensorFlow" },
      { name: "Keras" },
      { name: "NLP" },
      { name: "Machine Learning" },
      { name: "Deep Learning" },
      { name: "Computer Vision" },
      { name: "Model Evaluation" },
      { name: "Feature Engineering" },
    ],
  },
  {
    id: "full-stack",
    title: "Full-Stack Development",
    description: "The interfaces, the servers behind them and the APIs between.",
    skills: [
      { name: "React" },
      { name: "Next.js" },
      { name: "JavaScript" },
      { name: "TypeScript" },
      { name: "HTML5", aliases: ["HTML"] },
      { name: "CSS3", aliases: ["CSS"] },
      { name: "Tailwind CSS" },
      { name: "Node.js" },
      { name: "Express.js", aliases: ["Express"] },
      { name: "FastAPI" },
    ],
  },
  {
    id: "backend",
    title: "Backend & System Engineering",
    description:
      "Services, authentication, data handling and AI integration behind the interface.",
    skills: [
      { name: "REST APIs" },
      { name: "Authentication" },
      { name: "JWT" },
      { name: "API Integration" },
      { name: "Database Design" },
      { name: "Backend Architecture" },
      { name: "Data Processing" },
      { name: "Prompt Engineering" },
      { name: "AI Integration" },
    ],
  },
  {
    id: "data-infrastructure",
    title: "Databases & Infrastructure",
    description: "Where data lives, and how applications are packaged and versioned.",
    skills: [
      { name: "MySQL" },
      { name: "SQL Server" },
      { name: "Supabase" },
      { name: "Redis" },
      { name: "Prisma" },
      { name: "Docker" },
      { name: "Git" },
      { name: "GitHub" },
    ],
  },
  {
    id: "concepts",
    title: "Engineering Concepts",
    description: "The fundamentals the rest of the work rests on.",
    skills: [
      { name: "Data Structures and Algorithms" },
      { name: "Object-Oriented Programming" },
      { name: "Software Design" },
      { name: "Model Deployment" },
      { name: "System Integration" },
      { name: "Debugging" },
      { name: "Performance Optimization" },
    ],
  },
];
