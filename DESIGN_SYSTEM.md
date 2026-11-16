# DESIGN_SYSTEM.md

Status: **implemented in Phase 1.** Tokens live in `src/styles/globals.css`; components in `src/components`. A live reference page is at `/design-system` (development only; it returns 404 in production builds).

Not yet reviewed in a browser. Phase 1 was verified by lint, type-check, production build, served HTML and compiled CSS only (see `DEVELOPMENT_LOG.md`).

## Direction: the engineering drawing sheet

Each page reads like a drawing sheet. A narrow left column holds the title, like an annotation. A wide right column holds the content. Sections are separated by full-width hairline rules. The one distinctive element is the **title block**: projects are presented as ruled specification rows (discipline, stack), not as cards.

Structure is information: rules separate sections, mono type marks technical data, and the accent marks the current page and interactive underlines. Numbered markers are not used, because the content is not a sequence.

Avoided on purpose: all-caps eyebrow labels, `→` appended to links, one-word headline accents, gradient washes, identical rounded cards, glow, glass, floating decoration.

## Color

Owner palette (fixed):

| Token | Light | Dark |
|---|---|---|
| `background` | `#F4F3EF` | `#0B0B0A` |
| `foreground` | `#0B0B0A` | `#F4F3EF` |
| `accent` | `#0A6B5E` | `#18A389` |
| `on-accent` (text on accent fills) | `#F4F3EF` | `#0B0B0A` |

Derived tokens are `color-mix` blends of foreground and background, so no new hue exists:

| Token | Mix | Use |
|---|---|---|
| `muted` | 62% foreground | secondary text, control borders |
| `rule` | 16% foreground | hairlines, tag borders (decorative) |
| `surface` | 4% foreground | hover fill |

Measured WCAG contrast:

| Pair | Light | Dark |
|---|---|---|
| foreground on background | 17.7:1 | 17.7:1 |
| accent on background | 5.8:1 | 6.2:1 |
| on-accent on accent | 5.8:1 | 6.2:1 |
| muted on background | 5.4:1 | 7.1:1 |

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

## Home page conventions (Phase 2)

- Where the brief specifies capitals (wordmark, hero label, hero headline, "Engineering capabilities", the call to action), the text is written in sentence case in the data and set with CSS `uppercase`. Everything else stays sentence case.
- Hero headline uses `text-hero` with `font-semiwide` (width 106) and `text-balance`. Call-to-action headline uses `text-h1` with `font-semiwide`.
- Navigation moves to its desktop layout at `lg` (seven links need the room); below that it is the disclosure menu.
- Utilities added to `globals.css`: `bg-grid` (faint 40px architectural grid, 7% foreground), `reveal` (the one page-load rise, delay from `--reveal-delay` via `revealDelay()` in `lib/utils.ts`), `font-semiwide`.
- New components: `ProjectFeature` (editorial layout, alternates sides), `ProjectFigure` (screenshot, or a labeled "Screenshot to be added" placeholder), and sections `Hero`, `HeroVisual`, `EngineeringOverview`, `FeaturedProjects`, `Capabilities`, `ContactCta`.
- Availability indicator: a small square marker plus text, shown only when `profile.availability` is set.
- `Section` accepts `uppercase` for titles the brief sets in capitals.

## About page conventions (Phase 3)

- `PageHeader` has a `statement` variant: mono label above, uppercase `font-semiwide` headline at `text-statement` (clamp 1.75 to 3.75rem, line height 1.06), full width, serif lead below. Use it for pages whose brief gives a long uppercase headline.
- Numbered principle blocks: a two-column ordered list, each item with a top rule, an accent display number (tabular), an uppercase `h3` and serif body text.
- Interest lists: ruled rows in two columns, `font-wide` at `text-h3`, no tags (tags are for technologies and disciplines).
- Facts and affiliations use `SpecList`. Row keys include the index, so terms may repeat.
