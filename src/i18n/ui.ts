import type { Lang } from '../types';

export const LANGS: Lang[] = ['en', 'ru'];
export const DEFAULT_LANG: Lang = 'en';

export const ui = {
  en: {
    name: 'Anton Popov',
    siteDescription:
      'Portfolio of Anton Popov — sound and technological artist and experimental composer from Vladivostok.',
    nav: {
      about: 'About',
      projects: 'Projects',
      teaching: 'Workshops',
      performances: 'Performances',
      contacts: 'Contacts',
      blog: 'Blog',
    },
    menu: 'Menu',
    toTop: 'Back to top',
    skip: 'Skip to content',
    scrollDown: 'Scroll down',
    curators: 'Curators',
    photo: 'Photo',
    slider: { prev: 'Previous photo', next: 'Next photo', label: 'Photos' },
    audio: { label: 'Audio', play: 'Play', pause: 'Pause', loading: 'Loading…' },
    video: { play: 'Play video', hint: 'Loads the player from' },
    calameo: { label: 'Zine', open: 'Open the zine', hint: 'Loads the Calameo reader' },
    mainNav: 'Main navigation',
    switchLabel: 'Language',
    back: { projects: 'Projects', performances: 'Performances' },
    blog: { empty: 'No posts yet.', project: 'Project' },
    kind: { Lecture: 'Lecture', Workshop: 'Workshop' },
    downloadCv: 'Download CV (PDF)',
    cvHeading: 'CV',
    contactLabels: { email: 'Email', phone: 'Phone', bandcamp: 'Bandcamp', mixcloud: 'Mixcloud' },
    titles: {
      home: 'Anton Popov — Sound and technological artist',
      projects: 'Projects — Anton Popov',
      performances: 'Performances — Anton Popov',
      teaching: 'Workshops — Anton Popov',
      about: 'About — Anton Popov',
      contacts: 'Contacts — Anton Popov',
      blog: 'Blog — Anton Popov',
    },
    teachingDescription: 'Lectures and workshops by Anton Popov.',
  },
  ru: {
    name: 'Антон Попов',
    siteDescription:
      'Портфолио Антона Попова — звукового и технологического художника, экспериментального композитора из Владивостока.',
    nav: {
      about: 'Обо мне',
      projects: 'Проекты',
      teaching: 'Образовательные мероприятия',
      performances: 'Перформансы',
      contacts: 'Контакты',
      blog: 'Блог',
    },
    menu: 'Меню',
    toTop: 'Наверх',
    skip: 'Перейти к содержимому',
    scrollDown: 'Прокрутить вниз',
    curators: 'Кураторы',
    photo: 'Фото',
    slider: { prev: 'Предыдущее фото', next: 'Следующее фото', label: 'Фотографии' },
    audio: { label: 'Аудио', play: 'Играть', pause: 'Пауза', loading: 'Загрузка…' },
    video: { play: 'Смотреть видео', hint: 'Плеер загружается с' },
    calameo: { label: 'Зин', open: 'Открыть зин', hint: 'Загружается ридер Calameo' },
    mainNav: 'Основная навигация',
    switchLabel: 'Язык',
    back: { projects: 'Проекты', performances: 'Перформансы' },
    blog: { empty: 'Пока нет записей.', project: 'Проект' },
    kind: { Lecture: 'Лекция', Workshop: 'Мастер-класс' },
    downloadCv: 'Скачать CV (PDF)',
    cvHeading: 'CV',
    contactLabels: { email: 'Почта', phone: 'Телефон', bandcamp: 'Bandcamp', mixcloud: 'Mixcloud' },
    titles: {
      home: 'Антон Попов — звуковой и технологический художник',
      projects: 'Проекты — Антон Попов',
      performances: 'Перформансы — Антон Попов',
      teaching: 'Образовательные мероприятия — Антон Попов',
      about: 'Обо мне — Антон Попов',
      contacts: 'Контакты — Антон Попов',
      blog: 'Блог — Антон Попов',
    },
    teachingDescription: 'Лекции и мастер-классы Антона Попова.',
  },
} as const;

/** Prefix an internal path with the language segment (English has none). */
export function localePath(lang: Lang, path: string): string {
  if (lang === DEFAULT_LANG) return path;
  return path === '/' ? '/ru/' : `/ru${path}`;
}

/** Splits a base-less pathname into language and language-less path. */
export function splitLang(pathname: string): { lang: Lang; path: string } {
  if (pathname === '/ru' || pathname.startsWith('/ru/')) {
    return { lang: 'ru', path: pathname.slice(3) || '/' };
  }
  return { lang: 'en', path: pathname };
}
