import type { Project } from '../types';

const IMG = '/images/projects';

export const projects: Project[] = [
  {
    slug: 'retrospection-of-sound',
    title: 'Re:trospection of Sound',
    category: 'artwork',
    year: '2025',
    format: 'Interactive sound installation',
    media: 'Retro car radios, cassette tapes, fomex. Sizes vary.',
    description:
      'Memory of the 1990s and the first Japanese cars in the Far East, told through the artist’s family tape archive.',
    imageUrl: `${IMG}/popov_retrospection-of-sound_2025_01.jpg`,
    images: [
      `${IMG}/popov_retrospection-of-sound_2025_01.jpg`,
      `${IMG}/popov_retrospection-of-sound_2025_02.jpg`,
      `${IMG}/popov_retrospection-of-sound_2025_03.jpg`,
    ],
    photoCredit: 'Vadim Martynenko',
    vimeoId: '1095200572',
    paragraphs: [
      'The project Re:trospection of Sound works with layers of memory of the 1990s — it preserves a feeling of something new, acquired, almost familial, associated with the first cars. The Japanese auto industry began to penetrate the Soviet, and then Russian market back in the 1970s, but then these were isolated cases. The real boom came in the 1990s, when right-hand drive cars literally burst into everyday life, gradually becoming part of the cultural code of the region. The right-hand drive as a characteristic feature became a kind of marker “from the outside”, while for the Far Easterners themselves it was never something exotic — just a norm familiar from childhood.',
      'RE:trospection is a look into the past through the prism of contemporary perception. Music from the past is not simply repeated, but recreated in the context of the exhibition space, allowing the viewer to find rhythms that help form a new experience when confronted with the artist’s family audio archives. Questioning and searching for answers to tragedies is a characteristic feature of the culture of late modernism, the era in which we live. The past, like a ghost, reminds us of itself in separate features, like modern music, saturated with samples — fragments of previously created compositions. It appears in fits and starts, becoming part of modern cultural artifacts, and not an exact reproduction of what was.',
      'Anton’s source material — his father’s audio recordings, found in the archive, covered in the dust of oblivion — becomes a tool for return and the potential discovery of new meanings. Some tapes bear no titles, labeled simply as “Untitled”, yet each one feels familiar, a relic of that distant past. By assembling musical compositions into a layered collage, the artist creates intersections of past images that resurface in the present. Thus, in this project, the past — filled with the warmth of family trips and the twists of history — becomes a memory echoing from the depths of time. Those very sounds from Dad’s car turn into a portal, allowing a return to an era of discoveries — sometimes sad, sometimes tragic, but always carrying within them that quintessential Far Eastern mix of love, kindness, and the fresh wind of change.',
    ],
  },
  {
    slug: 're-infinity',
    title: 'RE∞',
    category: 'artwork',
    year: '2024',
    format: 'Experimental music, sound collage',
    media: 'Audio cassette tape [60′00″]',
    description:
      'A 60-minute ambient cassette built from the artist’s father’s dying family tapes.',
    imageUrl: `${IMG}/popov_re-infinity_2024_01.jpg`,
    images: [
      `${IMG}/popov_re-infinity_2024_01.jpg`,
      `${IMG}/popov_re-infinity_2024_02.jpg`,
      `${IMG}/popov_re-infinity_2024_03.jpg`,
    ],
    paragraphs: [
      'An artistic research project placed in the discursive field of media archaeology, hauntology of sound, and research into the mechanisms of memory and recollection. The material for the research was my father’s family collection of audiocassettes, with recordings of popular music from the end of the last century, contained on slowly dying magnetic tape.',
      'The appeal to reflective and restorative nostalgia as a central sensual and subjective method, and the use of the principle of random fragmentation of the documented sound recording, resampling and stretching the canvas, help the ghostly evidence of the past to address the present and future moment.',
    ],
  },
  {
    slug: 'auricle',
    title: 'Auricle',
    category: 'artwork',
    year: '2023',
    format: 'Soundscape, digital recording',
    description:
      'The ocean in a seashell: sound, memory and nostalgia for the lives of ancient sea creatures.',
    imageUrl: `${IMG}/popov_auricle_2023_01.jpg`,
    images: [`${IMG}/popov_auricle_2023_01.jpg`],
    audioUrl: '/audio/popov_auricle_2023.mp3',
    paragraphs: [
      'The high-pitched noise from a sea shell held to the ear is associated by many with a childhood belief in the inexplicable magic of the sound of waves preserved in the shell. The shell’s ocean-like resonance is partly due to the similarities between the sounds of airflow and ocean movement. The shell skeletons thrown ashore serve as a shadow of the past, a memory and nostalgia for the lives of ancient sea creatures.',
      'Littering the entire shore, to the human ear they sound like bones when a human foot treads on them, and when hit by a coastal wave, they resemble the sound of a rockfall.',
    ],
  },
  {
    slug: 'source',
    title: 'Source',
    category: 'artwork',
    year: '2022',
    format: 'Video-art, soundscape',
    media: 'Video [03′42″]',
    description: 'Wind, water, tree, stone, sea wave, bird, man and his machine.',
    imageUrl: `${IMG}/popov_source_2022_01.jpg`,
    images: [`${IMG}/popov_source_2022_01.jpg`],
    vimeoId: '936938275',
    paragraphs: [
      'A study of the acoustic process of the urban and natural landscape. Through the method of opposing and breaking the connection between the visual and the auditory, the possibility of hearing the soundscape of the environment in which we live every day is presented.',
    ],
  },
  {
    slug: 'rainforest-iv',
    title: 'Rainforest IV',
    category: 'artwork',
    year: '2020',
    format: 'Reinstallation of David Tudor’s Rainforest IV',
    venue: 'ZIL Cultural Center, Echoes Soundscape and Spatial Music Festival',
    media: 'Found objects, vibration speaker, MAX/MSP',
    curators: 'Andrey Smirnov, Maria Molokova',
    description:
      'Multi-channel sound installation reconstructed at the Echoes Soundscape and Spatial Music Festival.',
    imageUrl: `${IMG}/popov_rainforest-iv_2020_01.jpg`,
    images: [`${IMG}/popov_rainforest-iv_2020_01.jpg`, `${IMG}/popov_rainforest-iv_2020_02.jpg`],
    vimeoId: '467802596',
    paragraphs: [
      'David Tudor’s Rainforest IV installation, which artists, musicians, composers and engineers reconstructed in the sound laboratory at the Echoes Soundscape and Spatial Music Festival. Tudor’s project is an experimental music classic and was first played in Russia.',
      'The current version of Rainforest IV assumes the relationship of each object with the personal space of its creator. Relocated to the showroom, objects are combined into a multi-channel sound installation and explore the possibilities of physical presence and interaction.',
    ],
  },
  {
    slug: 'soundscape-console',
    title: 'Soundscape Console',
    category: 'artwork',
    year: '2025',
    format: 'Interactive installation',
    media: 'Found objects, field recordings, video camera, TouchDesigner',
    credits: 'With Ivan Kravchuk',
    description:
      'Found objects moved across a field become a tactile instrument for listening to field recordings.',
    imageUrl: `${IMG}/popov_soundscape-console_2025_01.jpg`,
    images: [
      `${IMG}/popov_soundscape-console_2025_01.jpg`,
      `${IMG}/popov_soundscape-console_2025_02.jpg`,
    ],
    paragraphs: [
      'The project is based on a collection of found objects and field recordings gathered and documented in urban spaces — at points where the legacy of human rationality is integrated into the natural order. Each object is connected to a specific soundscape, to the place where it was discovered — a park, a square, a riverbank, or a pond — or to its own acoustic properties.',
      'The artists propose exploring the acoustic process of space — the symbiosis of the natural and the anthropogenic — through tactile interaction with the found objects. These may include natural elements such as stones, branches, and pieces of bark, as well as by-product artifacts of human presence: plastic, metal. All of them appear on the same plane as equal inhabitants of the space under investigation.',
      'The viewer interacts with the objects by moving them across the field in different combinations; a camera records their coordinates, and depending on the position of the object on the field, the viewer can manipulate its sonic characteristics.',
      'The installation transforms the listening of field recordings into a tactile and/or multisensory experience. By moving the objects, the viewer constructs their own perception of the place, forming a unique soundscape.',
    ],
  },
  {
    slug: 'gostinka',
    title: 'Gostinka — 46 Nekrasovskaya St.',
    category: 'artwork',
    year: '2022',
    format: 'Zine, soundscape',
    media: 'Zine, 58 pages, A4 (21×29.7 cm), edition of 2 copies. Digital audio recording [06′42″]',
    credits: 'Gleb Akulich, Liza Ilchenko, Sofya Varlamova, Anton Popov (art group KhIP)',
    description: 'Psychogeographic documentation of an unusual apartment building in Vladivostok.',
    imageUrl: `${IMG}/popov_gostinka_2022_01.jpg`,
    calameoId: '007258745c2fc24223d53',
    paragraphs: [
      'Collective artistic research practice based on the psychogeographical discourse — the Theory of Drift — by the French philosopher Guy Debord.',
      'Documentation of the psychogeographical process of an unusual apartment building in Vladivostok.',
    ],
    links: [
      { label: 'Mixcloud', url: 'https://www.mixcloud.com/snwglb/nekrasovskaya-46/' },
      { label: 'Bandcamp', url: 'https://antonpopov.bandcamp.com/nekrasovskaya-46' },
      { label: 'syg.ma', url: 'https://syg.ma/niekrasovskaia-46' },
    ],
  },
  {
    slug: 'strelka',
    title: 'Strelka',
    category: 'artwork',
    year: '2026',
    format: 'Video-art, sound-art, LED installation',
    media: 'TouchDesigner',
    credits: 'With Alexey Balakhnin',
    description: 'The confluence of the Volga and Oka as a hybrid landscape of rivers and data.',
    imageUrl: `${IMG}/popov_strelka_2026_01.jpg`,
    images: [
      `${IMG}/popov_strelka_2026_02.jpg`,
      `${IMG}/popov_strelka_2026_01.jpg`,
      `${IMG}/popov_strelka_2026_03.jpg`,
    ],
    youtubeId: 'D_562utauII',
    paragraphs: [
      'The work explores the confluence of the Volga and Oka rivers as a hybrid landscape in which natural processes cannot be separated from technological ones. Throughout history, Strelka has been a site of circulation for river currents, goods, transportation, and information.',
      'The installation presents these flows as a unified system in which digital networks become extensions of river currents, and binary code emerges as a new form of natural matter.',
    ],
  },
  {
    slug: 'autodeconstruction',
    title: 'Autodeconstruction',
    category: 'performance',
    year: '2025',
    format: 'Improvised audio live performance',
    media: 'Retro car radio, audio tapes',
    venue: 'GBRparts auto salvage yard, Vladivostok',
    description: 'Deconstructive Tape Live in a Vladivostok auto salvage yard.',
    imageUrl: `${IMG}/popov_autodeconstruction_2025_01.jpg`,
    images: [
      `${IMG}/popov_autodeconstruction_2025_01.jpg`,
      `${IMG}/popov_autodeconstruction_2025_02.jpg`,
      `${IMG}/popov_autodeconstruction_2025_03.jpg`,
      `${IMG}/popov_autodeconstruction_2025_04.jpg`,
    ],
    vimeoId: '1117938842',
    paragraphs: [
      'An improvised audio performance at a Vladivostok auto salvage yard: a car radio and a family archive of cassettes become instruments of sound archaeology. Fragments of music on tape and “voices of a Japanese interface” pass through noise, looping and feedback.',
      'Deconstructive Tape Live works within a poetics of entropy: instead of fidelity, it foregrounds the noise of collapse, signal residue and the material fatigue of media.',
    ],
  },
  {
    slug: 'safety-zone',
    title: 'Safety Zone',
    category: 'performance',
    year: '2023',
    format: 'Audiovisual performance',
    media: 'Video-art, soundscapes, analog photos, slide projector',
    credits: 'Alina Mazur, Ekaterina Nesterova, Sergey Inozemtsev, Anton Popov',
    description:
      'An audiovisual performance about those pushed to the fringes of the city’s consciousness.',
    imageUrl: `${IMG}/popov_safety-zone_2023_01.jpg`,
    images: [`${IMG}/popov_safety-zone_2023_01.jpg`, `${IMG}/popov_safety-zone_2023_02.jpg`],
    vimeoId: '1109861598',
    paragraphs: [
      'A safety zone is a space with special conditions that protect people from harmful environmental effects.',
      'The artists address the memory of people pushed to the fringes of the city’s consciousness, documenting a cemetery with an instant analog camera and a pickup.',
    ],
    links: [
      { label: 'Bandcamp', url: 'https://antonpopov.bandcamp.com/track/safe-area-live' },
      { label: 'Vimeo — alternative cut', url: 'https://vimeo.com/1079712189' },
    ],
  },
];

export const artworks = projects.filter((p) => p.category !== 'performance');

export const performanceProjects = projects.filter((p) => p.category === 'performance');

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
