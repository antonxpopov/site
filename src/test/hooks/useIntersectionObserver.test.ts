/**
 * Тесты для хука useIntersectionObserver
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

describe('useIntersectionObserver', () => {
  const originalObserver = window.IntersectionObserver;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    window.IntersectionObserver = originalObserver;
  });

  it('должен возвращать ref и isInView', () => {
    const { result } = renderHook(() => useIntersectionObserver());

    expect(result.current[0]).toBeDefined();
    expect(typeof result.current[1]).toBe('boolean');
  });

  it('должен устанавливать isInView в true при отсутствии IntersectionObserver', () => {
    // @ts-expect-error -- simulate a browser without IntersectionObserver
    delete window.IntersectionObserver;

    const { result } = renderHook(() => useIntersectionObserver());

    expect(result.current[1]).toBe(true);
  });

  it('должен использовать кастомные опции', () => {
    const { result } = renderHook(() =>
      useIntersectionObserver({
        threshold: 0.5,
        rootMargin: '100px',
        triggerOnce: false,
      })
    );

    expect(result.current[0]).toBeDefined();
    expect(result.current[1]).toBeDefined();
  });
});
