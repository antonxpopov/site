# Портфолио Антона Попова — документация для миграции

Актуально на 7 ноября 2026 (после переноса всего контента в Pages CMS, добавления блога, шрифта заголовков, анимаций скролла и оптимизации медиа). Репозиторий: <https://github.com/antonxpopov/site> (ранее `snwglb/site`, GitHub делает редирект). Локальная копия: `~/Desktop/Transfer/site`.

Документ описывает всё, что нужно, чтобы перенести проект на другой хостинг, аккаунт или компьютер, либо передать его другому разработчику.

---

## 1. Что это

Статический двуязычный сайт-портфолио звукового и технологического художника. Английский — по умолчанию (`/…`), русский — под `/ru/…`. Минималистичный дизайн: чёрный фон, моноширинный основной текст (Source Code Pro), заголовки — Geologica, светлый текст.

| Слой | Технология |
|---|---|
| Фреймворк | Astro 5 (статическая генерация, без сервера) |
| Стили | Tailwind CSS 3, токены цветов через CSS-переменные |
| Шрифты | Source Code Pro (400/500/600) — основной текст; Geologica (500/600) — заголовки `h1`/`h2` и меню; самохостинг через `@fontsource`, кириллица есть у обоих |
| Картинки | Astro Image: AVIF/WebP/JPEG, srcset, генерация при сборке (sharp) |
| Аудио-плеер | wavesurfer.js, ленивая загрузка; волна из заранее посчитанных пиков (`.peaks.json`), mp3 не грузится до нажатия Play |
| Видео | Vimeo / YouTube, плеер подгружается по клику (`VideoEmbed.astro`) |
| Блог | Astro Content Collections (Markdown), по умолчанию скрыт |
| Типографика | `typograf` — кавычки, тире, неразрывные пробелы (при сборке) |
| CMS | Pages CMS (<https://pagescms.org>) поверх Git, конфиг `.pages.yml`; редактирует **весь** контент (см. `docs/CMS.md`) |
| Хостинг | GitHub Pages, деплой GitHub Actions |
| Тесты | Vitest |

В проекте остался React и Framer Motion (`@astrojs/react`), но **активные страницы их не используют** — всё на `.astro`. См. раздел 12 про унаследованный код.

Редактирование контента без кода описано в отдельном документе: **`docs/CMS.md`**.

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
.prettierignore       исключает `src/cms/` и `src/content/` из Prettier (иначе правки из CMS ломали бы CI)
AGENTS.md, CLAUDE.md  правила для ИИ-ассистентов (частично устарели, раздел 12)
astro.config.mjs      site, base, интеграции
tailwind.config.mjs   цвета, ширина контейнера, шрифт
content/              ИСХОДНИКИ (в .gitignore — только на локальной машине!), в т.ч. `content/originals/` — оригиналы аудио
docs/                 эта документация + архив старых заметок
scripts/make-peaks.mjs  считает пики волны для mp3 (`npm run peaks`)
public/
  audio/              mp3 для плеера + `.peaks.json` рядом (отдаются как есть)
  cv/                 PDF резюме (EN/RU)
  favicon.svg
src/
  assets/images/      ВСЕ фото (оптимизируются при сборке)
    about/            фон слайдера главной (popov_about_2026_01…08)
    education/        фото лекций и мастер-классов
    projects/         фото проектов и перформансов
  cms/                КОНТЕНТ в JSON, его правит Pages CMS (раздел 5, 10)
    projects/*.json   все проекты и перформансы (по файлу на проект)
    lectures/*.json   лекции и мастер-классы
    performances.json список перформансов
    about.json        короткая биография EN/RU
    contacts.json     строки страницы контактов
  content/blog/{en,ru}/*.md   записи блога (Markdown)
  content.config.ts   схема коллекции блога
  components/         .astro-компоненты (раздел 6)
  constants/blog.ts   переключатель видимости блога
  data/               загрузчики контента из `cms/` (раздел 5)
  i18n/               ui.ts (строки интерфейса), localize.ts
  layouts/Layout.astro
  pages/              маршруты (EN) и pages/ru/ (RU)
  styles/global.css   токены, шрифты заголовков, hairline-линии, анимации скролла
  types/index.ts      типы данных
  utils/              paths, images, audio (пики волны), cmsProject, blog, typo
  views/              страницы целиком, принимают `lang`
```

---

## 4. Маршруты и двуязычность

Каждая страница — тонкий файл в `src/pages/…` и дубль в `src/pages/ru/…`. Оба вызывают один и тот же компонент из `src/views/` с пропсом `lang`.

| URL (EN) | URL (RU) | View |
|---|---|---|
| `/` | `/ru/` | `HomeView` — hero + секции Projects, Performances, Teaching, Contacts |
| `/about` | `/ru/about` | `AboutView` — биография, CV по годам |
| `/projects` | `/ru/projects` | `ProjectsIndexView` |
| `/projects/[slug]` | `/ru/projects/[slug]` | `ProjectView` |
| `/performances` | `/ru/performances` | `PerformancesIndexView` |
| `/performances/[slug]` | `/ru/performances/[slug]` | `ProjectView` |
| `/teaching` | `/ru/teaching` | `TeachingView` (в меню: «Workshops» / «Образовательные мероприятия») |
| `/contacts` | `/ru/contacts` | `ContactsView` |
| `/blog`, `/blog/[slug]` | `/ru/blog…` | `BlogIndexView`, `BlogPostView` — **скрыты по умолчанию** (раздел 5.6) |
| `/404` | — | страница «не найдено» (EN + RU-ссылки) |
| `/sitemap.xml`, `/robots.txt` | — | генерируются при сборке (`src/pages/sitemap.xml.ts`, `robots.txt.ts`) |

Как работает язык:
- `src/i18n/ui.ts` — все строки интерфейса EN/RU, функции `localePath(lang, path)` и `splitLang(pathname)`.
- `src/i18n/localize.ts` — `localizeProject`, `localizePerformance`, `localizeLecture`: подставляют русский текст и прогоняют результат через типограф.
- `Layout.astro` считает `canonical`, `hreflang` (en/ru) и ссылки переключателя языка по текущему пути.
- Страница 404 одна (`src/pages/404.astro`), двуязычная.
- Sitemap содержит все страницы в обоих языках с `hreflang`; блог в него попадает только в режиме `on`.

**Правило:** любой внутренний адрес и путь к ресурсу строить через `withBase()` из `src/utils/paths.ts`. Не писать `/…` напрямую, иначе сломается при смене `base`.

---

## 5. Контент и где он хранится

### 5.1 Проекты (`artworks`) и перформансы
Все проекты — JSON-файлы `src/cms/projects/<slug>.json`, по одному на проект. Их читает `src/data/cmsProjects.ts` (`import.meta.glob`), собирает `Project` через `src/utils/cmsProject.ts` и отдаёт `src/data/projects.ts`.
- **Сортировка:** год по убыванию, внутри года — числовое поле `order` (1 — первым), затем по slug.
- **Скрыть проект:** `hidden: true` в его JSON (переключатель «Скрыть с сайта» в CMS).
- `category: 'artwork'` → раздел Projects; `'performance'` → страница в разделе Performances.
- **Структура файла:** `slug, hidden, order, category, year, title`, блоки `en { description, format, media, credits, venue, curators, photoCredit, text }` и `ru { title, … }` (абзацы в `text` разделяются пустой строкой), `cover` (обложка для списков, если отличается от первого фото), `images[]`, `vimeoId`, `youtubeId`, `audioUrl`, `calameoId`, `links[] { url, label, label_ru }`.
- Недостающие русские поля берутся из английских; без `ru.title` русская страница показывает английский текст.
- Русский текст прогоняется через типограф (`localizeProject`).

Порядок на странице проекта: назад → год → название → блок «технического описания» (format / media / credits, с вертикальной линией слева) → текст → медиа → ссылки. Медиа: **Calameo-зин** с обложкой проекта (если задан `calameoId`), иначе **слайдер фото 3:2**; затем **аудиоплеер с волной** (если `audioUrl` указывает на существующий файл), затем **видео** Vimeo (или YouTube) — оба грузятся по клику.

### 5.2 Остальное
| Данные | Файл | Загрузчик |
|---|---|---|
| Лекции и мастер-классы (EN + RU) | `src/cms/lectures/*.json` (`year, order, kind, title, venue, text, images, youtubeId, ru{…}`) | `src/data/lectures.ts` |
| Список перформансов | `src/cms/performances.json` (`items[]`: `date, title, city, venue, slug, url, ru{…}`; `slug` связывает со страницей проекта) | `src/data/performances.ts` |
| Короткая биография EN/RU | `src/cms/about.json` (`en.text`, `ru.text`, абзацы через пустую строку; 2-й абзац выделяется) | `src/data/cv.ts` (`bio`) |
| Контакты | `src/cms/contacts.json` (`items[]`: `label_en, label_ru, text, url`) | `src/components/ContactsList.astro` |
| CV по годам (EN + RU) | `src/data/cv.ts` — **в коде, не в CMS** | — |
| Названия меню, заголовки, тексты кнопок | `src/i18n/ui.ts` — в коде | — |
| Ссылки на PDF резюме | `src/components/AboutIntro.astro` (Google Drive; файлы в `public/cv/` тоже есть) | — |
| Фото фонового слайдера главной | `src/assets/images/about/popov_about_2026_01…08.jpg` (заменяются подменой файлов) | `HeroSlider.astro` |

### 5.3 Фото
- Через Pages CMS фото проектов загружаются в `src/assets/images/projects`, фото лекций — в `src/assets/images/education`.
- Лежат в `src/assets/images/<раздел>/`, имена по шаблону `popov_<slug>_<год>_NN.jpg` (NN — номер с нуля, `01` — обложка).
- В данных пути пишутся коротко: `/images/projects/popov_auricle_2023_01.jpg` (функция `getAsset()` из `src/utils/images.ts` сопоставляет их с `src/assets`).
- Формат для слайдера: **3:2**, длинная сторона 2400 px, JPEG sRGB. Слайдер обрезает по центру (`object-cover`).
- Новое фото, не лежащее в `src/assets/images`, не покажется.

### 5.4 Аудио
- Файлы — в `public/audio/`, путь в `audioUrl` (например `/audio/popov_auricle_2023.mp3`).
- Если файла нет, плеер просто не рисуется (проверка при сборке, `src/utils/audio.ts`).
- **Пики волны.** Рядом с mp3 лежит `<имя>.peaks.json` (240 значений + длительность). Его делает `npm run peaks -- public/audio/<файл>.mp3` (нужен `ffmpeg`, на macOS `brew install ffmpeg`). Если файл с пиками есть, браузер рисует волну сразу и скачивает mp3 только после нажатия Play; если нет — загружает и декодирует весь файл.
- Mp3 для сайта — 128 kbps. Оригиналы без потерь хранить в `content/originals/` (сейчас там 320-kbps версия Auricle; папка в Git не обязательна).

### 5.5 Видео и зин
- `VideoEmbed.astro` показывает тёмный блок с кнопкой Play; iframe Vimeo/YouTube создаётся только после клика (без сторонних запросов до этого). Без JavaScript — ссылка на видео.
- `CalameoEmbed.astro` — обложка проекта + кнопка «Open the zine», ридер Calameo грузится по клику.

### 5.6 Блог (скрыт)
- Записи — Markdown в `src/content/blog/en/<slug>.md` и `…/ru/<slug>.md` (одинаковый slug у обеих версий). Поля: `title`, `date`, `summary`, `cover`, `project` (slug связанного проекта), `draft`.
- Черновики (`draft: true`) видны только в `npm run dev`.
- Видимость задаёт `src/constants/blog.ts`, константа `BLOG_MODE`:
  - `'off'` — страницы блога не собираются;
  - `'unlisted'` (**сейчас**) — страницы есть по прямой ссылке (`/site/blog/`), но без ссылок в меню, без sitemap, с `noindex`;
  - `'on'` — блог публичный: пункт в меню, sitemap, индексация.
- Роут один: `src/pages/blog/[...slug].astro` (и копия под `ru/`), в режиме `off` `getStaticPaths` возвращает пустой список.
- Если у записи есть только одна языковая версия, во втором языке её не будет.

### 5.7 Поведение при прокрутке
- `ScrollEffects.astro`: блоки (дети контейнера страницы, строки списков) плавно появляются при входе в экран (`data-reveal`, IntersectionObserver, ступенчатая задержка); сверху тонкая полоса прогресса чтения. Отключается при `prefers-reduced-motion` и без JS. Стили — в конце `global.css` (`--reveal-duration`).
- Шапка на главной зафиксирована: прозрачная над фото, после прокрутки на 40 px становится тёмной с размытием.

---

## 6. Компоненты (активные)

| Компонент | Назначение |
|---|---|
| `Header.astro` | переключатель EN/RU слева, меню справа, мобильное `<details>`-меню |
| `HeroSlider.astro` | затемнённый фоновый слайдер главной (фото `about/…_01…08`, смена каждые 15 с, учитывает `prefers-reduced-motion`) |
| `AboutIntro.astro` | биография (с параметром `from` — сколько первых строк пропустить) и ссылка на CV |
| `ProjectDetail.astro` | страница проекта целиком |
| `PhotoSlider.astro` | слайдер: scroll-snap, кнопки, стрелки клавиатуры, счётчик, 3:2 |
| `CalameoEmbed.astro` | зин из Calameo с обложкой проекта, грузится по клику |
| `VideoEmbed.astro` | видео Vimeo/YouTube, плеер по клику |
| `ScrollEffects.astro` | появление блоков при скролле и полоса прогресса |
| `Footer.astro` | подвал: имя (ссылка на главную) и год |
| `AudioWave.astro` | плеер с волной (wavesurfer.js, ленивая загрузка, предрассчитанные пики) |
| `EntryList.astro`, `ProjectsList.astro`, `TeachingList.astro`, `ContactsList.astro` | списки |
| `ScrollTopButton.astro` | кнопка «наверх» (десктоп) |

---

## 7. Дизайн-система

- Цвета — переменные в `src/styles/global.css` (`--color-bg`, `--color-text`, `--color-text-muted`, `--color-border`, …), в Tailwind доступны как `bg-bg`, `text-text`, `text-text-muted`, `border-border`.
- Контейнер — `max-w-container` (1000 px). Основной текст — `font-mono` (Source Code Pro, вес 500). Заголовки `h1`/`h2` и пункты меню — Geologica 500/600 (правило в `global.css`, класс `font-heading` в Tailwind). Сменить шрифт заголовков: `font-family` в `global.css` + импорты `@fontsource/…` в `Layout.astro`.
- Тонкие линии: классы `.divide-thin` (между пунктами списков), `.hairline-t` / `.hairline-b` (границы); на Retina 0,5 px, на обычных экранах 1 px. Не использовать `border-t`/`divide-y` напрямую.
- Блок технического описания проекта: левая линия, 13 px, приглушённый цвет (`ProjectDetail.astro`).
- Мобильная версия: боковые отступы 20 px, укороченный hero, увеличенные зоны нажатия (`.tap`), ссылка «пропустить к содержимому».
- Межстрочный интервал 1.7, текст не шире 65ch, видимый фокус (`:focus-visible`), `prefers-reduced-motion` учтён, на мобильных `100svh`.
- Изменение палитры — только в `global.css`.

---

## 8. Сборка и CI/CD

- `ci.yml` (push/PR в `main`, `develop`): lint + type-check + format:check, тесты с покрытием, сборка.
- `deploy.yml` (push в `main` + ручной запуск): те же проверки (lint, type-check, format:check, test), затем `npm run build` и публикация `dist/` на GitHub Pages.
- **Ловушка:** `format:check` проверяет `src/**` Prettier-ом. Новый код, не отформатированный через `npm run format`, **остановит деплой**. Перед пушем запускайте `npm run format`. Папки `src/cms/` и `src/content/` исключены через `.prettierignore`, чтобы сохранения из Pages CMS не ломали сборку.
- Первая сборка с «холодным» кэшем изображений занимает несколько минут; повторные быстрее.
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

- Конфиг — `.pages.yml` в корне репозитория. Вход: <https://app.pagescms.org> (через GitHub, нужен доступ к репозиторию). Подробная инструкция для редактора — **`docs/CMS.md`**.
- Разделы: «Проекты и перформансы», «Лекции и мастер-классы», «Список перформансов», «Обо мне», «Контакты», «Блог (EN)» / «Блог (RU)». Медиа: фото проектов, фото лекций, аудио.
- Каждое сохранение в CMS — коммит в `main`, запускается деплой (2–4 минуты). Если сборка упала, сайт остаётся прежним; смотреть вкладку Actions.
- Формат JSON, который пишет CMS, отличается от Prettier — поэтому `src/cms/` в `.prettierignore`.
- При смене владельца репозитория заново подключите Pages CMS к новому адресу. CMS не хранит контент у себя: при её отключении всё остаётся в репозитории, редактировать можно вручную в JSON.
- Добавить новое поле в проект: `.pages.yml` (поле) → `src/types/index.ts` (`CmsProject`/`Project`) → `src/utils/cmsProject.ts` → компонент, который его выводит.

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
- Safety Zone: год — 2023 (подтверждён автором).
- Английские тексты лекций переведены автоматически с русского — нужна вычитка.
- Контакты: нет Instagram, Telegram, Vimeo-профиля (добавляются в CMS → «Контакты»).
- Телефон опубликован в контактах и в PDF — решить, оставлять ли.
- Блог пока скрыт (`BLOG_MODE = 'unlisted'`), в нём только черновик-пример `example-post.md` (его можно удалить).
- CV-таблица (`src/data/cv.ts`) и ссылки на PDF — в коде, не в CMS.

Технический долг:
- `AGENTS.md`, `CLAUDE.md`, `README.md` обновлены под текущую структуру; старые заметки Cursor — в `docs/archive/` и корневых `*_REVIEW*.md` (справочно, могут быть устаревшими).
- Неиспользуемый код: `HamburgerMenu.tsx`, `AudioPlayer.tsx`, `VimeoPlayer.tsx`, `OptimizedImage.tsx`, `src/hooks/*`, `src/constants/animations.ts`, `src/utils/imageUtils.ts`, `src/data/writing.ts`, React и Framer Motion в зависимостях. Перед удалением проверьте `grep` по проекту и тесты (`src/test/`), которые ссылаются на хуки.
- `cleanup-structure.sh` в корне — одноразовый скрипт очистки; после запуска можно удалить.
- В `types/index.ts` остались типы под старые React-компоненты.
- OG-картинка есть у проектов (их обложка); у остальных страниц — фото Re-Infinity. Favicon — простая волна `public/favicon.svg`.
- Проверка типов — `tsc --noEmit` (`moduleResolution: bundler`); `astro check` не используется.
- Версия TypeScript (5.9) новее, чем поддерживает `@typescript-eslint` — ESLint печатает предупреждение, на результат оно не влияет.

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
4. Заново подключить Pages CMS к новому репозиторию (ничего не нужно переносить: контент лежит в репозитории).
5. Обновить ссылки на сайт в соцсетях, CV и профилях.

### Перенос на другой компьютер
1. `git clone`, `npm install`, `npm run dev`.
2. **Скопировать папку `content/`** — исходные материалы (оригиналы фото, тексты, PDF, 320-kbps mp3) не хранятся в Git (она в `.gitignore`). Без неё потеряются оригиналы.
3. Для `npm run peaks` на новом компьютере нужен `ffmpeg`.
4. Если используете Claude Code: `CLAUDE.local.md` и история сессий (`~/.claude/projects/…`) тоже локальны.

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

- 1–7 ноя — мобильная версия (шрифты, отступы, укороченный hero), аудит UI/UX и правки (зоны нажатия, подвал, ссылка «пропустить», списки), предрассчитанные пики волны и mp3 128 kbps, видео по клику, обложка зина, закреплённая шапка на главной, блок Performances на главной, страница 404, sitemap и robots, OG-картинка у каждого проекта, скрытый блог, шрифт заголовков Geologica, тонкие линии, анимация появления при скролле, перенос всего контента в Pages CMS.

Полная история: `git log --stat`.
