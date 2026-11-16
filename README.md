# Talha Rusman: Portfolio

Personal portfolio of Talha Rusman, Full-Stack Developer | AI Engineer. Built with Next.js (App Router), React, TypeScript and Tailwind CSS.

> Work in progress. See `TASKS.md` for current status.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint     # ESLint
```

## Contact form

The form on `/contact` sends mail through [Resend](https://resend.com) and works only when the server has these environment variables (copy `.env.example` to `.env.local` for development, or set them in your hosting provider):

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` | Resend API key. Never commit it. |
| `CONTACT_TO_EMAIL` | Address that receives the messages |
| `CONTACT_FROM_EMAIL` | Optional sender. The default (`onboarding@resend.dev`) delivers only to the Resend account owner until a domain is verified. |

Without the first two, the form is disabled and tells visitors to email directly. It never reports success unless Resend accepted the message.

## Resume

The downloadable resume is `public/resume/resume.pdf`. Replace the file to update it; the download button and the preview on `/resume` appear only when it exists.

## Project structure

```
src/app/         routes
src/components/  reusable components
src/sections/    page sections
src/data/        typed content (profile, projects, skills, experience)
src/lib/         utilities
src/styles/      global styles and design tokens
public/          images, project screenshots, resume PDF
```

## Documentation

- `PROJECT_CONTEXT.md`: goals, content, architecture, decisions
- `DESIGN_SYSTEM.md`: colors, typography, layout, motion
- `TASKS.md`: phase checklist
- `DEVELOPMENT_LOG.md`: history, decisions, errors and fixes
- `CLAUDE.md`: guidance for Claude Code

## Deployment

Not configured yet. Deployment notes will be added in the final phase.
