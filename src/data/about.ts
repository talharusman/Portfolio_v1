// About page content. Text supplied by the owner in the Phase 3 brief.
// No dates or employment details are included because none were provided.
export const about = {
  hero: {
    label: "About me // Engineering mindset",
    headline:
      "Engineering is more than writing code. It’s about solving the right problems.",
    intro:
      "I’m a Full-Stack Developer and AI Engineer interested in building complete software systems that combine intelligent models, reliable backend infrastructure, and thoughtful user experiences.",
  },
  background: {
    paragraphs: [
      "I’m studying Artificial Intelligence at FAST-NUCES in Karachi, working toward a BS in Artificial Intelligence.",
      "The degree is where my two interests meet: building machine learning systems, and building the software around them. I’m drawn to AI engineering and full-stack development in equal measure, and the projects in this portfolio sit across both.",
    ],
    facts: [
      { term: "Degree", detail: "BS Artificial Intelligence" },
      { term: "University", detail: "FAST-NUCES, Karachi" },
      { term: "Focus", detail: "AI engineering and full-stack development" },
    ],
  },
  philosophy: [
    {
      title: "Build with purpose",
      text: "I focus on building software that solves real problems rather than creating technology without practical value.",
    },
    {
      title: "Understand the system",
      text: "I believe in understanding architecture, data flow, APIs, infrastructure, and how different components work together.",
    },
    {
      title: "Make AI practical",
      text: "I focus on implementing AI and machine learning in useful applications rather than treating models as isolated experiments.",
    },
    {
      title: "Continuous improvement",
      text: "I continuously improve my engineering skills through experimentation, development, and problem-solving.",
    },
  ],
  interests: [
    "Artificial Intelligence",
    "Applied Machine Learning",
    "Deep Learning",
    "Backend Architecture",
    "Full-Stack Product Development",
    "Computer Vision",
    "Intelligent Automation",
  ],
  beyond: [
    {
      kind: "Leadership",
      title: "Head of AI Module",
      context: "PROCOM’26 AI Grand Prix",
    },
    {
      kind: "Leadership",
      title: "AI Division Leadership",
      context: "Robotics and Automation Society",
    },
    {
      kind: "Achievement",
      title: "Second Place",
      context: "Web Hunt",
    },
    {
      kind: "Practice",
      title: "Competitive programming and problem-solving",
      context: "400+ LeetCode problems solved",
    },
  ],
} as const;
