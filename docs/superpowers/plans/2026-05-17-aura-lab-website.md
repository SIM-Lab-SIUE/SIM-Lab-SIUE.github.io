# AURA Lab Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the placeholder at `AURA-Lab-SIUE.github.io` with a complete, production-grade AURA Lab website (Home, Research, People, Publications, Tools, News, Join) using Astro + Tailwind, deployed via GitHub Actions to GitHub Pages.

**Architecture:** Static Astro site with TypeScript content collections (Zod-validated YAML/Markdown). Brand tokens from the design brief drive a Tailwind theme. Astro View Transitions provide cross-page polish; Motion One adds staggered word reveals on display headlines. No client-side framework, no SPA. All motion respects `prefers-reduced-motion`.

**Tech Stack:** Astro 5, Tailwind CSS 4, TypeScript, Zod (via Astro content collections), Motion One, astro-font, GitHub Actions + `actions/deploy-pages@v4`.

**Verification model:** Each task ends with at least one of (a) `npm run build` succeeds, (b) `astro check` passes (no TS errors), (c) dev-server visual check at specific URL, (d) browser console clean. Final task runs Lighthouse audits.

**Source materials:**
- Spec: `docs/superpowers/specs/2026-05-17-aura-lab-website-design.md`
- Brand brief: `c:/life-os/academic/research-lab/rebrand/design-brief.md`
- Content seed: `c:/life-os/academic/research-lab/research-onepager.md`, `c:/life-os/academic/research-lab/research-lab.md`
- Headshot source: `E:\Projects\SIM-DAD\SIM-DAD.github.io\images\ap-headshot-512.png`
- Existing logo SVG: `d:/OneDrive - Southern Illinois University Edwardsville/websites/AURA-Lab-SIUE.github.io/img/aura-mark.svg`

**Working directory for all tasks:** `d:\OneDrive - Southern Illinois University Edwardsville\websites\AURA-Lab-SIUE.github.io`

---

## File structure (target end state)

```
AURA-Lab-SIUE.github.io/
├── src/
│   ├── layouts/BaseLayout.astro
│   ├── components/
│   │   ├── Nav.astro
│   │   ├── Footer.astro
│   │   ├── Hero.astro
│   │   ├── SectionDivider.astro
│   │   ├── ResearchAreaCard.astro
│   │   ├── PubItem.astro
│   │   ├── ProjectCard.astro
│   │   ├── ToolCard.astro
│   │   ├── NewsItem.astro
│   │   └── WordReveal.astro
│   ├── content/
│   │   ├── config.ts
│   │   ├── publications/pubs.yaml
│   │   ├── projects/*.yaml
│   │   ├── tools/tools.yaml
│   │   ├── tools/teaching.yaml
│   │   ├── people/director.yaml
│   │   ├── research-areas/*.md
│   │   └── news/*.md
│   ├── pages/
│   │   ├── index.astro
│   │   ├── research/index.astro
│   │   ├── people/index.astro
│   │   ├── publications/index.astro
│   │   ├── tools/index.astro
│   │   ├── news/index.astro
│   │   └── join/index.astro
│   ├── styles/tokens.css
│   └── lib/filter.ts
├── public/
│   ├── img/ap-headshot-512.png
│   ├── img/aura-mark.svg
│   ├── img/aura-mark.png
│   ├── favicon.svg
│   └── robots.txt
├── _archive/v1-placeholder/index.html
├── .github/workflows/deploy.yml
├── astro.config.mjs
├── tailwind.config.mjs  (Tailwind 4 uses @theme in CSS, but config file kept for content paths)
├── tsconfig.json
├── package.json
└── README.md
```

---

## Task 1: Archive current placeholder + scaffold Astro project

**Files:**
- Move: `index.html` → `_archive/v1-placeholder/index.html`
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `.gitignore`, `src/pages/index.astro` (temporary "hello"), `README.md`

- [ ] **Step 1: Move existing placeholder out of the way**

```bash
mkdir -p _archive/v1-placeholder
mv index.html _archive/v1-placeholder/index.html
```

Leave `about.html`, `team.html`, `research.html`, `projects.html`, `news.html` in place for now (they're legacy and will be moved in Task 16). Leave `methodosync/`, `intro-to-obsidian/`, `open-coding.html`, `captionizer.html`, `countdown.html`, `app_form.html` untouched — they remain at their public URLs.

- [ ] **Step 2: Initialize package.json**

Create `package.json`:

```json
{
  "name": "aura-lab-siue",
  "type": "module",
  "version": "2.0.0",
  "private": true,
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "check": "astro check"
  },
  "dependencies": {
    "astro": "^5.0.0",
    "@astrojs/check": "^0.9.0",
    "@astrojs/tailwind": "^5.1.0",
    "tailwindcss": "^3.4.0",
    "typescript": "^5.5.0",
    "motion": "^11.0.0",
    "@fontsource-variable/fraunces": "^5.0.0",
    "@fontsource-variable/instrument-sans": "^5.0.0",
    "@fontsource/jetbrains-mono": "^5.0.0"
  }
}
```

Note: Tailwind 3.4 is used (not 4) because Astro's `@astrojs/tailwind` integration is stable on 3.x. This avoids the Tailwind 4 alpha churn.

- [ ] **Step 3: Create astro.config.mjs**

```js
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://aura-lab-siue.github.io',
  output: 'static',
  integrations: [tailwind({ applyBaseStyles: false })],
  vite: {
    build: { cssMinify: 'lightningcss' },
  },
});
```

- [ ] **Step 4: Create tsconfig.json**

```json
{
  "extends": "astro/tsconfigs/strict",
  "include": ["src/**/*", "src/**/*.astro"],
  "exclude": ["dist"]
}
```

- [ ] **Step 5: Create .gitignore**

Append (or create) `.gitignore`:

```
node_modules
dist
.astro
.env
.env.local
.DS_Store
```

- [ ] **Step 6: Create minimal `src/pages/index.astro`**

```astro
---
---
<html lang="en">
  <head><meta charset="utf-8" /><title>AURA Lab</title></head>
  <body><h1>AURA Lab — scaffold OK</h1></body>
</html>
```

- [ ] **Step 7: Create README.md**

```markdown
# AURA Lab — SIUE

Website for the Avatars, Users, Relationships, and Affect Lab at Southern Illinois University Edwardsville.

## Development

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # output to ./dist
npm run check    # type-check + Astro diagnostics
```

Deployed automatically to https://aura-lab-siue.github.io via GitHub Actions on push to `main`.
```

- [ ] **Step 8: Install + verify build**

```bash
npm install
npm run build
```

Expected: `dist/index.html` exists containing "AURA Lab — scaffold OK". No build errors.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "chore: archive placeholder, scaffold Astro project"
```

---

## Task 2: Brand tokens + Tailwind theme

**Files:**
- Create: `src/styles/tokens.css`, `tailwind.config.mjs`, `src/styles/global.css`

- [ ] **Step 1: Create `src/styles/tokens.css`**

```css
:root {
  --bg:        #0E0E12;
  --surface:   #1A1A22;
  --chalk:     #F4F0EB;
  --text:      #F0ECE8;
  --text-dark: #18181B;
  --muted:     #71717A;
  --violet:    #7C3AED;
  --amber:     #F59E0B;

  --measure: 68ch;
  --radius-card: 14px;
  --radius-pill: 999px;
  --shadow-card: 0 1px 0 rgba(255,255,255,0.04) inset, 0 8px 24px rgba(0,0,0,0.35);
  --shadow-card-hover: 0 1px 0 rgba(255,255,255,0.06) inset, 0 14px 36px rgba(0,0,0,0.45);

  --ease-out: cubic-bezier(0.2, 0.7, 0.2, 1);
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
}
```

- [ ] **Step 2: Create `tailwind.config.mjs`**

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,ts,md,mdx}'],
  theme: {
    extend: {
      colors: {
        bg:        'var(--bg)',
        surface:   'var(--surface)',
        chalk:     'var(--chalk)',
        text:      'var(--text)',
        'text-dark': 'var(--text-dark)',
        muted:     'var(--muted)',
        violet:    'var(--violet)',
        amber:     'var(--amber)',
      },
      fontFamily: {
        display:   ['"Fraunces Variable"', 'Fraunces', 'Georgia', 'serif'],
        sans:      ['"Instrument Sans Variable"', 'Instrument Sans', 'system-ui', 'sans-serif'],
        mono:      ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      maxWidth: {
        measure: '68ch',
        page:    '1180px',
      },
      letterSpacing: {
        display: '0.02em',
        ui: '0.14em',
      },
    },
  },
  plugins: [],
};
```

- [ ] **Step 3: Create `src/styles/global.css`**

```css
@import './tokens.css';
@import '@fontsource-variable/fraunces/index.css';
@import '@fontsource-variable/instrument-sans/index.css';
@import '@fontsource/jetbrains-mono/400.css';

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html { background: var(--bg); }
  body {
    background: var(--bg);
    color: var(--text);
    font-family: theme('fontFamily.sans');
    font-size: 17px;
    line-height: 1.7;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }
  a { color: inherit; text-decoration: none; }
  ::selection { background: var(--violet); color: var(--text); }
  :focus-visible {
    outline: 2px solid var(--violet);
    outline-offset: 2px;
    border-radius: 2px;
  }
  p { max-width: var(--measure); }
  h1, h2, h3 { font-family: theme('fontFamily.display'); font-weight: 900; }
}

@layer components {
  .container-page { @apply max-w-page mx-auto px-6 sm:px-8 lg:px-12; }
  .pill {
    @apply inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm uppercase tracking-ui;
    border: 1px solid rgba(255,255,255,0.12);
    color: var(--muted);
    transition: color 200ms var(--ease-out), border-color 200ms var(--ease-out);
  }
  .pill:hover { color: var(--text); border-color: rgba(255,255,255,0.28); }
  .pill[aria-pressed="true"] { color: var(--text); border-color: var(--violet); }
  .link-underline {
    background-image: linear-gradient(var(--violet), var(--violet));
    background-size: 0% 1px;
    background-position: 0 100%;
    background-repeat: no-repeat;
    transition: background-size 250ms var(--ease-out);
  }
  .link-underline:hover { background-size: 100% 1px; }
  .card {
    background: var(--surface);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: var(--radius-card);
    box-shadow: var(--shadow-card);
    transition: transform 250ms var(--ease-out), box-shadow 250ms var(--ease-out);
  }
  .card:hover { transform: translateY(-2px); box-shadow: var(--shadow-card-hover); }
}
```

- [ ] **Step 4: Verify build**

```bash
npm run build
```

Expected: Build succeeds. `dist/_astro/*.css` contains the Tailwind utilities + custom properties.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(styles): add brand tokens and Tailwind theme"
```

---

## Task 3: BaseLayout + Nav + Footer

**Files:**
- Create: `src/layouts/BaseLayout.astro`, `src/components/Nav.astro`, `src/components/Footer.astro`

- [ ] **Step 1: Create `src/components/Nav.astro`**

```astro
---
const { current } = Astro.props;
const items = [
  { href: '/research/', label: 'Research', key: 'research' },
  { href: '/people/', label: 'People', key: 'people' },
  { href: '/publications/', label: 'Publications', key: 'publications' },
  { href: '/tools/', label: 'Tools', key: 'tools' },
  { href: '/news/', label: 'News', key: 'news' },
  { href: '/join/', label: 'Join', key: 'join' },
];
---
<header class="topbar" aria-label="Site">
  <div class="container-page flex items-center justify-between py-5">
    <a href="/" class="brand inline-flex items-center gap-2 text-text font-semibold tracking-ui uppercase text-sm">
      <span class="dot" aria-hidden="true"></span>
      AURA Lab
    </a>
    <nav aria-label="Primary" class="hidden md:block">
      <ul class="flex gap-6 text-sm uppercase tracking-ui text-muted">
        {items.map((it) => (
          <li>
            <a href={it.href}
               class={`link-underline ${current === it.key ? 'text-text' : ''}`}
               aria-current={current === it.key ? 'page' : undefined}>
              {it.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  </div>
</header>

<style>
  .topbar {
    position: sticky; top: 0; z-index: 20;
    backdrop-filter: blur(8px);
    background: color-mix(in oklab, var(--bg) 86%, transparent);
    border-bottom: 1px solid rgba(255,255,255,0.05);
  }
  .dot {
    display: inline-block; width: 6px; height: 6px;
    border-radius: 50%; background: var(--violet);
  }
</style>
```

- [ ] **Step 2: Create `src/components/Footer.astro`**

```astro
---
const year = new Date().getFullYear();
---
<footer class="mt-32 border-t border-white/5">
  <div class="container-page py-10 flex flex-col md:flex-row gap-4 md:items-center md:justify-between text-sm text-muted">
    <div>
      AURA Lab · Southern Illinois University Edwardsville · &copy; {year}
    </div>
    <div class="flex gap-5">
      <a class="link-underline" href="https://www.siue.edu/artsandsciences/mass-communications/">SIUE Mass Communications</a>
      <a class="link-underline" href="https://github.com/SIM-Lab-SIUE">GitHub</a>
      <a class="link-underline" href="mailto:aleith@siue.edu">aleith@siue.edu</a>
    </div>
  </div>
</footer>
```

- [ ] **Step 3: Create `src/layouts/BaseLayout.astro`**

```astro
---
import '../styles/global.css';
import Nav from '../components/Nav.astro';
import Footer from '../components/Footer.astro';
import { ClientRouter } from 'astro:transitions';

interface Props {
  title: string;
  description?: string;
  current?: string;
  image?: string;
}

const {
  title,
  description = 'AURA Lab at SIUE — a computational communication research group studying mediated presence, streaming, and digital affect.',
  current,
  image = '/img/aura-mark.png',
} = Astro.props;

const fullTitle = title === 'AURA Lab' ? title : `${title} — AURA Lab`;
const canonical = new URL(Astro.url.pathname, Astro.site).toString();
---
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{fullTitle}</title>
    <meta name="description" content={description} />
    <meta name="theme-color" content="#0E0E12" />
    <link rel="canonical" href={canonical} />
    <link rel="icon" type="image/svg+xml" href="/img/aura-mark.svg" />

    <meta property="og:type" content="website" />
    <meta property="og:title" content={fullTitle} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={new URL(image, Astro.site).toString()} />
    <meta property="og:url" content={canonical} />
    <meta name="twitter:card" content="summary_large_image" />

    <ClientRouter />
  </head>
  <body>
    <a href="#main" class="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:bg-violet focus:text-text focus:px-3 focus:py-2 focus:rounded">Skip to main content</a>
    <Nav current={current} />
    <main id="main">
      <slot />
    </main>
    <Footer />
  </body>
</html>
```

- [ ] **Step 4: Update `src/pages/index.astro` to use BaseLayout**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---
<BaseLayout title="AURA Lab" current="home">
  <section class="container-page py-32">
    <h1 class="font-display text-6xl">Hello, AURA</h1>
    <p class="mt-4 text-muted">Layout wired up.</p>
  </section>
</BaseLayout>
```

- [ ] **Step 5: Verify**

```bash
npm run check
npm run build
npm run dev
```

Open http://localhost:4321/ . Verify: dark background, sticky top nav visible, "Hello, AURA" rendered in Fraunces, no console errors.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat(layout): BaseLayout, Nav, Footer with View Transitions"
```

---

## Task 4: Content collections — schemas + seed data

**Files:**
- Create: `src/content/config.ts`, plus YAML/MD files under `src/content/`

- [ ] **Step 1: Create `src/content/config.ts`**

```ts
import { defineCollection, z } from 'astro:content';

const AREA = z.enum(['virtual-environments', 'streaming', 'methods', 'meetings']);

const publications = defineCollection({
  type: 'data',
  schema: z.object({
    entries: z.array(z.object({
      title: z.string(),
      authors: z.array(z.string()).nonempty(),
      venue: z.string(),
      year: z.number().int().gte(2010).lte(2030),
      doi: z.string().url().optional(),
      preprint: z.string().url().optional(),
      status: z.enum(['published', 'in-press', 'preprint']),
      areas: z.array(AREA).nonempty(),
      featured: z.boolean().optional(),
    })),
  }),
});

const projects = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    area: AREA,
    blurb: z.string().max(220),
    status: z.enum(['active', 'collecting', 'wrapping']),
    links: z.array(z.object({ label: z.string(), href: z.string().url() })).optional(),
  }),
});

const tools = defineCollection({
  type: 'data',
  schema: z.object({
    entries: z.array(z.object({
      name: z.string(),
      blurb: z.string(),
      href: z.string().url(),
      language: z.string(),
    })),
  }),
});

const people = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    titles: z.array(z.string()),
    bio: z.string(),
    headshot: z.string(),
    headshotAlt: z.string(),
    links: z.object({
      cv: z.string().url(),
      email: z.string().email(),
      orcid: z.string().url(),
      github: z.array(z.object({ label: z.string(), href: z.string().url() })),
      website: z.string().url(),
    }),
  }),
});

const researchAreas = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    order: z.number().int(),
    blurb: z.string(),
    area: AREA,
  }),
});

const news = defineCollection({
  type: 'content',
  schema: z.object({
    date: z.date(),
    title: z.string(),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = {
  publications,
  projects,
  tools,
  people,
  'research-areas': researchAreas,
  news,
};
```

- [ ] **Step 2: Create `src/content/people/director.yaml`**

```yaml
name: "Alex P. Leith, PhD"
titles:
  - "Associate Professor (Tenured), Mass Communications, SIUE"
  - "Director, AURA Lab"
  - "Co-Founding Organizer, Meaningful XR"
  - "Editor, Journal of Media Psychology"
headshot: "/img/ap-headshot-512.png"
headshotAlt: "Alex P. Leith, Director of AURA Lab — three-quarter portrait."
bio: |
  My research sits at the intersection of three threads. First, **mediated presence
  in virtual environments** — how communication changes when the channel is a VR
  headset, a livestream chat, a videoconference grid, or a 3D social world. Second,
  **computational methods in communication research** — building and using
  corpus-scale tools (sentiment, topic models, network methods, LLMs) on real
  social-media and platform data, with explicit attention to what the methods do and
  don't license you to claim. Third, **open-research pedagogy** — translating the
  above into materials that make research methods learnable by undergraduates with
  no prior stats, methods, or coding background.

  Across all three: fit over prestige, transparency over claim inflation. I publish
  to be read and reused, not to climb a ladder.
links:
  cv: "https://apleith.com/files/Leith_CV.pdf"
  email: "aleith@siue.edu"
  orcid: "https://orcid.org/0000-0003-1310-6763"
  website: "https://apleith.com"
  github:
    - { label: "apleith", href: "https://github.com/apleith" }
    - { label: "SIM-Lab-SIUE", href: "https://github.com/SIM-Lab-SIUE" }
```

- [ ] **Step 3: Create `src/content/research-areas/virtual-environments.md`**

```markdown
---
title: "Virtual Environments"
slug: "virtual-environments"
order: 1
area: "virtual-environments"
blurb: "How identity, presence, and relationships form when the room is rendered — VRChat, social VR, and 3D worlds."
---

People show up in virtual environments differently than they do in messaging or
video. A VR avatar carries posture, gaze, and proximity in ways a profile photo
can't. AURA Lab studies the affordances of these spaces — what they make possible,
what they exclude, who they invite in — using corpus-scale platform data and
focused qualitative studies.
```

- [ ] **Step 4: Create `src/content/research-areas/streaming.md`**

```markdown
---
title: "Streaming Platforms"
slug: "streaming"
order: 2
area: "streaming"
blurb: "Livestreams as interpersonal channels — parasocial ties, chat dynamics, and identity tagging on Twitch."
---

Livestreaming compresses a parasocial relationship into a real-time channel: the
streamer is performing for an audience that is also performing for itself in chat.
The lab works with a 22-million-row corpus of chat-and-stream data, plus follow-up
restricted-access datasets, to study how identity tagging, harassment, and
parasocial communication play out in this mixed sync/async environment.
```

- [ ] **Step 5: Create `src/content/research-areas/methods.md`**

```markdown
---
title: "Computational Methods"
slug: "methods"
order: 3
area: "methods"
blurb: "Building the tools — STM, multi-instrument sentiment, network methods, LLMs — for communication research."
---

Computational methods only license the claims their assumptions support. The lab
builds and uses corpus-scale tools (structural topic modeling, multi-instrument
sentiment ensembles, network and community-detection methods, increasingly local
LLMs) on real platform data, and ships the methodology alongside the findings.
Open-source outputs include the TASS sentiment ensemble, the v2v R teaching
package, and a growing set of reproducible Quarto workflows.
```

- [ ] **Step 6: Create `src/content/research-areas/meetings.md`**

```markdown
---
title: "Virtual Meetings"
slug: "meetings"
order: 4
area: "meetings"
blurb: "How videoconferencing and shared virtual workspaces change collaboration, attention, and inclusion."
---

The Beyond Meet Space initiative — originating in a closed NSF FW-HTF-R grant —
examines how virtual meetings work as communication environments rather than as
broken substitutes for in-person interaction. Active threads include selective
muting as an inclusion tool, impression-management features, and longitudinal
studies of VR classrooms.
```

- [ ] **Step 7: Create `src/content/projects/v2v.yaml`**

```yaml
title: "Vibes to Variables (V2V)"
area: "methods"
status: "active"
blurb: "Five-component teaching ecosystem for MC 451 / MC 501 — Quarto textbook, R package, hub site, VSCode extension, graduate supplement. CC BY 4.0."
links:
  - { label: "v2v R package", href: "https://github.com/SIM-Lab-SIUE/v2v" }
```

- [ ] **Step 8: Create `src/content/projects/bms.yaml`**

```yaml
title: "Beyond Meet Space"
area: "meetings"
status: "wrapping"
blurb: "Multi-paper initiative on virtual meetings. ZEF Scale validation, longitudinal VR classroom study, virtual-meeting support for underrepresented workers. Originating from the closed FW-HTF-R grant."
```

- [ ] **Step 9: Create `src/content/projects/gearout.yaml`**

```yaml
title: "GearOut"
area: "methods"
status: "active"
blurb: "Equipment-reservation platform deployed at SIUE as MassComm Checkout. 300+ developer hours. OTMIR-disclosed; commercial licensing negotiation underway."
links:
  - { label: "Repo", href: "https://github.com/SIM-DAD/gearout" }
```

- [ ] **Step 10: Create `src/content/projects/twitch-corpus.yaml`**

```yaml
title: "Twitch Identity & Affect Corpus"
area: "streaming"
status: "active"
blurb: "22M-row 2018 Twitch chat-and-stream corpus plus follow-up restricted-access datasets on chat behavior and racial harassment ML detection."
```

- [ ] **Step 11: Create `src/content/projects/rhml.yaml`**

```yaml
title: "Reciprocal Human-Machine Learning"
area: "methods"
status: "active"
blurb: "Local-first AI tutor + student journaling + instructor oversight dashboard for SHAPE-discipline data literacy. Spring 2027 sabbatical thread."
```

- [ ] **Step 12: Create `src/content/projects/vrchat-presence.yaml`**

```yaml
title: "VRChat as Interpersonal Space"
area: "virtual-environments"
status: "active"
blurb: "How users form intrapersonal and interpersonal relationships in VRChat during and after COVID. Includes the *Dreaming a Virtual Reality* and *What ASD Finds in VRChat* manuscript thread."
```

- [ ] **Step 13: Create `src/content/tools/tools.yaml`**

```yaml
entries:
  - name: "TASS"
    blurb: "Multi-instrument sentiment ensemble (AFINN + TASS + RoBERTa) for communication research at corpus scale."
    href: "https://github.com/SIM-Lab-SIUE/tass"
    language: "Python"
  - name: "v2v"
    blurb: "R package for the Vibes to Variables open textbook — load and analyze a 22M-row Twitch corpus from a learner-friendly API."
    href: "https://github.com/SIM-Lab-SIUE/v2v"
    language: "R"
  - name: "GearOut"
    blurb: "Equipment-reservation platform deployed at SIUE as MassComm Checkout."
    href: "https://github.com/SIM-DAD/gearout"
    language: "TypeScript"
  - name: "Open WebUI Launcher"
    blurb: "Local-first launcher for running Open WebUI against on-prem LLM endpoints. Built for the RHML sabbatical thread."
    href: "https://github.com/apleith/open-webui-launcher"
    language: "TypeScript"
  - name: "mccoursepack"
    blurb: "R package collecting datasets and helpers used across Mass Communications courses at SIUE."
    href: "https://github.com/SIM-Lab-SIUE/mccoursepack"
    language: "R"
  - name: "Mass Comm Careers Dashboard"
    blurb: "Interactive dashboard mapping career outcomes and pathways for Mass Communications graduates."
    href: "https://github.com/SIM-Lab-SIUE/careers-dashboard"
    language: "R / Shiny"
```

- [ ] **Step 14: Create `src/content/tools/teaching.yaml`**

```yaml
entries:
  - name: "Methodosync"
    blurb: "Shared timing and pacing scaffolding for methods classrooms."
    href: "/methodosync/"
    language: "Web"
  - name: "Intro to Obsidian"
    blurb: "A ten-part introduction to Obsidian for research workflows."
    href: "/intro-to-obsidian/"
    language: "Web"
  - name: "Open Coding"
    blurb: "Browser-based open-coding tool for qualitative analysis."
    href: "/open-coding.html"
    language: "Web"
  - name: "Captionizer"
    blurb: "Caption helper for research videos and lecture content."
    href: "/captionizer.html"
    language: "Web"
  - name: "Countdown"
    blurb: "Lightweight in-class countdown timer."
    href: "/countdown.html"
    language: "Web"
```

- [ ] **Step 15: Create `src/content/news/2026-05-13-v2v-r-package.md`**

```markdown
---
date: 2026-05-13
title: "v2v R package goes live"
tags: ["tools", "open-science"]
---

The companion R package for *Vibes to Variables* — the lab's open data-literacy
textbook — is now live on GitHub. The package wraps a 22-million-row 2018 Twitch
chat-and-stream corpus behind a learner-friendly API so undergraduates can do real
analysis without first fighting a dataset.
```

- [ ] **Step 16: Create `src/content/news/2026-04-25-ics-submission.md`**

```markdown
---
date: 2026-04-25
title: "Platform Flattening of Gendered Affect submitted to ICS"
tags: ["manuscript"]
---

The sole-led manuscript *The Platform Flattening of Gendered Affect* — a
computational-feminist STM analysis of 82,623 pandemic remote-work tweets — has
been submitted to *Information, Communication & Society*.
```

- [ ] **Step 17: Create `src/content/news/2026-04-09-twitch-tag-submission.md`**

```markdown
---
date: 2026-04-09
title: "Check the Twitch Tag submitted to Convergence"
tags: ["manuscript"]
---

The next manuscript out of the Twitch identity-tags thread is under review at
*Convergence* (CON-26-0451).
```

- [ ] **Step 18: Create `src/content/news/2025-09-11-nsf-future-core.md`**

```markdown
---
date: 2025-09-11
title: "NSF Future CoRe proposal submitted"
tags: ["grant"]
---

A sole-PI proposal to NSF 25-543 Future CoRe — *Reciprocal Human-Machine
Learning*, $477K over four years — has been submitted. Decision window: June to
August 2026.
```

- [ ] **Step 19: Create `src/content/news/2025-08-15-tenure-promotion.md`**

```markdown
---
date: 2025-08-15
title: "Tenure and promotion to Associate Professor"
tags: ["personal"]
---

Tenure granted and rank changed to Associate Professor of Mass Communications at
SIUE. The lab continues under its updated name as AURA Lab.
```

- [ ] **Step 20: Create seed `src/content/publications/pubs.yaml`**

This file is intentionally seeded with placeholders that the director will fill in from the canonical Paper Tracker. Include **only** entries that are public-facing (DOI, preprint URL, or accepted-in-press). At minimum, populate one stub per research area so the page is not empty.

```yaml
entries:
  - title: "Asymmetric Ties in Networked Publics"
    authors: ["Alex P. Leith"]
    venue: "New Media & Society"
    year: 2026
    status: "in-press"
    areas: ["streaming", "methods"]
    featured: true
  - title: "Co-Play: When Watching Isn't Enough"
    authors: ["Alex P. Leith"]
    venue: "Journal of Gaming & Virtual Worlds"
    year: 2025
    status: "published"
    areas: ["streaming"]
    featured: true
  - title: "Virtual Touch-Up: Impression Management in Videoconferencing"
    authors: ["[BMS team]", "Alex P. Leith"]
    venue: "Behaviour & Information Technology"
    year: 2025
    status: "published"
    areas: ["meetings"]
  - title: "Dreaming a Virtual Reality: VRChat as Interpersonal Space During COVID"
    authors: ["Alex P. Leith"]
    venue: "International Journal of Communication"
    year: 2024
    status: "published"
    areas: ["virtual-environments"]
    featured: true
```

> **Maintenance note (not a step):** the director will replace this seed file with the full set of 24 published works from the Paper Tracker before launch. The schema enforces that any in-flight entry without a DOI / preprint / in-press status will fail Zod validation.

- [ ] **Step 21: Verify content loads**

```bash
npm run check
npm run build
```

Expected: `astro check` reports 0 errors, build emits `dist/`. Content collection errors (Zod validation failures) would surface here.

- [ ] **Step 22: Commit**

```bash
git add -A
git commit -m "feat(content): collection schemas and seed data"
```

---

## Task 5: Hero component + Home page

**Files:**
- Create: `src/components/Hero.astro`, `src/components/SectionDivider.astro`, `src/components/WordReveal.astro`, `src/components/ResearchAreaCard.astro`, `src/components/PubItem.astro`
- Modify: `src/pages/index.astro`
- Copy: `E:\Projects\SIM-DAD\SIM-DAD.github.io\images\ap-headshot-512.png` → `public/img/ap-headshot-512.png`
- Move: existing `img/aura-mark.svg` and `img/aura-mark.png` → `public/img/`

- [ ] **Step 1: Move static assets into public/**

```bash
mkdir -p public/img
cp "img/aura-mark.svg" public/img/aura-mark.svg
cp "img/aura-mark.png" public/img/aura-mark.png
cp "E:/Projects/SIM-DAD/SIM-DAD.github.io/images/ap-headshot-512.png" public/img/ap-headshot-512.png
cp "img/aura-mark.svg" public/favicon.svg
```

- [ ] **Step 2: Create `src/components/WordReveal.astro`**

```astro
---
interface Props { text: string; as?: 'h1' | 'h2' | 'p'; className?: string; }
const { text, as = 'h1', className = '' } = Astro.props;
const words = text.split(/(\s+)/);
const Tag = as;
---
<Tag class={`word-reveal ${className}`}>
  {words.map((w, i) => (
    <span class="word" style={`--i:${i}`}>{w}</span>
  ))}
</Tag>

<style>
  .word-reveal { display: inline-block; }
  .word {
    display: inline-block;
    opacity: 0;
    transform: translateY(0.5em);
    animation: rise 700ms var(--ease-out) forwards;
    animation-delay: calc(var(--i) * 60ms + 120ms);
  }
  @keyframes rise {
    to { opacity: 1; transform: translateY(0); }
  }
  @media (prefers-reduced-motion: reduce) {
    .word { opacity: 1; transform: none; animation: none; }
  }
</style>
```

- [ ] **Step 3: Create `src/components/Hero.astro`**

```astro
---
interface Props { tagline?: string; }
const { tagline = 'Where digital presence becomes research.' } = Astro.props;
---
<section class="hero" aria-label="AURA Lab">
  <div class="wash" aria-hidden="true"></div>

  <div class="hero-inner container-page">
    <div class="mark-wrap">
      <svg class="aura-ring" viewBox="0 0 600 600" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="arcFade" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#7C3AED" stop-opacity="0.9"/>
            <stop offset="100%" stop-color="#7C3AED" stop-opacity="0.15"/>
          </linearGradient>
        </defs>
        <circle cx="300" cy="300" r="240" stroke="#F0ECE8" stroke-opacity="0.18" stroke-width="1" />
        <circle cx="300" cy="300" r="218" stroke="#F0ECE8" stroke-opacity="0.08" stroke-width="1" />
        <path d="M 300 60 A 240 240 0 0 1 540 300" stroke="url(#arcFade)" stroke-width="1.5" stroke-linecap="round" />
      </svg>
      <h1 class="wordmark" aria-label="AURA Lab">AURA</h1>
      <span class="lab-tag" aria-hidden="true">Lab</span>
    </div>

    <p class="tagline">{tagline.split('research').map((part, i, arr) => (
      <>
        {part}
        {i < arr.length - 1 && <span class="accent">research</span>}
      </>
    ))}</p>

    <p class="full-name">Avatars · Users · Relationships · Affect</p>

    <a href="#below" class="scroll-cue" aria-label="Scroll to content">
      <span aria-hidden="true">↓</span>
    </a>
  </div>
</section>

<style>
  .hero {
    position: relative;
    min-height: 100vh;
    display: flex; align-items: center; justify-content: center;
    overflow: hidden;
    isolation: isolate;
  }
  .wash {
    position: absolute; inset: -10%;
    background:
      radial-gradient(circle at var(--mx, 50%) var(--my, 38%),
        rgba(124, 58, 237, 0.18), transparent 55%);
    pointer-events: none;
    z-index: -1;
    transition: background-position 0s;
  }
  .hero-inner {
    text-align: center;
    display: flex; flex-direction: column; align-items: center;
    gap: 1.5rem;
    padding: 4rem 0;
  }
  .mark-wrap {
    position: relative;
    display: inline-grid;
    place-items: center;
    padding: 1rem 0;
  }
  .aura-ring {
    position: absolute;
    width: clamp(280px, 60vw, 560px);
    aspect-ratio: 1;
    opacity: 0.55;
  }
  .wordmark {
    font-family: theme('fontFamily.display');
    font-weight: 900;
    font-size: clamp(96px, 18vw, 280px);
    line-height: 0.92;
    letter-spacing: 0.02em;
    margin: 0;
    position: relative;
    z-index: 1;
  }
  .lab-tag {
    display: block;
    font-family: theme('fontFamily.sans');
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.32em;
    color: var(--muted);
    margin-top: 0.4rem;
  }
  .tagline {
    font-family: theme('fontFamily.display');
    font-weight: 400;
    font-size: clamp(20px, 2.2vw, 30px);
    color: var(--text);
    max-width: 28ch;
  }
  .tagline .accent { color: var(--violet); font-style: italic; }
  .full-name {
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: 0.28em;
    font-size: 0.8rem;
  }
  .scroll-cue {
    margin-top: 2rem;
    color: var(--muted);
    font-size: 1.2rem;
    animation: bob 2.4s ease-in-out infinite;
  }
  @keyframes bob {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(6px); }
  }
</style>

<script>
  const wash = document.querySelector('.hero .wash');
  const hero = document.querySelector('.hero');
  if (wash && hero && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let raf = 0;
    hero.addEventListener('pointermove', (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = (hero as HTMLElement).getBoundingClientRect();
        const x = ((e as PointerEvent).clientX - rect.left) / rect.width * 100;
        const y = ((e as PointerEvent).clientY - rect.top) / rect.height * 100;
        (wash as HTMLElement).style.setProperty('--mx', `${x}%`);
        (wash as HTMLElement).style.setProperty('--my', `${y}%`);
      });
    });
  }
</script>
```

- [ ] **Step 4: Create `src/components/SectionDivider.astro`**

```astro
---
interface Props { kicker?: string; title: string; }
const { kicker, title } = Astro.props;
---
<header class="divider container-page">
  {kicker && <p class="kicker">{kicker}</p>}
  <h2 class="title">{title}</h2>
</header>

<style>
  .divider {
    padding: 6rem 0 2rem;
    position: relative;
  }
  .divider::before {
    content: "";
    position: absolute;
    inset: 0 0 auto 0;
    height: 1px;
    background: linear-gradient(to right,
      transparent,
      rgba(124, 58, 237, 0.35) 20%,
      rgba(124, 58, 237, 0.35) 80%,
      transparent);
  }
  .kicker {
    color: var(--muted);
    font-size: 0.78rem;
    text-transform: uppercase;
    letter-spacing: 0.22em;
    margin-bottom: 0.6rem;
  }
  .title {
    font-family: theme('fontFamily.display');
    font-weight: 900;
    font-size: clamp(40px, 5vw, 72px);
    line-height: 1.05;
    margin: 0;
    letter-spacing: 0.02em;
  }
</style>
```

- [ ] **Step 5: Create `src/components/ResearchAreaCard.astro`**

```astro
---
interface Props { word: string; blurb: string; href: string; }
const { word, blurb, href } = Astro.props;
---
<a class="card area" href={href}>
  <span class="word">{word}</span>
  <p>{blurb}</p>
  <span class="arr" aria-hidden="true">↗</span>
</a>

<style>
  .area {
    display: grid;
    gap: 1rem;
    padding: 2rem;
    min-height: 240px;
    position: relative;
    overflow: hidden;
  }
  .word {
    font-family: theme('fontFamily.display');
    font-weight: 900;
    font-size: clamp(36px, 4vw, 56px);
    color: var(--text);
    line-height: 1;
  }
  .area p {
    color: var(--muted);
    max-width: 36ch;
  }
  .arr {
    position: absolute;
    top: 1.25rem; right: 1.5rem;
    color: var(--violet);
    transition: transform 250ms var(--ease-out);
  }
  .area:hover .arr { transform: translate(2px, -2px); }
</style>
```

- [ ] **Step 6: Create `src/components/PubItem.astro`**

```astro
---
interface Props {
  title: string;
  authors: string[];
  venue: string;
  year: number;
  doi?: string;
  preprint?: string;
  status: 'published' | 'in-press' | 'preprint';
  areas: string[];
}
const { title, authors, venue, year, doi, preprint, status, areas } = Astro.props;
const link = doi ?? preprint;
const authorsRendered = authors.map(a => a.includes('Leith') ? `<strong>${a}</strong>` : a).join(', ');
---
<article class="pub" data-areas={areas.join(' ')}>
  <h3 class="pub-title">
    {link ? <a class="link-underline" href={link}>{title}</a> : title}
  </h3>
  <p class="meta">
    <span set:html={authorsRendered} />
    <span class="dot">·</span>
    <em>{venue}</em>
    <span class="dot">·</span>
    {year}
    {status === 'in-press' && <span class="badge">In press</span>}
    {status === 'preprint' && <span class="badge">Preprint</span>}
  </p>
  {doi && <p class="doi">{doi.replace('https://doi.org/', 'doi:')}</p>}
</article>

<style>
  .pub { padding: 1.25rem 0; border-bottom: 1px solid rgba(255,255,255,0.06); }
  .pub-title {
    font-family: theme('fontFamily.display');
    font-weight: 600;
    font-size: clamp(20px, 2vw, 26px);
    line-height: 1.25;
    margin: 0 0 0.4rem;
  }
  .meta { color: var(--muted); margin: 0; }
  .meta .dot { margin: 0 0.5rem; opacity: 0.7; }
  .badge {
    display: inline-block;
    margin-left: 0.6rem;
    padding: 0.1rem 0.5rem;
    border: 1px solid var(--violet);
    color: var(--violet);
    border-radius: 999px;
    font-size: 0.72rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }
  .doi {
    font-family: theme('fontFamily.mono');
    font-size: 0.82rem;
    color: var(--muted);
    margin: 0.4rem 0 0;
  }
</style>
```

- [ ] **Step 7: Rewrite `src/pages/index.astro`**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Hero from '../components/Hero.astro';
import SectionDivider from '../components/SectionDivider.astro';
import ResearchAreaCard from '../components/ResearchAreaCard.astro';
import PubItem from '../components/PubItem.astro';
import { getCollection, getEntry } from 'astro:content';

const pubsEntry = await getEntry('publications', 'pubs');
const recentPubs = [...pubsEntry!.data.entries]
  .filter(p => p.featured || p.status === 'published')
  .sort((a, b) => b.year - a.year)
  .slice(0, 3);

const areas = [
  { word: 'Presence', blurb: 'How identity and connection form in VR, streams, and shared virtual rooms.', href: '/research/#virtual-environments' },
  { word: 'Platform',  blurb: 'How affordances and platforms shape what speech, performance, and audiences can be.', href: '/research/#streaming' },
  { word: 'Affect',    blurb: 'Sentiment, mood, and emotion at corpus scale — and the methods to measure them honestly.', href: '/research/#methods' },
];
---
<BaseLayout title="AURA Lab" current="home">
  <Hero />

  <a id="below" tabindex="-1"></a>

  <SectionDivider kicker="Three research threads" title="Presence. Platform. Affect." />
  <section class="container-page grid gap-6 md:grid-cols-3">
    {areas.map(a => <ResearchAreaCard {...a} />)}
  </section>

  <SectionDivider kicker="Recent" title="What's been published." />
  <section class="container-page">
    <div class="max-w-3xl">
      {recentPubs.map(p => <PubItem {...p} />)}
    </div>
    <p class="mt-8">
      <a href="/publications/" class="link-underline text-violet">All publications →</a>
    </p>
  </section>

  <SectionDivider kicker="Join" title="The first conversation is short." />
  <section class="container-page">
    <p class="max-w-measure text-lg">
      Students and researchers — at SIUE and anywhere else — are welcome to bring a
      question, an interest, or a dataset. The first conversation is about whether a
      project is workable and where the friction will be, not about whether the idea
      is good enough.
    </p>
    <p class="mt-6">
      <a href="mailto:aleith@siue.edu" class="link-underline text-violet">aleith@siue.edu →</a>
      <span class="ml-6 text-muted">or</span>
      <a href="/join/" class="link-underline ml-6">Read the longer pitch →</a>
    </p>
  </section>
</BaseLayout>
```

- [ ] **Step 8: Verify**

```bash
npm run build
npm run dev
```

Open http://localhost:4321/ . Verify:
- Hero shows AURA wordmark, ring + violet arc, tagline with "research" in violet italic.
- Moving the mouse over the hero shifts the violet radial wash.
- Three area cards visible below; each card hovers with a 2px lift.
- Recent publications block lists the featured + published items.
- Footer present.
- DevTools console: no errors.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat(home): hero, section dividers, area cards, recent pubs"
```

---

## Task 6: Research page

**Files:**
- Create: `src/pages/research/index.astro`, `src/components/ProjectCard.astro`

- [ ] **Step 1: Create `src/components/ProjectCard.astro`**

```astro
---
interface Props {
  title: string;
  blurb: string;
  status: 'active' | 'collecting' | 'wrapping';
  links?: { label: string; href: string }[];
}
const { title, blurb, status, links = [] } = Astro.props;
const statusLabel = { active: 'Active', collecting: 'Collecting data', wrapping: 'Wrapping up' }[status];
---
<article class="card p-6">
  <header class="flex items-baseline justify-between gap-4">
    <h3 class="font-display text-2xl">{title}</h3>
    <span class="text-xs uppercase tracking-ui text-muted">{statusLabel}</span>
  </header>
  <p class="mt-3 text-muted">{blurb}</p>
  {links.length > 0 && (
    <ul class="mt-4 flex flex-wrap gap-4 text-sm">
      {links.map(l => <li><a class="link-underline text-violet" href={l.href}>{l.label} ↗</a></li>)}
    </ul>
  )}
</article>
```

- [ ] **Step 2: Create `src/pages/research/index.astro`**

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import SectionDivider from '../../components/SectionDivider.astro';
import ProjectCard from '../../components/ProjectCard.astro';
import PubItem from '../../components/PubItem.astro';
import { getCollection, getEntry } from 'astro:content';

const areas = (await getCollection('research-areas')).sort((a, b) => a.data.order - b.data.order);
const projects = await getCollection('projects');
const pubsEntry = await getEntry('publications', 'pubs');
const pubs = pubsEntry!.data.entries;
---
<BaseLayout title="Research" current="research"
  description="AURA Lab research threads — virtual environments, streaming platforms, computational methods, and virtual meetings.">

  <section class="container-page pt-24 pb-8">
    <p class="text-muted uppercase tracking-ui text-sm">What the lab studies</p>
    <h1 class="font-display text-5xl md:text-7xl mt-4 leading-none">Research at AURA Lab.</h1>
    <p class="mt-8 max-w-measure text-lg text-muted">
      Four threads, one orientation: take the lived experience of platforms, games,
      and virtual worlds seriously as social phenomena, and bring methods to the
      questions that actually arise there.
    </p>
  </section>

  {areas.map(async (area) => {
    const { Content } = await area.render();
    const areaProjects = projects.filter(p => p.data.area === area.data.area);
    const areaPubs = pubs.filter(p => p.areas.includes(area.data.area as any)).slice(0, 3);
    return (
      <article id={area.data.slug}>
        <SectionDivider kicker={`Thread 0${area.data.order}`} title={area.data.title} />
        <div class="container-page grid lg:grid-cols-[1fr_2fr] gap-12">
          <div>
            <p class="text-lg max-w-measure">{area.data.blurb}</p>
            <div class="prose-area mt-6 text-muted max-w-measure">
              <Content />
            </div>
          </div>
          <div class="grid gap-4">
            <h3 class="text-xs uppercase tracking-ui text-muted">Active projects</h3>
            {areaProjects.length === 0 && <p class="text-muted">More soon.</p>}
            {areaProjects.map(p => <ProjectCard {...p.data} />)}

            {areaPubs.length > 0 && (
              <>
                <h3 class="text-xs uppercase tracking-ui text-muted mt-6">Representative publications</h3>
                <div>
                  {areaPubs.map(p => <PubItem {...p} />)}
                </div>
              </>
            )}
          </div>
        </div>
      </article>
    );
  })}
</BaseLayout>

<style>
  .prose-area :global(p) { margin: 0.8em 0; }
</style>
```

- [ ] **Step 3: Verify**

```bash
npm run build
npm run dev
```

Open http://localhost:4321/research/ . Verify all four threads render with blurb, body paragraph, project cards, and (where present) representative publications. Each section has its own anchor — confirm `/research/#streaming` scrolls correctly.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(research): four-thread research page driven by collections"
```

---

## Task 7: People page

**Files:**
- Create: `src/pages/people/index.astro`

- [ ] **Step 1: Create `src/pages/people/index.astro`**

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import SectionDivider from '../../components/SectionDivider.astro';
import { getEntry } from 'astro:content';

const director = (await getEntry('people', 'director'))!.data;
---
<BaseLayout title="People" current="people"
  description="People at AURA Lab — directed by Dr. Alex P. Leith, with ongoing recruitment.">

  <section class="container-page pt-24 pb-8">
    <p class="text-muted uppercase tracking-ui text-sm">Who runs the lab</p>
    <h1 class="font-display text-5xl md:text-7xl mt-4 leading-none">People.</h1>
  </section>

  <section class="container-page mt-12 grid md:grid-cols-[260px_1fr] lg:grid-cols-[300px_1fr] gap-10 lg:gap-16">
    <div>
      <div class="headshot-wrap">
        <img src={director.headshot} alt={director.headshotAlt} width="512" height="512" loading="eager" />
      </div>
    </div>
    <div>
      <h2 class="font-display text-4xl md:text-5xl leading-tight">{director.name}</h2>
      <ul class="mt-3 text-muted text-sm uppercase tracking-ui space-y-1">
        {director.titles.map(t => <li>{t}</li>)}
      </ul>
      <div class="mt-6 max-w-measure text-lg" set:html={renderMarkdown(director.bio)} />
      <ul class="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
        <li><a class="link-underline text-violet" href={director.links.cv}>Curriculum vitae ↗</a></li>
        <li><a class="link-underline text-violet" href={`mailto:${director.links.email}`}>{director.links.email} ↗</a></li>
        <li><a class="link-underline text-violet" href={director.links.orcid}>ORCID ↗</a></li>
        <li><a class="link-underline text-violet" href={director.links.website}>{director.links.website.replace('https://', '')} ↗</a></li>
        {director.links.github.map(g => (
          <li><a class="link-underline text-violet" href={g.href}>github.com/{g.label} ↗</a></li>
        ))}
      </ul>
    </div>
  </section>

  <SectionDivider kicker="Students & collaborators" title="Currently recruiting." />
  <section class="container-page max-w-measure text-lg">
    <p>
      AURA Lab is open to students and researchers from any institution — at SIUE,
      across the consortium, or anywhere else. Available paths include empirical
      work on existing corpora (Twitch chat, VRChat tweets, pandemic remote-work
      tweets), methods + tool building, conference co-authorship, and — for SIUE
      students specifically — URCA mentoring and MA thesis chairing or committee
      work.
    </p>
    <p class="mt-6">
      <a href="/join/" class="link-underline text-violet">How to join →</a>
    </p>
  </section>
</BaseLayout>

<style>
  .headshot-wrap {
    position: relative;
    aspect-ratio: 1;
    border-radius: var(--radius-card);
    overflow: hidden;
    background: var(--surface);
    box-shadow: 0 0 0 1px rgba(255,255,255,0.06),
                0 30px 80px -20px rgba(124,58,237,0.35);
  }
  .headshot-wrap::after {
    content: "";
    position: absolute; inset: 0;
    background: radial-gradient(120% 80% at 30% 20%, rgba(124,58,237,0.10), transparent 60%);
    pointer-events: none;
  }
  .headshot-wrap img { width: 100%; height: 100%; object-fit: cover; display: block; }
</style>

<script>
  function renderMarkdown(s: string): string { return s; }
</script>
```

Note: the inline `renderMarkdown` placeholder is replaced in Step 2.

- [ ] **Step 2: Replace the bio rendering with proper markdown**

The `set:html` call needs real markdown rendering. Astro's content collections don't render arbitrary markdown strings from YAML by default. Use `marked` for inline bio rendering.

Add `marked` to dependencies:

```bash
npm install marked
```

Then update the top of `src/pages/people/index.astro`:

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import SectionDivider from '../../components/SectionDivider.astro';
import { getEntry } from 'astro:content';
import { marked } from 'marked';

const director = (await getEntry('people', 'director'))!.data;
const bioHtml = marked.parse(director.bio);
---
```

And replace the bio line:

```astro
<div class="mt-6 max-w-measure text-lg space-y-4" set:html={bioHtml} />
```

Remove the bottom `<script>` tag with the placeholder `renderMarkdown`.

- [ ] **Step 3: Verify**

```bash
npm run build
npm run dev
```

Open http://localhost:4321/people/ . Verify the headshot loads at `/img/ap-headshot-512.png`, the violet vignette is visible behind it, titles are listed, bio paragraphs render with proper paragraph spacing, all four links resolve. Check that the headshot file is in `public/img/`.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(people): director page with headshot and bio"
```

---

## Task 8: Publications page with client-side filter

**Files:**
- Create: `src/pages/publications/index.astro`

- [ ] **Step 1: Create `src/pages/publications/index.astro`**

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import SectionDivider from '../../components/SectionDivider.astro';
import PubItem from '../../components/PubItem.astro';
import { getEntry } from 'astro:content';

const pubsEntry = await getEntry('publications', 'pubs');
const pubs = [...pubsEntry!.data.entries].sort((a, b) => b.year - a.year);

const filters = [
  { key: 'all', label: 'All' },
  { key: 'virtual-environments', label: 'Virtual Envs' },
  { key: 'streaming', label: 'Streaming' },
  { key: 'methods', label: 'Methods' },
  { key: 'meetings', label: 'Meetings' },
];
---
<BaseLayout title="Publications" current="publications"
  description="Public-facing publications from AURA Lab — peer-reviewed articles, preprints, and in-press works.">

  <section class="container-page pt-24 pb-8">
    <p class="text-muted uppercase tracking-ui text-sm">Articles, preprints, in-press</p>
    <h1 class="font-display text-5xl md:text-7xl mt-4 leading-none">Publications.</h1>
    <p class="mt-8 max-w-measure text-lg text-muted">
      This list includes only public-facing work — peer-reviewed articles, posted
      preprints, and accepted-in-press manuscripts. In-progress and under-review
      manuscripts appear only after they ship as preprints.
    </p>
  </section>

  <section class="container-page mt-10">
    <div class="flex flex-wrap gap-3" role="group" aria-label="Filter publications by area">
      {filters.map((f, i) => (
        <button class="pill" data-filter={f.key} aria-pressed={i === 0 ? 'true' : 'false'}>{f.label}</button>
      ))}
    </div>

    <div id="pub-list" class="mt-10 max-w-3xl">
      {pubs.map(p => <PubItem {...p} />)}
    </div>

    <p id="empty" class="hidden mt-6 text-muted">No publications in this area yet.</p>
  </section>
</BaseLayout>

<script>
  const buttons = document.querySelectorAll<HTMLButtonElement>('[data-filter]');
  const items = document.querySelectorAll<HTMLElement>('#pub-list > article');
  const empty = document.getElementById('empty');

  function apply(filter: string) {
    let shown = 0;
    items.forEach(el => {
      const areas = (el.dataset.areas ?? '').split(' ');
      const match = filter === 'all' || areas.includes(filter);
      el.style.display = match ? '' : 'none';
      if (match) shown += 1;
    });
    empty?.classList.toggle('hidden', shown > 0);
  }

  buttons.forEach(b => {
    b.addEventListener('click', () => {
      buttons.forEach(x => x.setAttribute('aria-pressed', 'false'));
      b.setAttribute('aria-pressed', 'true');
      apply(b.dataset.filter ?? 'all');
    });
  });
</script>
```

- [ ] **Step 2: Verify**

```bash
npm run build
npm run dev
```

Open http://localhost:4321/publications/ . Verify:
- All seed pubs render in reverse-chron order.
- Clicking each filter pill narrows the list by area; pressing "All" restores.
- `aria-pressed="true"` moves with the active pill.
- The "No publications" message appears only when an empty filter is selected (if seed data is sparse for one area).

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat(publications): filterable editorial list"
```

---

## Task 9: Tools page (research tools + teaching resources)

**Files:**
- Create: `src/pages/tools/index.astro`, `src/components/ToolCard.astro`

- [ ] **Step 1: Create `src/components/ToolCard.astro`**

```astro
---
interface Props { name: string; blurb: string; href: string; language: string; }
const { name, blurb, href, language } = Astro.props;
const external = href.startsWith('http');
---
<article class="card p-6">
  <header class="flex items-baseline justify-between gap-4">
    <h3 class="font-display text-2xl">
      <a class="link-underline" href={href} {...external ? { target: '_blank', rel: 'noopener' } : {}}>{name}</a>
    </h3>
    <span class="font-mono text-xs text-muted">{language}</span>
  </header>
  <p class="mt-3 text-muted">{blurb}</p>
  <p class="mt-4 text-sm">
    <a class="link-underline text-violet" href={href} {...external ? { target: '_blank', rel: 'noopener' } : {}}>
      {external ? 'Repository ↗' : 'Open ↗'}
    </a>
  </p>
</article>
```

- [ ] **Step 2: Create `src/pages/tools/index.astro`**

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import SectionDivider from '../../components/SectionDivider.astro';
import ToolCard from '../../components/ToolCard.astro';
import { getEntry } from 'astro:content';

const toolsData = (await getEntry('tools', 'tools'))!.data.entries;
const teachingData = (await getEntry('tools', 'teaching'))!.data.entries;
---
<BaseLayout title="Tools" current="tools"
  description="Open-source research tools and teaching resources from AURA Lab.">

  <section class="container-page pt-24 pb-8">
    <p class="text-muted uppercase tracking-ui text-sm">Open-source outputs</p>
    <h1 class="font-display text-5xl md:text-7xl mt-4 leading-none">Tools.</h1>
    <p class="mt-8 max-w-measure text-lg text-muted">
      Code, data, and teaching materials the lab maintains. Everything that can be
      open is.
    </p>
  </section>

  <SectionDivider kicker="Research tools" title="Code we use and share." />
  <section class="container-page grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    {toolsData.map(t => <ToolCard {...t} />)}
  </section>

  <SectionDivider kicker="Teaching resources" title="Classroom-tested tools." />
  <section class="container-page grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    {teachingData.map(t => <ToolCard {...t} />)}
  </section>
</BaseLayout>
```

- [ ] **Step 3: Verify**

```bash
npm run build
npm run dev
```

Open http://localhost:4321/tools/ . Verify both grids render. Click each Teaching Resource link — they should navigate to the legacy HTML at `/methodosync/`, `/intro-to-obsidian/`, `/open-coding.html`, `/captionizer.html`, `/countdown.html`. (The legacy files are still in the repo root; Astro's static build doesn't touch them, but GitHub Pages serves them at the same URLs.)

> **Static-output caveat:** Astro's `npm run build` writes only `dist/`. The legacy HTML files won't appear in `dist/`. To make local previews work, copy the legacy files into `dist/` during build (done in Task 14).

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(tools): research tools + teaching resources page"
```

---

## Task 10: News page

**Files:**
- Create: `src/pages/news/index.astro`, `src/components/NewsItem.astro`

- [ ] **Step 1: Create `src/components/NewsItem.astro`**

```astro
---
interface Props { date: Date; title: string; tags?: string[]; }
const { date, title, tags = [] } = Astro.props;
const formatted = date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
---
<article class="news-item">
  <time class="date font-mono text-sm text-muted" datetime={date.toISOString().slice(0,10)}>{formatted}</time>
  <div>
    <h3 class="font-display text-2xl leading-snug"><slot name="title-link">{title}</slot></h3>
    {tags.length > 0 && (
      <ul class="mt-1 flex gap-2 text-xs uppercase tracking-ui text-muted">
        {tags.map(t => <li>#{t}</li>)}
      </ul>
    )}
    <div class="mt-3 max-w-measure text-muted">
      <slot />
    </div>
  </div>
</article>

<style>
  .news-item {
    display: grid;
    grid-template-columns: 110px 1fr;
    gap: 1.5rem;
    padding: 1.5rem 0;
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }
  @media (max-width: 640px) {
    .news-item { grid-template-columns: 1fr; }
  }
</style>
```

- [ ] **Step 2: Create `src/pages/news/index.astro`**

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import NewsItem from '../../components/NewsItem.astro';
import { getCollection } from 'astro:content';

const news = (await getCollection('news'))
  .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
---
<BaseLayout title="News" current="news"
  description="Recent news, manuscripts, grants, and tools from AURA Lab.">

  <section class="container-page pt-24 pb-8">
    <p class="text-muted uppercase tracking-ui text-sm">What's new in the lab</p>
    <h1 class="font-display text-5xl md:text-7xl mt-4 leading-none">News.</h1>
  </section>

  <section class="container-page mt-10 max-w-3xl">
    {news.map(async (entry) => {
      const { Content } = await entry.render();
      return (
        <NewsItem date={entry.data.date} title={entry.data.title} tags={entry.data.tags}>
          <Content />
        </NewsItem>
      );
    })}
  </section>
</BaseLayout>
```

- [ ] **Step 3: Verify**

```bash
npm run build
npm run dev
```

Open http://localhost:4321/news/ . Verify five entries appear in reverse-chron order, dates rendered as monospace, tags inline.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(news): timeline page from content collection"
```

---

## Task 11: Join page

**Files:**
- Create: `src/pages/join/index.astro`

- [ ] **Step 1: Create `src/pages/join/index.astro`**

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import SectionDivider from '../../components/SectionDivider.astro';
---
<BaseLayout title="Join" current="join"
  description="Join AURA Lab — students and researchers from any institution welcome.">

  <section class="container-page pt-24 pb-8">
    <p class="text-muted uppercase tracking-ui text-sm">Work with the lab</p>
    <h1 class="font-display text-5xl md:text-7xl mt-4 leading-none">Join.</h1>
    <p class="mt-8 max-w-measure text-xl">
      Students and researchers — at SIUE and anywhere else — are welcome.
      Cross-institutional and remote collaboration are normal. The lab works on
      questions, not on credentials.
    </p>
  </section>

  <SectionDivider kicker="Common paths in" title="Where people plug in." />
  <section class="container-page grid lg:grid-cols-2 gap-x-12 gap-y-10 max-w-page">
    <article>
      <h3 class="font-display text-2xl">Empirical work on existing data</h3>
      <p class="mt-3 text-muted max-w-measure">
        The lab maintains restricted-access corpora on Twitch chat behavior, VRChat-
        adjacent Twitter discourse, and pandemic remote-work tweets. A focused
        research question on one of these is a common starting point — many
        projects produce a conference paper inside a single semester.
      </p>
    </article>
    <article>
      <h3 class="font-display text-2xl">Methods & tool building</h3>
      <p class="mt-3 text-muted max-w-measure">
        Active codebases in R, Python, and web stacks (SvelteKit, Next.js,
        TypeScript). TASS, GearOut, the v2v R package, the Mass Comm Careers
        Dashboard — all welcome contributors and student maintainers.
      </p>
    </article>
    <article>
      <h3 class="font-display text-2xl">Conference co-authorship</h3>
      <p class="mt-3 text-muted max-w-measure">
        ICA, NCA, DiGRA, Meaningful XR, AoIR, HICSS, CHI. Most students who work
        with the lab have at least one of these on their CV before they finish.
      </p>
    </article>
    <article>
      <h3 class="font-display text-2xl">SIUE-specific (URCA, MA work)</h3>
      <p class="mt-3 text-muted max-w-measure">
        For students at SIUE: undergraduate research through URCA across multiple
        departments (Mass Comm, Applied Communication Studies, Psychology,
        Integrative Studies), MA thesis chairing in Mass Comm, and committee work
        across the consortium.
      </p>
    </article>
  </section>

  <SectionDivider kicker="What the first conversation looks like" title="A workable question, honestly framed." />
  <section class="container-page max-w-measure text-lg">
    <p>
      Bring a question, an interest, or a dataset. The first conversation is about
      whether a project is workable and where the friction will be, not about
      whether the idea is "good enough." Most workable projects don't start fully
      formed — most start with something specific you noticed.
    </p>
  </section>

  <SectionDivider kicker="Reach out" title="Email is the fastest path." />
  <section class="container-page max-w-measure">
    <p class="text-lg">
      <a href="mailto:aleith@siue.edu" class="link-underline text-violet">aleith@siue.edu</a>
      — short messages are fine. A sentence on who you are, a sentence on what
      caught your interest, and a sentence on what you'd like to do is plenty.
    </p>
    <p class="mt-4 text-muted">
      Office hours and quick chats are scheduled through
      <a href="https://apleith.com" class="link-underline">apleith.com</a>.
    </p>
  </section>
</BaseLayout>
```

- [ ] **Step 2: Verify**

```bash
npm run build
npm run dev
```

Open http://localhost:4321/join/ . Verify the page reads as an open invitation (not SIUE-only), all four "paths in" cards render, the email CTA is prominent.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat(join): open invitation page"
```

---

## Task 12: Robots, favicon, social card

**Files:**
- Create: `public/robots.txt`

- [ ] **Step 1: Create `public/robots.txt`**

```
User-agent: *
Allow: /

Sitemap: https://aura-lab-siue.github.io/sitemap-index.xml
```

- [ ] **Step 2: Add sitemap integration**

```bash
npm install @astrojs/sitemap
```

Update `astro.config.mjs`:

```js
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://aura-lab-siue.github.io',
  output: 'static',
  integrations: [tailwind({ applyBaseStyles: false }), sitemap()],
  vite: { build: { cssMinify: 'lightningcss' } },
});
```

- [ ] **Step 3: Verify**

```bash
npm run build
```

Expected: `dist/sitemap-index.xml` and `dist/sitemap-0.xml` exist. `dist/robots.txt` exists.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(seo): sitemap + robots.txt"
```

---

## Task 13: 404 page

**Files:**
- Create: `src/pages/404.astro`

- [ ] **Step 1: Create `src/pages/404.astro`**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---
<BaseLayout title="Not found" description="Page not found at AURA Lab.">
  <section class="container-page py-32 text-center">
    <p class="text-muted uppercase tracking-ui text-sm">404</p>
    <h1 class="font-display text-6xl md:text-8xl mt-4 leading-none">Off the page.</h1>
    <p class="mt-8 max-w-measure mx-auto text-lg text-muted">
      That URL doesn't exist on the AURA Lab site. The pages that do:
    </p>
    <ul class="mt-8 flex flex-wrap gap-4 justify-center">
      <li><a class="pill" href="/">Home</a></li>
      <li><a class="pill" href="/research/">Research</a></li>
      <li><a class="pill" href="/people/">People</a></li>
      <li><a class="pill" href="/publications/">Publications</a></li>
      <li><a class="pill" href="/tools/">Tools</a></li>
      <li><a class="pill" href="/news/">News</a></li>
      <li><a class="pill" href="/join/">Join</a></li>
    </ul>
  </section>
</BaseLayout>
```

- [ ] **Step 2: Verify**

```bash
npm run build
```

Expected: `dist/404.html` exists. GitHub Pages serves this automatically for missing routes.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: 404 page"
```

---

## Task 14: Copy legacy pages into dist/ during build

**Files:**
- Create: `scripts/copy-legacy.mjs`
- Modify: `package.json` (postbuild hook)

Reason: Legacy HTML files (`methodosync/`, `intro-to-obsidian/`, `open-coding.html`, `captionizer.html`, `countdown.html`, `app_form.html`, `_archive/`) live in the repo root, not in `src/`. Astro's static output only includes what's in `src/pages/` and `public/`. For GitHub Pages to serve both Astro output and the legacy URLs from the same repo, we copy legacy files into `dist/` after each build.

- [ ] **Step 1: Create `scripts/copy-legacy.mjs`**

```js
import { cp, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');

const items = [
  'methodosync',
  'intro-to-obsidian',
  'open-coding.html',
  'captionizer.html',
  'countdown.html',
  'app_form.html',
  '_archive',
];

await mkdir(dist, { recursive: true });

for (const item of items) {
  const src = path.join(root, item);
  if (!existsSync(src)) {
    console.warn(`skip (not found): ${item}`);
    continue;
  }
  const dst = path.join(dist, item);
  await cp(src, dst, { recursive: true });
  console.log(`copied: ${item}`);
}
```

- [ ] **Step 2: Update `package.json` scripts**

Add `postbuild`:

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "postbuild": "node scripts/copy-legacy.mjs",
    "preview": "astro preview",
    "check": "astro check"
  }
}
```

- [ ] **Step 3: Verify**

```bash
npm run build
```

Expected output includes `copied: methodosync`, `copied: intro-to-obsidian`, etc. Check `dist/methodosync/index.html` and `dist/open-coding.html` exist.

```bash
npm run preview
```

Visit http://localhost:4321/methodosync/ and http://localhost:4321/open-coding.html — both should load the legacy content.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "build: copy legacy pages into dist/ via postbuild hook"
```

---

## Task 15: Motion One staggered reveals on page H1s

**Files:**
- Modify: `src/layouts/BaseLayout.astro` (add Motion One reveal script)

Heroes already use the CSS-driven WordReveal pattern. Apply Motion One to the H1 of every interior page for consistency.

- [ ] **Step 1: Add reveal script to BaseLayout**

Append, before `</body>`, in `src/layouts/BaseLayout.astro`:

```astro
<script>
  import { animate, stagger } from 'motion';

  function reveal() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const h1s = document.querySelectorAll<HTMLElement>('main h1');
    h1s.forEach(h1 => {
      if (h1.dataset.revealed) return;
      h1.dataset.revealed = '1';
      const words = h1.textContent?.trim().split(/(\s+)/) ?? [];
      h1.innerHTML = '';
      const spans: HTMLElement[] = [];
      for (const w of words) {
        const span = document.createElement('span');
        span.textContent = w;
        span.style.display = 'inline-block';
        span.style.opacity = '0';
        span.style.transform = 'translateY(0.4em)';
        h1.appendChild(span);
        if (w.trim()) spans.push(span);
      }
      animate(
        spans,
        { opacity: 1, transform: 'translateY(0)' },
        { duration: 0.7, delay: stagger(0.06, { startDelay: 0.1 }), easing: [0.2, 0.7, 0.2, 1] }
      );
    });
  }

  reveal();
  document.addEventListener('astro:page-load', reveal);
</script>
```

- [ ] **Step 2: Verify**

```bash
npm run build
npm run dev
```

Open http://localhost:4321/research/ , navigate via the nav to /people/, /publications/, /tools/, /news/, /join/ . Each page's H1 should reveal word-by-word once. Navigating back should not re-trigger on the same page session (because `data-revealed` is set; the View Transitions hook re-runs `reveal()` which is idempotent per element).

Test reduced motion: in DevTools → Rendering → emulate `prefers-reduced-motion: reduce`. H1s should appear instantly with no animation.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat(motion): staggered word reveal on interior H1s"
```

---

## Task 16: Remove legacy root HTML files superseded by new pages

**Files:**
- Delete: `about.html`, `team.html`, `research.html`, `projects.html`, `news.html`, `SIM-Lab-Design-Standard.md`
- Note: leave `methodosync/`, `intro-to-obsidian/`, `open-coding.html`, `captionizer.html`, `countdown.html`, `app_form.html`, `_archive/` in place — those are served via the postbuild copy.
- Note: leave the `img/`, `css/`, `js/`, `data/`, `sample-portfolios/`, `theories/`, `research-methods/`, `resume-cv/` directories in place for now — none are linked from the new site, but they may contain class materials still referenced externally. Plan a separate cleanup pass with the director before deleting.

- [ ] **Step 1: Verify these files are NOT linked from any new page**

```bash
grep -rn "about\.html\|team\.html\|research\.html\|projects\.html\|news\.html" src/ docs/superpowers/ || echo "no references"
```

Expected: `no references`. (The new pages live at `/research/`, `/people/`, `/news/` etc., not `*.html`.)

- [ ] **Step 2: Move superseded root files to `_archive/v1-pages/`**

```bash
mkdir -p _archive/v1-pages
mv about.html team.html research.html projects.html news.html SIM-Lab-Design-Standard.md _archive/v1-pages/
```

(Move, don't delete — they may still be useful as historical reference and the `_archive/` directory is copied into `dist/` by the postbuild script.)

- [ ] **Step 3: Verify**

```bash
npm run build
```

Expected: build still succeeds. `dist/_archive/v1-pages/about.html` exists. The new `/research/`, `/people/`, `/news/` routes resolve from Astro output.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: move superseded v1 pages to _archive/v1-pages/"
```

---

## Task 17: GitHub Actions deploy workflow

**Files:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Create `.github/workflows/deploy.yml`**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 2: Document deploy in README**

Update `README.md` "Deployment" section (append if missing):

```markdown
## Deployment

Pushes to `main` trigger `.github/workflows/deploy.yml`, which:

1. Checks out the repo
2. Installs dependencies with `npm ci`
3. Runs `npm run build` (which also runs the `postbuild` legacy-copy step)
4. Uploads `dist/` as a Pages artifact
5. Deploys via `actions/deploy-pages@v4`

The site serves at <https://aura-lab-siue.github.io>. A future migration to
`aura-lab.siue.edu` will add a `public/CNAME` once SIUE IT provisions the
subdomain.

**Repository settings required (one-time):** GitHub → Settings → Pages →
Source: "GitHub Actions".
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "ci: GitHub Actions deploy to GitHub Pages"
```

- [ ] **Step 4: After commit lands on main, manually verify in GitHub UI**

Confirm under Actions tab that the workflow runs and the deployment URL resolves to the new site. If the repo Settings → Pages source is not set to "GitHub Actions," set it once. (This is a settings step, not a code step — note it for the director.)

---

## Task 18: Final QA — accessibility, performance, link integrity

- [ ] **Step 1: Build and preview**

```bash
npm run build
npm run preview
```

- [ ] **Step 2: Manual page tour**

Open each URL in the preview server and confirm:

| URL | Expected |
|---|---|
| `/` | Hero, three area cards, recent pubs, recruiting CTA |
| `/research/` | Four threaded sections with project cards |
| `/people/` | Director with headshot + bio + links; recruiting note |
| `/publications/` | Filter pills + reverse-chron list |
| `/tools/` | Two grids: research tools + teaching resources |
| `/news/` | Reverse-chron timeline, 5 entries |
| `/join/` | Open invitation tone, mailto CTA |
| `/404.html` | (visit a bad URL) renders 404 page |
| `/methodosync/` | Legacy page loads |
| `/open-coding.html` | Legacy page loads |

- [ ] **Step 3: Browser DevTools — console must be clean**

For each page, open DevTools → Console. Confirm zero errors or warnings on a fresh load.

- [ ] **Step 4: Lighthouse audit**

In Chrome DevTools → Lighthouse, run a Performance + Accessibility + Best Practices + SEO audit against `/` and `/publications/` (the most JS-heavy page).

Targets: Performance ≥ 95, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95.

Common failures and remedies:
- LCP too slow → preload Fraunces in BaseLayout `<head>`: `<link rel="preload" as="font" href="/_astro/Fraunces-...woff2" type="font/woff2" crossorigin>` (the exact URL appears in `dist/` after build).
- Contrast warnings on `--muted` text — verify against the brief's WCAG-AA threshold; if a specific use fails, swap that instance to `--text` with `opacity: 0.7` to retain visual hierarchy but improve contrast.
- "Heading levels skip" — confirm every page has exactly one `<h1>` and the next level is `<h2>`.

- [ ] **Step 5: Keyboard nav check**

Tab through the home page from the top. Confirm:
- Skip link appears on first tab.
- Nav items receive a visible violet focus ring.
- Filter pills on `/publications/` are reachable and toggle via Enter or Space.
- All links have descriptive text (no "click here").

- [ ] **Step 6: Reduced-motion check**

DevTools → Rendering → emulate `prefers-reduced-motion: reduce`. Reload. Confirm:
- Hero violet wash does not track the mouse.
- H1 staggered reveal is replaced by an instant appearance.
- Scroll cue does not bob.

- [ ] **Step 7: Mobile viewport check**

DevTools → device toolbar → iPhone 14 Pro (390×844). Confirm:
- Top nav collapses (the nav `<ul>` is `hidden md:block` — the brand wordmark still shows; mobile nav is intentionally omitted in v1 because the page list is short. **If this is unacceptable**, add a mobile menu in a follow-up task — out of v1 scope per the spec's "flat navigation only" guidance.)
- Hero scales without horizontal scroll.
- Cards stack vertically.
- Headshot section stacks (image above text).

- [ ] **Step 8: Fix any issues surfaced by Steps 2–7, re-build, re-verify.**

For each issue found, commit a single targeted fix. Do not bundle unrelated fixes.

- [ ] **Step 9: Final commit if any fixes were made**

```bash
git add -A
git commit -m "fix: QA pass adjustments"
```

- [ ] **Step 10: Tag the release**

```bash
git tag -a v2.0.0 -m "AURA Lab website v2.0.0 — initial full-site launch"
```

---

## Definition of done

- All 7 primary pages render at the URLs in the spec
- Build passes (`npm run build` exits 0)
- Type-check passes (`npm run check` exits 0)
- Lighthouse ≥ 95 across Performance / Accessibility / Best Practices / SEO on `/` and `/publications/`
- Headshot displays at `/img/ap-headshot-512.png`, sourced from the SIM-DAD repo
- Legacy URLs (`/methodosync/`, `/open-coding.html`, etc.) still resolve through the postbuild copy step
- GitHub Actions workflow deploys on push to `main` and the site is reachable at <https://aura-lab-siue.github.io>
- No console errors on any page
- All motion respects `prefers-reduced-motion`

---

*End of plan.*
