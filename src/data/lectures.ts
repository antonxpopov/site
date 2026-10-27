import type { Lecture } from '../types';

const IMG = '/images/education';

// English descriptions are translated from the Russian originals — please review.
export const lectures: Lecture[] = [
  {
    year: '2026',
    kind: 'Lecture',
    title:
      'From Raw Data to Sound Environment: How Field Recordings, Maps, and Archives Become an Art Project',
    venue: 'TSEKH* × Center 800, Nizhny Novgorod',
    paragraphs: [
      'How do observation, data collection and work with sources become an art project? The focus is on soundscape and field recording, seen through the anthropology of everyday life, cartography, collective memory and “second nature”.',
      'The whole path of working with material: from recording to cleaning and analysis.',
    ],
    images: [`${IMG}/popov_raw-data-lecture_2026_01.jpg`],
    ru: {
      title:
        'От сырых данных к звуковой среде: как полевые записи, карты и архивы становятся художественным проектом',
      venue: 'ЦЕХ* × Центр 800, Нижний Новгород',
      paragraphs: [
        'Как наблюдение, сбор данных и работа с источниками превращаются в художественный проект? В фокусе — саундскейп и field recording, а также оптики антропологии повседневности, картографии, коллективной памяти и «второй природы».',
        'Весь путь работы с материалом: от записи на рекордер до очистки и анализа.',
      ],
    },
  },
  {
    year: '2026',
    kind: 'Workshop',
    title: 'From Physical Data to Dynamic Image',
    venue: 'TSEKH* × Center 800, Nizhny Novgorod',
    paragraphs: [
      'Hands-on: an ESP32 microcontroller with a light sensor, the MQTT protocol and interactive graphics in TouchDesigner.',
    ],
    images: [
      `${IMG}/popov_workshop-physical-data_2026_01.jpg`,
      `${IMG}/popov_workshop-physical-data_2026_02.jpg`,
    ],
    ru: {
      title: 'От физических данных к динамическому изображению',
      venue: 'ЦЕХ* × Центр 800, Нижний Новгород',
      paragraphs: [
        'На практике: связка микроконтроллера ESP32 и датчика освещённости, протокол MQTT и интерактивная графика в TouchDesigner.',
      ],
    },
  },
  {
    year: '2025',
    kind: 'Lecture',
    title: 'Afrofuturism',
    venue: 'Zarya Center for Contemporary Art, Vladivostok',
    paragraphs: [
      'A journey into Afrofuturism, where music becomes the voice of the African future. The movement’s roots go back to the early 20th century, but its name appeared only in the 1990s, in Mark Dery’s essay “Black to the Future”. Through science fiction and interplanetary travel, Afrofuturism offered a hopeful image of the Afro-American future.',
      'How traditional rhythms merge with cosmic synthesizers; key artists from Sun Ra to Drexciya; music where past meets future and sound becomes an instrument of memory and resistance.',
    ],
    images: [`${IMG}/popov_afrofuturism_2025_01.jpg`],
    youtubeId: 'BCgDPJrZO_Y',
    ru: {
      title: 'Афрофутуризм',
      venue: 'Центр современного искусства «Заря», Владивосток',
      paragraphs: [
        'Путешествие в мир афрофутуризма, где музыка становится голосом африканского будущего. Корни движения уходят в начало XX века, но название появилось лишь в 1990-е — в эссе Марка Дери «Чёрное в будущее». Через научную фантастику и межпланетные путешествия афрофутуризм предлагал обнадёживающий образ афроамериканского будущего.',
        'Как традиционные ритмы соединяются с космическими синтезаторами; ключевые исполнители — от Sun Ra до Drexciya; музыка, где прошлое встречается с будущим, а звук становится инструментом памяти и сопротивления.',
      ],
    },
  },
  {
    year: '2025',
    kind: 'Lecture',
    title: 'Soviet Electronic Music',
    venue: 'Zarya Center for Contemporary Art, Vladivostok',
    paragraphs: [
      'Soviet electronic music — a phenomenon that reflected humanity’s striving for outer space. How Soviet composers, from Lev Termen to Alexander Zatsepin, used the synthesizer, the engineering wonder of its time, and how these experiments gave rise to a philosophy of a beautiful future.',
      'Ideological and avant-garde concepts and how they sound: works by A. Schnittke, S. Gubaidulina, A. Zatsepin, E. Artemiev, the group “Novye Kompozitory”, Sven Grünberg, and the ensembles “Zodiac” and “Argo”.',
    ],
    images: [
      `${IMG}/popov_soviet-electronic-music_2025_01.jpg`,
      `${IMG}/popov_soviet-electronic-music_2025_02.jpg`,
    ],
    youtubeId: 'Iqc4eetbW5s',
    ru: {
      title: 'Советская электронная музыка',
      venue: 'Центр современного искусства «Заря», Владивосток',
      paragraphs: [
        'Советская электронная музыка — явление, отразившее стремление человека к космосу. Как композиторы СССР, от Льва Термена до Александра Зацепина, использовали синтезатор — инженерное чудо своего времени — и как в этих экспериментах рождалась философия прекрасного будущего.',
        'Идеологические и авангардные концепции и их звучание: произведения А. Шнитке, С. Губайдулиной, А. Зацепина, Э. Артемьева, группы «Новые композиторы», Свена Грюнберга, ансамблей «Зодиак» и «Арго».',
      ],
    },
  },
];
