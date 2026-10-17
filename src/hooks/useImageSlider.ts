/**
 * Хук для управления слайдером изображений
 * Выносит логику автопрокрутки и навигации из компонента
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import type { ImageSliderOptions } from '../types';

export function useImageSlider(images: string[], options: ImageSliderOptions = {}) {
  const { autoPlayInterval = 4000, pauseDuration = 10000 } = options;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Автопрокрутка
  useEffect(() => {
    if (images.length <= 1 || isPaused) {
      return;
    }

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, autoPlayInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [images.length, isPaused, autoPlayInterval]);

  // Функция паузы автопрокрутки
  const pauseAutoPlay = useCallback(() => {
    setIsPaused(true);
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, pauseDuration);
  }, [pauseDuration]);

  // Навигация
  const goToSlide = useCallback(
    (index: number) => {
      setCurrentIndex(index);
      pauseAutoPlay();
    },
    [pauseAutoPlay]
  );

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    pauseAutoPlay();
  }, [images.length, pauseAutoPlay]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    pauseAutoPlay();
  }, [images.length, pauseAutoPlay]);

  // Очистка при размонтировании
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }
    };
  }, []);

  return {
    currentIndex,
    goToSlide,
    goToNext,
    goToPrevious,
  };
}
