import type { CmsProject, Project, ProjectText } from '../types';
import { cmsToProject, cmsToProjectRu } from '../utils/cmsProject';
import visibility from '../cms/visibility.json';

// Projects added through Pages CMS (.pages.yml) — one JSON file each.
const entries = Object.values(
  import.meta.glob<{ default: CmsProject }>('/src/cms/projects/*.json', { eager: true })
).map((m) => m.default);

export const cmsProjects: Project[] = entries.filter((e) => !e.hidden).map(cmsToProject);

export const cmsProjectsRu: Record<string, ProjectText> = Object.fromEntries(
  entries.flatMap((e) => {
    const ru = cmsToProjectRu(e);
    return ru ? [[e.slug, ru]] : [];
  })
);

/** Slugs of the built-in projects hidden via the "Project visibility" page in the CMS */
export const hiddenSlugs = new Set(
  Object.entries(visibility.hidden as Record<string, boolean>)
    .filter(([, hidden]) => hidden)
    .map(([slug]) => slug)
);
