# Портфолио (Astro)

Минималистичный сайт-портфолио на **Astro 5**, **React** (острова), **TailwindCSS**, **Framer Motion**.

## Быстрый старт

```bash
npm install
npm run dev
```

Dev-сервер: обычно `http://localhost:4321`.

```bash
npm run build      # статика в dist/
npm run preview    # просмотр сборки
npm run lint
npm run type-check
npm run test
```

## Структура

```
src/
├── components/     # Astro + React (.tsx)
├── layouts/        # Layout.astro
├── pages/          # index.astro, project/[id].astro
├── data/projects.ts
├── hooks/
├── types/
public/audio/       # MP3 для проектов
```

## Контент

- Проекты: `src/data/projects.ts`
- Hero: `src/components/Hero.tsx`
- Контакты: `src/components/Contacts.tsx`
- О себе: `src/components/About.tsx` (пока не подключён в `index.astro`)

Аудио кладите в `public/audio/` и указывайте путь в `projects.ts`.

## AI-ассистенты (Cursor / Claude Code)

- **`AGENTS.md`** — общие правила и команды для агентов
- **`CLAUDE.md`** — память Claude Code (импортирует `AGENTS.md`)
- **`docs/CLAUDE_CODE.md`** — чеклист миграции на Claude Code

## Деплой

Статическая сборка (`dist/`). CI: `.github/workflows/ci.yml`. Публикация на GitHub Pages: `.github/workflows/deploy.yml` (запускается при push в `main`).

Vercel / Netlify: подключите репозиторий или деплойте каталог `dist` после `npm run build`.

## Дополнительная документация

Архив заметок после код-ревью: `docs/archive/` (справочно, может быть устаревшим).
