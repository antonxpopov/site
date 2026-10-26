import type { Lang, Project, Performance, Lecture } from '../types';
import { projectsRu } from '../data/projects.ru';

/** Returns the project with text fields in the requested language (EN fallback). */
export function localizeProject(project: Project, lang: Lang): Project {
  if (lang === 'en') return project;
  const ru = projectsRu[project.slug];
  if (!ru) return project;
  return {
    ...project,
    title: ru.title,
    description: ru.description,
    format: ru.format ?? project.format,
    media: ru.media ?? project.media,
    credits: ru.credits ?? project.credits,
    venue: ru.venue ?? project.venue,
    curators: ru.curators ?? project.curators,
    photoCredit: ru.photoCredit ?? project.photoCredit,
    paragraphs: ru.paragraphs ?? project.paragraphs,
    links: project.links?.map((link, i) => ({ ...link, label: ru.linkLabels?.[i] ?? link.label })),
  };
}

export function localizePerformance(item: Performance, lang: Lang) {
  const text = lang === 'ru' && item.ru ? item.ru : item;
  return { title: text.title, city: text.city, venue: text.venue };
}

export function localizeLecture(item: Lecture, lang: Lang) {
  return lang === 'ru'
    ? { ...item.ru }
    : { title: item.title, venue: item.venue, paragraphs: item.paragraphs };
}
