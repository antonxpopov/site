/**
 * Оптимизированный компонент изображения
 * Включает обработку ошибок, lazy loading и оптимизацию
 */

import { useState, useMemo } from 'react';
import type { OptimizedImageProps } from '../types';
import { generatePlaceholder, getOptimizedImageUrl } from '../utils/imageUtils';
import { withBase } from '../utils/paths';

export function OptimizedImage({
  src,
  alt,
  className = '',
  loading = 'lazy',
  priority = false,
  width,
  height,
}: OptimizedImageProps) {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Оптимизируем URL изображения
  const optimizedSrc = useMemo(() => {
    if (error) return generatePlaceholder(width, height);
    const url = withBase(src);
    return priority ? url : getOptimizedImageUrl(url, { width, quality: 85 });
  }, [src, error, priority, width, height]);

  const handleError = () => {
    setError(true);
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="relative">
      {isLoading && <div className="absolute inset-0 bg-bg-secondary animate-pulse" />}
      <img
        src={optimizedSrc}
        alt={alt}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        loading={loading}
        decoding={loading === 'lazy' ? 'async' : 'sync'}
        fetchPriority={priority ? 'high' : 'low'}
        width={width}
        height={height}
        onError={handleError}
        onLoad={handleLoad}
      />
    </div>
  );
}
