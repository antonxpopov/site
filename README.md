# Портфолио Антона Попова

Двуязычный (EN / RU) статический сайт на **Astro 5** + **Tailwind CSS**. Публикуется на GitHub Pages: <https://antonxpopov.github.io/site/>.

## Быстрый старт

```bash
npm install
npm run dev        # http://localhost:4321/site/
npm run build      # статика в dist/
npm run format && npm run lint && npm run type-check && npm run test
```

Node.js 20+. Перед пушем обязательно `npm run format`: деплой проверяет форматирование.

## Где что лежит

- Проекты — `src/data/projects.ts` (EN), `src/data/projects.ru.ts` (RU), новые — через Pages CMS (`src/cms/projects/`)
- Лекции — `src/data/lectures.ts`, биография и CV — `src/data/cv.ts`
- Строки интерфейса и меню — `src/i18n/ui.ts`
- Фото — `src/assets/images/` (`popov_<slug>_<год>_NN.jpg`, 3:2), аудио — `public/audio/`

## Документация

**[docs/MIGRATION.md](docs/MIGRATION.md)** — полное описание проекта: структура, маршруты, контент, CI/CD, CMS, внешние сервисы, известные проблемы и чек-лист миграции.

Архив старых заметок — `docs/archive/` (может быть устаревшим).
