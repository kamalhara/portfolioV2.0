# Kamalveer Singh — Portfolio

A personal portfolio built with Next.js 16, React 19, and Tailwind CSS 4. The
site uses a compact, responsive layout and a live server route for music.

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
- `app/components/music/MusicCard.tsx` — live music widget and preview player
- `app/api/now-playing/route.ts` — server-only Last.fm and Apple catalog lookup
- `app/components/magneticLogo/magneticLogo.js` — dotted logo coordinates
- `app/components/magneticLogo/MagneticLogoCard.js` — logo hover and ripple behavior

The homepage layout is in `app/components/Home.js`. Project routes are in
`app/project/`. Component styling uses Tailwind utilities directly in each
component; shared light and dark theme tokens live in `app/globals.css`.
Static images and the résumé are in `public/`.

Set `NEXT_PUBLIC_SITE_URL` if deploying under a different domain. For the music
widget, create `.env.local` with `LASTFM_API_KEY` and `LASTFM_USERNAME` (see
`.env.example`). The key must stay server-side and must also be configured in
the deployment environment. The site now requires a host that runs Next.js
server routes; static-only hosting cannot provide a live `/api/now-playing`
endpoint. Apple preview audio is streamed from Apple's URL, never hosted here.
The card preloads available previews when track data arrives, shows 1200×1200
Apple catalog artwork where available, and links to a Spotify search for the
detected track. Not every catalog track has a playable preview.

## Checks

```bash
npm test
npm run lint
npm run build
```

Run `npm start` after building to serve the production app.
