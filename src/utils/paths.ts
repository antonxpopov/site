/**
 * Prefixes a root-relative path with the configured Astro `base`,
 * so links and assets work when the site is served from a subpath.
 */
export function withBase(path: string, base: string = import.meta.env.BASE_URL): string {
  if (/^([a-z]+:)?\/\//i.test(path) || path.startsWith('mailto:') || path.startsWith('data:')) {
    return path;
  }
  const prefix = base.endsWith('/') ? base.slice(0, -1) : base;
  const suffix = path.startsWith('/') ? path : `/${path}`;
  return `${prefix}${suffix}`;
}
