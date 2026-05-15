# AURA Lab

**Avatars, Users, Relationships, and Affect Lab — Southern Illinois University Edwardsville**

*Where digital presence becomes research.*

AURA Lab is a computational communication research group at SIUE that studies how people form relationships, perform identity, and experience affect across virtual environments, streaming platforms, and digital media. Directed by [Dr. Alex P. Leith](https://apleith.com), Associate Professor (Tenured) in the [Department of Mass Communications at SIUE](https://www.siue.edu/artsandsciences/mass-communications/). The lab produces peer-reviewed scholarship, open educational resources, and open-source tools.

> **Rebrand note:** AURA Lab is the May 2026 rebrand of the former *SIM Lab* (Social & Interactive Media Lab). The GitHub organization was renamed `SIM-Lab-SIUE` → `AURA-Lab-SIUE`; project repos retain their existing names and GitHub auto-redirects old URLs.

> **Note on scope:** This organization covers academic and instructional work at SIUE. Industry consulting, applied data tools, and contract software live under [SIM DAD LLC](https://github.com/SIM-DAD) separately.

**Live site:** [aura-lab-siue.github.io](https://aura-lab-siue.github.io) *(Coming Soon page live; full site in development through 2026. A future move to `aura-lab.siue.edu` is planned.)*

---

## Research Areas

| Area | Focus |
|---|---|
| **Virtual Environments** | Social interaction in VR/XR, videoconferencing fatigue, remote work equity — including a completed $1.6M NSF grant with the [Beyond Meet Space](http://beyondmeet.space/) collective |
| **Streaming Platforms** | Parasocial relationships, avatar identity, community dynamics on Twitch and related platforms |
| **Computational Methods** | Sentiment analysis, topic modeling, network analysis, and applied NLP for communication research (TASS and related toolchains) |
| **Virtual Meetings** | Design and study of synchronous mediated interaction in work and learning contexts |

---

## Repository Structure

```
AURA-Lab-SIUE.github.io/
│
├── index.html              # AURA Lab Coming Soon page (live)
├── img/
│   └── aura-mark.svg       # Aura ring favicon / icon mark
│
│   # Legacy SIM Lab pages — not linked from new index; awaiting rebrand
├── about.html
├── projects.html
├── team.html
├── research.html
├── news.html
├── open-coding.html        # Grounded Theory Coding Studio (self-contained)
│
├── css/
│   └── style.css           # Legacy SIM Lab styles; new identity uses inline CSS in index.html
│
├── methodosync/            # MethodoSync — React/Vite/TypeScript app
├── research-methods/       # MC 451 OER textbook (Bookdown/R Markdown)
├── intro-to-obsidian/      # Multi-module Obsidian tutorial
├── theories/               # Comm Theory explorer (Parcel 2 + GSAP)
└── mc-careers-dashboard/   # Mass Comm Careers Dashboard (SvelteKit)
```

---

## Projects

### [Vibes to Variables](https://github.com/AURA-Lab-SIUE/vibes-to-variables)
An open educational resource guiding undergraduate Communication and Media Studies students through a complete research project — from hypothesis to reproducible study — using a real dataset of 1,792 songs. Built with Quarto.

### [mccoursepack](https://github.com/AURA-Lab-SIUE/mccoursepack)
Companion R package for MC-451 Research Methods at SIUE. Bundles *Vibes to Variables* textbook chapters, weekly assignment templates, and a curated music dataset (Billboard/Spotify/Genius).

### [MethodoSync](methodosync/)
Browser-based qualitative research tool for video annotation and codebook generation. Built with Vite + React 18 + TypeScript + Tailwind CSS. No server or account required.

### [Open Coding Studio](open-coding.html)
Self-contained, single-file Grounded Theory coding environment. Paste data, apply open codes, collapse to axial/selective codes, and export structured codebooks — no installation or backend.

### [MC Careers Dashboard](https://github.com/AURA-Lab-SIUE/mc-careers-dashboard)
Interactive SvelteKit dashboard mapping Mass Communications career paths, salary data, and skill requirements for student career planning.

### [Equipment Checkout](https://github.com/AURA-Lab-SIUE/equipment-checkout)
Web application for managing and reserving production equipment for SIUE Mass Communications students. Built with TypeScript.

### [Comm Theories Explorer](theories/)
Interactive GSAP-animated guide to common mass communication theories, designed to help students identify an appropriate theory for their research project.

### [Liaison Program](https://github.com/AURA-Lab-SIUE/liaison-program)
MC Research Methods course website for MC-451 at SIUE, including the mc451-liaison-program Obsidian vault integration.

### [Hate Raids](https://github.com/AURA-Lab-SIUE/hate-raids)
R-based data and analysis behind the peer-reviewed Hate Raids paper — examining coordinated harassment events on Twitch.

### [Banned Word Checker](https://github.com/AURA-Lab-SIUE/banned-word-checker)
Python tool for testing Word documents or PDF submissions against a list of prohibited terms — built for instructional and content-moderation use cases.

---

## Identity System

The AURA Lab visual identity is documented in the [design brief](https://github.com/AURA-Lab-SIUE/.github) maintained by the lab director.

**Headline summary:**
- **Palette:** Deep Graphite (`#0E0E12`) primary background, Warm Chalk (`#F4F0EB`) light alternate, Aura Violet (`#7C3AED`) primary accent, Amber Signal (`#F59E0B`) secondary accent.
- **Typography:** [Fraunces](https://fonts.google.com/specimen/Fraunces) for display, [Instrument Sans](https://fonts.google.com/specimen/Instrument+Sans) for UI and body, [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) for code and metadata.
- **Mark:** AURA wordmark in heavy Fraunces, paired with a subtle radial element (the "aura ring") that reads as halo, aperture, and avatar selection indicator at once.

---

## Tech Stack

**Main site (current — Coming Soon page)**
- Pure HTML5, inline CSS (CSS Grid / Flexbox / custom properties) — no framework
- Fraunces + Instrument Sans + JetBrains Mono via Google Fonts
- Inline SVG for the aura mark and favicon
- Deployed via GitHub Pages from the `main` branch

**MethodoSync** (`methodosync/`)
- Vite 7 + React 18 + TypeScript
- Tailwind CSS v3, Zustand, Radix UI, ExcelJS, js-yaml
- Built output (`index.html` + `assets/`) committed to repo root; source lives in `src/`

**research-methods/**
- R Bookdown / R Markdown — static HTML textbook

**theories/**
- Parcel 2 + GSAP animations

---

## Development

### Main site
No build step required — edit `index.html` directly and open in a browser. All styles are inline in the head.

### MethodoSync
```bash
cd methodosync
npm install
npm run dev      # local dev server
npm run build    # build to methodosync/ root (commit index.html + assets/)
```

> **Note:** Vite root is `src/` to prevent the source `index.html` from being overwritten on build. The built `index.html` and `assets/` directory are committed alongside source.

---

## Contact

- **Email:** [aleith@siue.edu](mailto:aleith@siue.edu)
- **GitHub org:** [@AURA-Lab-SIUE](https://github.com/AURA-Lab-SIUE)
- **ORCID:** [0000-0003-1310-6763](https://orcid.org/0000-0003-1310-6763)
- **Director's site:** [apleith.com](https://apleith.com)

> For industry consulting inquiries, see [SIM DAD LLC](https://github.com/SIM-DAD).

---

&copy; 2026 AURA Lab — Southern Illinois University Edwardsville
