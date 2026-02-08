# ⚔️ Warcraft III — The Epic Saga

A comprehensive, single-page web application dedicated to the lore, characters, factions, and campaigns of **Warcraft III: Reign of Chaos** and **The Frozen Throne**.

![Warcraft III](https://img.shields.io/badge/Warcraft-III-FFD700?style=for-the-badge&logo=battle.net&logoColor=white)
![React](https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Pages](#pages)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Build](#build)
- [Architecture](#architecture)
- [Accessibility](#accessibility)
- [Design System](#design-system)
- [Character Artwork Sources](#character-artwork-sources)
- [Credits](#credits)
- [License](#license)

---

## Overview

This project is a fully functional, multi-page web application that serves as an interactive encyclopedia for Warcraft III. It features a hash-based client-side router, real character artwork, interactive modals, filtering systems, and a 15-question knowledge quiz — all bundled into a single deployable HTML file.

---

## Features

- 🏠 **Landing Page** — Cinematic hero section with animated gradients and call-to-action buttons
- 📜 **Campaign Story** — Full narrative of both Reign of Chaos and The Frozen Throne with a visual timeline
- ⏳ **Interactive Timeline** — Scroll-animated, 21-event visual timeline spanning 10,000+ years across 4 eras with era filtering, click-to-expand event cards, and character artwork
- 🗺️ **Campaign Guide** — Tabbed strategy guide with faction-specific tips and a quick-reference comparison table
- 🛡️ **Faction Profiles** — Detailed pages for Alliance, Horde, Undead Scourge, and Night Elves with unit rosters
- 🧙 **Character Gallery** — 12 characters with real artwork, filterable by faction/role, and full-text search
- 📚 **WarcraftPedia** — 12-entry encyclopedia covering artifacts, locations, events, and organizations
- 🎬 **Cinematics & Videos** — YouTube video gallery of iconic Warcraft III cinematics organized by character with embedded player
- ❓ **Knowledge Quiz** — 15 multiple-choice lore questions with scoring, explanations, and full answer review
- 🖼️ **Real Character Art** — High-quality artwork from the HearthstoneJSON art API
- ♿ **Accessible** — ARIA roles, labels, keyboard navigation, and semantic HTML throughout
- 🌀 **Parallax Scrolling** — Multi-layer depth effects on all hero sections with floating decorative elements and scroll-based fade-out
- 📱 **Fully Responsive** — Mobile-first design that works on all screen sizes
- ⚡ **Single-File Build** — Entire app compiles into one `index.html` file via `vite-plugin-singlefile`

---

## Pages

| Route | Page | Description |
|-------|------|-------------|
| `#home` | **Home** | Landing page with hero section, featured characters, faction overview, and campaign teasers |
| `#story` | **Story** | Complete narrative of both campaigns presented in a visual timeline format |
| `#timeline` | **Timeline** | Interactive, scroll-animated timeline of 21 major events across 4 historical eras with filtering |
| `#guide` | **Campaign Guide** | Strategy tips organized by faction with tabbed navigation and reference table |
| `#factions` | **Factions** | Four faction cards with detailed modals containing lore, leaders, units, and strengths |
| `#characters` | **Characters** | Filterable/searchable grid of 12 characters with artwork and detail modals |
| `#pedia` | **WarcraftPedia** | Searchable encyclopedia with 12 entries across 4 categories |
| `#cinematics` | **Cinematics** | YouTube video gallery of iconic in-game cinematics organized by character |
| `#test` | **Knowledge Test** | Interactive 15-question quiz with progress tracking and results review |

---

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React 19** | UI component library |
| **TypeScript 5** | Type safety and developer experience |
| **Vite 7** | Build tool and dev server |
| **Custom CSS** | All styling (no CSS framework dependency) |
| **Font Awesome 6** | Icons (loaded via CDN) |
| **Google Fonts** | Typography — Abyssinica SIL (headings) + Raleway (body) |
| **HearthstoneJSON Art API** | Character artwork images |
| **vite-plugin-singlefile** | Bundles everything into a single HTML file |

---

## Project Structure

```
├── index.html                    # HTML entry point
├── package.json                  # Dependencies and scripts
├── tsconfig.json                 # TypeScript configuration
├── vite.config.ts                # Vite build configuration
├── README.md                     # This file
│
└── src/
    ├── main.tsx                  # React DOM entry point
    ├── App.tsx                   # Root component with hash-based router
    ├── index.css                 # All global styles (~2400 lines)
    │
    ├── components/
    │   ├── Navbar.tsx            # Shared navigation bar with dropdown
    │   └── Footer.tsx            # Shared footer with links and social icons
    │
    ├── data/
    │   ├── characters.ts         # Character data, faction colors, role labels
    │   └── factions.ts           # Faction data with lore, units, and strengths
    │
    ├── hooks/
    │   └── useParallax.ts        # Custom React hook for parallax scroll effects (multi-layer support)
    │
    ├── pages/
    │   ├── HomePage.tsx          # Landing page with hero, features, and CTAs
    │   ├── StoryPage.tsx         # Campaign narrative with visual timeline
    │   ├── TimelinePage.tsx      # Interactive timeline with 21 events, 4 eras, scroll animations
    │   ├── GuidePage.tsx         # Strategy guide with tabbed faction tips
    │   ├── FactionsPage.tsx      # Faction cards with detail modals
    │   ├── CharactersPage.tsx    # Character grid with filters and modals
    │   ├── PediaPage.tsx         # Encyclopedia with search and category filters
    │   ├── CinematicsPage.tsx   # YouTube video gallery of character cinematics
    │   └── TestPage.tsx          # Interactive quiz with scoring system
    │
    └── utils/
        └── cn.ts                 # Classname utility (clsx + tailwind-merge)
```

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd warcraft3-website

# Install dependencies
npm install

# Start development server
npm run dev
```

The dev server will start at `http://localhost:5173` (or the next available port).

### Development

```bash
npm run dev       # Start dev server with hot reload
npm run build     # Production build → dist/index.html
npm run preview   # Preview the production build locally
```

---

## Build

```bash
npm run build
```

This generates a single `dist/index.html` file that contains all JavaScript, CSS, and assets inlined. You can deploy this single file anywhere — no server required.

---

## Architecture

### Routing

The app uses a **hash-based client-side router** implemented in `App.tsx`. Navigation is handled by updating `window.location.hash` and listening for `hashchange` events. This approach:

- Works without a server-side router
- Supports direct linking to pages (e.g., `#characters`)
- Preserves browser back/forward navigation
- Updates the document title dynamically

### State Management

All state is managed with React's built-in `useState` and `useMemo` hooks. No external state management library is needed because:

- Each page manages its own local state (filters, modals, quiz progress)
- Shared data is imported from static TypeScript modules (`data/characters.ts`, `data/factions.ts`)
- Navigation state lives in the root `App` component

### Styling Architecture

The entire app is styled with **custom CSS** in `src/index.css`, organized into clear sections:

1. **Base / Reset** — Box-sizing, font defaults, body styles
2. **Layout Utilities** — Container, row, column grid system
3. **Navigation** — Fixed navbar, dropdown menus, mobile toggle
4. **Page Heroes** — Full-width hero banners with gradient backgrounds
5. **Components** — Buttons, forms, cards, tags, modals
6. **Page-Specific** — Styles scoped by page (Home, Story, Guide, etc.)
7. **Footer** — Site footer with links and social icons
8. **Responsive** — Mobile breakpoints at 767px and 991px

### Parallax Scrolling

All 8 pages feature **multi-layer parallax hero sections** powered by a custom `useParallax` hook (`src/hooks/useParallax.ts`):

- **`useParallax(speed)`** — Tracks scroll position and returns a Y-offset multiplied by the speed factor
- **`useParallaxLayers()`** — Provides refs for 3 depth layers (background 0.3×, midground 0.5×, foreground 0.15×) plus scroll-based opacity fade

Each hero section has:
- A **background layer** that scrolls slower than the page (creating depth)
- A **content layer** that scrolls slightly slower with opacity fade-out
- **Decorative floating elements** unique to each page (stars, runes, orbs, swords, books, question marks, hourglasses)
- **`will-change: transform`** for GPU-accelerated rendering
- **`@media (prefers-reduced-motion: reduce)`** to disable all animations for accessibility

### Image Strategy

Character and faction artwork is loaded from the **HearthstoneJSON Art API** (`art.hearthstonejson.com`), a public API hosting official Warcraft character paintings. Each image component includes:

- `loading="lazy"` for performance
- `onError` fallback showing gradient background with character initials
- `object-fit: cover` for consistent card sizing

---

## Accessibility

The application follows WAI-ARIA best practices:

- **`aria-current="page"`** on the active navigation link
- **`aria-label`** on all icon-only interactive elements (social links, close buttons)
- **`aria-hidden="true"`** on decorative icons (`<i>` elements)
- **`role="dialog"` and `aria-modal="true"`** on all modal overlays
- **`aria-labelledby`** connecting modal titles to their heading elements
- **`role="button"` and `tabIndex={0}`** on clickable card elements
- **Keyboard navigation** — all interactive elements are accessible via Tab and Enter keys
- **Focus management** — visible focus outlines on all focusable elements
- **Semantic HTML** — proper use of `<header>`, `<main>`, `<footer>`, `<nav>`, `<section>`

---

## Design System

### Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Alliance Blue | `#2f89fc` | Alliance faction, primary actions |
| Horde Red | `#c41e3a` | Horde faction |
| Undead Purple | `#8b5cf6` | Undead Scourge faction |
| Night Elf Green | `#10b981` | Night Elf faction |
| Warcraft Gold | `#ffd700` | Brand accent, headings, CTAs |
| Dark Navy | `#1a1a2e` | Backgrounds, navbar |
| Success Green | `#10b981` | Correct answers, positive states |
| Error Red | `#ef4444` | Wrong answers, negative states |
| Warning Amber | `#f59e0b` | Highlights, key moments |

### Typography

- **Headings:** Abyssinica SIL (serif) — evokes a fantasy/medieval aesthetic
- **Body:** Raleway (sans-serif) — clean and highly readable

---

## Character Artwork Sources

All character art is sourced from the [HearthstoneJSON Art API](https://hearthstonejson.com/):

| Character | Card ID | API Path |
|-----------|---------|----------|
| Arthas Menethil | `ICC_314` | `/v1/orig/ICC_314.png` |
| Thrall | `HERO_02` | `/v1/orig/HERO_02.png` |
| Jaina Proudmoore | `HERO_08` | `/v1/orig/HERO_08.png` |
| Tyrande Whisperwind | `HERO_09a` | `/v1/orig/HERO_09a.png` |
| Uther the Lightbringer | `HERO_04` | `/v1/orig/HERO_04.png` |
| Sylvanas Windrunner | `EX1_016` | `/v1/orig/EX1_016.png` |
| Malfurion Stormrage | `HERO_06` | `/v1/orig/HERO_06.png` |
| Grom Hellscream | `EX1_414` | `/v1/orig/EX1_414.png` |
| Kel'Thuzad | `FP1_013` | `/v1/orig/FP1_013.png` |
| Cairne Bloodhoof | `EX1_110` | `/v1/orig/EX1_110.png` |
| Illidan Stormrage | `EX1_614` | `/v1/orig/EX1_614.png` |
| Medivh | `HERO_08a` | `/v1/orig/HERO_08a.png` |

---

## Credits

- **Game:** Warcraft III: Reign of Chaos & The Frozen Throne by Blizzard Entertainment
- **Artwork:** Character art via [HearthstoneJSON](https://hearthstonejson.com/)
- **Icons:** [Font Awesome 6](https://fontawesome.com/)
- **Fonts:** [Google Fonts](https://fonts.google.com/) — Abyssinica SIL, Raleway

---

## License

This is a fan-made project for educational purposes. Warcraft III, its characters, lore, and artwork are the property of **Blizzard Entertainment**. This project is not affiliated with or endorsed by Blizzard Entertainment.

---

<p align="center">
  <em>"Now, we are one."</em> — Arthas Menethil
</p>
