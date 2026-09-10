# Repository Guidelines

## Project Structure & Module Organization

This repository is a Next.js 16 portfolio using the App Router. Routes live in `app/`: `app/page.js` is the homepage, `app/project/page.js` lists projects, and `app/project/[slug]/page.js` renders project details. Reusable UI belongs in `app/components/`; portfolio content is maintained in `app/data/`. Global styles are in `app/globals.css`, while screenshots, the resume, and other static files live in `public/`. Root configuration includes `next.config.mjs`, `eslint.config.mjs`, `postcss.config.mjs`, and `jsconfig.json`.

## Build, Test, and Development Commands

- `npm install` installs the locked dependencies from `package-lock.json`.
- `npm run dev` starts the local development server at `http://localhost:3000`.
- `npm run lint` runs ESLint with the Next.js Core Web Vitals rules.
- `npm test` runs the data-integrity checks with Node's built-in test runner.
- `npm run build` creates a production build and catches route or rendering failures.
- `npm start` serves the completed production build.

Run lint and build before opening a pull request.

## Coding Style & Naming Conventions

Use JavaScript and JSX with two-space indentation, double quotes, semicolons, and trailing commas where supported. Prettier 3 is installed; keep edits compatible with its defaults. Name React component files and exports in PascalCase (`GithubGraph.js`), variables and functions in camelCase, and dynamic route folders with bracket syntax (`[slug]`). Prefer the `@/*` alias for cross-directory imports. Keep content-only changes in `app/data/` and place client directives only on components that need browser APIs, state, or effects.

## Testing Guidelines

Tests use Node's built-in test runner and live in `tests/` as `*.test.mjs`. Current checks protect project slug uniqueness, required route data, and optimized image references. Run `npm test` for every data or routing change. Also run `npm run lint` and `npm run build`, then manually check affected routes at mobile and desktop widths.

## Commit & Pull Request Guidelines

Recent commits follow Conventional Commit-style prefixes such as `feat:`, `fix:`, `refactor:`, `style:`, and `chore:`. Use an imperative, focused subject. Pull requests should explain the user-visible change, list verification performed, link relevant issues, and include before/after screenshots for visual or responsive updates. Keep unrelated refactors separate.

## Agent-Specific Instructions

This project uses Next.js 16. Before changing framework APIs, conventions, routing, or configuration, read the relevant guide under `node_modules/next/dist/docs/` and follow current deprecation guidance rather than relying on prior Next.js behavior.
