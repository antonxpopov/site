# Portfolio of Anton Popov

Minimal bilingual (EN default, RU under `/ru/`) static portfolio of a sound / technological artist.
Astro 5 + Tailwind 3, hosted on GitHub Pages (`base: '/site'`). All text content lives in JSON/Markdown edited via Pages CMS.

Full project documentation: `docs/MIGRATION.md`. How the owner edits content: `docs/CMS.md`.

## Commands

Run from repository root after `npm install` (Node 20+):

| Task | Command |
|------|---------|
| Dev server | `npm run dev` → http://localhost:4321/site/ |
| Build | `npm run build` → `dist/` |
| Lint / types / tests | `npm run lint`, `npm run type-check`, `npm run test` |
| Format | `npm run format` (CI runs `format:check`, so always format before pushing) |
| Audio waveform peaks | `npm run peaks -- public/audio/<file>.mp3` (needs ffmpeg) |

Before committing: `npm run format && npm run lint && npm run type-check && npm run test && npm run build`.

## Architecture

```
src/
  cms/             CONTENT as JSON (Pages CMS): projects/*.json, lectures/*.json,
                   performances.json, about.json, contacts.json
  content/blog/    blog posts (Markdown, en/ and ru/); visibility: src/constants/blog.ts
  data/            loaders for cms/*.json (cmsProjects, projects, lectures, performances, cv)
  pages/           thin routes; pages/ru/ duplicates them for Russian
  views/           whole pages, take `lang`
  components/      .astro components (ProjectDetail, PhotoSlider, AudioWave, VideoEmbed,
                   CalameoEmbed, ScrollEffects, EntryList, …)
  layouts/Layout.astro   SEO (canonical, hreflang, OG), fonts, header/footer
  i18n/            ui.ts (UI strings), localize.ts (RU text + typograf)
  utils/           paths (withBase), images (getAsset), audio (peaks), cmsProject, blog, typo
  assets/images/   all photos (optimised at build): about/, education/, projects/
public/audio/      mp3 + .peaks.json
```

Legacy React files (`*.tsx`, `src/hooks`, Framer Motion) are not used by the active pages; leave them unless asked.

## Conventions

- Content is data: change texts/photos/videos in `src/cms/**` (or via Pages CMS), not in components. A new content field means: `.pages.yml` → `src/types/index.ts` → `src/utils/cmsProject.ts` → component.
- Every internal URL and asset path goes through `withBase()` (`src/utils/paths.ts`) — never hardcode `/...`. Routes for RU use `localePath(lang, path)`.
- Photos live in `src/assets/images/<section>/popov_<slug>_<year>_NN.jpg`; data refers to them as `/images/<section>/...` and `getAsset()` resolves them. Slider format 3:2.
- Language fallbacks: missing RU fields fall back to EN. Run text through `typo()` / `typoDeep()` (typograf) for display.
- Styling: Tailwind with CSS-variable tokens in `src/styles/global.css`; body text is monospace (Source Code Pro), headings/menu use Geologica. Thin lines via `.divide-thin`, `.hairline-t/-b`. Respect `prefers-reduced-motion`.
- Third-party embeds (Vimeo, YouTube, Calameo) load only after a click.
- TypeScript strict; avoid generics like `new Set<T>()` inside `<script>` of `.astro` files (the ESLint Astro parser fails) — annotate the variable type instead.
- Keep diffs small; comments only for non-obvious behaviour.
- `src/cms/` and `src/content/` are in `.prettierignore` (Pages CMS writes its own JSON formatting).

## Deploy

Push to `main` → `.github/workflows/deploy.yml` (lint, type-check, format:check, test, build, publish to GitHub Pages). CI (`ci.yml`) runs the same on PRs. Every Pages CMS save is a commit to `main` and triggers a deploy.
Custom domain later: set `site` in `astro.config.mjs` and remove `base`.
