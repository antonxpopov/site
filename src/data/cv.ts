export interface CvItem {
  year: string;
  text: string;
  ru: string;
  /** Internal path (without base) of the related page */
  href?: string;
}

export interface CvSection {
  title: string;
  ruTitle: string;
  items: CvItem[];
}

export const bio = {
  en: [
    'Born in Vladivostok in 1997.',
    'Sound and technology artist, experimental composer, and researcher of sound and music culture.',
    'Creates experimental electronic and electroacoustic music grounded in improvisation, listening, and working with unstable media environments. Researches the production, description, reception, and archiving of sound, as well as the relationships between memory, media materiality, and processes of loss. Develops interactive technological installations in which sound, images, and physical media serve as tools for exploring memory and its modes of representation.',
  ],
  ru: [
    'Родился во Владивостоке в 1997 году.',
    'Звуковой и технологический художник, экспериментальный композитор, исследователь звуковой и музыкальной культуры.',
    'Создаёт экспериментальную электронную и электроакустическую музыку, основанную на импровизации, слушании и работе с нестабильными медиасредами. Исследует методы производства, описания, рецепции и архивации звука, а также отношения между памятью, материальностью медиа и процессами утраты. Разрабатывает интерактивные технологические инсталляции, в которых звук, изображение и материальные носители становятся инструментами исследования памяти и способов её репрезентации.',
  ],
};

export const cv: CvSection[] = [
  {
    title: 'Education',
    ruTitle: 'Образование',
    items: [
      {
        year: '2025',
        text: 'MISIS University of Science and Technology, ArtTECH — “Technological Art”',
        ru: 'Университет науки и технологий МИСИС, ArtTECH — «Технологическое искусство»',
      },
      {
        year: '2020',
        text: 'Vladivostok School of Contemporary Art',
        ru: 'Владивостокская школа современного искусства',
      },
      {
        year: '2019',
        text: 'Far Eastern Federal University, Department of Communications and Media',
        ru: 'Дальневосточный федеральный университет, Департамент коммуникаций и медиа',
      },
    ],
  },
  {
    title: 'Solo Projects',
    ruTitle: 'Персональные проекты',
    items: [
      {
        year: '2025',
        text: 'RE:trospection of Sound',
        ru: 'Ре:троспекция звука',
        href: '/projects/retrospection-of-sound',
      },
      { year: '2024', text: 'RE∞', ru: 'РЕ∞', href: '/projects/re-infinity' },
      { year: '2023', text: 'Auricle', ru: 'Ушная раковина', href: '/projects/auricle' },
      { year: '2022', text: 'Source', ru: 'Источник', href: '/projects/source' },
    ],
  },
  {
    title: 'Awards',
    ruTitle: 'Награды',
    items: [
      {
        year: '2025',
        text: 'SCAN AWARDS laureate, category “Project of the Year. Small Form”',
        ru: 'Лауреат премии SCAN AWARDS, номинация «Проект года. Малая форма»',
      },
    ],
  },
  {
    title: 'Group Exhibitions',
    ruTitle: 'Групповые выставки',
    items: [
      {
        year: '2026',
        text: 'Media art festival “Discovering the Nameless”, Vladivostok',
        ru: 'Фестиваль медиаискусства «Открывая Безымянное», Владивосток',
      },
      {
        year: '2026',
        text: '“It’s Alive and Glowing”, Linda de La Art space, Moscow',
        ru: '«Он живой и светится», арт-пространство Linda de La Art, Москва',
      },
      {
        year: '2025',
        text: '“Digital Senses. The Multisensory Turn”, Krasnokholmskaya Gallery, Moscow',
        ru: '«Цифровые чувства. Мультисенсорный поворот», галерея «Краснохолмская», Москва',
      },
      {
        year: '2024',
        text: '“Open Storage. Prologue”, Garage Museum of Contemporary Art, Moscow',
        ru: '«Открытое хранение. Пролог», Музей современного искусства «Гараж», Москва',
      },
      {
        year: '2024',
        text: '“Invisible Routines”, Vaults Art Production Centre, GES-2 House of Culture, Moscow',
        ru: '«Невидимые рутины», Центр художественного производства «Своды», Дом культуры «ГЭС-2», Москва',
      },
      {
        year: '2023',
        text: '“Night of Museums”, Zarya Center for Contemporary Art, Vladivostok',
        ru: '«Ночь музеев», Центр современного искусства «Заря», Владивосток',
      },
      {
        year: '2022',
        text: '“Night of Museums”, Zarya Center for Contemporary Art, Vladivostok',
        ru: '«Ночь музеев», Центр современного искусства «Заря», Владивосток',
      },
      {
        year: '2021',
        text: '“Night of Museums”, Zarya Center for Contemporary Art, Vladivostok',
        ru: '«Ночь музеев», Центр современного искусства «Заря», Владивосток',
      },
      {
        year: '2020',
        text: '“Echo”: Reinstallation of Rainforest IV by D. Tudor, Rodchenko School of Photography and Multimedia, Moscow',
        ru: '«Отзвук»: реинсталляция Rainforest IV Д. Тюдора, Школа фотографии и мультимедиа им. Родченко, Москва',
        href: '/projects/rainforest-iv',
      },
    ],
  },
  {
    title: 'Residencies',
    ruTitle: 'Резиденции',
    items: [
      {
        year: '2026',
        text: 'TSEKH* multimedia art space, Nizhny Novgorod',
        ru: 'Мультимедиа-арт пространство ЦЕХ*, Нижний Новгород',
      },
      {
        year: '2025',
        text: 'Zarya Center for Contemporary Art, Vladivostok',
        ru: 'Центр современного искусства «Заря», Владивосток',
      },
      {
        year: '2024',
        text: 'Garage Museum of Contemporary Art workshops, Moscow',
        ru: 'Мастерские Музея современного искусства «Гараж», Москва',
      },
      {
        year: '2024',
        text: 'Vaults Art Production Centre, GES-2 House of Culture, Moscow',
        ru: 'Центр художественного производства «Своды», Дом культуры «ГЭС-2», Москва',
      },
    ],
  },
  {
    title: 'Performances',
    ruTitle: 'Перформансы',
    items: [
      {
        year: '2025',
        text: 'Concert “Voicing”, Moscow School of Social and Economic Sciences',
        ru: 'Концерт «Озвучивание», Московская высшая школа социальных и экономических наук',
      },
      {
        year: '2025',
        text: 'Audiovisual performance “Re:trospection of Sound”, Zarya Center for Contemporary Art',
        ru: 'Аудиовизуальный перформанс «Ре:троспекция звука», Центр современного искусства «Заря»',
      },
      {
        year: '2025',
        text: 'Sound performance “Autodeconstruction”, GBRparts auto salvage yard, Vladivostok',
        ru: 'Звуковой перформанс «Автодеконструкция», GBRparts — авторазборка, Владивосток',
        href: '/performances/autodeconstruction',
      },
      {
        year: '2025',
        text: 'Evening of electroacoustic improvisation “Zhest”, Korobka Gallery, Vladivostok',
        ru: 'Вечер электроакустической импровизации «Жесть», галерея «Коробка», Владивосток',
      },
    ],
  },
  {
    title: 'Collaborative Projects',
    ruTitle: 'Коллаборативные проекты',
    items: [
      {
        year: '2026',
        text: 'Strelka (with Alexey Balakhnin)',
        ru: 'Стрелка (совместно с Алексеем Балахниным)',
        href: '/projects/strelka',
      },
      {
        year: '2025',
        text: 'Soundscape Console (with Ivan Kravchuk)',
        ru: 'Саундскейп консоль (совместно с Иваном Кравчуком)',
        href: '/projects/soundscape-console',
      },
      {
        year: '2025',
        text: 'Sensitive Topics (with Kristina Pashkova)',
        ru: 'Чувствительные темы (совместно с Кристиной Пашковой)',
      },
      {
        year: '2024',
        text: 'The Eye of the Mistress (with Kristina Pashkova)',
        ru: 'Глаз мастерицы (совместно с Кристиной Пашковой)',
      },
      {
        year: '2022',
        text: 'Gostinka — 46 Nekrasovskaya St. (as part of the art group KhIP)',
        ru: 'Гостинка — Некрасовская 46 (в составе арт-группы «ХИП»)',
        href: '/projects/gostinka',
      },
    ],
  },
  {
    title: 'Lectures and Workshops',
    ruTitle: 'Лекции и мастер-классы',
    items: [
      {
        year: '2026',
        text: 'Lecture “From Raw Data to Sound Environment: How Field Recordings, Maps, and Archives Become an Art Project”, TSEKH* × Center 800, Nizhny Novgorod',
        ru: 'Лекция «От сырых данных к звуковой среде: как полевые записи, карты и архивы становятся художественным проектом», ЦЕХ* × Центр 800, Нижний Новгород',
        href: '/teaching',
      },
      {
        year: '2026',
        text: 'Workshop “From Physical Data to Dynamic Image”, TSEKH* × Center 800, Nizhny Novgorod',
        ru: 'Мастер-класс «От физических данных к динамическому изображению», ЦЕХ* × Центр 800, Нижний Новгород',
        href: '/teaching',
      },
      {
        year: '2025',
        text: 'Lecture “Afrofuturism”, Zarya Center for Contemporary Art, Vladivostok',
        ru: 'Лекция «Афрофутуризм», Центр современного искусства «Заря», Владивосток',
        href: '/teaching',
      },
      {
        year: '2025',
        text: 'Lecture “Soviet Electronic Music”, Zarya Center for Contemporary Art, Vladivostok',
        ru: 'Лекция «Советская электронная музыка», Центр современного искусства «Заря», Владивосток',
        href: '/teaching',
      },
    ],
  },
];
