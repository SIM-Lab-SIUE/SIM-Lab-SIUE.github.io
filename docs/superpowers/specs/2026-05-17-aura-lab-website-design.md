# AURA Lab Website v2 — Design Spec

**Date:** 2026-05-17
**Owner:** Alex P. Leith
**Repo:** `AURA-Lab-SIUE.github.io`
**Source brief:** `c:/life-os/academic/research-lab/rebrand/design-brief.md`
**Source one-pager:** `c:/life-os/academic/research-lab/research-onepager.md`

---

## 1. Purpose

Replace the placeholder hero at `AURA-Lab-SIUE.github.io` with a complete research lab website for AURA Lab (Avatars, Users, Relationships, and Affect) at SIUE Mass Communications, directed by Dr. Alex P. Leith. The site must signal externally-funded research, recruit students and researchers from any institution, and apply the AURA brand system from the design brief.

## 2. Scope (v1)

**In:** Home, Research, People, Publications, Tools, News, Join. JSON/YAML-driven content. GitHub Actions deploy. Dark-mode canonical.

**Out (v1):** Light-mode toggle. ORCID auto-pull. Per-student profile pages. Document/letterhead templates. RSS. Search. Custom domain (`aura-lab.siue.edu` deferred until SIUE IT provisions DNS).

## 3. Tech stack

- **Astro 5**, static output (`output: 'static'`), TypeScript content collections with Zod schemas.
- **Tailwind CSS** for utility styling. Custom `tokens.css` maps the brand palette from the design brief §4 to CSS custom properties so brand tokens are usable both from Tailwind config and from hand-written CSS.
- **Astro View Transitions** (`<ClientRouter />`) for cross-page navigation. Provides a layered, editorial feel without a SPA.
- **Motion One** for staggered word reveals on display headlines and entrance animations. All motion gated by `prefers-reduced-motion: reduce`.
- **astro-font** for `Fraunces`, `Instrument Sans`, `JetBrains Mono` with `font-display: swap`.
- **No client-side framework** (no React/Vue). Filtering on `/publications` is vanilla JS against a hydrated data attribute.

## 4. Repository layout

Existing placeholder `index.html` is preserved at `_archive/v1-placeholder/index.html`. Legacy SIM Lab pages stay at their current paths (`methodosync/`, `intro-to-obsidian/`, `open-coding.html`, `captionizer.html`, `countdown.html`, `app_form.html`) and are linked from `/tools` as Teaching Resources.

```
AURA-Lab-SIUE.github.io/
├── src/
│   ├── layouts/
│   │   └── BaseLayout.astro          # <head>, fonts, nav, footer, skip link, View Transitions
│   ├── components/
│   │   ├── Nav.astro                 # flat top nav, sticky-on-scroll, transparent over hero
│   │   ├── Footer.astro
│   │   ├── Hero.astro                # word AURA + radial mark + tagline + mouse-tracked wash
│   │   ├── SectionDivider.astro      # radial gradient wash
│   │   ├── ResearchAreaCard.astro
│   │   ├── PubItem.astro             # author · title · venue · year · DOI (mono)
│   │   ├── PersonCard.astro
│   │   ├── ProjectCard.astro
│   │   ├── ToolCard.astro
│   │   └── NewsItem.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── research/index.astro
│   │   ├── people/index.astro
│   │   ├── publications/index.astro
│   │   ├── tools/index.astro
│   │   ├── news/index.astro
│   │   └── join/index.astro
│   ├── content/
│   │   ├── config.ts                 # Zod schemas for every collection
│   │   ├── publications/pubs.yaml    # single file, array of entries
│   │   ├── news/*.md                 # one .md per news entry
│   │   ├── projects/*.yaml           # active research projects
│   │   ├── tools/tools.yaml          # open-source outputs
│   │   ├── tools/teaching.yaml       # legacy SIM Lab teaching resources
│   │   ├── people/director.yaml
│   │   └── research-areas/*.md       # one .md per thematic area
│   ├── styles/
│   │   └── tokens.css                # brand custom properties
│   └── lib/
│       └── filter.ts                 # publications filter (loaded as inline script)
├── public/
│   ├── img/
│   │   ├── ap-headshot-512.png       # copied from E:\Projects\SIM-DAD\SIM-DAD.github.io\images\ap-headshot-512.png
│   │   ├── aura-mark.svg             # reused
│   │   └── aura-mark.png             # reused
│   ├── favicon.svg                   # symlinks to aura-mark.svg
│   └── robots.txt
├── _archive/
│   └── v1-placeholder/index.html     # old placeholder, moved here
├── methodosync/, intro-to-obsidian/, … # legacy untouched
├── .github/workflows/deploy.yml
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
├── package.json
└── README.md
```

## 5. Design system

### 5.1 Tokens (from brief §4)

| Token | Hex | Role |
|---|---|---|
| `--bg` | `#0E0E12` | Deep Graphite — primary dark background |
| `--surface` | `#1A1A22` | Raised Graphite — cards, modals |
| `--chalk` | `#F4F0EB` | Warm Chalk — light-mode reserve |
| `--text` | `#F0ECE8` | Soft White — body on dark |
| `--text-dark` | `#18181B` | Near Black — body on light |
| `--muted` | `#71717A` | Cool Gray — metadata |
| `--violet` | `#7C3AED` | Aura Violet — primary accent, used sparingly |
| `--amber` | `#F59E0B` | Amber Signal — secondary accent, used even more sparingly |

### 5.2 Typography

- **Fraunces** variable — display + H2. Track loosely (2–5%) at large sizes. Hero clamp ~96–280px.
- **Instrument Sans** — UI labels, body (17–18px, line-height 1.7, measure ≤ 68ch, left-aligned only).
- **JetBrains Mono** — DOIs, code, technical metadata.

### 5.3 Motion (per brief §6 + "modern/complex" preference)

- Page load: staggered word reveal on display headlines (60 ms between words). Driven by Motion One.
- Cross-page nav: Astro View Transitions with a brief fade-and-rise on the main content frame.
- Hero: a violet radial-gradient wash that softly tracks the cursor (CSS variable updated via `requestAnimationFrame`, no layout thrash). Disabled under reduced-motion.
- Hover: text links get an underline that slides in from the left (CSS only). Cards lift 2px and gain shadow. No scale transforms.
- `prefers-reduced-motion: reduce` collapses all of the above to opacity-only fades or to no animation.

## 6. Page-by-page direction

### Home (`/`)
Full-bleed dark hero. **AURA** wordmark at display scale with the existing radial mark SVG. Tagline: *Where digital presence becomes research.* Scroll cue.

Below the hero, three sections divided by SectionDivider radial washes:
1. **Three research-area cards** — Presence · Platform · Affect — each links into the matching `/research` anchor.
2. **Recent publications** — last 3 entries from the `publications` collection where `featured: true` or by year desc.
3. **Recruiting CTA** — single line + `mailto:` link to `aleith@siue.edu`, framed for any student/researcher.

### Research (`/research`)
Four thematic areas, each rendered from a markdown file in `content/research-areas/`:

1. Virtual Environments
2. Streaming Platforms
3. Computational Methods
4. Virtual Meetings

Each area has: title (Fraunces H2), one-paragraph plain-language description, active projects (filtered from `content/projects/` by `area:` field), 2–3 representative publications (linked by `area:` tag in pubs.yaml).

### People (`/people`)

**Director section** — three-column layout on desktop, stacked on mobile:
- `ap-headshot-512.png` treated against a dark background with a subtle violet vignette behind (CSS box-shadow, not image edit).
- Bio block: name, title (Associate Professor, tenured 2025, SIUE Mass Communications · Director, AURA Lab · Co-Founding Organizer, Meaningful XR · Editor, Journal of Media Psychology).
- Links: CV (apleith.com/files/Leith_CV.pdf), email (aleith@siue.edu), ORCID (0000-0003-1310-6763), GitHub (apleith and SIM-Lab-SIUE), apleith.com.

**Below the director:** a "Currently recruiting" panel that mirrors the Join page CTA. Explicitly does not name students.

### Publications (`/publications`)

Editorial list, reverse-chronological. Each entry:
- Title (Fraunces, linked to DOI or preprint)
- Authors (Instrument Sans body; the director's name bolded)
- Venue, year (muted Instrument Sans)
- DOI in JetBrains Mono

Filter pills along the top: All · Virtual Envs · Streaming · Methods · Meetings. Filtering done via `data-area` attributes on each `<article>` and a vanilla-JS click handler.

**Inclusion rule:** entry must have at least one of: DOI, preprint URL, accepted-in-press status with a venue listing. Under-review / drafting / collecting / idea-stage works from `c:/life-os/academic/research-lab/research-lab.md` are excluded. Seed entries from the 24 published works in the Paper Tracker plus any preprinted in-flight items.

### Tools (`/tools`)

Two sections:

1. **Open-source research tools** (cards from `content/tools/tools.yaml`):
   - TASS (NLP / sentiment, GitHub link)
   - v2v R package
   - GearOut (equipment reservations, deployed at SIUE)
   - Open WebUI Launcher
   - mccoursepack
   - Mass Comm Careers Dashboard
   Each card: name, one-line description, GitHub link, primary-language badge (R, Python, TypeScript, etc.).

2. **Teaching resources** (`content/tools/teaching.yaml`) — links to legacy SIM Lab pages:
   - Methodosync (`/methodosync/`)
   - Intro to Obsidian (`/intro-to-obsidian/`)
   - Open Coding (`/open-coding.html`)
   - Captionizer (`/captionizer.html`)
   - Countdown (`/countdown.html`)

### News (`/news`)

Reverse-chronological timeline rendered from `content/news/*.md`. Seed entries (with dates from the one-pager and research-lab.md):
- 2026-05-13 — v2v R package live
- 2026-04-25 — *Platform Flattening of Gendered Affect* submitted to ICS
- 2026-04-19 — *Equity to Match Up* retargeted to *Social Media + Society*
- 2026-04-09 — *Check the Twitch Tag* submitted to *Convergence*
- 2025-09-11 — NSF 25-543 Future CoRe proposal submitted ($477K, sole PI)
- 2025 — Tenure & promotion to Associate Professor

### Join (`/join`)

Open invitation. Adapted from one-pager §"How students get involved" but generalized away from SIUE-only framing.

Structure:
1. **Lead paragraph** — explicit "students and researchers from any institution welcome." Cross-institutional and remote collaboration normal.
2. **Common paths in:**
   - Empirical projects on existing data (Twitch chat, VRChat tweets, pandemic remote-work tweets)
   - Methods + tool building (R, Python, SvelteKit, Next.js)
   - Co-authorship at ICA, NCA, DiGRA, Meaningful XR, AoIR, HICSS
   - SIUE-specific: URCA mentoring, MA thesis chairing / committee work (listed as one path, not the main path)
3. **What the first conversation is about** — copied verbatim from the one-pager ("about whether a project is workable and where the friction will be, not whether your idea is good enough").
4. **CTA:** `mailto:aleith@siue.edu` as the primary action, plus a secondary link to apleith.com for office hours.

## 7. Content collections (Zod schemas)

```ts
// publications
{
  title: string;
  authors: string[];               // director's name will be matched and bolded in render
  venue: string;
  year: number;
  doi?: string;
  preprint?: string;
  status: 'published' | 'in-press' | 'preprint';
  areas: ('virtual-environments' | 'streaming' | 'methods' | 'meetings')[];
  featured?: boolean;
}

// projects
{
  title: string;
  area: 'virtual-environments' | 'streaming' | 'methods' | 'meetings';
  blurb: string;                    // <= 180 chars
  status: 'active' | 'collecting' | 'wrapping';
  links?: { label: string; href: string }[];
}

// tools
{ name: string; blurb: string; href: string; language: string; }

// research-areas (markdown body + frontmatter)
{ title: string; slug: string; order: number; }

// news (markdown body + frontmatter)
{ date: Date; title: string; tags?: string[]; }

// people/director (single yaml)
{ name, titles[], bio (markdown), headshot, links: { cv, email, orcid, github[], website } }
```

## 8. Accessibility

- WCAG 2.1 AA contrast on all text (palette already passes per brief §5.2 of design standard reference).
- Skip-to-main link.
- Focus rings: 2px Aura Violet outline with 2px offset on all interactive elements.
- Semantic landmarks (`<header>`, `<nav>`, `<main>`, `<footer>`).
- Headshot has descriptive alt text.
- All motion respects `prefers-reduced-motion`.
- Keyboard-navigable filter pills with `aria-pressed` state.

## 9. Performance

- Static HTML output, no client JS except the vanilla filter script (<2 KB) and the Motion One bundle (<5 KB gzipped).
- Fonts preloaded; subset to Latin.
- Images served as WebP where possible; headshot under 100 KB after conversion (source PNG is acceptable as-is at 512×512).
- Lighthouse target: Performance ≥ 95, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95.

## 10. Deployment

`.github/workflows/deploy.yml`:
- Trigger: `push` to `main` and `workflow_dispatch`.
- Jobs: `build` (checkout → setup-node@v4 with cache → `npm ci` → `npm run build` → `upload-pages-artifact`) and `deploy` (uses `actions/deploy-pages@v4`).
- Permissions: `pages: write`, `id-token: write`.
- `astro.config.mjs`: `site: 'https://aura-lab-siue.github.io'`. No `base` since repo is named `*.github.io`.
- `public/CNAME` left absent until SIUE IT provisions `aura-lab.siue.edu`.

## 11. Open questions / deferred

- Custom domain CNAME — requires SIUE IT request, deferred.
- Light-mode toggle — design brief allows, not in v1.
- Per-area pages under `/research/<area>` — currently the four areas live as anchored sections on a single `/research` page. Split into individual pages if/when content grows.
- Newsletter / email signup — not in v1.

---

*End of spec.*
