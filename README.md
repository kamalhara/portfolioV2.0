# Kamalveer Singh — Portfolio

A personal portfolio built with Next.js 16, React 19, and Tailwind CSS 4. The
site uses a compact, responsive layout and exports as static files.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Edit the portfolio

- `app/data/portfolio.js` — introduction, contact links, and project summaries
- `app/data/project.js` — project descriptions, links, and screenshots
- `app/data/experience.js` — work experience
- `app/data/skills.js` — tech stack
- `app/data/nowPlaying.js` — music widget
- `app/components/magneticLogo.js` — dotted logo coordinates
- `app/components/MagneticLogoCard.js` — logo hover and ripple behavior

The homepage layout is in `app/components/PortfolioHome.js`. Project routes
are in `app/project/`. Component styling uses Tailwind utilities; theme tokens
live in `app/portfolio.css`. Static images and the résumé are in `public/`.

Set `NEXT_PUBLIC_SITE_URL` if deploying under a different domain.

## Checks

```bash
npm test
npm run lint
npm run build
```

The production build writes the static site to `out/`.
