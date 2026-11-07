import type { Project } from '../types';
import { cmsProjects } from './cmsProjects';

/** All visible projects, newest first. Content: src/cms/projects/*.json (Pages CMS). */
export const projects: Project[] = cmsProjects;

export const artworks = projects.filter((p) => p.category !== 'performance');

export const performanceProjects = projects.filter((p) => p.category === 'performance');

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
