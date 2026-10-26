# sound-engineer-portfolio

Minimal static portfolio site (sound engineer / sound designer). Astro 5 + React islands + Tailwind + Framer Motion.

## Commands

Run from repository root after `npm install`:

| Task | Command |
|------|---------|
| Dev server | `npm run dev` (default http://localhost:4321) |
| Production build | `npm run build` → `dist/` |
| Preview build | `npm run preview` |
| Lint | `npm run lint` |
| Format check | `npm run format:check` |
| Format write | `npm run format` |
| TypeScript | `npm run type-check` |
| Tests | `npm run test` |

Before committing, run: `npm run lint`, `npm run type-check`, `npm run test`, `npm run build`.

Node 20+ (matches CI). Use `npm ci` in CI.

## Architecture

```
src/
  pages/           Astro routes (index, project/[id])
  layouts/         Layout.astro (SEO, global styles)
  components/      Mix of .astro shells and React .tsx islands
  data/projects.ts Portfolio content (source of truth for projects)
  hooks/           Shared React hooks
  constants/       Animation timing constants
  types/index.ts   Shared TypeScript types
  utils/           Helpers (images, etc.)
public/
  audio/           MP3 assets referenced from projects.ts
  images/          Static images
```

**Pattern:** Astro pages compose sections. Interactive UI uses React with `client:load` or `client:visible`. Keep static markup in `.astro` when possible; use React only for audio, gallery, menu, scroll behavior.

**Content edits:** Change copy and project list in `src/data/projects.ts` and section components (`Hero.tsx`, `Contacts.tsx`, `About.tsx`). Do not duplicate project data elsewhere.

## Code conventions

- TypeScript strict mode; all source is `.tsx` / `.ts` — do not add `.jsx` / `.js`.
- Shared types live in `src/types/index.ts`.
- Reuse hooks (`useIntersectionObserver`, `useThrottledScroll`, `useImageSlider`) instead of duplicating observers or scroll listeners.
- Animation durations/easing: `src/constants/animations.ts`.
- Memoize list items where already established (`React.memo`, `useCallback` in menu).
- Match existing minimal UI: white space, restrained motion, no decorative churn.
- Keep diffs small; do not refactor unrelated files.
- Comments only for non-obvious behavior.

## Testing

- Vitest + Testing Library; config in `vitest.config.ts`, setup in `src/test/setup.ts`.
- Add tests for new hooks/utilities; extend patterns in `src/test/hooks/`.

## Docs (reference only)

Historical Cursor review notes live in `docs/archive/` (not required for daily work; the status file may be out of date):

- `IMPLEMENTATION_STATUS.md` — what was implemented after the first review
- `CODE_REVIEW_SUMMARY.md`, `TECHNICAL_REVIEW.md`, `IMPLEMENTATION_GUIDE.md`, `README_IMPROVEMENTS.md` — audit backlog

Prefer this file and `README.md` for current workflow.

## Deploy

Static output in `dist/`. CI: `.github/workflows/ci.yml` (lint, type-check, format, test, build). Deploy: `.github/workflows/deploy.yml` publishes `dist/` to GitHub Pages on push to `main`. `astro.config.mjs` targets the project page `https://antonxpopov.github.io/site/` (`base: '/site'`); with a custom domain, set `site` to it and drop `base`. Build every internal link/asset path with `withBase()` from `src/utils/paths.ts` — never hardcode `/...`. Deploy runs the same lint/type/format/test gates as CI.
