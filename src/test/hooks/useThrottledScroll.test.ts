import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useThrottledScroll } from '../../hooks/useThrottledScroll';

const scroll = () => window.dispatchEvent(new Event('scroll'));

describe('useThrottledScroll', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('runs the callback once on mount', () => {
    const callback = vi.fn();
    renderHook(() => useThrottledScroll(callback, 100));

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('throttles bursts of scroll events and fires a trailing call', () => {
    const callback = vi.fn();
    renderHook(() => useThrottledScroll(callback, 100));
    callback.mockClear();

    scroll();
    scroll();
    scroll();
    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(100);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('does not re-subscribe when the callback identity changes', () => {
    const addSpy = vi.spyOn(window, 'addEventListener');
    const { rerender } = renderHook(({ cb }: { cb: () => void }) => useThrottledScroll(cb, 100), {
      initialProps: { cb: vi.fn() },
    });
    const subscriptions = addSpy.mock.calls.filter(([type]) => type === 'scroll').length;

    rerender({ cb: vi.fn() });
    rerender({ cb: vi.fn() });

    expect(addSpy.mock.calls.filter(([type]) => type === 'scroll').length).toBe(subscriptions);
    addSpy.mockRestore();
  });

  it('calls the latest callback', () => {
    const first = vi.fn();
    const second = vi.fn();
    const { rerender } = renderHook(({ cb }: { cb: () => void }) => useThrottledScroll(cb, 100), {
      initialProps: { cb: first },
    });

    rerender({ cb: second });
    vi.advanceTimersByTime(100);
    scroll();

    expect(second).toHaveBeenCalledTimes(1);
  });

  it('removes the listener on unmount', () => {
    const callback = vi.fn();
    const { unmount } = renderHook(() => useThrottledScroll(callback, 100));
    callback.mockClear();

    unmount();
    vi.advanceTimersByTime(100);
    scroll();

    expect(callback).not.toHaveBeenCalled();
  });
});
