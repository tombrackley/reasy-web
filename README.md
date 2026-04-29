# Reasy marketing site

The public marketing site for Reasy — landing page, privacy policy, and terms.

The Reasy product itself (dashboards, listing flows, buyer/seller messaging, etc.) lives in a separate Rails repo. This repo only ships the public-facing static site.

## Stack

- React 19 + TypeScript (Vite)
- Tailwind CSS v4 with `tw-animate-css`
- `@tabler/icons-react`
- Inter and Playfair Display via `@fontsource-variable`, plus a local Gambarino face

## Routes

Manual `pathname`-based routing in `src/App.tsx`:

- `/` — landing page (`src/components/home-page.tsx`)
- `/privacy` — privacy policy (`src/components/privacy-page.tsx`)
- `/terms` — terms (`src/components/terms-page.tsx`)

## Develop

```sh
npm install
npm run dev
```

## Build

```sh
npm run build      # tsc -b && vite build
npm run preview
npm run lint
```

## Deploy

Vercel. SPA rewrite is configured in `vercel.json` so client-side routes resolve to `index.html`.
