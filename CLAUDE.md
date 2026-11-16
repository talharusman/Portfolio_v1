# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Portfolio for Talha Rusman (Full-Stack Developer | AI Engineer), built with Next.js App Router, TypeScript and Tailwind CSS. Not a git repository yet (the owner asked not to run `git init` for now).

## Read first

1. `PROJECT_CONTEXT.md`: owner facts, projects, architecture, decisions.
2. `TASKS.md`: what is done and pending.
3. `DEVELOPMENT_LOG.md`: history and known errors.
4. `DESIGN_SYSTEM.md`: the design system.
5. `AGENTS.md`: this Next.js version has breaking changes. Read `node_modules/next/dist/docs/` before writing Next.js code.

After each phase, update `DEVELOPMENT_LOG.md` and `TASKS.md` (changed files, decisions, errors and fixes, what remains). Do not mark anything complete unless it is implemented and tested.

## Commands

```bash
npm run dev      # dev server on http://localhost:3000
npm run build    # production build (also type-checks)
npm run lint     # ESLint
npx tsc --noEmit # type-check only
```

There is no test runner. Use npm only. Do not run `git init` unless asked.

## Architecture

- `src/app`: routes only. `src/components`: reusable UI (`ui/`, `layout/`). `src/sections`: page sections. `src/data`: typed content. `src/lib`: utilities. `src/styles/globals.css`: design tokens (imported from `src/app/layout.tsx`).
- Content is kept in `src/data` and passed to components as props, so components carry no hardcoded copy. Projects live one file each in `src/data/projects/`; case-study details the owner has not supplied are `todo(...)` placeholders that render as "To be added" notes. Replace them with real content from the owner, never invent it.
- Server components by default; `"use client"` only for interaction.
- Design tokens are CSS variables mapped through Tailwind v4 `@theme inline`. There is no `tailwind.config` file.
- Import alias: `@/*` maps to `src/*`.
- Components and tokens are documented in `DESIGN_SYSTEM.md`. Fonts are in `src/lib/fonts.ts`; the pre-paint theme script is in `src/lib/theme.ts`.
- Pages: `/`, `/about`, `/projects`, `/projects/[slug]`, `/skills`, `/experience`, `/resume`, `/contact`.

## Rules

- Owner colors are fixed: light `#F4F3EF` / `#0B0B0A` / accent `#0A6B5E`; dark `#0B0B0A` / `#F4F3EF` / accent `#18A389`. See `DESIGN_SYSTEM.md` for the forbidden styles.
- Never invent metrics, user counts, employment history, deployment URLs or links. Use only facts in `PROJECT_CONTEXT.md` or supplied by the owner. Do not describe the owner as "senior".
- No fake buttons, dead links or fake form success responses. The contact form reports success only when the mail provider accepted the message (`src/lib/contact.ts`); it needs `RESEND_API_KEY` and `CONTACT_TO_EMAIL` (see `.env.example`).
- The owner's resume (`public/resume/resume.pdf`, mirrored in `src/data/resume.ts` and `src/data/experience.ts`) is the source of truth for experience, dates and figures. Never publish the phone number it contains on a page. Where the resume and an earlier brief disagree, flag it in `TASKS.md` instead of choosing silently.
- Keep secrets out of source code.
- Next.js 16 prerendering rejects `new Date()` in server components.

## Skills (installed in `.claude/skills/`)

Invoke the skill with the Skill tool before the work, and only say a skill was used if it was actually invoked. Report which skills were used at the end of each phase.

- `frontend-design`: before designing or implementing any page or visual change.
- `web-design-guidelines`: to audit each finished page (accessibility, typography, navigation, responsiveness).
- `vercel-react-best-practices`: when writing or reviewing React/Next.js code (structure, rendering, performance).

`skills-lock.json` and the files under `.claude/skills/` are managed by the skills installer; do not hand-edit them.

## Current status

Phases 1 to 7 are implemented (design system, home, About, Projects and case studies, Skills and Experience, Resume and Contact, responsive and interaction pass). Lint and build pass and `web-design-guidelines` has audited every page. Since Phase 6, pages are verified in headless Chrome driven over the DevTools protocol with no dependencies (scripts live in the session scratchpad, not the repo): a responsive audit at 1440, 768 and 390px and a 62-check interaction suite both pass. Not verified: Safari, Firefox, real phones, screen readers, the PDF preview in a normal browser. Phase 8 (testing, optimization, deployment prep) is next.
