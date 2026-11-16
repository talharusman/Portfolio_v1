import { defaultGallery, todo, type Project } from "@/data/projects/types";

const title = "Secure AI Banking Gateway";

export const secureAiBankingGateway: Project = {
  slug: "secure-ai-banking-gateway",
  title,
  category: "AI Engineering / Backend Systems",
  filters: ["ai-ml", "backend", "deep-learning"],
  disciplines: ["AI", "Full-stack"],
  summary:
    "A secure AI gateway that processes sensitive banking requests through local AI infrastructure while routing suitable non-sensitive requests to cloud AI services.",
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
  highlights: [
    "FastAPI backend",
    "Qwen2.5 fine-tuning using LoRA",
    "Local inference using GGUF and llama.cpp",
    "Sensitive data detection and redaction",
    "JWT authentication and rate limiting",
    "Prompt and context management",
    "OpenAI-compatible API interface",
  ],
  featured: true,
  caseStudy: {
    problem: {
      statement:
        "Banking requests can contain sensitive customer data, so they need to be processed on local infrastructure, while requests that are not sensitive can use cloud AI services. Something has to sit in front of both and decide.",
      importance: todo("Why keeping sensitive banking data local mattered for this project."),
      limitations: todo("What the alternatives (sending everything to a cloud model, or running everything locally) lacked."),
    },
    solution: {
      summary:
        "A gateway service that authenticates and rate-limits every request, detects and redacts sensitive data, and then serves the request from a locally hosted fine-tuned model or routes it to a cloud AI service when it is suitable.",
      points: [
        "A FastAPI backend exposes an OpenAI-compatible API, so existing client code can call it.",
        "A Qwen2.5 model fine-tuned with LoRA runs locally through GGUF and llama.cpp.",
        "Sensitive data is detected and redacted before a request goes further.",
        "JWT authentication and rate limiting control who can call the gateway and how often.",
        "Prompt and context management is handled in the gateway.",
      ],
    },
    contribution: todo("What you designed and built yourself, and anything done as part of a team."),
    architecture: {
      status: "draft",
      caption: "Layered view built from the project’s technology list.",
      layers: [
        { label: "Client", nodes: [{ name: "Client application", detail: "OpenAI-style requests" }] },
        {
          label: "API layer",
          nodes: [
            { name: "FastAPI gateway", detail: "OpenAI-compatible API" },
            { name: "JWT authentication" },
            { name: "Rate limiting" },
          ],
        },
        {
          label: "Processing",
          nodes: [
            { name: "Sensitive data detection and redaction" },
            { name: "Prompt and context management" },
            { name: "Request routing" },
          ],
        },
        {
          label: "AI / ML",
          nodes: [
            { name: "Local model", detail: "Qwen2.5, LoRA fine-tuned, GGUF on llama.cpp" },
          ],
        },
        {
          label: "External services",
          nodes: [{ name: "Cloud AI services", detail: "suitable non-sensitive requests" }],
        },
      ],
    },
    implementation: [
      {
        title: "Serving layer",
        technologies: ["FastAPI", "OpenAI-compatible API"],
        role: "FastAPI provides the backend. Exposing an OpenAI-compatible interface means standard OpenAI client libraries can talk to the gateway without changes.",
      },
      {
        title: "Model adaptation",
        technologies: ["Qwen2.5", "LoRA"],
        role: "LoRA fine-tunes Qwen2.5 by training small low-rank adapter weights instead of updating the whole model, which keeps fine-tuning light.",
      },
      {
        title: "Local inference",
        technologies: ["GGUF", "llama.cpp"],
        role: "GGUF is the model file format that llama.cpp reads, which lets the fine-tuned model run on local hardware.",
      },
      {
        title: "Access control",
        technologies: ["JWT", "Rate limiting"],
        role: "JWT identifies the caller, and rate limiting caps how many requests a caller can make in a period.",
      },
      {
        title: "Data protection",
        technologies: ["Sensitive data detection", "Redaction"],
        role: "Requests are checked for sensitive data and detected values are redacted. Suitable non-sensitive requests can be routed to cloud AI services.",
      },
      {
        title: "Prompt and context handling",
        technologies: ["Prompt management", "Context management"],
        role: "The gateway manages the prompts and conversation context sent to the model.",
      },
    ],
    challenges: todo("Real technical challenges, decisions and fixes from building this gateway."),
    results: todo("Verified outcomes only, such as measured behavior or test results. Do not add figures that were not measured."),
    learnings: todo("What you learned building this project."),
    gallery: defaultGallery(title),
  },
};
