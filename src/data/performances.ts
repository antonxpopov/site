import type { Performance } from '../types';

// Newest first. `slug` links an entry to its project page (video, images, text).
export const performances: Performance[] = [
  {
    date: '2025',
    title: 'Re:trospection of Sound (audiovisual performance)',
    city: 'Vladivostok',
    venue: 'Zarya Center for Contemporary Art',
    slug: 'retrospection-of-sound',
    ru: {
      title: 'Ре:троспекция звука (аудиовизуальный перформанс)',
      city: 'Владивосток',
      venue: 'Центр современного искусства «Заря»',
    },
  },
  {
    date: '2025',
    title: 'Autodeconstruction',
    city: 'Vladivostok',
    venue: 'GBRparts auto salvage yard',
    slug: 'autodeconstruction',
    ru: { title: 'Автодеконструкция', city: 'Владивосток', venue: 'GBRparts, авторазборка' },
  },
  {
    date: '2025',
    title: 'Zhest — evening of electroacoustic improvisation',
    city: 'Vladivostok',
    venue: 'Korobka Gallery',
    ru: {
      title: 'Жесть — вечер электроакустической импровизации',
      city: 'Владивосток',
      venue: 'Галерея «Коробка»',
    },
  },
  {
    date: '2025',
    title: 'Voicing (concert)',
    city: 'Moscow',
    venue: 'Moscow School of Social and Economic Sciences',
    ru: {
      title: 'Озвучивание (концерт)',
      city: 'Москва',
      venue: 'Московская высшая школа социальных и экономических наук',
    },
  },
  {
    // TODO: confirm year / venue
    date: '2023',
    title: 'Safety Zone',
    slug: 'safety-zone',
    ru: { title: 'Безопасная зона' },
  },
];
