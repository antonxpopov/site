/**
 * Хук для оптимизации обработки scroll событий
 * Использует throttle для снижения нагрузки на производительность
 */

import { useCallback, useEffect, useRef } from 'react';

export function useThrottledScroll(
  callback: () => void,
  delay = 100
): void {
  const lastRun = useRef(Date.now());
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const throttledCallback = useCallback(() => {
    const now = Date.now();
    const timeSinceLastRun = now - lastRun.current;

    if (timeSinceLastRun >= delay) {
      callback();
      lastRun.current = now;
    } else {
      // Очищаем предыдущий timeout, если он существует
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      // Планируем выполнение после оставшегося времени
      timeoutRef.current = setTimeout(() => {
        callback();
        lastRun.current = Date.now();
      }, delay - timeSinceLastRun);
    }
  }, [callback, delay]);

  useEffect(() => {
    window.addEventListener('scroll', throttledCallback, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', throttledCallback);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [throttledCallback]);
}


