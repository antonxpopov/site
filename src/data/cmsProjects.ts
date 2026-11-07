import type { CmsProject, Project, ProjectText } from '../types';
import { cmsToProject, cmsToProjectRu } from '../utils/cmsProject';

// All projects live in src/cms/projects/*.json (one file each), edited through Pages CMS (.pages.yml).
const entries = Object.values(
  import.meta.glob<{ default: CmsProject }>('/src/cms/projects/*.json', { eager: true })
)
  .map((m) => m.default)
  .filter((e) => !e.hidden)
  // Newest year first; inside a year by `order`, then by slug.
  .sort(
    (a, b) =>
      Number(b.year ?? 0) - Number(a.year ?? 0) ||
      (a.order ?? 999) - (b.order ?? 999) ||
      a.slug.localeCompare(b.slug)
  );

export const cmsProjects: Project[] = entries.map(cmsToProject);

export const cmsProjectsRu: Record<string, ProjectText> = Object.fromEntries(
  entries.flatMap((e) => {
    const ru = cmsToProjectRu(e);
    return ru ? [[e.slug, ru]] : [];
  })
);
