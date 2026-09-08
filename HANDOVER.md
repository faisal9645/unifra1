# UNIFRA PROPERTIES — PROJECT HANDOVER & CONTEXT

## 📌 Project Overview
**Unifra Properties** is an award-winning, interactive 3D luxury real estate web application showcasing high-end contemporary residential enclaves (such as MYSA Luxe Villas) in ECR Chennai, India.

- **GitHub Repository**: [https://github.com/faisal9645/unifra1.git](https://github.com/faisal9645/unifra1.git)
- **Branch**: `main` (Up-to-date)
- **Local Dev Command**: `npm run dev` (Runs on `http://localhost:3000/`)

---

## 🛠️ Tech Stack & Architecture
- **Framework**: React 19 + TypeScript + Vite 6
- **3D Graphics**: Three.js (`@types/three`, custom WebGL interactive villa & Coverflow carousel)
- **Styling**: TailwindCSS v4 + Custom Vanilla CSS Design System ([src/index.css](file:///c:/Users/karth/Desktop/unifra/unifra1/src/index.css))
- **Animations & Interaction**: Motion (`motion`), Lucide Icons (`lucide-react`), Canvas Confetti, Lenis Smooth Scroll
- **State & Storage**: Gated Villa Access Storage ([src/utils/leadsStorage.ts](file:///c:/Users/karth/Desktop/unifra/unifra1/src/utils/leadsStorage.ts)), `localStorage` for Day/Night Theme

---

## ✨ Implemented Features & Code Structure

### 1. Global Navigation & Header ([src/components/Navbar.tsx](file:///c:/Users/karth/Desktop/unifra/unifra1/src/components/Navbar.tsx))
- **Top-Level Links**: `PROJECTS`, `ABOUT US`, `LIFESTYLE`, `CONTACT`, `CRM (/admin)`
- **Portfolio Dropdown**: Contains `ALL PROJECTS`, `MYSA Luxe Villas`, `The Pearl Residences`, `Royal Palms Enclave`, `Serenity Manor`.
- **Day & Night Mode Toggle Button**: Interactive pill toggle in desktop header and mobile drawer. Toggles between Day Mode (light architectural theme) and Night Mode (dark obsidian theme).

### 2. Day & Night Mode Theme System ([src/App.tsx](file:///c:/Users/karth/Desktop/unifra/unifra1/src/App.tsx) & [src/index.css](file:///c:/Users/karth/Desktop/unifra/unifra1/src/index.css))
- Theme state persisted in `localStorage` (`unifra_theme`).
- Automatically syncs `body.theme-light` class on `document.body`.
- Full-site CSS rules override text colors, background cards, glassmorphism panels, form inputs, and Tailwind gradients seamlessly.

### 3. Full Container Layout Design
- All major components and subpages use fluid edge-to-edge container widths:
  `w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20`

### 4. Interactive 3D Stages
- **Interactive 3D Hero Villa** ([src/components/ThreeHeroVilla.tsx](file:///c:/Users/karth/Desktop/unifra/unifra1/src/components/ThreeHeroVilla.tsx)): Real-time WebGL rendering with clickable camera hotspots (Balcony, Infinity Pool, Double-Height Atrium, Biometric Portico).
- **Hero Overlay HUD** ([src/components/HeroOverlay.tsx](file:///c:/Users/karth/Desktop/unifra/unifra1/src/components/HeroOverlay.tsx)): Glassmorphic HUD overlay with quick actions (`EXPLORE MYSA`, `WATCH 3D TOUR`, `OUR STORY`).
- **3D Coverflow Gallery Carousel** ([src/components/ThreeCarousel.tsx](file:///c:/Users/karth/Desktop/unifra/unifra1/src/components/ThreeCarousel.tsx)): Architectural photo gallery with category filter chips (Facade, Living, Master Suite, Dining).

### 5. Main Editorial Sections ([src/components/EditorialSections.tsx](file:///c:/Users/karth/Desktop/unifra/unifra1/src/components/EditorialSections.tsx))
- 10 structured luxury architectural sections covering philosophy, flagship residences, Unifra standard, lifestyle features, and VIP private client advisory concierge.

### 6. Full Subpages Suite ([src/components/pages/](file:///c:/Users/karth/Desktop/unifra/unifra1/src/components/pages/))
- **About & Story Page** (`AboutStoryPage.tsx`): Chronicle, founder vision, tenets, capabilities, craftsmanship.
- **Our Team Page** (`OurTeamPage.tsx`): Executive team & master builders.
- **Signature Projects Portfolio** (`SignatureProjectsPage.tsx`): Filterable projects catalog.
- **Mysa Luxe Villas Detail Showcase** (`MysaDetailPage.tsx`): Detailed villa breakdown with gated registration modal (`VillaAccessModal.tsx`).
- **Contact Page** (`ContactPage.tsx`): Private advisory consultation form, studio address, VIP concierge channels.
- **Executive Admin Leads CRM** (`AdminLeadsPage.tsx` / `/admin`): Manage client registrations, export CSV, update lead statuses.

---

## 🚀 How to Continue in the Next Chat Session

Simply copy and paste the following prompt when you open your next chat window:

```text
Hi! I am continuing work on my web application "Unifra Properties".
Please read HANDOVER.md in the project root to load the full context, architecture, tech stack, and state of the project.
Let's continue building from here.
```
