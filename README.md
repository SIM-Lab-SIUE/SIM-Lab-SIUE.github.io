# SIM Lab @ SIUE

**Social & Interactive Media Lab — Southern Illinois University Edwardsville**

The SIM Lab is the academic research home of [Dr. Alex P. Leith](https://apleith.github.io), Associate Professor (Tenured) in the [Department of Mass Communications at SIUE](https://www.siue.edu/arts-and-sciences/mass-communications/about/leith.shtml). The lab produces peer-reviewed scholarship, open educational resources, and open-source tools in service of academic teaching and research.

> **Note on scope:** This organization covers academic and instructional work at SIUE. Industry consulting, applied data tools, and contract software live under [SIM-DAD LLC](https://github.com/SIM-DAD) separately.

**Live site:** [sim-lab-siue.github.io](https://sim-lab-siue.github.io)

---

## Research Areas

| Area | Focus |
|---|---|
| **Virtual Environments** | Social interaction in VR/XR, videoconferencing fatigue, remote work equity — including a $1.6M NSF grant with the [Beyond Meet Space](http://beyondmeet.space/) collective |
| **Gameplay & Livestreaming** | Parasocial relationships, avatar identity, community dynamics on Twitch and related platforms |
| **Human-Computer Interaction** | Design and evaluation of interactive systems for education, career planning, and qualitative research |

---

## Repository Structure

```
SIM-Lab-SIUE.github.io/
│
├── index.html              # Home page
├── about.html              # Lab overview, people, funding, publications
├── projects.html           # Project showcase
├── open-coding.html        # Grounded Theory Coding Studio (self-contained)
│
├── css/
│   └── style.css           # Color Field design system (no framework)
│
├── img/                    # Site images and assets
│
├── methodosync/            # MethodoSync — React/Vite/TypeScript app
│   ├── src/                # Source (components, hooks, store, utils)
│   ├── assets/             # Built assets (committed)
│   └── index.html          # Built entry point (committed)
│
├── research-methods/       # MC 451 OER textbook (Bookdown/R Markdown)
├── intro-to-obsidian/      # Multi-module Obsidian tutorial
├── theories/               # Comm Theory explorer (Parcel 2 + GSAP)
└── mc-careers-dashboard/   # Mass Comm Careers Dashboard (SvelteKit)
```

---

## Projects

### [Vibes to Variables](https://github.com/SIM-Lab-SIUE/vibes-to-variables)
An open educational resource guiding undergraduate Communication and Media Studies students through a complete research project — from hypothesis to reproducible study — using a real dataset of 1,792 songs. Built with Quarto.

### [mccoursepack](https://github.com/SIM-Lab-SIUE/mccoursepack)
Companion R package for MC-451 Research Methods at SIUE. Bundles *Vibes to Variables* textbook chapters, weekly assignment templates, and a curated music dataset (Billboard/Spotify/Genius).

### [MethodoSync](methodosync/)
Browser-based qualitative research tool for video annotation and codebook generation. Built with Vite + React 18 + TypeScript + Tailwind CSS. No server or account required.

### [Open Coding Studio](open-coding.html)
Self-contained, single-file Grounded Theory coding environment. Paste data, apply open codes, collapse to axial/selective codes, and export structured codebooks — no installation or backend.

### [MC Careers Dashboard](https://github.com/SIM-Lab-SIUE/mc-careers-dashboard)
Interactive SvelteKit dashboard mapping Mass Communications career paths, salary data, and skill requirements for student career planning.

### [Equipment Checkout](https://github.com/SIM-Lab-SIUE/equipment-checkout)
Web application for managing and reserving production equipment for SIUE Mass Communications students. Built with TypeScript.

### [Comm Theories Explorer](theories/)
Interactive GSAP-animated guide to common mass communication theories, designed to help students identify an appropriate theory for their research project.

### [Liaison Program](https://github.com/SIM-Lab-SIUE/liaison-program)
MC Research Methods course website for MC-451 at SIUE, including the mc451-liaison-program Obsidian vault integration.

### [Hate Raids](https://github.com/SIM-Lab-SIUE/hate-raids)
R-based data and analysis behind the peer-reviewed Hate Raids paper — examining coordinated harassment events on Twitch.

### [Banned Word Checker](https://github.com/SIM-Lab-SIUE/banned-word-checker)
Python tool for testing Word documents or PDF submissions against a list of prohibited terms — built for instructional and content-moderation use cases.

---

## Tech Stack

**Main site**
- Pure HTML5, vanilla CSS (CSS Grid / Flexbox / custom properties) — no framework
- [Syne](https://fonts.google.com/specimen/Syne) + [DM Sans](https://fonts.google.com/specimen/DM+Sans) via Google Fonts
- Font Awesome 6 for iconography
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
No build step required — edit HTML/CSS directly and open in a browser.

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
- **GitHub org:** [@SIM-Lab-SIUE](https://github.com/SIM-Lab-SIUE)
- **ORCID:** [0000-0003-1310-6763](https://orcid.org/0000-0003-1310-6763)
- **Personal/academic site:** [apleith.github.io](https://apleith.github.io)

> For industry consulting inquiries, see [SIM-DAD LLC](https://github.com/SIM-DAD).

---

&copy; 2025 SIM Lab @ SIUE — Southern Illinois University Edwardsville
