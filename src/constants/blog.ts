/**
 * Blog visibility switch.
 *
 *  'off'      – blog pages are not built at all.
 *  'unlisted' – pages exist at /blog/ and /ru/blog/ (for writing and previewing),
 *               but there are no links to them, they are not in sitemap.xml and
 *               carry `noindex`. This is the default while the blog is being prepared.
 *  'on'       – public: "Blog" appears in the menu, in the sitemap, and is indexable.
 */
export type BlogMode = 'off' | 'unlisted' | 'on';
export const BLOG_MODE = 'unlisted' as BlogMode;

export const blogBuilt = BLOG_MODE !== 'off';
export const blogPublic = BLOG_MODE === 'on';
