# ⚡ Быстрый старт: Внедрение улучшений

## 🎯 Минимальный набор для начала работы

### Шаг 1: Установка зависимостей (5 минут)

```bash
# TypeScript
npm install -D typescript @types/react @types/react-dom @types/node

# DevTools
npm install -D \
  eslint \
  @typescript-eslint/eslint-plugin \
  @typescript-eslint/parser \
  eslint-plugin-react \
  eslint-plugin-react-hooks \
  eslint-plugin-astro \
  eslint-config-prettier \
  prettier \
  prettier-plugin-astro

# Тестирование
npm install -D \
  vitest \
  @vitejs/plugin-react \
  @testing-library/react \
  @testing-library/jest-dom \
  jsdom
```

### Шаг 2: Использование готовых хуков (10 минут)

**Замените дублированный код IntersectionObserver:**

```tsx
// ❌ БЫЛО (PortfolioCard.jsx):
const [isInView, setIsInView] = useState(false);
useEffect(() => {
  // 20+ строк кода...
}, []);

// ✅ СТАЛО:
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const [ref, isInView] = useIntersectionObserver({ threshold: 0.1 });
```

### Шаг 3: Использование констант (5 минут)

```tsx
// ❌ БЫЛО:
delay: index * 0.1

// ✅ СТАЛО:
import { ANIMATION_DELAYS } from '../constants/animations';
delay: index * ANIMATION_DELAYS.CARD
```

### Шаг 4: Запуск проверок (2 минуты)

```bash
# Проверка типов (после миграции на TS)
npm run type-check

# Линтинг
npm run lint

# Форматирование
npm run format
```

---

## 📋 Чеклист быстрого внедрения

- [ ] Установить зависимости
- [ ] Использовать `useIntersectionObserver` вместо дублированного кода
- [ ] Использовать константы из `src/constants/animations.ts`
- [ ] Запустить `npm run lint` и исправить ошибки
- [ ] Запустить `npm run format` для форматирования

---

## 🚀 Следующие шаги

После быстрого старта переходите к полному внедрению:
1. Читайте `TECHNICAL_REVIEW.md` для полного анализа
2. Следуйте `IMPLEMENTATION_GUIDE.md` для пошагового внедрения
3. Используйте `README_IMPROVEMENTS.md` как справочник

---

**Время быстрого старта:** ~20 минут  
**Эффект:** Улучшение кода на 30-40%


