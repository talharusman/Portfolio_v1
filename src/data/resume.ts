// Mirrors the owner's resume PDF (public/resume/resume.pdf). Wording and figures
// are the owner's. Experience, leadership and achievements live in data/experience.ts
// so the Experience page and the Resume page cannot drift apart.
export const resume = {
  file: {
    publicPath: "/resume/resume.pdf",
    downloadName: "Talha-Rusman-Resume.pdf",
  },
  summary:
    "Full-Stack AI Engineer and final-year BS Artificial Intelligence student building LLM, NLP, and computer vision systems with production-style APIs and web applications. Fine-tuned Qwen 2.5 with LoRA and deployed a FastAPI banking gateway at Bank Alfalah; delivered 3 production-ready Next.js applications with REST APIs, Stripe, and OAuth 2.0.",
  education: {
    degree: "Bachelor of Science in Artificial Intelligence",
    school: "FAST National University of Computer and Emerging Sciences (NUCES)",
    location: "Karachi, Pakistan",
    period: "Aug 2023 – May 2027",
    coursework: [
      "Machine Learning",
      "Artificial Intelligence",
      "Data Structures & Algorithms",
      "Database Systems",
      "Operating Systems",
      "Software Engineering",
    ],
  },
  skills: [
    {
      group: "Languages",
      items: ["Python", "C/C++", "JavaScript (ES6+)", "TypeScript", "SQL"],
    },
    {
      group: "AI/ML",
      items: [
        "PyTorch",
        "TensorFlow",
        "Scikit-Learn",
        "Transformers",
        "LoRA",
        "RAG",
        "OpenCV",
        "MediaPipe",
        "llama.cpp",
      ],
    },
    {
      group: "Web & Data",
      items: [
        "React",
        "Next.js",
        "FastAPI",
        "Node.js",
        "Express.js",
        "PostgreSQL",
        "MySQL",
        "MongoDB",
        "Supabase",
      ],
    },
    {
      group: "Tools",
      items: [
        "Docker",
        "Git",
        "Linux",
        "Vercel",
        "Stripe",
        "Postman",
        "Jupyter",
        "Pandas",
        "NumPy",
        "Prisma ORM",
      ],
    },
  ],
  projects: [
    {
      title: "AI Grand Prix Competition Platform",
      period: "Dec 2025",
      stack: ["Next.js", "FastAPI", "PostgreSQL", "WebSockets", "JWT"],
      bullets: [
        "Architected a full-stack platform for 50+ participants; automated code evaluation reduced manual scoring by 80%, with a real-time WebSocket leaderboard at sub-100ms latency.",
        "Designed a normalized PostgreSQL schema, role-based JWT authentication, and responsive dashboards for 3 user types: admin, judge, and participant.",
      ],
    },
    {
      title: "ZeroController: Real-Time Body-Controlled 2D Fighting Game",
      period: "May 2026",
      stack: ["PyTorch", "MediaPipe", "OpenCV", "ST-GCN"],
      bullets: [
        "Built a webcam-controlled fighting game with MediaPipe 33-joint pose extraction and a custom ST-GCN recognizing 9 combat actions at ≤35ms CPU inference and 30 FPS.",
        "Collected and labeled 631 skeleton sequences; engineered hip-centering, normalization, velocity features, augmentation, frame smoothing, and confidence thresholds for stable command dispatch.",
      ],
    },
    {
      title: "Fake Job Posting Detection System",
      period: "Dec 2025",
      stack: ["Python", "Flask", "React.js", "Scikit-Learn", "TF-IDF", "SMOTE"],
      bullets: [
        "Built a Flask REST API and React.js frontend for real-time job classification at sub-200ms inference.",
        "Selected a TF-IDF + SMOTE model through cross-validation, achieving 94% accuracy on 18K+ job listings.",
      ],
      caseStudySlug: "fake-job-posting-prediction",
    },
    {
      title: "Hospital Management System",
      period: "Nov 2025",
      stack: ["Next.js", "Node.js", "Express.js", "MySQL", "JWT", "RBAC"],
      bullets: [
        "Built 5 JWT-secured portals for Admin, Doctor, Staff, Lab, and Pharmacy, supporting 100+ concurrent sessions.",
        "Designed 15+ normalized MySQL tables with ACID transactions for the hospital management platform.",
      ],
    },
  ],
} as const;
