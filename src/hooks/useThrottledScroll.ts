/**
 * Хук для оптимизации обработки scroll событий
 * Использует throttle для снижения нагрузки на производительность
 */

import { useEffect, useRef } from 'react';

export function useThrottledScroll(callback: () => void, delay = 100): void {
  // Latest callback lives in a ref so inline callbacks don't re-subscribe the listener every render
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    let lastRun = 0;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const run = () => {
      lastRun = Date.now();
      callbackRef.current();
    };

    const handleScroll = () => {
      const timeSinceLastRun = Date.now() - lastRun;

      if (timeSinceLastRun >= delay) {
        run();
      } else {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(run, delay - timeSinceLastRun);
      }
    };

    // Sync with the initial scroll position (e.g. reload mid-page or opening /#section)
    run();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [delay]);
}
