/**
 * TypeScript типы для проекта портфолио звукового художника
 */

export interface Project {
  id: number;
  title: string;
  description: string;
  audioUrl: string;
  imageUrl?: string;
  images?: string[];
  year?: string;
  vimeoId?: string | number;
  fullDescription?: string;
}

export interface Contact {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  url: string;
  label: string;
}

export interface NavLink {
  label: string;
  to: string;
}

export interface UseIntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export interface ImageSliderOptions {
  autoPlayInterval?: number;
  pauseDuration?: number;
}

export interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  width?: number;
  height?: number;
}


