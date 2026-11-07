import type { Lecture } from '../types';
import { toParagraphs } from '../utils/cmsProject';

// Lectures and workshops live in src/cms/lectures/*.json (edited through Pages CMS).
interface LectureEntry {
  order?: number;
  year: string;
  kind: 'Lecture' | 'Workshop';
  title: string;
  venue?: string;
  text?: string;
  images?: string[] | string;
  youtubeId?: string;
  ru?: { title?: string; venue?: string; text?: string };
}

const clean = (v?: string) => (v?.trim() ? v.trim() : undefined);

export const lectures: Lecture[] = Object.values(
  import.meta.glob<{ default: LectureEntry }>('/src/cms/lectures/*.json', { eager: true })
)
  .map((m) => m.default)
  // Newest year first; inside a year by `order`.
  .sort((a, b) => Number(b.year) - Number(a.year) || (a.order ?? 999) - (b.order ?? 999))
  .map((e) => {
    const images = (Array.isArray(e.images) ? e.images : [e.images]).filter(
      (v): v is string => typeof v === 'string' && v.trim() !== ''
    );
    const paragraphs = toParagraphs(e.text) ?? [];
    return {
      year: e.year,
      kind: e.kind,
      title: e.title,
      venue: clean(e.venue) ?? '',
      paragraphs,
      images: images.length ? images : undefined,
      youtubeId: clean(e.youtubeId),
      ru: {
        title: clean(e.ru?.title) ?? e.title,
        venue: clean(e.ru?.venue) ?? clean(e.venue) ?? '',
        paragraphs: toParagraphs(e.ru?.text) ?? paragraphs,
      },
    };
  });
