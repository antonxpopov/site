/**
 * TypeScript типы для проекта портфолио звукового художника
 */

export type Lang = 'en' | 'ru';

/** Translatable text fields of a project */
export interface ProjectText {
  title: string;
  description: string;
  format?: string;
  media?: string;
  credits?: string;
  venue?: string;
  curators?: string;
  photoCredit?: string;
  paragraphs?: string[];
  /** Labels for `links`, in the same order */
  linkLabels?: string[];
}

export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  /** URL slug, e.g. 'retrospection-of-sound' */
  slug: string;
  title: string;
  /** Short one-line summary shown on cards */
  description: string;
  /** 'artwork' → Artworks grid; 'performance' → project page only */
  category?: 'artwork' | 'performance';
  year?: string;
  /** e.g. "Interactive sound installation" */
  format?: string;
  /** Materials / media used */
  media?: string;
  /** e.g. "with Aleksei Balakhnin" */
  credits?: string;
  /** Where it was shown, e.g. venue and festival */
  venue?: string;
  /** Names only; the label comes from ui */
  curators?: string;
  /** Photographer name(s), shown under the slider */
  photoCredit?: string;
  imageUrl?: string;
  images?: string[];
  vimeoId?: string | number;
  /** Used only when there is no vimeoId */
  youtubeId?: string;
  /** Path under public/, e.g. '/audio/auricle.mp3' — shown as a waveform player if the file exists */
  audioUrl?: string;
  /** Calameo book id — replaces the photo slider */
  calameoId?: string;
  /** Full text, one string per paragraph */
  paragraphs?: string[];
  links?: ProjectLink[];
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

export interface Performance {
  date: string;
  title: string;
  city?: string;
  venue?: string;
  ru?: { title: string; city?: string; venue?: string };
  url?: string;
  /** Slug of a project page with details/video */
  slug?: string;
}

export interface Lecture {
  year: string;
  kind: 'Lecture' | 'Workshop';
  title: string;
  venue: string;
  paragraphs: string[];
  images?: string[];
  ru: { title: string; venue: string; paragraphs: string[] };
}

export interface WritingItem {
  year: string;
  title: string;
  publication?: string;
  url?: string;
}
