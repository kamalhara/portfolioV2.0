# Kamalveer Singh — Portfolio

A responsive portfolio for Kamalveer Singh, a full-stack and mobile software
engineer. Built with Next.js 16, React 19, and Tailwind CSS 4.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Quality checks

```bash
npm run lint
npm test
npm run build
```

The Node test suite verifies project data integrity and image references. The
production build exports the site to `out/`.

## Project map

- `app/page.js` — homepage composition
- `app/components/` — shared and interactive UI
- `app/data/` — project, experience, and skill content
- `app/project/` — searchable archive and project detail routes
- `public/` — optimized project imagery and résumé
- `tests/` — data integrity checks

Set `NEXT_PUBLIC_SITE_URL` from `.env.example` to generate canonical,
Open Graph, robots, and sitemap URLs for a custom domain.
