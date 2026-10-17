# 🚀 Руководство по внедрению улучшений

Этот документ содержит пошаговые инструкции по внедрению всех улучшений из технического отчёта.

---

## 📋 Этап 1: Миграция на TypeScript (Критично)

### Шаг 1.1: Установка зависимостей

```bash
npm install -D typescript @types/react @types/react-dom @types/node
```

### Шаг 1.2: Обновление tsconfig.json

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "react",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### Шаг 1.3: Переименование файлов

```bash
# Переименовать все .jsx в .tsx
find src -name "*.jsx" -exec sh -c 'mv "$1" "${1%.jsx}.tsx"' _ {} \;

# Переименовать .js в .ts (для утилит)
find src -name "*.js" -not -path "*/node_modules/*" -exec sh -c 'mv "$1" "${1%.js}.ts"' _ {} \;
```

### Шаг 1.4: Добавление типов

Используйте созданный файл `src/types/index.ts` и обновите все компоненты:

```tsx
// Пример для PortfolioCard.tsx
import type { Project } from '../types';

interface PortfolioCardProps {
  project: Project;
  index: number;
}

export default function PortfolioCard({ project, index }: PortfolioCardProps) {
  // ...
}
```

---

## 📋 Этап 2: Рефакторинг хуков (Важно)

### Шаг 2.1: Использование useIntersectionObserver

Замените дублированный код во всех компонентах:

**Было:**
```jsx
const [isInView, setIsInView] = useState(false);
useEffect(() => {
  // 20+ строк кода
}, []);
```

**Стало:**
```tsx
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const [ref, isInView] = useIntersectionObserver({ threshold: 0.1 });
```

### Шаг 2.2: Обновление HamburgerMenu

```tsx
import { useThrottledScroll } from '../hooks/useThrottledScroll';

export default function HamburgerMenu() {
  const [activeSection, setActiveSection] = useState('');

  useThrottledScroll(() => {
    // Логика определения активной секции
  }, 100);
}
```

---

## 📋 Этап 3: Мемоизация компонентов (Важно)

### Шаг 3.1: Обновление PortfolioCard

```tsx
import { memo, useMemo } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { OptimizedImage } from './OptimizedImage';
import { ANIMATION_DELAYS } from '../constants/animations';

const PortfolioCard = memo(function PortfolioCard({ 
  project, 
  index 
}: PortfolioCardProps) {
  const [ref, isInView] = useIntersectionObserver();
  
  const transition = useMemo(
    () => ({ 
      duration: 0.6, 
      delay: index * ANIMATION_DELAYS.CARD 
    }),
    [index]
  );

  // ... остальной код
});
```

---

## 📋 Этап 4: Настройка DevTools (Важно)

### Шаг 4.1: Установка зависимостей

```bash
npm install -D \
  eslint \
  @typescript-eslint/eslint-plugin \
  @typescript-eslint/parser \
  eslint-plugin-react \
  eslint-plugin-react-hooks \
  eslint-plugin-astro \
  eslint-config-prettier \
  prettier \
  prettier-plugin-astro \
  vitest \
  @vitejs/plugin-react \
  @testing-library/react \
  @testing-library/jest-dom \
  jsdom
```

### Шаг 4.2: Добавление скриптов в package.json

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx,.astro",
    "lint:fix": "eslint . --ext .js,.jsx,.ts,.tsx,.astro --fix",
    "format": "prettier --write \"src/**/*.{js,jsx,ts,tsx,astro,json,css}\"",
    "format:check": "prettier --check \"src/**/*.{js,jsx,ts,tsx,astro,json,css}\"",
    "type-check": "tsc --noEmit",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage"
  }
}
```

### Шаг 4.3: Настройка pre-commit hooks

```bash
npm install -D husky lint-staged
npx husky init
```

Создайте `.husky/pre-commit`:
```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
```

Создайте `.lintstagedrc.json`:
```json
{
  "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
  "*.{astro,json,css}": ["prettier --write"]
}
```

---

## 📋 Этап 5: Оптимизация производительности

### Шаг 5.1: Использование OptimizedImage

Замените все `<img>` на `<OptimizedImage>`:

```tsx
import { OptimizedImage } from './OptimizedImage';

<OptimizedImage
  src={project.imageUrl}
  alt={project.title}
  className="w-full h-full object-cover"
  loading="lazy"
  priority={index < 3}
/>
```

### Шаг 5.2: Code-splitting для Framer Motion

Создайте обёртку для ленивой загрузки:

```tsx
// src/components/MotionWrapper.tsx
import { lazy, Suspense } from 'react';
import type { MotionProps } from 'framer-motion';

const MotionDiv = lazy(() =>
  import('framer-motion').then(mod => ({ default: mod.motion.div }))
);

export function MotionWrapper({ 
  children, 
  ...props 
}: MotionProps & { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div>{children}</div>}>
      <MotionDiv {...props}>{children}</MotionDiv>
    </Suspense>
  );
}
```

---

## 📋 Этап 6: Улучшение SEO

### Шаг 6.1: Добавление Structured Data

Обновите `Layout.astro`:

```astro
<script type="application/ld+json" set:html={JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Anton Popov",
  "jobTitle": "Sound Artist",
  "url": Astro.url.href,
  "sameAs": [
    "https://instagram.com/ivan_petrov_sound",
    "https://soundcloud.com/ivan-petrov-sound"
  ]
})} />
```

### Шаг 6.2: Улучшение мета-тегов

```astro
<meta property="og:image" content={new URL('/og-image.jpg', Astro.site).href} />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:locale" content="en_US" />
```

---

## 📋 Этап 7: Написание тестов

### Шаг 7.1: Тесты для хуков

Используйте созданный файл `src/test/hooks/useIntersectionObserver.test.ts` как пример.

### Шаг 7.2: Тесты для компонентов

```tsx
// src/test/components/PortfolioCard.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PortfolioCard from '../../components/PortfolioCard';
import { mockProject } from '../mocks';

describe('PortfolioCard', () => {
  it('рендерит название проекта', () => {
    render(<PortfolioCard project={mockProject} index={0} />);
    expect(screen.getByText(mockProject.title)).toBeInTheDocument();
  });
});
```

---

## 📋 Этап 8: Настройка CI/CD

### Шаг 8.1: GitHub Actions

Используйте созданный файл `.github/workflows/ci.yml`.

### Шаг 8.2: Настройка деплоя

Добавьте в `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

---

## ✅ Чеклист внедрения

- [ ] Этап 1: Миграция на TypeScript
- [ ] Этап 2: Рефакторинг хуков
- [ ] Этап 3: Мемоизация компонентов
- [ ] Этап 4: Настройка DevTools
- [ ] Этап 5: Оптимизация производительности
- [ ] Этап 6: Улучшение SEO
- [ ] Этап 7: Написание тестов
- [ ] Этап 8: Настройка CI/CD

---

## 📊 Ожидаемые результаты

После внедрения всех улучшений:

- ✅ **Типобезопасность:** 100% покрытие TypeScript
- ✅ **Производительность:** Улучшение Lighthouse Score на 20-30%
- ✅ **Поддерживаемость:** Снижение дублирования кода на 60%
- ✅ **Качество:** Покрытие тестами > 70%
- ✅ **CI/CD:** Автоматическая проверка при каждом PR

---

**Время внедрения:** 5-7 рабочих дней  
**Приоритет:** Критично → Важно → Желательно



