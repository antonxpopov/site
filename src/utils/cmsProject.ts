import type { CmsProject, CmsProjectText, Project, ProjectText } from '../types';

/** Splits CMS free text into paragraphs on blank lines. */
export function toParagraphs(text?: string): string[] | undefined {
  const paragraphs = (text ?? '')
    .split(/\n\s*\n/)
    .map((p) => p.replace(/\s*\n\s*/g, ' ').trim())
    .filter(Boolean);
  return paragraphs.length ? paragraphs : undefined;
}

// Pages CMS saves cleared fields as empty strings; treat them as missing.
function clean(value?: string): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

function textFields(text: CmsProjectText = {}) {
  return {
    format: clean(text.format),
    media: clean(text.media),
    credits: clean(text.credits),
    venue: clean(text.venue),
    curators: clean(text.curators),
    photoCredit: clean(text.photoCredit),
    paragraphs: toParagraphs(text.text),
  };
}

export function cmsToProject(entry: CmsProject): Project {
  // Single upload may be saved as a plain string
  const raw: unknown = entry.images;
  const images = (Array.isArray(raw) ? raw : [raw]).filter(
    (v): v is string => typeof v === 'string' && v.trim() !== ''
  );
  return {
    slug: entry.slug,
    title: entry.title,
    description: clean(entry.en?.description) ?? '',
    category: entry.category ?? 'artwork',
    year: clean(entry.year),
    ...textFields(entry.en),
    imageUrl: images[0],
    images: images.length ? images : undefined,
    vimeoId: clean(entry.vimeoId),
    youtubeId: clean(entry.youtubeId),
    audioUrl: clean(entry.audioUrl),
    links: entry.links
      ?.filter((link) => clean(link.url))
      .map((link) => ({ url: link.url.trim(), label: clean(link.label) ?? link.url.trim() })),
  };
}

/** Russian text of a CMS project, or undefined when no Russian title is given. */
export function cmsToProjectRu(entry: CmsProject): ProjectText | undefined {
  const title = clean(entry.ru?.title);
  if (!title) return undefined;
  return {
    title,
    description: clean(entry.ru?.description) ?? clean(entry.en?.description) ?? '',
    ...textFields(entry.ru),
    linkLabels: entry.links
      ?.filter((link) => clean(link.url))
      .map((link) => clean(link.label_ru) ?? clean(link.label) ?? link.url.trim()),
  };
}
