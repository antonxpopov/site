import { describe, it, expect } from 'vitest';
import { cmsToProject, cmsToProjectRu, toParagraphs } from '../../utils/cmsProject';
import type { CmsProject } from '../../types';

const entry: CmsProject = {
  slug: 'new-work',
  title: 'New Work',
  year: '2026',
  en: { description: 'Short', format: 'Installation', venue: '', text: 'One\nline.\n\n\nTwo.' },
  ru: { title: 'Новая работа', text: 'Один.' },
  images: ['/images/projects/a.jpg', '/images/projects/b.jpg'],
  vimeoId: '',
  links: [{ url: 'https://x.org', label: 'Site', label_ru: 'Сайт' }, { url: '' }],
};

describe('toParagraphs', () => {
  it('splits on blank lines and joins wrapped lines', () => {
    expect(toParagraphs('One\nline.\n\n\nTwo.')).toEqual(['One line.', 'Two.']);
  });

  it('returns undefined for empty text', () => {
    expect(toParagraphs('  \n ')).toBeUndefined();
    expect(toParagraphs()).toBeUndefined();
  });
});

describe('cmsToProject', () => {
  it('maps fields and drops empty strings', () => {
    const p = cmsToProject(entry);
    expect(p).toMatchObject({
      slug: 'new-work',
      category: 'artwork',
      description: 'Short',
      format: 'Installation',
      imageUrl: '/images/projects/a.jpg',
      paragraphs: ['One line.', 'Two.'],
      links: [{ url: 'https://x.org', label: 'Site' }],
    });
    expect(p.venue).toBeUndefined();
    expect(p.vimeoId).toBeUndefined();
  });

  it('accepts a single image saved as a string', () => {
    const p = cmsToProject({ ...entry, images: '/images/projects/a.jpg' as unknown as string[] });
    expect(p.images).toEqual(['/images/projects/a.jpg']);
  });
});

describe('cmsToProjectRu', () => {
  it('falls back to the English description', () => {
    expect(cmsToProjectRu(entry)).toMatchObject({
      title: 'Новая работа',
      description: 'Short',
      paragraphs: ['Один.'],
      linkLabels: ['Сайт'],
    });
  });

  it('is undefined without a Russian title', () => {
    expect(cmsToProjectRu({ ...entry, ru: {} })).toBeUndefined();
  });
});
