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

## Phase 6: Resume and Contact pages

**Skills used:** `frontend-design` (invoked at the start) and `web-design-guidelines` (invoked after the build; fresh guidelines fetched; findings fixed). `vercel-react-best-practices` was not re-invoked.

### New owner information and how it was used
The owner attached their resume and gave their email, GitHub and LinkedIn URLs. The resume is now the source of truth for experience, dates and figures.
- Applied: contact details (`data/profile.ts`), three technical-experience entries with dates and figures exactly as written, leadership details and the 150% and 50+ participants figures (`data/experience.ts`), PyTorch in the skills list, and a new `data/resume.ts` that mirrors the PDF's summary, education, skills and projects.
- **Not applied, flagged instead:** conflicts between earlier briefs and the resume (Fake Job stack: Keras and Docker vs Scikit-Learn; Robotics Society role wording; Hospital Management vs Smart Healthcare naming; Redis not in the resume), plus resume content that the site does not use yet (two extra projects, case-study figures, final-year status). Nothing existing was silently overwritten.
- **Privacy:** the phone number appears only inside the PDF the owner supplied; no page shows it.
- The PDF was located on disk by its exact name, its extracted text was compared with the attachment (same content), and the identical file was copied to `public/resume/resume.pdf`.

### Contact form design
- `lib/contact.ts` (self-contained): validation (every message states the fix), configuration check, and `sendContactEmail`, which calls Resend's REST API (no SDK, no new dependency) and returns "sent" only on a 2xx response; otherwise "unavailable" or "failed". Subject and sender lines have line breaks stripped. Secrets come from `RESEND_API_KEY` and `CONTACT_TO_EMAIL`; nothing is logged beyond the provider status code. `RESEND_API_URL` exists only so tests can use a local mock.
- `app/contact/actions.ts`: server action; trims input, honeypot check, validation, then send. Returns the state the form renders.
- `ContactForm` (client): `useActionState`, inline errors with focus on the first invalid field, pending label "Sending…", polite live region, `<noscript>` notice, honeypot marked `inert`. Success shows only after the server confirmed delivery.
- `ContactFormSection` reads the configuration at request time (`connection()` inside `Suspense`), so setting the environment variables takes effect without a rebuild. While unconfigured the fieldset is disabled and the page says so and shows the email address. The Suspense fallback is the disabled form.
- Found while testing: the server-rendered HTML does not contain field errors or results (React applies the action state on the client), so without JavaScript a submit shows no visible result. Mitigation: the `<noscript>` notice.

### Resume page design
Same design system. Sections reuse the Experience page's components and data (`TechnicalExperience`, `LeadershipActivities`, `Achievements`) so the two pages cannot drift apart. The resume's projects, skills and education render from `data/resume.ts`. The Download Resume button uses a plain anchor with the `download` attribute (`ButtonLink` now uses an anchor when `download` is set). The preview is an `<object>` PDF inside a paper-style frame, with a download fallback inside it; if the file is missing the page shows a labeled placeholder and hides the button.

### Other changes
`SpecList` aligns each term and detail on the first text baseline (a visual-review finding: terms sat above 44px-tall links). `ExperienceEntry` supports a location line and optional responsibilities. `.env.example` added and allowed in `.gitignore`.

### Files
- Created: `src/lib/contact.ts`, `src/app/contact/actions.ts`, `src/components/ContactForm.tsx`, `src/sections/{ContactFormSection,ResumeSections}.tsx`, `src/data/resume.ts`, `public/resume/resume.pdf`, `.env.example`.
- Modified: `src/app/{contact,resume}/page.tsx`, `src/data/{profile,experience,skills}.ts`, `src/components/{ExperienceEntry}.tsx`, `src/components/layout/Footer.tsx`, `src/components/ui/{Button,SpecList}.tsx`, `.gitignore`, `README.md`.

### Tested
- `npm run lint`, `tsc` and `npm run build` pass.
- Unit test of the contact logic outside the project (validation limits and messages, configuration check, no network call when unconfigured, success only on 2xx, failure on 500 and on a network error, header-injection stripping): all assertions passed.
- End-to-end in headless Chrome against a local mock mail server: empty submit shows four inline errors and focuses the name field; a provider 500 shows an honest failure and keeps the entered values; a provider 200 shows "Message sent" and the mock received the correct recipient, reply-to, subject and body. Unconfigured: the fieldset is disabled and the notice with the email address shows. No console errors in any case.
- `/resume/resume.pdf` returns 200 as `application/pdf` (167,966 bytes, identical to the source file).
- Screenshots of all eight pages in light, dark and 390px mobile: no horizontal overflow, no console errors. Viewed in detail: home (desktop and mobile), contact (default, errors), resume (desktop) and the Secure AI Banking Gateway case study (desktop). The rest were captured but not each inspected.

### Not tested
- A real send through Resend (no key configured), a real mobile device, the PDF preview in a normal browser (headless Chrome shows a black frame), JavaScript-disabled behavior beyond the notice, keyboard and screen-reader use of the form.

### Errors and solutions
| Problem | Solution |
|---|---|
| Unit test could not import an absolute Windows path | Used a `file://` URL |
| First form-post test returned nothing | Shell extraction left hidden-field values HTML-encoded; reran with a Node script that decodes them |
| That test showed field errors are missing from the server-rendered HTML | Expected with `useActionState` on the client; confirmed the client path in a real browser and added the `<noscript>` notice |
| Visual review: contact terms sat above 44px link text | `SpecList` rows now align on the first baseline |

### Remains
Configure the mail provider and send a real test message; owner decisions on the flagged conflicts; decide whether to bring more resume content into the site; browser-check the PDF preview. Then Phase 7 (interactions and responsiveness).

## Phase 7: Responsive and interaction pass

**Skills used:** the `frontend-design` system from earlier phases (no new visual style was introduced) and `web-design-guidelines` (invoked after the changes; fresh guidelines fetched). `vercel-react-best-practices` was not re-invoked.

### Method
Everything was measured in headless Chrome driven over the DevTools protocol (no dependencies installed). One audit script loaded 11 routes at 1440, 768 and 390px and flagged horizontal overflow, elements past the viewport edge, clipped text, text under 12.5px, tap targets under 40px and heading counts. An interaction script then drove the real pages with mouse and keyboard events and asserted behavior. Findings were fixed, then both scripts were run again on the final build. The scripts live in the session scratchpad.

### Bugs found and fixed
| Found | Fix |
|---|---|
| Case-study titles (for example "Next Best Offer Recommendation System") overflowed their 7-column slot at 1440px and ran into the neighboring column | Titles use `text-statement` with `font-semiwide` and break long words if needed |
| Uppercase section titles (for example "Databases & Infrastructure") overflowed the narrow title column at 1440px | Uppercase titles are one step smaller, titles may hyphenate, the title column is 4 of 12 columns at `lg` and 3 from `xl` |
| Previous / Next project titles clipped at 768px (three narrow columns) | The three-column block starts at `lg`; below that the links stack |
| `SpecList` labels such as "Implementation" were wider than the 6.5rem column at 390px | Label column is 7.25rem |
| Wordmark (23px tall) and the home "All Projects" link were undersized tap targets | Both have a 44px minimum height; the footer links also have a 44px minimum width |
| Reduced-motion test passed a wrong assertion: the scroll reveal ignored `animation-duration`, so with reduced motion below-fold sections stayed invisible until scrolled | `.scroll-reveal` is `animation: none` under reduced motion; the test now asserts the animation name and opacity |
| Tall sections stayed faded while read, because the reveal ran over 30% of the section height | The reveal runs over a fixed 15rem scroll distance |
| Escape from inside the mobile menu left focus on a hidden link | Focus returns to the menu button |
| Audit finding: the mobile menu sheet allowed scroll chaining | `overscroll-behavior: contain` |

### Motion
Added `app/template.tsx` (a short fade on every route change) and the `scroll-reveal` utility (CSS scroll-driven animation, `animation-timeline: view()`, wrapped in `@supports`, transform and opacity only) on `Section`, the project layouts and the closing call to action. The hero keeps its one staggered load reveal. Reduced motion disables the reveal and shortens everything else.

### Tested (final build)
- Responsive audit: all 11 routes at 1440, 768 and 390px, clean (the by-design 1px skip link and a code block scrolling inside its own container are not issues).
- Interaction suite, 62 of 62 checks: theme (6 checks plus system preference), navigation at three widths, mobile menu at 390 and 768 (open, Escape, focus return, link navigation, current page), five filters plus the empty state and reset, project navigation including wrap-around, eight hover states, keyboard (skip link, tab order and focus rings on the home page, mobile menu by keyboard, sticky header not covering focus), animations (page fade, scroll reveal, hidden below the fold and visible after scrolling, reduced motion), sticky header. Zero console errors.
- Form validation at 768 and 390px against a mock mail server: errors and focus, honest failure, success.
- Screenshots viewed: desktop hero with a focus ring, the open mobile menu, tablet home and skills pages.

### Not tested
Safari, Firefox, a real phone, screen readers, the PDF preview in a normal browser.

### Notes
- The first tablet screenshots looked blank below the fold. That was the scroll-reveal at scroll position 0, but it exposed the reduced-motion bug above. Layout screenshots now use reduced motion so full pages render.
- The project listing rows are not clickable surfaces (their links are); the `ProjectEntry` row hover is only in the design-system demo.

### Remains
Cross-browser and device checks, then Phase 8 (testing, optimization and deployment preparation).

## Home page visual polish (post Phase 7)

Skill used: frontend-design. Palette unchanged. Changed: `src/sections/Hero.tsx` (faded grid and accent wash behind the hero, label chip with a soft ping dot), `src/sections/HeroVisual.tsx` (window dots, syntax-colored code, blinking cursor, hard accent offset shadow), `src/sections/EngineeringOverview.tsx` (icon cells with hover fill), `src/components/ProjectFeature.tsx` (poster panel with outlined number when no screenshot; still labeled "Screenshot to be added"), `src/sections/ContactCta.tsx` (full accent band), `src/styles/globals.css` (utilities `bg-grid-fade`, `bg-accent-wash`, `text-outline`, `animate-blink`, `animate-ping-soft`). Verified: tsc and lint pass, dark theme screenshot at 1440px. Not verified: light theme, mobile, build. Note: the design system's earlier "no glow/gradient wash" rule was relaxed for these accent washes at the owner's request; DESIGN_SYSTEM.md not yet updated.

## Phase 4.1: Projects listing page redesign (Obsidian/Alabaster)

**Skills used:** `frontend-design` (design-plan review before building). `web-design-guidelines` not re-invoked this phase (see Remains).

### Context and decision
The owner asked for a Swiss-editorial/bento redesign of `/projects` (hero, sliding-glider filter + search + view-switcher control dock, featured flagship card, bento grid with bespoke SVG diagrams, index-ledger alternate view, slide-over case-study drawer), giving an exact palette, font set and card/glow styling. Investigating before writing any code found that the given palette and fonts (Space Grotesk / Plus Jakarta Sans / JetBrains Mono, the exact `#090D0C`/`#111716`/`#149E7E` etc. hex values) were not a new request at all — they are the `--ob-*` tokens and font set already live on the Home and About pages ("Inverted Obsidian / Architectural Alabaster"), which `DESIGN_SYSTEM.md` had never documented. This put the request in direct conflict with `CLAUDE.md`'s then-current "owner colors are fixed" rule and the drawing-sheet system's documented "avoided on purpose" list (all-caps eyebrows, rounded cards, glow, grid overlay), which still govern the rest of the site. Flagged this to the owner via `AskUserQuestion` before building anything; they chose to adopt Obsidian/Alabaster sitewide, apply it to Projects first, and treat the rest of the site as follow-up.

### Done
- Documented both design systems properly for the first time: `DESIGN_SYSTEM.md` gained an "Inverted Obsidian / Architectural Alabaster system" section (tokens, fonts, atmosphere, reusable components) and a "Projects (listing page) conventions" section; `CLAUDE.md`'s fixed-palette rule now explains the two systems and which pages use which.
- Built the Projects page entirely from existing `src/data/projects/*` content — no invented metrics, stacks, links or copy. All six projects, their real filter categories, and the `?category=` URL convention were kept.
- New: `src/sections/ProjectsHero.tsx`, `src/sections/ProjectsExplorer.tsx` (client; filter/search/view state, flagship/grid selection, dossier open/close with focus return), `src/sections/FilteredProjectsExplorer.tsx` (awaits `searchParams`, kept in its own async component behind `Suspense` — required by Next.js 16 Cache Components, same pattern the old `FilteredProjects` used), `src/components/ProjectsControlDock.tsx` (client; measures the active filter tab's offset to position a sliding accent pill), `src/components/ProjectFlagshipCard.tsx`, `src/components/ProjectBentoCard.tsx`, `src/components/ProjectLedgerRow.tsx`, `src/components/ProjectMiniDiagram.tsx` (bespoke per-project flow diagram built from real `architecture.layers`, used on cards, the flagship card and in the drawer), `src/components/ProjectActionLinks.tsx` (real GitHub/live link when the data has one, otherwise an honest disabled lock icon — all six projects show disabled today, since none have `repoUrl`/`liveUrl` yet), `src/components/ProjectDossier.tsx` (client; the slide-over drawer, sections mapped to real `CaseStudy` fields with "To be added" notes for anything still `todo(...)`), `src/lib/project-display.ts` (small pure helpers: primary domain label, core-domain list derived from real filter usage, flagship pick).
- Changed: `src/app/projects/page.tsx` (now composes the above instead of the old alternating-layout browser), `src/components/layout/Header.tsx` (the Obsidian glass header bar now also applies on `/projects`), `src/styles/globals.css` (added one keyframe/utility, `drawer-in`, for the drawer's slide-in).
- Removed from the import graph (confirmed via `grep` that nothing else referenced them): `src/sections/ProjectsBrowser.tsx`, `src/sections/FilteredProjects.tsx`, `src/components/ProjectFilters.tsx`, `src/components/ProjectShowcase.tsx`. **Not actually deleted from disk** — see Errors below.

### Tested
- `npm run lint` and `npx tsc --noEmit`: pass.
- `npm run build`: passes (Partial Prerendering on `/projects`, same as before).
- Headless-Chrome DevTools-protocol smoke test (no dependencies; script written to the session scratchpad, not the repo, per the project's established practice): confirmed category filter counts and exclusions (AI/ML shows 4 of 6, correctly excludes Full-Stack-only projects), search filtering by tech term (confirmed correct after fixing the test to set the input value through React's native-setter, not a plain `.value =`), bento/ledger view switch, dossier drawer opens with all five real sections, focus moves to the close button on open, Escape closes it, no console exceptions thrown. No horizontal overflow at 1440px or 390px in either theme (`scrollWidth - clientWidth === 0`). Screenshots reviewed in both themes and at both widths.

### Errors and solutions
| Problem | Solution |
|---|---|
| `lucide-react` in this project's version has no `Github` export (brand icons were dropped) | Used `Terminal`, matching the icon `ContactCta` already uses for GitHub |
| Build failed: "uncached or runtime data during prerendering" on `/projects` after making the page `async` to await `searchParams` directly | Reverted to the Suspense-boundary pattern (`FilteredProjectsExplorer` as a separate async component), matching how the old `FilteredProjects`/`ProjectsBrowser` split worked |
| `project.filters.includes(filter.id)` failed to type-check (`FilterId \| "all"` not assignable to `FilterId`) even after an `if (filter.id === "all") continue` guard | TypeScript doesn't narrow a property read inside a closure passed to `.filter()`; assigning the narrowed value to its own `const` first fixed it |
| First CDP test run showed the flagship card and `innerText` checks failing, and a "Stripe" search returning 6 of 6 instead of 1 | The first two were the test script comparing against mixed-case strings against `uppercase`-transformed `innerText` (not an app bug); the search result was a genuine test-harness gap — setting `input.value` directly doesn't fire React's `onChange` tracker, fixed by calling the native `HTMLInputElement` value setter before dispatching the `input` event |
| Hero's "Core domains" telemetry value truncated with an ellipsis at 1440px despite fitting on mobile | The value sits in a narrower column on desktop (half-width telemetry strip split three ways) than on the single-column mobile layout; removed `truncate` in favor of `text-balance` wrapping, and reduced the derived domain list from 3 to 2 entries |
| In the flagship card's architecture diagram, the connector arrow after the last item in a wrapped row pointed at nothing | Moved the arrow to precede each item (except the first) instead of following it, so a wrap starts the new row with "→ Label" instead of ending the old one with a dangling arrow |

### Remains
- **Permission denied:** deleting the four superseded files listed above was blocked by the session's destructive-action safeguard. They are confirmed dead code but still physically present; ask the owner directly before deleting.
- `web-design-guidelines` was not re-invoked specifically for this page this phase.
- The rest of the site (Skills, Experience, Resume, Contact, `/projects/[slug]` case studies, Footer) is still on the drawing-sheet system; migrating it is the owner-approved follow-up.
- Everything already open from Phase 4 (repo/live URLs, screenshots, the `todo(...)` case-study content, draft-diagram confirmation) is unchanged and now more visible via the dossier drawer's "To be added" notes.
- Not verified: Safari, Firefox, a physical phone, screen readers.

## Phase 4.2: Sitewide color-theme change (orange on near-black)

### Context and decision
The owner asked for color-theme recommendations, explicitly wanting something that reads as "senior-designed," not AI-generated. Presented four distinct, non-cliché directions (Cobalt Systems/blue, Amber Signal, Ink & Vellum, Violet Circuit), each with full token values and a rationale grounded in the owner's AI + full-stack identity. The owner picked Cobalt Systems and implementation began (base tokens, Obsidian tokens, several hardcoded glow colors). Partway through, the owner supplied a reference image — a "TG" brand mark in vivid orange on near-black/white — and asked to use that palette instead. Stopped the blue rollout and re-derived an orange-on-near-black palette from the reference (no pixel color-picker access to the image, so the exact hex is a close visual estimate, flagged in `TASKS.md` for owner confirmation).

### Done
- `src/styles/globals.css`: replaced both the drawing-sheet tokens (`--background`, `--foreground`, `--accent`, `--on-accent`, light and dark) and every `--ob-*` Obsidian token (including the About page's deeper-dark variant) with the new orange/near-black values, so both coexisting design systems now share one color identity.
- Found and fixed glow/shadow effects that were hardcoded as literal `rgba(20,158,126,...)` / `rgba(16,185,129,...)` (the old emerald) directly in Tailwind arbitrary-value class strings, rather than referencing the CSS variables — these would have silently stayed green otherwise. Fixed across `CornerBrackets.tsx`, `SystemBlueprint.tsx`, `Capabilities.tsx`, `ProjectFlagshipCard.tsx`, `AboutCtaBanner.tsx`, `ContactCta.tsx` (two spots), `EngineeringOverview.tsx`, `Hero.tsx`, `HeroPortrait.tsx`, `AboutHero.tsx`.
- Fixed non-token color literals: `src/app/opengraph-image.tsx` (the generated social-share image), `src/app/layout.tsx` (`<meta name="theme-color">` per color scheme), `src/app/design-system/page.tsx` (the dev-only token reference table).
- Updated stale "teal"/"emerald" wording describing the old palette: `PROJECT_CONTEXT.md`, `CLAUDE.md`, and code comments in `CtaGlow.tsx`, `ObsidianPage.tsx`, `CornerBrackets.tsx`, `HeroPortrait.tsx`.
- `DESIGN_SYSTEM.md`: updated both color tables (drawing-sheet and Obsidian/Alabaster) with the new hex values and recomputed WCAG contrast figures for every text/accent pair — all still pass AA (lowest is 4.9:1, light-mode accent-on-background).

### Tested
- `npm run lint`, `npx tsc --noEmit`, `npm run build`: all pass.
- `grep` swept the whole `src/` tree for every old hex/rgb literal (`#0A6B5E`, `#18A389`, `#0F8A6D`, `#0B6E57`, `#149E7E`, `#19B591`, `#10b981`, `#34d399`, `#F4F3EF`, `#0B0B0A`, and the matching `rgba(...)` triples) to confirm nothing was missed; final sweep returned no matches.
- Headless-Chrome screenshots (script in the session scratchpad, not the repo) of Home, About, Projects and Skills in dark mode and Skills/Contact in light mode: the new orange accent and near-black/warm-paper backgrounds render consistently across both design systems, no console errors, no horizontal overflow at 1440px.

### Remains
- Owner has not explicitly confirmed the sampled orange (`#F2600C` dark / `#C23D06` light) matches their reference image closely enough — I estimated it visually rather than color-picking the actual file.
- The rest of the open items from Phase 4 and 4.1 (owner content, repo/live URLs, rest-of-site Obsidian migration) are unchanged.

## Expertise page redesign (Obsidian/Alabaster), phase 1 of 2

**Skills used:** `frontend-design`. Rebuilt `/skills` on the Obsidian/Alabaster system: new `src/sections/SkillsHero.tsx` (eyebrow, two-line headline, telemetry computed from data: 5 domains, 47 technologies, 6 projects; legend), rewritten `src/sections/SkillDomains.tsx` (12-column sections, sticky left header from 960px with live technology count, bento card with watermark and corner brackets, emerald-bordered pills for skills named in a project stack via `projectsUsing`, "Applied in" project links), `src/app/skills/page.tsx` wrapped in `ObsidianPage`, Header glass bar on `/skills`. All five domains, all 47 skills and every applied-in link come from `src/data/skills.ts` and the project data; nothing added. The requested bottom floating navigation bar does not exist in the codebase, so nothing was pinned or padded for it. Verified: tsc, lint, build pass; headless Chrome at 1440 and 390px, light and dark, one h1, no overflow, no console errors.

## Expertise page, phase 2 of 2: stack matrix, inspector, project brief

New `src/sections/SkillsMatrix.tsx` (client): project filter bar (All technologies + the six projects), clicking a project there or in any "Applied in" row highlights its technologies across all five domains (scale 1.02, others dimmed to 0.28), with a live count, Clear filter and a link to the case study; clicking a technology opens a fixed bottom inspector (domain, linked projects that set the filter, Escape or × to close). `src/sections/SkillDomains.tsx` is now a server wrapper that maps each technology to projects with `projectsUsing` (stack and highlights only). New `src/components/ProjectBrief.tsx`: the "Start a conversation" banner opens a native `<dialog>` brief (scope radios from the first four domain titles, name, email, message) that posts to the existing `submitContact` action, so it shows "Brief sent" only when the mail provider accepted the message, and shows the unavailable/error states otherwise. `ContactCta` takes an optional `briefScopes` prop; only `/skills` uses it, other pages still link to `/contact`. The Copy button and toast already existed. `globals.css`: `inspector-in` animation. Decision: the brief asked for an "instant confirmation"; not done, because CLAUDE.md forbids success states the provider did not confirm. Real counts differ from the brief's example: Secure AI Banking Gateway matches 2 listed technologies (FastAPI, JWT), since its other stack items are not in the skills list. Verified: tsc, lint, build; headless Chrome interaction test (filter counts, dimming, applied-in filter, inspector open/filter/Escape, modal open, empty submit shows four inline errors and focuses the scope field, close, no overflow at 390px, no console errors). Not tested: a real successful send (avoided sending real mail).
