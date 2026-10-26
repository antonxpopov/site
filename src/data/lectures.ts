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
      'How can observation, data collection and work with various sources become an art project? The focus is on the practice of soundscape and field recording, as well as several research lenses: the anthropology of everyday life, cartography, collective memory and the concept of “second nature”.',
      'The lecture covers the whole path of working with material: from recording sound with a recorder to cleaning and analysing it.',
    ],
    ru: {
      title:
        'От сырых данных к звуковой среде: как полевые записи, карты и архивы становятся художественным проектом',
      venue: 'ЦЕХ* × Центр 800, Нижний Новгород',
      paragraphs: [
        'Как с помощью наблюдения, сбора данных и работы с различными источниками создать художественный проект? В центре внимания — практика саундскейпа и field recording, а также несколько исследовательских оптик: антропология повседневности, картография, коллективная память и концепция «второй природы».',
        'Лекция затронет весь путь работы с материалом: от записи звука с помощью рекордера до очистки и анализа материала.',
      ],
    },
  },
  {
    year: '2026',
    kind: 'Workshop',
    title: 'From Physical Data to Dynamic Image',
    venue: 'TSEKH* × Center 800, Nizhny Novgorod',
    paragraphs: [
      'A hands-on look at an ESP32 microcontroller paired with a light sensor, the MQTT protocol, and building interactive graphics in the TouchDesigner generative environment.',
    ],
    images: [
      `${IMG}/popov_workshop-physical-data_2026_01.jpg`,
      `${IMG}/popov_workshop-physical-data_2026_02.jpg`,
    ],
    ru: {
      title: 'От физических данных к динамическому изображению',
      venue: 'ЦЕХ* × Центр 800, Нижний Новгород',
      paragraphs: [
        'На практике разберём возможности связки микроконтроллера ESP32 и датчика освещённости, протокол MQTT и создание интерактивной графики в генеративной среде TouchDesigner.',
      ],
    },
  },
  {
    year: '2025',
    kind: 'Lecture',
    title: 'Afrofuturism',
    venue: 'Zarya Center for Contemporary Art, Vladivostok',
    paragraphs: [
      'A journey into the world of Afrofuturism, where music becomes the voice of the African future. Although the cultural movement has deep roots reaching back to the early 20th century, the name for the phenomenon appeared only in the 1990s, when the American writer Mark Dery defined it in his essay “Black to the Future”. Drawing on the history of the continent, Afrofuturism gave its people a way to show a hopeful and positive Afro-American future through themes of science fiction and interplanetary travel.',
      'We look at how traditional rhythms merge with cosmic synthesizers to create a sound unusual for its time. We examine key artists — from Sun Ra to Drexciya — and listen to music where the past meets the future, turning sound into an instrument of memory and resistance: from underwater legends to intergalactic orchestras.',
    ],
    images: [`${IMG}/popov_afrofuturism_2025_01.jpg`],
    ru: {
      title: 'Афрофутуризм',
      venue: 'Центр современного искусства «Заря», Владивосток',
      paragraphs: [
        '19 апреля вас ждёт путешествие в мир афрофутуризма, где музыка становится голосом африканского будущего. Несмотря на то, что культурное движение имеет глубокие корни, уходящие в начало 20-го века, со временем становившиеся всё более видимыми, общепринятое название этого феномена появилось лишь в 90-е годы, когда американский писатель Марк Дери обозначил его в своём эссе «Чёрное в будущее». Опираясь на историю континента, концептуально афрофутуризм давал его населению возможность показать обнадёживающее и позитивное афроамериканское будущее через темы научной фантастики и межпланетных путешествий.',
        'На встрече узнаем, как традиционные ритмы соединяются с космическими синтезаторами, создавая необычный для своего времени звук. Разберём ключевых исполнителей — от Sun Ra до Drexciya — и погрузимся в музыкальное сопровождение, где прошлое встречается с будущим, превращая звук в инструмент памяти и сопротивления — от подводных легенд до межгалактических оркестров.',
      ],
    },
  },
  {
    year: '2025',
    kind: 'Lecture',
    title: 'Soviet Electronic Music',
    venue: 'Zarya Center for Contemporary Art, Vladivostok',
    paragraphs: [
      'The first meeting is devoted to Soviet electronic music — a remarkable phenomenon that reflected humanity’s striving for outer space. We discuss how Soviet composers, from Lev Termen to Alexander Zatsepin, used the engineering wonder of their time, the synthesizer, to create innovative music. In these experiments was born not just a new sound but a whole philosophy of a beautiful future for humankind.',
      'The lecture considers both the ideological and avant-garde musical concepts and their sounding embodiment. Anton Popov introduces the main figures of the genre and offers to listen to outstanding works by A. Schnittke, S. Gubaidulina, A. Zatsepin, E. Artemiev, the group “Novye Kompozitory”, Sven Grünberg, and the ensembles “Zodiac” and “Argo”, which became popular at the end of the era.',
    ],
    images: [
      `${IMG}/popov_soviet-electronic-music_2025_01.jpg`,
      `${IMG}/popov_soviet-electronic-music_2025_02.jpg`,
    ],
    ru: {
      title: 'Советская электронная музыка',
      venue: 'Центр современного искусства «Заря», Владивосток',
      paragraphs: [
        'Первая встреча посвящена советской электронной музыке — удивительному явлению, отразившему стремление человека к космическим просторам. Мы поговорим о том, как композиторы СССР — от Льва Термена до Александра Зацепина — использовали инженерное чудо своего времени — синтезатор — для создания новаторских музыкальных произведений. Вы увидите, как в этих экспериментах рождалось не просто новое звучание, но целая философия прекрасного будущего человечества.',
        'На лекции рассмотрим как идеологические и авангардные музыкальные концепции, так и их звучащее воплощение. Антон Попов расскажет о главных фигурах жанра и предложит послушать их выдающиеся произведения: А. Шнитке, С. Губайдулиной, А. Зацепина, Э. Артемьева, группы «Новые композиторы», Свена Грюнберга, а также коллективов «Зодиак» и «Арго», ставших популярными на закате эпохи.',
      ],
    },
  },
];
