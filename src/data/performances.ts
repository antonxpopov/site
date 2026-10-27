import type { Performance } from '../types';

// Newest first. `slug` links an entry to its project page (video, images, text).
export const performances: Performance[] = [
  {
    date: '2025',
    title: 'Autodeconstruction',
    city: 'Vladivostok',
    venue: 'GBRparts auto salvage yard',
    slug: 'autodeconstruction',
    ru: { title: 'Автодеконструкция', city: 'Владивосток', venue: 'GBRparts, авторазборка' },
  },
  {
    // TODO: confirm year
    date: '2023',
    title: 'Safety Zone',
    city: 'Vladivostok',
    venue: 'Zarya Center for Contemporary Art',
    slug: 'safety-zone',
    ru: {
      title: 'Безопасная зона',
      city: 'Владивосток',
      venue: 'Центр современного искусства «Заря»',
    },
  },
];
