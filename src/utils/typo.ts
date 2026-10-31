import Typograf from 'typograf';
import type { Lang } from '../types';

// Typographic cleanup at build time: «ёлочки» / “curly quotes”, em dashes,
// non-breaking spaces after short words, numbers and before dashes.
const engines: Record<Lang, Typograf> = {
  ru: new Typograf({ locale: ['ru', 'en-US'] }),
  en: new Typograf({ locale: ['en-US'] }),
};

/** Fields that hold URLs, ids or codes and must stay untouched. */
const SKIP = new Set([
  'url',
  'href',
  'slug',
  'category',
  'year',
  'date',
  'kind',
  'imageUrl',
  'images',
  'vimeoId',
  'youtubeId',
  'audioUrl',
  'calameoId',
  'thumb',
]);

export function typo(text: string, lang: Lang): string {
  return engines[lang].execute(text);
}

/** Applies `typo` to every text field of a (nested) value, skipping URLs and ids. */
export function typoDeep<T>(value: T, lang: Lang, key?: string): T {
  if (key && SKIP.has(key)) return value;
  if (typeof value === 'string') return typo(value, lang) as T;
  if (Array.isArray(value)) return value.map((v) => typoDeep(v, lang)) as T;
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [k, typoDeep(v, lang, k)])
    ) as T;
  }
  return value;
}
