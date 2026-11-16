# TASKS.md

Mark an item done only when it is implemented **and** tested. Update after every phase.

## Phase 0: Inspect, plan, document (current)
- [x] Inspect workspace and confirm the three skills are installed
- [x] Scaffold Next.js 16 + TypeScript + Tailwind + ESLint with npm
- [x] Install `motion`, `lucide-react`, `clsx`, `tailwind-merge`
- [x] Create folder structure (`src/*`, `public/images|projects|resume`)
- [x] Write `CLAUDE.md`, `PROJECT_CONTEXT.md`, `DEVELOPMENT_LOG.md`, `TASKS.md`, `DESIGN_SYSTEM.md`, `README.md`
- [ ] **Owner approves the plan, design direction and fonts**
- [ ] Owner supplies the information listed in `PROJECT_CONTEXT.md`

## Phase 1: Design system and site shell (implemented; browser review pending)
Skills used: `frontend-design`, `vercel-react-best-practices`. `web-design-guidelines` not used yet (see below).
- [x] Replace placeholder code (old pages, cards and sections removed; build error fixed by removing `new Date()`)
- [x] Tokens in `src/styles/globals.css` (owner colors, derived neutrals); contrast measured
- [x] Fonts via `next/font` (Archivo with width axis, Source Serif 4, IBM Plex Mono)
- [x] Theme: system default, toggle, inline script to avoid flash
- [x] Container, Section, PageHeader, Prose, Button, ButtonLink, TextLink, Tag, SpecList, TextField, TextAreaField, ProjectEntry
- [x] Responsive Header with mobile menu, skip link, Footer
- [x] `src/data`: profile, navigation, six projects (stacks owner-supplied; summaries are drafts)
- [x] `DESIGN_SYSTEM.md` rewritten to match the build
- [x] Lint, type-check, production build, served-HTML and compiled-CSS checks
- [ ] **Browser check** in light and dark, mobile and desktop (no browser tool was available this session)
- [ ] **`web-design-guidelines` audit** of the shell and components, then fixes
- [ ] Owner confirms fonts, the drawing-sheet direction, and the draft statement and project summaries
- [ ] Test the mobile menu, theme toggle and keyboard focus in a browser
- [ ] Remove `/design-system` and `PagePlaceholder` before deployment (Phase 7)

## Phase 2: Home (implemented; browser review pending)
Skills used: `frontend-design`, `vercel-react-best-practices` (from Phase 1 and applied here), `web-design-guidelines` (code audit, fixes applied).
- [x] Navigation: uppercase wordmark, seven links (Home, About, Projects, Expertise, Experience, Resume, Contact), theme toggle, sticky with thin bottom border; desktop links from `lg` up
- [x] Availability indicator built; **hidden until the owner supplies a status** (`profile.availability`)
- [x] Hero: label, headline and description from the brief, two buttons, "Download Resume" link, one staggered page-load reveal
- [x] Hero visual: architectural grid panel, request-path diagram, illustrative code fragment, metadata
- [x] Engineering overview strip
- [x] Selected projects: four alternating editorial layouts with number, category, stack, image placeholder and "View Case Study" link
- [x] Engineering capabilities: three technology groups from the brief
- [x] Final call to action
- [x] Minimal real page for each project at `/projects/[slug]` so "View Case Study" links work (full case studies are Phase 3)
- [x] `web-design-guidelines` audit of the home page and shell, with fixes
- [x] Lint, build, link check (every internal link on the home page returns 200)
- [ ] **Browser check** (desktop, tablet, mobile; light and dark). No browser tool was available. Headline wrapping at narrow widths and the hero visual layout are the main risks.
- [ ] Owner supplies GitHub repository URLs (the GitHub links render only when `repoUrl` is set)
- [ ] Owner supplies real project screenshots (placeholders show until `image` is set)
- [ ] Owner confirms: availability status, project categories and summaries, the hero diagram's request path
- [ ] Owner supplies `public/resume/resume.pdf` (the "Download Resume" link goes to the `/resume` page for now)

## Phase 3: Projects and case studies
- [ ] Projects index
- [ ] Case-study template (overview, architecture, implementation, challenges, verified results)
- [ ] Six case studies with real content (needs owner information)
- [ ] `generateStaticParams`, metadata, 404 for unknown slugs
- [ ] Browser check, audit and fixes

## Phase 4: About, Skills, Experience
- [ ] About (education, positioning, achievements)
- [ ] Skills and technical expertise, grouped across Full-Stack and AI equally
- [ ] Experience and leadership (PROCOM'26, Robotics and Automation Society, Web Hunt, LeetCode once verified)
- [ ] Browser check, audit and fixes

## Phase 5: Resume and Contact
- [ ] Resume page (web version plus PDF download once the file exists)
- [ ] Contact page (mailto, copy email, profile links, no fake form)
- [ ] Browser check, audit and fixes

## Phase 6: Interactions and responsiveness
- [ ] Motion (hero reveal, scroll reveals, hover states) with reduced-motion support
- [ ] Tablet and mobile pass on every page
- [ ] Keyboard and focus pass

## Phase 7: Testing, optimization, deployment prep
- [ ] Full audit with `web-design-guidelines` across all pages
- [ ] Performance review with `vercel-react-best-practices` (images, fonts, bundle, client components)
- [ ] Metadata, Open Graph, `sitemap`, `robots`, favicon
- [ ] Every link and button verified working
- [ ] Production build passes, deployment notes in `README.md`
