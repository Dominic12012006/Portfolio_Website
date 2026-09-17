# Dominic Thomas — Personal Portfolio

A personal portfolio website for **Dominic Thomas**, featuring a continuous spatial canvas, custom atmospheric visual regions, and an adapted integration of the React Bits Infinite Spiral as a decorative background.

---

## 1. Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (v15, App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with CSS custom properties
- **Typography**: [Geist](https://vercel.com/font) Sans & Mono loaded via `next/font/google`
- **Effects**: [React Bits Infinite Spiral](https://reactbits.dev/components/infinite-spiral) (adapted for non-interactive decorative background)
- **Deployment**: Zero-configuration deployment on [Vercel](https://vercel.com)

---

## 2. Getting Started Locally

### Prerequisites
- Node.js (v18+ recommended)
- npm, yarn, or pnpm

### Installation
```bash
# Clone the repository
git clone git@github.com:Dominic12012006/Portfolio_Website.git
cd Portfolio_Website

# Install dependencies
npm install
```

### Running Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building & Linting
```bash
# Run production build
npm run build

# Run linting
npm run lint
```

---

## 3. Deployment to Vercel

This repository is structured for zero-configuration continuous deployment on Vercel:
1. Push your changes to the `main` branch on GitHub.
2. Log into [Vercel](https://vercel.com).
3. Click **Add New Project** and import the `Portfolio_Website` repository.
4. Keep the default build settings (`npm run build`, output directory `.next`).
5. Click **Deploy**.

---

## 4. Architecture & Configuration Guide

All design tokens, layout parameters, routes, and asset registries are centralized so you never have to edit magic numbers or raw hex values in components.

### Routes Configuration
- **File**: [`data/routes.ts`](./data/routes.ts)
- Centralizes all internal routes:
  - `/`: Landing page canvas
  - `/build`: Build showcase (placeholder)
  - `/about`: About Me section (placeholder)
  - `/experience`: Experience gateway (placeholder)
  - `/socials`: Social links (placeholder)

### Navbar Items
- **File**: [`data/navigation.ts`](./data/navigation.ts)
- To rename, reorder, or add navbar links, edit the `NAV_ITEMS` array.

### Layout Constants & Design Tokens
- **Design Tokens**: Defined as CSS custom properties in [`app/globals.css`](./app/globals.css) and exposed through [`tailwind.config.ts`](./tailwind.config.ts).
  - `--background`: Deep neutral dark canvas (`#0a0a0c`)
  - `--foreground`: Crisp off-white (`#f4f4f6`)
  - `--accent`: Cinematic warm bronze/amber (`#d49b6a`)
- **Layout & Motion Tokens**: Configured in [`data/layout.ts`](./data/layout.ts):
  - Desktop panel width percentages (30% Left, 40% Center, 30% Right)
  - Side hover expansion percentage (`sideExpansion: 3%`)
  - Infinite Spiral parameters (speed, radius, perspective, card dimensions)
  - Scroll navigation wheel threshold (`wheelThreshold: 75`)

---

## 5. Visual Asset Management

### Where Assets Live
```
public/
├── images/
│   ├── build/            # Still images / SVG placeholders for Build
│   ├── about/            # Still images / SVG placeholders for About
│   └── spiral/           # Cards displayed in the Infinite Spiral background
└── animations/
    ├── build/            # Optional future intro animations (e.g. GIF/video)
    └── about/            # Optional future intro animations (e.g. GIF/video)
```

### How to Replace the Infinite Spiral Images
1. Place your images in `public/images/spiral/`.
2. Open [`data/spiralImages.ts`](./data/spiralImages.ts).
3. Update or append items in the `SPIRAL_IMAGES` array:
   ```typescript
   export const SPIRAL_IMAGES = [
     { id: "sp-1", src: "/images/spiral/my-photo-1.jpg", alt: "Description 1" },
     { id: "sp-2", src: "/images/spiral/my-photo-2.jpg", alt: "Description 2" },
     // ...
   ];
   ```

### How to Replace BUILD & ABOUT ME Visuals
1. Place your still image or intro animation in `public/images/build/`, `public/images/about/`, etc.
2. Open [`data/assets.ts`](./data/assets.ts).
3. Update `HOME_ASSETS`:
   ```typescript
   export const HOME_ASSETS = {
     build: {
       introSrc: "/animations/build/build-intro.gif", // Optional intro animation
       finalSrc: "/images/build/build-final.jpg",       // Settled still image
       alt: "Dominic Thomas — Build visual showcase",
     },
     about: {
       introSrc: "/animations/about/about-intro.gif",
       finalSrc: "/images/about/about-final.jpg",
       alt: "Dominic Thomas — About Me visual showcase",
     },
   };
   ```
   The `IntroVisual` component automatically plays the intro animation once and smoothly settles on the final still image.

---

## 6. Developing Future Pages Independently

Each major section has an independent, decoupled route:
- **Build Page**: [`app/build/page.tsx`](./app/build/page.tsx)
  - Data schema prepared in [`data/projects.ts`](./data/projects.ts) (`Project` interface with `title`, `description`, `technologies`, `demo`, `github`, etc.).
- **About Page**: [`app/about/page.tsx`](./app/about/page.tsx)
- **Experience Page**: [`app/experience/page.tsx`](./app/experience/page.tsx)
- **Socials Page**: [`app/socials/page.tsx`](./app/socials/page.tsx)

Modifying any of these pages will not impact the homepage spatial composition.

---

## 7. Interaction Model

- **Click Navigation**:
  - Clicking BUILD $\rightarrow$ navigates to `/build`
  - Clicking Center identity $\rightarrow$ navigates to `/experience` (unlabeled gateway)
  - Clicking ABOUT ME $\rightarrow$ navigates to `/about`
- **Desktop Scroll Navigation**:
  - Rolling the mouse wheel over BUILD, Center, or ABOUT ME triggers intentional navigation to its corresponding route.
  - Safe guards: ignore trackpad jitter, lock transitions during navigation, no mobile scroll hijacking.
- **Side Hover Expansion**:
  - Hovering BUILD or ABOUT ME expands that region by 3%.
  - The center region **never** expands.
- **Decorative Infinite Spiral**:
  - Fully independent, automatic ambient loop.
  - Does not pause on hover, does not intercept mouse clicks or drag events (`pointer-events: none`).
  - Halts automatically when `prefers-reduced-motion` is enabled.

