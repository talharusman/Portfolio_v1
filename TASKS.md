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

## Phase 3: About (implemented; browser review pending)
Skills used: `frontend-design`, `web-design-guidelines` (audit, one fix applied).
- [x] Hero: label, uppercase statement headline and introduction from the brief (`PageHeader` `statement` variant)
- [x] My background: factual prose and a facts list (BS Artificial Intelligence, FAST-NUCES, Karachi); no dates invented
- [x] Engineering philosophy: four numbered blocks
- [x] Areas of interest: seven items from the brief
- [x] Beyond development: structured list (PROCOM’26 AI Grand Prix, Robotics and Automation Society AI Division, Web Hunt, competitive programming)
- [x] Closing call to action (reuses `ContactCta`)
- [x] Lint, build, rendered-HTML and link checks; `web-design-guidelines` audit and fix
- [ ] **Browser check** (desktop, tablet, mobile; light and dark). Main risk: the long uppercase headline at narrow widths.
- [ ] Owner supplies, if wanted: role details and dates for PROCOM’26 and the Robotics and Automation Society AI Division, Web Hunt details, current academic year. None are shown until supplied.
- [ ] Owner confirms the background wording, which I wrote from the brief, and whether to keep "400+ LeetCode problems solved" (LeetCode badges are not shown, pending verification)

## Phase 4: Projects and case studies (implemented; browser review pending)
Skills used: `frontend-design`, `vercel-react-best-practices`, `web-design-guidelines` (audit, fixes applied).
- [x] Projects page: hero from the brief, category filters (All Projects, AI / ML, Full-Stack, Backend Systems, Deep Learning, Research) as real `?category=` links with counts
- [x] Alternating editorial project layouts (no card grid) with overview, problem, contribution, implementation highlights, stack, GitHub and live-demo slots, case-study link
- [x] Reusable case-study page for all six projects: introduction, problem, solution, system architecture, technical implementation, engineering challenges, results and learnings, gallery, Previous / Next / Back navigation
- [x] Architecture diagram component (layered, real markup, Draft tag until confirmed)
- [x] Labeled "To be added" placeholders for everything not supplied; nothing fabricated
- [x] Project data split into one typed file per project (`src/data/projects/`)
- [x] Lint, type-check, build, filter counts, all six case studies, Previous / Next wrap-around, link check
- [x] `web-design-guidelines` audit with fixes
- [ ] **Browser check** (desktop, tablet, mobile; light and dark). Main risks: alternating layout spacing, long category tags, architecture diagram at narrow widths.
- [ ] **Owner content** (each project, in `src/data/projects/<slug>.ts`, replace the `todo(...)` entries): why the problem mattered, what other approaches lacked, your contribution, engineering challenges, verified results, learnings
- [ ] Owner supplies GitHub repository URLs (`repoUrl`), live demo URLs if any (`liveUrl`), and real screenshots (`image`, `gallery[].src` under `public/projects/<slug>/`)
- [ ] Owner confirms the six draft architecture diagrams, then sets `status: "confirmed"` to remove the Draft tag
- [ ] Owner confirms the filter assignments (for example Deep Learning for the banking gateway and fake-job projects). The Research filter has no projects yet and shows an empty state.
- [ ] Known limitation: the first request to an unknown project URL returns 200 with the not-found page and `noindex`; later requests return 404 (Next.js 16 Cache Components behavior)

## Phase 5: Skills and Experience (implemented; browser review pending)
Skills used: `frontend-design`, `web-design-guidelines` (audit, one fix applied).
- [x] Skills & expertise page: your headline and description, five numbered domains with compact labels and a one-line description each, no percentage bars
- [x] Evidence from project data: a label is accent-marked when a project stack on this site names it (20 skills today); each domain lists the projects it was applied in, with links
- [x] Experience & leadership page: headline from the brief; Technical Experience, Leadership & Activities (PROCOM’26 AI Grand Prix, Robotics and Automation Society) and Achievements
- [x] Reusable timeline entry (period column, organization, position, summary, responsibilities, technologies, contributions)
- [x] Nothing invented: missing dates, responsibilities and contributions show labeled "To be added" notes
- [x] Lint, type-check, build, served-page checks (accent set matches an independent calculation from the project stacks)
- [x] `web-design-guidelines` audit with fix (`translate="no"` on technology labels)
- [ ] **Browser check** (desktop, tablet, mobile; light and dark)
- [ ] **PyTorch** was left out ("if applicable" in the brief and unconfirmed). Add it to `src/data/skills.ts` only if you can explain it in an interview.
- [ ] Review the skills lists once more against "can I explain this in an interview" (NumPy, Pandas, TensorFlow, Computer Vision, Redis, Model Evaluation, Feature Engineering and others have no project on the site yet)
- [ ] Owner supplies technical experience (internships or engineering work) in `src/data/experience.ts`: organization, position, dates, responsibilities, technologies, contributions. None is shown until supplied.
- [ ] Owner supplies dates, responsibilities and contributions for PROCOM’26 and the Robotics and Automation Society. Entries cannot be ordered chronologically until dates exist.
- [ ] **Verify the LeetCode figures** ("400+ problems solved", "Six badges") before publishing; they are shown as stated and flagged in `src/data/experience.ts`. No LeetCode link is shown until a profile URL is supplied.
- [ ] Decide whether the home page capability preview (`src/data/expertise.ts`, from the Phase 2 brief) should be generated from the skills data so the two lists cannot drift

## Phase 6: Resume and Contact
- [ ] Resume page (web version plus PDF download once the file exists)
- [ ] Contact page (mailto, copy email, profile links, no fake form)
- [ ] Browser check, audit and fixes

## Phase 7: Interactions and responsiveness
- [ ] Motion (hero reveal, scroll reveals, hover states) with reduced-motion support
- [ ] Tablet and mobile pass on every page
- [ ] Keyboard and focus pass

## Phase 8: Testing, optimization, deployment prep
- [ ] Full audit with `web-design-guidelines` across all pages
- [ ] Performance review with `vercel-react-best-practices` (images, fonts, bundle, client components)
- [ ] Metadata, Open Graph, `sitemap`, `robots`, favicon
- [ ] Every link and button verified working
- [ ] Production build passes, deployment notes in `README.md`
