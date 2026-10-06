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
- `app/data/assistantFacts.js` — public professional details for the assistant
- `app/components/Assisstant.js` — existing assistant dialog and Worker client
- `worker/src/knowledge.ts` — portfolio evidence assembled from the site data
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

## Recruiter assistant

The existing Dock assistant sends questions to a Cloudflare Worker. The Worker
retrieves up to five relevant portfolio sections using Workers AI embeddings,
generates an answer with Llama 4 Scout, and optionally tries Gemini 2.5 Flash
Lite for a rate limit, timeout, network error, or server error. If generation
fails, it returns the relevant portfolio text directly. A SQLite Durable Object
stores the embedding index, two recent exchanges per visitor, and usage counts.
No model credentials are included in the browser bundle.

### Local setup

1. Copy `worker/.dev.vars.example` to `worker/.dev.vars` and replace
   `PORTFOLIO_CHAT_COOKIE_SECRET` with a random secret of at least 32 characters.
   Add `GEMINI_API_KEY` only if your Google AI project can access the configured
   model; Cloudflare AI and direct search work without it. Local development
   uses the same visitor limits as production.
2. Set `NEXT_PUBLIC_ASSISTANT_API_URL=http://localhost:8787/chat` in
   `.env.local`. The development build uses that URL by default when the variable
   is absent.
3. Run `npm run assistant:dev` in one terminal and `npm run dev` in another.
   Cloudflare Workers AI uses remote preview, so sign in with Wrangler when it
   prompts and ensure the account has a registered `workers.dev` subdomain.
4. Check `http://localhost:8787/health`, open the portfolio, and choose
   **Ask Assistant** from the Dock.

The account ID and API token are handled by Wrangler login for local development
and deployment. Do not put either in `NEXT_PUBLIC_*` variables. A CI deployment
may use `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN` as server-side secrets.

### Production setup

1. Set a new production cookie secret with
   `npx wrangler secret put PORTFOLIO_CHAT_COOKIE_SECRET --config worker/wrangler.jsonc`.
   Optionally set `GEMINI_API_KEY` with the same command. Never commit either
   value or `.dev.vars`.
2. Set `ALLOWED_ORIGINS` in `worker/wrangler.jsonc` to the actual portfolio
   origins, then run `npm run assistant:deploy`.
3. Attach the Worker to a same-site custom domain such as
   `assistant.kamalhara.me` in Cloudflare Workers settings. The signed,
   HTTP-only cookie uses `SameSite=Lax`, so a `workers.dev` URL on a separately
   hosted portfolio will not reliably preserve visitor limits in browsers.
4. Set `NEXT_PUBLIC_ASSISTANT_API_URL=https://assistant.kamalhara.me/chat` in
   the portfolio host and redeploy the Next.js app. Adjust the hostname if the
   production site uses another domain.

The Worker allows 10 answered questions per anonymous cookie per UTC day,
including generated, fixed, and fallback replies. There is no delay between
questions. The shared limit remains 200 AI-generated replies across all visitors
per UTC day; fixed and fallback replies do not spend that shared AI allowance.
Both allowances reset at midnight UTC (5:30 AM in India), and an open chat
refreshes its allowance automatically. The same limits apply in local development and production;
there is no unlimited mode. The remaining count appears only at five replies
or fewer. A confirmed provider quota exhaustion shows a short disclaimer beside
the verified portfolio fallback; temporary capacity errors are not described as
an exhausted daily allowance.
The switch to this policy clears previous reply counts and cooldowns once.
The stored reset version prevents subsequent restarts or deployments from
clearing them again; conversation history and cached evidence remain available.
The limit state links to projects, skills, the resume, GitHub, and contact.
Updating portfolio content changes the knowledge version and rebuilds the
stored embedding index on the next request.

Public profile facts and portfolio assessments are curated in
`app/data/assistantFacts.js`. Project descriptions in `app/data/project.js`
should match the linked repositories; planned features must be identified as
planned. StateGlyph, Spotus, Productify, and Ryde are portfolio highlights,
while World Wise is not recommended as a showcase project. The Worker sends
short evidence to the model and generates natural answers, usually two or three
short sentences capped at 80 words. Greetings, verified public facts (including
age), project explanations, and role-fit assessments use AI-generated wording.
Salary, private information, and weakness questions keep controlled replies;
unsupported questions are referred to Kamal or the portfolio. If AI providers
fail, the Worker falls back to verified portfolio text. Update the
public resume and these data files together when facts change
