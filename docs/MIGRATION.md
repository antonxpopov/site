# Портфолио Антона Попова — документация для миграции

Актуально на 7 ноября 2026. Репозиторий: <https://github.com/antonxpopov/site> (ранее `snwglb/site`, GitHub делает редирект). Локальная копия: `~/Desktop/Transfer/site`.

Документ описывает всё, что нужно, чтобы перенести проект на другой хостинг, аккаунт или компьютер, либо передать его другому разработчику.

---

## 1. Что это

Статический двуязычный сайт-портфолио звукового и технологического художника. Английский — по умолчанию (`/…`), русский — под `/ru/…`. Минималистичный дизайн: чёрный фон, моноширинный шрифт, светлый текст.

| Слой | Технология |
|---|---|
| Фреймворк | Astro 5 (статическая генерация, без сервера) |
| Стили | Tailwind CSS 3, токены цветов через CSS-переменные |
| Шрифт | Source Code Pro (400/500/600), самохостинг через `@fontsource` |
| Картинки | Astro Image: AVIF/WebP/JPEG, srcset, генерация при сборке (sharp) |
| Аудио-плеер | wavesurfer.js (ленивая загрузка) |
| Типографика | `typograf` — кавычки, тире, неразрывные пробелы (при сборке) |
| CMS | Pages CMS (<https://pagescms.org>) поверх Git, конфиг `.pages.yml` |
| Хостинг | GitHub Pages, деплой GitHub Actions |
| Тесты | Vitest |

В проекте остался React и Framer Motion (`@astrojs/react`), но **активные страницы их не используют** — всё на `.astro`. См. раздел 12 про унаследованный код.

---

## 2. Быстрый старт

Нужен Node.js 20+.

```bash
git clone https://github.com/antonxpopov/site.git
cd site
npm install
npm run dev          # http://localhost:4321/site/
```

Важно: сайт отдаётся под префиксом `/site` (см. раздел 9), поэтому адрес локально `http://localhost:4321/site/`, а не корень.

| Команда | Что делает |
|---|---|
| `npm run dev` | dev-сервер |
| `npm run build` | сборка в `dist/` |
| `npm run preview` | просмотр сборки |
| `npm run lint` | ESLint |
| `npm run format` / `format:check` | Prettier (записать / проверить) |
| `npm run type-check` | `astro sync` + `tsc --noEmit` |
| `npm run test` | Vitest |

Перед коммитом: `npm run format && npm run lint && npm run type-check && npm run test && npm run build`. Деплой на GitHub Pages падает, если не проходит любая из проверок (раздел 8).

---

## 3. Структура репозитория

```
.github/workflows/    ci.yml, deploy.yml
.pages.yml            конфигурация Pages CMS
AGENTS.md, CLAUDE.md  правила для ИИ-ассистентов (частично устарели, раздел 12)
astro.config.mjs      site, base, интеграции
tailwind.config.mjs   цвета, ширина контейнера, шрифт
content/              ИСХОДНИКИ (в .gitignore — только на локальной машине!)
docs/                 эта документация + архив старых заметок
public/
  audio/              mp3 для плеера (отдаются как есть)
  cv/                 PDF резюме (EN/RU)
  favicon.svg
src/
  assets/images/      ВСЕ фото (оптимизируются при сборке)
    about/            фон слайдера главной (popov_about_2026_01…08)
    education/        фото лекций и мастер-классов
    projects/         фото проектов и перформансов
  cms/
    projects/*.json   проекты, созданные через Pages CMS
    visibility.json   флаги скрытия встроенных проектов
  components/         .astro-компоненты (раздел 6)
  data/               контент (раздел 5)
  i18n/               ui.ts (строки интерфейса), localize.ts
  layouts/Layout.astro
  pages/              маршруты (EN) и pages/ru/ (RU)
  styles/global.css   токены, фокус, motion
  types/index.ts      типы данных
  utils/              paths, images, audio, cmsProject, typo
  views/              страницы целиком, принимают `lang`
```

---

## 4. Маршруты и двуязычность

Каждая страница — тонкий файл в `src/pages/…` и дубль в `src/pages/ru/…`. Оба вызывают один и тот же компонент из `src/views/` с пропсом `lang`.

| URL (EN) | URL (RU) | View |
|---|---|---|
| `/` | `/ru/` | `HomeView` — hero + секции Projects, Teaching, Contacts |
| `/about` | `/ru/about` | `AboutView` — биография, CV по годам |
| `/projects` | `/ru/projects` | `ProjectsIndexView` |
| `/projects/[slug]` | `/ru/projects/[slug]` | `ProjectView` |
| `/performances` | `/ru/performances` | `PerformancesIndexView` |
| `/performances/[slug]` | `/ru/performances/[slug]` | `ProjectView` |
| `/teaching` | `/ru/teaching` | `TeachingView` (в меню: «Workshops» / «Образовательные мероприятия») |
| `/contacts` | `/ru/contacts` | `ContactsView` |

Как работает язык:
- `src/i18n/ui.ts` — все строки интерфейса EN/RU, функции `localePath(lang, path)` и `splitLang(pathname)`.
- `src/i18n/localize.ts` — `localizeProject`, `localizePerformance`, `localizeLecture`: подставляют русский текст и прогоняют результат через типограф.
- `Layout.astro` считает `canonical`, `hreflang` (en/ru) и ссылки переключателя языка по текущему пути.
- Нет отдельной страницы 404.

**Правило:** любой внутренний адрес и путь к ресурсу строить через `withBase()` из `src/utils/paths.ts`. Не писать `/…` напрямую, иначе сломается при смене `base`.

---

## 5. Контент и где он хранится

### 5.1 Проекты (`artworks`) и перформансы
- **Встроенные проекты** — массив `builtInProjects` в `src/data/projects.ts` (EN-текст), русский — в `src/data/projects.ru.ts` (ключ — slug).
- **Проекты из CMS** — JSON-файлы в `src/cms/projects/` (создаёт Pages CMS), подхватываются через `import.meta.glob` в `src/data/cmsProjects.ts`.
- Скрыть встроенный проект: `src/cms/visibility.json` → `hidden.<slug>: true` (или переключатель в CMS).
- `category: 'artwork'` → раздел Projects; `'performance'` → страница в разделе Performances.
- Список перформансов (дата, место) — `src/data/performances.ts`; поле `slug` связывает с проектом.

Поля проекта (`Project` в `src/types/index.ts`): `slug`, `title`, `description`, `category`, `year`, `format`, `media`, `credits`, `venue`, `curators`, `photoCredit`, `images[]`, `imageUrl` (обложка для списка), `vimeoId`, `youtubeId`, `audioUrl`, `calameoId`, `paragraphs[]`, `links[]`.

Порядок на странице проекта: назад → год → название → техническое описание (format / media / credits) → текст → медиа → ссылки. Медиа: **Calameo-зин** (если задан `calameoId`), иначе **слайдер фото 3:2**; затем **аудиоплеер с волной** (если `audioUrl` указывает на существующий файл), затем **видео** Vimeo (или YouTube).

### 5.2 Остальное
| Данные | Файл |
|---|---|
| Лекции и мастер-классы (EN + RU) | `src/data/lectures.ts` |
| Биография, CV по годам (EN + RU) | `src/data/cv.ts` |
| Контакты | `src/components/ContactsList.astro` (почта, телефон, Bandcamp, Mixcloud) |
| Названия меню, заголовки, тексты кнопок | `src/i18n/ui.ts` |
| Ссылки на PDF резюме | `src/components/AboutIntro.astro` (Google Drive; файлы в `public/cv/` тоже есть) |

### 5.3 Фото
- Лежат в `src/assets/images/<раздел>/`, имена по шаблону `popov_<slug>_<год>_NN.jpg` (NN — номер с нуля, `01` — обложка).
- В данных пути пишутся коротко: `/images/projects/popov_auricle_2023_01.jpg` (функция `getAsset()` из `src/utils/images.ts` сопоставляет их с `src/assets`).
- Формат для слайдера: **3:2**, длинная сторона 2400 px, JPEG sRGB. Слайдер обрезает по центру (`object-cover`).
- Новое фото, не лежащее в `src/assets/images`, не покажется.

### 5.4 Аудио
- Файлы — в `public/audio/`, путь в `audioUrl` (например `/audio/the auricle.mp3`; пробелы поддерживаются, но лучше без них).
- Если файла нет, плеер просто не рисуется (проверка при сборке, `src/utils/audio.ts`).
- Декодируется целиком в браузере; для длинных треков стоит заранее считать пики волны.

---

## 6. Компоненты (активные)

| Компонент | Назначение |
|---|---|
| `Header.astro` | переключатель EN/RU слева, меню справа, мобильное `<details>`-меню |
| `HeroSlider.astro` | затемнённый фоновый слайдер главной (фото `about/…_01…08`, смена каждые 15 с, учитывает `prefers-reduced-motion`) |
| `AboutIntro.astro` | биография (с параметром `from` — сколько первых строк пропустить) и ссылка на CV |
| `ProjectDetail.astro` | страница проекта целиком |
| `PhotoSlider.astro` | слайдер: scroll-snap, кнопки, стрелки клавиатуры, счётчик, 3:2 |
| `CalameoEmbed.astro` | зин из Calameo, грузится по клику |
| `AudioWave.astro` | плеер с волной (wavesurfer.js, ленивая загрузка) |
| `EntryList.astro`, `ProjectsList.astro`, `TeachingList.astro`, `ContactsList.astro` | списки |
| `ScrollTopButton.astro` | кнопка «наверх» (десктоп) |

---

## 7. Дизайн-система

- Цвета — переменные в `src/styles/global.css` (`--color-bg`, `--color-text`, `--color-text-muted`, `--color-border`, …), в Tailwind доступны как `bg-bg`, `text-text`, `text-text-muted`, `border-border`.
- Контейнер — `max-w-container` (1000 px). Шрифт — `font-mono` (Source Code Pro), основной вес 500, заголовки 600.
- Межстрочный интервал 1.7, текст не шире 65ch, видимый фокус (`:focus-visible`), `prefers-reduced-motion` учтён, на мобильных `100svh`.
- Изменение палитры — только в `global.css`.

---

## 8. Сборка и CI/CD

- `ci.yml` (push/PR в `main`, `develop`): lint + type-check + format:check, тесты с покрытием, сборка.
- `deploy.yml` (push в `main` + ручной запуск): те же проверки (lint, type-check, format:check, test), затем `npm run build` и публикация `dist/` на GitHub Pages.
- **Ловушка:** `format:check` проверяет `src/**` Prettier-ом. Новый код, не отформатированный через `npm run format`, **остановит деплой**. Перед пушем запускайте `npm run format`.
- Секретов в репозитории нет (`.env*` в `.gitignore`).

---

## 9. Адреса, `base`, `site`

`astro.config.mjs`:
```js
site: 'https://antonxpopov.github.io',
base: '/site',
```
Публичный адрес: `https://antonxpopov.github.io/site/`. Страницы собираются как каталоги, GitHub Pages редиректит `/site` → `/site/`. `canonical`, `hreflang` и OG-картинка строятся от `site`.

---

## 10. Pages CMS

- Конфиг — `.pages.yml` в корне репозитория. Вход: <https://app.pagescms.org> (через GitHub, нужен доступ к репозиторию).
- Что редактируется: коллекция «Новые проекты» (`src/cms/projects/<slug>.json`), «Видимость проектов» (`src/cms/visibility.json`), медиа (фото → `src/assets/images/projects`, аудио → `public/audio`).
- Каждое сохранение в CMS — коммит в `main`, запускается деплой. Если форматирование нового JSON не проходит `format:check`, деплой остановится.
- При смене владельца репозитория (`snwglb` → `antonxpopov`) заново дайте Pages CMS доступ к новому адресу.
- Встроенные проекты в CMS можно только скрыть; тексты — в коде. Новый встроенный проект придётся добавить в `visibility` в `.pages.yml`, если хотите его скрывать.

---

## 11. Внешние сервисы

| Сервис | Где используется |
|---|---|
| Vimeo (`player.vimeo.com`) | видео проектов, iframe, `loading="lazy"` |
| YouTube nocookie | видео лекций |
| Calameo (`v.calameo.com`) | зин Gostinka, id `007258745c2fc24223d53` |
| Google Drive | PDF резюме (ссылки в `AboutIntro.astro`) |
| Bandcamp, Mixcloud, syg.ma | ссылки в контактах и проектах |
| Pages CMS | редактор контента |
| GitHub Pages / Actions | хостинг и деплой |

Внешних API-ключей нет.

---

## 12. Известные проблемы и долг

Контент:
- Safety Zone: год (2023) предположительный (`TODO: confirm year` в `performances.ts`); проверить площадку и ID видео.
- Нет фото у Strelka, Re:trospection, «Жесть», «Voicing» (проверить актуальное состояние `src/assets/images`).
- Английские тексты лекций переведены автоматически с русского — нужна вычитка.
- Контакты: нет Instagram, Telegram, Vimeo-профиля.
- Телефон опубликован в контактах и в PDF — решить, оставлять ли.
- В шапке нет ссылки на главную (имя убрано; возврат — через переключатель языка/адрес).

Технический долг:
- Устаревшие README, `AGENTS.md`, `CLAUDE.md`: описывают старую структуру (React-острова, `Hero.tsx`, `project/[id]`). Ориентируйтесь на этот документ.
- Неиспользуемый код: `HamburgerMenu.tsx`, `AudioPlayer.tsx`, `VimeoPlayer.tsx`, `OptimizedImage.tsx`, `src/hooks/*`, `src/constants/animations.ts`, `src/utils/imageUtils.ts`, `src/data/writing.ts`, React и Framer Motion в зависимостях. Перед удалением проверьте `grep` по проекту и тесты (`src/test/`), которые ссылаются на хуки.
- `cleanup-structure.sh` в корне — одноразовый скрипт очистки; после запуска можно удалить.
- В `types/index.ts` остались типы под старые React-компоненты.
- Нет страницы 404, `robots.txt`, `sitemap.xml`.

---

## 13. Чек-лист миграции

### Перенос на другой хостинг (Netlify / Vercel / Cloudflare Pages / свой сервер)
1. Подключить репозиторий; команда сборки `npm run build`, каталог публикации `dist`, Node 20.
2. Если сайт будет в корне домена: в `astro.config.mjs` указать `site: 'https://ваш-домен'` и **удалить** `base`. Все пути уже идут через `withBase()`, больше ничего менять не нужно.
3. Отключить `deploy.yml` (или удалить), иначе GitHub Pages продолжит публиковаться параллельно.
4. Настроить домен, HTTPS, редирект со старого адреса `antonxpopov.github.io/site/`.
5. Проверить после выката: все страницы EN и RU, переключатель языка, `canonical`/`hreflang`, видео, плеер, зин, скачивание CV.

### Перенос репозитория / смена аккаунта
1. Перенести репозиторий (Transfer ownership) или создать новый и залить историю (`git remote set-url origin …`, `git push --all`).
2. Включить GitHub Pages: Settings → Pages → Source: GitHub Actions.
3. Обновить `site` в `astro.config.mjs` и ссылку в `AGENTS.md`/README.
4. Заново подключить Pages CMS к новому репозиторию.
5. Обновить ссылки на сайт в соцсетях, CV и профилях.

### Перенос на другой компьютер
1. `git clone`, `npm install`, `npm run dev`.
2. **Скопировать папку `content/`** — исходные материалы (оригиналы фото, тексты, PDF) не хранятся в Git (она в `.gitignore`). Без неё потеряются оригиналы.
3. Если используете Claude Code: `CLAUDE.local.md` и история сессий (`~/.claude/projects/…`) тоже локальны.

### Что сохранить вне репозитория
- Папка `content/` (оригиналы).
- Доступы: GitHub-аккаунт, Pages CMS (вход через GitHub), домен (если появится).
- Файлы PDF и оригиналы mp3.

### Проверка после миграции
```
npm ci && npm run format:check && npm run lint && npm run type-check && npm run test && npm run build
```
Затем открыть `dist/` через `npm run preview` и пройтись по списку страниц из раздела 4.

---

## 14. История изменений (кратко)

- 17 окт 2026 — исправления CI и базового пути GitHub Pages.
- 26 окт — многостраничный сайт, русская версия.
- 27 окт — секции на главной, ссылки на CV, hero-слайдер, кнопка «наверх», сокращённые тексты, видео лекций, Pages CMS.
- 30 окт — About перенесён в первый экран, аудиоплеер с волной, оптимизированные фото (3:2), Calameo для Gostinka.
- 31 окт — типограф для EN/RU текстов.

Полная история: `git log --stat`.
