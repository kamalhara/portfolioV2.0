# Kamalveer Singh — Portfolio

A responsive, dark-mode-ready developer portfolio for **Kamalveer Singh**, a
full-stack and mobile software engineer. Built with **Next.js 16**, **React 19**,
and **Tailwind CSS 4**, statically exported and deployed on Vercel.

## ✨ Highlights

- **Welcome loader** — animated intro on first visit with session-aware skip
- **Dark / light theme** — persisted in `localStorage`, applied before paint to
  avoid flash
- **Scroll-reveal animations** — powered by Motion (Framer Motion)
- **Chapter rail navigation** — sticky side rail for quick section jumps
- **iPhone frame previews** — mobile screenshots displayed inside a realistic
  device mockup
- **GitHub contribution graph** — live `react-github-calendar` integration
- **Project archive** — searchable, filterable `/project` route with individual
  detail pages (`/project/[slug]`)
- **SEO-ready** — Open Graph, Twitter cards, JSON-LD structured data, canonical
  URLs, and sitemap support
- **Static export** — `output: "export"` for fast CDN hosting

## 🛠 Tech stack

| Layer     | Tools                                                   |
| --------- | ------------------------------------------------------- |
| Framework | Next.js 16 (App Router, static export)                  |
| UI        | React 19, Tailwind CSS 4, Motion (Framer Motion)        |
| Fonts     | Inter, Instrument Serif, JetBrains Mono (Google Fonts)  |
| Icons     | react-icons                                             |
| Data      | GitHub calendar via react-github-calendar               |
| Tooling   | ESLint (Core Web Vitals), Prettier 3, PostCSS           |
| Node      | ≥ 20.9.0 (`.nvmrc` → 22)                               |

## 🚀 Getting started

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

Copy `.env.example` and set your domain:

```bash
cp .env.example .env.local
```

| Variable                | Purpose                                          |
| ----------------------- | ------------------------------------------------ |
| `NEXT_PUBLIC_SITE_URL`  | Canonical, Open Graph, and sitemap base URL      |

## ✅ Quality checks

```bash
npm run lint      # ESLint with Next.js Core Web Vitals rules
npm test          # Node built-in test runner — data integrity checks
npm run build     # Production build (static export to out/)
```

Run all three before opening a pull request.

## 📁 Project map

```
app/
├── page.js                   # Homepage composition
├── layout.js                 # Root layout, fonts, metadata, JSON-LD
├── globals.css               # Global styles and design tokens
├── not-found.js              # Custom 404 page
├── icon.png                  # Favicon
├── components/
│   ├── Hero.js               # Hero section with intro
│   ├── Project.js            # Featured project cards
│   ├── Professional.js       # Work experience timeline
│   ├── Activities.js         # GitHub graph and activities
│   ├── About.js              # About / skills section
│   ├── Navbar.js             # Top navigation bar
│   ├── Footer.js             # Footer with rotating farewells
│   ├── ChapterRail.js        # Sticky side navigation rail
│   ├── ScrollReveal.js       # Scroll-triggered reveal wrapper
│   ├── WelcomeLoader.js      # Animated welcome screen
│   ├── GridBackground.js     # Decorative grid background
│   ├── GithubGraphCustom.js  # GitHub calendar wrapper
│   └── ProjectArchive.js     # Searchable project archive
├── ui/
│   ├── Heading.js            # Reusable section heading
│   └── IPhoneFrame.js        # iPhone device frame for screenshots
├── data/
│   ├── project.js            # Project entries (9 projects)
│   ├── experience.js         # Work experience entries
│   └── skills.js             # Skill categories
└── project/
    ├── page.js               # /project — archive listing
    └── [slug]/
        └── page.js           # /project/:slug — project detail

public/
├── kamalveer-singh-resume.pdf
├── spotus/                   # Spotus screenshots
├── ryde/                     # Ryde screenshots
├── dine-time/                # Dine Time screenshots
└── *.webp / *.png            # Project covers and assets

tests/
└── project-data.test.mjs     # Slug uniqueness and image-ref checks
```

## 📦 Scripts

| Command           | Description                                  |
| ----------------- | -------------------------------------------- |
| `npm run dev`     | Start the local development server           |
| `npm run build`   | Static export to `out/`                      |
| `npm start`       | Serve the production build                   |
| `npm run lint`    | Run ESLint                                   |
| `npm test`        | Run data-integrity tests                     |

## 📄 License

This is a personal portfolio. All project content and design are
© Kamalveer Singh.
