# DEVELOPMENT_LOG.md

Newest entries last. Record each phase: what was done, files changed, decisions, errors and fixes, what remains.

## Phase 0: Setup and planning

**Skills used:** none were invoked in this phase. Skills are verified as installed (`.claude/skills/frontend-design`, `web-design-guidelines`, `vercel-react-best-practices`), but no design or review work has happened yet.

### Done
- Scaffolded the app with `create-next-app@latest` (TypeScript, Tailwind, ESLint, App Router, `src/`, `@/*` alias, npm, no git) in a temporary folder, then installed dependencies in `D:\Portfolio`.
- Installed `motion`, `lucide-react`, `clsx`, `tailwind-merge`.
- Moved the global stylesheet to `src/styles/globals.css` and pointed `layout.tsx` at it.
- Created `src/{components,sections,data,lib,styles}` and `public/{images,projects,resume}`.
- Wrote the project documentation files and the implementation plan.

### Placeholder code (to be replaced)
Before the design brief was received, placeholder code was written: a generic header, footer, hero, project card, and pages for home, about, projects, `projects/[slug]`, contact and resume, with placeholder content ("Your Name"). It is not designed to the brief, uses a placeholder indigo accent, and contains no real data. The owner asked for folders only at that point, and the removal decision was left open. It is still on disk and will be replaced in Phase 1 after inspection.

### Tested
- `npm run lint`: passed on the placeholder code.
- `npm run build`: **failed** on the placeholder code (see below). The app has not been run in a browser.

### Errors and solutions
| Problem | Solution |
|---|---|
| Moving `node_modules` out of the scaffold folder failed (files locked by another process) | Deleted the temporary scaffold folder and ran `npm install` in the project root |
| A bash heredoc script failed to parse, so nothing was created | Recreated the files individually |
| `npm run build` fails: `new Date()` in `src/components/layout/Footer.tsx` is "unstable" during prerendering of `/_not-found` | **Not fixed yet.** Footer will be rewritten in Phase 1. Options: compute the year at build via a constant, or render it inside a client component |
| A cleanup command (kill all `node` processes plus bulk delete) was denied | Not retried. Cleanup will be done in Phase 1 with targeted commands |

### Technical decisions
- Next.js 16 conventions differ from older versions. Docs are in `node_modules/next/dist/docs/`.
- Design tokens live in CSS (`@theme` in `globals.css`) rather than a JS theme file.
- Contact page without a form (see `PROJECT_CONTEXT.md`).
- `.gitignore` is the one `create-next-app` generated (covers `node_modules`, `.next`, `.env*`, `*.tsbuildinfo`, `next-env.d.ts`). Git has not been initialized, as requested.

### Remains
Owner approval of the plan, design direction and fonts, plus the information listed in `PROJECT_CONTEXT.md`. Then Phase 1. See `TASKS.md`.

## Phase 1: Design system and site shell

**Skills used:** `frontend-design` (invoked before design and implementation; produced the drawing-sheet direction and the plan review), `vercel-react-best-practices` (invoked for component structure; applied: server components by default, client components only for nav and theme toggle, pre-paint inline theme script, no state held in the toggle, direct icon imports). **Not used:** `web-design-guidelines`. The audit is pending because no browser was available to review the rendered result.

### Design decisions
- Direction: engineering drawing sheet. Annotation-style title column, ruled sections, and projects as title-block rows (`ProjectEntry` + `SpecList`).
- Reviewed the plan against the brief and dropped these defaults: all-caps eyebrows, numbered markers (content is not a sequence), `→` on links, one-word headline accents, zero-radius broadsheet columns (now a 2px control radius).
- Fonts changed from the Phase 0 proposal: Archivo (width axis, display at 118%) replaces Bricolage Grotesque; Source Serif 4 replaces Hanken Grotesk for reading text; IBM Plex Mono replaces JetBrains Mono. Reason: the width axis gives architectural lettering, and a serif reading face is clearly distinct from the headings.
- Form errors use a heavier border, an icon and an "Error:" prefix instead of a red color, so no hue is added to the owner palette.
- `muted` is a 62% mix (5.4:1 light, 7.1:1 dark); control borders use `muted` because the 16% `rule` mix is only about 1.4:1.
- Tailwind v4 `max-w-prose` is built in, so the measure token is named `--container-measure` (`max-w-measure`).

### Files
- Created: `src/lib/fonts.ts`, `src/lib/theme.ts`, `src/components/ui/{Section,Prose,Button,TextLink,Tag,SpecList,TextField}.tsx`, `src/components/{ProjectEntry,PagePlaceholder}.tsx`, `src/components/layout/{MainNav,ThemeToggle}.tsx`, `src/app/{skills,experience,design-system}/page.tsx`.
- Rewritten: `src/styles/globals.css`, `src/lib/utils.ts`, `src/data/{profile,navigation,projects}.ts`, `src/components/ui/{Container,PageHeader}.tsx`, `src/components/layout/{Header,Footer}.tsx`, `src/app/{layout,page,not-found}.tsx`, `src/app/{about,projects,resume,contact}/page.tsx` (now placeholders), `DESIGN_SYSTEM.md`.
- Deleted: the Phase 0 placeholder code (`ProjectCard`, `ButtonLink`, `Hero`, `FeaturedProjects`, `projects/[slug]`).

### Tested
- `npm run lint`: passed.
- `npm run build`: passed (Next.js 16.4.6, TypeScript, 11 static pages).
- `next start`: `/`, `/about`, `/projects`, `/skills`, `/experience`, `/resume`, `/contact` return 200; `/design-system` and unknown paths return 404 in production.
- Served HTML: theme script is in `<head>`; skip link, labelled navs, `aria-current` on the active page, form `aria-invalid` and `aria-describedby`, error text and external-link markup are present.
- Compiled CSS: Archivo width axis (62 to 125%), `font-wide`, `py-section`, `max-w-page`, `max-w-measure` and the type tokens are generated.
- Dev server: `/design-system` renders with no compile errors or warnings in the log.
- WCAG contrast measured with a script for every text and accent pair (results in `DESIGN_SYSTEM.md`).

### Not tested
- **No visual check.** No browser tool was available. Layout, spacing, the look of the expanded Archivo lettering, hover and focus states, the mobile menu, the theme toggle and the no-flash behavior have not been seen in a browser. Hydration warnings, if any, would only show in a browser console.

### Errors and solutions
| Problem | Solution |
|---|---|
| `tsc` reported errors from `.next/types` pointing at the deleted `projects/[slug]` route | Stale generated types; deleted `.next` and rebuilt |
| Phase 0 `Footer` build error (`new Date()` during prerender) | Footer rewritten without a date |

### Remains
Browser review of Phase 1 plus the `web-design-guidelines` audit; owner confirmation of fonts, direction, draft statement and project summaries; then Phase 2 (Home).

## Phase 2: Home page

**Skills used:** `frontend-design` (invoked at the start; plan reviewed against the brief before building), `web-design-guidelines` (invoked; fetched the current guidelines and audited the home page and shell; fixes applied below). `vercel-react-best-practices` was loaded in Phase 1 and its rules were applied here (server components, one client component for nav, CSS-only motion instead of a JS animation library, direct icon imports) but was not re-invoked this phase.

### Design decisions
- The brief fixed several treatments that the design skill discourages (uppercase label and headline, project numbers, `→` on links). The brief wins: they are used exactly where it specifies them. Sentence-case elsewhere. The `→` is drawn as an icon (`ArrowRight`, `aria-hidden`) so screen readers do not read a glyph.
- Hero composition: full-width headline; below it the description and actions (5 columns) beside the technical visual (7 columns). The visual is the one memorable element.
- Hero visual contains only truthful content: the Secure AI Banking Gateway request path built from the owner's component list, an alpha-beta fragment captioned "illustrative", and education metadata. The request order (client, gateway with JWT, rate limiting and redaction, then model) is an inference from the feature list and needs owner confirmation.
- One page-load moment only: staggered `rise` reveal on the hero (CSS keyframes, transform and opacity only). Reduced motion removes the delay and shortens the animation.
- No fake content: the availability indicator, GitHub links and screenshots are data-driven and absent until the owner supplies them. Image placeholders say "Screenshot to be added".
- Navigation moved its desktop breakpoint from `md` to `lg` because seven links do not fit at tablet width.
- Added `font-semiwide` (width 106) for long uppercase headlines; `font-wide` (118) stays for shorter headings.

### Files
- Created: `src/data/{home,expertise}.ts`, `src/sections/{Hero,HeroVisual,EngineeringOverview,FeaturedProjects,Capabilities,ContactCta}.tsx`, `src/components/{ProjectFeature,ProjectFigure}.tsx`, `src/app/projects/[slug]/page.tsx`.
- Modified: `src/app/{page,layout,not-found}.tsx`, `src/data/{profile,navigation,projects}.ts`, `src/components/layout/{Header,MainNav}.tsx`, `src/components/ui/{Section,PageHeader}.tsx`, `src/styles/globals.css`, `src/lib/utils.ts`.

### Audit (`web-design-guidelines`) findings fixed
- Added `theme-color` meta for both themes (`viewport` export).
- Added `touch-action: manipulation` and a deliberate tap-highlight color.
- Added `min-w-0` on grid columns that hold the code block and images, to prevent horizontal overflow.
- The code block had `aria-label` without a role; it is now `role="region"`.
- Straight quotes in the call-to-action copy replaced with curly quotes.
- `text-balance` on page and project headings; tabular numerals on project numbers.
- Link labels set in Title Case for consistency with the brief's buttons.
- Noted, not changed: the guidelines prefer Title Case headings and second person; the brief's own headline is first person and section headings follow the design system's sentence case.

### Tested
- `npm run lint` and `npm run build` pass (18 static pages including six project routes).
- Production server: every internal link on the home page returns 200; one `h1`, labelled landmarks; no GitHub links rendered; both `theme-color` tags and the curly-quote copy present in the served HTML.
- Availability indicator verified by temporarily setting a value (markup rendered), then reverted to `null`.
- Compiled CSS contains `font-semiwide`, `bg-grid`, `reveal`, `rise` keyframes, `text-hero` and the reduced-motion delay reset.

### Not tested
- **No visual check.** No browser tool was available. Not seen: headline wrapping at 360px and tablet widths, the hero visual layout, spacing rhythm, the alternating project layouts, dark mode appearance, the reveal animation, hover and focus states, and the mobile menu with seven links.

### Errors and solutions
| Problem | Solution |
|---|---|
| `tsc` could not find `LayoutProps` and `PageProps` after clearing `.next` | These global types are generated by `next build`; rebuilt |
| PowerShell failed to parse a curly quote in an inline command | Matched with `’` instead |

### Remains
Browser review; owner inputs (availability status, GitHub URLs, screenshots, resume PDF, confirmation of categories, summaries and the diagram path). Then Phase 3 (projects and case studies).

## Phase 3: About page

Phase numbering note: the owner's brief names this phase 3, so About is Phase 3. Projects and case studies move to Phase 4, Skills and Experience to Phase 5, Resume and Contact to Phase 6, interactions to Phase 7 and testing and deployment to Phase 8 (see `TASKS.md`).

**Skills used:** `frontend-design` (invoked at the start; plan stated before building) and `web-design-guidelines` (invoked after the build; the rules fetched earlier in the session were applied, not re-fetched). `vercel-react-best-practices` was not re-invoked: the page is all server components with no new client code.

### Design decisions
- Stayed inside the existing design system; no new visual style. One new type token (`text-statement`) for the long uppercase headline, and a `statement` variant of `PageHeader` (mono label, uppercase `font-semiwide` headline).
- "Beyond Development" is a structured ruled list (`SpecList`), not a timeline. A timeline needs dates and none were supplied.
- Philosophy blocks are numbered 01 to 04 because the brief specifies them; titles are set in uppercase by CSS.
- Areas of interest use a ruled two-column list, not tags, since they are not technologies.
- Content lives in `src/data/about.ts`. The background wording is mine, written only from the brief (degree, university, "current academic journey", interest in AI engineering and full-stack development). It states no graduation date, year or employment.
- "400+ LeetCode problems solved" is included as the competitive programming detail because the owner stated it earlier. The six LeetCode badges are not shown because they were marked as needing verification.

### Files
- Created: `src/data/about.ts`, `src/sections/{AboutBackground,EngineeringPhilosophy,AreasOfInterest,BeyondDevelopment}.tsx`.
- Modified: `src/app/about/page.tsx` (replaced the placeholder), `src/components/ui/PageHeader.tsx` (`label`, `statement`), `src/components/ui/SpecList.tsx` (row keys), `src/styles/globals.css` (`--text-statement`).

### Errors and solutions
| Problem | Solution |
|---|---|
| Found before running: `SpecList` keyed rows by term, and two rows share the term "Leadership" (duplicate React keys) | Key is now `term-index` |
| Audit: the interests list left the right column without a closing line in its last row | Borders moved from the list to each row |

### Tested
- `npm run lint` and `npm run build` pass.
- Production server: `/about` returns 200; one `h1`; headings run h1, h2 and h3 in order; all expected content present (label, four philosophy titles, leadership rows, Second Place, 400+ LeetCode, call to action); active nav item has `aria-current`; every internal link returns 200.

### Not tested
- **No visual check.** Not seen in a browser: headline wrapping at 360px and tablet widths, the two-column background layout at `xl`, the 2x2 philosophy grid, dark mode, and spacing.

### Remains
Browser review; optional owner details (roles, dates, academic year); confirmation of the background wording. Then Phase 4 (projects and case studies).

## Phase 4: Projects page and case studies

**Skills used:** `frontend-design` and `vercel-react-best-practices` (both invoked at the start; the Suspense and data-structure guidance was applied), `web-design-guidelines` (invoked after the build; fresh guidelines fetched; findings fixed).

### Content approach (no fabrication)
The owner supplied, for each project: description, category and technical highlights. Nothing else. So:
- **Written from supplied facts:** the overview (the owner's description, one sentence), the problem statement and solution (restating the description and highlights), and the technical implementation blocks (each states the general role of a technology the owner listed, such as what LoRA or PCA does). Implementation is grouped by concern, not numbered, because the build order is unknown.
- **Placeholders (`todo(...)` in the data, rendered as a dashed "To be added" note):** why the problem mattered, what other approaches lacked, the owner's contribution, engineering challenges, verified results and learnings. GitHub links, live demos and screenshots show labeled placeholders too.
- **Architecture diagrams:** built per project from the technology list, only with layers the project has, tagged "Draft" until the owner confirms them against the repository. Request order and layer grouping are inferences.

### Design and structure decisions
- Filters are real links (`/projects?category=ai-ml`), so the URL reflects state, middle-click works and no client JavaScript is needed. `FilteredProjects` reads the search params inside a `Suspense` boundary; the fallback is the full unfiltered list, so the page is complete before the filter resolves. The page is a partial prerender.
- Filter assignments (inferred from the owner categories and stacks): AI / ML for the four AI projects; Full-Stack for Super Tic-Tac-Toe, Fake Job, Real Estate and Healthcare; Backend Systems for the banking gateway; Deep Learning for the banking gateway (LoRA fine-tuning) and Fake Job (Keras). Research has no projects and shows an empty state.
- Project data is one typed file per project in `src/data/projects/` with a shared `Project` type, `Todo` placeholder type and `isTodo` guard. Order in `index.ts` drives the listing and Previous / Next (wrapping at the ends).
- Listing layout (`ProjectShowcase`): image and text alternate sides; the text column holds overview, a spec table (problem, contribution, implementation highlights, stack) and links. The home page keeps the lighter `ProjectFeature`.
- Case study (`/projects/[slug]`) follows the brief's A to I structure, one section component each under `src/sections/case-study/`.
- The Smart Healthcare project is titled "Smart Healthcare Management System" as in the brief.

### Files
- Created: `src/data/projects/{types,filters,index}.ts` and one file per project (six), `src/components/{ArchitectureDiagram,ProjectFilters,ProjectShowcase}.tsx`, `src/components/ui/PlaceholderNote.tsx`, `src/sections/{ProjectsBrowser,FilteredProjects}.tsx`, `src/sections/case-study/{CaseStudyIntro,CaseStudyProblem,CaseStudySolution,CaseStudyArchitecture,CaseStudyImplementation,CaseStudyChallenges,CaseStudyResults,CaseStudyGallery,CaseStudyNav}.tsx`.
- Modified: `src/app/projects/page.tsx`, `src/app/projects/[slug]/page.tsx` (replaced the stand-in), `src/components/{ProjectFigure,ProjectFeature}.tsx`.
- Deleted: `src/data/projects.ts` (replaced by the folder).

### Audit findings fixed
- The "All work" label is now Title Case, and `ProjectFigure` takes a `sizes` prop so real images in the gallery and main image do not over-fetch.
- Noted, not changed: duplicate element ids can exist transiently (and without JavaScript) because the Suspense fallback and the streamed list are both in the HTML; "My contribution" uses first person per the brief; headings stay sentence case.

### Tested
- Lint, type-check and `npm run build` pass (partial prerender for `/projects`).
- Production server: filter counts match the data (All 6, AI / ML 4, Full-Stack 4, Backend 1, Deep Learning 2, Research 0 with the empty state); an unknown category falls back to All.
- All six case studies return 200 with one `h1`, the seven `h2` sections, placeholders and the architecture diagram; Previous and Next resolve (the first project's Previous is the last project).
- Every internal link on `/projects` and on a case-study page returns 200.

### Not tested
- **No visual check** (no browser tool). Not seen: alternating-layout spacing, long category tags at narrow widths, the architecture diagram on mobile, dark mode, filter hover and focus states.

### Errors and solutions
| Problem | Solution |
|---|---|
| A bash heredoc batch failed to parse, so the nine case-study section files were not created (same failure as in Phase 0); `tsc` reported the missing modules | Recreated each file with the file tool |
| Unknown project slug returned 200 on the first request | Next.js 16 with Cache Components does not support `dynamicParams`; the documented approach is `notFound()`, which is in place. The first hit streams 200 with the not-found page and `noindex`; later hits return 404. Recorded as a known limitation |
| Node and bash resolved `/tmp` to different folders when updating TASKS.md | Used a temporary file inside the project and deleted it |
| Another shell command failed to parse because of quoting in `sed` | Wrote the text with the file tool and appended it with `cat` |

### Remains
Browser review; owner content for the placeholders (see `TASKS.md`); confirmation of the diagrams and filter assignments. Then Phase 5 (Skills and Experience).

## Phase 5: Skills & Expertise and Experience & Leadership pages

**Skills used:** `frontend-design` (invoked at the start; the plan was stated and checked against the brief before building) and `web-design-guidelines` (invoked after the build; fresh guidelines fetched). `vercel-react-best-practices` was not re-invoked: both pages are server components with no client code.

### Content decisions (no invention)
- **Skills:** Lists are exactly the owner's five domains. **PyTorch is excluded** ("if applicable" and unconfirmed). Short domain descriptions are generic definitions, not claims about the owner.
- **Evidence instead of percentages:** `src/lib/skill-evidence.ts` matches each skill (and listed aliases, such as StandardScaler, PCA and KMeans for Scikit-learn, or HTML for HTML5) against every project's stack and highlights. A matching skill gets an accent label with screen-reader text, and the domain lists the projects it appears in. Skills with no matching project are shown as plain labels, without a negative claim. A legend on the page explains the markers.
- **Experience:** No technical experience was supplied, so that section shows a labeled placeholder and points to the project case studies. PROCOM’26 uses the owner's description (F1-themed ML competition, 35 teams) and four responsibility areas from the brief; the vague fifth item ("Competition-related responsibilities") was left out. The Robotics and Automation Society role is "AI Division Leadership" (the About page was updated to match). Dates, specific responsibilities and contributions are placeholders.
- **Chronology:** The brief asked for a chronological timeline, but no dates were supplied, so entries cannot be ordered. The layout (date column plus details) is ready; entries show "Dates to be added" until real dates exist.
- **Achievements:** Shown as stated. The LeetCode figures are flagged in the data file for verification.

### Design decisions
- Same design system. `Section` gained an optional `number` marker (used for the five numbered domains because the brief numbers them) and its title column is now a wrapper div, so the sticky behavior covers the number and the heading.
- Domain titles use uppercase CSS per the brief. Accent labels are paired with legend text and screen-reader text, so color is never the only signal.
- `Tag` now sets `translate="no"` (audit finding) so browser translation does not alter technology names.

### Files
- Created: `src/data/{skills,experience}.ts`, `src/lib/skill-evidence.ts`, `src/components/ExperienceEntry.tsx`, `src/sections/{SkillDomains,ExperienceSections}.tsx`.
- Modified: `src/app/skills/page.tsx`, `src/app/experience/page.tsx` (replaced the placeholders), `src/components/ui/{Section,Tag}.tsx`, `src/data/about.ts` (role wording).

### Tested
- Lint, type-check and `npm run build` pass.
- Production server: `/skills` and `/experience` return 200; one `h1` each with ordered headings; five domain sections plus the call to action; no PyTorch; the 20 accent-marked skills match an independent calculation from the project stacks; project links resolve.
- `/experience` shows the PROCOM’26 description (35 teams), the Society role, all three achievements and the labeled placeholders.

### Not tested
- **No visual check** (no browser tool). Not seen: label wrapping in the domain lists at narrow widths, the sticky title column with the number, the timeline's date column on tablet, dark mode.

### Errors and solutions
None this phase. My first attempt to extract accent skill names from the HTML used a regex that did not match the markup; I replaced it with a looser pattern and compared the result against a separate calculation.

### Remains
Browser review; owner content (experience, dates, responsibilities); PyTorch decision; LeetCode verification. Then Phase 6 (Resume and Contact).
