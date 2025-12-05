/**
 * Константы для анимаций
 * Устраняет магические числа в коде
 */

export const ANIMATION_DELAYS = {
  STAGGER: 0.1, // Задержка между элементами в списке
  CARD: 0.1, // Задержка для карточек портфолио
  CONTACT: 0.1, // Задержка для контактов
  HERO: 0.2, // Задержка для hero секции
} as const;

export const ANIMATION_DURATIONS = {
  FAST: 0.3,
  NORMAL: 0.6,
  SLOW: 0.8,
  VERY_SLOW: 1.0,
} as const;

export const LAYOUT = {
  SECTION_MIN_HEIGHT: '80vh',
  SECTION_PADDING: 'py-16',
  CONTAINER_MAX_WIDTH: '1000px',
} as const;

export const SCROLL_THRESHOLDS = {
  SCROLL_TO_TOP: 300, // Показывать кнопку "наверх" после 300px
  ACTIVE_SECTION_OFFSET: 100, // Смещение для определения активной секции
} as const;


