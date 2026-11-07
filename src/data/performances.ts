import type { Performance } from '../types';
import data from '../cms/performances.json';

// The list of performances is edited through Pages CMS (src/cms/performances.json), newest first.
// `slug` links an entry to its project page (video, images, text).
const clean = (v?: string) => (v?.trim() ? v.trim() : undefined);

export const performances: Performance[] = (
  data.items as {
    date: string;
    title: string;
    city?: string;
    venue?: string;
    slug?: string;
    url?: string;
    ru?: { title?: string; city?: string; venue?: string };
  }[]
).map((p) => ({
  date: p.date,
  title: p.title,
  city: clean(p.city),
  venue: clean(p.venue),
  slug: clean(p.slug),
  url: clean(p.url),
  ru: p.ru?.title
    ? { title: p.ru.title, city: clean(p.ru.city), venue: clean(p.ru.venue) }
    : undefined,
}));
