---
paths:
  - "src/pages/**/*.astro"
  - "src/layouts/**/*.astro"
  - "src/components/**/*.astro"
---

# Astro pages and layouts

- Prefer static Astro for structure; add `client:load` / `client:visible` only where React interactivity is required.
- Import React components without file extension when they are `.tsx`.
- Keep page-level `<Layout title="...">` SEO titles accurate.
- Project detail routes: `src/pages/project/[id].astro` — IDs must match `src/data/projects.ts`.
- Avoid inline styles unless the page already uses that pattern; prefer Tailwind classes in components.
