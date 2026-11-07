# Портфолио Антона Попова

Двуязычный (EN / RU) минималистичный сайт-портфолио звукового и технологического художника.
**Astro 5** + **Tailwind CSS 3**, статическая сборка, хостинг — GitHub Pages.

Сайт: <https://antonxpopov.github.io/site/>

## Быстрый старт

Нужен Node.js 20+.

```bash
git clone https://github.com/antonxpopov/site.git
cd site
npm install
npm run dev        # http://localhost:4321/site/
```

| Команда | Что делает |
| --- | --- |
| `npm run build` / `preview` | сборка в `dist/` / просмотр сборки |
| `npm run format` | Prettier (обязательно перед пушем — иначе деплой остановится) |
| `npm run lint`, `type-check`, `test` | проверки |
| `npm run peaks -- public/audio/<файл>.mp3` | пики волны для аудиоплеера (нужен ffmpeg) |

Перед коммитом: `npm run format && npm run lint && npm run type-check && npm run test && npm run build`.

## Структура

```
src/
  cms/          весь контент в JSON (проекты, лекции, перформансы, о себе, контакты)
  content/blog/ записи блога (Markdown, по умолчанию скрыты)
  assets/images/ фото (оптимизируются при сборке)
  components/, views/, layouts/, pages/ (EN) и pages/ru/ (RU)
  i18n/         строки интерфейса и локализация
public/audio/   mp3 и пики волны
docs/           документация
```

## Контент

Контент правится через **Pages CMS** (<https://app.pagescms.org>) — без кода и терминала: проекты, лекции, перформансы,
«обо мне», контакты, блог. Инструкция: [`docs/CMS.md`](docs/CMS.md).

## Документация

- [`docs/MIGRATION.md`](docs/MIGRATION.md) — полное описание проекта и чек-лист миграции (хостинг, аккаунт, компьютер)
- [`docs/CMS.md`](docs/CMS.md) — как редактировать сайт через Pages CMS
- [`AGENTS.md`](AGENTS.md), [`CLAUDE.md`](CLAUDE.md) — правила для ИИ-ассистентов
- `docs/archive/` — старые заметки код-ревью (справочно)

## Деплой

Push в `main` → GitHub Actions (`.github/workflows/deploy.yml`): lint, type-check, format:check, тесты, сборка, публикация на GitHub Pages.
`astro.config.mjs`: `site: 'https://antonxpopov.github.io'`, `base: '/site'`. Все внутренние адреса строятся через `withBase()`.
