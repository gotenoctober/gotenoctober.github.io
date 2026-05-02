# AGENTS.md

This file provides guidance to coding agents working with this repository.

## Commands

- `npm run dev` — start the Astro dev server (alias: `npm start`)
- `npm run build` — static build to `dist/`
- `npm run preview` — serve the built site locally

`packageManager` is pinned to yarn 1.22, but the npm scripts above work with either. There is no test or lint script.

## Architecture

This is the marketing site for **tenoctober.com**, an app studio. It is a small, fully static [Astro 5](https://astro.build) site styled with **Tailwind 4** (via the Vite plugin in `astro.config.mjs`) and **DaisyUI 5**. There is no UI framework — pages are plain `.astro` files.

### Pages and theming

- `src/pages/index.astro` — studio landing page.
- `src/pages/lost-books.astro` — long-form landing page for the Lost Books mobile game (the largest file in the repo; includes JSON-LD `SoftwareApplication` schema, OG/Twitter meta, `apple-itunes-app` smart banner).
- `src/pages/privacy/lost-books.astro` — privacy policy.
- `src/pages/404.astro` — 404 page.

Global styles, the Tailwind/DaisyUI imports, and two custom DaisyUI themes (`mytheme` light, `mythemeDark` dark) live in `src/styles/global.css`. Every page imports this file. The light theme is forced via `data-theme="mytheme"` on `<html>`.

### Cloudflare Pages Functions

The `functions/` directory is a [Cloudflare Pages Functions](https://developers.cloudflare.com/pages/functions/) tree (note the `PagesFunction` type and `onRequestGet` export convention). The site is deployed to Cloudflare Pages.

`functions/lost-books/download.ts` is a smart-link redirector at `/lost-books/download` that sniffs the User-Agent and 302s to the App Store, Play Store, or `/lost-books` fallback. It imports the store URLs from `src/data/lost-books.ts` so the function and the Astro pages stay in sync.

### Single source of truth for store links

`src/data/lost-books.ts` exports `APP_STORE_URL`, `PLAY_STORE_URL`, `SMART_LINK_PATH`, and `SMART_LINK_DISPLAY`. **Always update store/app links here** — both the Astro pages and the Cloudflare function import from this module. Don't inline new store URLs in components.

### SEO surface

- `@astrojs/sitemap` integration is enabled in `astro.config.mjs` with `site: 'https://tenoctober.com'`; it auto-generates the sitemap at build time.
- `public/robots.txt` and `public/app-ads.txt` are served as-is.
- The Lost Books page is the primary SEO target — keep its JSON-LD, canonical, OG, and Twitter tags consistent when editing copy or images.

### PostHog analytics

`src/components/posthog.astro` is the reusable PostHog snippet (inlined, reads `PUBLIC_POSTHOG_PROJECT_TOKEN` and `PUBLIC_POSTHOG_HOST` from env). Every page that needs analytics imports it in `<head>`. Both env vars are in `.env` (gitignored); on Cloudflare they must be set as Pages environment variables.

**Client-side events** are captured via `window.posthog?.capture()` with `data-ph-*` attributes for event delegation:

| Event | Properties | Pages |
|---|---|---|
| `download_clicked` | `store` (`app_store` \| `play_store`), `location` (`hero` \| `cta` \| `homepage`) | `lost-books.astro`, `index.astro` |
| `learn_more_clicked` | — | `index.astro` |
| `get_in_touch_clicked` | — | `index.astro` |

**Server-side events** — `functions/lost-books/download.ts` fires a fire-and-forget `POST` to PostHog's `/e/` endpoint on every redirect so the smart-link redirector gets its own tracking even without JavaScript:

| Event | Properties | Where |
|---|---|---|
| `download_redirect` | `platform` (`ios` \| `android` \| `fallback`), `destination`, `user_agent`, `referer` | `functions/lost-books/download.ts` |

When adding new events, follow the `snake_case` naming convention and keep the table above up to date.

## Conventions

- Astro pages use frontmatter `---` for any imports/logic; everything else is HTML + Tailwind/DaisyUI utility classes (`btn`, `card`, `footer`, etc.).
- The `lb-*` CSS class prefix on the Lost Books page denotes page-specific styles (defined inline in that file).
- Static assets under `public/` are served at the URL matching their path (e.g. `public/lost-books/hero.jpg` → `/lost-books/hero.jpg`).
- `.prettierrc` uses default Prettier config; `.editorconfig` enforces basic whitespace rules.
