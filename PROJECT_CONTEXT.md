# PROJECT_CONTEXT.md

Single source of truth for what this portfolio is and how it is built. Read this before starting any phase. Do not state anything here that has not been confirmed by the owner.

## Owner

**Talha Rusman**, Full-Stack Developer | AI Engineer. Do not describe the owner as "senior", and do not invent experience, metrics, user counts, employment history or deployment URLs.

- Education: BS Artificial Intelligence, FAST-NUCES, Karachi.
- Leadership: Head of AI Module for PROCOM'26 AI Grand Prix. Robotics and Automation Society, AI Division.
- Achievements: Second Place in Web Hunt. 400+ LeetCode problems solved. Six LeetCode badges (**unverified**: confirm the current count before publishing).
- Positioning: Full-Stack Engineering and AI Engineering carry equal weight. Neither is a side note.

## Goal

A distinctive, premium, editorial, minimalist engineering portfolio that shows technical depth, architecture understanding and the ability to ship complete AI-powered and full-stack products. It must not look like a generic AI-generated site.

## Projects (real, owner-supplied)

| Slug (proposed) | Project | Key technology |
|---|---|---|
| `secure-ai-banking-gateway` | Secure AI Banking Gateway | FastAPI, Qwen2.5, LoRA fine-tuning, GGUF, llama.cpp, JWT, rate limiting, sensitive data detection and redaction, prompt and context management |
| `next-best-offer` | Next Best Offer Recommendation System | Python, SQL Server, PyODBC, StandardScaler, PCA, KMeans, customer recommendation pipeline |
| `super-tic-tac-toe-ai` | Super Tic-Tac-Toe AI | Python, FastAPI, HTML, CSS, JavaScript, Minimax, Alpha-Beta pruning |
| `fake-job-posting-prediction` | Fake Job Posting Prediction | TF-IDF, SMOTE, Keras, Flask, React, Docker |
| `real-estate-marketplace` | Real Estate Marketplace | Next.js, TypeScript, Tailwind CSS, Prisma, Supabase, Kinde, Stripe |
| `smart-healthcare-management` | Smart Healthcare Management | React/Next.js, Node.js, Express, MySQL, JWT |

Case studies need architecture, implementation detail, challenges and **verified** results. Only the stack above is confirmed so far. Everything else must come from the owner or from the project repositories. Where a result is not available, omit it. Do not estimate.

## Information still needed from the owner

- Repository links for each project, and any real live URLs. Leave out any link not provided.
- Per-project facts: what it does, the architecture, the owner's role, real challenges, and real results or evaluation numbers.
- Real GitHub, LinkedIn and contact email. The email on the Claude account is not assumed to be the public one.
- `public/resume/resume.pdf` (the real resume).
- Optional: a portrait photo, and screenshots for `public/projects/<slug>/`.
- Details for Web Hunt (year, organizer, team or solo), PROCOM'26 AI Grand Prix (role scope), and the Robotics and Automation Society AI Division (role, dates).
- Current LeetCode profile URL and badge count.

## Tech stack (installed and working)

Next.js 16.4.6 (App Router), React 19.3.0, fonts Archivo, Source Serif 4 and IBM Plex Mono via `next/font`, TypeScript 5, Tailwind CSS 4.3.3, ESLint 9, `motion`, `lucide-react`, `clsx`, `tailwind-merge`. Package manager: npm. Node v25.2.1 is installed locally (a non-LTS release). Consider Node 22 or 24 LTS for deployment.

**This Next.js version differs from older releases.** Read `node_modules/next/dist/docs/` before writing Next.js code (see `AGENTS.md`). `LayoutProps<'/'>` and `PageProps<'/route'>` are global helper types. `new Date()` in a prerendered component fails the build.

## Architecture

```
src/
  app/            routes only (layout, pages, not-found, sitemap, robots)
    projects/[slug]/
  components/     reusable components
    ui/           primitives (Container, ButtonLink, Tag, SectionLabel)
    layout/       Header, Footer, ThemeToggle
  sections/       page sections (Hero, ProjectIndex, Capabilities, ...)
  data/           typed content: profile, projects, skills, experience, navigation
  lib/            utilities (cn, metadata helpers)
  styles/         globals.css: design tokens and base styles
public/
  images/         personal and site images
  projects/       screenshots, one folder per project slug
  resume/         resume.pdf
```

Rules:
- Content lives in `src/data` as typed objects. Components receive props and contain no hardcoded copy.
- Server components by default. Add `"use client"` only for interaction (theme toggle, mobile nav, motion).
- Types live next to the data they describe.
- No backend or database unless a real feature needs one.

## Pages

`/` Home, `/about`, `/projects`, `/projects/[slug]` (six case studies), `/skills`, `/experience`, `/resume`, `/contact`. Navigation links: Home, About, Projects, Expertise (`/skills`), Experience, Resume, Contact. The uppercase name also links to Home.

## Key decisions

- Contact: no form. A form needs a real backend and secrets, and the brief forbids fake success responses. Use a real `mailto:` link, a copy-email button and profile links. A real form (Route Handler plus an email service) can be added later if the owner wants one.
- Resume: the page shows the resume content as a web page, and the PDF download button only appears once `resume.pdf` exists.
- Theme: system preference by default, with a manual toggle stored in `localStorage` and applied before first paint to avoid a flash.
- Phase 1 (design system and shell) is implemented. Routes other than Home still render `PagePlaceholder` until their phase. `/design-system` is a development-only reference page; remove it and `PagePlaceholder` before deployment.

## Skills

`frontend-design`, `web-design-guidelines` and `vercel-react-best-practices` are installed in `.claude/skills/` (verified). Use them as described in `CLAUDE.md`.
