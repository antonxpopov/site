/**
 * Переиспользуемый хук для отслеживания видимости элементов
 * Заменяет дублированный код IntersectionObserver в компонентах
 */

import { useState, useEffect, useRef } from 'react';
import type { RefObject } from 'react';
import type { UseIntersectionObserverOptions } from '../types';

export function useIntersectionObserver<T extends HTMLElement = HTMLDivElement>(
  options: UseIntersectionObserverOptions = {}
): [RefObject<T>, boolean] {
  const { threshold = 0.1, rootMargin = '50px', triggerOnce = true } = options;
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    // Fallback для браузеров без IntersectionObserver
    if (!('IntersectionObserver' in window)) {
      setIsInView(true);
      return;
    }

    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsInView(true);
          // Отключаем observer после первого появления, если triggerOnce = true
          if (triggerOnce) {
            observer.unobserve(currentRef);
          }
        } else if (!triggerOnce) {
          // Обновляем состояние при выходе из viewport, если triggerOnce = false
          setIsInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(currentRef);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce]);

  return [ref, isInView];
}
