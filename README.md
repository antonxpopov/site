# Портфолио звукорежиссёра на Astro.js

Минималистичный сайт-портфолио для звукорежиссёра и саунд-дизайнера, созданный на Astro.js.

## 🚀 Быстрый старт

### Установка зависимостей

```bash
npm install
```

### Запуск локального сервера разработки

```bash
npm run dev
```

Откройте браузер и перейдите по адресу, который покажет Astro (обычно `http://localhost:4321`)

### Сборка для продакшена

```bash
npm run build
```

Собранные файлы будут в папке `dist/`

### Предпросмотр продакшен-сборки

```bash
npm run preview
```

## 📁 Структура проекта

```
├── src/
│   ├── components/      # Компоненты (Astro + React)
│   │   ├── Hero.astro
│   │   ├── Portfolio.astro
│   │   ├── About.astro
│   │   ├── Contacts.astro
│   │   └── *.jsx        # React компоненты для интерактивности
│   ├── layouts/
│   │   └── Layout.astro  # Базовый layout
│   ├── pages/
│   │   └── index.astro  # Главная страница
│   └── data/
│       └── projects.js  # Данные проектов
├── public/
│   └── audio/           # Аудио файлы
├── astro.config.mjs     # Конфигурация Astro
└── tailwind.config.mjs  # Конфигурация TailwindCSS
```

## 🎨 Настройка

### Изменение данных проектов

Откройте файл `src/data/projects.js` и отредактируйте массив `projects`:

```javascript
export const projects = [
  {
    id: 1,
    title: "Название проекта",
    description: "Описание проекта",
    audioUrl: "/audio/your-file.mp3"
  },
  // ... добавьте свои проекты
];
```

### Добавление аудио файлов

1. Поместите ваши аудио файлы (формат MP3) в папку `public/audio/`
2. Укажите путь в `projects.js`: `audioUrl: "/audio/your-file.mp3"`

### Изменение контактных данных

Откройте файл `src/components/ContactsList.jsx` и отредактируйте массив `contacts`.

### Изменение информации "Обо мне"

Откройте файл `src/components/AboutContent.jsx` и отредактируйте текст.

### Изменение имени и подписи

Откройте файл `src/components/Hero.astro` и измените текст.

## 🌐 Деплой

### Vercel

1. Установите Vercel CLI: `npm i -g vercel`
2. В корне проекта выполните: `vercel`
3. Следуйте инструкциям

Или подключите репозиторий GitHub к Vercel через веб-интерфейс.

### Netlify

```bash
npm run build
netlify deploy --prod --dir=dist
```

## 🛠 Технологии

- **Astro.js** — современный фреймворк для статических сайтов
- **React** — для интерактивных компонентов
- **TailwindCSS** — стилизация
- **Framer Motion** — анимации при скролле

## 📝 Особенности Astro

- Статическая генерация по умолчанию
- Оптимизация производительности
- Поддержка React компонентов с `client:load`
- SEO-friendly из коробки
# site
