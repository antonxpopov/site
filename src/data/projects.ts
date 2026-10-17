import type { Project } from '../types';

export const projects: Project[] = [
  {
    id: 1,
    title: "Re:trospection of'",
    description:
      'Complete sound design and audio post-production for an independent film. Work with dialogues, sound library, and musical accompaniment.',
    audioUrl: '/audio/demo1.mp3',
    imageUrl: '/images/project1.jpg',
    images: ['/images/project1-1.jpg', '/images/project1-2.jpg', '/images/project1-3.jpg'],
    // year: "2024", // Пример: добавьте год проекта
    // vimeoId: "123456789", // Пример: добавьте Vimeo ID или URL для видео
    fullDescription:
      'This project involved creating a complete soundscape for an independent short film. The main challenge was to convey the atmosphere of silence and solitude through sound. Techniques used included spatial sound positioning, dialogue work, and creating a unique sonic palette.',
  },
  {
    id: 2,
    title: 'Brand Commercial',
    description:
      'Sound design and musical composition for television advertising. Creating a memorable sonic identity.',
    audioUrl: '/audio/demo2.mp3',
    imageUrl: '/images/project2.jpg',
    images: ['/images/project2-1.jpg', '/images/project2-2.jpg'],
    fullDescription:
      "Sound design and musical composition for a television commercial. The goal was to create a memorable and impactful sonic identity that would resonate with the target audience and enhance the brand's message.",
  },
  {
    id: 3,
    title: "Podcast 'Voices of the City'",
    description:
      'Mixing and mastering for a podcast about urban culture. Processing voices, musical inserts, and sound effects.',
    audioUrl: '/audio/demo3.mp3',
    imageUrl: '/images/project3.jpg',
    images: ['/images/project3-1.jpg', '/images/project3-2.jpg', '/images/project3-3.jpg'],
    fullDescription:
      'Mixing and mastering work for a podcast series exploring urban culture. The project involved processing multiple voice tracks, integrating musical segments, and creating cohesive sound effects that enhanced the storytelling.',
  },
  {
    id: 4,
    title: "Music Album 'Echo'",
    description:
      "Sound engineering and mixing for an indie band's debut album. Work with live instruments and electronics.",
    audioUrl: '/audio/demo4.mp3',
    imageUrl: '/images/project4.jpg',
    images: ['/images/project4-1.jpg', '/images/project4-2.jpg'],
    fullDescription:
      "Sound engineering and mixing for an indie band's debut album. The project balanced live acoustic instruments with electronic elements, creating a cohesive sound that captured the band's unique artistic vision.",
  },
  {
    id: 5,
    title: "Audio Drama 'Night Express'",
    description:
      'Creating an atmospheric soundscape for an audio play. Spatial positioning and effects.',
    audioUrl: '/audio/demo5.mp3',
    imageUrl: '/images/project5.jpg',
    images: ['/images/project5-1.jpg', '/images/project5-2.jpg', '/images/project5-3.jpg'],
    fullDescription:
      "Sound design for an immersive audio drama. The project focused on creating a rich, atmospheric soundscape using spatial audio techniques and carefully crafted sound effects to transport listeners into the story's world.",
  },
  {
    id: 6,
    title: 'Corporate Video',
    description:
      'Sound design for a corporate presentation video. Professional voice processing and background music.',
    audioUrl: '/audio/demo6.mp3',
    imageUrl: '/images/project6.jpg',
    images: ['/images/project6-1.jpg', '/images/project6-2.jpg'],
    fullDescription:
      "Sound design for a corporate presentation video. The work included professional voice processing, background music composition, and ensuring clear, impactful audio that supported the company's message.",
  },
];
