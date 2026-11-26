# DESIGN_SYSTEM.md

Status: **two systems currently coexist on this site.** The original "engineering drawing sheet" system below (implemented in Phase 1) still runs the Skills, Experience, Resume and Contact pages, the `/projects/[slug]` case studies, and the Footer. A second system, "Inverted Obsidian / Architectural Alabaster" (documented in its own section below), was introduced later for the Home and About pages and has now been extended to the Projects listing page. The owner has chosen to roll Obsidian/Alabaster out sitewide; migrating the remaining pages is tracked in `TASKS.md` as follow-up work, not yet done. Until that migration is complete, treat the fixed palette in this file's Color section as governing the drawing-sheet pages only — Obsidian/Alabaster pages use the `--ob-*` tokens instead.

Tokens for both systems live in `src/styles/globals.css`; components in `src/components`. A live reference page for the drawing-sheet system is at `/design-system` (development only; it returns 404 in production builds).

The drawing-sheet system was last verified by lint, type-check, production build, served HTML and compiled CSS (see `DEVELOPMENT_LOG.md`); Phase 7 added a full browser-verified responsive and interaction pass. The Obsidian/Alabaster Projects page was verified the same way in the phase that added it (see `DEVELOPMENT_LOG.md`).

## Direction: the engineering drawing sheet (Skills, Experience, Resume, Contact, case studies)

Each page reads like a drawing sheet. A narrow left column holds the title, like an annotation. A wide right column holds the content. Sections are separated by full-width hairline rules. The one distinctive element is the **title block**: projects are presented as ruled specification rows (discipline, stack), not as cards.

Structure is information: rules separate sections, mono type marks technical data, and the accent marks the current page and interactive underlines. Numbered markers are not used, because the content is not a sequence.

Avoided on purpose: all-caps eyebrow labels, `→` appended to links, one-word headline accents, gradient washes, identical rounded cards, glow, glass, floating decoration.

## Color

Owner palette (fixed). Changed from the original teal to an orange-on-near-black identity at the owner's request, matching a reference brand mark they supplied:

| Token | Light | Dark |
|---|---|---|
| `background` | `#F7F5F2` | `#0A0A0A` |
| `foreground` | `#141414` | `#F5F5F3` |
| `accent` | `#C23D06` | `#F2600C` |
| `on-accent` (text on accent fills) | `#FFFFFF` | `#0A0A0A` |

Derived tokens are `color-mix` blends of foreground and background, so no new hue exists:

| Token | Mix | Use |
|---|---|---|
| `muted` | 62% foreground | secondary text, control borders |
| `rule` | 16% foreground | hairlines, tag borders (decorative) |
| `surface` | 4% foreground | hover fill |

Measured WCAG contrast:

| Pair | Light | Dark |
|---|---|---|
| foreground on background | 17.0:1 | 17.9:1 |
| accent on background | 4.9:1 | 6.1:1 |
| on-accent on accent | 5.3:1 | 6.1:1 |
| muted on background | 5.0:1 | 7.2:1 |

All pass AA for text. `rule` is about 1.4:1, so it is used only for decoration. Anything that must be perceivable as a control boundary uses `muted`.

Themes: `:root` is light. `data-theme="dark"` selects dark. When no `data-theme` is set, `prefers-color-scheme: dark` applies. An inline script in `<head>` (`src/lib/theme.ts`) sets `data-theme` before first paint from `localStorage["portfolio-theme"]`, falling back to the system preference. The toggle (`ThemeToggle`) holds no state. Tailwind's `dark:` variant is bound to `data-theme="dark"`.

## Typography

| Role | Face | Where |
|---|---|---|
| Display and interface | Archivo (variable, width axis) | headings use `font-wide` (width 118%); navigation and UI use normal width |
| Reading | Source Serif 4 | lead paragraphs, `Prose`, project summaries |
| Technical | IBM Plex Mono (400, 500) | tags, spec terms, role line, dates |

Fonts load through `next/font/google` in `src/lib/fonts.ts` (self-hosted at build, no layout shift).

Scale (tokens in `@theme`, used as `text-*`):

| Token | Size | Line height | Tracking |
|---|---|---|---|
| `display` | clamp 2.75 to 7.5rem | 0.95 | -0.035em |
| `h1` | clamp 2.25 to 5rem | 1 | -0.03em |
| `h2` | clamp 1.75 to 2.75rem | 1.08 | -0.02em |
| `h3` | clamp 1.25 to 1.625rem | 1.2 | -0.01em |
| `lead` | clamp 1.1875 to 1.5rem | 1.5 | |
| `body` | 1.0625rem | 1.65 | |
| `small` (interface default) | 0.9375rem | 1.5 | |
| `label` (mono) | 0.8125rem | 1.4 | |

Reading measure is capped at `max-w-measure` (42rem, about 65 characters).

## Spacing, grid and layout

- Base spacing is Tailwind's 4px scale. Two project tokens: `gutter` (`clamp(1.25rem, 0.5rem + 3.5vw, 3rem)`, used as `px-gutter`) and `section` (`clamp(4rem, 2.5rem + 6vw, 9rem)`, used as `py-section`).
- `Container`: centered, `max-w-page` (80rem) with `px-gutter`.
- 12-column grid from `lg` up. Section titles take columns 1 to 3, content takes 4 to 12. Page lead text starts at column 4. Single column below `lg`.
- Alignment: left-aligned throughout. Nothing is centered or justified.
- Radius: `rounded-control` (2px) for buttons, tags and fields. Nothing else is rounded.

## Breakpoints (mobile first)

`sm` 40rem, `md` 48rem (desktop navigation appears), `lg` 64rem (12-column layouts, sticky section titles), `xl` 80rem.

## Components

| Component | File | Notes |
|---|---|---|
| `Container` | `ui/Container.tsx` | page width and gutters |
| `Section` | `ui/Section.tsx` | ruled section, annotation-style title column; `id` required |
| `PageHeader` | `ui/PageHeader.tsx` | `h1` in display lettering plus optional serif lead |
| `Prose` | `ui/Prose.tsx` | serif reading text with paragraph rhythm |
| `Button`, `ButtonLink` | `ui/Button.tsx` | `primary` (accent fill) and `secondary` (foreground outline); both invert to foreground on hover; 44px minimum height; `ButtonLink` picks `next/link` or `<a>` from the href |
| `TextLink` | `ui/TextLink.tsx` | accent underline; `http(s)` links open in a new tab with an arrow icon and screen-reader text |
| `Tag`, `TagList` | `ui/Tag.tsx` | mono label; `accent` tone for disciplines |
| `SpecList` | `ui/SpecList.tsx` | title-block rows: mono term, plain detail |
| `ProjectEntry` | `ProjectEntry.tsx` | project index row; whole row is the link; accent underline on hover and focus |
| `TextField`, `TextAreaField` | `ui/TextField.tsx` | label, optional hint, error; wired with `aria-describedby` and `aria-invalid` |
| `Header`, `MainNav` | `layout/` | sticky, opaque; desktop links with `aria-current` underline; mobile disclosure menu (Escape and link click close it) |
| `ThemeToggle` | `layout/ThemeToggle.tsx` | sun and moon icons swapped by CSS |
| `Footer` | `layout/Footer.tsx` | identity, education, site links, profile links when supplied |

Form error pattern: heavier foreground border, an alert icon and an "Error:" prefix. Error state never relies on color, and no extra hue is added to the palette.

## Motion

Phase 1 uses only short color transitions (150ms) on hover and focus. `prefers-reduced-motion` shortens all transitions and animations. Orchestrated motion (one page-load moment on the home page) is planned for Phase 2 and Phase 6 with `motion`.

## Accessibility baseline

Visible 2px accent focus ring on all focusable elements, skip link to `#main`, landmarks (`header`, `nav` with labels, `main`, `footer`), `aria-current` on the active page, 44px touch targets on controls, external links announced, hidden mobile menu removed from the accessibility tree when closed.

## Imagery

Real screenshots and diagrams only. A project without a screenshot gets a typographic or diagram presentation, not a stock or AI image.

## Inverted Obsidian / Architectural Alabaster system (Home, About, Projects)

This is the second, newer design system referenced in the Status note above. It was built for the Home page, extended to About, and has now been extended to the Projects listing page. It uses its own fonts and components (not `font-wide`/serif), documented here because earlier phases never wrote it down. Its color tokens are a separate set from the drawing-sheet `background`/`foreground`/`accent` above, but both sets were brought to the same orange-on-near-black identity in the color-theme change described below, so the two systems now read as one palette even though their type and layout conventions still differ.

**Color.** Tokens are `--ob-*` custom properties in `src/styles/globals.css`, switched by the same `data-theme` mechanism as the rest of the site (`:root` is light "Architectural Alabaster", `:root[data-theme="dark"]` is dark "Inverted Obsidian"). Changed from the original emerald to orange at the owner's request, matching a reference brand mark they supplied:

| Token | Light (Alabaster) | Dark (Obsidian) | Use |
|---|---|---|---|
| `--ob-bg` | `#f7f5f2` | `#0a0a0a` | page background |
| `--ob-surface` | `#ffffff` | `#161616` | cards, inputs |
| `--ob-surface-2` | `#efebe5` | `#1e1e1e` | nested surfaces (diagram chips, selected rows) |
| `--ob-text` | `#141414` | `#f5f5f3` | primary text |
| `--ob-muted` | `#6b6864` | `#9a9a98` | secondary text |
| `--ob-meta` | `#87837d` | `#6e6e6c` | tertiary/meta text (indexes, timestamps) |
| `--ob-accent` / `--ob-accent-hover` | `#c23d06` / `#9a3105` | `#f2600c` / `#ff7a33` | the one accent; same role as the drawing-sheet `accent` |
| `--ob-on-accent` | `#ffffff` | `#07120f` | text on accent fills |
| `--ob-line` / `--ob-line-hover` | `rgba(11,20,18,.09)` / `rgba(15,138,109,.45)` | `rgba(255,255,255,.08)` / `rgba(20,158,126,.45)` | borders |
| `--ob-card-shadow` | soft drop shadow | `none` (dark surfaces don't need one) | card elevation |
| `--ob-glass` | translucent `--ob-bg` | translucent `--ob-bg` | the sticky header / control-dock backdrop-blur fill |

Access colors with Tailwind v4's arbitrary-property syntax, matching existing usage: `bg-(--ob-bg)`, `text-(color:--ob-text)`, `border-(color:--ob-line)`.

**Type.** Three faces, loaded in `src/lib/fonts.ts` and already attached to `<html>` in `app/layout.tsx`: Space Grotesk 700 (`--font-space-grotesk`, uppercase display headlines), Plus Jakarta Sans (`--font-jakarta`, body and interface text, the page's base font), JetBrains Mono (`--font-jetbrains`, eyebrows, indexes, tags, stats — the mono face for this system, distinct from the drawing-sheet's IBM Plex Mono). Apply with `font-(family-name:--font-jakarta)` etc.

**Atmosphere, in every Obsidian/Alabaster page shell.** `ObsidianPage` (`src/components/ObsidianPage.tsx`) wraps a page's sections and provides: the fixed full-viewport film-grain overlay (`noise-overlay` utility: SVG `feTurbulence`, 0.045 opacity in dark, 0.032 with `mix-blend-mode: multiply` in light), a 48px architectural grid (`obsidian-grid` utility), and a pointer-following accent glow (`CtaGlow`, reads `--mx`/`--my` set by a `pointermove` listener; a no-op for touch and reduced motion). The Home page replicates this shell inline instead of using the wrapper (pre-dates the component); About and Projects use `<ObsidianPage>` directly. The sticky `Header` switches to this system's glass bar (`bg-(--ob-glass)`, `backdrop-blur`) on `/`, `/about` and `/projects`.

**Reusable components:** `CornerBrackets` (L-brackets that light up on card hover; `accent` variant for most cards, `reticle` variant for About's hairline style), `TelemetryBars` (decorative bar-chart glyph for a card corner), `SystemBlueprint` (the interactive tilting architecture panel used in the About hero). `reveal` / `revealDelay()` (from `lib/utils.ts`) still provide the one staggered page-load moment, same as the drawing-sheet system; `page-in` still provides the route-change fade; `scroll-reveal` is not generally used here (About's `EditorialSection` uses it on its content column).

**Known gap:** the rest of the site (Skills, Experience, Resume, Contact, the `/projects/[slug]` case studies, and the Footer) has not been migrated to this system yet. See `TASKS.md`.

## Projects (listing page) conventions

Built on the Obsidian/Alabaster system above, in `src/app/projects/page.tsx`, `src/sections/ProjectsHero.tsx`, `src/sections/ProjectsExplorer.tsx` and `src/components/Project*`. All content (titles, summaries, stacks, architecture layers, repo/live URLs) comes from the existing `src/data/projects/*` files — nothing was invented for the redesign, and the six real projects, their real filter categories (`src/data/projects/filters.ts`) and the existing `?category=` URL convention were kept as-is.

- **Hero** (`ProjectsHero`): eyebrow row (label + live page index, computed from `src/data/navigation.ts` so it can't drift) above a two-line uppercase Space Grotesk headline, then a telemetry strip (systems shipped, core domains — derived from which filter categories actually have projects, not hardcoded — and an "Architecture: Production-ready" descriptor) beside the page's descriptive paragraph.
- **Control dock** (`ProjectsControlDock`, client): category filter tabs with a sliding accent "glider" positioned by measuring the active button's offset, a live tech/title search input, and a bento-grid/index-ledger view switcher. Sticky under the header.
- **Flagship card** (`ProjectFlagshipCard`): shown only on the unfiltered, unsearched "All Projects" view, for the first project flagged `featured` in data order. Real stats only (architecture layer count, stack size, disciplines) — no invented metrics.
- **Bento cards** (`ProjectBentoCard`) and **ledger rows** (`ProjectLedgerRow`): the same filtered/searched project list in two views. Cards use `ProjectMiniDiagram` — a compact flow strip built from the project's own `caseStudy.architecture.layers`, not a generic icon or stock image — as the card's visual header.
- **GitHub/live links** (`ProjectActionLinks`): a real link only when `repoUrl`/`liveUrl` is set in the data; otherwise a disabled, labeled lock icon. None of the six projects have these URLs yet, so every card currently shows the disabled state — this is intentional honesty, not a bug.
- **Dossier drawer** (`ProjectDossier`, client): a slide-over opened by any card's "Inspect system architecture" action. Sections map directly to real `CaseStudy` fields: 01 Problem statement & context, 02 System architecture & data flow (full layer/node breakdown plus the mini diagram), 03 Key engineering decisions & trade-offs (`implementation` blocks, plus `challenges` when supplied), 04 Measured impact & benchmarks (`results`), then the complete stack. Any field still a `todo(...)` placeholder renders as an honest "To be added" note, never invented copy. Escape, a backdrop click or the close button all close it; focus moves to the close button on open and back to the trigger on close; a link at the bottom goes to the full `/projects/[slug]` case study (still on the old drawing-sheet system).
- Verified with `npm run lint`, `npx tsc --noEmit`, `npm run build`, and a headless-Chrome DevTools-protocol smoke test (category filtering, search, view switching, drawer open/close/focus, no console errors, no horizontal overflow at 1440/390px, light and dark).

## Home page conventions (Phase 2)

> Superseded by the Obsidian/Alabaster system above — the Home page no longer uses the conventions below. Left here as a historical record until Home is formally re-documented.

- Where the brief specifies capitals (wordmark, hero label, hero headline, "Engineering capabilities", the call to action), the text is written in sentence case in the data and set with CSS `uppercase`. Everything else stays sentence case.
- Hero headline uses `text-hero` with `font-semiwide` (width 106) and `text-balance`. Call-to-action headline uses `text-h1` with `font-semiwide`.
- Navigation moves to its desktop layout at `lg` (seven links need the room); below that it is the disclosure menu.
- Utilities added to `globals.css`: `bg-grid` (faint 40px architectural grid, 7% foreground), `reveal` (the one page-load rise, delay from `--reveal-delay` via `revealDelay()` in `lib/utils.ts`), `font-semiwide`.
- New components: `ProjectFeature` (editorial layout, alternates sides), `ProjectFigure` (screenshot, or a labeled "Screenshot to be added" placeholder), and sections `Hero`, `HeroVisual`, `EngineeringOverview`, `FeaturedProjects`, `Capabilities`, `ContactCta`.
- Availability indicator: a small square marker plus text, shown only when `profile.availability` is set.
- `Section` accepts `uppercase` for titles the brief sets in capitals.

## About page conventions (Phase 3)

> Superseded by the Obsidian/Alabaster system above — the About page no longer uses the conventions below. Left here as a historical record until About is formally re-documented.

- `PageHeader` has a `statement` variant: mono label above, uppercase `font-semiwide` headline at `text-statement` (clamp 1.75 to 3.75rem, line height 1.06), full width, serif lead below. Use it for pages whose brief gives a long uppercase headline.
- Numbered principle blocks: a two-column ordered list, each item with a top rule, an accent display number (tabular), an uppercase `h3` and serif body text.
- Interest lists: ruled rows in two columns, `font-wide` at `text-h3`, no tags (tags are for technologies and disciplines).
- Facts and affiliations use `SpecList`. Row keys include the index, so terms may repeat.

## Project and case-study conventions (Phase 4)

> The Projects **listing** page (`/projects`) was rebuilt on the Obsidian/Alabaster system — see "Projects (listing page) conventions" above. The conventions below now describe only the `/projects/[slug]` **case-study** pages, which still use the drawing-sheet system; `ProjectFilters` and `ProjectShowcase` described here were removed when the listing page was rebuilt.

- **Filters** (`ProjectFilters`): rectangular links with a mono count; the active filter is a solid foreground fill and carries `aria-current="true"`. State lives in the URL.
- **Listing** (`ProjectShowcase`): alternating 7/5 column layout, `h2` project titles, and a `SpecList` for problem, contribution, implementation and stack. Never a card grid.
- **Placeholders** (`PlaceholderNote`): dashed muted border, a "To be added" tag and a sentence saying what to add. Used for any content the owner has not supplied; never styled to look like real content.
- **Image frames** (`ProjectFigure`): real image when `src` is set, otherwise a labeled grid-paper placeholder reading "Screenshot to be added". Takes a `sizes` hint.
- **Architecture diagram** (`ArchitectureDiagram`): ordered layers on the grid background, each with a mono label and bordered node boxes, joined by down arrows. Real markup, so text stays readable. A "Draft" tag shows until `status` is `"confirmed"`.
- **Case-study sections**: each uses `Section` (annotation title column). Implementation rows are a two-column ruled list (concern on the left, role and technologies on the right).
- **Navigation**: three-column Previous / Back / Next block with the project title in display type.

## Skills and experience conventions (Phase 5)

- **Skill labels** are `Tag` components in a wrapping list. Accent tone means a project on the site names the technology; neutral means no listed project. Each accent label has screen-reader text, and the page explains the markers in a legend. Never use percentages, bars or ratings.
- **Domain sections**: numbered `Section` (mono number above an uppercase title), then a muted one-line description, the label list, and an "Applied in" row of project links.
- **Timeline entry** (`ExperienceEntry`): an 11rem mono date column beside the details (organization in display type, position in accent, summary, responsibilities, technologies, contributions). A missing period is a "Dates to be added" tag, never an invented date.
- **Achievements** use `SpecList`: the context is the mono term and the achievement is set in display type.
- `Section` accepts `number`; use it only where the brief numbers sections.
- `Tag` sets `translate="no"`, so use it for technology and product names, not for sentences.

## Resume and contact conventions (Phase 6)

- **Contact form**: fields are `TextField` and `TextAreaField` in a disabled-while-pending `fieldset`. A legend states that all fields are required. Errors are inline and use the existing pattern (heavier border, icon, "Error:" prefix); a polite live region below the button carries form-level messages. Success replaces the form with an accent-bordered "Message sent" panel and appears only after the server confirms delivery.
- **Unavailable state**: when mail is not configured the fieldset is disabled and a message with the email address shows. Never style an unavailable or failed state as success.
- **Contact details** use `SpecList` with real links (`translate="no"` on identifiers).
- **Closing statement**: a full-width `font-semiwide` uppercase `h2` at `text-h1`.
- **Resume sections** reuse `Section`, `SpecList`, `TagList`, `ExperienceEntry` and the date-column list pattern (11rem mono period and location column beside the details).
- **PDF preview**: a paper-style frame (grid background, bordered page at 17:22) holding the real PDF in an `<object>`, with a download link as fallback content and a labeled placeholder when the file is missing. Download actions use a plain anchor with the `download` attribute; never replace the PDF with an image.
- `SpecList` rows align term and detail on the first text baseline.

## Responsive and motion conventions (Phase 7)

- **Breakpoints in practice**: the desktop link row and the Previous / Back / Next block use `lg`; section titles take 4 columns at `lg` and 3 from `xl`. Below `lg` everything stacks to one column.
- **Section titles** never overflow: uppercase titles use `text-[1.375rem]`, all titles allow hyphenation and word breaking, and the title column has `min-w-0`.
- **Tap targets**: every link and button is at least 44px tall (`min-h-11`); icon buttons are `size-11`. Inline links inside a sentence are exempt.
- **Page transition** (`app/template.tsx`, class `page-in`): a 320ms opacity fade whenever the route changes.
- **Section reveal** (`scroll-reveal`): content settles up 16px and fades in over the first 15rem of scroll as it enters the viewport. CSS scroll-driven animation inside `@supports (animation-timeline: view())`, so browsers without it show the content with no animation. Use it on large blocks only (`Section`, project layouts, the closing call to action), never on controls.
- **Hero reveal** (`reveal` plus `revealDelay`): the one staggered load moment, home page only.
- **Reduced motion**: transitions and animations shorten to ~0, and `scroll-reveal` is removed entirely (scroll-driven animations ignore duration).
- **Menu focus**: Escape closes the mobile menu and returns focus to its button.
