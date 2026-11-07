import type { APIRoute } from 'astro';
import { blogPublic } from '../constants/blog';
import { getPosts } from '../utils/blog';
import { projects } from '../data/projects';
import { localePath } from '../i18n/ui';
import { withBase } from '../utils/paths';

// Hand-rolled sitemap (no extra dependency): every page in both languages with hreflang links.
const staticPaths = ['/', '/about', '/projects', '/teaching', '/performances', '/contacts'];

export const GET: APIRoute = async ({ site }) => {
  // Blog joins the sitemap only when it is public (posts that exist in both languages are listed per language).
  const blogPaths = blogPublic
    ? [
        ...new Set(
          [...(await getPosts('en')), ...(await getPosts('ru'))].map((p) => `/blog/${p.slug}`)
        ),
      ]
    : [];
  const neutral = [
    ...staticPaths,
    ...(blogPublic ? ['/blog', ...blogPaths] : []),
    ...projects.map((p) =>
      p.category === 'performance' ? `/performances/${p.slug}` : `/projects/${p.slug}`
    ),
  ];
  const abs = (lang: 'en' | 'ru', path: string) => {
    const href = new URL(withBase(localePath(lang, path)), site).href;
    return href.endsWith('/') ? href : `${href}/`;
  };
  const urls = neutral
    .flatMap((path) =>
      (['en', 'ru'] as const).map(
        (lang) =>
          `  <url>\n    <loc>${abs(lang, path)}</loc>\n` +
          `    <xhtml:link rel="alternate" hreflang="en" href="${abs('en', path)}"/>\n` +
          `    <xhtml:link rel="alternate" hreflang="ru" href="${abs('ru', path)}"/>\n  </url>`
      )
    )
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
