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
