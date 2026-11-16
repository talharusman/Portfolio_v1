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
- [x] PyTorch added (confirmed by the resume and the ZeroController project)
- [ ] Review the skills lists once more against "can I explain this in an interview" (NumPy, Pandas, TensorFlow, Computer Vision, Redis, Model Evaluation, Feature Engineering and others have no project on the site yet)
- [x] Technical experience supplied through the resume (Bank Alfalah, freelance, teaching assistant); see Phase 6
- [ ] Leadership dates are still missing (responsibilities and contributions came from the resume). Entries cannot be ordered chronologically until dates exist.
- [ ] **Verify the LeetCode figures** ("400+ problems solved", "Six badges") before publishing; they are shown as stated and flagged in `src/data/experience.ts`. No LeetCode link is shown until a profile URL is supplied.
- [ ] Decide whether the home page capability preview (`src/data/expertise.ts`, from the Phase 2 brief) should be generated from the skills data so the two lists cannot drift

## Phase 6: Resume and Contact (implemented; partly reviewed in a browser)
Skills used: `frontend-design`, `web-design-guidelines` (audit, two fixes applied).
- [x] Resume page: headline from the brief, prominent Download Resume button, professional introduction, education, technical skills, projects, experience, leadership, achievements, document-style PDF preview
- [x] The real PDF is served at `/resume/resume.pdf` (copied from the file the owner attached; text verified identical). It is a PDF, not an image; the download button and the preview appear only when the file exists.
- [x] Contact page: label, headline and description from the brief; Email, LinkedIn, GitHub (real links) and Location; form with name, email, subject and message; closing statement
- [x] Contact form: server-side validation, inline errors with focus on the first one, pending state, success only when the mail provider confirms delivery, honest "not set up" and failure states, honeypot, `<noscript>` notice
- [x] Mail goes through Resend's REST API only when `RESEND_API_KEY` and `CONTACT_TO_EMAIL` are set (see `.env.example` and the README); nothing is sent or faked otherwise
- [x] Owner facts from the resume applied: contact details, technical experience (Bank Alfalah, freelance, teaching assistant), leadership details, PyTorch added to skills
- [x] Footer now shows LinkedIn, GitHub and Email
- [x] Tested: unit test of validation and sending (mock provider), end-to-end form test in headless Chrome against a local mock mail server (empty submit, provider failure, success), unconfigured state, `/resume/resume.pdf` served as `application/pdf`
- [x] First real visual check: screenshots of all eight pages in light, dark and 390px mobile; no horizontal overflow and no console errors on any of them
- [ ] **Configure the mail provider** in your hosting settings or `.env.local`: `RESEND_API_KEY` and `CONTACT_TO_EMAIL`. Until then the form shows "not set up" and the page tells visitors to email you. With Resend's default sender (`onboarding@resend.dev`) mail is delivered only to the Resend account owner's address; verify a domain to change that. Then send one real test message.
- [ ] **Owner decisions needed (conflicts between earlier briefs and the resume):**
  - Fake Job Posting Prediction: the Phase 1 stack says Keras and Docker; the resume says Python, Flask, React.js, Scikit-Learn, TF-IDF, SMOTE (no Keras, no Docker). Not changed on the site yet.
  - Robotics and Automation Society: the brief says "AI Division Leadership"; the resume says "Head, Robotics & Automation Society". The brief's wording is on the site.
  - Is the resume's "Hospital Management System" the same project as the site's "Smart Healthcare Management System"? They are listed separately.
  - Redis is in the skills page but not in the resume. Keep only if you can explain it.
- [ ] **Resume facts not yet used on the site** (your call): the AI Grand Prix Competition Platform and ZeroController projects (not on the Projects page), the Bank Alfalah context and the figures (5,000 examples, eval loss 0.1885, perplexity 1.2074) in the Secure AI Banking Gateway case study, the 94% accuracy on 18K+ listings for the fake-job case study, and "final-year student, Aug 2023 – May 2027" in About.
- [ ] **Privacy:** the downloadable PDF contains your phone number. The site pages do not show it. Remove it from the PDF if you do not want it public.
- [ ] Browser-check the PDF preview in a normal browser (headless Chrome shows a black frame because it does not render PDFs)
- [ ] Known limitations: with JavaScript disabled a submit gives no visible result (a notice says so); there is no rate limiting beyond validation and the honeypot

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
