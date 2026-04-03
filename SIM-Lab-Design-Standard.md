# SIM Lab Design Standard v1.0

> The Color Field Design System for the Social & Interactive Media Lab at SIUE.
> Inspired by Abstract Expressionism / Color Field Painting (Rothko, Kline, Motherwell, Frankenthaler).

---

## 1. Brand Identity

### 1.1 Personality (OCEAN)

| Dimension | Level | Expression |
|-----------|-------|------------|
| Openness | High | Contemporary, intellectually curious, forward-looking. Studies emerging media. |
| Conscientiousness | Moderate-high | Organized, systematic, trustworthy. Academic rigor is central. |
| Extraversion | Low-moderate | Confident but not loud. The hero is dramatic; the rest is quietly structured. |
| Agreeableness | Moderate | Approachable but not casual. Welcomes students without being overly warm. |
| Neuroticism | Low | Stable, grounded, serious. |

**Voice:** Precise, active, jargon-aware. Never corporate. Never whimsical.

### 1.2 Brand Concept

"Color Field Expressionism" — large planes of near-black ink with gestural accent color. The design communicates: *serious scholarly inquiry expressed through the visual language of the media we study.*

Visual elements drawn from the concept:
- Large uninterrupted background planes of dark color (Rothko)
- Gestural accent blocks at slight rotation and low opacity (Kline, Motherwell)
- Ghost numerals as watermarks (compositional depth)
- Constrained but expressive four-color accent palette (Frankenthaler)

### 1.3 Logo

Three SVG variants exist in `/img/`:

| File | Dimensions | Background | Use |
|------|-----------|------------|-----|
| `logo-mark.svg` | 120x120 | Transparent | Standalone monogram, inline mark |
| `logo-square.svg` | 120x120 | ink-0, rounded | GitHub avatar, favicon, social profiles |
| `logo-full.svg` | 778x80 | Transparent | Nav headers, slide decks, letterhead |

The mark consists of three overlapping rotated rectangles (teal, vermillion, cream) with the letters S-I-M stepping diagonally across the planes, plus a gestural vermillion accent stroke. All text is converted to vector paths for portability.

**Rules:**
- Minimum clear space around the mark: equal to the height of the gestural accent stroke.
- The mark must always appear on a dark background (ink-0 or ink-1) or use the square variant with its built-in background.
- Never rotate, stretch, recolor, or add effects to the mark.

---

## 2. Color System

### 2.1 Background Depth Scale

| Token | Hex | Role |
|-------|-----|------|
| `--ink-0` | `#09090f` | Deepest chrome — nav, footer, hero, alternate section backgrounds |
| `--ink-1` | `#0f0f18` | Primary canvas — default body background, primary sections |
| `--ink-2` | `#181820` | Card surface — card interiors, content blocks |
| `--ink-3` | `#22222e` | Separator — grid gaps, card borders, dividers (at 1.5px) |
| `--ink-4` | `#2e2e3e` | Subtle interactive — outline button borders, hover states |

**Rule:** Background depth progresses monotonically. A card (ink-2) sits on a section (ink-1 or ink-0). Never place a lighter ink on a darker ink at the same nesting level.

### 2.2 Text Color Scale

| Token | Hex | Contrast on ink-0 | Contrast on ink-1 | Min WCAG | Usage |
|-------|-----|-------------------|-------------------|----------|-------|
| `--cream` | `#f0ebe0` | ~16:1 | ~14.8:1 | AAA any size | Headings, primary body text, strong emphasis, hover text |
| `--muted` | `#b0aa9f` | ~9:1 | ~8.5:1 | AAA normal text | Secondary body text, descriptions, card paragraphs, metadata |
| `--dim` | `#807b73` | ~4.6:1 | ~4.3:1 | AA normal text | De-emphasized text: copyright, tech stack labels |
| `--faint` | `#5c5a54` | ~2.7:1 | ~2.6:1 | **FAILS all text** | NON-TEXT ONLY: decorative borders, disabled states, separators |

**Rule:** Every text element that conveys information must use `--cream`, `--muted`, or `--dim`. `--faint` is reserved for decorative non-text elements only.

### 2.3 Accent Colors

| Token | Hex | Dark Variant | Semantic Role |
|-------|-----|-------------|---------------|
| `--teal` | `#1f9080` | `#176a5e` | **Identity/Brand.** Logo accent, hero elements, primary dividers, contact links, default card borders. Research: Virtual Environments. |
| `--vermillion` | `#d94f2a` | `#b03d1f` | **Action/Emphasis.** CTA buttons, active nav, focus outlines, publication icons. Research: Platforms & Communities. |
| `--gold` | `#d4921a` | `#a87015` | **Value/Achievement.** Funding, grants, datasets, awards. Research: Open Science & Education. |
| `--indigo` | `#3d5ce8` | `#2c47c0` | **Technical/Computational.** AI/NLP tags, code tools, technical metadata. Research: AI & Computational Methods. |

**Rules:**
- Each accent maps to at most two semantic roles: its organizational role + its research area.
- When in doubt, use teal (the brand default).
- Accents appear as: card top/left borders, section dividers (3px x 3rem), tag pill backgrounds (at 15% opacity), icon colors, and button backgrounds (vermillion only).
- Accent colors must never be used for body text.

### 2.4 Accent in Context (Tag Pill Pattern)

```css
.project-tag.teal       { background: rgba(31,144,128,0.15); color: var(--teal); }
.project-tag.vermillion { background: rgba(217,79,42,0.15);  color: var(--vermillion); }
.project-tag.gold       { background: rgba(212,146,26,0.15); color: var(--gold); }
.project-tag.indigo     { background: rgba(61,92,232,0.15);  color: var(--indigo); }
```

---

## 3. Typography

### 3.1 Font Stack

| Role | Family | Source |
|------|--------|--------|
| Display | `'Syne', system-ui, sans-serif` | Google Fonts |
| Body | `'DM Sans', system-ui, sans-serif` | Google Fonts |

**Loading:** `<link>` in HTML `<head>` with `preconnect` hints and `display=swap`. No CSS `@import`.

**Usage rules:**
- If text is uppercase, use `--font-display`.
- If text is sentence case and longer than one line, use `--font-body`.
- Exception: card headings (h3, h4) use `--font-display` in sentence case.

### 3.2 Type Scale

| Level | Size | Weight | Tracking | Line Height | Family | Use |
|-------|------|--------|----------|-------------|--------|-----|
| Display | `clamp(2.5rem, 8vw, 7rem)` | 800 | -0.02em | 1.1 | Display | Homepage hero h1 |
| Page Title | `clamp(2.25rem, 6vw, 5.5rem)` | 800 | -0.02em | 1.1 | Display | Internal page h1 |
| Section Heading | `clamp(1.75rem, 3.5vw, 2.75rem)` | 700 | -0.015em | 1.1 | Display | h2 |
| Card Heading | `clamp(1.1rem, 2vw, 1.5rem)` | 600-700 | 0 | 1.1 | Display | h3 |
| Subheading | 0.95rem | 600 | 0 | 1.1 | Display | h4 |
| Body | 1rem | 400 | 0 | 1.65 | Body | Default paragraph |
| Body Small | 0.875rem | 400 | 0 | 1.6 | Body | Card descriptions, publications |
| UI Text | 0.8rem | 600-700 | 0.1em | 1.4 | Display | Buttons, nav links (uppercase) |
| Label | 0.7rem | 600-700 | 0.12-0.16em | 1.3 | Display | Section overlines, tabs, project links (uppercase) |
| Tag | 0.6rem | 700 | 0.14em | 1.2 | Display | Project tags, card tags (uppercase, with pill bg) |

**Rules:**
- Do not introduce font sizes between these levels.
- All uppercase text must have `letter-spacing` >= 0.08em.
- Body line height is 1.65 (165%). This is at the high end of the 120-145% recommendation but appropriate for the dark background, which benefits from more air.

### 3.3 Line Length

| Context | Max Width | Rationale |
|---------|-----------|-----------|
| Body paragraphs | `68ch` | Standard optimal range (45-75ch) |
| Featured descriptions | `72ch` | Slightly wider for secondary text in wide layouts |
| Section subtitles | `60ch` | Tighter for supporting copy under headings |
| Card descriptions | `none` | Card width constrains the measure |

**Rule:** No line of body text may exceed 75ch at any viewport width.

---

## 4. Spacing

### 4.1 Spacing Scale

| Token | Value | Role |
|-------|-------|------|
| `--space-xs` | 0.5rem (8px) | Inline gaps, icon-to-text, tight internal padding |
| `--space-sm` | 1rem (16px) | Paragraph spacing, standard gap, card internal gaps |
| `--space-md` | 2rem (32px) | Section header margin-bottom, card padding, grid gaps |
| `--space-lg` | 4rem (64px) | Section top padding, footer padding |
| `--space-xl` | 7rem (112px) | Section bottom padding |
| `--space-2xl` | 11rem (176px) | Large decorative spacing (reserved) |

### 4.2 Section Rhythm

All content sections use:
```css
.section-wrap { padding-block: var(--space-lg) var(--space-xl); }
```
This asymmetry (4rem top, 7rem bottom) creates a breathing pattern — sections exhale more at the bottom.

**Rules:**
- `--space-lg` and above are for section-level spacing only.
- Internal component spacing uses `--space-xs` through `--space-md`.
- The `.section-divider` (3rem x 3px colored bar) always follows the `.label` overline and precedes the `h2`.

---

## 5. Layout

### 5.1 Container

```css
.container {
  max-width: 1280px;
  margin-inline: auto;
  padding-inline: clamp(1.25rem, 5vw, 3.5rem);
}
```

**Rule:** Every section's content must be wrapped in `.container`. No content touches the viewport edge.

### 5.2 Grid Patterns

| Pattern | Columns | Gap | Border Treatment | Use |
|---------|---------|-----|-----------------|-----|
| Research Grid | `auto-fit, minmax(260px, 1fr)` | 1.5px + ink-3 bg | Gap-as-border | Research area cards |
| Projects Grid | `auto-fill, minmax(300px, 1fr)` | 1.5px + ink-3 bg | Gap-as-border | Tool/resource cards |
| Artifact Grid | `auto-fill, minmax(300px, 1fr)` | `--space-sm` | Individual borders | Software/dataset cards |
| Featured Grid | Flex column | `--space-md` | Individual left-border | Full-width featured cards |
| People/Funding | `repeat(2, 1fr)` | `--space-md` | Individual borders | Two-column content blocks |

**Gap-as-border technique:** The container gets `gap: 1.5px; background: var(--ink-3); border: 1.5px solid var(--ink-3)`. Cards get `background: var(--ink-2)`. The gap becomes a uniform 1.5px border between all cards without requiring individual card border rules on inner edges.

**Rule:** Use gap-as-border for dense grids where cards share edges. Use individual card borders + standard spacing for grids where cards should breathe.

### 5.3 Breakpoints

| Name | Value | Triggers |
|------|-------|----------|
| Tablet | 768px | Nav collapse to hamburger, single-column research grid |
| Phone | 640px | Single-column people/funding, footer stack, overview reflow |

**Rule:** Use only these two breakpoints. Prefer CSS Grid `auto-fit`/`auto-fill` for content reflow. Reserve media queries for nav behavior and explicit layout switches.

### 5.4 Section Backgrounds

Sections alternate between `ink-0` and `ink-1` backgrounds to create visual separation without borders. The pattern on each page:

```
Hero:     ink-0
Section:  ink-1
Section:  ink-0
Section:  ink-1
...
Footer:   ink-0
```

Use the utility classes `.bg-ink-0` and `.bg-ink-1` on `.section-wrap` elements.

---

## 6. Components

### 6.1 Section Header

```html
<div class="section-header">
  <p class="label">01 — Section Name</p>
  <div class="section-divider teal"></div>
  <h2 id="section-heading">Heading Text</h2>
  <p class="section-subtitle">Optional supporting text.</p>  <!-- optional -->
</div>
```

**Rule:** Every content section begins with this pattern. The two-digit section number prefix is required.

### 6.2 Cards

| Type | Accent | Border | Grid | Padding |
|------|--------|--------|------|---------|
| Research Card | 4px top bar | None (gap-as-border) | Research Grid | `clamp(1.5rem, 3vw, 2.5rem)` |
| Project Card | None | None (gap-as-border) | Projects Grid | `clamp(1rem, 2.5vw, 1.75rem)` |
| Featured Card | 5px left bar | 1.5px solid ink-3 | Featured Grid | `clamp(1.5rem, 3vw, 2.5rem)` |
| Artifact Card | 3px top bar | 1.5px solid ink-3 | Artifact Grid | `clamp(1rem, 2.5vw, 1.5rem)` |

**Rule:** All cards use `background: var(--ink-2)`. Accent borders replace one side of the standard border.

### 6.3 Buttons

| Variant | Background | Text | Border | Use |
|---------|-----------|------|--------|-----|
| Primary | `--vermillion` | `--cream` | None | Single most important CTA per section |
| Outline | Transparent | `--muted` | 1px `--ink-4` | Secondary actions |

```css
.btn {
  min-height: 44px;         /* Touch target minimum */
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0.7em 1.5em;
}
```

**Rule:** No more than one primary button per visible viewport area.

### 6.4 Links

| Context | Style | Hover |
|---------|-------|-------|
| Inline text | `.text-link` — cream with 1px teal underline | Color shifts to teal |
| Project link | `.project-link` — uppercase, label size, muted | Color shifts to cream |
| Footer/contact | Icon (teal) + text (muted) | Color shifts to cream |
| External | Auto-appended arrow icon via `a[target="_blank"]::after` | — |

**Rule:** All external links (`target="_blank"`) must include `rel="noopener"`. The CSS automatically appends a small external-link icon to `target="_blank"` links (excluding buttons, project-links, and the nav logo).

### 6.5 Navigation

- Sticky, `height: var(--nav-h)` (4rem), `background: var(--ink-0)`.
- Current page indicated by `aria-current="page"` + vermillion underline (desktop) / left border (mobile).
- Hamburger toggle at 768px breakpoint. **Minimum touch target: 44x44px.**
- Mobile nav drops down as a column from under the nav bar.

### 6.6 Publication Tabs

WAI-ARIA compliant tab pattern:
- `role="tablist"` on container, `role="tab"` on buttons, `role="tabpanel"` on panels.
- Active tab: `aria-selected="true"`, `tabindex="0"`.
- Inactive tabs: `aria-selected="false"`, `tabindex="-1"`.
- Keyboard: Arrow Left/Right cycles tabs, Home/End jump to first/last.

---

## 7. Accessibility

### 7.1 Requirements

| Requirement | Standard | Target |
|-------------|----------|--------|
| Text contrast (primary) | WCAG 2.1 SC 1.4.6 | AAA (7:1) — cream achieves ~15:1 |
| Text contrast (secondary) | WCAG 2.1 SC 1.4.6 | AAA (7:1) — muted achieves ~8.5:1 |
| Text contrast (tertiary) | WCAG 2.1 SC 1.4.3 | AA (4.5:1) — dim achieves ~4.6:1 |
| Touch targets | WCAG 2.5.8 | 44x44px minimum on all interactive elements |
| Keyboard navigation | WCAG 2.1.1 | All interactive elements operable via keyboard |
| Focus indicators | WCAG 2.4.7 | 2px solid vermillion, 3px offset |
| Reduced motion | WCAG 2.3.3 | `prefers-reduced-motion: reduce` zeroes all transitions/animations |
| Skip link | WCAG 2.4.1 | Present on all pages, vermillion background on focus |
| Landmarks | WCAG 1.3.1 | `<nav>`, `<main>`, `<footer>`, `<section aria-labelledby>` |
| Page language | WCAG 3.1.1 | `lang="en"` on `<html>` |
| Heading hierarchy | WCAG 1.3.1 | No skipped levels: h1 > h2 > h3 > h4 |
| External links | WCAG 3.2.5 | Visual indicator (icon) + `rel="noopener"` |

### 7.2 Dark-Mode-Only

The site is dark-only by design. This is appropriate for the brand concept (Color Field painting on dark canvas) and the audience (researchers/students making brief reference visits). No light mode is planned. If accessibility requests arise, offer a high-contrast mode (all text to cream, increased accent brightness) rather than a light theme.

---

## 8. Performance

| Rule | Rationale |
|------|-----------|
| No CSS `@import` for fonts | Creates sequential blocking. Use `<link>` with `preconnect`. |
| `preconnect` to font origins | `fonts.googleapis.com` and `fonts.gstatic.com` with `crossorigin`. |
| `display=swap` on font load | Prevents flash of invisible text (FOIT). |
| Icon library scoped or deferred | Full Font Awesome is ~80KB for ~10 icons. Scope to used icons when possible. |
| Images must have explicit dimensions | Use `width`/`height` attributes or CSS `aspect-ratio` to prevent layout shift. |
| No synchronous third-party JS | The site has no third-party JS — maintain this. |
| SVG for logos and icons where possible | Resolution-independent, animatable, small file size. |

---

## 9. Utility Classes

Available utility classes to avoid inline styles:

```css
/* Text color */
.text-teal       { color: var(--teal); }
.text-gold       { color: var(--gold); }
.text-vermillion { color: var(--vermillion); }
.text-indigo     { color: var(--indigo); }
.text-muted      { color: var(--muted); }
.text-cream      { color: var(--cream); }

/* Backgrounds */
.bg-ink-0        { background: var(--ink-0); }
.bg-ink-1        { background: var(--ink-1); }

/* Links */
.text-link       { color: var(--cream); border-bottom: 1px solid var(--teal); }

/* Spacing */
.mt-xs  { margin-top: var(--space-xs); }
.mt-sm  { margin-top: var(--space-sm); }
.mt-md  { margin-top: var(--space-md); }
.mb-xs  { margin-bottom: var(--space-xs); }
.mb-sm  { margin-bottom: var(--space-sm); }

/* Section subtitle */
.section-subtitle { color: var(--muted); margin-top: var(--space-xs); max-width: 60ch; }
```

**Rule:** Prefer utility classes over inline `style` attributes. Inline styles are acceptable only for one-off spacing tweaks specific to a single element's layout context.

---

## 10. File Structure

```
/
  index.html              Home page
  about.html              About, publications, software, datasets
  projects.html           Featured + supporting project showcase
  css/style.css           Complete design system (single file, no build)
  img/
    logo-mark.svg         Monogram (transparent bg)
    logo-square.svg       Monogram (ink-0 bg, rounded)
    logo-full.svg         Full lockup (mark + wordmark)
    headshot.png          Director photo
    ...
  methodosync/            React/Vite app (separate build)
  theories/               Parcel app (separate build)
  research-methods/       Bookdown output (separate build)
  .gitignore              Excludes _archive/
```

**Rule:** The main site is vanilla HTML/CSS/JS with no build step. Sub-applications (MethodoSync, Theories, Research Methods) maintain their own build tooling but commit built output to the repository for GitHub Pages deployment.

---

## 11. Design Tokens Reference (CSS Custom Properties)

Copy-paste ready block for any SIM Lab project:

```css
:root {
  /* Canvas depths */
  --ink-0: #09090f;
  --ink-1: #0f0f18;
  --ink-2: #181820;
  --ink-3: #22222e;
  --ink-4: #2e2e3e;

  /* Text */
  --cream:  #f0ebe0;
  --muted:  #b0aa9f;
  --dim:    #807b73;
  --faint:  #5c5a54;   /* non-text only */

  /* Accents */
  --vermillion:      #d94f2a;
  --vermillion-dark: #b03d1f;
  --teal:            #1f9080;
  --teal-dark:       #176a5e;
  --gold:            #d4921a;
  --gold-dark:       #a87015;
  --indigo:          #3d5ce8;
  --indigo-dark:     #2c47c0;

  /* Typography */
  --font-display: 'Syne', system-ui, sans-serif;
  --font-body:    'DM Sans', system-ui, sans-serif;

  /* Spacing */
  --space-xs:  0.5rem;
  --space-sm:  1rem;
  --space-md:  2rem;
  --space-lg:  4rem;
  --space-xl:  7rem;
  --space-2xl: 11rem;

  /* Layout */
  --max-w: 1280px;
  --nav-h: 4rem;
}
```

---

*SIM Lab Design Standard v1.0 — April 2026*
*Social & Interactive Media Lab, Southern Illinois University Edwardsville*
