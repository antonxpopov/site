import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../types';

export type BlogPost = CollectionEntry<'blog'> & { slug: string };

/** Posts of one language, newest first. Drafts are shown only in dev. */
export async function getPosts(lang: Lang): Promise<BlogPost[]> {
  const all = await getCollection('blog', ({ id, data }) => {
    return id.startsWith(`${lang}/`) && (import.meta.env.DEV || !data.draft);
  });
  return all
    .map((entry) => ({ ...entry, slug: entry.id.slice(lang.length + 1) }))
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export function formatDate(date: Date, lang: Lang): string {
  return new Intl.DateTimeFormat(lang === 'ru' ? 'ru-RU' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}
