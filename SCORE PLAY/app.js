const state = {
  section: 'venues',
  quickAction: '',
  activeFiltersExpanded: false,
  selectedVenueId: null,
  venueDescExpanded: {},
  venueGalleryIndex: {},
  filters: {
    query: '',
    isNew: false,
    isFavorite: false,
    isFree: false,
    sports: new Set(),
    priceMin: null,
    priceMax: null,
    metro: 'all',
    metroLine: 'all',
    metroLines: new Set(),
    metroStations: new Set(),
    metroArea: false,
    location: 'all',
    datetime: 'all',
    amenities: new Set(),
    districts: new Set()
  },
  metroDraft: {
    tab: 'metro',
    line: 'all',
    search: '',
    districtSearch: '',
    lines: new Set(),
    initialStations: new Set(),
    stations: new Set(),
    station: 'all',
    districts: new Set(),
    initialDistricts: new Set(),
    areaSelected: false,
    initialAreaSelected: false
  },
  sportDraft: new Set(),
  sportDraftQuery: '',
  amenitiesDraft: new Set(),
  amenitiesDraftQuery: '',
  priceDraft: {
    min: null,
    max: null
  }
};

const venueCustomGallery = {
  v1: [
    './venue-photos/1569331748_90f25b1dd39e8a909b8f28193946be12.jpg',
    './venue-photos/1569331873_465f43db4adfc78de4560d3770a72e30.jpg',
    './venue-photos/1569331873_c76414b07983e033463c299549a59dab.jpg',
    './venue-photos/1569331873_fbca2a0652e9471928ef8a91a5210f3e.jpg'
  ],
  v2: [
    './venue-photos/luch-field-2-1.jpg',
    './venue-photos/luch-field-2-2.jpg',
    './venue-photos/luch-field-2-1.jpg',
    './venue-photos/luch-field-2-2.jpg'
  ],
  v3: [
    './venue-photos/energy-court-1.jpg',
    './venue-photos/energy-court-2.jpg',
    './venue-photos/energy-court-3.jpg',
    './venue-photos/energy-court-4.jpg'
  ],
  v4: [
    './venue-photos/dostoevskaya-hall-1.jpg',
    './venue-photos/dostoevskaya-hall-2.jpg',
    './venue-photos/dostoevskaya-hall-3.jpg',
    './venue-photos/dostoevskaya-hall-2.jpg'
  ],
  v5: [
    './venue-photos/belka-squash-1.jpg',
    './venue-photos/belka-squash-2.jpg',
    './venue-photos/belka-squash-3.jpg',
    './venue-photos/belka-squash-1.jpg'
  ],
  v6: [
    './venue-photos/citysquash-sokol-1.jpg',
    './venue-photos/citysquash-sokol-2.jpg',
    './venue-photos/citysquash-sokol-3.jpg',
    './venue-photos/citysquash-sokol-1.jpg'
  ],
  v7: [
    './venue-photos/luzhniki-beach-1.jpg',
    './venue-photos/luzhniki-beach-2.jpg',
    './venue-photos/luzhniki-beach-3.jpg',
    './venue-photos/luzhniki-beach-3.jpg'
  ],
  v8: [
    './venue-photos/campus-taganka-1.jpg',
    './venue-photos/campus-taganka-2.jpg',
    './venue-photos/campus-taganka-3.jpg',
    './venue-photos/campus-taganka-1.jpg'
  ],
  v9: [
    './venue-photos/aqua-luzhniki-1.jpg',
    './venue-photos/aqua-luzhniki-2.jpg',
    './venue-photos/aqua-luzhniki-3.jpg',
    './venue-photos/aqua-luzhniki-2.jpg'
  ],
  v10: [
    './venue-photos/footballstart-1.jpg',
    './venue-photos/footballstart-2.jpg',
    './venue-photos/footballstart-3.jpg',
    './venue-photos/footballstart-2.jpg'
  ],
  v11: [
    './venue-photos/ahs-hockey-1.jpg',
    './venue-photos/ahs-hockey-2.jpg',
    './venue-photos/ahs-hockey-3.jpg',
    './venue-photos/ahs-hockey-1.jpg'
  ]
};

function makeVenuePhoto(title, accentA, accentB, icon) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="920" height="620" viewBox="0 0 920 620">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${accentA}"/>
          <stop offset="100%" stop-color="${accentB}"/>
        </linearGradient>
      </defs>
      <rect width="920" height="620" fill="url(#g)"/>
      <circle cx="748" cy="130" r="112" fill="rgba(255,255,255,0.16)"/>
      <circle cx="162" cy="498" r="148" fill="rgba(255,255,255,0.14)"/>
      <rect x="56" y="50" width="808" height="520" rx="40" fill="rgba(255,255,255,0.17)"/>
      <text x="92" y="460" fill="#fff" font-family="Manrope, Arial, sans-serif" font-size="104" font-weight="700">${icon}</text>
      <text x="212" y="450" fill="#fff" font-family="Manrope, Arial, sans-serif" font-size="58" font-weight="800">${title}</text>
    </svg>
  `;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

const venues = [
  {
    id: 'v1',
    shortName: 'Арена Лужники 7x7',
    fullName: 'Футбольная Арена Лужники 7x7',
    description: 'Современное поле с искусственным покрытием для тренировок, спаррингов и любительских турниров. Есть вечерний свет и удобный подъезд.',
    photo: './venue-photos/1569331748_90f25b1dd39e8a909b8f28193946be12.jpg',
    isPaid: true,
    pricePerHour: 3200,
    schedule: '06:00–23:00',
    seats: 140,
    surface: 'Искусственный газон',
    sports: ['Футбол', 'Мини-футбол'],
    lastUpdated: '18.05.2026',
    address: 'ул. Лужники, 24с4',
    district: 'Хамовники',
    area: 'Центральный административный округ',
    coordinates: [37.5532, 55.7147],
    phone: '+7 (495) 201-44-11',
    website: 'https://scoreplay.ru/luzhniki',
    email: 'luzhniki@scoreplay.ru',
    amenities: { lighting: true, changingRoom: true, food: true, toilet: true, wifi: true, atm: false, medicalPoint: true, sound: true, equipmentRent: true, equipmentRentDescription: 'Манишки, фишки, мячи', accessible: true },
    rating: 4.8,
    badge: 'Популярно',
    metro: 'Воробьёвы горы',
    location: 'outdoor',
    isNew: true,
    isFavorite: true,
    isFree: false,
    datetime: ['today-evening', 'weekend-evening']
  },
  {
    id: 'v2',
    shortName: 'Поле «Луч» №2',
    fullName: 'Футбольное поле 100×64 — Стадион «Луч» — Поле №2',
    description: 'Большое открытое поле с искусственным покрытием последнего поколения. Есть раздевалки, душ, освещение, платная парковка и Wi-Fi. Доступен инвентарь: мячи и манишки, можно пригласить судей и тренеров.',
    photo: './venue-photos/luch-field-2-1.jpg',
    isPaid: true,
    pricePerHour: 14100,
    schedule: '08:00–00:00',
    seats: 80,
    surface: 'Искусственная трава',
    sports: ['Футбол'],
    lastUpdated: '',
    address: 'Волоколамское шоссе, 88к9с1',
    district: 'Покровское-Стрешнево',
    area: 'Северо-Западный административный округ',
    coordinates: null,
    phone: '+7 (916) 8•• ••• ••',
    website: '',
    email: '',
    amenities: {
      lighting: true,
      changingRoom: true,
      food: false,
      toilet: false,
      wifi: true,
      atm: false,
      medicalPoint: false,
      sound: false,
      equipmentRent: true,
      equipmentRentDescription: 'Инвентарь: мячи и манишки. Дополнительно доступны судьи и тренеры. Есть душ и платная парковка.',
      accessible: false
    },
    rating: 0,
    badge: '',
    metro: 'Спартак',
    location: 'outdoor',
    isNew: true,
    isFavorite: false,
    isFree: false,
    datetime: ['today-morning', 'today-evening', 'weekend-morning', 'weekend-evening']
  },
  {
    id: 'v3',
    shortName: 'Корты «Энергия»',
    fullName: 'Открытые теннисные корты на стадионе «Энергия»',
    description: '4 открытых теннисных корта с покрытием «теннисит». Есть раздевалки, душ, бесплатная охраняемая парковка, кулер с водой, освещение и инвентарь. Ближайшие станции метро: Авиамоторная, Лефортово, Площадь Ильича, Римская.',
    photo: './venue-photos/energy-court-1.jpg',
    isPaid: true,
    pricePerHour: 2400,
    schedule: '07:00–23:00',
    seats: 4,
    surface: 'Грунт (теннисит)',
    sports: ['Теннис'],
    lastUpdated: '',
    address: '2-й Краснокурсантский проезд, д.12 стр.7',
    district: 'Лефортово',
    area: 'Юго-Восточный административный округ',
    coordinates: null,
    phone: '+7 (495) 3•• ••• ••',
    website: '',
    email: '',
    amenities: {
      lighting: true,
      changingRoom: true,
      food: false,
      toilet: false,
      wifi: false,
      atm: false,
      medicalPoint: false,
      sound: false,
      equipmentRent: true,
      equipmentRentDescription: 'Доступен инвентарь, душ, кулер с водой и бесплатная охраняемая парковка. Дополнительный номер: +7 (495) 3•• ••• ••.',
      accessible: false
    },
    rating: 0,
    badge: '',
    metro: 'Лефортово',
    location: 'outdoor',
    isNew: true,
    isFavorite: false,
    isFree: false,
    datetime: ['today-morning', 'today-evening', 'weekend-morning', 'weekend-evening']
  },
  {
    id: 'v4',
    shortName: 'Зал на Достоевской',
    fullName: 'Зал для волейбола и баскетбола на Достоевской',
    description: 'Крытый универсальный зал с профессиональной волейбольной сеткой и тренером. Подходит для игр в волейбол и баскетбол, доступен инвентарь. Высота потолка 7 м, для допуска требуются списки игроков.',
    photo: './venue-photos/dostoevskaya-hall-2.jpg',
    isPaid: true,
    pricePerHour: 6000,
    schedule: '09:00–22:00',
    seats: null,
    surface: 'Паркет',
    sports: ['Волейбол', 'Баскетбол'],
    lastUpdated: '',
    address: 'ул. Достоевского, 25',
    district: 'Тверской',
    area: 'Центральный административный округ',
    coordinates: null,
    phone: '+7 (926) 3•• ••• ••',
    website: '',
    email: '',
    amenities: {
      lighting: true,
      changingRoom: true,
      food: false,
      toilet: false,
      wifi: false,
      atm: false,
      medicalPoint: false,
      sound: false,
      equipmentRent: true,
      equipmentRentDescription: 'Есть душевые и инвентарь. Тренер доступен за 2500 ₽/час. Высота потолка 7 м. Требуются списки игроков.',
      accessible: false
    },
    rating: 0,
    badge: '',
    metro: 'Достоевская',
    location: 'indoor',
    isNew: true,
    isFavorite: false,
    isFree: false,
    datetime: ['today-morning', 'today-evening', 'weekend-morning', 'weekend-evening']
  },
  {
    id: 'v5',
    shortName: 'Сквош-Клуб "BelKa"',
    fullName: 'Сквош-Клуб "BelKa"',
    description: '4 современных сквош-корта. Предоставляем раздевалки с душевыми, полотенца и инвентарь. На территории есть платная парковка и трибуны для зрителей. Подходит для начинающих и опытных игроков.',
    photo: './venue-photos/belka-squash-1.jpg',
    isPaid: true,
    pricePerHour: 2400,
    schedule: '07:00–23:00',
    seats: 4,
    surface: 'Паркет',
    sports: ['Сквош'],
    lastUpdated: '',
    address: '1-й Нагатинский проезд, 2с37',
    district: 'Нагатино-Садовники',
    area: 'Южный административный округ',
    coordinates: null,
    phone: '+7 (966) 0•• ••• ••',
    website: '',
    email: '',
    amenities: {
      lighting: true,
      changingRoom: true,
      food: false,
      toilet: false,
      wifi: false,
      atm: false,
      medicalPoint: false,
      sound: false,
      equipmentRent: true,
      equipmentRentDescription: 'Инвентарь: 2 наименования. Есть душевые, трибуны, полотенца и платная парковка. Дополнительные телефоны: +7 (966) 0•• ••• ••, +7 (966) 1•• ••• ••.',
      accessible: false
    },
    rating: 4.9,
    badge: '26 отзывов',
    metro: 'Нагатинская',
    location: 'indoor',
    isNew: true,
    isFavorite: false,
    isFree: false,
    datetime: ['today-morning', 'today-evening', 'weekend-morning', 'weekend-evening']
  },
  {
    id: 'v6',
    shortName: 'CitySquash Сокол',
    fullName: 'Сквош корты CitySquash Сокол',
    description: 'City Squash Сокол — это 6 кортов по требованиям Международной Федерации Сквоша. В пяти минутах от метро Сокол: просторные раздевалки и душевые, зона отдыха, ракетки, мячи и полотенца.',
    photo: './venue-photos/citysquash-sokol-1.jpg',
    isPaid: true,
    pricePerHour: 3300,
    schedule: '07:00–24:00',
    seats: 4,
    surface: 'Паркет',
    sports: ['Сквош'],
    lastUpdated: '',
    address: 'Ленинградский проспект, д.80, корп.17',
    district: 'Сокол',
    area: 'Северный административный округ',
    coordinates: null,
    phone: '+7 (495) 1•• ••• ••',
    website: '',
    email: '',
    amenities: {
      lighting: true,
      changingRoom: true,
      food: false,
      toilet: false,
      wifi: false,
      atm: false,
      medicalPoint: false,
      sound: false,
      equipmentRent: true,
      equipmentRentDescription: 'Инвентарь: 3 наименования. Есть душевые, трибуны, зона отдыха и полотенца. Парковка платная.',
      accessible: false
    },
    rating: 4.9,
    badge: '46 отзывов',
    metro: 'Сокол',
    location: 'indoor',
    isNew: true,
    isFavorite: false,
    isFree: false,
    datetime: ['today-morning', 'today-evening', 'weekend-morning', 'weekend-evening']
  },
  {
    id: 'v7',
    shortName: 'Пляжный корт в Лужниках',
    fullName: 'Открытый корт для пляжного волейбола в Лужниках',
    description: 'Открытый корт 24×12 с кварцевым песком и профессиональным освещением. Есть раздевалки с душевыми, кулер с водой и платная парковка (150 руб./час). В аренду доступны мячи и ракетки. Подходит для пляжного волейбола, футбола и тенниса.',
    photo: './venue-photos/luzhniki-beach-3.jpg',
    isPaid: true,
    pricePerHour: 2500,
    schedule: '07:00–23:00',
    seats: 10,
    surface: 'Песок',
    sports: ['Волейбол', 'Теннис'],
    lastUpdated: '',
    address: 'ул. Лужники, 24с21 (Дворец тенниса)',
    district: 'Хамовники',
    area: 'Центральный административный округ',
    coordinates: null,
    phone: '+7 (926) 3•• ••• ••',
    website: '',
    email: '',
    amenities: {
      lighting: true,
      changingRoom: true,
      food: false,
      toilet: false,
      wifi: false,
      atm: false,
      medicalPoint: false,
      sound: false,
      equipmentRent: true,
      equipmentRentDescription: 'Инвентарь: 6 наименований. Есть трибуны на 10 мест, душевые, кулер с водой и платная парковка.',
      accessible: false
    },
    rating: 4.6,
    badge: '6 отзывов',
    metro: 'Воробьёвы горы',
    location: 'outdoor',
    isNew: true,
    isFavorite: false,
    isFree: false,
    datetime: ['today-morning', 'today-evening', 'weekend-morning', 'weekend-evening']
  },
  {
    id: 'v8',
    shortName: 'Campus "Таганка"',
    fullName: 'Универсальный зал Campus "Таганка"',
    description: 'Универсальный спортивный зал 25×18 с покрытием Терафлекс и потолками 8 м (площадь 400 м²). Подходит для футбола, баскетбола, волейбола, гимнастики и единоборств. Профессиональное освещение 400 люкс, в стоимость входит инвентарь.',
    photo: './venue-photos/campus-taganka-1.jpg',
    isPaid: true,
    pricePerHour: 2300,
    schedule: '00:00–24:00',
    seats: 20,
    surface: 'Терафлекс',
    sports: ['Футбол', 'Баскетбол', 'Волейбол', 'Гимнастика', 'Единоборства'],
    lastUpdated: '',
    address: 'Марксистская ул., 22, стр. 1',
    district: 'Таганский',
    area: 'Центральный административный округ',
    coordinates: null,
    phone: '+7 (495) 1•• ••• ••',
    website: '',
    email: '',
    amenities: {
      lighting: true,
      changingRoom: true,
      food: false,
      toilet: false,
      wifi: false,
      atm: false,
      medicalPoint: false,
      sound: false,
      equipmentRent: true,
      equipmentRentDescription: 'Инвентарь: 13 наименований. Есть трибуны, душевые, парковка и 2 раздевалки. В расписании стоимость может быть указана за 30 минут.',
      accessible: false
    },
    rating: 4.6,
    badge: '31 отзыв',
    metro: 'Марксистская',
    location: 'indoor',
    isNew: true,
    isFavorite: false,
    isFree: false,
    datetime: ['today-morning', 'today-evening', 'weekend-morning', 'weekend-evening']
  },
  {
    id: 'v9',
    shortName: 'Аквакомплекс Лужники',
    fullName: 'Аквакомплекс Лужники',
    description: 'Лучший крытый аквапарк в России, крытые бассейны 25 и 50 метров, открытый плавательный комплекс с бассейном 50 м, пляжным бассейном 20 м и площадкой для волейбола. Важно: термы и аквапарк закрыты на профилактику с 12.05.2026 по 07.06.2026 включительно, закрытый бассейн — с 22.05.2026 по 07.06.2026.',
    photo: './venue-photos/aqua-luzhniki-2.jpg',
    isPaid: true,
    pricePerHour: 1190,
    schedule: '07:00–23:00',
    seats: null,
    surface: 'Вода',
    sports: ['Плавание', 'Волейбол'],
    lastUpdated: '',
    address: 'ул. Лужники, 24с4',
    district: 'Хамовники',
    area: 'Центральный административный округ',
    coordinates: null,
    phone: '+7 (495) 780-08-08',
    website: 'https://aqua.luzhniki.ru/about/us/',
    email: '',
    amenities: {
      lighting: true,
      changingRoom: true,
      food: true,
      toilet: true,
      wifi: false,
      atm: false,
      medicalPoint: true,
      sound: false,
      equipmentRent: false,
      equipmentRentDescription: 'Доступны аквапарк, термы, крытые и открытые бассейны. Для регистрации посещения нужно обратиться в отдел продаж на 1 этаже.',
      accessible: true
    },
    rating: 4.8,
    badge: '3258 отзывов',
    metro: 'Воробьёвы горы',
    location: 'indoor',
    isNew: true,
    isFavorite: false,
    isFree: false,
    datetime: ['today-morning', 'today-evening', 'weekend-morning', 'weekend-evening']
  },
  {
    id: 'v10',
    shortName: 'FootballStart',
    fullName: 'FootballStart на м. Текстильщики',
    description: 'Школа любительского футбола проводит регулярные тренировки на открытых и крытых площадках Москвы с 2014 года. Занятие длится 1,5 часа и включает разминку, технику, функциональную подготовку, игру и стретчинг. Нагрузка подбирается по уровню группы.',
    photo: './venue-photos/footballstart-1.jpg',
    isPaid: true,
    pricePerHour: 1250,
    schedule: '21:00–22:30',
    seats: null,
    surface: 'Искусственный газон',
    sports: ['Футбол'],
    lastUpdated: '',
    address: 'Волгоградский проспект, 46/15',
    district: 'Текстильщики',
    area: 'Юго-Восточный административный округ',
    coordinates: null,
    phone: '+7 (495) 175-90-39',
    website: 'http://footballstart.ru',
    email: '',
    amenities: {
      lighting: true,
      changingRoom: false,
      food: false,
      toilet: false,
      wifi: false,
      atm: false,
      medicalPoint: false,
      sound: false,
      equipmentRent: false,
      equipmentRentDescription: 'Тренировка длится 1,5 часа. Запись возможна за 2 часа.',
      accessible: false
    },
    rating: 4.4,
    badge: '29 отзывов',
    metro: 'Текстильщики',
    location: 'outdoor',
    isNew: true,
    isFavorite: false,
    isFree: false,
    datetime: ['today-evening', 'weekend-evening']
  },
  {
    id: 'v11',
    shortName: 'Amateur Hockey School',
    fullName: 'Amateur Hockey School на м. Севастопольская',
    description: 'Любительская школа хоккея в Москве. Тренеры AHS помогают улучшить технику, понимание игры и уверенность на льду. Для посещения занятия необходимо принести с собой экипировку.',
    photo: './venue-photos/ahs-hockey-1.jpg',
    isPaid: true,
    pricePerHour: 2860,
    schedule: '20:15–22:45',
    seats: null,
    surface: 'Лед',
    sports: ['Хоккей'],
    lastUpdated: '',
    address: 'Балаклавский проспект, 33',
    district: 'Зюзино',
    area: 'Юго-Западный административный округ',
    coordinates: null,
    phone: '+7 (912) 269-55-40',
    website: 'https://amateur-hockey.ru/',
    email: '',
    amenities: {
      lighting: true,
      changingRoom: false,
      food: false,
      toilet: false,
      wifi: false,
      atm: false,
      medicalPoint: false,
      sound: false,
      equipmentRent: false,
      equipmentRentDescription: 'Нужно принести свою хоккейную экипировку. Форматы: индивидуальная тренировка 60 мин и мини-группа 75 мин.',
      accessible: false
    },
    rating: 0,
    badge: 'Нет отзывов',
    metro: 'Севастопольская',
    location: 'indoor',
    isNew: true,
    isFavorite: false,
    isFree: false,
    datetime: ['today-evening', 'weekend-evening']
  }
];

const sportCatalog = [
  'Футбол',
  'Фитнес',
  'Баскетбол',
  'Волейбол',
  'Теннис',
  'Плавание',
  'Воркаут',
  'Бег',
  'Хоккей',
  'Настольный теннис',
  'Бокс',
  'Йога',
  'Бадминтон',
  'Падел',
  'Большой теннис',
  'Скалолазание',
  'Единоборства',
  'Кёрлинг',
  'Сквош',
  'Велоспорт'
];

const sportRows = [
  ['Футбол', 'Фитнес', 'Баскетбол'],
  ['Волейбол', 'Теннис'],
  ['Плавание', 'Воркаут', 'Бег'],
  ['Хоккей', 'Настольный теннис'],
  ['Бокс', 'Йога', 'Бадминтон'],
  ['Падел', 'Большой теннис'],
  ['Скалолазание', 'Единоборства'],
  ['Кёрлинг', 'Сквош', 'Велоспорт']
];

const metroLines = [
  { id: '1', number: '1', name: 'Сокольническая', color: '#EF161E', stations: ['Бульвар Рокоссовского', 'Черкизовская', 'Преображенская площадь', 'Сокольники', 'Красносельская', 'Комсомольская', 'Красные Ворота', 'Чистые пруды', 'Лубянка', 'Охотный Ряд', 'Библиотека имени Ленина', 'Кропоткинская', 'Парк культуры', 'Фрунзенская', 'Спортивная', 'Воробьёвы горы', 'Университет', 'Проспект Вернадского', 'Юго-Западная', 'Тропарёво', 'Румянцево', 'Саларьево', 'Филатов Луг', 'Прокшино', 'Ольховая', 'Коммунарка', 'Потапово'] },
  { id: '2', number: '2', name: 'Замоскворецкая', color: '#2DBE2C', stations: ['Ховрино', 'Беломорская', 'Речной вокзал', 'Водный стадион', 'Войковская', 'Сокол', 'Аэропорт', 'Динамо', 'Белорусская', 'Маяковская', 'Тверская', 'Театральная', 'Новокузнецкая', 'Павелецкая', 'Автозаводская', 'Технопарк', 'Коломенская', 'Каширская', 'Кантемировская', 'Царицыно', 'Орехово', 'Домодедовская', 'Красногвардейская', 'Алма-Атинская'] },
  { id: '3', number: '3', name: 'Арбатско-Покровская', color: '#0078BF', stations: ['Пятницкое шоссе', 'Митино', 'Волоколамская', 'Мякинино', 'Строгино', 'Крылатское', 'Молодёжная', 'Кунцевская', 'Славянский бульвар', 'Парк Победы', 'Киевская', 'Смоленская', 'Арбатская', 'Площадь Революции', 'Курская', 'Бауманская', 'Электрозаводская', 'Семёновская', 'Партизанская', 'Измайловская', 'Первомайская', 'Щёлковская'] },
  { id: '4', number: '4', name: 'Филёвская', color: '#00A1E0', stations: ['Кунцевская', 'Пионерская', 'Филёвский парк', 'Багратионовская', 'Фили', 'Кутузовская', 'Студенческая', 'Киевская', 'Смоленская', 'Арбатская', 'Александровский сад', 'Выставочная', 'Международная'] },
  { id: '5', number: '5', name: 'Кольцевая', color: '#8D5B2D', stations: ['Парк культуры', 'Октябрьская', 'Добрынинская', 'Павелецкая', 'Таганская', 'Курская', 'Комсомольская', 'Проспект Мира', 'Новослободская', 'Белорусская', 'Краснопресненская', 'Киевская'] },
  { id: '6', number: '6', name: 'Калужско-Рижская', color: '#F58220', stations: ['Медведково', 'Бабушкинская', 'Свиблово', 'Ботанический сад', 'ВДНХ', 'Алексеевская', 'Рижская', 'Проспект Мира', 'Сухаревская', 'Тургеневская', 'Китай-город', 'Третьяковская', 'Октябрьская', 'Шаболовская', 'Ленинский проспект', 'Академическая', 'Профсоюзная', 'Новые Черёмушки', 'Калужская', 'Беляево', 'Коньково', 'Тёплый Стан', 'Ясенево', 'Новоясеневская'] },
  { id: '7', number: '7', name: 'Таганско-Краснопресненская', color: '#8E479C', stations: ['Планерная', 'Сходненская', 'Тушинская', 'Спартак', 'Щукинская', 'Октябрьское Поле', 'Полежаевская', 'Беговая', 'Улица 1905 года', 'Баррикадная', 'Пушкинская', 'Кузнецкий Мост', 'Китай-город', 'Таганская', 'Пролетарская', 'Волгоградский проспект', 'Текстильщики', 'Кузьминки', 'Рязанский проспект', 'Выхино', 'Лермонтовский проспект', 'Жулебино', 'Котельники'] },
  { id: '8', number: '8', name: 'Калининская', color: '#FFD702', stations: ['Новокосино', 'Новогиреево', 'Перово', 'Шоссе Энтузиастов', 'Авиамоторная', 'Площадь Ильича', 'Марксистская', 'Третьяковская'] },
  { id: '8A', number: '8A', name: 'Солнцевская', color: '#FFD702', stations: ['Рассказовка', 'Новопеределкино', 'Боровское шоссе', 'Солнцево', 'Говорово', 'Озёрная', 'Мичуринский проспект', 'Раменки', 'Ломоносовский проспект', 'Минская', 'Парк Победы', 'Деловой центр'] },
  { id: '9', number: '9', name: 'Серпуховско-Тимирязевская', color: '#A1A2A3', stations: ['Алтуфьево', 'Бибирево', 'Отрадное', 'Владыкино', 'Петровско-Разумовская', 'Тимирязевская', 'Дмитровская', 'Савёловская', 'Менделеевская', 'Цветной бульвар', 'Чеховская', 'Боровицкая', 'Полянка', 'Серпуховская', 'Тульская', 'Нагатинская', 'Нагорная', 'Нахимовский проспект', 'Севастопольская', 'Чертановская', 'Южная', 'Пражская', 'Улица Академика Янгеля', 'Аннино', 'Бульвар Дмитрия Донского'] },
  { id: '10', number: '10', name: 'Люблинско-Дмитровская', color: '#B3D445', stations: ['Физтех', 'Лианозово', 'Яхромская', 'Селигерская', 'Верхние Лихоборы', 'Окружная', 'Петровско-Разумовская', 'Фонвизинская', 'Бутырская', 'Марьина Роща', 'Достоевская', 'Трубная', 'Сретенский бульвар', 'Чкаловская', 'Римская', 'Крестьянская застава', 'Дубровка', 'Кожуховская', 'Печатники', 'Волжская', 'Люблино', 'Братиславская', 'Марьино', 'Борисово', 'Шипиловская', 'Зябликово'] },
  { id: '11', number: '11', name: 'Большая кольцевая', color: '#82C0C0', stations: ['Савёловская', 'Петровский парк', 'ЦСКА', 'Хорошёвская', 'Народное Ополчение', 'Мнёвники', 'Терехово', 'Кунцевская', 'Давыдково', 'Аминьевская', 'Мичуринский проспект', 'Проспект Вернадского', 'Новаторская', 'Воронцовская', 'Зюзино', 'Каховская', 'Варшавская', 'Каширская', 'Кленовый бульвар', 'Нагатинский Затон', 'Печатники', 'Текстильщики', 'Нижегородская', 'Авиамоторная', 'Лефортово', 'Электрозаводская', 'Сокольники', 'Рижская', 'Марьина Роща'] },
  { id: '12', number: '12', name: 'Бутовская', color: '#ACBFE1', stations: ['Битцевский парк', 'Лесопарковая', 'Улица Старокачаловская', 'Улица Скобелевская', 'Бульвар Адмирала Ушакова', 'Улица Горчакова', 'Бунинская аллея'] },
  { id: '13', number: '13', name: 'Московский монорельс', color: '#9999FF', stations: ['Тимирязевская', 'Улица Милашенкова', 'Телецентр', 'Улица Академика Королёва', 'Выставочный центр', 'Улица Сергея Эйзенштейна'] },
  { id: '14', number: '14', name: 'МЦК', color: '#EBAC3D', stations: ['Окружная', 'Владыкино', 'Ботанический сад', 'Ростокино', 'Белокаменная', 'Бульвар Рокоссовского', 'Локомотив', 'Измайлово', 'Соколиная Гора', 'Шоссе Энтузиастов', 'Андроновка', 'Нижегородская', 'Новохохловская', 'Угрешская', 'Дубровка', 'Автозаводская', 'ЗИЛ', 'Верхние Котлы', 'Крымская', 'Площадь Гагарина', 'Лужники', 'Кутузовская', 'Деловой центр', 'Шелепиха', 'Хорошёво', 'Зорге', 'Панфиловская', 'Стрешнево', 'Балтийская', 'Коптево', 'Лихоборы'] },
  { id: '15', number: '15', name: 'Некрасовская', color: '#DE64A1', stations: ['Нижегородская', 'Стахановская', 'Окская', 'Юго-Восточная', 'Косино', 'Улица Дмитриевского', 'Лухмановская', 'Некрасовка'] },
  { id: '16', number: '16', name: 'Троицкая', color: '#D8A6B9', stations: ['Новаторская', 'Университет Дружбы Народов', 'Генерала Тюленева', 'Тютчевская', 'Мамыри', 'Бачуринская', 'Коммунарка'] },
  { id: 'D1', number: 'D1', name: 'МЦД-1 Белорусско-Савёловский', color: '#F6A800', stations: ['Одинцово', 'Баковка', 'Сколково', 'Немчиновка', 'Сетунь', 'Рабочий Посёлок', 'Кунцевская', 'Славянский бульвар', 'Фили', 'Тестовская', 'Беговая', 'Белорусская', 'Савёловская', 'Тимирязевская', 'Окружная', 'Дегунино', 'Бескудниково', 'Лианозово', 'Марк', 'Новодачная', 'Долгопрудная', 'Водники', 'Хлебниково', 'Шереметьевская', 'Лобня'] },
  { id: 'D2', number: 'D2', name: 'МЦД-2 Курско-Рижский', color: '#E94B8A', stations: ['Нахабино', 'Аникеевка', 'Опалиха', 'Красногорская', 'Павшино', 'Пенягино', 'Волоколамская', 'Трикотажная', 'Тушинская', 'Щукинская', 'Стрешнево', 'Красный Балтиец', 'Гражданская', 'Дмитровская', 'Марьина Роща', 'Рижская', 'Площадь трёх вокзалов', 'Курская', 'Москва-Товарная', 'Калитники', 'Новохохловская', 'Текстильщики', 'Люблино', 'Депо', 'Перерва', 'Курьяново', 'Москворечье', 'Царицыно', 'Покровское', 'Красный Строитель', 'Битца', 'Бутово', 'Щербинка', 'Остафьево', 'Силикатная', 'Подольск'] },
  { id: 'D3', number: 'D3', name: 'МЦД-3 Ленинградско-Казанский', color: '#E87511', stations: ['Зеленоград-Крюково', 'Малино', 'Фирсановская', 'Сходня', 'Подрезково', 'Новоподрезково', 'Молжаниново', 'Химки', 'Левобережная', 'Ховрино', 'Грачёвская', 'Моссельмаш', 'Лихоборы', 'Петровско-Разумовская', 'Останкино', 'Рижская', 'Митьково', 'Электрозаводская', 'Авиамоторная', 'Андроновка', 'Перово', 'Плющево', 'Вешняки', 'Выхино', 'Косино', 'Ухтомская', 'Люберцы', 'Панки', 'Томилино', 'Красково', 'Малаховка', 'Удельная', 'Быково', 'Ильинская', 'Отдых', 'Кратово', 'Есенинская', 'Фабричная', 'Раменское', 'Ипподром'] },
  { id: 'D4', number: 'D4', name: 'МЦД-4 Калужско-Нижегородский', color: '#43A047', stations: ['Апрелевка', 'Победа', 'Крёкшино', 'Санино', 'Кокошкино', 'Толстопальцево', 'Лесной Городок', 'Внуково', 'Мичуринец', 'Переделкино', 'Очаково', 'Аминьевская', 'Минская', 'Поклонная', 'Кутузовская', 'Москва-Сити', 'Беговая', 'Белорусская', 'Савёловская', 'Марьина Роща', 'Площадь трёх вокзалов', 'Курская', 'Серп и Молот', 'Нижегородская', 'Чухлинка', 'Кусково', 'Новогиреево', 'Реутов', 'Никольское', 'Салтыковская', 'Кучино', 'Ольгино', 'Железнодорожная'] }
];

const amenitiesCatalog = ['Освещение', 'Раздевалка', 'Еда', 'Туалет', 'WI-FI', 'Банкомат', 'Медпункт', 'Звук', 'Аренда оборудования', 'Описание аренды оборудования', 'Подходит ли для инвалидов'];
const amenityMeta = [
  { key: 'lighting', label: 'Освещение', iconFile: 'lighting.svg', description: 'Есть вечерний свет для игр и тренировок' },
  { key: 'changingRoom', label: 'Раздевалка', iconFile: 'changing-room.svg', description: 'Комфортные раздевалки рядом с площадкой' },
  { key: 'food', label: 'Еда', iconFile: 'food.svg', description: 'Кафе или зона питания на территории' },
  { key: 'toilet', label: 'Туалет', iconFile: 'toilet.svg', description: 'Санузел доступен для посетителей' },
  { key: 'wifi', label: 'WI-FI', iconFile: 'wifi.svg', description: 'Беспроводной интернет на площадке' },
  { key: 'atm', label: 'Банкомат', iconFile: 'atm.svg', description: 'Есть банкомат или терминал оплаты рядом' },
  { key: 'medicalPoint', label: 'Медпункт', iconFile: 'medical-point.svg', description: 'Пункт первой помощи на объекте' },
  { key: 'sound', label: 'Звук', iconFile: 'sound-speakers.svg', description: 'Акустика для мероприятий и тренировок' },
  { key: 'equipmentRent', label: 'Аренда оборудования', iconFile: 'equipment-rent.svg', description: 'Можно взять инвентарь в аренду' },
  { key: 'equipmentRentDescription', label: 'Описание аренды оборудования', iconFile: 'equipment-rent.svg', description: 'Детали и состав арендуемого инвентаря' },
  { key: 'accessible', label: 'Подходит для маломобильных', iconFile: 'accessibility-equipment.svg', description: 'Есть условия для маломобильных посетителей' }
];
const districtGroups = [
  {
    name: 'Восточный административный округ',
    districts: ['Богородское', 'Вешняки', 'Восточное Измайлово', 'Восточный', 'Гольяново', 'Ивановское', 'Измайлово', 'Косино-Ухтомский', 'Метрогородок', 'Новогиреево', 'Новокосино', 'Перово', 'Преображенское', 'Северное Измайлово', 'Соколиная Гора', 'Сокольники']
  },
  {
    name: 'Западный административный округ',
    districts: ['Внуково', 'Дорогомилово', 'Крылатское', 'Кунцево', 'Можайский', 'Ново-Переделкино', 'Очаково-Матвеевское', 'Проспект Вернадского', 'Раменки', 'Солнцево', 'Тропарёво-Никулино', 'Фили-Давыдково', 'Филёвский Парк']
  },
  {
    name: 'Новомосковский административный округ',
    districts: ['Коммунарка', 'Щербинка']
  },
  {
    name: 'Северный административный округ',
    districts: ['Аэропорт', 'Беговой', 'Бескудниковский', 'Войковский', 'Восточное Дегунино', 'Головинский', 'Дмитровский', 'Западное Дегунино', 'Коптево', 'Левобережный', 'Молжаниновский', 'Савёловский', 'Сокол', 'Тимирязевский', 'Ховрино', 'Хорошёвский']
  },
  {
    name: 'Северо-Восточный административный округ',
    districts: ['Алексеевский', 'Алтуфьевский', 'Бабушкинский', 'Бибирево', 'Бутырский', 'Лианозово', 'Лосиноостровский', 'Марфино', 'Марьина Роща', 'Останкинский', 'Отрадное', 'Ростокино', 'Свиблово', 'Северное Медведково', 'Северный', 'Южное Медведково', 'Ярославский']
  },
  {
    name: 'Северо-Западный административный округ',
    districts: ['Куркино', 'Митино', 'Покровское-Стрешнево', 'Северное Тушино', 'Строгино', 'Хорошёво-Мнёвники', 'Щукино', 'Южное Тушино']
  },
  {
    name: 'Центральный административный округ',
    districts: ['Арбат', 'Басманный', 'Замоскворечье', 'Красносельский', 'Мещанский', 'Пресненский', 'Таганский', 'Тверской', 'Хамовники', 'Якиманка']
  },
  {
    name: 'Юго-Восточный административный округ',
    districts: ['Выхино-Жулебино', 'Капотня', 'Кузьминки', 'Лефортово', 'Люблино', 'Марьино', 'Некрасовка', 'Нижегородский', 'Печатники', 'Рязанский', 'Текстильщики', 'Южнопортовый']
  },
  {
    name: 'Юго-Западный административный округ',
    districts: ['Академический', 'Гагаринский', 'Зюзино', 'Коньково', 'Котловка', 'Ломоносовский', 'Обручевский', 'Северное Бутово', 'Тёплый Стан', 'Черёмушки', 'Южное Бутово', 'Ясенево']
  },
  {
    name: 'Южный административный округ',
    districts: ['Бирюлёво Восточное', 'Бирюлёво Западное', 'Братеево', 'Даниловский', 'Донской', 'Зябликово', 'Москворечье-Сабурово', 'Нагатино-Садовники', 'Нагатинский Затон', 'Нагорный', 'Орехово-Борисово Северное', 'Орехово-Борисово Южное', 'Царицыно', 'Чертаново Северное', 'Чертаново Центральное', 'Чертаново Южное']
  }
];
const districtCatalog = districtGroups.flatMap((group) => group.districts);
const mapAreaDistricts = new Set(['Арбат', 'Басманный', 'Замоскворечье', 'Китай-город', 'Пресненский', 'Таганский', 'Тверской', 'Якиманка']);
const metroQuickZoneSource = {
  ring: [
    'Александровский сад', 'Арбатская', 'Баррикадная', 'Белорусская', 'Библиотека имени Ленина',
    'Боровицкая', 'Добрынинская', 'Киевская', 'Китай-Город', 'Комсомольская', 'Краснопресненская',
    'Красные ворота', 'Кропоткинская', 'Кузнецкий мост', 'Курская', 'Лубянка', 'Марксистская',
    'Маяковская', 'Менделеевская', 'Новокузнецкая', 'Новослободская', 'Октябрьская', 'Охотный Ряд',
    'Павелецкая', 'Парк Культуры', 'Площадь Революции', 'Проспект Мира', 'Пушкинская', 'Смоленская',
    'Сретенский бульвар', 'Сухаревская', 'Таганская', 'Тверская', 'Театральная', 'Третьяковская',
    'Трубная', 'Тургеневская', 'Цветной бульвар', 'Чеховская', 'Чистые пруды', 'Чкаловская'
  ],
  mcc: [
    'Авиамоторная', 'Александровский сад', 'Алексеевская', 'Андроновка', 'Арбатская', 'Аэропорт',
    'Балтийская', 'Баррикадная', 'Бауманская', 'Беговая', 'Белокаменная', 'Белорусская',
    'Библиотека имени Ленина', 'Боровицкая', 'Ботанический сад', 'Бутырская', 'ВДНХ', 'Верхние Котлы',
    'Владыкино', 'Выставочный центр', 'Гражданская', 'Деловой центр', 'Динамо', 'Добрынинская',
    'Достоевская', 'Дубровка', 'ЗИЛ', 'Зорге', 'Измайлово', 'Калитники', 'Киевская', 'Китай-Город',
    'Комсомольская', 'Коптево', 'Краснопресненская', 'Красносельская', 'Красные ворота',
    'Крестьянская застава', 'Кропоткинская', 'Крымская', 'Кузнецкий мост', 'Курская', 'Кутузовская',
    'Ленинский проспект', 'Лефортово', 'Лихоборы', 'Локомотив', 'Лубянка', 'Лужники', 'Марксистская',
    'Марьина Роща', 'Маяковская', 'Менделеевская', 'Москва-Сити', 'Нижегородская', 'Новокузнецкая',
    'Новослободская', 'Новохохловская', 'Окружная', 'Октябрьская', 'Октябрьское поле', 'Охотный Ряд',
    'Павелецкая', 'Панфиловская', 'Парк Культуры', 'Петровский парк', 'Площадь Гагарина',
    'Площадь Ильича', 'Площадь Революции', 'Площадь трёх вокзалов', 'Полежаевская', 'Полянка',
    'Проспект Мира', 'Пушкинская', 'Рижская', 'Римская', 'Ростокино', 'Савёловская', 'Семёновская',
    'Серп и Молот', 'Серпуховская', 'Смоленская', 'Сокол', 'Соколиная гора', 'Сокольники',
    'Сретенский бульвар', 'Стрешнево', 'Сухаревская', 'Таганская', 'Тверская', 'Театральная',
    'Телецентр', 'Тимирязевская', 'Третьяковская', 'Трубная', 'Тургеневская', 'Угрешская',
    'Улица 1905 года', 'Фонвизинская', 'Фрунзенская', 'Хорошёво', 'Цветной бульвар', 'ЦСКА',
    'Чеховская', 'Чистые пруды', 'Чкаловская', 'Шаболовская', 'Шелепиха', 'Шоссе Энтузиастов',
    'Электрозаводская'
  ],
  bkl: [
    'Авиамоторная', 'Автозаводская', 'Аминьевская', 'Арбатская', 'Баррикадная', 'Бауманская', 'Беговая',
    'Белорусская', 'Библиотека имени Ленина', 'Боровицкая', 'Верхние Котлы', 'Волгоградский проспект',
    'Воробьёвы горы', 'Деловой центр', 'Динамо', 'Достоевская', 'Дубровка', 'ЗИЛ', 'Калитники',
    'Каширская', 'Киевская', 'Китай-Город', 'Кожуховская', 'Коломенская', 'Комсомольская',
    'Красносельская', 'Красные ворота', 'Крестьянская застава', 'Кропоткинская', 'Крымская',
    'Кузнецкий мост', 'Кунцевская', 'Курская', 'Кутузовская', 'Ленинский проспект', 'Лубянка',
    'Лужники', 'Марксистская', 'Марьина Роща', 'Матвеевская', 'Маяковская', 'Менделеевская', 'Минская',
    'Мичуринский проспект', 'Москва-Сити', 'Москва-Товарная', 'Нагатинская', 'Нагорная',
    'Нахимовский проспект', 'Нижегородская', 'Новокузнецкая', 'Новохохловская', 'Новые Черёмушки',
    'Октябрьская', 'Охотный Ряд', 'Павелецкая', 'Парк Культуры', 'Парк Победы', 'Печатники',
    'Площадь Гагарина', 'Площадь Ильича', 'Площадь Революции', 'Площадь трёх вокзалов', 'Поклонная',
    'Полянка', 'Пролетарская', 'Проспект Вернадского', 'Проспект Мира', 'Пушкинская', 'Раменки',
    'Рижская', 'Римская', 'Савёловская', 'Севастопольская', 'Серп и Молот', 'Серпуховская',
    'Славянский бульвар', 'Смоленская', 'Сокольники', 'Спортивная', 'Сретенский бульвар',
    'Сухаревская', 'Таганская', 'Тверская', 'Театральная', 'Текстильщики', 'Тестовская', 'Технопарк',
    'Третьяковская', 'Трубная', 'Тургеневская', 'Угрешская', 'Улица 1905 года', 'Университет', 'Фили',
    'Фрунзенская', 'Цветной бульвар', 'Чеховская', 'Чистые пруды', 'Чкаловская', 'Шаболовская',
    'Шелепиха', 'Электрозаводская'
  ]
};
const metroQuickZones = [
  { key: 'ring', label: 'Внутри кольца', color: '#8D5B2D' },
  { key: 'mcc', label: 'Внутри МЦК', color: '#EBAC3D' },
  { key: 'bkl', label: 'Внутри БКЛ', color: '#82C0C0' }
];
const amenitiesRows = [
  ['Освещение', 'Раздевалка', 'Еда'],
  ['Туалет', 'WI-FI', 'Банкомат'],
  ['Медпункт', 'Звук', 'Аренда оборудования'],
  ['Описание аренды оборудования', 'Подходит ли для инвалидов']
];
const pricePresets = [
  { key: 'p1', label: 'До 1000 ₽', min: null, max: 1000 },
  { key: 'p2', label: '1000-2500 ₽', min: 1000, max: 2500 },
  { key: 'p3', label: '2500-5000 ₽', min: 2500, max: 5000 },
  { key: 'p4', label: 'От 5000 ₽', min: 5000, max: null }
];
const datetimeOptions = [{ value: 'all', label: 'Дата и время' }, { value: 'today-morning', label: 'Сегодня утром' }, { value: 'today-evening', label: 'Сегодня вечером' }, { value: 'weekend-morning', label: 'Выходные утром' }, { value: 'weekend-evening', label: 'Выходные вечером' }];

const mainNav = document.querySelector('.main-nav');
const navIndicator = document.querySelector('.nav-indicator');
const sectionButtons = Array.from(document.querySelectorAll('[data-section]'));
const quickButtons = Array.from(document.querySelectorAll('[data-quick]'));
const venuesSection = document.querySelector('section[data-panel="venues"]');
const gamesSection = document.querySelector('section[data-panel="games"]');
const teamSection = document.querySelector('section[data-panel="team"]');
const profileSection = document.querySelector('section[data-panel="profile"]');
const notificationsButton = document.querySelector('[data-quick="notifications"]');
const settingsButton = document.querySelector('[data-quick="settings"]');
const settingsIcon = settingsButton ? settingsButton.querySelector('.top-icon') : null;
const avatarButton = document.querySelector('.avatar-btn');
const avatarFace = document.querySelector('.avatar-face');
const sectionPanels = Array.from(document.querySelectorAll('[data-panel]'));
const filterDropdowns = Array.from(document.querySelectorAll('.filter-dropdown'));

const searchInput = document.querySelector('#venues-search');
const newButton = document.querySelector('#venues-new');
const favoriteButton = document.querySelector('#venues-favorite');
const freeButton = document.querySelector('#venues-free');
const sportActiveRow = document.querySelector('#sport-active-row');

const sportLabel = document.querySelector('#venues-sport-label');
const priceLabel = document.querySelector('#venues-price-label');
const metroLabel = document.querySelector('#venues-metro-label');
const locationLabel = document.querySelector('#venues-location-label');
const amenitiesLabel = document.querySelector('#venues-amenities-label');
const datetimeLabel = document.querySelector('#venues-datetime-label');

const sportMenu = document.querySelector('#venues-sport-menu');
const sportDropdown = document.querySelector('#sport-dropdown');
const priceMenu = document.querySelector('#venues-price-menu');
const priceDropdown = document.querySelector('#price-dropdown');
const metroMenu = document.querySelector('#venues-metro-menu');
const metroDropdown = document.querySelector('#metro-dropdown');
const locationDropdown = document.querySelector('#location-dropdown');
const amenitiesDropdown = document.querySelector('#amenities-dropdown');
const datetimeDropdown = document.querySelector('#datetime-dropdown');
const locationMenu = document.querySelector('#venues-location-menu');
const datetimeMenu = document.querySelector('#venues-datetime-menu');

const profileMainAvatar = document.querySelector('#profile-main-avatar');
const profileNameTitle = document.querySelector('#profile-name-title');
const profileMetaText = document.querySelector('#profile-meta-text');
const profileSportChips = document.querySelector('#profile-sport-chips');
const profileAboutText = document.querySelector('#profile-about-text');
const profileEditButton = document.querySelector('#profile-edit-btn');
const profileNextGameButton = document.querySelector('#profile-next-game-btn');
const profileStatGames = document.querySelector('#profile-stat-games');
const profileStatWins = document.querySelector('#profile-stat-wins');
const profileStatTeams = document.querySelector('#profile-stat-teams');
const profileStatAttendance = document.querySelector('#profile-stat-attendance');
const profileLevelLabel = document.querySelector('#profile-level-label');
const profileLevelScore = document.querySelector('#profile-level-score');
const profileLevelProgress = document.querySelector('#profile-level-progress');
const profileLevelNote = document.querySelector('#profile-level-note');
const profileFavoriteSport = document.querySelector('#profile-favorite-sport');
const profileBestTime = document.querySelector('#profile-best-time');
const profileTabs = Array.from(document.querySelectorAll('[data-profile-tab]'));
const profilePanels = Array.from(document.querySelectorAll('[data-profile-panel]'));
const profileSettingsContent = document.querySelector('#profile-settings-content');
const profileGamesList = document.querySelector('#profile-games-list');
const profileGameFilterButtons = Array.from(document.querySelectorAll('[data-profile-games-filter]'));
const profileAvatarModal = document.querySelector('#profile-avatar-modal');
const profileAvatarOverlay = document.querySelector('#profile-avatar-overlay');
const profileAvatarClose = document.querySelector('#profile-avatar-close');
const profileAvatarCancel = document.querySelector('#profile-avatar-cancel');
const profileAvatarSave = document.querySelector('#profile-avatar-save');
const profileAvatarPickerGrid = document.querySelector('#profile-avatar-picker-grid');
const profileSportModal = document.querySelector('#profile-sport-modal');
const profileSportOverlay = document.querySelector('#profile-sport-overlay');
const profileSportClose = document.querySelector('#profile-sport-close');
const profileSportModalContent = document.querySelector('#profile-sport-modal-content');

const PROFILE_STORAGE_KEY = 'scoreplay_profile';
const profileAvatars = [
  { id: 1, src: './avatar/avatar-1.svg' },
  { id: 2, src: './avatar/avatar-2.svg' },
  { id: 3, src: './avatar/avatar-3.svg' },
  { id: 4, src: './avatar/avatar-4.svg' },
  { id: 5, src: './avatar/avatar-5.svg' },
  { id: 6, src: './avatar/avatar-6.svg' },
  { id: 7, src: './avatar/avatar-7.svg' }
];

const profileLevels = ['Новичок', 'Любитель', 'Средний', 'Продвинутый'];
const profileSportsCatalog = [
  {
    type: 'football',
    title: 'Футбол',
    icon: '⚽',
    fields: [
      { key: 'level', label: 'Уровень', options: profileLevels },
      { key: 'position', label: 'Позиция', options: ['Вратарь', 'Защитник', 'Полузащитник', 'Нападающий', 'Универсал'] },
      { key: 'foot', label: 'Рабочая нога', options: ['Правая', 'Левая', 'Обе'] }
    ],
    defaults: { level: 'Любитель', position: 'Нападающий', foot: 'Правая' }
  },
  {
    type: 'basketball',
    title: 'Баскетбол',
    icon: '🏀',
    fields: [
      { key: 'level', label: 'Уровень', options: profileLevels },
      { key: 'position', label: 'Игровая позиция', options: ['Разыгрывающий', 'Атакующий защитник', 'Форвард', 'Центровой', 'Универсал'] },
      { key: 'hand', label: 'Ведущая рука', options: ['Правая', 'Левая', 'Обе'] }
    ],
    defaults: { level: 'Средний', position: 'Разыгрывающий', hand: 'Правая' }
  },
  {
    type: 'volleyball',
    title: 'Волейбол',
    icon: '🏐',
    fields: [
      { key: 'level', label: 'Уровень', options: profileLevels },
      { key: 'role', label: 'Амплуа', options: ['Связующий', 'Доигровщик', 'Диагональный', 'Либеро', 'Центральный'] },
      { key: 'hand', label: 'Ведущая рука', options: ['Правая', 'Левая', 'Обе'] }
    ],
    defaults: { level: 'Любитель', role: 'Доигровщик', hand: 'Правая' }
  },
  {
    type: 'tennis',
    title: 'Теннис',
    icon: '🎾',
    fields: [
      { key: 'level', label: 'Уровень', options: profileLevels },
      { key: 'hand', label: 'Ведущая рука', options: ['Правая', 'Левая', 'Обе'] }
    ],
    defaults: { level: 'Любитель', hand: 'Правая' }
  },
  {
    type: 'padel',
    title: 'Падел',
    icon: '🥎',
    fields: [
      { key: 'level', label: 'Уровень', options: profileLevels },
      { key: 'hand', label: 'Ведущая рука', options: ['Правая', 'Левая', 'Обе'] }
    ],
    defaults: { level: 'Новичок', hand: 'Правая' }
  },
  {
    type: 'running',
    title: 'Бег',
    icon: '🏃',
    fields: [
      { key: 'level', label: 'Уровень', options: profileLevels },
      { key: 'distance', label: 'Любимая дистанция', options: ['3 км', '5 км', '10 км', '21 км', 'Марафон'] }
    ],
    defaults: { level: 'Любитель', distance: '5 км' }
  }
];

const profilePreferenceGroups = [
  { key: 'radius', title: 'Радиус поиска', options: ['3 км', '5 км', '10 км', '20 км'] },
  { key: 'time', title: 'Удобное время', options: ['Утро', 'День', 'Вечер', 'Любое'] },
  { key: 'days', title: 'Дни', options: ['Будни', 'Выходные', 'Любые'] },
  { key: 'gameType', title: 'Тип игр', options: ['Бесплатные', 'Платные', 'Любые'] },
  { key: 'courtType', title: 'Тип площадки', options: ['Крытая', 'Открытая', 'Любая'] }
];

const profileNotificationGroups = [
  {
    title: 'Игры',
    items: [
      ['nearbyGames', 'Новые игры рядом', 'Подскажем, когда рядом появится подходящая игра'],
      ['levelGames', 'Игры по моему уровню', 'Покажем игры, где темп подходит вашему уровню'],
      ['freeSpot', 'Освободилось место в игре', 'Сообщим, если появилось свободное место'],
      ['favoriteSports', 'Новые игры по любимым видам спорта', 'Уведомления по вашим спортивным интересам']
    ]
  },
  {
    title: 'Мои игры',
    items: [
      ['reminder24h', 'Напоминание за 24 часа', 'Заранее напомним о предстоящей игре'],
      ['reminder3h', 'Напоминание за 3 часа', 'Короткое напоминание перед стартом'],
      ['gameChanges', 'Изменение времени или места игры', 'Важные обновления по вашим играм'],
      ['gameCancel', 'Отмена игры', 'Сразу сообщим, если игру отменили']
    ]
  },
  {
    title: 'Команда',
    items: [
      ['teamInvite', 'Приглашение в команду', 'Когда капитан зовет вас в состав'],
      ['teamMatch', 'Новый матч команды', 'Матчи, созданные вашей командой'],
      ['teamEvent', 'Новое событие команды', 'Тренировки, собрания и внутренние события'],
      ['teamTournament', 'Турнир команды', 'Турнирные заявки и обновления']
    ]
  },
  {
    title: 'Социальные',
    items: [
      ['newRating', 'Новая оценка после игры', 'Когда игроки оценивают матч'],
      ['newReview', 'Новый отзыв', 'Отзывы от игроков и организаторов'],
      ['newComment', 'Новый комментарий', 'Комментарии в ваших играх и событиях']
    ]
  },
  {
    title: 'SCORE',
    items: [
      ['scoreNews', 'Новости приложения', 'Главные обновления SCORE PLAY'],
      ['scoreFeatures', 'Новые функции', 'Расскажем о новых возможностях'],
      ['courtOffers', 'Спецпредложения площадок', 'Акции и предложения от площадок']
    ]
  }
];

const defaultUserProfile = {
  name: 'Саша Скоромиржа',
  district: 'Москва, Текстильщики',
  about: 'Игрок 5 лет. Люблю утренние тренировки и честную игру.',
  avatarId: 1,
  stats: {
    games: 47,
    wins: 31,
    teams: 3,
    attendance: 91,
    streak: 5,
    levelFrom: 'Любитель',
    levelTo: 'Средний',
    levelScore: 47,
    levelTarget: 70
  },
  nextGame: {
    title: 'Вечерний футбол 5×5',
    time: 'Сегодня · 20:30',
    place: 'SCORE Arena'
  },
  sports: [
    { type: 'football', title: 'Футбол', level: 'Любитель', position: 'Нападающий', foot: 'Правая' },
    { type: 'basketball', title: 'Баскетбол', level: 'Средний', position: 'Разыгрывающий', hand: 'Правая' }
  ],
  preferences: {
    radius: '5 км',
    time: 'Вечер',
    days: 'Любые',
    gameType: 'Любые',
    courtType: 'Любая'
  },
  notifications: {
    nearbyGames: true,
    levelGames: true,
    freeSpot: true,
    favoriteSports: true,
    reminder24h: true,
    reminder3h: true,
    gameChanges: true,
    gameCancel: true,
    teamInvite: true,
    teamMatch: true,
    teamEvent: true,
    teamTournament: false,
    newRating: true,
    newReview: false,
    newComment: false,
    scoreNews: true,
    scoreFeatures: true,
    courtOffers: false
  },
  account: {
    phone: '+7 999 123-45-67',
    email: 'sasha@scoreplay.app'
  }
};

let userProfile = loadUserProfile();
let profileState = {
  tab: 'stats',
  gamesFilter: 'joined',
  avatarDraftId: userProfile.avatarId,
  sportModalMode: 'select',
  editingSportType: '',
  sportDraft: null
};

const profileGames = [
  { type: 'joined', icon: '⚽', title: 'Вечерний футбол 5×5', date: 'Сегодня · 20:30', place: 'SCORE Arena', status: 'Открыта', tone: 'blue' },
  { type: 'joined', icon: '🏀', title: 'Баскетбол 3×3 вечером', date: 'Завтра · 21:00', place: 'SCORE Court Park', status: 'Почти заполнена', tone: 'yellow' },
  { type: 'organized', icon: '🏃', title: 'Беговая тренировка', date: 'Пт · 08:00', place: 'Парк Arena', status: 'Открыта', tone: 'green' },
  { type: 'favorite', icon: '🎾', title: 'Падел для новичков', date: 'Сб · 12:30', place: 'Padel Club', status: 'Оценить', tone: 'red' },
  { type: 'joined', icon: '🏐', title: 'Волейбол в зале', date: 'Вчера · 19:30', place: 'Южный зал', status: 'Завершено', tone: 'gray' }
];

const GAME_SPORT_PHOTOS = {
  'волейбол': './photo-plays/volleyball.svg',
  'футбол': './photo-plays/football.svg',
  'баскетбол': './photo-plays/basketball.svg',
  'теннис': './photo-plays/tennis.svg',
  'падел': './photo-plays/padel.svg',
  'хоккей': './photo-plays/hockey.svg'
};

const GAME_FALLBACK_COLORS = ['#3A85FD', '#75EA89', '#FCC005', '#E82644', '#343E57'];
const amenitiesMenu = document.querySelector('#amenities-list');
const venuesGrid = document.querySelector('#venues-grid');
const venuesCount = document.querySelector('#venues-count');
const venuesResultsSection = venuesSection ? venuesSection.querySelector('.venues-results') : null;
const gamesFiltersWrap = document.querySelector('#games-filters-wrap');
const gamesSearchInput = document.querySelector('#games-search');
const gamesSearchClear = document.querySelector('#games-search-clear');
const gamesTodayButton = document.querySelector('#games-today');
const gamesNewButton = document.querySelector('#games-new');
const gamesAlmostButton = document.querySelector('#games-almost');
const gamesFreeButton = document.querySelector('#games-free');
const gamesSlotsButton = document.querySelector('#games-slots');
const gamesCoachButton = document.querySelector('#games-coach');
const gamesSportDropdown = document.querySelector('#games-sport-dropdown');
const gamesDateDropdown = document.querySelector('#games-date-dropdown');
const gamesTimeDropdown = document.querySelector('#games-time-dropdown');
const gamesLevelDropdown = document.querySelector('#games-level-dropdown');
const gamesFormatDropdown = document.querySelector('#games-format-dropdown');
const gamesPriceDropdown = document.querySelector('#games-price-dropdown');
const gamesLocationDropdown = document.querySelector('#games-location-dropdown');
const gamesSeatsDropdown = document.querySelector('#games-seats-dropdown');
const gamesGenderDropdown = document.querySelector('#games-gender-dropdown');
const gamesSportLabel = document.querySelector('#games-sport-label');
const gamesDateLabel = document.querySelector('#games-date-label');
const gamesTimeLabel = document.querySelector('#games-time-label');
const gamesLevelLabel = document.querySelector('#games-level-label');
const gamesFormatLabel = document.querySelector('#games-format-label');
const gamesPriceLabel = document.querySelector('#games-price-label');
const gamesLocationLabel = document.querySelector('#games-location-label');
const gamesSeatsLabel = document.querySelector('#games-seats-label');
const gamesGenderLabel = document.querySelector('#games-gender-label');
const gamesSportMenu = document.querySelector('#games-sport-menu');
const gamesDateMenu = document.querySelector('#games-date-menu');
const gamesTimeMenu = document.querySelector('#games-time-menu');
const gamesLevelMenu = document.querySelector('#games-level-menu');
const gamesFormatMenu = document.querySelector('#games-format-menu');
const gamesPriceMenu = document.querySelector('#games-price-menu');
const gamesLocationMenu = document.querySelector('#games-location-menu');
const gamesSeatsMenu = document.querySelector('#games-seats-menu');
const gamesGenderMenu = document.querySelector('#games-gender-menu');
const gamesSportActiveRow = document.querySelector('#games-active-row');
const gamesGrid = document.querySelector('#games-grid');
const gamesCount = document.querySelector('#games-count');
const gamesError = document.querySelector('#games-error');
const gamesCreateButton = document.querySelector('#games-create-btn');
const gameModal = document.querySelector('#game-modal');
const gameModalOverlay = document.querySelector('#game-modal-overlay');
const gameModalClose = document.querySelector('#game-modal-close');
const gameModalContent = document.querySelector('#game-modal-content');
const gameCreateModal = document.querySelector('#game-create-modal');
const gameCreateOverlay = document.querySelector('#game-create-overlay');
const gameCreateClose = document.querySelector('#game-create-close');
const gameCreateContent = document.querySelector('#game-create-content');
const teamCardIdentity = document.querySelector('#team-card-identity');
const teamStatusWrap = document.querySelector('#team-status-wrap');
const teamMetricsGrid = document.querySelector('#team-metrics-grid');
const teamAttendanceValue = document.querySelector('#team-attendance-value');
const teamAttendanceBar = document.querySelector('#team-attendance-bar');
const teamSwitchSelect = document.querySelector('#team-switch');
const teamCreateButton = document.querySelector('#team-create-btn');
const teamMembersList = document.querySelector('#team-members-list');
const teamInvitePlayerButton = document.querySelector('#team-invite-player');
const teamShowMoreButton = document.querySelector('#team-show-more');
const teamRequestsButton = document.querySelector('#team-open-requests');
const teamCreateGameButton = document.querySelector('#team-create-game-btn');
const teamFindOpponentButton = document.querySelector('#team-find-opponent-btn');
const teamOpponentMeta = document.querySelector('#team-opponent-meta');
const teamOpponentCount = document.querySelector('#team-opponent-count');
const teamEventsCount = document.querySelector('#team-events-count');
const teamEventsTrack = document.querySelector('#team-events-track');
const teamRequestsModal = document.querySelector('#team-requests-modal');
const teamRequestsOverlay = document.querySelector('#team-requests-overlay');
const teamRequestsClose = document.querySelector('#team-requests-close');
const teamRequestsList = document.querySelector('#team-requests-list');
const teamEventModal = document.querySelector('#team-event-modal');
const teamEventOverlay = document.querySelector('#team-event-overlay');
const teamEventClose = document.querySelector('#team-event-close');
const teamEventContent = document.querySelector('#team-event-content');
const teamCreateModal = document.querySelector('#team-create-modal');
const teamCreateOverlay = document.querySelector('#team-create-overlay');
const teamCreateClose = document.querySelector('#team-create-close');
const teamCreateForm = document.querySelector('#team-create-form');
const teamCreateNameInput = document.querySelector('#team-create-name');
const teamCreateSportInput = document.querySelector('#team-create-sport');
const teamCreateLevelInput = document.querySelector('#team-create-level');
const authOverlay = document.querySelector('#auth-overlay');
const authForm = document.querySelector('#auth-form');
const authLoginInput = document.querySelector('#auth-login');
const authPasswordInput = document.querySelector('#auth-password');
const authError = document.querySelector('#auth-error');
const AUTH_LOGINS = new Set(['SCORE', 'SCORE PLAY', 'ЫСЩКУ', 'ЫСЩКУ ЗДФН']);
const AUTH_PASSWORDS = new Set(['SCORE123', 'ЫСЩКУ123']);
const AUTH_STORAGE_KEY = 'scoreplay_auth';
const LOCATION_SHEET_OPEN_ANIM_MS = 380;
let authLockedScrollY = 0;
let settingsRotationDeg = 0;
let settingsSettleTimer = 0;

const gamesState = {
  loaded: false,
  loading: false,
  error: '',
  items: [],
  selectedGameId: '',
  filters: {
    query: '',
    today: false,
    free: false,
    isNew: false,
    almostFull: false,
    hasSlots: false,
    hasCoach: false,
    sports: new Set(),
    date: '',
    customDate: '',
    time: new Set(),
    levels: new Set(),
    formats: new Set(),
    cost: '',
    metros: new Set(),
    districts: new Set(),
    radius: '',
    freeSeats: '',
    genders: new Set()
  }
};

const createGameState = {
  step: 1,
  saving: false,
  error: '',
  draft: null
};

const TEAM_MEMBER_ROLES = {
  captain: 'Капитан',
  player: 'Игрок',
  coach: 'Тренер'
};

const TEAM_STATUS_META = {
  active: { label: 'Активна', className: 'is-active' },
  needs: { label: 'Нужны игроки', className: 'is-needs' },
  full: { label: 'Полный состав', className: 'is-full' }
};

const TEAM_EVENT_STATUS_META = {
  upcoming: { label: 'Скоро', className: 'is-upcoming' },
  training: { label: 'Тренировка', className: 'is-training' },
  live: { label: 'Идет сейчас', className: 'is-live' }
};

const TEAM_FIXTURE = [
  {
    id: 'team-1',
    name: 'SCORE UNITED',
    subtitle: 'Футбол • Любитель+',
    city: 'Москва',
    areaShort: 'ЮАО',
    logoText: 'SU',
    status: 'needs',
    maxPlayers: 12,
    playedGames: 42,
    wins: 26,
    attendance: 84,
    avgLevel: 'Любитель+',
    district: 'Юг Москвы',
    sport: 'Футбол',
    opponentsFound: 12,
    members: [
      { id: 'm-1', name: 'Илья Волков', position: 'Центр', role: 'captain' },
      { id: 'm-2', name: 'Роман Крылов', position: 'Вратарь', role: 'player' },
      { id: 'm-3', name: 'Дмитрий Лапин', position: 'Защитник', role: 'player' },
      { id: 'm-4', name: 'Сергей Тихонов', position: 'Полузащита', role: 'player' },
      { id: 'm-5', name: 'Кирилл Артемов', position: 'Нападающий', role: 'player' },
      { id: 'm-6', name: 'Никита Павлов', position: 'Фланг', role: 'player' },
      { id: 'm-7', name: 'Максим Ширяев', position: 'Защитник', role: 'player' },
      { id: 'm-8', name: 'Тренер Алексей', position: 'Подготовка', role: 'coach' },
      { id: 'm-9', name: 'Влад Савин', position: 'Полузащита', role: 'player' }
    ],
    requests: [
      { id: 'r-1', name: 'Артем Лисов', level: 'Любитель', position: 'Защитник' },
      { id: 'r-2', name: 'Глеб Сидоров', level: 'Средний', position: 'Вратарь' },
      { id: 'r-3', name: 'Павел Митин', level: 'Любитель+', position: 'Нападающий' }
    ],
    events: [
      {
        id: 'e-1',
        type: 'Матч',
        title: 'Матч против North Side',
        dateLabel: 'Сегодня',
        time: '20:30',
        place: 'SCORE Arena',
        status: 'upcoming',
        description: 'Контрольная игра перед турниром. Сбор за 20 минут до старта.',
        lineupNeeded: 'Нужны 2 полевых игрока',
        participants: ['Илья Волков', 'Роман Крылов', 'Сергей Тихонов', 'Кирилл Артемов', 'Никита Павлов'],
        comments: ['Берем темно-синюю форму', 'После игры короткий разбор']
      },
      {
        id: 'e-2',
        type: 'Тренировка',
        title: 'Тренировка в манеже',
        dateLabel: 'Завтра',
        time: '19:00',
        place: 'SCORE Indoor',
        status: 'training',
        description: 'Фокус на прессинг и розыгрыш стандартов.',
        lineupNeeded: 'Нужен вратарь',
        participants: ['Тренер Алексей', 'Дмитрий Лапин', 'Максим Ширяев', 'Влад Савин'],
        comments: ['Разминка 15 минут', 'Не забудьте щитки']
      },
      {
        id: 'e-3',
        type: 'Собрание',
        title: 'Короткий созвон по турниру',
        dateLabel: 'Пт, 21 мая',
        time: '21:15',
        place: 'Онлайн',
        status: 'upcoming',
        description: 'Подтверждаем состав и логистику на выездной матч.',
        lineupNeeded: 'Участие капитана и тренера',
        participants: ['Илья Волков', 'Тренер Алексей', 'Роман Крылов'],
        comments: ['Ссылка придет в чат']
      },
      {
        id: 'e-4',
        type: 'Турнир',
        title: 'SCORE Weekend Cup',
        dateLabel: 'Сб, 23 мая',
        time: '11:00',
        place: 'SCORE Park',
        status: 'upcoming',
        description: 'Групповой этап и плей-офф в один день.',
        lineupNeeded: 'Нужен полный состав',
        participants: ['Илья Волков', 'Сергей Тихонов', 'Кирилл Артемов', 'Никита Павлов', 'Влад Савин', 'Дмитрий Лапин'],
        comments: ['Регистрация в 10:30', 'Взнос оплачен']
      }
    ]
  },
  {
    id: 'team-2',
    name: 'SCORE CITY',
    subtitle: 'Баскетбол • Средний',
    city: 'Москва',
    areaShort: 'ЦАО',
    logoText: 'SC',
    status: 'active',
    maxPlayers: 10,
    playedGames: 31,
    wins: 19,
    attendance: 78,
    avgLevel: 'Средний',
    district: 'Центр Москвы',
    sport: 'Баскетбол',
    opponentsFound: 9,
    members: [
      { id: 'c-1', name: 'Андрей Соколов', position: 'Разыгрывающий', role: 'captain' },
      { id: 'c-2', name: 'Петр Власов', position: 'Защитник', role: 'player' },
      { id: 'c-3', name: 'Игорь Симонов', position: 'Форвард', role: 'player' },
      { id: 'c-4', name: 'Лев Макаров', position: 'Центровой', role: 'player' },
      { id: 'c-5', name: 'Алексей Климов', position: 'Форвард', role: 'player' },
      { id: 'c-6', name: 'Тренер Иван', position: 'Тактика', role: 'coach' }
    ],
    requests: [
      { id: 'c-r-1', name: 'Степан Орлов', level: 'Средний', position: 'Центровой' }
    ],
    events: [
      {
        id: 'c-e-1',
        type: 'Матч',
        title: 'Матч против Downtown Hoops',
        dateLabel: 'Сегодня',
        time: '21:00',
        place: 'SCORE Court',
        status: 'live',
        description: 'Игра до 4 четвертей по 10 минут.',
        lineupNeeded: 'Состав подтвержден',
        participants: ['Андрей Соколов', 'Петр Власов', 'Игорь Симонов', 'Лев Макаров', 'Алексей Климов'],
        comments: ['Счет обновляется в реальном времени']
      },
      {
        id: 'c-e-2',
        type: 'Тренировка',
        title: 'Бросковая сессия',
        dateLabel: 'Завтра',
        time: '19:30',
        place: 'SCORE Lab',
        status: 'training',
        description: 'Отработка дальних и штрафных бросков.',
        lineupNeeded: 'Открыто 2 места',
        participants: ['Тренер Иван', 'Андрей Соколов', 'Петр Власов'],
        comments: ['Нужна сменная обувь']
      }
    ]
  }
];

const teamState = {
  selectedTeamId: TEAM_FIXTURE[0].id,
  visibleMembers: 6,
  selectedEventId: '',
  initialized: false
};

function retriggerClass(element, className) {
  if (!element) return;
  element.classList.remove(className);
  // restart animation on repeated triggers
  // eslint-disable-next-line no-unused-expressions
  element.offsetWidth;
  element.classList.add(className);
  window.setTimeout(() => element.classList.remove(className), 620);
}

function setSettingsRotation(deg) {
  if (!settingsIcon) return;
  settingsRotationDeg = deg;
  settingsIcon.style.transform = `rotate(${settingsRotationDeg}deg)`;
}

function clearSettingsSettleTimer() {
  if (!settingsSettleTimer) return;
  window.clearTimeout(settingsSettleTimer);
  settingsSettleTimer = 0;
}

function settleSettingsRotation(delayMs = 170) {
  clearSettingsSettleTimer();
  settingsSettleTimer = window.setTimeout(() => {
    if (!settingsButton) {
      setSettingsRotation(0);
      return;
    }
    setSettingsRotation(settingsButton.matches(':hover') ? 45 : 0);
  }, delayMs);
}

function setAuthError(message) {
  if (!authError) return;
  authError.textContent = message;
}

function isAuthorized() {
  try {
    return window.sessionStorage.getItem(AUTH_STORAGE_KEY) === '1';
  } catch (_error) {
    return false;
  }
}

function rememberAuthorized() {
  try {
    window.sessionStorage.setItem(AUTH_STORAGE_KEY, '1');
  } catch (_error) {
    // ignore storage issues
  }
}

function normalizeAuthValue(value) {
  return String(value || '')
    .trim()
    .replace(/\s+/g, ' ')
    .toUpperCase();
}

function lockApp() {
  if (!authOverlay) return;
  authLockedScrollY = window.scrollY || window.pageYOffset || 0;
  document.body.style.top = `-${authLockedScrollY}px`;
  document.body.classList.add('auth-locked');
  authOverlay.hidden = false;
  authOverlay.setAttribute('aria-hidden', 'false');
  setAuthError('');
  if (authPasswordInput) authPasswordInput.value = '';
  if (authLoginInput) authLoginInput.focus();
}

function unlockApp() {
  if (!authOverlay) return;
  authOverlay.hidden = true;
  authOverlay.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('auth-locked');
  document.body.style.top = '';
  window.scrollTo(0, authLockedScrollY);
}

function initAuth() {
  if (!authOverlay || !authForm) return;
  if (isAuthorized()) {
    unlockApp();
    return;
  }
  lockApp();

  authForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const login = normalizeAuthValue(authLoginInput?.value || '');
    const password = normalizeAuthValue(authPasswordInput?.value || '');
    if (AUTH_LOGINS.has(login) && AUTH_PASSWORDS.has(password)) {
      rememberAuthorized();
      unlockApp();
      return;
    }
    setAuthError('Неверный логин или пароль. Используйте SCORE / SCORE123');
    if (authPasswordInput) {
      authPasswordInput.focus();
      authPasswordInput.select();
    }
  });

  [authLoginInput, authPasswordInput].forEach((input) => {
    if (!input) return;
    input.addEventListener('input', () => setAuthError(''));
  });
}

function fitDropdownMenuToViewport(dropdown) {
  if (!dropdown) return;
  const menu = dropdown.querySelector('.filter-menu');
  if (!menu) return;
  if (menu.classList.contains('location-geo-menu')) return;
  menu.style.left = '50%';
  menu.style.right = 'auto';
  menu.style.transform = 'translateX(-50%)';
  menu.dataset.fitMode = 'center';

  const pageWrap = document.querySelector('.page-wrap');
  const pageRect = pageWrap ? pageWrap.getBoundingClientRect() : null;
  const sideMargin = Math.max(8, Math.round(pageRect ? pageRect.left : 16));

  const menuRect = menu.getBoundingClientRect();
  const minLeft = sideMargin;
  const maxLeft = window.innerWidth - sideMargin - menuRect.width;
  const fitsViewport = menuRect.left >= minLeft && menuRect.right <= window.innerWidth - sideMargin;
  if (fitsViewport || maxLeft <= minLeft) return;

  const summary = dropdown.querySelector('summary');
  const anchorRect = summary ? summary.getBoundingClientRect() : dropdown.getBoundingClientRect();
  const dropdownRect = dropdown.getBoundingClientRect();
  const idealViewportLeft = anchorRect.left + (anchorRect.width - menuRect.width) / 2;
  const clampedViewportLeft = Math.max(minLeft, Math.min(idealViewportLeft, maxLeft));
  menu.style.left = `${clampedViewportLeft - dropdownRect.left + (menuRect.width / 2)}px`;
  menu.style.transform = 'translateX(-50%)';
  menu.dataset.fitMode = 'edge';
}

function fitAllOpenDropdownMenus() {
  filterDropdowns.forEach((dropdown) => {
    if (dropdown.open) fitDropdownMenuToViewport(dropdown);
  });
}

function closeLocationDropdownAnimated() {
  if (!locationDropdown || !locationDropdown.open) return;
  locationDropdown.removeAttribute('open');
}

function normalize(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/ё/g, 'е')
    .replace(/[‐‑‒–—−]/g, '-')
    .replace(/\s*-\s*/g, '-')
    .replace(/\s+/g, ' ')
    .trim();
}

function hydrateQuickZoneStations() {
  const stationIndex = new Map();
  metroLines.forEach((line) => {
    line.stations.forEach((station) => {
      stationIndex.set(normalize(station), station);
    });
  });

  metroQuickZones.forEach((zone) => {
    const sourceStations = metroQuickZoneSource[zone.key] || [];
    const resolved = sourceStations
      .map((station) => stationIndex.get(normalize(station)))
      .filter(Boolean);
    zone.stations = Array.from(new Set(resolved));
  });
}

hydrateQuickZoneStations();

function cloneSet(source) {
  return new Set(Array.from(source));
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function escapeAttr(value) {
  return escapeHtml(value);
}

function getAmenityIconPath(iconFile) {
  if (!iconFile) return '';
  return encodeURI(`./icons/${iconFile}`);
}

function getAmenityTooltip(item) {
  if (!item) return '';
  const label = String(item.label || '').trim();
  const description = String(item.description || '').trim();
  return description ? `${label}: ${description}` : label;
}

function getVenueAmenityEntries(venue) {
  return amenityMeta.filter((item) => venue.amenities && venue.amenities[item.key]);
}

function getVenueAmenityLabels(venue) {
  return getVenueAmenityEntries(venue).map((item) => item.label);
}

function getVenuePrimarySport(venue) {
  return Array.isArray(venue.sports) && venue.sports.length > 0 ? venue.sports[0] : '';
}

function splitToColumns(items, columns = 2) {
  if (!Array.isArray(items) || items.length === 0) return Array.from({ length: columns }, () => []);
  const result = Array.from({ length: columns }, () => []);
  const perColumn = Math.ceil(items.length / columns);
  for (let i = 0; i < columns; i += 1) {
    const start = i * perColumn;
    result[i] = items.slice(start, start + perColumn);
  }
  return result;
}

function setsEqual(a, b) {
  if (a.size !== b.size) return false;
  for (const value of a) {
    if (!b.has(value)) return false;
  }
  return true;
}

function getMetroLineById(lineId) {
  return metroLines.find((line) => line.id === lineId);
}

function getMetroLineByStation(stationName) {
  const needle = normalize(stationName);
  return metroLines.find((line) => line.stations.some((station) => normalize(station) === needle));
}

function getQuickZoneStations(zoneKey) {
  const zone = metroQuickZones.find((item) => item.key === zoneKey);
  return zone && Array.isArray(zone.stations) ? zone.stations : [];
}

function isQuickZoneSelected(zoneKey, stationsSet) {
  const stations = getQuickZoneStations(zoneKey);
  return stations.length > 0 && stations.every((station) => stationsSet.has(station));
}

function toggleQuickZone(zoneKey) {
  const stations = getQuickZoneStations(zoneKey);
  if (stations.length === 0) return;
  const selected = isQuickZoneSelected(zoneKey, state.metroDraft.stations);
  if (selected) {
    stations.forEach((station) => state.metroDraft.stations.delete(station));
  } else {
    stations.forEach((station) => state.metroDraft.stations.add(station));
  }
}

function colorWithAlpha(hex, alpha = 0.12) {
  const safeHex = String(hex || '').trim();
  const short = safeHex.match(/^#([0-9a-fA-F]{3})$/);
  const full = safeHex.match(/^#([0-9a-fA-F]{6})$/);
  let r = 58;
  let g = 133;
  let b = 253;
  if (short) {
    const [h1, h2, h3] = short[1].split('');
    r = parseInt(h1 + h1, 16);
    g = parseInt(h2 + h2, 16);
    b = parseInt(h3 + h3, 16);
  } else if (full) {
    r = parseInt(full[1].slice(0, 2), 16);
    g = parseInt(full[1].slice(2, 4), 16);
    b = parseInt(full[1].slice(4, 6), 16);
  }
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function updateNavIndicator() {
  if (!mainNav || !navIndicator) return;
  const active = sectionButtons.find((button) => button.dataset.section === state.section);
  if (!active) {
    navIndicator.style.opacity = '0';
    return;
  }
  navIndicator.style.opacity = '1';
  navIndicator.style.width = `${active.offsetWidth}px`;
  navIndicator.style.transform = `translateX(${active.offsetLeft}px)`;
}

function matchesQuery(venue, query) {
  if (!query) return true;
  const haystack = [
    venue.shortName,
    venue.fullName,
    venue.metro,
    venue.district,
    venue.address,
    ...(Array.isArray(venue.sports) ? venue.sports : []),
    ...getVenueAmenityLabels(venue)
  ].join(' ').toLowerCase();
  return haystack.includes(normalize(query));
}

function matchesPrice(price, minValue, maxValue) {
  if (minValue !== null && price < minValue) return false;
  if (maxValue !== null && price > maxValue) return false;
  return true;
}

function matchesAmenities(venueAmenities, selectedAmenities) {
  if (selectedAmenities.size === 0) return true;
  return Array.from(selectedAmenities).every((tag) => venueAmenities.includes(tag));
}

function matchesSports(venueSports) {
  if (state.filters.sports.size === 0) return true;
  return Array.from(state.filters.sports).some((item) => venueSports.includes(item));
}

function matchesMetro(venue) {
  const venueMetro = normalize(venue.metro);
  if (state.filters.metroStations.size > 0) {
    const selectedStations = Array.from(state.filters.metroStations).map((name) => normalize(name));
    if (!selectedStations.includes(venueMetro)) return false;
  } else if (state.filters.metro !== 'all' && venueMetro !== normalize(state.filters.metro)) {
    return false;
  }
  if (state.filters.metroLines.size > 0) {
    const selectedLines = Array.from(state.filters.metroLines)
      .map((lineId) => getMetroLineById(lineId))
      .filter(Boolean);
    if (selectedLines.length === 0) return false;
    if (!selectedLines.some((line) => line.stations.some((station) => normalize(station) === venueMetro))) return false;
  } else if (state.filters.metroLine !== 'all') {
    const fallbackLine = getMetroLineById(state.filters.metroLine);
    if (!fallbackLine) return false;
    if (!fallbackLine.stations.some((station) => normalize(station) === venueMetro)) return false;
  }
  return true;
}

function matchesDistrict(venueDistrict) {
  if (!state.filters.districts || state.filters.districts.size === 0) return true;
  return state.filters.districts.has(venueDistrict);
}

function matchesMapArea(venueDistrict) {
  if (!state.filters.metroArea) return true;
  return mapAreaDistricts.has(venueDistrict);
}

function syncMetroStateFromSelectedStations() {
  const selectedLineIdsByStations = new Set(
    Array.from(state.filters.metroStations)
      .map((station) => getMetroLineByStation(station)?.id || '')
      .filter(Boolean)
  );
  state.filters.metroLines = selectedLineIdsByStations;
  state.filters.metro = state.filters.metroStations.size > 0 ? Array.from(state.filters.metroStations)[0] : 'all';
  if (state.filters.metroStations.size > 0) {
    const line = getMetroLineByStation(state.filters.metro);
    state.filters.metroLine = line ? line.id : 'all';
  } else if (selectedLineIdsByStations.size > 0) {
    state.filters.metroLine = Array.from(selectedLineIdsByStations)[0];
  } else {
    state.filters.metroLine = 'all';
  }
}

function getFilteredVenues() {
  return venues.filter((venue) => {
    if (!matchesQuery(venue, state.filters.query)) return false;
    if (state.filters.isNew && !venue.isNew) return false;
    if (state.filters.isFavorite && !venue.isFavorite) return false;
    if (state.filters.isFree && !venue.isFree) return false;
    if (!matchesSports(Array.isArray(venue.sports) ? venue.sports : [])) return false;
    if (!matchesMetro(venue)) return false;
    if (!matchesDistrict(venue.district)) return false;
    if (!matchesMapArea(venue.district)) return false;
    if (state.filters.location !== 'all' && venue.location !== state.filters.location) return false;
    if (state.filters.datetime !== 'all' && !venue.datetime.includes(state.filters.datetime)) return false;
    if (!matchesPrice(venue.pricePerHour, state.filters.priceMin, state.filters.priceMax)) return false;
    if (!matchesAmenities(getVenueAmenityLabels(venue), state.filters.amenities)) return false;
    return true;
  });
}

function renderSimpleMenu(container, options, activeValue, onSelect) {
  if (!container) return;
  container.innerHTML = options.map((option) => `<button type="button" data-value="${option.value}" class="${option.value === activeValue ? 'is-selected' : ''}">${option.label}</button>`).join('');
  Array.from(container.querySelectorAll('button')).forEach((button) => {
    button.addEventListener('click', () => {
      onSelect(button.dataset.value || 'all');
      const details = container.closest('details');
      if (details) details.removeAttribute('open');
      render();
    });
  });
}

function renderAmenitiesMenu(options = {}) {
  const { keepSearchFocus = false } = options;
  if (!amenitiesMenu) return;
  const prevScroller = amenitiesMenu.querySelector('.picker-options-grid');
  const savedScrollTop = prevScroller ? prevScroller.scrollTop : 0;
  const hasSelectedAmenities = state.amenitiesDraft.size > 0;
  const query = normalize(state.amenitiesDraftQuery);
  const filteredAmenities = amenitiesCatalog.filter((item) => normalize(item).includes(query));
  const columns = splitToColumns(filteredAmenities, 2);
  amenitiesMenu.innerHTML = `
    <div class="picker-search-row">
      <input class="picker-search-input" type="text" placeholder="Найти" maxlength="15" value="${state.amenitiesDraftQuery}">
    </div>
    <div class="picker-options-grid">
      ${columns.map((col) => `
        <div class="picker-options-col">
          ${col.map((amenity) => {
            const selected = state.amenitiesDraft.has(amenity);
            return `
              <button type="button" class="picker-option-row ${selected ? 'is-selected' : ''}" data-amenity-value="${amenity}">
                <span class="picker-option-box" aria-hidden="true"></span>
                <span class="picker-option-text">${amenity}</span>
              </button>
            `;
          }).join('')}
        </div>
      `).join('')}
    </div>
    <div class="picker-footer-row ${hasSelectedAmenities ? 'is-active' : ''}">
      <button class="metro-head-btn picker-action-btn metro-head-btn-cancel" type="button" data-amenity-action="cancel">Сбросить</button>
      <button class="metro-head-btn picker-action-btn metro-head-btn-apply" type="button" data-amenity-action="apply">Показать</button>
    </div>
  `;

  if (keepSearchFocus) {
    const inputEl = amenitiesMenu.querySelector('.picker-search-input');
    if (inputEl instanceof HTMLInputElement) {
      inputEl.focus();
      const pos = inputEl.value.length;
      inputEl.setSelectionRange(pos, pos);
    }
  }

  const nextScroller = amenitiesMenu.querySelector('.picker-options-grid');
  if (nextScroller) nextScroller.scrollTop = savedScrollTop;

  const search = amenitiesMenu.querySelector('.picker-search-input');
  if (search) {
    search.addEventListener('input', (event) => {
      const target = event.target;
      if (!(target instanceof HTMLInputElement)) return;
      state.amenitiesDraftQuery = target.value.slice(0, 15);
      renderAmenitiesMenu({ keepSearchFocus: true });
    });
  }

  Array.from(amenitiesMenu.querySelectorAll('[data-amenity-value]')).forEach((button) => {
    button.addEventListener('click', () => {
      const value = button.dataset.amenityValue || '';
      if (!value) return;
      if (state.amenitiesDraft.has(value)) state.amenitiesDraft.delete(value);
      else state.amenitiesDraft.add(value);
      renderAmenitiesMenu();
    });
  });

  Array.from(amenitiesMenu.querySelectorAll('[data-amenity-action]')).forEach((button) => {
    button.addEventListener('click', () => {
      const action = button.dataset.amenityAction;
      if (action === 'cancel') {
        state.amenitiesDraft.clear();
        state.amenitiesDraftQuery = '';
        renderAmenitiesMenu();
        renderFilterLabels();
        return;
      }
      state.filters.amenities = cloneSet(state.amenitiesDraft);
      if (amenitiesDropdown) amenitiesDropdown.removeAttribute('open');
      render();
    });
  });
}

function parsePriceInput(value) {
  const normalized = String(value || '').replace(/[^\d]/g, '');
  if (!normalized) return null;
  const num = Number(normalized);
  if (!Number.isFinite(num)) return null;
  return Math.max(0, Math.round(num));
}

function isPresetActive(preset) {
  return state.priceDraft.min === preset.min && state.priceDraft.max === preset.max;
}

function renderPriceMenu() {
  if (!priceMenu) return;
  const hasSelectedPrice = state.priceDraft.min !== null || state.priceDraft.max !== null;
  const minText = state.priceDraft.min === null ? '0' : String(state.priceDraft.min);
  const maxText = state.priceDraft.max === null ? '' : String(state.priceDraft.max);

  priceMenu.innerHTML = `
    <div class="price-picker-head ${hasSelectedPrice ? 'is-active' : ''}">
      <button class="metro-head-btn picker-action-btn metro-head-btn-cancel" type="button" data-price-action="reset">Сбросить</button>
      <button class="metro-head-btn picker-action-btn metro-head-btn-apply" type="button" data-price-action="apply">Показать</button>
    </div>
    <div class="price-picker-body">
      <p class="price-section-title">Стоимость аренды в час</p>
      <div class="price-range-row">
        <div class="price-field">
          <span class="price-input-wrap">
            <input class="price-input ${state.priceDraft.min === null ? 'price-input-muted' : ''}" type="text" inputmode="numeric" maxlength="4" value="${minText}" data-price-input="min">
            <span class="price-rub">₽</span>
          </span>
        </div>
        <span class="price-range-dash">—</span>
        <div class="price-field">
          <span class="price-input-wrap">
            <input class="price-input" type="text" inputmode="numeric" maxlength="4" placeholder="∞" value="${maxText}" data-price-input="max">
            <span class="price-rub">₽</span>
          </span>
        </div>
      </div>
      <div class="price-presets">
        ${pricePresets.map((preset) => `<button type="button" class="price-preset ${isPresetActive(preset) ? 'is-selected' : ''}" data-price-preset="${preset.key}">${preset.label}</button>`).join('')}
      </div>
    </div>
  `;

  Array.from(priceMenu.querySelectorAll('[data-price-input]')).forEach((input) => {
    input.addEventListener('input', (event) => {
      const target = event.target;
      if (!(target instanceof HTMLInputElement)) return;
      const key = target.dataset.priceInput;
      const digitsOnly = target.value.replace(/[^\d]/g, '').slice(0, 4);
      target.value = digitsOnly;
      const parsed = parsePriceInput(digitsOnly);
      if (key === 'min') state.priceDraft.min = parsed;
      if (key === 'max') state.priceDraft.max = parsed;
      if (key === 'max' && !digitsOnly) state.priceDraft.max = null;
      if (key === 'min' && !digitsOnly) state.priceDraft.min = null;
      if (key === 'min') target.classList.toggle('price-input-muted', state.priceDraft.min === null);

      Array.from(priceMenu.querySelectorAll('.price-preset.is-selected')).forEach((presetBtn) => {
        presetBtn.classList.remove('is-selected');
      });

      const head = priceMenu.querySelector('.price-picker-head');
      if (head) {
        const hasAnyDraftPrice = state.priceDraft.min !== null || state.priceDraft.max !== null;
        head.classList.toggle('is-active', hasAnyDraftPrice);
      }
    });
  });

  Array.from(priceMenu.querySelectorAll('[data-price-preset]')).forEach((button) => {
    button.addEventListener('click', () => {
      const preset = pricePresets.find((item) => item.key === button.dataset.pricePreset);
      if (!preset) return;
      state.priceDraft.min = preset.min;
      state.priceDraft.max = preset.max;
      renderPriceMenu();
    });
  });

  Array.from(priceMenu.querySelectorAll('[data-price-action]')).forEach((button) => {
    button.addEventListener('click', () => {
      const action = button.dataset.priceAction;
      if (action === 'reset') {
        state.priceDraft.min = null;
        state.priceDraft.max = null;
        renderPriceMenu();
        renderFilterLabels();
        return;
      }
      if (state.priceDraft.min !== null && state.priceDraft.max !== null && state.priceDraft.min > state.priceDraft.max) {
        const temp = state.priceDraft.min;
        state.priceDraft.min = state.priceDraft.max;
        state.priceDraft.max = temp;
      }
      state.filters.priceMin = state.priceDraft.min;
      state.filters.priceMax = state.priceDraft.max;
      if (priceDropdown) priceDropdown.removeAttribute('open');
      render();
    });
  });
}

function formatPriceLabel(minValue, maxValue) {
  if (minValue !== null && maxValue !== null) return `${minValue}-${maxValue} ₽`;
  if (minValue !== null) return `от ${minValue} ₽`;
  if (maxValue !== null) return `до ${maxValue} ₽`;
  return '';
}

function clearAllFilters() {
  state.activeFiltersExpanded = false;
  state.filters.query = '';
  state.filters.isNew = false;
  state.filters.isFavorite = false;
  state.filters.isFree = false;
  state.filters.sports.clear();
  state.filters.priceMin = null;
  state.filters.priceMax = null;
  state.filters.metro = 'all';
  state.filters.metroLine = 'all';
  state.filters.metroLines.clear();
  state.filters.metroStations.clear();
  state.filters.metroArea = false;
  state.filters.location = 'all';
  state.filters.datetime = 'all';
  state.filters.amenities.clear();
  state.filters.districts.clear();
  state.sportDraft.clear();
  state.sportDraftQuery = '';
  state.amenitiesDraft.clear();
  state.amenitiesDraftQuery = '';
  state.priceDraft.min = null;
  state.priceDraft.max = null;
  if (searchInput) searchInput.value = '';
}

function getActiveFilterTokens() {
  const tokens = [];
  const query = state.filters.query.trim();
  if (query) tokens.push({ type: 'query', value: query, label: `Поиск: ${query}` });
  if (state.filters.isNew) tokens.push({ type: 'quick', value: 'new', label: 'Новые' });
  if (state.filters.isFavorite) tokens.push({ type: 'quick', value: 'favorite', label: 'Избранные' });
  if (state.filters.isFree) tokens.push({ type: 'quick', value: 'free', label: 'Бесплатное' });
  Array.from(state.filters.sports).forEach((sport) => tokens.push({ type: 'sport', value: sport, label: sport }));

  const priceLabel = formatPriceLabel(state.filters.priceMin, state.filters.priceMax);
  if (priceLabel) tokens.push({ type: 'price', value: 'range', label: `Стоимость: ${priceLabel}` });

  Array.from(state.filters.metroStations).forEach((station) => {
    tokens.push({ type: 'metro-station', value: station, label: station });
  });

  Array.from(state.filters.districts).forEach((district) => {
    tokens.push({ type: 'district', value: district, label: district });
  });

  Array.from(state.filters.amenities).forEach((amenity) => {
    tokens.push({ type: 'amenity', value: amenity, label: amenity });
  });

  if (state.filters.datetime !== 'all') {
    const datetimeLabel = datetimeOptions.find((item) => item.value === state.filters.datetime)?.label || 'Дата и время';
    tokens.push({ type: 'datetime', value: state.filters.datetime, label: datetimeLabel });
  }

  return tokens;
}

function removeActiveFilterToken(type, value) {
  if (type === 'query') {
    state.filters.query = '';
    if (searchInput) searchInput.value = '';
    return;
  }
  if (type === 'quick') {
    if (value === 'new') state.filters.isNew = false;
    if (value === 'favorite') state.filters.isFavorite = false;
    if (value === 'free') state.filters.isFree = false;
    return;
  }
  if (type === 'sport') {
    state.filters.sports.delete(value);
    return;
  }
  if (type === 'price') {
    state.filters.priceMin = null;
    state.filters.priceMax = null;
    return;
  }
  if (type === 'metro-station') {
    state.filters.metroStations.delete(value);
    syncMetroStateFromSelectedStations();
    return;
  }
  if (type === 'district') {
    state.filters.districts.delete(value);
    return;
  }
  if (type === 'amenity') {
    state.filters.amenities.delete(value);
    return;
  }
  if (type === 'datetime') {
    state.filters.datetime = 'all';
  }
}

function renderSportActiveRow() {
  if (!sportActiveRow) return;
  const tokens = getActiveFilterTokens();

  if (tokens.length === 0) {
    state.activeFiltersExpanded = false;
    sportActiveRow.innerHTML = '';
    sportActiveRow.classList.remove('is-visible');
    sportActiveRow.classList.remove('is-expanded');
    return;
  }

  if (tokens.length <= 6) state.activeFiltersExpanded = false;
  sportActiveRow.classList.add('is-visible');
  sportActiveRow.classList.toggle('is-expanded', state.activeFiltersExpanded);
  const visibleLimit = 6;
  const visibleTokens = state.activeFiltersExpanded ? tokens : tokens.slice(0, visibleLimit);
  const hiddenCount = Math.max(0, tokens.length - visibleLimit);
  const overflowLabel = state.activeFiltersExpanded ? 'Скрыть' : `Показать еще ${hiddenCount}`;
  const overflowStateClass = state.activeFiltersExpanded ? 'is-hide' : 'is-show-more';

  const chips = visibleTokens.map((token) => `
    <button
      type="button"
      class="sport-active-chip"
      data-filter-type="${token.type}"
      data-filter-value="${escapeAttr(token.value)}"
    >
      <span class="sport-active-chip-label">${escapeHtml(token.label)}</span>
      <img class="sport-active-plus" src="./icons/krest.svg" alt="" aria-hidden="true">
    </button>
  `).join('');

  sportActiveRow.innerHTML = `
    ${chips}
    ${(hiddenCount > 0 || state.activeFiltersExpanded) ? `<button type="button" class="sport-reset-btn sport-overflow-btn ${overflowStateClass}">${overflowLabel}</button>` : ''}
    <button type="button" class="sport-reset-btn" data-filters-reset="all">Сбросить всё</button>
  `;

  Array.from(sportActiveRow.querySelectorAll('.sport-active-chip')).forEach((button) => {
    button.addEventListener('click', () => {
      removeActiveFilterToken(button.dataset.filterType || '', button.dataset.filterValue || '');
      render();
    });
  });

  const overflow = sportActiveRow.querySelector('.sport-overflow-btn');
  if (overflow) {
    overflow.addEventListener('click', () => {
      state.activeFiltersExpanded = !state.activeFiltersExpanded;
      renderSportActiveRow();
    });
  }

  const reset = sportActiveRow.querySelector('[data-filters-reset]');
  if (reset) {
    reset.addEventListener('click', () => {
      clearAllFilters();
      render();
    });
  }
}

function renderSportMenu(options = {}) {
  const { keepSearchFocus = false } = options;
  if (!sportMenu) return;
  const prevScroller = sportMenu.querySelector('.picker-options-grid');
  const savedScrollTop = prevScroller ? prevScroller.scrollTop : 0;
  const hasSelectedSports = state.sportDraft.size > 0;
  const query = normalize(state.sportDraftQuery);
  const filteredSports = sportCatalog.filter((sport) => normalize(sport).includes(query));
  const columns = splitToColumns(filteredSports, 2);
  sportMenu.innerHTML = `
    <div class="picker-search-row">
      <input class="picker-search-input" type="text" placeholder="Найти" maxlength="15" value="${state.sportDraftQuery}">
    </div>
    <div class="picker-options-grid">
      ${columns.map((col) => `
        <div class="picker-options-col">
          ${col.map((sport) => {
            const selected = state.sportDraft.has(sport);
            return `
              <button type="button" class="picker-option-row ${selected ? 'is-selected' : ''}" data-sport-value="${sport}">
                <span class="picker-option-box" aria-hidden="true"></span>
                <span class="picker-option-text">${sport}</span>
              </button>
            `;
          }).join('')}
        </div>
      `).join('')}
    </div>
    <div class="picker-footer-row ${hasSelectedSports ? 'is-active' : ''}">
      <button class="metro-head-btn picker-action-btn metro-head-btn-cancel" type="button" data-sport-action="cancel">Сбросить</button>
      <button class="metro-head-btn picker-action-btn metro-head-btn-apply" type="button" data-sport-action="apply">Показать</button>
    </div>
  `;

  if (keepSearchFocus) {
    const inputEl = sportMenu.querySelector('.picker-search-input');
    if (inputEl instanceof HTMLInputElement) {
      inputEl.focus();
      const pos = inputEl.value.length;
      inputEl.setSelectionRange(pos, pos);
    }
  }

  const nextScroller = sportMenu.querySelector('.picker-options-grid');
  if (nextScroller) nextScroller.scrollTop = savedScrollTop;

  const search = sportMenu.querySelector('.picker-search-input');
  if (search) {
    search.addEventListener('input', (event) => {
      const target = event.target;
      if (!(target instanceof HTMLInputElement)) return;
      state.sportDraftQuery = target.value.slice(0, 15);
      renderSportMenu({ keepSearchFocus: true });
    });
  }

  Array.from(sportMenu.querySelectorAll('[data-sport-value]')).forEach((button) => {
    button.addEventListener('click', () => {
      const value = button.dataset.sportValue || '';
      if (!value) return;
      if (state.sportDraft.has(value)) state.sportDraft.delete(value);
      else state.sportDraft.add(value);
      renderSportMenu();
    });
  });

  Array.from(sportMenu.querySelectorAll('[data-sport-action]')).forEach((button) => {
    button.addEventListener('click', () => {
      const action = button.dataset.sportAction;
      if (action === 'cancel') {
        state.sportDraft.clear();
        state.sportDraftQuery = '';
        renderSportMenu();
        renderFilterLabels();
        return;
      }
      state.filters.sports = cloneSet(state.sportDraft);
      if (sportDropdown) sportDropdown.removeAttribute('open');
      render();
    });
  });
}

function resetMetroDraftFromFilters() {
  state.metroDraft.stations = cloneSet(state.filters.metroStations);
  state.metroDraft.initialStations = cloneSet(state.filters.metroStations);
  state.metroDraft.districts = cloneSet(state.filters.districts || new Set());
  state.metroDraft.initialDistricts = cloneSet(state.filters.districts || new Set());
  state.metroDraft.areaSelected = false;
  state.metroDraft.initialAreaSelected = false;
  state.metroDraft.search = '';
  state.metroDraft.districtSearch = '';
  if (!['metro', 'district'].includes(state.metroDraft.tab)) state.metroDraft.tab = 'metro';
  if (state.metroDraft.stations.size === 0 && state.filters.metro !== 'all') {
    state.metroDraft.stations.add(state.filters.metro);
    state.metroDraft.initialStations.add(state.filters.metro);
  }
  state.metroDraft.line = state.filters.metroLine;
  state.metroDraft.station = state.metroDraft.stations.size > 0 ? Array.from(state.metroDraft.stations)[0] : state.filters.metro;
  if (state.metroDraft.line === 'all' && state.metroDraft.station !== 'all') {
    const line = getMetroLineByStation(state.metroDraft.station);
    if (line) state.metroDraft.line = line.id;
  }
}

function applyMetroDraft() {
  const appliedStations = cloneSet(state.metroDraft.stations);
  const selectedLineIdsByStations = new Set(
    Array.from(appliedStations)
      .map((station) => getMetroLineByStation(station)?.id || '')
      .filter(Boolean)
  );
  state.filters.metroLines = selectedLineIdsByStations;
  state.filters.metroStations = appliedStations;
  state.filters.metroArea = false;
  state.filters.districts = cloneSet(state.metroDraft.districts);
  state.filters.metro = state.filters.metroStations.size > 0 ? Array.from(state.filters.metroStations)[0] : 'all';
  if (state.filters.metroStations.size > 0) {
    const currentLine = getMetroLineByStation(state.filters.metro);
    state.filters.metroLine = currentLine ? currentLine.id : 'all';
  } else if (state.filters.metroLines.size > 0) {
    state.filters.metroLine = Array.from(state.filters.metroLines)[0];
  } else {
    state.filters.metroLine = 'all';
  }
}

function renderGeoMenu(targetMenu, targetDropdown, options = {}) {
  const { keepSearchFocus = false, keepDistrictSearchFocus = false, sheetMode = false } = options;
  const rerender = (nextOptions = {}) => renderGeoMenu(targetMenu, targetDropdown, { ...nextOptions, sheetMode });
  if (!targetMenu) return;
  const prevLinesScroller = targetMenu.querySelector('.metro-lines-grid');
  const prevStationsScroller = targetMenu.querySelector('.metro-stations-grid');
  const prevDistrictScroller = targetMenu.querySelector('.metro-district-simple');
  const savedLinesScrollTop = prevLinesScroller ? prevLinesScroller.scrollTop : 0;
  const savedStationsScrollTop = prevStationsScroller ? prevStationsScroller.scrollTop : 0;
  const savedDistrictScrollTop = prevDistrictScroller ? prevDistrictScroller.scrollTop : 0;

  const focusedLine = getMetroLineById(state.metroDraft.line);
  const firstSelectedStation = Array.from(state.metroDraft.stations)[0] || state.metroDraft.station;
  const stationLine = getMetroLineByStation(firstSelectedStation);
  const activeLine = focusedLine || stationLine || metroLines[0];

  const stationQuery = normalize(state.metroDraft.search);
  const districtQuery = normalize(state.metroDraft.districtSearch);
  const globalStationMatches = stationQuery
    ? metroLines.flatMap((line) => line.stations
      .filter((station) => normalize(station).includes(stationQuery))
      .map((station) => ({ station, line })))
    : [];
  const stationsForView = stationQuery
    ? globalStationMatches
    : activeLine.stations.map((station) => ({ station, line: activeLine }));

  const allStationsSelectedOnActiveLine = activeLine.stations.length > 0
    && activeLine.stations.every((station) => state.metroDraft.stations.has(station));
  const selectAllStyle = allStationsSelectedOnActiveLine
    ? `style="--station-line-color:${activeLine.color}; --station-line-fill:${colorWithAlpha(activeLine.color, 0.14)}; border-color:${activeLine.color};"`
    : '';

  const filteredDistrictGroups = districtGroups
    .map((group) => ({
      ...group,
      districts: group.districts.filter((district) => normalize(district).includes(districtQuery))
    }))
    .filter((group) => group.districts.length > 0);

  const hasSelection = state.metroDraft.stations.size > 0
    || state.metroDraft.districts.size > 0;

  const quickChipsMarkup = metroQuickZones.map((zone) => {
    const selected = isQuickZoneSelected(zone.key, state.metroDraft.stations);
    return `<button type="button" class="metro-quick-chip ${selected ? 'is-selected' : ''}" data-metro-quick="${zone.key}" style="--metro-quick-color:${zone.color}; --metro-quick-fill:${colorWithAlpha(zone.color, 0.18)}">${zone.label}</button>`;
  }).join('');

  const metroTabContent = `
    <div class="metro-tools-row metro-tools-row-single">
      <input class="metro-station-search" type="text" maxlength="30" placeholder="Найти станцию" value="${state.metroDraft.search}">
    </div>
    <div class="metro-content">
      <div class="metro-lines-column">
        <div class="metro-lines-grid">
          ${metroLines.map((line) => {
            const isFocused = line.id === activeLine.id;
            const hasStationSelection = line.stations.some((station) => state.metroDraft.stations.has(station));
            const lineStyle = `style="--line-accent:${line.color}; --line-fill:${colorWithAlpha(line.color, 0.14)};"`;
            return `
              <button
                type="button"
                class="metro-line-btn ${isFocused ? 'is-focused' : ''} ${hasStationSelection ? 'is-selected' : ''}"
                data-metro-line="${line.id}"
                ${lineStyle}
              >
                <span class="metro-line-badge" style="background:${line.color}">${line.number}</span>
                <span class="metro-line-text">${line.name.replace(/^МЦД-\d+\s*/, '')}</span>
              </button>
            `;
          }).join('')}
        </div>
      </div>
      <div class="metro-stations-wrap">
        ${stationQuery ? '' : `
          <button
            type="button"
            class="metro-select-all-chip ${allStationsSelectedOnActiveLine ? 'is-selected' : ''}"
            data-metro-select-all="1"
            ${selectAllStyle}
          >
            <span class="metro-line-badge metro-select-all-badge" style="background:${activeLine.color}">${activeLine.number}</span>
            Выбрать все станции
          </button>
        `}
        <div class="metro-stations-grid">
          ${stationsForView.map(({ station, line }) => {
            const selected = state.metroDraft.stations.has(station);
            return `<button type="button" class="metro-station-chip ${selected ? 'is-selected' : ''}" data-metro-station="${station}" style="--station-line-color:${line.color};">${station}</button>`;
          }).join('')}
        </div>
      </div>
    </div>
  `;

  const districtTabContent = `
    <div class="metro-tools-row metro-tools-row-single">
      <input class="metro-station-search" type="text" maxlength="30" placeholder="Найти район" value="${state.metroDraft.districtSearch}" data-district-search="1">
    </div>
    <div class="metro-district-simple">
      ${filteredDistrictGroups.map((group) => `
        <section class="metro-district-simple-group">
          <button type="button" class="metro-district-simple-head ${group.districts.every((district) => state.metroDraft.districts.has(district)) ? 'is-selected' : ''}" data-metro-district-group="${group.name}">
            <span class="metro-district-box" aria-hidden="true"></span>
            <span class="metro-district-group-title">${group.name}</span>
          </button>
          <div class="metro-district-simple-grid">
            ${group.districts.map((district) => {
              const selected = state.metroDraft.districts.has(district);
              return `
                <button type="button" class="metro-district-simple-item ${selected ? 'is-selected' : ''}" data-metro-district="${district}">
                  <span class="metro-district-box" aria-hidden="true"></span>
                  <span class="metro-district-text">${district}</span>
                </button>
              `;
            }).join('')}
          </div>
        </section>
      `).join('')}
    </div>
  `;

  const tabContent = state.metroDraft.tab === 'district'
    ? districtTabContent
    : metroTabContent;
  const footerQuickMarkup = sheetMode && state.metroDraft.tab === 'metro'
    ? `<div class="location-footer-quick">${quickChipsMarkup}</div>`
    : '<div class="location-footer-quick"></div>';

  if (sheetMode) {
    targetMenu.innerHTML = `
      <button type="button" class="location-sheet-backdrop" data-location-close="1" aria-label="Закрыть"></button>
      <div class="location-sheet-panel">
        <div class="metro-tab-head">
          <button type="button" class="metro-tab-btn ${state.metroDraft.tab === 'metro' ? 'is-active' : ''}" data-metro-tab="metro">Метро</button>
          <button type="button" class="metro-tab-btn ${state.metroDraft.tab === 'district' ? 'is-active' : ''}" data-metro-tab="district">Район</button>
          <button type="button" class="location-sheet-close" data-location-close="1" aria-label="Закрыть">
            <img class="location-sheet-close-icon" src="./icons/krest.svg" alt="" aria-hidden="true">
          </button>
        </div>
        <div class="metro-tab-body">${tabContent}</div>
        <div class="metro-picker-head ${hasSelection ? 'is-active' : ''}">
          ${footerQuickMarkup}
          <div class="location-footer-actions">
            <button class="metro-head-btn picker-action-btn metro-head-btn-cancel" type="button" data-metro-action="cancel">Сбросить</button>
            <button class="metro-head-btn picker-action-btn metro-head-btn-apply" type="button" data-metro-action="apply">Показать</button>
          </div>
        </div>
      </div>
    `;
    const panel = targetMenu.querySelector('.location-sheet-panel');
    if (panel) {
      panel.addEventListener('pointerdown', (event) => event.stopPropagation());
    }
    const closeByBackdrop = targetMenu.querySelector('.location-sheet-backdrop');
    if (closeByBackdrop) {
      closeByBackdrop.addEventListener('click', () => {
        closeLocationDropdownAnimated();
      });
    }
    const closeByButton = targetMenu.querySelector('.location-sheet-close');
    if (closeByButton) {
      closeByButton.addEventListener('click', () => {
        closeLocationDropdownAnimated();
      });
    }
  } else {
    targetMenu.innerHTML = `
      <div class="metro-tab-head">
        <button type="button" class="metro-tab-btn ${state.metroDraft.tab === 'metro' ? 'is-active' : ''}" data-metro-tab="metro">Метро</button>
        <button type="button" class="metro-tab-btn ${state.metroDraft.tab === 'district' ? 'is-active' : ''}" data-metro-tab="district">Район</button>
      </div>
      <div class="metro-tab-body">${tabContent}</div>
      <div class="metro-picker-head ${hasSelection ? 'is-active' : ''}">
        <button class="metro-head-btn picker-action-btn metro-head-btn-cancel" type="button" data-metro-action="cancel">Сбросить</button>
        <button class="metro-head-btn picker-action-btn metro-head-btn-apply" type="button" data-metro-action="apply">Показать</button>
      </div>
    `;
  }

  Array.from(targetMenu.querySelectorAll('[data-metro-tab]')).forEach((button) => {
    button.addEventListener('click', () => {
      state.metroDraft.tab = button.dataset.metroTab || 'metro';
      rerender();
    });
  });

  Array.from(targetMenu.querySelectorAll('[data-metro-quick]')).forEach((button) => {
    button.addEventListener('click', () => {
      toggleQuickZone(button.dataset.metroQuick || '');
      rerender();
    });
  });

  const metroSearch = targetMenu.querySelector('.metro-station-search:not([data-district-search])');
  if (metroSearch) {
    metroSearch.addEventListener('input', (event) => {
      const target = event.target;
      if (!(target instanceof HTMLInputElement)) return;
      state.metroDraft.search = target.value.slice(0, 30);
      rerender({ keepSearchFocus: true });
    });
  }

  const districtSearchInput = targetMenu.querySelector('.metro-station-search[data-district-search]');
  if (districtSearchInput) {
    districtSearchInput.addEventListener('input', (event) => {
      const target = event.target;
      if (!(target instanceof HTMLInputElement)) return;
      state.metroDraft.districtSearch = target.value.slice(0, 30);
      rerender({ keepDistrictSearchFocus: true });
    });
  }

  Array.from(targetMenu.querySelectorAll('[data-metro-line]')).forEach((button) => {
    button.addEventListener('click', () => {
      const lineId = button.dataset.metroLine || 'all';
      state.metroDraft.line = lineId;
      rerender();
    });
  });

  const selectAllButton = targetMenu.querySelector('[data-metro-select-all]');
  if (selectAllButton) {
    selectAllButton.addEventListener('click', () => {
      if (allStationsSelectedOnActiveLine) {
        activeLine.stations.forEach((station) => state.metroDraft.stations.delete(station));
      } else {
        activeLine.stations.forEach((station) => state.metroDraft.stations.add(station));
      }
      rerender();
    });
  }

  Array.from(targetMenu.querySelectorAll('[data-metro-station]')).forEach((button) => {
    button.addEventListener('click', () => {
      const stationName = button.dataset.metroStation || '';
      if (!stationName) return;
      if (state.metroDraft.stations.has(stationName)) state.metroDraft.stations.delete(stationName);
      else state.metroDraft.stations.add(stationName);
      state.metroDraft.station = state.metroDraft.stations.size > 0 ? Array.from(state.metroDraft.stations)[0] : 'all';
      rerender();
    });
  });

  Array.from(targetMenu.querySelectorAll('[data-metro-district]')).forEach((button) => {
    button.addEventListener('click', () => {
      const district = button.dataset.metroDistrict || '';
      if (!district) return;
      if (state.metroDraft.districts.has(district)) state.metroDraft.districts.delete(district);
      else state.metroDraft.districts.add(district);
      rerender();
    });
  });

  Array.from(targetMenu.querySelectorAll('[data-metro-district-group]')).forEach((button) => {
    button.addEventListener('click', () => {
      const groupName = button.dataset.metroDistrictGroup || '';
      const group = districtGroups.find((item) => item.name === groupName);
      if (!group) return;
      const isAllSelected = group.districts.every((district) => state.metroDraft.districts.has(district));
      if (isAllSelected) {
        group.districts.forEach((district) => state.metroDraft.districts.delete(district));
      } else {
        group.districts.forEach((district) => state.metroDraft.districts.add(district));
      }
      rerender();
    });
  });

  Array.from(targetMenu.querySelectorAll('[data-metro-action]')).forEach((button) => {
    button.addEventListener('click', () => {
      const action = button.dataset.metroAction;
      if (action === 'cancel') {
        state.metroDraft.stations.clear();
        state.metroDraft.station = 'all';
        state.metroDraft.districts.clear();
        state.metroDraft.areaSelected = false;
        state.metroDraft.search = '';
        state.metroDraft.districtSearch = '';
        rerender();
        renderFilterLabels();
        return;
      }
      applyMetroDraft();
      if (sheetMode) closeLocationDropdownAnimated();
      else if (targetDropdown) targetDropdown.removeAttribute('open');
      render();
    });
  });

  if (keepSearchFocus) {
    const input = targetMenu.querySelector('.metro-station-search:not([data-district-search])');
    if (input instanceof HTMLInputElement) {
      input.focus();
      const pos = input.value.length;
      input.setSelectionRange(pos, pos);
    }
  }
  if (keepDistrictSearchFocus) {
    const input = targetMenu.querySelector('.metro-station-search[data-district-search]');
    if (input instanceof HTMLInputElement) {
      input.focus();
      const pos = input.value.length;
      input.setSelectionRange(pos, pos);
    }
  }

  const nextLinesScroller = targetMenu.querySelector('.metro-lines-grid');
  const nextStationsScroller = targetMenu.querySelector('.metro-stations-grid');
  const nextDistrictScroller = targetMenu.querySelector('.metro-district-simple');
  if (nextLinesScroller) nextLinesScroller.scrollTop = savedLinesScrollTop;
  if (nextStationsScroller) nextStationsScroller.scrollTop = savedStationsScrollTop;
  if (nextDistrictScroller) nextDistrictScroller.scrollTop = savedDistrictScrollTop;
}

function renderMetroMenu(options = {}) {
  renderGeoMenu(metroMenu, metroDropdown, { ...options, sheetMode: false });
}

function renderLocationGeoMenu(options = {}) {
  renderGeoMenu(locationMenu, locationDropdown, { ...options, sheetMode: true });
}

function setLabel(element, baseText, selectedText, highlighted = false, opened = false) {
  if (!element) return;
  element.classList.toggle('filter-chip-active', highlighted || opened);
  const nextText = selectedText || baseText;
  let textEl = element.querySelector('.chip-label-text');
  let iconEl = element.querySelector('.chip-plus-icon');

  if (!textEl || !iconEl) {
    element.innerHTML = `<span class="chip-label-text"></span> <img class="chip-plus-icon" src="./icons/plus.svg" alt="" aria-hidden="true">`;
    textEl = element.querySelector('.chip-label-text');
    iconEl = element.querySelector('.chip-plus-icon');
  }

  if (textEl) textEl.textContent = nextText;
}

function renderFilterLabels() {
  const sportCount = state.filters.sports.size;
  const sportIsOpen = Boolean(sportDropdown && sportDropdown.open);
  if (sportLabel) {
    if (sportCount > 0) {
      sportLabel.classList.add('filter-chip-active');
      sportLabel.innerHTML = `Вид спорта <span class=\"chip-count-badge\" aria-hidden=\"true\">${sportCount}</span>`;
    } else {
      setLabel(sportLabel, 'Вид спорта', '', false, sportIsOpen);
    }
  }

  const hasPriceFilter = state.filters.priceMin !== null || state.filters.priceMax !== null;
  let priceText = '';
  if (state.filters.priceMin !== null && state.filters.priceMax !== null) priceText = `${state.filters.priceMin}-${state.filters.priceMax} ₽`;
  else if (state.filters.priceMin !== null) priceText = `от ${state.filters.priceMin} ₽`;
  else if (state.filters.priceMax !== null) priceText = `до ${state.filters.priceMax} ₽`;
  setLabel(priceLabel, 'Стоимость', priceText, hasPriceFilter, Boolean(priceDropdown && priceDropdown.open));

  const metroStationsCount = state.filters.metroStations.size;
  const metroDistrictCount = state.filters.districts ? state.filters.districts.size : 0;
  const metroTotalCount = metroStationsCount + metroDistrictCount;
  if (metroLabel) {
    if (metroTotalCount > 0) {
      metroLabel.classList.add('filter-chip-active');
      metroLabel.innerHTML = `Метро <span class=\"chip-count-badge\" aria-hidden=\"true\">${metroTotalCount}</span>`;
    } else {
      let metroText = '';
      if (state.filters.metro !== 'all') metroText = state.filters.metro;
      else if (state.filters.metroLines.size === 1) {
        const [singleLineId] = Array.from(state.filters.metroLines);
        metroText = getMetroLineById(singleLineId)?.name || '';
      } else if (state.filters.metroLines.size > 1) {
        metroText = `Линии (${state.filters.metroLines.size})`;
      } else if (state.filters.metroLine !== 'all') {
        metroText = getMetroLineById(state.filters.metroLine)?.name || '';
      }
      setLabel(metroLabel, 'Метро', metroText, metroText.length > 0, Boolean(metroDropdown && metroDropdown.open));
    }
  }

  const locationCount = state.filters.metroStations.size + state.filters.districts.size;
  if (locationLabel) {
    if (locationCount > 0) {
      locationLabel.classList.add('filter-chip-active');
      locationLabel.innerHTML = `Расположение <span class="chip-count-badge" aria-hidden="true">${locationCount}</span>`;
    } else {
      setLabel(locationLabel, 'Расположение', '', false, Boolean(locationDropdown && locationDropdown.open));
    }
  }

  const amenitiesSize = state.filters.amenities.size;
  const amenitiesIsOpen = Boolean(amenitiesDropdown && amenitiesDropdown.open);
  if (amenitiesLabel) {
    if (amenitiesSize > 0) {
      amenitiesLabel.classList.add('filter-chip-active');
      amenitiesLabel.innerHTML = `Удобства <span class=\"chip-count-badge\" aria-hidden=\"true\">${amenitiesSize}</span>`;
    } else {
      setLabel(amenitiesLabel, 'Удобства', '', false, amenitiesIsOpen);
    }
  }

  const datetimeText = datetimeOptions.find((item) => item.value === state.filters.datetime)?.label;
  setLabel(datetimeLabel, 'Дата и время', state.filters.datetime === 'all' ? '' : datetimeText, state.filters.datetime !== 'all', Boolean(datetimeDropdown && datetimeDropdown.open));
}

function renderFilterButtons() {
  if (newButton) newButton.setAttribute('aria-pressed', state.filters.isNew ? 'true' : 'false');
  if (favoriteButton) favoriteButton.setAttribute('aria-pressed', state.filters.isFavorite ? 'true' : 'false');
  if (freeButton) freeButton.setAttribute('aria-pressed', state.filters.isFree ? 'true' : 'false');
}

function renderPanels() {
  sectionPanels.forEach((panel) => panel.classList.toggle('is-active', panel.dataset.panel === state.section));
}

function mountSharedFiltersForActiveSection() {
  // Legacy bridge disabled: games now has an independent full filter stack.
}

function renderNavState() {
  sectionButtons.forEach((button) => {
    const isActive = button.dataset.section === state.section;
    button.classList.toggle('is-active', isActive);
    button.setAttribute('aria-selected', isActive ? 'true' : 'false');
  });
  quickButtons.forEach((button) => {
    const isActive = button.dataset.quick === state.quickAction;
    button.classList.toggle('is-active', isActive);
    button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
  });
  if (avatarButton) {
    const isProfileActive = state.section === 'profile';
    avatarButton.classList.toggle('is-active', isProfileActive);
    avatarButton.setAttribute('aria-pressed', isProfileActive ? 'true' : 'false');
  }
}

function renderFilterMenus() {
  renderPriceMenu();
  renderLocationGeoMenu();

  renderSimpleMenu(datetimeMenu, datetimeOptions, state.filters.datetime, (value) => {
    state.filters.datetime = value;
  });

  renderAmenitiesMenu();
  renderSportMenu();
  renderMetroMenu();
}

function getVenuePriceBadge(venue) {
  if (!venue.isPaid || venue.pricePerHour <= 0) return { label: 'Бесплатно', className: 'is-free' };
  return { label: `от ${venue.pricePerHour} ₽/час`, className: 'is-paid' };
}

function getVenueCardMeta(venue) {
  return `${venue.district} · м. ${venue.metro}`;
}

function getAreaShortName(area) {
  const source = String(area || '').trim();
  if (!source) return '';
  const map = [
    ['Центральный', 'ЦАО'],
    ['Северный', 'САО'],
    ['Северо-Восточный', 'СВАО'],
    ['Восточный', 'ВАО'],
    ['Юго-Восточный', 'ЮВАО'],
    ['Южный', 'ЮАО'],
    ['Юго-Западный', 'ЮЗАО'],
    ['Западный', 'ЗАО'],
    ['Северо-Западный', 'СЗАО'],
    ['Зеленоградский', 'ЗелАО'],
    ['Троицкий', 'ТАО'],
    ['Новомосковский', 'НАО']
  ];
  const found = map.find(([prefix]) => source.startsWith(prefix));
  return found ? found[1] : source;
}

function getVenueSizeLabel(venue) {
  const sport = getVenuePrimarySport(venue);
  if (sport === 'Футбол' || sport === 'Мини-футбол') return '28×40 м';
  if (sport === 'Баскетбол') return '28×15 м';
  if (sport === 'Волейбол' || sport === 'Пляжный волейбол') return '18×9 м';
  if (sport === 'Большой теннис' || sport === 'Теннис') return '23.77×10.97 м';
  if (sport === 'Хоккей') return '60×30 м';
  return '30×20 м';
}

function getVenueHeadPrice(venue) {
  if (!venue.isPaid || venue.pricePerHour <= 0) return 'Бесплатно';
  return `${Number(venue.pricePerHour).toLocaleString('ru-RU')} ₽/час`;
}

function getVenueMetroLineName(venue) {
  const line = getMetroLineByStation(venue.metro);
  return line ? line.name : 'Линия метро';
}

function getVenueScheduleText(venue) {
  const raw = String(venue.schedule || '').trim();
  if (!raw) return 'с 00:00 до 24:00';
  return `с ${raw.replace(/[–—-]/g, ' до ')}`;
}

function getVenueNearbyMetroStops(venue) {
  const current = String(venue.metro || '').trim();
  if (!current) return [];
  const line = getMetroLineByStation(current);
  if (!line || !Array.isArray(line.stations) || line.stations.length === 0) return [current];
  const index = line.stations.findIndex((station) => normalize(station) === normalize(current));
  if (index === -1) return [current];

  const nearby = [];
  if (index > 0) nearby.push(line.stations[index - 1]);
  nearby.push(line.stations[index]);
  if (index < line.stations.length - 1) nearby.push(line.stations[index + 1]);
  return nearby;
}

function renderVenueMetroStops(stops) {
  return stops.map((station, index) => {
    const line = getMetroLineByStation(station);
    const dotColor = line && line.color ? line.color : '#8b97b1';
    return `
      <span class="venue-sheet-metro-stop">
        ${index > 0 ? `<span class="venue-sheet-metro-dot" style="--metro-dot-color:${dotColor}"></span>` : ''}
        <span>${station}</span>
      </span>
    `;
  }).join('');
}

function renderVenueCardMetroStops(stops) {
  return stops.map((station) => {
    const line = getMetroLineByStation(station);
    const dotColor = line && line.color ? line.color : '#8b97b1';
    return `
      <span class="venue-card-metro-stop">
        <span class="venue-card-metro-dot" style="--metro-dot-color:${dotColor}"></span>
        <span>${station}</span>
      </span>
    `;
  }).join('');
}

function getVenueDescriptionText(venue) {
  const fullText = String(venue.description || '');
  const isExpanded = Boolean(state.venueDescExpanded[venue.id]);
  if (isExpanded || fullText.length <= 220) return { text: fullText, expandable: fullText.length > 220, isExpanded };
  return { text: `${fullText.slice(0, 220).trimEnd()}…`, expandable: true, isExpanded };
}

function getVenueGalleryPhotos(venue) {
  const custom = venueCustomGallery[venue.id];
  if (Array.isArray(custom) && custom.length > 0) return custom;
  return [venue.photo, venue.photo, venue.photo, venue.photo];
}

function renderVenueExpanded(venue) {
  const price = getVenuePriceBadge(venue);
  const amenities = getVenueAmenityEntries(venue);
  const descriptionState = getVenueDescriptionText(venue);
  const topAmenities = amenities.slice(0, 10);
  const metroStops = getVenueNearbyMetroStops(venue);
  const metroLine = getMetroLineByStation(venue.metro);
  const metroMarkerColor = metroLine && metroLine.color ? metroLine.color : '#8b97b1';
  const gallery = getVenueGalleryPhotos(venue);
  const activeGalleryIndex = Math.min(
    Math.max(0, Number(state.venueGalleryIndex[venue.id] || 0)),
    gallery.length - 1
  );
  const activePhoto = gallery[activeGalleryIndex] || venue.photo;
  const phoneHref = venue.phone ? `tel:${String(venue.phone).replace(/[^+\d]/g, '')}` : '#';
  const websiteHref = venue.website || '#';
  const websiteLabel = venue.website ? String(venue.website).replace(/^https?:\/\//i, '') : '—';
  const emailHref = venue.email ? `mailto:${venue.email}` : '#';
  return `
    <div class="venue-expanded" data-expanded-panel>
      <div class="venue-sheet-head">
        <h3 class="venue-sheet-title">${venue.fullName}</h3>
        <div class="venue-sheet-head-right">
          <button class="venue-sheet-close" type="button" data-venue-close="${venue.id}" aria-label="Свернуть карточку">
            <img src="./icons/krest.svg" alt="" aria-hidden="true">
          </button>
        </div>
      </div>

      <div class="venue-sheet-main">
        <div class="venue-sheet-left">
          <div class="venue-sheet-hero">
            <img src="${activePhoto}" alt="${escapeAttr(venue.fullName)}">
            <span class="venue-sheet-hero-price">${price.label}</span>
          </div>
          <div class="venue-sheet-gallery">
            ${gallery.slice(1, 4).map((src, index) => {
              const photoIndex = index + 1;
              const isActive = activeGalleryIndex === photoIndex;
              return `
                <button class="venue-sheet-thumb ${isActive ? 'is-active' : ''}" type="button" data-venue-thumb="${venue.id}" data-photo-index="${photoIndex}" aria-label="Фото ${photoIndex + 1}">
                  <img src="${src}" alt="">
                </button>
              `;
            }).join('')}
          </div>
        </div>

        <div class="venue-sheet-right">
          <div class="venue-sheet-topline">
            <div class="venue-sheet-sports">
              ${venue.sports.map((sport) => `<span class="venue-sheet-sport">${sport}</span>`).join('')}
            </div>
            <div class="venue-sheet-actions">
              <button class="venue-sheet-icon-btn" type="button" aria-label="Поделиться">
                <img class="venue-sheet-action-icon" src="./icons/share.svg?v=20260522-1" alt="" aria-hidden="true">
              </button>
              <button class="venue-sheet-icon-btn ${venue.isFavorite ? 'is-favorite-active' : ''}" type="button" data-venue-favorite="${venue.id}" aria-label="Избранное" aria-pressed="${venue.isFavorite ? 'true' : 'false'}">
                <img class="venue-sheet-action-icon" src="./icons/favorite.svg?v=20260522-1" alt="" aria-hidden="true">
              </button>
            </div>
          </div>

          <a class="venue-sheet-address" href="https://yandex.ru/maps/?text=${encodeURIComponent(venue.address)}" target="_blank" rel="noopener noreferrer">
            <span class="venue-sheet-inline-icon" aria-hidden="true"><img src="${getAmenityIconPath('location.svg')}" alt=""></span>
            <span>${venue.area}, ${venue.address}</span>
          </a>

          <div class="venue-sheet-subline venue-sheet-metro-line">
            <span class="venue-sheet-inline-icon is-metro-marker" aria-hidden="true">
              <span class="venue-sheet-metro-dot" style="--metro-dot-color:${metroMarkerColor}"></span>
            </span>
            <span class="venue-sheet-metro-stops">${renderVenueMetroStops(metroStops)}</span>
          </div>
          <div class="venue-sheet-subline">
            <span class="venue-sheet-inline-icon is-schedule" aria-hidden="true"><img src="./icons/schedule.svg" alt=""></span>
            <span>${getVenueScheduleText(venue)}</span>
          </div>

          <div class="venue-sheet-divider"></div>

          <h4 class="venue-sheet-section-title">Информация о площадке</h4>
          <div class="venue-sheet-facts">
            <div class="venue-sheet-fact"><span>Размер</span><strong>${getVenueSizeLabel(venue)}</strong></div>
            <div class="venue-sheet-fact"><span>Вместимость</span><strong>${venue.seats || '—'} игроков</strong></div>
            <div class="venue-sheet-fact"><span>Покрытие</span><strong>${venue.surface}</strong></div>
          </div>

          <h4 class="venue-sheet-section-title">Удобства</h4>
          <div class="venue-sheet-amenities-icons">
            ${topAmenities.map((item) => `
              <span class="venue-sheet-amenity-icon" data-tooltip="${escapeAttr(getAmenityTooltip(item))}" aria-label="${escapeAttr(getAmenityTooltip(item))}">
                <img src="${getAmenityIconPath(item.iconFile)}" alt="${escapeAttr(item.label)}">
              </span>
            `).join('')}
          </div>

          <h4 class="venue-sheet-section-title">Партнер площадки</h4>
          <div class="venue-sheet-partner-row">
            <a class="venue-sheet-partner-item" href="${phoneHref}">
              <span class="venue-sheet-partner-icon" aria-hidden="true"><img src="./icons/phone.svg" alt=""></span>
              <span>${venue.phone || '—'}</span>
            </a>
            <a class="venue-sheet-partner-item" href="${websiteHref}" target="_blank" rel="noopener noreferrer">
              <span class="venue-sheet-partner-icon" aria-hidden="true"><img src="./icons/website.svg" alt=""></span>
              <span>${websiteLabel}</span>
            </a>
            <a class="venue-sheet-partner-item" href="${emailHref}">
              <span class="venue-sheet-partner-icon" aria-hidden="true"><img src="./icons/email.svg" alt=""></span>
              <span>${venue.email || '—'}</span>
            </a>
          </div>

          <h4 class="venue-sheet-section-title">Описание</h4>
          <p class="venue-sheet-description">${descriptionState.text}</p>
          ${descriptionState.expandable ? `<button class="venue-sheet-more" type="button" data-venue-desc-toggle="${venue.id}">${descriptionState.isExpanded ? 'Скрыть' : 'Показать полностью'}</button>` : ''}

          <div class="venue-sheet-actions-row">
            <button class="venue-sheet-footer-btn" type="button">Построить маршрут</button>
            <button class="venue-sheet-footer-btn is-primary" type="button">Создать игру</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderVenueCards() {
  if (!venuesGrid) return;
  const filteredVenues = getFilteredVenues();
  if (state.selectedVenueId && !filteredVenues.some((venue) => venue.id === state.selectedVenueId)) {
    state.selectedVenueId = null;
  }
  if (venuesCount) venuesCount.textContent = String(filteredVenues.length);

  if (filteredVenues.length === 0) {
    venuesGrid.innerHTML = `
      <div class="venues-empty">
        <div class="venues-empty-text">По выбранным фильтрам ничего не найдено</div>
        <img class="venues-empty-art" src="./icons/gryst.svg" alt="Ничего не найдено">
      </div>
    `;
    return;
  }

  venuesGrid.innerHTML = filteredVenues.map((venue) => {
    const price = getVenuePriceBadge(venue);
    const allAmenities = getVenueAmenityEntries(venue)
      .filter((item) => item.key !== 'equipmentRentDescription')
    const amenities = allAmenities.slice(0, 5);
    const allSports = Array.isArray(venue.sports) ? venue.sports : [];
    const cardSports = allSports.length > 2 ? allSports.slice(0, 1) : allSports.slice(0, 2);
    const hiddenSportsCount = Math.max(0, allSports.length - cardSports.length);
    const hiddenAmenitiesCount = Math.max(0, allAmenities.length - amenities.length);
    const metroStops = getVenueNearbyMetroStops(venue);
    const shortArea = getAreaShortName(venue.area);
    const shortLocation = [shortArea, venue.district, venue.address].filter(Boolean).join(', ');
    const isExpanded = state.selectedVenueId === venue.id;
    if (isExpanded) {
      return `
        <article class="venue-card is-expanded" data-venue-card="${venue.id}">
          ${renderVenueExpanded(venue)}
        </article>
      `;
    }
    return `
      <article class="venue-card" data-venue-card="${venue.id}">
        <div class="venue-card-media">
          <img src="${venue.photo}" alt="${escapeAttr(venue.shortName)}">
          <div class="venue-card-badges">
            <span class="venue-pill ${price.className}">${price.label}</span>
          </div>
        </div>
        <div class="venue-card-body">
          <div class="venue-card-top-tags venue-card-sports">
            ${cardSports.map((sport) => `<span class="venue-sheet-sport">${sport}</span>`).join('')}
            ${hiddenSportsCount > 0 ? `<span class="venue-sheet-sport">+${hiddenSportsCount}</span>` : ''}
          </div>
          <h3 class="venue-card-name">${venue.shortName}</h3>
          <p class="venue-card-meta venue-card-location-row">
            <span class="venue-sheet-inline-icon" aria-hidden="true"><img src="${getAmenityIconPath('location.svg')}" alt=""></span>
            <span>${shortLocation}</span>
          </p>
          <p class="venue-card-meta venue-card-metro-row">
            <span class="venue-card-metro-stops">${renderVenueCardMetroStops(metroStops)}</span>
          </p>
          <div class="venue-card-amenities">
            ${amenities.map((item) => `
              <span class="venue-mini-amenity-circle" title="${escapeAttr(item.label)}" aria-label="${escapeAttr(item.label)}">
                <img class="venue-mini-amenity-icon" src="${getAmenityIconPath(item.iconFile)}" alt="${escapeAttr(item.label)}">
              </span>
            `).join('')}
            ${hiddenAmenitiesCount > 0 ? `<span class="venue-mini-amenity-more">+${hiddenAmenitiesCount}</span>` : ''}
          </div>
        </div>
      </article>
    `;
  }).join('');

  Array.from(venuesGrid.querySelectorAll('[data-venue-card]')).forEach((card) => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-venue-card') || '';
      const wasSelected = state.selectedVenueId === id;
      state.selectedVenueId = wasSelected ? null : id;
      render();
      if (!wasSelected) {
        requestAnimationFrame(() => {
          const expanded = venuesGrid.querySelector(`[data-venue-card="${id}"]`);
          if (!(expanded instanceof HTMLElement)) return;
          const rect = expanded.getBoundingClientRect();
          const currentY = window.scrollY || window.pageYOffset || 0;
          const topFrame = document.querySelector('.top-frame');
          const headerBottom = topFrame instanceof HTMLElement ? topFrame.getBoundingClientRect().bottom : 0;
          const visualGap = window.innerWidth <= 760 ? 10 : 16;
          const alignedTop = currentY + rect.top - (headerBottom + visualGap);
          window.scrollTo({
            top: Math.max(0, alignedTop),
            behavior: 'smooth'
          });
        });
      }
    });
  });
  Array.from(venuesGrid.querySelectorAll('[data-venue-close]')).forEach((button) => {
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      state.selectedVenueId = null;
      render();
    });
  });

  Array.from(venuesGrid.querySelectorAll('[data-expanded-panel]')).forEach((panel) => {
    panel.addEventListener('click', (event) => {
      event.stopPropagation();
    });
  });

  Array.from(venuesGrid.querySelectorAll('[data-venue-thumb]')).forEach((button) => {
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      const venueId = button.getAttribute('data-venue-thumb') || '';
      const nextIndex = Number(button.getAttribute('data-photo-index') || '0');
      if (!venueId || Number.isNaN(nextIndex)) return;
      state.venueGalleryIndex[venueId] = nextIndex;

      const expandedCard = button.closest('[data-venue-card]');
      if (!(expandedCard instanceof HTMLElement)) return;
      const heroImage = expandedCard.querySelector('.venue-sheet-hero img');
      const galleryButtons = expandedCard.querySelectorAll('[data-venue-thumb]');
      const venue = venues.find((item) => item.id === venueId);
      if (!venue || !(heroImage instanceof HTMLImageElement)) return;

      const gallery = getVenueGalleryPhotos(venue);
      const nextPhoto = gallery[nextIndex];
      if (nextPhoto) heroImage.src = nextPhoto;

      galleryButtons.forEach((thumbBtn) => {
        thumbBtn.classList.toggle('is-active', thumbBtn === button);
      });
    });
  });

  Array.from(venuesGrid.querySelectorAll('[data-venue-desc-toggle]')).forEach((button) => {
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      const venueId = button.getAttribute('data-venue-desc-toggle') || '';
      if (!venueId) return;
      state.venueDescExpanded[venueId] = !state.venueDescExpanded[venueId];
      renderVenueCards();
    });
  });

  Array.from(venuesGrid.querySelectorAll('[data-venue-favorite]')).forEach((button) => {
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      const venueId = button.getAttribute('data-venue-favorite') || '';
      if (!venueId) return;
      const venue = venues.find((item) => item.id === venueId);
      if (!venue) return;
      venue.isFavorite = !venue.isFavorite;
      button.classList.toggle('is-favorite-active', venue.isFavorite);
      button.setAttribute('aria-pressed', venue.isFavorite ? 'true' : 'false');
      button.classList.remove('is-bounce');
      // restart animation each click
      // eslint-disable-next-line no-unused-expressions
      button.offsetWidth;
      button.classList.add('is-bounce');
      setTimeout(() => button.classList.remove('is-bounce'), 340);
    });
  });

}

function trackGamesEvent(name, params = {}) {
  if (typeof window.gtag !== 'function') return;
  window.gtag('event', name, params);
}

const GAME_SPORT_OPTIONS = ['Футбол', 'Баскетбол', 'Волейбол', 'Теннис', 'Падел', 'Сквош', 'Хоккей', 'Плавание', 'Бег', 'Фитнес'];
const GAME_DATE_OPTIONS = [
  { value: 'today', label: 'Сегодня' },
  { value: 'tomorrow', label: 'Завтра' },
  { value: 'week', label: 'На этой неделе' },
  { value: 'custom', label: 'Выбрать дату' }
];
const GAME_TIME_OPTIONS = [
  { value: 'morning', label: 'Утро' },
  { value: 'day', label: 'День' },
  { value: 'evening', label: 'Вечер' },
  { value: 'night', label: 'Ночь' }
];
const GAME_LEVEL_OPTIONS = ['Новичок', 'Любитель', 'Средний', 'Продвинутый'];
const GAME_FORMAT_OPTIONS = ['1×1', '2×2', '3×3', '5×5', '7×7', '11×11', 'Тренировка', 'Турнир'];
const GAME_COST_OPTIONS = [
  { value: 'free', label: 'Бесплатно' },
  { value: '300', label: 'До 300 ₽' },
  { value: '500', label: 'До 500 ₽' },
  { value: '1000', label: 'До 1000 ₽' },
  { value: 'any', label: 'Любая' }
];
const GAME_FREE_SEATS_OPTIONS = [
  { value: '1', label: '1+ место' },
  { value: '3', label: '3+ места' },
  { value: '5', label: '5+ мест' }
];
const GAME_GENDER_OPTIONS = [
  { value: 'any', label: 'Любой' },
  { value: 'men', label: 'Мужчины' },
  { value: 'women', label: 'Женщины' },
  { value: 'mixed', label: 'Смешанная игра' }
];
const GAME_RADIUS_OPTIONS = [
  { value: '1', label: 'До 1 км' },
  { value: '3', label: 'До 3 км' },
  { value: '5', label: 'До 5 км' },
  { value: '10', label: 'До 10 км' }
];
const GAME_TYPE_OPTIONS = ['Обычная игра', 'Тренировка', 'Турнир'];
const GAME_SURFACE_OPTIONS = ['Искусственная трава', 'Паркет', 'Хард', 'Лед', 'Парк', 'Манеж'];

function toInputDateValue(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getDefaultCreateGameDraft() {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() + 1);
  return {
    sport: 'Футбол',
    date: toInputDateValue(startDate),
    startTime: '20:00',
    playersMax: '10',
    playersCurrent: '1',
    price: '500',
    paymentType: 'paid',
    level: 'Любитель',
    title: '',
    format: '5×5',
    duration: '90',
    locationName: 'SCORE Arena',
    address: 'Адрес уточняется',
    metro: 'Текстильщики',
    district: 'ЮВАО',
    genderType: 'any',
    gameType: 'Обычная игра',
    hasCoach: false,
    splitPayment: true,
    waitlist: true,
    inviteTeam: false,
    publishSearch: true,
    surface: 'Искусственная трава',
    amenities: 'Раздевалка, Освещение',
    description: 'Открытая игра в комфортном темпе. Приходите за 10 минут до старта.',
    organizerName: 'Организатор SCORE'
  };
}

function getSuggestedFormatBySport(sport) {
  if (sport === 'Баскетбол') return '3×3';
  if (sport === 'Волейбол') return '6×6';
  if (sport === 'Теннис') return '1×1';
  if (sport === 'Падел') return '2×2';
  if (sport === 'Сквош') return '1×1';
  if (sport === 'Хоккей') return '5×5';
  if (sport === 'Плавание') return 'Тренировка';
  if (sport === 'Бег') return 'Тренировка';
  if (sport === 'Фитнес') return 'Тренировка';
  return '5×5';
}

function parseCsvList(value) {
  return String(value || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function refreshModalBodyLock() {
  const hasGameDetailsOpen = Boolean(gameModal && !gameModal.hidden);
  const hasGameCreateOpen = Boolean(gameCreateModal && !gameCreateModal.hidden);
  const hasTeamRequestsOpen = Boolean(teamRequestsModal && !teamRequestsModal.hidden);
  const hasTeamEventOpen = Boolean(teamEventModal && !teamEventModal.hidden);
  const hasTeamCreateOpen = Boolean(teamCreateModal && !teamCreateModal.hidden);
  const hasProfileAvatarOpen = Boolean(profileAvatarModal && !profileAvatarModal.hidden);
  const hasProfileSportOpen = Boolean(profileSportModal && !profileSportModal.hidden);
  document.body.classList.toggle(
    'venue-modal-open',
    hasGameDetailsOpen || hasGameCreateOpen || hasTeamRequestsOpen || hasTeamEventOpen || hasTeamCreateOpen || hasProfileAvatarOpen || hasProfileSportOpen
  );
}

function syncCreateDraftFromForm() {
  if (!gameCreateContent || !createGameState.draft) return;
  const form = gameCreateContent.querySelector('#game-create-form');
  if (!(form instanceof HTMLFormElement)) return;
  const formData = new FormData(form);

  if (formData.has('sport')) {
    createGameState.draft.sport = String(formData.get('sport') || '').trim();
    if (!formData.has('format')) createGameState.draft.format = getSuggestedFormatBySport(createGameState.draft.sport);
  }
  if (formData.has('gameType')) createGameState.draft.gameType = String(formData.get('gameType') || '').trim();
  if (formData.has('format')) createGameState.draft.format = String(formData.get('format') || '').trim();
  if (formData.has('venuePreset')) {
    const preset = String(formData.get('venuePreset') || '');
    if (preset === 'run') {
      createGameState.draft.locationName = 'SCORE Run Point';
      createGameState.draft.metro = 'Сокольники';
      createGameState.draft.district = 'Сокольники';
      createGameState.draft.address = 'Сокольническая площадь';
    } else if (preset === 'indoor') {
      createGameState.draft.locationName = 'SCORE Indoor Field';
      createGameState.draft.metro = 'Черкизовская';
      createGameState.draft.district = 'Преображенское';
      createGameState.draft.address = 'Окружной проезд, 7';
    } else {
      createGameState.draft.locationName = 'Площадка уточняется';
      createGameState.draft.metro = 'Уточнить позже';
      createGameState.draft.district = 'Уточнить позже';
      createGameState.draft.address = 'Адрес уточняется';
    }
  }
  if (formData.has('date')) createGameState.draft.date = String(formData.get('date') || '').trim();
  if (formData.has('startTime')) createGameState.draft.startTime = String(formData.get('startTime') || '').trim();
  if (formData.has('duration')) createGameState.draft.duration = String(formData.get('duration') || '').trim();
  if (formData.has('playersMax')) createGameState.draft.playersMax = String(formData.get('playersMax') || '').trim();
  if (formData.has('playersCurrent')) createGameState.draft.playersCurrent = String(formData.get('playersCurrent') || '').trim();
  if (formData.has('price')) createGameState.draft.price = String(formData.get('price') || '').trim();
  if (formData.has('paymentType')) createGameState.draft.paymentType = String(formData.get('paymentType') || '').trim();
  if (formData.has('level')) createGameState.draft.level = String(formData.get('level') || '').trim();
  if (formData.has('title')) createGameState.draft.title = String(formData.get('title') || '').trim();
  if (formData.has('description')) createGameState.draft.description = String(formData.get('description') || '').trim();
  if (form.querySelector('[name="hasCoach"]')) createGameState.draft.hasCoach = formData.get('hasCoach') === 'on';
  if (form.querySelector('[name="splitPayment"]')) createGameState.draft.splitPayment = formData.get('splitPayment') === 'on';
  if (form.querySelector('[name="waitlist"]')) createGameState.draft.waitlist = formData.get('waitlist') === 'on';
  if (form.querySelector('[name="inviteTeam"]')) createGameState.draft.inviteTeam = formData.get('inviteTeam') === 'on';
  if (form.querySelector('[name="publishSearch"]')) createGameState.draft.publishSearch = formData.get('publishSearch') === 'on';
}

function getCreateGameStepErrors(step, draft) {
  const errors = [];
  if (step === 1) {
    if (!draft.sport) errors.push('Выберите вид спорта');
    if (!draft.gameType) errors.push('Выберите тип игры');
    if (!draft.format) errors.push('Выберите формат');
  }
  if (step === 2) {
    if (!draft.locationName) errors.push('Выберите площадку');
    if (!draft.date) errors.push('Укажите дату');
    if (!draft.startTime) errors.push('Укажите время старта');
  }
  if (step === 3) {
    if (!Number.isFinite(Number(draft.playersMax)) || Number(draft.playersMax) < 2) errors.push('Количество мест должно быть минимум 2');
    if (!Number.isFinite(Number(draft.playersCurrent)) || Number(draft.playersCurrent) < 1) errors.push('Укажите, сколько игроков уже есть');
    if (Number(draft.playersCurrent) > Number(draft.playersMax)) errors.push('Игроков уже есть больше, чем мест');
    if (!draft.level) errors.push('Укажите уровень игры');
  }
  if (step === 4 && draft.paymentType !== 'free' && (!Number.isFinite(Number(draft.price)) || Number(draft.price) < 0)) errors.push('Укажите корректную стоимость');
  return errors;
}

function buildGameFromDraft(draft) {
  const startTime = draft.startTime || '20:00';
  const duration = Math.max(30, Number(draft.duration) || 90);
  const playersMax = Math.max(2, Number(draft.playersMax) || 10);
  const playersCurrent = Math.min(playersMax, Math.max(1, Number(draft.playersCurrent) || 1));
  const organizerName = draft.organizerName || 'Организатор SCORE';
  const composedTitle = draft.title || `${draft.sport} · ${getSuggestedFormatBySport(draft.sport)} в ${startTime}`;
  const draftStart = new Date(`${draft.date || toInputDateValue(new Date())}T${startTime}:00`);
  const startDateTime = Number.isFinite(draftStart.getTime()) ? draftStart.toISOString() : addDaysAndTime(0, startTime);
  const price = draft.paymentType === 'free' ? 0 : Math.max(0, Number(draft.price) || 0);
  const parsedAmenities = parseCsvList(draft.amenities);
  const seededPlayers = [organizerName, 'Антон Р.', 'Олег С.', 'Павел Д.', 'Егор К.', 'Влад Н.', 'Денис С.', 'Илья Г.'].slice(0, playersCurrent);

  return {
    id: `g-${Date.now()}`,
    title: composedTitle,
    description: draft.description,
    sport: draft.sport || 'Футбол',
    format: draft.format || getSuggestedFormatBySport(draft.sport || 'Футбол'),
    date: startDateTime.slice(0, 10),
    startTime,
    duration,
    locationName: draft.locationName || 'SCORE площадка',
    address: draft.address || 'Адрес уточняется',
    metro: draft.metro,
    district: draft.district,
    price,
    level: draft.level || 'Любитель',
    organizerName,
    organizerRating: 5,
    organizerGames: 1,
    playersCurrent,
    playersMax,
    players: makePlayers(seededPlayers, organizerName),
    neededRoles: [`${Math.max(playersMax - playersCurrent, 0)} игроков`],
    genderType: draft.genderType || 'any',
    gameType: draft.gameType || 'Обычная игра',
    status: 'Набор открыт',
    hasCoach: Boolean(draft.hasCoach),
    isNew: true,
    isFavorite: false,
    isFree: price === 0,
    distanceKm: Number((Math.random() * 6 + 1).toFixed(1)),
    image: getGamePhotoBySport(draft.sport || 'Футбол'),
    amenities: parsedAmenities.length > 0 ? parsedAmenities : ['Освещение'],
    venueRating: 4.8,
    surface: draft.surface || 'Искусственная трава',
    startDateTime,
    joinRequested: false
  };
}

function getCreateGameReviewMarkup(draft) {
  const priceText = draft.paymentType === 'free' || Number(draft.price) <= 0 ? 'Бесплатно' : `${Number(draft.price) || 0} ₽`;
  return `
    <div class="game-create-review">
      <div><span>Спорт</span><strong>${escapeHtml(draft.sport)}</strong></div>
      <div><span>Формат</span><strong>${escapeHtml(draft.format || getSuggestedFormatBySport(draft.sport))}</strong></div>
      <div><span>Дата и время</span><strong>${escapeHtml(draft.date)} · ${escapeHtml(draft.startTime)}</strong></div>
      <div><span>Место</span><strong>${escapeHtml(draft.locationName)}</strong></div>
      <div><span>Уровень</span><strong>${escapeHtml(draft.level)}</strong></div>
      <div><span>Цена</span><strong>${escapeHtml(priceText)}/игрок</strong></div>
      <div><span>Места</span><strong>${escapeHtml(String(Math.max(0, Number(draft.playersMax) - Number(draft.playersCurrent || 0))))} свободных</strong></div>
    </div>
  `;
}

function renderCreateGameFields(step, draft) {
  const sportItems = ['Футбол', 'Баскетбол', 'Волейбол', 'Теннис', 'Падел', 'Хоккей', 'Сквош', 'Бег'];
  const formatItems = ['Тренировка', '5×5', '6×6', 'Группа'];
  const venues = [
    { value: 'run', title: 'SCORE Run Point', meta: 'м. Сокольники · бесплатно' },
    { value: 'indoor', title: 'SCORE Indoor Field', meta: 'м. Черкизовская · 4800 ₽/ч' },
    { value: 'later', title: 'Уточню позже', meta: 'Место можно добавить после публикации' }
  ];
  const durations = ['60', '75', '90', '120'];

  const choice = (name, value, selected, title, meta = '') => `
    <label class="game-create-choice ${selected ? 'is-selected' : ''}">
      <input type="radio" name="${escapeAttr(name)}" value="${escapeAttr(value)}" ${selected ? 'checked' : ''}>
      <strong>${escapeHtml(title)}</strong>
      ${meta ? `<span>${escapeHtml(meta)}</span>` : ''}
    </label>
  `;

  if (step === 1) {
    return `
      <div class="game-create-step">
        <h4>Вид спорта</h4>
        <div class="game-create-choice-grid is-sports">
          ${sportItems.map((item) => choice('sport', item, draft.sport === item, item)).join('')}
        </div>
        <h4>Тип игры</h4>
        <div class="game-create-choice-grid">
          ${choice('gameType', 'Обычная игра', draft.gameType === 'Обычная игра', 'Открытая игра', 'Любой может присоединиться')}
          ${choice('gameType', 'Для команды', draft.gameType === 'Для команды', 'Игра для команды', 'Только для членов команды')}
          ${choice('gameType', 'Тренировка', draft.gameType === 'Тренировка', 'Тренировка', 'С тренером или самостоятельно')}
          ${choice('gameType', 'Поиск соперника', draft.gameType === 'Поиск соперника', 'Поиск соперника', 'Вызов другой команды')}
        </div>
        <h4>Формат</h4>
        <div class="game-create-inline-options">
          ${formatItems.map((item) => choice('format', item, draft.format === item, item)).join('')}
        </div>
      </div>
    `;
  }

  if (step === 2) {
    return `
      <div class="game-create-step">
        <h4>Площадка</h4>
        <div class="game-create-choice-list">
          ${venues.map((item) => {
            const selected = item.title === draft.locationName || (item.value === 'later' && draft.locationName === 'Площадка уточняется');
            return choice('venuePreset', item.value, selected, item.title, item.meta);
          }).join('')}
        </div>
        <div class="game-create-grid">
          <div class="game-create-field"><label>Дата<input name="date" type="date" value="${escapeAttr(draft.date)}"></label></div>
          <div class="game-create-field"><label>Время начала<input name="startTime" type="time" value="${escapeAttr(draft.startTime)}"></label></div>
        </div>
        <h4>Длительность</h4>
        <div class="game-create-inline-options">
          ${durations.map((item) => choice('duration', item, String(draft.duration) === item, `${item} мин`)).join('')}
        </div>
      </div>
    `;
  }

  if (step === 3) {
    return `
      <div class="game-create-step">
        <div class="game-create-grid">
          <div class="game-create-field"><label>Всего игроков<input name="playersMax" type="number" min="2" max="40" value="${escapeAttr(draft.playersMax)}"></label></div>
          <div class="game-create-field"><label>Уже есть<input name="playersCurrent" type="number" min="1" max="40" value="${escapeAttr(draft.playersCurrent)}"></label></div>
        </div>
        <h4>Уровень игры</h4>
        <div class="game-create-choice-grid">
          ${GAME_LEVEL_OPTIONS.map((item) => choice('level', item, draft.level === item, item, item === 'Новичок' ? 'Первый круг' : item === 'Любитель' ? 'Игра для удовольствия' : item === 'Средний' ? 'Тактика и темп' : 'Соревновательный уровень')).join('')}
        </div>
        <div class="game-create-toggle-row">
          <label><input type="checkbox" name="hasCoach" ${draft.hasCoach ? 'checked' : ''}> Нужен тренер</label>
          <label><input type="checkbox" name="waitlist" ${draft.waitlist ? 'checked' : ''}> Лист ожидания</label>
        </div>
      </div>
    `;
  }

  if (step === 4) {
    return `
      <div class="game-create-step">
        <h4>Стоимость</h4>
        <div class="game-create-inline-options">
          ${choice('paymentType', 'free', draft.paymentType === 'free', 'Бесплатно')}
          ${choice('paymentType', 'paid', draft.paymentType !== 'free', 'Платная игра')}
        </div>
        <div class="game-create-field is-full"><label>Цена за игрока, ₽<input name="price" type="number" min="0" step="50" value="${escapeAttr(draft.price)}"></label></div>
        <div class="game-create-toggle-list">
          <label><input type="checkbox" name="splitPayment" ${draft.splitPayment ? 'checked' : ''}> Сплит-оплата между игроками</label>
          <label><input type="checkbox" name="inviteTeam" ${draft.inviteTeam ? 'checked' : ''}> Пригласить мою команду</label>
          <label><input type="checkbox" name="waitlist" ${draft.waitlist ? 'checked' : ''}> Разрешить лист ожидания</label>
        </div>
        <div class="game-create-field is-full"><label>Комментарий организатора<textarea name="description" placeholder="Расскажите игрокам, что их ждет...">${escapeHtml(draft.description)}</textarea></label></div>
      </div>
    `;
  }

  return `
    <div class="game-create-step">
      <div class="game-create-field is-full"><label>Название игры<input name="title" type="text" maxlength="90" value="${escapeAttr(draft.title)}" placeholder="Например: Вечерняя игра по футболу"></label></div>
      ${getCreateGameReviewMarkup(draft)}
      <div class="game-create-toggle-list">
        <label><input type="checkbox" name="publishSearch" ${draft.publishSearch ? 'checked' : ''}> Показать в общем поиске</label>
        <label><input type="checkbox" name="inviteTeam" ${draft.inviteTeam ? 'checked' : ''}> Отправить приглашение команде</label>
        <label><input type="checkbox" name="waitlist" ${draft.waitlist ? 'checked' : ''}> Разрешить лист ожидания</label>
      </div>
    </div>
  `;
}

function renderCreateGameModal() {
  if (!gameCreateContent || !createGameState.draft) return;
  const step = createGameState.step;
  const draft = createGameState.draft;
  const nextLabel = step < 5 ? 'Далее' : 'Опубликовать игру';
  const subtitles = ['Тип игры', 'Место и время', 'Состав', 'Оплата', 'Публикация'];

  gameCreateContent.innerHTML = `
    <div class="game-create-header">
      <h3 id="game-create-title" class="game-create-title">Создание игры</h3>
      <p class="game-create-subtitle">${subtitles[step - 1]}</p>
      <div class="game-create-progress" aria-hidden="true">
        ${subtitles.map((_, index) => `<span class="game-create-progress-step ${step > index + 1 ? 'is-complete' : step === index + 1 ? 'is-active' : ''}"></span>`).join('')}
      </div>
    </div>
    ${createGameState.error ? `<div class="game-create-error" role="alert">${escapeHtml(createGameState.error)}</div>` : ''}
    <form id="game-create-form" novalidate>
      ${renderCreateGameFields(step, draft)}
    </form>
    <div class="game-create-actions">
      <button class="game-create-btn-secondary" type="button" data-create-action="cancel">Отмена</button>
      <div class="game-create-actions-right">
        <button class="game-create-btn-secondary" type="button" data-create-action="back" ${step === 1 ? 'disabled' : ''}>Назад</button>
        <button class="game-create-btn-primary" type="button" data-create-action="${step < 5 ? 'next' : 'submit'}" ${createGameState.saving ? 'disabled' : ''}>${createGameState.saving ? 'Сохраняем...' : nextLabel}</button>
      </div>
    </div>
  `;

  const form = gameCreateContent.querySelector('#game-create-form');
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (createGameState.step < 3) handleCreateGameNext();
      else handleCreateGameSubmit();
    });
    form.addEventListener('change', (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      if (target.matches('input[type="text"], input[type="number"], input[type="date"], input[type="time"], textarea')) return;
      syncCreateDraftFromForm();
      renderCreateGameModal();
    });
  }
}

function openCreateGameModal() {
  if (!gameCreateModal) return;
  if (gameModal && !gameModal.hidden) closeGameDetails();
  createGameState.step = 1;
  createGameState.saving = false;
  createGameState.error = '';
  createGameState.draft = getDefaultCreateGameDraft();
  renderCreateGameModal();
  gameCreateModal.hidden = false;
  gameCreateModal.setAttribute('aria-hidden', 'false');
  refreshModalBodyLock();
  trackGamesEvent('create_game_start');
}

function closeCreateGameModal() {
  if (!gameCreateModal) return;
  gameCreateModal.hidden = true;
  gameCreateModal.setAttribute('aria-hidden', 'true');
  createGameState.error = '';
  createGameState.saving = false;
  createGameState.draft = null;
  refreshModalBodyLock();
}

function handleCreateGameBack() {
  if (createGameState.step <= 1) return;
  syncCreateDraftFromForm();
  createGameState.error = '';
  createGameState.step -= 1;
  renderCreateGameModal();
}

function handleCreateGameNext() {
  syncCreateDraftFromForm();
  const errors = getCreateGameStepErrors(createGameState.step, createGameState.draft || {});
  if (errors.length > 0) {
    createGameState.error = errors[0];
    renderCreateGameModal();
    return;
  }
  createGameState.error = '';
  createGameState.step = Math.min(5, createGameState.step + 1);
  renderCreateGameModal();
}

function handleCreateGameSubmit() {
  syncCreateDraftFromForm();
  const draft = createGameState.draft || getDefaultCreateGameDraft();
  const allErrors = [1, 2, 3, 4].flatMap((step) => getCreateGameStepErrors(step, draft));
  if (allErrors.length > 0) {
    createGameState.error = allErrors[0];
    renderCreateGameModal();
    return;
  }
  createGameState.saving = true;
  createGameState.error = '';
  renderCreateGameModal();

  const createdGame = buildGameFromDraft(draft);
  gamesState.items = [createdGame, ...gamesState.items];
  gamesState.loaded = true;
  gamesState.error = '';
  createGameState.saving = false;
  closeCreateGameModal();
  rerenderGames();
  showGamesToast('Игра создана и опубликована');
  openGameDetails(createdGame.id);
  trackGamesEvent('create_game_submit', { game_id: createdGame.id, sport: createdGame.sport });
}

function addDaysAndTime(days, time) {
  const now = new Date();
  const [h, m] = String(time).split(':').map((item) => Number(item) || 0);
  const result = new Date(now.getFullYear(), now.getMonth(), now.getDate() + days, h, m, 0, 0);
  return result.toISOString();
}

function makePlayers(names, organizerName) {
  return names.map((name) => ({
    name,
    avatar: '',
    isOrganizer: name === organizerName
  }));
}

function getGameFallbackImage(sport) {
  const normalizedSport = normalize(sport || '');
  const hash = Array.from(normalizedSport).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const color = GAME_FALLBACK_COLORS[hash % GAME_FALLBACK_COLORS.length] || '#3A85FD';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 640"><rect width="1200" height="640" fill="${color}"/></svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function getGamePhotoBySport(sport) {
  const key = normalize(sport || '');
  if (GAME_SPORT_PHOTOS[key]) return GAME_SPORT_PHOTOS[key];
  if (key.includes('футбол')) return GAME_SPORT_PHOTOS['футбол'];
  if (key.includes('баскет')) return GAME_SPORT_PHOTOS['баскетбол'];
  if (key.includes('волей') || key.includes('волле')) return GAME_SPORT_PHOTOS['волейбол'];
  if (key.includes('теннис')) return GAME_SPORT_PHOTOS['теннис'];
  if (key.includes('падел')) return GAME_SPORT_PHOTOS['падел'];
  if (key.includes('хоккей')) return GAME_SPORT_PHOTOS['хоккей'];
  return getGameFallbackImage(sport);
}

function buildFixtureGames() {
  return [
    {
      id: 'g-1',
      title: 'Вечерняя игра по футболу 5×5',
      description: 'Легкая вечерняя игра на открытом поле. Играем в динамичном темпе, без жесткого контакта.',
      sport: 'Футбол',
      format: '5×5',
      date: '',
      startTime: '20:30',
      duration: 90,
      locationName: 'SCORE Arena Юго-Восток',
      address: 'Юго-Восточный проспект, 46/15',
      metro: 'Волгоградский проспект',
      district: 'Текстильщики',
      price: 500,
      level: 'Любитель',
      organizerName: 'Илья В.',
      organizerRating: 4.8,
      organizerGames: 34,
      playersCurrent: 6,
      playersMax: 10,
      players: makePlayers(['Илья В.', 'Рома К.', 'Дима П.', 'Сергей Л.', 'Игорь М.', 'Никита С.'], 'Илья В.'),
      neededRoles: ['Вратарь', '2 полевых игрока'],
      genderType: 'mixed',
      gameType: 'Обычная игра',
      status: '',
      hasCoach: false,
      isNew: true,
      isFavorite: false,
      isFree: false,
      distanceKm: 3.2,
      image: './icons/map-area-base.jpg',
      amenities: ['Раздевалка', 'Освещение', 'Парковка'],
      venueRating: 4.7,
      surface: 'Искусственная трава'
    },
    {
      id: 'g-2',
      title: 'Тренировка по футболу с тренером',
      description: 'Техника, координация и игровые упражнения в малых группах.',
      sport: 'Футбол',
      format: 'Тренировка',
      date: '',
      startTime: '19:00',
      duration: 75,
      locationName: 'SCORE Football Lab',
      address: '1-я Дубровская улица, 15',
      metro: 'Дубровка',
      district: 'Южнопортовый',
      price: 900,
      level: 'Средний',
      organizerName: 'Тренер Максим',
      organizerRating: 4.9,
      organizerGames: 112,
      playersCurrent: 9,
      playersMax: 12,
      players: makePlayers(['Тренер Максим', 'Андрей Р.', 'Олег С.', 'Павел Д.', 'Глеб А.', 'Матвей П.', 'Кирилл И.', 'Вова Т.', 'Лев Г.'], 'Тренер Максим'),
      neededRoles: ['3 игрока'],
      genderType: 'any',
      gameType: 'Тренировка',
      status: 'Игра идет',
      hasCoach: true,
      isNew: true,
      isFavorite: false,
      isFree: false,
      distanceKm: 4.8,
      image: './icons/map-area-base.jpg',
      amenities: ['Душ', 'Раздевалка', 'Медпункт'],
      venueRating: 4.9,
      surface: 'Паркет'
    },
    {
      id: 'g-3',
      title: 'Баскетбол 3×3 вечером',
      description: 'Уличный формат, быстрые смены, игра до 21 очка.',
      sport: 'Баскетбол',
      format: '3×3',
      date: '',
      startTime: '21:00',
      duration: 60,
      locationName: 'SCORE Court Park',
      address: '2-я Бауманская улица, 9',
      metro: 'Бауманская',
      district: 'Басманный',
      price: 300,
      level: 'Любитель',
      organizerName: 'Алексей Н.',
      organizerRating: 4.6,
      organizerGames: 21,
      playersCurrent: 5,
      playersMax: 6,
      players: makePlayers(['Алексей Н.', 'Руслан К.', 'Егор П.', 'Стас Л.', 'Илья Т.'], 'Алексей Н.'),
      neededRoles: ['1 игрок'],
      genderType: 'men',
      gameType: 'Обычная игра',
      status: 'Отменена',
      hasCoach: false,
      isNew: false,
      isFavorite: false,
      isFree: false,
      distanceKm: 2.3,
      image: './icons/map-area-base.jpg',
      amenities: ['Освещение', 'Вода', 'Парковка'],
      venueRating: 4.5,
      surface: 'Резиновое покрытие'
    },
    {
      id: 'g-4',
      title: 'Падел-матч для новичков',
      description: 'Дружеский матч с разбором базовых тактических решений.',
      sport: 'Падел',
      format: '2×2',
      date: '',
      startTime: '10:30',
      duration: 90,
      locationName: 'SCORE Padel Hub',
      address: 'Ленинградский проспект, 39',
      metro: 'Динамо',
      district: 'Аэропорт',
      price: 0,
      level: 'Новичок',
      organizerName: 'Мария С.',
      organizerRating: 4.7,
      organizerGames: 18,
      playersCurrent: 3,
      playersMax: 4,
      players: makePlayers(['Мария С.', 'Анна К.', 'Ирина Л.'], 'Мария С.'),
      neededRoles: ['1 игрок'],
      genderType: 'mixed',
      gameType: 'Обычная игра',
      status: '',
      hasCoach: false,
      isNew: true,
      isFavorite: false,
      isFree: true,
      distanceKm: 7.5,
      image: './icons/map-area-base.jpg',
      amenities: ['Раздевалка', 'Душ', 'Кафе'],
      venueRating: 4.8,
      surface: 'Падел-корт'
    },
    {
      id: 'g-5',
      title: 'Волейбол в зале',
      description: 'Играем до двух побед, смены по кругу.',
      sport: 'Волейбол',
      format: '6×6',
      date: '',
      startTime: '18:00',
      duration: 120,
      locationName: 'SCORE Hall Center',
      address: 'Шоссе Энтузиастов, 17',
      metro: 'Авиамоторная',
      district: 'Лефортово',
      price: 450,
      level: 'Средний',
      organizerName: 'Костя Ф.',
      organizerRating: 4.8,
      organizerGames: 40,
      playersCurrent: 12,
      playersMax: 12,
      players: makePlayers(['Костя Ф.', 'Игорь М.', 'Слава К.', 'Тимур В.', 'Марк Р.', 'Лев Б.', 'Роман К.', 'Даня Л.', 'Гриша С.', 'Кирилл П.', 'Семен В.', 'Петр Г.'], 'Костя Ф.'),
      neededRoles: [],
      genderType: 'any',
      gameType: 'Обычная игра',
      status: '',
      hasCoach: false,
      isNew: false,
      isFavorite: true,
      isFree: false,
      distanceKm: 1.6,
      image: './icons/map-area-base.jpg',
      amenities: ['Душ', 'Раздевалка', 'Медпункт'],
      venueRating: 4.6,
      surface: 'Паркет'
    },
    {
      id: 'g-6',
      title: 'Теннисная игра 1×1',
      description: 'Свободный спарринг на крытом корте.',
      sport: 'Теннис',
      format: '1×1',
      date: '',
      startTime: '08:30',
      duration: 60,
      locationName: 'SCORE Tennis Point',
      address: 'Проспект Мира, 101',
      metro: 'Алексеевская',
      district: 'Останкинский',
      price: 1000,
      level: 'Продвинутый',
      organizerName: 'Евгений П.',
      organizerRating: 4.9,
      organizerGames: 57,
      playersCurrent: 1,
      playersMax: 2,
      players: makePlayers(['Евгений П.'], 'Евгений П.'),
      neededRoles: ['1 соперник'],
      genderType: 'any',
      gameType: 'Обычная игра',
      status: '',
      hasCoach: false,
      isNew: false,
      isFavorite: false,
      isFree: false,
      distanceKm: 8.1,
      image: './icons/map-area-base.jpg',
      amenities: ['Кафе', 'Раздевалка'],
      venueRating: 4.9,
      surface: 'Хард'
    },
    {
      id: 'g-7',
      title: 'Сквош после работы',
      description: 'Короткие интенсивные геймы для поддержания тонуса.',
      sport: 'Сквош',
      format: '1×1',
      date: '',
      startTime: '20:00',
      duration: 60,
      locationName: 'SCORE Squash Club',
      address: 'Кутузовский проспект, 32',
      metro: 'Кутузовская',
      district: 'Дорогомилово',
      price: 700,
      level: 'Средний',
      organizerName: 'Николай Ж.',
      organizerRating: 4.5,
      organizerGames: 15,
      playersCurrent: 2,
      playersMax: 2,
      players: makePlayers(['Николай Ж.', 'Ильдар Ш.'], 'Николай Ж.'),
      neededRoles: [],
      genderType: 'any',
      gameType: 'Обычная игра',
      status: '',
      hasCoach: false,
      isNew: false,
      isFavorite: false,
      isFree: false,
      distanceKm: 5.2,
      image: './icons/map-area-base.jpg',
      amenities: ['Раздевалка', 'Душ'],
      venueRating: 4.4,
      surface: 'Сквош-корт'
    },
    {
      id: 'g-8',
      title: 'Хоккейная тренировка',
      description: 'Техника катания, передачи и игра в большинстве.',
      sport: 'Хоккей',
      format: 'Тренировка',
      date: '',
      startTime: '22:00',
      duration: 90,
      locationName: 'SCORE Ice Arena',
      address: 'Тушинская улица, 8',
      metro: 'Тушинская',
      district: 'Покровское-Стрешнево',
      price: 1200,
      level: 'Средний',
      organizerName: 'Тренер Артем',
      organizerRating: 4.9,
      organizerGames: 80,
      playersCurrent: 14,
      playersMax: 18,
      players: makePlayers(['Тренер Артем', 'Олег В.', 'Илья Н.', 'Саша П.', 'Макс К.', 'Леонид С.', 'Сергей Р.', 'Павел М.', 'Денис Щ.', 'Артур Б.', 'Роман Ц.', 'Егор Л.', 'Георгий П.', 'Тимофей М.'], 'Тренер Артем'),
      neededRoles: ['Вратарь', '3 полевых игрока'],
      genderType: 'men',
      gameType: 'Тренировка',
      status: '',
      hasCoach: true,
      isNew: false,
      isFavorite: false,
      isFree: false,
      distanceKm: 9.4,
      image: './icons/map-area-base.jpg',
      amenities: ['Прокат', 'Кафе', 'Медпункт'],
      venueRating: 4.8,
      surface: 'Лед'
    },
    {
      id: 'g-9',
      title: 'Беговая тренировка',
      description: 'Интервалы + заминка в парке, подходит для разных темпов.',
      sport: 'Бег',
      format: 'Тренировка',
      date: '',
      startTime: '07:00',
      duration: 60,
      locationName: 'SCORE Run Point',
      address: 'Парк Сокольники, центральный вход',
      metro: 'Сокольники',
      district: 'Сокольники',
      price: 0,
      level: 'Любитель',
      organizerName: 'Дарья А.',
      organizerRating: 4.8,
      organizerGames: 63,
      playersCurrent: 11,
      playersMax: 14,
      players: makePlayers(['Дарья А.', 'Юлия К.', 'Света В.', 'Лена Н.', 'Алина П.', 'Марина Б.', 'Ирина Р.', 'Катя М.', 'Надя Т.', 'Ольга С.', 'Вероника Д.'], 'Дарья А.'),
      neededRoles: ['3 участника'],
      genderType: 'mixed',
      gameType: 'Тренировка',
      status: '',
      hasCoach: true,
      isNew: true,
      isFavorite: false,
      isFree: true,
      distanceKm: 2.9,
      image: './icons/map-area-base.jpg',
      amenities: ['Туалет', 'Вода'],
      venueRating: 4.7,
      surface: 'Парк'
    },
    {
      id: 'g-10',
      title: 'Футзал 7×7',
      description: 'Игра в выходные, комфортный темп, дружелюбная атмосфера.',
      sport: 'Футбол',
      format: '7×7',
      date: '',
      startTime: '14:30',
      duration: 90,
      locationName: 'SCORE Indoor Field',
      address: 'Окружной проезд, 2',
      metro: 'Черкизовская',
      district: 'Преображенское',
      price: 600,
      level: 'Средний',
      organizerName: 'Антон К.',
      organizerRating: 4.7,
      organizerGames: 29,
      playersCurrent: 10,
      playersMax: 14,
      players: makePlayers(['Антон К.', 'Влад И.', 'Артем С.', 'Никита К.', 'Давид Н.', 'Станислав Р.', 'Вадим Т.', 'Миша Г.', 'Андрей Л.', 'Данил К.'], 'Антон К.'),
      neededRoles: ['4 игрока'],
      genderType: 'any',
      gameType: 'Обычная игра',
      status: '',
      hasCoach: false,
      isNew: false,
      isFavorite: false,
      isFree: false,
      distanceKm: 6.6,
      image: './icons/map-area-base.jpg',
      amenities: ['Раздевалка', 'Освещение', 'Кафе'],
      venueRating: 4.6,
      surface: 'Искусственная трава'
    }
  ].map((game, index) => {
    const dayOffsets = [0, 0, 1, 2, 3, 1, 2, -1, 0, 5];
    const startDateTime = addDaysAndTime(dayOffsets[index] || 0, game.startTime);
    const date = new Date(startDateTime).toISOString().slice(0, 10);
    return {
      ...game,
      image: game.image && game.image !== './icons/map-area-base.jpg' ? game.image : getGamePhotoBySport(game.sport),
      date,
      startDateTime
    };
  });
}

const FIXTURE_GAMES = buildFixtureGames();

function getGameStartMs(game) {
  return Date.parse(game.startDateTime);
}

function getGameEndMs(game) {
  const startMs = getGameStartMs(game);
  if (!Number.isFinite(startMs)) return Number.NaN;
  return startMs + (Number(game.duration) || 0) * 60 * 1000;
}

function getGameRemainingSeats(game) {
  return Math.max(0, (Number(game.playersMax) || 0) - (Number(game.playersCurrent) || 0));
}

function resolveGameStatus(game) {
  const forced = normalize(game.status);
  if (forced.includes('набор')) return 'open';
  if (forced.includes('почти')) return 'almost';
  if (forced.includes('собрана')) return 'full';
  if (forced.includes('идет') || forced.includes('идёт') || forced.includes('live')) return 'live';
  if (forced.includes('заверш')) return 'finished';
  if (forced.includes('отмен')) return 'cancelled';
  const nowMs = Date.now();
  const startMs = getGameStartMs(game);
  const endMs = getGameEndMs(game);
  if (Number.isFinite(startMs) && Number.isFinite(endMs)) {
    if (nowMs >= endMs) return 'finished';
    if (nowMs >= startMs && nowMs < endMs) return 'live';
  }
  if (game.playersCurrent >= game.playersMax) return 'full';
  if (getGameRemainingSeats(game) <= 2) return 'almost';
  return 'open';
}

function getGameStatusLabel(status) {
  if (status === 'almost') return 'Почти собрана';
  if (status === 'full') return 'Собрана';
  if (status === 'live') return 'Игра идет';
  if (status === 'finished') return 'Завершена';
  if (status === 'cancelled') return 'Отменена';
  return 'Набор открыт';
}

function getGameStatusClass(status) {
  if (status === 'almost') return 'is-almost';
  if (status === 'full') return 'is-full';
  if (status === 'live') return 'is-live';
  if (status === 'finished') return 'is-finished';
  if (status === 'cancelled') return 'is-cancelled';
  return 'is-open';
}

function isGameToday(game) {
  const startMs = getGameStartMs(game);
  if (!Number.isFinite(startMs)) return false;
  const now = new Date();
  return isSameDate(new Date(startMs), new Date(now.getFullYear(), now.getMonth(), now.getDate()));
}

function getGameCardBadges(game, status, remaining) {
  const badges = [];
  if (status === 'cancelled') badges.push({ label: 'Отменена', className: 'is-neutral' });
  else if (status === 'finished') badges.push({ label: 'Завершена', className: 'is-neutral' });
  else if (status === 'full') badges.push({ label: 'Собрана', className: 'is-neutral' });

  if (game.price === 0) badges.push({ label: 'Бесплатно', className: 'is-free' });
  if (game.isNew) badges.push({ label: 'Новая', className: 'is-new' });
  if (game.hasCoach) badges.push({ label: 'С тренером', className: 'is-coach' });
  if (isGameToday(game)) badges.push({ label: 'Сегодня', className: 'is-today' });
  if (status === 'almost') badges.push({ label: 'Почти собрана', className: 'is-almost' });
  if (remaining > 0) badges.push({ label: 'Есть свободные места', className: 'is-slots' });
  return badges.slice(0, 2).map((badge) => `<span class="game-badge ${badge.className}">${escapeHtml(badge.label)}</span>`).join('');
}

function toShortDateTime(game) {
  const startMs = getGameStartMs(game);
  if (!Number.isFinite(startMs)) return 'Дата уточняется';
  const format = new Intl.DateTimeFormat('ru-RU', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
  return format.format(new Date(startMs));
}

function toTimeRange(game) {
  const startMs = getGameStartMs(game);
  const endMs = getGameEndMs(game);
  if (!Number.isFinite(startMs) || !Number.isFinite(endMs)) return 'Время уточняется';
  const format = new Intl.DateTimeFormat('ru-RU', { hour: '2-digit', minute: '2-digit' });
  return `${format.format(new Date(startMs))}–${format.format(new Date(endMs))}`;
}

function getTimeBucket(game) {
  const startMs = getGameStartMs(game);
  if (!Number.isFinite(startMs)) return '';
  const h = new Date(startMs).getHours();
  if (h >= 6 && h < 12) return 'morning';
  if (h >= 12 && h < 17) return 'day';
  if (h >= 17 && h < 23) return 'evening';
  return 'night';
}

function isSameDate(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function matchesGameQuery(game, query) {
  if (!query) return true;
  const haystack = normalize([
    game.title,
    game.description,
    game.sport,
    game.format,
    game.locationName,
    game.metro,
    game.district,
    game.address
  ].join(' '));
  return haystack.includes(normalize(query));
}

function applyGamesFilters(list) {
  return list.filter((game) => {
    const status = resolveGameStatus(game);
    const startMs = getGameStartMs(game);
    const startDate = Number.isFinite(startMs) ? new Date(startMs) : null;
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    const weekEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
    const remainingSeats = getGameRemainingSeats(game);

    if (!matchesGameQuery(game, gamesState.filters.query)) return false;
    if (gamesState.filters.today && (!startDate || !isSameDate(startDate, today))) return false;
    if (gamesState.filters.free && game.price > 0) return false;
    if (gamesState.filters.isNew && !game.isNew) return false;
    if (gamesState.filters.almostFull && status !== 'almost') return false;
    if (gamesState.filters.hasSlots && remainingSeats <= 0) return false;
    if (gamesState.filters.hasCoach && !game.hasCoach) return false;
    if (gamesState.filters.sports.size > 0 && !gamesState.filters.sports.has(game.sport)) return false;

    if (gamesState.filters.date === 'today' && (!startDate || !isSameDate(startDate, today))) return false;
    if (gamesState.filters.date === 'tomorrow' && (!startDate || !isSameDate(startDate, tomorrow))) return false;
    if (gamesState.filters.date === 'week' && (!startDate || startDate < today || startDate > weekEnd)) return false;
    if (gamesState.filters.date === 'custom' && gamesState.filters.customDate) {
      const custom = new Date(gamesState.filters.customDate);
      if (!startDate || !isSameDate(startDate, custom)) return false;
    }

    if (gamesState.filters.time.size > 0 && !gamesState.filters.time.has(getTimeBucket(game))) return false;
    if (gamesState.filters.levels.size > 0 && !gamesState.filters.levels.has(game.level)) return false;
    if (gamesState.filters.formats.size > 0 && !gamesState.filters.formats.has(game.format)) return false;

    if (gamesState.filters.cost === 'free' && game.price > 0) return false;
    if (gamesState.filters.cost === '300' && game.price > 300) return false;
    if (gamesState.filters.cost === '500' && game.price > 500) return false;
    if (gamesState.filters.cost === '1000' && game.price > 1000) return false;

    if (gamesState.filters.metros.size > 0 && !gamesState.filters.metros.has(game.metro)) return false;
    if (gamesState.filters.districts.size > 0 && !gamesState.filters.districts.has(game.district)) return false;
    if (gamesState.filters.radius && Number(game.distanceKm) > Number(gamesState.filters.radius)) return false;

    if (gamesState.filters.freeSeats === '1' && remainingSeats < 1) return false;
    if (gamesState.filters.freeSeats === '3' && remainingSeats < 3) return false;
    if (gamesState.filters.freeSeats === '5' && remainingSeats < 5) return false;

    if (gamesState.filters.genders.size > 0 && !gamesState.filters.genders.has('any') && !gamesState.filters.genders.has(game.genderType)) return false;
    return true;
  });
}

function getUniqueValues(key) {
  return Array.from(new Set(gamesState.items.map((game) => String(game[key] || '').trim()).filter(Boolean)))
    .sort((a, b) => a.localeCompare(b, 'ru'));
}

function setGamesLabel(element, base, selectedCount, explicitText = '') {
  if (!element) return;
  if (selectedCount > 0) {
    element.classList.add('filter-chip-active');
    if (explicitText && selectedCount === 1) {
      element.innerHTML = `${escapeHtml(base)}: ${escapeHtml(explicitText)}`;
    } else {
      element.innerHTML = `${escapeHtml(base)} <span class="chip-count-badge" aria-hidden="true">${selectedCount}</span>`;
    }
    return;
  }
  element.classList.remove('filter-chip-active');
  element.innerHTML = `${escapeHtml(base)} <img class="chip-plus-icon" src="./icons/plus.svg" alt="" aria-hidden="true">`;
}

function renderGamesFilterLabels() {
  if (gamesTodayButton) gamesTodayButton.setAttribute('aria-pressed', gamesState.filters.today ? 'true' : 'false');
  if (gamesFreeButton) gamesFreeButton.setAttribute('aria-pressed', gamesState.filters.free ? 'true' : 'false');
  if (gamesNewButton) gamesNewButton.setAttribute('aria-pressed', gamesState.filters.isNew ? 'true' : 'false');
  if (gamesAlmostButton) gamesAlmostButton.setAttribute('aria-pressed', gamesState.filters.almostFull ? 'true' : 'false');
  if (gamesSlotsButton) gamesSlotsButton.setAttribute('aria-pressed', gamesState.filters.hasSlots ? 'true' : 'false');
  if (gamesCoachButton) gamesCoachButton.setAttribute('aria-pressed', gamesState.filters.hasCoach ? 'true' : 'false');

  setGamesLabel(gamesSportLabel, 'Вид спорта', gamesState.filters.sports.size);
  setGamesLabel(gamesDateLabel, 'Дата', gamesState.filters.date ? 1 : 0, GAME_DATE_OPTIONS.find((item) => item.value === gamesState.filters.date)?.label || '');
  setGamesLabel(gamesTimeLabel, 'Время', gamesState.filters.time.size);
  setGamesLabel(gamesLevelLabel, 'Уровень игры', gamesState.filters.levels.size);
  setGamesLabel(gamesFormatLabel, 'Формат игры', gamesState.filters.formats.size);
  setGamesLabel(gamesPriceLabel, 'Стоимость', gamesState.filters.cost && gamesState.filters.cost !== 'any' ? 1 : 0, GAME_COST_OPTIONS.find((item) => item.value === gamesState.filters.cost)?.label || '');
  setGamesLabel(
    gamesLocationLabel,
    'Расположение',
    gamesState.filters.metros.size + gamesState.filters.districts.size + (gamesState.filters.radius ? 1 : 0)
  );
  setGamesLabel(gamesSeatsLabel, 'Свободные места', gamesState.filters.freeSeats ? 1 : 0, GAME_FREE_SEATS_OPTIONS.find((item) => item.value === gamesState.filters.freeSeats)?.label || '');
  setGamesLabel(gamesGenderLabel, 'Пол / тип состава', gamesState.filters.genders.size);
}

function renderToggleMenu(menuEl, options, selectedSet, dataKey) {
  if (!menuEl) return;
  menuEl.innerHTML = `<div class="sport-grid">${options.map((item) => {
    const selected = selectedSet.has(item.value);
    return `<button class="sport-btn ${selected ? 'is-selected' : ''}" type="button" data-games-menu="${escapeAttr(dataKey)}" data-games-value="${escapeAttr(item.value)}">${escapeHtml(item.label)}${selected ? '<span class="sport-btn-x">×</span>' : ''}</button>`;
  }).join('')}</div>`;
}

function renderSingleMenu(menuEl, options, selectedValue, dataKey) {
  if (!menuEl) return;
  menuEl.innerHTML = `<div class="sport-grid">${options.map((item) => {
    const selected = selectedValue === item.value;
    return `<button class="sport-btn ${selected ? 'is-selected' : ''}" type="button" data-games-single="${escapeAttr(dataKey)}" data-games-value="${escapeAttr(item.value)}">${escapeHtml(item.label)}${selected ? '<span class="sport-btn-x">×</span>' : ''}</button>`;
  }).join('')}</div>`;
}

function renderGamesPriceMenu() {
  if (!gamesPriceMenu) return;
  gamesPriceMenu.innerHTML = `
    <div class="price-picker-body">
      <p class="price-section-title">Стоимость участия</p>
      <div class="price-presets">
        ${GAME_COST_OPTIONS.map((item) => {
          const selected = gamesState.filters.cost === item.value;
          return `<button class="price-preset ${selected ? 'is-selected' : ''}" type="button" data-games-single="cost" data-games-value="${escapeAttr(item.value)}">${escapeHtml(item.label)}</button>`;
        }).join('')}
      </div>
    </div>
  `;
}

function renderLocationMenu() {
  if (!gamesLocationMenu) return;
  const metros = getUniqueValues('metro');
  const districts = getUniqueValues('district');
  gamesLocationMenu.innerHTML = `
    <div class="game-location-menu">
      <h4>Метро</h4>
      <div class="sport-grid">
        ${metros.map((metro) => {
          const selected = gamesState.filters.metros.has(metro);
          return `<button class="sport-btn ${selected ? 'is-selected' : ''}" type="button" data-games-location="metro" data-games-value="${escapeAttr(metro)}">${escapeHtml(metro)}${selected ? '<span class="sport-btn-x">×</span>' : ''}</button>`;
        }).join('')}
      </div>
      <h4>Район</h4>
      <div class="sport-grid">
        ${districts.map((district) => {
          const selected = gamesState.filters.districts.has(district);
          return `<button class="sport-btn ${selected ? 'is-selected' : ''}" type="button" data-games-location="district" data-games-value="${escapeAttr(district)}">${escapeHtml(district)}${selected ? '<span class="sport-btn-x">×</span>' : ''}</button>`;
        }).join('')}
      </div>
      <h4>Радиус</h4>
      <div class="sport-grid">
        ${GAME_RADIUS_OPTIONS.map((item) => {
          const selected = gamesState.filters.radius === item.value;
          return `<button class="sport-btn ${selected ? 'is-selected' : ''}" type="button" data-games-location="radius" data-games-value="${escapeAttr(item.value)}">${escapeHtml(item.label)}${selected ? '<span class="sport-btn-x">×</span>' : ''}</button>`;
        }).join('')}
      </div>
    </div>
  `;
}

function renderDateMenu() {
  if (!gamesDateMenu) return;
  renderSingleMenu(gamesDateMenu, GAME_DATE_OPTIONS, gamesState.filters.date, 'date');
  if (gamesState.filters.date !== 'custom') return;
  gamesDateMenu.insertAdjacentHTML('beforeend', `
    <div class="game-custom-date-wrap">
      <label for="games-custom-date">Выберите дату</label>
      <input id="games-custom-date" type="date" value="${escapeAttr(gamesState.filters.customDate || '')}">
    </div>
  `);
  const customInput = gamesDateMenu.querySelector('#games-custom-date');
  if (customInput) {
    customInput.addEventListener('change', () => {
      gamesState.filters.customDate = customInput.value;
      rerenderGames();
    });
  }
}

function renderGamesFilterMenus() {
  renderToggleMenu(gamesSportMenu, GAME_SPORT_OPTIONS.map((item) => ({ value: item, label: item })), gamesState.filters.sports, 'sport');
  renderDateMenu();
  renderToggleMenu(gamesTimeMenu, GAME_TIME_OPTIONS, gamesState.filters.time, 'time');
  renderToggleMenu(gamesLevelMenu, GAME_LEVEL_OPTIONS.map((item) => ({ value: item, label: item })), gamesState.filters.levels, 'level');
  renderToggleMenu(gamesFormatMenu, GAME_FORMAT_OPTIONS.map((item) => ({ value: item, label: item })), gamesState.filters.formats, 'format');
  renderGamesPriceMenu();
  renderLocationMenu();
  renderSingleMenu(gamesSeatsMenu, GAME_FREE_SEATS_OPTIONS, gamesState.filters.freeSeats, 'seats');
  renderToggleMenu(gamesGenderMenu, GAME_GENDER_OPTIONS, gamesState.filters.genders, 'gender');
}

function resetGamesFilters() {
  gamesState.filters.query = '';
  gamesState.filters.today = false;
  gamesState.filters.free = false;
  gamesState.filters.isNew = false;
  gamesState.filters.almostFull = false;
  gamesState.filters.hasSlots = false;
  gamesState.filters.hasCoach = false;
  gamesState.filters.sports.clear();
  gamesState.filters.date = '';
  gamesState.filters.customDate = '';
  gamesState.filters.time.clear();
  gamesState.filters.levels.clear();
  gamesState.filters.formats.clear();
  gamesState.filters.cost = '';
  gamesState.filters.metros.clear();
  gamesState.filters.districts.clear();
  gamesState.filters.radius = '';
  gamesState.filters.freeSeats = '';
  gamesState.filters.genders.clear();
  if (gamesSearchInput) gamesSearchInput.value = '';
  if (gamesSearchClear) gamesSearchClear.hidden = true;
}

function collectActiveGameTokens() {
  const tokens = [];
  if (gamesState.filters.query) tokens.push({ type: 'query', value: 'query', label: `Поиск: ${gamesState.filters.query}` });
  if (gamesState.filters.today) tokens.push({ type: 'quick', value: 'today', label: 'Сегодня' });
  if (gamesState.filters.free) tokens.push({ type: 'quick', value: 'free', label: 'Бесплатно' });
  if (gamesState.filters.isNew) tokens.push({ type: 'quick', value: 'new', label: 'Новые' });
  if (gamesState.filters.almostFull) tokens.push({ type: 'quick', value: 'almost', label: 'Почти собрана' });
  if (gamesState.filters.hasSlots) tokens.push({ type: 'quick', value: 'slots', label: 'Есть места' });
  if (gamesState.filters.hasCoach) tokens.push({ type: 'quick', value: 'coach', label: 'С тренером' });
  Array.from(gamesState.filters.sports).forEach((item) => tokens.push({ type: 'sport', value: item, label: item }));
  Array.from(gamesState.filters.time).forEach((item) => tokens.push({ type: 'time', value: item, label: GAME_TIME_OPTIONS.find((opt) => opt.value === item)?.label || item }));
  Array.from(gamesState.filters.levels).forEach((item) => tokens.push({ type: 'level', value: item, label: item }));
  Array.from(gamesState.filters.formats).forEach((item) => tokens.push({ type: 'format', value: item, label: item }));
  if (gamesState.filters.date) tokens.push({ type: 'date', value: gamesState.filters.date, label: GAME_DATE_OPTIONS.find((opt) => opt.value === gamesState.filters.date)?.label || 'Дата' });
  if (gamesState.filters.cost && gamesState.filters.cost !== 'any') tokens.push({ type: 'cost', value: gamesState.filters.cost, label: GAME_COST_OPTIONS.find((opt) => opt.value === gamesState.filters.cost)?.label || 'Стоимость' });
  if (gamesState.filters.freeSeats) tokens.push({ type: 'seats', value: gamesState.filters.freeSeats, label: GAME_FREE_SEATS_OPTIONS.find((opt) => opt.value === gamesState.filters.freeSeats)?.label || 'Места' });
  if (gamesState.filters.radius) tokens.push({ type: 'radius', value: gamesState.filters.radius, label: `До ${gamesState.filters.radius} км` });
  Array.from(gamesState.filters.metros).forEach((item) => tokens.push({ type: 'metro', value: item, label: `м. ${item}` }));
  Array.from(gamesState.filters.districts).forEach((item) => tokens.push({ type: 'district', value: item, label: item }));
  Array.from(gamesState.filters.genders).forEach((item) => tokens.push({ type: 'gender', value: item, label: GAME_GENDER_OPTIONS.find((opt) => opt.value === item)?.label || item }));
  return tokens;
}

function clearGameToken(type, value) {
  if (type === 'query') gamesState.filters.query = '';
  if (type === 'quick' && value === 'today') gamesState.filters.today = false;
  if (type === 'quick' && value === 'free') gamesState.filters.free = false;
  if (type === 'quick' && value === 'new') gamesState.filters.isNew = false;
  if (type === 'quick' && value === 'almost') gamesState.filters.almostFull = false;
  if (type === 'quick' && value === 'slots') gamesState.filters.hasSlots = false;
  if (type === 'quick' && value === 'coach') gamesState.filters.hasCoach = false;
  if (type === 'sport') gamesState.filters.sports.delete(value);
  if (type === 'time') gamesState.filters.time.delete(value);
  if (type === 'level') gamesState.filters.levels.delete(value);
  if (type === 'format') gamesState.filters.formats.delete(value);
  if (type === 'date') {
    gamesState.filters.date = '';
    gamesState.filters.customDate = '';
  }
  if (type === 'cost') gamesState.filters.cost = '';
  if (type === 'seats') gamesState.filters.freeSeats = '';
  if (type === 'radius') gamesState.filters.radius = '';
  if (type === 'metro') gamesState.filters.metros.delete(value);
  if (type === 'district') gamesState.filters.districts.delete(value);
  if (type === 'gender') gamesState.filters.genders.delete(value);
  if (gamesSearchInput) gamesSearchInput.value = gamesState.filters.query;
  if (gamesSearchClear) gamesSearchClear.hidden = gamesState.filters.query.length === 0;
}

function renderGamesActiveTokens() {
  if (!gamesSportActiveRow) return;
  const tokens = collectActiveGameTokens();
  if (tokens.length === 0) {
    gamesSportActiveRow.innerHTML = '';
    gamesSportActiveRow.classList.remove('is-visible');
    return;
  }
  gamesSportActiveRow.classList.add('is-visible');
  gamesSportActiveRow.innerHTML = `
    ${tokens.map((token) => `
      <button class="sport-active-chip" type="button" data-games-token="${escapeAttr(token.type)}" data-games-value="${escapeAttr(token.value)}">
        <span>${escapeHtml(token.label)}</span>
        <img class="chip-close-icon" src="./icons/krest.svg" alt="" aria-hidden="true">
      </button>
    `).join('')}
    <button class="sport-reset-btn" type="button" data-games-reset="1">Сбросить всё</button>
  `;
  Array.from(gamesSportActiveRow.querySelectorAll('[data-games-token]')).forEach((button) => {
    button.addEventListener('click', () => {
      clearGameToken(button.getAttribute('data-games-token') || '', button.getAttribute('data-games-value') || '');
      rerenderGames();
    });
  });
  const resetBtn = gamesSportActiveRow.querySelector('[data-games-reset]');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      resetGamesFilters();
      rerenderGames();
    });
  }
}

function getJoinButtonMeta(game, status) {
  if (game.joinRequested) return { text: 'Вы уже в игре', disabled: true, className: 'is-joined' };
  if (status === 'finished') return { text: 'Игра завершена', disabled: true, className: 'is-disabled' };
  if (status === 'cancelled') return { text: 'Игра отменена', disabled: true, className: 'is-disabled' };
  if (status === 'full') return { text: 'Мест нет', disabled: true, className: 'is-disabled' };
  if (game.gameType === 'Тренировка') return { text: 'Отправить запрос', disabled: false, className: 'is-primary' };
  return { text: 'Присоединиться', disabled: false, className: 'is-primary' };
}

function getAvatarsMarkup(game) {
  const avatars = game.players.slice(0, 4).map((player, index) => {
    const initials = String(player.name || '?').split(' ').map((item) => item[0]).join('').slice(0, 2).toUpperCase();
    return `<span class="game-player-avatar tone-${(index % 4) + 1}" title="${escapeAttr(player.name)}">${escapeHtml(initials)}</span>`;
  }).join('');
  const extraCount = Math.max(0, Number(game.playersCurrent || 0) - 4);
  if (extraCount > 0) return `${avatars}<span class="game-player-avatar is-extra">+${extraCount}</span>`;
  return avatars;
}

function isGameArchiveStatus(status) {
  return status === 'finished' || status === 'full' || status === 'cancelled';
}

function getGameCardMarkup(game, index, status, isArchive = false) {
  const remaining = getGameRemainingSeats(game);
  const joinMeta = getJoinButtonMeta(game, status);
  const badges = getGameCardBadges(game, status, remaining);
  const progressWidth = Math.max(0, Math.min(100, Math.round((Number(game.playersCurrent) / Math.max(1, Number(game.playersMax))) * 100)));

  return `
    <article class="game-card ${isArchive ? 'is-archive' : ''}" role="listitem" tabindex="0" data-game-card="${escapeAttr(game.id)}" aria-label="${escapeAttr(game.title)}" style="--card-index:${index}">
      <div class="game-card-media">
        <img src="${escapeAttr(game.image || './icons/map-area-base.jpg')}" alt="${escapeAttr(game.title)}">
        <div class="game-card-badges">${badges}</div>
      </div>
      <div class="game-card-body">
        <h3 class="game-card-title">${escapeHtml(game.title)}</h3>
        <p class="game-meta-row is-icon">
          <span class="game-meta-icon" aria-hidden="true"><img class="game-meta-icon-img" src="./icons/schedule.svg" alt=""></span>
          <span>${escapeHtml(toShortDateTime(game))} · ${escapeHtml(toTimeRange(game))}</span>
        </p>
        <p class="game-meta-row is-icon">
          <span class="game-meta-icon" aria-hidden="true"><img class="game-meta-icon-img" src="./icons/location.svg" alt=""></span>
          <span>${escapeHtml(game.locationName)} · м. ${escapeHtml(game.metro)}</span>
        </p>
        <div class="game-level-price">
          <span class="game-level-chip">${escapeHtml(game.level)}</span>
          <strong class="game-price-value">${game.price === 0 ? 'Бесплатно' : `${escapeHtml(String(game.price))} ₽`}</strong>
        </div>
        <div class="game-progress-wrap">
          <div class="game-progress-head">
            <span>${escapeHtml(String(game.playersCurrent))} / ${escapeHtml(String(game.playersMax))} игроков</span>
            <span class="game-progress-remaining">${remaining > 0 ? `${escapeHtml(String(remaining))} мест` : 'мест нет'}</span>
          </div>
          <div class="game-progress-bar" aria-hidden="true"><span style="width:${progressWidth}%"></span></div>
        </div>
        <div class="game-card-footer">
          <div class="game-player-avatars">${getAvatarsMarkup(game)}</div>
          <button class="game-join-btn ${joinMeta.className}" type="button" data-game-join="${escapeAttr(game.id)}" ${joinMeta.disabled ? 'disabled' : ''}>${escapeHtml(joinMeta.text)}</button>
        </div>
      </div>
    </article>
  `;
}

function renderGameCards() {
  if (!gamesGrid) return;
  const filtered = applyGamesFilters(gamesState.items);
  if (gamesCount) gamesCount.textContent = String(filtered.length);
  if (gamesError) {
    gamesError.hidden = !gamesState.error;
    gamesError.textContent = gamesState.error || '';
  }
  if (gamesState.loading && gamesState.items.length === 0) {
    gamesGrid.innerHTML = new Array(6).fill(0).map(() => '<div class="game-skeleton" aria-hidden="true"></div>').join('');
    return;
  }
  if (filtered.length === 0) {
    gamesGrid.innerHTML = '<div class="game-empty">По выбранным фильтрам игры не найдены</div>';
    return;
  }

  const grouped = filtered.reduce((acc, game) => {
    const status = resolveGameStatus(game);
    const target = isGameArchiveStatus(status) ? acc.archive : acc.active;
    target.push({ game, status });
    return acc;
  }, { active: [], archive: [] });
  const activeMarkup = grouped.active.map(({ game, status }, index) => getGameCardMarkup(game, index, status)).join('');
  const archiveStartIndex = grouped.active.length;
  const archiveMarkup = grouped.archive.map(({ game, status }, index) => getGameCardMarkup(game, archiveStartIndex + index, status, true)).join('');
  const archiveDivider = grouped.archive.length > 0 ? `
    <div class="games-archive-divider" role="presentation">
      <span></span>
      <strong>Завершённые и собранные игры</strong>
      <span></span>
    </div>
  ` : '';

  gamesGrid.innerHTML = `${activeMarkup}${archiveDivider}${archiveMarkup}`;

  Array.from(gamesGrid.querySelectorAll('[data-game-card]')).forEach((card) => {
    const open = () => openGameDetails(card.getAttribute('data-game-card') || '');
    card.addEventListener('click', open);
    card.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      open();
    });
  });

  Array.from(gamesGrid.querySelectorAll('[data-game-join]')).forEach((button) => {
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      const game = gamesState.items.find((item) => item.id === button.getAttribute('data-game-join'));
      if (!game) return;
      game.joinRequested = true;
      trackGamesEvent('join_game', { game_id: game.id });
      showGamesToast('Запрос отправлен');
      renderGameCards();
      if (gamesState.selectedGameId === game.id) renderGameDetails(game);
    });
  });
}

function renderPlayersList(game) {
  return game.players.map((player) => `
    <li class="${player.isOrganizer ? 'is-organizer' : ''}">
      <span class="game-player-avatar">${escapeHtml(String(player.name || '?').split(' ').map((item) => item[0]).join('').slice(0, 2).toUpperCase())}</span>
      <span>${escapeHtml(player.name)}${player.isOrganizer ? ' (организатор)' : ''}</span>
    </li>
  `).join('');
}

function renderGameDetails(game) {
  if (!gameModalContent || !game) return;
  const status = resolveGameStatus(game);
  const remaining = getGameRemainingSeats(game);
  const joinMeta = getJoinButtonMeta(game, status);
  const playerAvatars = game.players.map((player, index) => {
    const initials = String(player.name || '?').split(' ').map((item) => item[0]).join('').slice(0, 2).toUpperCase();
    return `<span class="game-detail-avatar tone-${(index % 6) + 1}" title="${escapeAttr(player.name)}">${escapeHtml(initials)}</span>`;
  }).join('');
  const organizerInitials = String(game.organizerName || '?').split(' ').map((item) => item[0]).join('').slice(0, 2).toUpperCase();
  gameModalContent.innerHTML = `
    <section class="game-detail-hero" style="--game-hero-image:url('${escapeAttr(game.image || './icons/map-area-base.jpg')}')">
      <div class="game-detail-hero-badges">
        ${getGameCardBadges(game, status, remaining)}
        <span class="game-badge is-neutral">${escapeHtml(game.sport)} · ${escapeHtml(game.format)}</span>
      </div>
      <h3 id="game-modal-title" class="game-detail-title">${escapeHtml(game.title)}</h3>
    </section>

    <section class="game-detail-summary" aria-label="Ключевые параметры игры">
      <div class="game-detail-fact">
        <span class="game-detail-fact-icon"><img src="./icons/schedule.svg" alt="" aria-hidden="true"></span>
        <span>Дата и время</span>
        <strong>${escapeHtml(toShortDateTime(game))} · ${escapeHtml(toTimeRange(game))}</strong>
      </div>
      <div class="game-detail-fact">
        <span class="game-detail-fact-icon"><img src="./icons/location.svg" alt="" aria-hidden="true"></span>
        <span>Площадка</span>
        <strong>${escapeHtml(game.locationName)}</strong>
      </div>
      <div class="game-detail-fact">
        <span class="game-detail-fact-icon">LV</span>
        <span>Уровень</span>
        <strong>${escapeHtml(game.level)}</strong>
      </div>
      <div class="game-detail-fact">
        <span class="game-detail-fact-icon">₽</span>
        <span>Стоимость</span>
        <strong>${game.price === 0 ? 'Бесплатно' : `${escapeHtml(String(game.price))} ₽/игрок`}</strong>
      </div>
    </section>

    <section class="game-detail-map-card">
      <div class="game-detail-map-visual">
        <img src="./icons/location.svg" alt="" aria-hidden="true">
        <span>${escapeHtml(game.district)}</span>
      </div>
      <div class="game-detail-map-meta">
        <strong>${escapeHtml(game.locationName)}</strong>
        <span>м. ${escapeHtml(game.metro)} · ${escapeHtml(game.district)}</span>
      </div>
    </section>

    <section class="game-detail-section game-detail-participants">
      <div class="game-detail-section-head">
        <h4>Участники</h4>
        <span>${escapeHtml(String(game.playersCurrent))}/${escapeHtml(String(game.playersMax))}</span>
      </div>
      <div class="game-detail-avatars">${playerAvatars}</div>
      <p>Свободных мест: <strong>${escapeHtml(String(remaining))}</strong></p>
      <div class="game-detail-organizer">
        <span class="game-detail-avatar tone-1">${escapeHtml(organizerInitials)}</span>
        <span><small>Организатор</small><strong>${escapeHtml(game.organizerName)}</strong></span>
      </div>
    </section>

    <section class="game-detail-section">
      <h4>Правила</h4>
      <p>${escapeHtml(game.description)}</p>
      <h4>Что взять с собой</h4>
      <p>Бутсы, форма, бутылка воды. Инвентарь площадка предоставляет частично.</p>
      <div class="game-detail-fit-note">
        <strong>Почему эта игра подходит тебе</strong>
        <span>${game.hasCoach ? 'Тренер специализируется на вашем уровне.' : 'Подходит по уровню, времени и расположению.'}</span>
      </div>
    </section>

    <div class="game-detail-actions">
      <button class="game-detail-icon-btn" type="button" data-game-modal-favorite="${escapeAttr(game.id)}" aria-label="Избранное">
        <img src="./icons/favorite.svg" alt="" aria-hidden="true">
      </button>
      <button class="game-detail-icon-btn" type="button" data-game-share="${escapeAttr(game.id)}" aria-label="Поделиться">
        <img src="./icons/share.svg" alt="" aria-hidden="true">
      </button>
      <button class="game-detail-join-btn ${joinMeta.className}" type="button" data-game-modal-join="${escapeAttr(game.id)}" ${joinMeta.disabled ? 'disabled' : ''}>${escapeHtml(joinMeta.text)}</button>
    </div>
  `;

  const favoriteBtn = gameModalContent.querySelector('[data-game-modal-favorite]');
  if (favoriteBtn) {
    favoriteBtn.addEventListener('click', () => {
      game.isFavorite = !game.isFavorite;
      renderGameDetails(game);
      renderGameCards();
    });
  }
  const joinBtn = gameModalContent.querySelector('[data-game-modal-join]');
  if (joinBtn) {
    joinBtn.addEventListener('click', () => {
      game.joinRequested = true;
      showGamesToast('Запрос отправлен');
      renderGameDetails(game);
      renderGameCards();
    });
  }
  Array.from(gameModalContent.querySelectorAll('[data-game-message]')).forEach((button) => {
    button.addEventListener('click', () => showGamesToast('Чат с организатором скоро появится'));
  });
  const openVenueBtn = gameModalContent.querySelector('[data-game-open-venue]');
  if (openVenueBtn) {
    openVenueBtn.addEventListener('click', () => showGamesToast('Открываем карточку площадки'));
  }
  const shareBtn = gameModalContent.querySelector('[data-game-share]');
  if (shareBtn) {
    shareBtn.addEventListener('click', async () => {
      const url = `${window.location.origin}${window.location.pathname}#game-${game.id}`;
      try {
        if (navigator.share) await navigator.share({ title: game.title, text: game.description, url });
        else if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(url);
        showGamesToast('Ссылка на игру скопирована');
      } catch (_error) {
        // ignore
      }
    });
  }
}

function openGameDetails(gameId) {
  const game = gamesState.items.find((item) => item.id === gameId);
  if (!game || !gameModal) return;
  if (gameCreateModal && !gameCreateModal.hidden) closeCreateGameModal();
  gamesState.selectedGameId = game.id;
  renderGameDetails(game);
  gameModal.hidden = false;
  gameModal.setAttribute('aria-hidden', 'false');
  refreshModalBodyLock();
  trackGamesEvent('select_game', { game_id: game.id });
}

function closeGameDetails() {
  if (!gameModal) return;
  gameModal.hidden = true;
  gameModal.setAttribute('aria-hidden', 'true');
  refreshModalBodyLock();
}

function showGamesToast(message) {
  let container = document.querySelector('#games-toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'games-toast-container';
    container.className = 'games-toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = 'games-toast';
  toast.textContent = message;
  container.appendChild(toast);
  window.setTimeout(() => {
    toast.classList.add('is-out');
    window.setTimeout(() => toast.remove(), 260);
  }, 1700);
}

function getTeamById(teamId) {
  return TEAM_FIXTURE.find((team) => team.id === teamId) || TEAM_FIXTURE[0];
}

function getSelectedTeam() {
  return getTeamById(teamState.selectedTeamId);
}

function getTeamMemberInitials(name) {
  return String(name || '?')
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function getTeamRoleLabel(role) {
  return TEAM_MEMBER_ROLES[role] || TEAM_MEMBER_ROLES.player;
}

function getTeamRoleClass(role) {
  if (role === 'captain') return 'is-captain';
  if (role === 'coach') return 'is-coach';
  return 'is-player';
}

function getResolvedTeamStatus(team) {
  const current = Array.isArray(team.members) ? team.members.length : 0;
  if (current >= Number(team.maxPlayers || 0)) return 'full';
  const remaining = Math.max(0, Number(team.maxPlayers || 0) - current);
  if (remaining <= 2) return 'needs';
  return team.status || 'active';
}

function setTeamModalOpen(modal, isOpen) {
  if (!modal) return;
  modal.hidden = !isOpen;
  modal.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
  refreshModalBodyLock();
}

function renderTeamIdentity(team) {
  if (!teamCardIdentity) return;
  const identityMeta = [team.sport, team.city || 'Москва', team.areaShort || 'ЦАО'].filter(Boolean).join(' • ');
  teamCardIdentity.innerHTML = `
    <span class="team-logo" aria-hidden="true">${escapeHtml(team.logoText || 'SP')}</span>
    <div class="team-name-wrap">
      <h2 class="team-name">${escapeHtml(team.name)}</h2>
      <p class="team-subname">${escapeHtml(identityMeta)}</p>
    </div>
  `;
}

function renderTeamStatus(team) {
  if (!teamStatusWrap) return;
  const resolvedStatus = getResolvedTeamStatus(team);
  const statusMeta = TEAM_STATUS_META[resolvedStatus] || TEAM_STATUS_META.active;
  const playersCount = Array.isArray(team.members) ? team.members.length : 0;
  teamStatusWrap.innerHTML = `
    <span class="team-status-badge ${escapeAttr(statusMeta.className)}">${escapeHtml(statusMeta.label)}</span>
    <span class="team-subname" style="margin-left:10px;">Игроки: ${escapeHtml(String(playersCount))}/${escapeHtml(String(team.maxPlayers || 0))}</span>
  `;
}

function renderTeamMetrics(team) {
  if (!teamMetricsGrid) return;
  const metrics = [
    {
      label: 'Игры',
      value: String(team.playedGames || 0),
      valueTone: 'is-value-games',
      metricTone: 'is-games',
      isLong: false,
      icon: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 19V10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M12 19V6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M19 19V13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>'
    },
    {
      label: 'Победы',
      value: String(team.wins || 0),
      valueTone: 'is-value-wins',
      metricTone: 'is-wins',
      isLong: false,
      icon: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M8 5h8v3a4 4 0 0 1-8 0V5Z" stroke="currentColor" stroke-width="2"/><path d="M8 8H5a3 3 0 0 0 3 3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M16 8h3a3 3 0 0 1-3 3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M12 12v4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M9 19h6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>'
    },
    {
      label: 'Посещаемость',
      value: `${Math.max(0, Math.min(100, Number(team.attendance) || 0))}%`,
      valueTone: 'is-value-attendance',
      metricTone: 'is-attendance',
      isLong: false,
      icon: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 12h4l2.4-5 3.2 10 2.2-5H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    },
    {
      label: 'Уровень',
      value: String(team.avgLevel || '—'),
      valueTone: 'is-value-level',
      metricTone: 'is-level',
      isLong: true,
      icon: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 19V11" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M12 19V7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M19 19V4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>'
    }
  ];
  teamMetricsGrid.innerHTML = metrics.map((metric) => `
    <article class="team-metric ${escapeAttr(metric.metricTone)}">
      <div class="team-metric-head">
        <span class="team-metric-icon">${metric.icon}</span>
        <span class="team-metric-label">${escapeHtml(metric.label)}</span>
      </div>
      <strong class="team-metric-value ${escapeAttr(metric.valueTone)} ${metric.isLong ? 'is-long' : ''}">${escapeHtml(metric.value)}</strong>
    </article>
  `).join('');
}

function renderTeamMembers(team) {
  if (!teamMembersList) return;
  const members = Array.isArray(team.members) ? team.members : [];
  const maxVisible = Math.max(1, teamState.visibleMembers);
  const visible = members.slice(0, maxVisible);
  teamMembersList.innerHTML = visible.map((member) => `
    <li class="team-member-item">
      <span class="team-member-avatar" aria-hidden="true">${escapeHtml(getTeamMemberInitials(member.name))}</span>
      <div class="team-member-main">
        <p class="team-member-name">${escapeHtml(member.name)}</p>
        <p class="team-member-meta">${escapeHtml(member.position)} • ${escapeHtml(getTeamRoleLabel(member.role))}</p>
      </div>
      <div class="team-member-actions">
        <span class="team-role-pill ${getTeamRoleClass(member.role)}">${escapeHtml(getTeamRoleLabel(member.role))}</span>
        ${member.role === 'captain' ? '' : `<button class="team-member-remove" type="button" data-team-remove="${escapeAttr(member.id)}" aria-label="Удалить игрока">×</button>`}
      </div>
    </li>
  `).join('');

  if (teamShowMoreButton) {
    teamShowMoreButton.hidden = members.length <= 6;
    teamShowMoreButton.textContent = maxVisible >= members.length ? 'Свернуть' : 'Показать еще';
  }

  Array.from(teamMembersList.querySelectorAll('[data-team-remove]')).forEach((button) => {
    button.addEventListener('click', () => {
      const memberId = button.getAttribute('data-team-remove') || '';
      team.members = members.filter((member) => member.id !== memberId);
      showGamesToast('Игрок удален из состава');
      renderTeamSection();
    });
  });
}

function renderTeamRequests() {
  if (!teamRequestsList) return;
  const team = getSelectedTeam();
  const requests = Array.isArray(team.requests) ? team.requests : [];
  if (requests.length === 0) {
    teamRequestsList.innerHTML = '<div class="game-empty">Новых заявок пока нет</div>';
    return;
  }
  teamRequestsList.innerHTML = requests.map((request) => `
    <article class="team-request-item" data-team-request="${escapeAttr(request.id)}">
      <div class="team-request-head">
        <div>
          <p class="team-request-name">${escapeHtml(request.name)}</p>
          <p class="team-request-meta">${escapeHtml(request.level)} • ${escapeHtml(request.position)}</p>
        </div>
      </div>
      <div class="team-request-actions">
        <button class="team-action-btn is-secondary" type="button" data-team-request-action="accept" data-team-request-id="${escapeAttr(request.id)}">Принять</button>
        <button class="team-action-btn is-ghost" type="button" data-team-request-action="decline" data-team-request-id="${escapeAttr(request.id)}">Отклонить</button>
      </div>
    </article>
  `).join('');

  Array.from(teamRequestsList.querySelectorAll('[data-team-request-action]')).forEach((button) => {
    button.addEventListener('click', () => {
      const action = button.getAttribute('data-team-request-action') || '';
      const requestId = button.getAttribute('data-team-request-id') || '';
      const request = requests.find((item) => item.id === requestId);
      if (!request) return;
      if (action === 'accept') {
        const nextCount = Array.isArray(team.members) ? team.members.length + 1 : 1;
        if (nextCount <= Number(team.maxPlayers || 0)) {
          team.members = [
            ...team.members,
            {
              id: `new-${Date.now()}`,
              name: request.name,
              position: request.position,
              role: 'player'
            }
          ];
        }
        showGamesToast('Заявка принята');
      } else {
        showGamesToast('Заявка отклонена');
      }
      team.requests = requests.filter((item) => item.id !== requestId);
      renderTeamRequests();
      renderTeamSection();
    });
  });
}

function renderTeamEvents(team) {
  if (!teamEventsTrack) return;
  const events = Array.isArray(team.events) ? team.events : [];
  if (teamEventsCount) {
    teamEventsCount.textContent = `${events.length} ближайших`;
  }
  teamEventsTrack.innerHTML = events.map((event) => {
    const statusMeta = TEAM_EVENT_STATUS_META[event.status] || TEAM_EVENT_STATUS_META.upcoming;
    return `
      <article class="team-event-card" role="listitem" tabindex="0" data-team-event-open="${escapeAttr(event.id)}">
        <span class="team-event-type">${escapeHtml(event.type)}</span>
        <h3 class="team-event-name">${escapeHtml(event.title)}</h3>
        <p class="team-event-meta">${escapeHtml(event.dateLabel)} • ${escapeHtml(event.time)}</p>
        <p class="team-event-meta">${escapeHtml(event.place)}</p>
        <span class="team-event-status ${escapeAttr(statusMeta.className)}">${escapeHtml(statusMeta.label)}</span>
      </article>
    `;
  }).join('');

  Array.from(teamEventsTrack.querySelectorAll('[data-team-event-open]')).forEach((card) => {
    const openEvent = () => {
      const eventId = card.getAttribute('data-team-event-open') || '';
      openTeamEventModal(eventId);
    };
    card.addEventListener('click', openEvent);
    card.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      openEvent();
    });
  });
}

function renderTeamEventModal(eventData) {
  if (!teamEventContent || !eventData) return;
  const participants = Array.isArray(eventData.participants) ? eventData.participants : [];
  const comments = Array.isArray(eventData.comments) ? eventData.comments : [];
  const statusMeta = TEAM_EVENT_STATUS_META[eventData.status] || TEAM_EVENT_STATUS_META.upcoming;

  teamEventContent.innerHTML = `
    <h3 id="team-event-title" class="team-modal-title">${escapeHtml(eventData.title)}</h3>
    <div class="team-event-status ${escapeAttr(statusMeta.className)}">${escapeHtml(statusMeta.label)}</div>
    <div class="team-event-modal-layout">
      <section class="team-event-sheet">
        <h4>Главное</h4>
        <p>${escapeHtml(eventData.type)} • ${escapeHtml(eventData.dateLabel)} • ${escapeHtml(eventData.time)}</p>
        <p>${escapeHtml(eventData.place)}</p>
        <p>${escapeHtml(eventData.description || '')}</p>
        <p><strong>${escapeHtml(eventData.lineupNeeded || '')}</strong></p>
      </section>
      <section class="team-event-sheet">
        <h4>Участники</h4>
        <ul>${participants.map((name) => `<li>${escapeHtml(name)}</li>`).join('')}</ul>
      </section>
      <section class="team-event-sheet">
        <h4>Карта</h4>
        <p>${escapeHtml(eventData.place)}</p>
        <p>Маршрут откроется в приложении карты</p>
      </section>
      <section class="team-event-sheet">
        <h4>Комментарии</h4>
        <ul>${comments.map((comment) => `<li>${escapeHtml(comment)}</li>`).join('')}</ul>
      </section>
    </div>
    <div class="team-event-actions">
      <button class="team-action-btn is-primary" type="button" data-team-event-action="confirm">Подтвердить участие</button>
      <button class="team-action-btn is-ghost" type="button" data-team-event-action="decline">Отказаться</button>
      <button class="team-action-btn is-secondary" type="button" data-team-event-action="message">Написать команде</button>
    </div>
  `;

  Array.from(teamEventContent.querySelectorAll('[data-team-event-action]')).forEach((button) => {
    button.addEventListener('click', () => {
      const action = button.getAttribute('data-team-event-action') || '';
      if (action === 'confirm') showGamesToast('Участие подтверждено');
      if (action === 'decline') showGamesToast('Вы отметили, что не сможете прийти');
      if (action === 'message') showGamesToast('Открываем чат команды');
    });
  });
}

function openTeamRequestsModal() {
  renderTeamRequests();
  setTeamModalOpen(teamRequestsModal, true);
}

function openTeamEventModal(eventId) {
  const team = getSelectedTeam();
  const eventData = Array.isArray(team.events) ? team.events.find((item) => item.id === eventId) : null;
  if (!eventData) return;
  teamState.selectedEventId = eventId;
  renderTeamEventModal(eventData);
  setTeamModalOpen(teamEventModal, true);
}

function openTeamCreateModal() {
  if (teamCreateForm) teamCreateForm.reset();
  setTeamModalOpen(teamCreateModal, true);
  if (teamCreateNameInput) teamCreateNameInput.focus();
}

function closeTeamModals() {
  setTeamModalOpen(teamRequestsModal, false);
  setTeamModalOpen(teamEventModal, false);
  setTeamModalOpen(teamCreateModal, false);
}

function renderTeamSection() {
  if (!teamSection) return;
  const team = getSelectedTeam();
  if (!team) return;

  if (teamSwitchSelect) {
    teamSwitchSelect.innerHTML = TEAM_FIXTURE.map((item) => `
      <option value="${escapeAttr(item.id)}" ${item.id === team.id ? 'selected' : ''}>${escapeHtml(item.name)}</option>
    `).join('');
  }

  renderTeamIdentity(team);
  renderTeamStatus(team);
  renderTeamMetrics(team);
  renderTeamMembers(team);
  renderTeamEvents(team);

  if (teamAttendanceValue) teamAttendanceValue.textContent = `${team.attendance}%`;
  if (teamAttendanceBar) teamAttendanceBar.style.width = `${Math.max(0, Math.min(100, Number(team.attendance) || 0))}%`;
  if (teamOpponentMeta) teamOpponentMeta.textContent = `${team.sport} • ${team.avgLevel} • ${team.district}`;
  if (teamOpponentCount) teamOpponentCount.textContent = `Найдено ${team.opponentsFound} потенциальных команд`;
}

function initTeamSection() {
  if (!teamSection || teamState.initialized) return;
  teamState.initialized = true;
  renderTeamSection();

  if (teamSwitchSelect) {
    teamSwitchSelect.addEventListener('change', () => {
      teamState.selectedTeamId = teamSwitchSelect.value;
      teamState.visibleMembers = 6;
      renderTeamSection();
    });
  }

  if (teamShowMoreButton) {
    teamShowMoreButton.addEventListener('click', () => {
      const team = getSelectedTeam();
      const membersLength = Array.isArray(team.members) ? team.members.length : 0;
      if (teamState.visibleMembers >= membersLength) teamState.visibleMembers = 6;
      else teamState.visibleMembers = membersLength;
      renderTeamMembers(team);
    });
  }

  if (teamInvitePlayerButton) {
    teamInvitePlayerButton.addEventListener('click', () => {
      showGamesToast('Ссылка-приглашение отправлена');
    });
  }

  if (teamRequestsButton) teamRequestsButton.addEventListener('click', openTeamRequestsModal);
  if (teamRequestsOverlay) teamRequestsOverlay.addEventListener('click', () => setTeamModalOpen(teamRequestsModal, false));
  if (teamRequestsClose) teamRequestsClose.addEventListener('click', () => setTeamModalOpen(teamRequestsModal, false));

  if (teamCreateButton) teamCreateButton.addEventListener('click', openTeamCreateModal);
  if (teamCreateOverlay) teamCreateOverlay.addEventListener('click', () => setTeamModalOpen(teamCreateModal, false));
  if (teamCreateClose) teamCreateClose.addEventListener('click', () => setTeamModalOpen(teamCreateModal, false));

  if (teamCreateForm) {
    teamCreateForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const name = String(teamCreateNameInput?.value || '').trim();
      const sport = String(teamCreateSportInput?.value || 'Футбол').trim();
      const level = String(teamCreateLevelInput?.value || 'Любитель+').trim();
      if (!name) return;
      const nextTeam = {
        id: `team-${Date.now()}`,
        name,
        subtitle: `${sport} • ${level}`,
        city: 'Москва',
        areaShort: 'ЦАО',
        logoText: name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase() || 'SP',
        status: 'active',
        maxPlayers: 12,
        playedGames: 0,
        wins: 0,
        attendance: 0,
        avgLevel: level,
        district: 'Район не указан',
        sport,
        opponentsFound: 0,
        members: [{ id: `captain-${Date.now()}`, name: 'Вы', position: 'Капитан', role: 'captain' }],
        requests: [],
        events: []
      };
      TEAM_FIXTURE.unshift(nextTeam);
      teamState.selectedTeamId = nextTeam.id;
      teamState.visibleMembers = 6;
      setTeamModalOpen(teamCreateModal, false);
      renderTeamSection();
      showGamesToast('Команда создана');
    });
  }

  if (teamEventOverlay) teamEventOverlay.addEventListener('click', () => setTeamModalOpen(teamEventModal, false));
  if (teamEventClose) teamEventClose.addEventListener('click', () => setTeamModalOpen(teamEventModal, false));

  if (teamCreateGameButton) {
    teamCreateGameButton.addEventListener('click', () => {
      state.section = 'games';
      render();
      openCreateGameModal();
    });
  }

  if (teamFindOpponentButton) {
    teamFindOpponentButton.addEventListener('click', () => {
      const team = getSelectedTeam();
      team.opponentsFound = Math.max(4, team.opponentsFound + Math.floor(Math.random() * 4));
      renderTeamSection();
      showGamesToast('Подбор соперников обновлен');
    });
  }
}

function clonePlainProfile(profile) {
  return JSON.parse(JSON.stringify(profile));
}

function mergeUserProfile(base, saved) {
  if (!saved || typeof saved !== 'object') return clonePlainProfile(base);
  const profile = clonePlainProfile(base);
  Object.assign(profile, saved);
  profile.stats = { ...base.stats, ...(saved.stats || {}) };
  profile.preferences = { ...base.preferences, ...(saved.preferences || {}) };
  profile.notifications = { ...base.notifications, ...(saved.notifications || {}) };
  profile.account = { ...base.account, ...(saved.account || {}) };
  profile.nextGame = { ...base.nextGame, ...(saved.nextGame || {}) };
  profile.sports = Array.isArray(saved.sports) ? saved.sports : profile.sports;
  return profile;
}

function loadUserProfile() {
  try {
    const raw = window.localStorage ? window.localStorage.getItem(PROFILE_STORAGE_KEY) : '';
    return mergeUserProfile(defaultUserProfile, raw ? JSON.parse(raw) : null);
  } catch (error) {
    return clonePlainProfile(defaultUserProfile);
  }
}

function saveUserProfile() {
  try {
    if (window.localStorage) window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(userProfile));
  } catch (error) {
    // Local storage can be unavailable for file:// in some browsers; UI still works in memory.
  }
}

function getProfileAvatarSrc(avatarId = userProfile.avatarId) {
  const avatar = profileAvatars.find((item) => Number(item.id) === Number(avatarId));
  return avatar ? avatar.src : profileAvatars[0].src;
}

function getSportConfig(type) {
  return profileSportsCatalog.find((item) => item.type === type);
}

function getSportFieldLabel(key) {
  const labels = {
    level: 'Уровень',
    position: 'Позиция',
    foot: 'Рабочая нога',
    hand: 'Ведущая рука',
    role: 'Амплуа',
    distance: 'Дистанция'
  };
  return labels[key] || key;
}

function getSportSummary(sport) {
  return Object.entries(sport)
    .filter(([key]) => !['type', 'title'].includes(key))
    .map(([key, value]) => ({ label: getSportFieldLabel(key), value }))
    .filter((item) => item.value);
}

function renderProfileTabs() {
  profileTabs.forEach((button) => {
    const isActive = button.dataset.profileTab === profileState.tab;
    button.classList.toggle('is-active', isActive);
    button.setAttribute('aria-selected', isActive ? 'true' : 'false');
  });

  profilePanels.forEach((panel) => {
    panel.classList.toggle('is-active', panel.dataset.profilePanel === profileState.tab);
  });
}

function renderProfileIdentity() {
  const sportsText = userProfile.sports.map((sport) => sport.title).slice(0, 3).join(' • ') || 'Спорт не выбран';
  const stats = userProfile.stats || defaultUserProfile.stats;
  const nextGame = userProfile.nextGame || defaultUserProfile.nextGame;
  const progress = Math.max(0, Math.min(100, Math.round((Number(stats.levelScore) / Math.max(1, Number(stats.levelTarget))) * 100)));
  const remaining = Math.max(0, Number(stats.levelTarget) - Number(stats.levelScore));

  if (profileMainAvatar) profileMainAvatar.src = getProfileAvatarSrc();
  if (avatarFace) avatarFace.src = getProfileAvatarSrc();
  if (profileNameTitle) profileNameTitle.textContent = userProfile.name;
  if (profileMetaText) profileMetaText.textContent = `${sportsText} • ${userProfile.district}`;
  if (profileSportChips) {
    profileSportChips.innerHTML = userProfile.sports.slice(0, 4).map((sport) => {
      const config = getSportConfig(sport.type);
      return `<span>${escapeHtml(config?.icon || '•')} ${escapeHtml(sport.title)}</span>`;
    }).join('') || '<span>Добавьте спорт</span>';
  }
  if (profileAboutText) profileAboutText.textContent = userProfile.about;
  if (profileStatGames) profileStatGames.textContent = String(stats.games);
  if (profileStatWins) profileStatWins.textContent = String(stats.wins);
  if (profileStatTeams) profileStatTeams.textContent = String(stats.teams);
  if (profileStatAttendance) profileStatAttendance.textContent = `${stats.attendance || 91}%`;
  if (profileNextGameButton && nextGame) {
    profileNextGameButton.innerHTML = `
      <span>Ближайшая игра</span>
      <strong>${escapeHtml(nextGame.time)}</strong>
      <small>${escapeHtml(nextGame.place)}</small>
    `;
  }
  if (profileLevelLabel) profileLevelLabel.textContent = `${stats.levelFrom} → ${stats.levelTo}`;
  if (profileLevelScore) profileLevelScore.textContent = `${stats.levelScore}/${stats.levelTarget}`;
  if (profileLevelProgress) profileLevelProgress.style.width = `${progress}%`;
  if (profileLevelNote) profileLevelNote.textContent = remaining > 0 ? `Еще ${remaining} игр до уровня “${stats.levelTo}”` : `Уровень “${stats.levelTo}” открыт`;
  if (profileFavoriteSport) profileFavoriteSport.textContent = userProfile.sports[0]?.title || 'Не выбран';
  if (profileBestTime) profileBestTime.textContent = userProfile.preferences.time;
}

function renderProfileGames() {
  profileGameFilterButtons.forEach((button) => {
    const isActive = button.dataset.profileGamesFilter === profileState.gamesFilter;
    button.classList.toggle('is-active', isActive);
  });

  if (!profileGamesList) return;
  const filtered = profileGames.filter((game) => game.type === profileState.gamesFilter);
  profileGamesList.innerHTML = filtered.map((game) => `
    <button class="profile-game-row is-${escapeAttr(game.tone)}" type="button">
      <span class="profile-game-icon is-${escapeAttr(game.tone)}" aria-hidden="true">${escapeHtml(game.icon)}</span>
      <span class="profile-game-main">
        <strong>${escapeHtml(game.title)}</strong>
        <span class="profile-game-meta">
          <small>${escapeHtml(game.date)}</small>
          <small>${escapeHtml(game.place)}</small>
        </span>
      </span>
      <span class="profile-game-side">
        <span class="profile-game-status is-${escapeAttr(game.tone)}">${escapeHtml(game.status)}</span>
        <span class="profile-game-arrow" aria-hidden="true">›</span>
      </span>
    </button>
  `).join('') || '<p class="profile-empty-note">Здесь пока нет игр</p>';
}

function renderProfileSettings() {
  if (!profileSettingsContent) return;
  profileSettingsContent.innerHTML = `
    <section class="profile-settings-card profile-card-main-info">
      <div class="profile-settings-head">
        <span class="profile-card-kicker">Профиль</span>
        <h2>Основная информация</h2>
      </div>
      <div class="profile-settings-grid">
        <label class="profile-field">Имя
          <input id="profile-name-input" type="text" value="${escapeAttr(userProfile.name)}" autocomplete="name">
        </label>
        <label class="profile-field">Район
          <input id="profile-district-input" type="text" value="${escapeAttr(userProfile.district)}">
        </label>
        <label class="profile-field is-wide">О себе
          <textarea id="profile-about-input" rows="3">${escapeHtml(userProfile.about)}</textarea>
        </label>
      </div>
    </section>

    <section class="profile-settings-card profile-avatar-card">
      <div class="profile-settings-head">
        <span class="profile-card-kicker">Внешний вид</span>
        <h2>Аватар</h2>
      </div>
      <div class="profile-avatar-compact">
        <img src="${escapeAttr(getProfileAvatarSrc())}" alt="Текущий аватар">
        <div>
          <strong>${escapeHtml(userProfile.name)}</strong>
          <p>Этот аватар видят игроки и организаторы.</p>
        </div>
        <button class="profile-btn-secondary" type="button" data-profile-open-avatar>Изменить аватар</button>
      </div>
    </section>

    ${renderSportsData()}
    ${renderPreferences()}
    ${renderAccountSettings()}
  `;
}

function renderSportsData() {
  const sportsMarkup = userProfile.sports.map((sport) => {
    const config = getSportConfig(sport.type);
    const icon = config?.icon || '•';
    const details = getSportSummary(sport).map((item) => `
      <span><small>${escapeHtml(item.label)}</small><strong>${escapeHtml(item.value)}</strong></span>
    `).join('');
    return `
      <article class="profile-sport-card">
        <div class="profile-sport-top">
          <span class="profile-sport-icon" aria-hidden="true">${escapeHtml(icon)}</span>
          <div>
            <h3>${escapeHtml(sport.title)}</h3>
            <p>${escapeHtml(sport.level || 'Уровень не указан')}</p>
          </div>
        </div>
        <div class="profile-sport-details">${details}</div>
        <div class="profile-sport-actions">
          <button class="profile-btn-secondary" type="button" data-profile-edit-sport="${escapeAttr(sport.type)}">Редактировать</button>
          <button class="profile-btn-danger" type="button" data-profile-delete-sport="${escapeAttr(sport.type)}">Удалить</button>
        </div>
      </article>
    `;
  }).join('');

  return `
    <section class="profile-settings-card profile-sports-card">
      <div class="profile-settings-head-row">
        <div class="profile-settings-head">
          <span class="profile-card-kicker">Подбор игр</span>
          <h2>Спортивные данные</h2>
          <p>У каждого спорта свои параметры — так SCORE точнее подбирает игры.</p>
        </div>
        <button class="profile-btn-primary" type="button" data-profile-add-sport>Добавить спорт</button>
      </div>
      <div class="profile-sports-list">
        ${sportsMarkup || '<p class="profile-empty-note">Добавьте первый спорт, чтобы настроить подбор игр.</p>'}
      </div>
    </section>
  `;
}

function renderPreferences() {
  return `
    <section class="profile-settings-card profile-preferences-card">
      <div class="profile-settings-head">
        <span class="profile-card-kicker">Рекомендации</span>
        <h2>Игровые предпочтения</h2>
      </div>
      <div class="profile-preference-grid">
        ${profilePreferenceGroups.map((group) => `
          <div class="profile-preference-group">
            <h3>${escapeHtml(group.title)}</h3>
            <div class="profile-chip-row">
              ${group.options.map((option) => `
                <button class="profile-segment ${userProfile.preferences[group.key] === option ? 'is-active' : ''}" type="button" data-profile-preference="${escapeAttr(group.key)}" data-profile-value="${escapeAttr(option)}">${escapeHtml(option)}</button>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    </section>
  `;
}

function renderAccountSettings() {
  return `
    <section class="profile-settings-card profile-account-card">
      <div class="profile-settings-head">
        <span class="profile-card-kicker">Аккаунт</span>
        <h2>Аккаунт и безопасность</h2>
      </div>
      <div class="profile-account-grid">
        <div><span>Телефон</span><strong>${escapeHtml(userProfile.account.phone)}</strong></div>
        <div><span>Email</span><strong>${escapeHtml(userProfile.account.email)}</strong></div>
      </div>
      <div class="profile-account-actions">
        <button class="profile-btn-secondary" type="button" data-profile-password>Изменить пароль</button>
        <button class="profile-btn-danger is-soft" type="button" data-profile-logout>Выйти из аккаунта</button>
      </div>
    </section>
  `;
}

function renderAvatarPicker() {
  if (!profileAvatarPickerGrid) return;
  profileAvatarPickerGrid.innerHTML = profileAvatars.map((avatar) => `
    <button class="profile-avatar-choice ${Number(profileState.avatarDraftId) === Number(avatar.id) ? 'is-active' : ''}" type="button" data-profile-avatar-id="${avatar.id}" aria-label="Выбрать аватар ${avatar.id}">
      <img src="${escapeAttr(avatar.src)}" alt="">
    </button>
  `).join('');
}

function renderSportForm() {
  if (!profileSportModalContent) return;
  const addedTypes = new Set(userProfile.sports.map((sport) => sport.type));
  const availableSports = profileSportsCatalog.filter((sport) => !addedTypes.has(sport.type));

  if (profileState.sportModalMode === 'select') {
    profileSportModalContent.innerHTML = `
      <div class="profile-modal-head">
        <span class="profile-card-kicker">Спорт</span>
        <h3 id="profile-sport-title">Добавить спорт</h3>
        <p>Выберите вид спорта, а затем настройте уровень и параметры.</p>
      </div>
      <div class="profile-sport-select-grid">
        ${availableSports.map((sport) => `
          <button class="profile-sport-select" type="button" data-profile-select-sport="${escapeAttr(sport.type)}">
            <span>${escapeHtml(sport.icon)}</span>
            <strong>${escapeHtml(sport.title)}</strong>
          </button>
        `).join('') || '<p class="profile-empty-note">Все доступные виды спорта уже добавлены.</p>'}
      </div>
      <div class="profile-modal-actions">
        <button class="profile-btn-secondary" type="button" data-profile-cancel-sport>Отмена</button>
      </div>
    `;
    return;
  }

  const draft = profileState.sportDraft;
  const config = getSportConfig(draft?.type);
  if (!draft || !config) return;
  profileSportModalContent.innerHTML = `
    <div class="profile-modal-head">
      <span class="profile-card-kicker">${profileState.sportModalMode === 'edit' ? 'Редактирование' : 'Новый спорт'}</span>
      <h3 id="profile-sport-title">${escapeHtml(config.icon)} ${escapeHtml(config.title)}</h3>
      <p>Настройте параметры, чтобы подбор игр был точнее.</p>
    </div>
    <form id="profile-sport-form" class="profile-sport-form">
      ${config.fields.map((field) => `
        <fieldset class="profile-form-group">
          <legend>${escapeHtml(field.label)}</legend>
          <div class="profile-chip-row">
            ${field.options.map((option) => `
              <label class="profile-radio-chip ${draft[field.key] === option ? 'is-active' : ''}">
                <input type="radio" name="${escapeAttr(field.key)}" value="${escapeAttr(option)}" ${draft[field.key] === option ? 'checked' : ''}>
                <span>${escapeHtml(option)}</span>
              </label>
            `).join('')}
          </div>
        </fieldset>
      `).join('')}
    </form>
    <div class="profile-modal-actions">
      <button class="profile-btn-secondary" type="button" data-profile-cancel-sport>Отмена</button>
      <button class="profile-btn-primary" type="button" data-profile-save-sport>Сохранить</button>
    </div>
  `;
}

function renderProfile() {
  if (!profileSection) return;
  renderProfileTabs();
  renderProfileIdentity();
  renderProfileGames();
  renderProfileSettings();
  renderAvatarPicker();
  renderSportForm();
}

function changeAvatar(avatarId) {
  userProfile.avatarId = Number(avatarId) || userProfile.avatarId;
  profileState.avatarDraftId = userProfile.avatarId;
  saveUserProfile();
  closeAvatarModal();
  renderProfile();
  showGamesToast('Аватар обновлен');
}

function openAvatarModal() {
  if (!profileAvatarModal) return;
  profileState.avatarDraftId = userProfile.avatarId;
  renderAvatarPicker();
  profileAvatarModal.hidden = false;
  profileAvatarModal.setAttribute('aria-hidden', 'false');
  refreshModalBodyLock();
}

function closeAvatarModal() {
  if (!profileAvatarModal) return;
  profileAvatarModal.hidden = true;
  profileAvatarModal.setAttribute('aria-hidden', 'true');
  refreshModalBodyLock();
}

function openAddSportModal() {
  if (!profileSportModal) return;
  profileState.sportModalMode = 'select';
  profileState.editingSportType = '';
  profileState.sportDraft = null;
  renderSportForm();
  profileSportModal.hidden = false;
  profileSportModal.setAttribute('aria-hidden', 'false');
  refreshModalBodyLock();
}

function openEditSportModal(sportType) {
  const currentSport = userProfile.sports.find((sport) => sport.type === sportType);
  if (!profileSportModal || !currentSport) return;
  profileState.sportModalMode = 'edit';
  profileState.editingSportType = sportType;
  profileState.sportDraft = { ...currentSport };
  renderSportForm();
  profileSportModal.hidden = false;
  profileSportModal.setAttribute('aria-hidden', 'false');
  refreshModalBodyLock();
}

function closeSportModal() {
  if (!profileSportModal) return;
  profileSportModal.hidden = true;
  profileSportModal.setAttribute('aria-hidden', 'true');
  profileState.sportModalMode = 'select';
  profileState.editingSportType = '';
  profileState.sportDraft = null;
  refreshModalBodyLock();
}

function selectSportForForm(sportType) {
  const config = getSportConfig(sportType);
  if (!config) return;
  profileState.sportModalMode = 'form';
  profileState.editingSportType = '';
  profileState.sportDraft = { type: config.type, title: config.title, ...config.defaults };
  renderSportForm();
}

function syncSportDraftFromForm() {
  const form = document.querySelector('#profile-sport-form');
  if (!form || !profileState.sportDraft) return;
  const formData = new FormData(form);
  const nextDraft = { ...profileState.sportDraft };
  for (const [key, value] of formData.entries()) nextDraft[key] = String(value);
  profileState.sportDraft = nextDraft;
}

function saveSport() {
  syncSportDraftFromForm();
  const draft = profileState.sportDraft;
  if (!draft) return;
  const existsIndex = userProfile.sports.findIndex((sport) => sport.type === draft.type);
  if (existsIndex >= 0) userProfile.sports[existsIndex] = { ...draft };
  else userProfile.sports.push({ ...draft });
  saveUserProfile();
  closeSportModal();
  renderProfile();
  showGamesToast('Спорт сохранен');
}

function deleteSport(sportType) {
  userProfile.sports = userProfile.sports.filter((sport) => sport.type !== sportType);
  saveUserProfile();
  renderProfile();
  showGamesToast('Спорт удален');
}

function updatePreference(key, value) {
  userProfile.preferences[key] = value;
  saveUserProfile();
  renderProfile();
}

function toggleNotification(key) {
  userProfile.notifications[key] = !userProfile.notifications[key];
  saveUserProfile();
  renderProfile();
}

function updateProfileTextField(key, value) {
  userProfile[key] = value;
  saveUserProfile();
  renderProfileIdentity();
}

function initProfileSection() {
  if (avatarButton) {
    avatarButton.addEventListener('click', () => {
      state.section = 'profile';
      state.quickAction = '';
      render();
    });
  }

  if (profileEditButton) {
    profileEditButton.addEventListener('click', () => {
      profileState.tab = 'settings';
      renderProfile();
      document.querySelector('#profile-name-input')?.focus();
    });
  }

  if (profileNextGameButton) {
    profileNextGameButton.addEventListener('click', () => {
      profileState.tab = 'games';
      profileState.gamesFilter = 'joined';
      renderProfile();
    });
  }

  profileTabs.forEach((button) => {
    button.addEventListener('click', () => {
      profileState.tab = button.dataset.profileTab || 'stats';
      renderProfile();
    });
  });

  profileGameFilterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      profileState.gamesFilter = button.dataset.profileGamesFilter || 'joined';
      renderProfileGames();
    });
  });

  if (profileSettingsContent) {
    profileSettingsContent.addEventListener('input', (event) => {
      const target = event.target;
      if (!(target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement)) return;
      if (target.id === 'profile-name-input') updateProfileTextField('name', target.value.trim() || 'Игрок SCORE');
      if (target.id === 'profile-district-input') updateProfileTextField('district', target.value.trim() || 'Москва');
      if (target.id === 'profile-about-input') updateProfileTextField('about', target.value.trim() || 'Расскажите о себе в пару строк.');
    });

    profileSettingsContent.addEventListener('click', (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      const avatarButtonEl = target.closest('[data-profile-open-avatar]');
      const addSportButtonEl = target.closest('[data-profile-add-sport]');
      const editSportButtonEl = target.closest('[data-profile-edit-sport]');
      const deleteSportButtonEl = target.closest('[data-profile-delete-sport]');
      const preferenceButtonEl = target.closest('[data-profile-preference]');
      const passwordButtonEl = target.closest('[data-profile-password]');
      const logoutButtonEl = target.closest('[data-profile-logout]');

      if (avatarButtonEl) openAvatarModal();
      if (addSportButtonEl) openAddSportModal();
      if (editSportButtonEl) openEditSportModal(editSportButtonEl.getAttribute('data-profile-edit-sport') || '');
      if (deleteSportButtonEl) deleteSport(deleteSportButtonEl.getAttribute('data-profile-delete-sport') || '');
      if (preferenceButtonEl) updatePreference(preferenceButtonEl.getAttribute('data-profile-preference') || '', preferenceButtonEl.getAttribute('data-profile-value') || '');
      if (passwordButtonEl) showGamesToast('Смена пароля скоро появится');
      if (logoutButtonEl) showGamesToast('Выход из аккаунта будет подключен позже');
    });

    profileSettingsContent.addEventListener('change', (event) => {
      const target = event.target;
      if (!(target instanceof HTMLInputElement)) return;
      const notificationKey = target.getAttribute('data-profile-notification');
      if (notificationKey) toggleNotification(notificationKey);
    });
  }

  if (profileAvatarPickerGrid) {
    profileAvatarPickerGrid.addEventListener('click', (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      const button = target.closest('[data-profile-avatar-id]');
      if (!button) return;
      profileState.avatarDraftId = Number(button.getAttribute('data-profile-avatar-id')) || userProfile.avatarId;
      renderAvatarPicker();
    });
  }

  if (profileAvatarSave) profileAvatarSave.addEventListener('click', () => changeAvatar(profileState.avatarDraftId));
  if (profileAvatarOverlay) profileAvatarOverlay.addEventListener('click', closeAvatarModal);
  if (profileAvatarClose) profileAvatarClose.addEventListener('click', closeAvatarModal);
  if (profileAvatarCancel) profileAvatarCancel.addEventListener('click', closeAvatarModal);

  if (profileSportModalContent) {
    profileSportModalContent.addEventListener('click', (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      const selectButton = target.closest('[data-profile-select-sport]');
      if (selectButton) selectSportForForm(selectButton.getAttribute('data-profile-select-sport') || '');
      if (target.closest('[data-profile-save-sport]')) saveSport();
      if (target.closest('[data-profile-cancel-sport]')) closeSportModal();
    });

    profileSportModalContent.addEventListener('change', (event) => {
      const target = event.target;
      if (!(target instanceof HTMLInputElement)) return;
      syncSportDraftFromForm();
      renderSportForm();
    });
  }

  if (profileSportOverlay) profileSportOverlay.addEventListener('click', closeSportModal);
  if (profileSportClose) profileSportClose.addEventListener('click', closeSportModal);
}

function rerenderGames() {
  renderGamesFilterLabels();
  renderGamesFilterMenus();
  renderGamesActiveTokens();
  renderGameCards();
}

function loadGamesFixtures() {
  gamesState.loading = true;
  renderGameCards();
  window.setTimeout(() => {
    const fixtureItems = FIXTURE_GAMES.map((game) => ({ ...game }));
    const existing = Array.isArray(gamesState.items) ? gamesState.items.slice() : [];
    if (existing.length === 0) {
      gamesState.items = fixtureItems;
    } else {
      const existingIds = new Set(existing.map((item) => String(item.id || '')));
      const missingFixtures = fixtureItems.filter((item) => !existingIds.has(String(item.id || '')));
      gamesState.items = [...existing, ...missingFixtures];
    }
    gamesState.loading = false;
    gamesState.loaded = true;
    gamesState.error = '';
    rerenderGames();
  }, 120);
}

function handleGamesMenuClicks(event) {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;
  const toggleKey = target.closest('[data-games-menu]')?.getAttribute('data-games-menu') || '';
  const singleKey = target.closest('[data-games-single]')?.getAttribute('data-games-single') || '';
  const locationKey = target.closest('[data-games-location]')?.getAttribute('data-games-location') || '';
  const value = target.closest('[data-games-value]')?.getAttribute('data-games-value') || '';
  if (!value) return;

  if (toggleKey === 'sport') {
    if (gamesState.filters.sports.has(value)) gamesState.filters.sports.delete(value);
    else gamesState.filters.sports.add(value);
  }
  if (toggleKey === 'time') {
    if (gamesState.filters.time.has(value)) gamesState.filters.time.delete(value);
    else gamesState.filters.time.add(value);
  }
  if (toggleKey === 'level') {
    if (gamesState.filters.levels.has(value)) gamesState.filters.levels.delete(value);
    else gamesState.filters.levels.add(value);
  }
  if (toggleKey === 'format') {
    if (gamesState.filters.formats.has(value)) gamesState.filters.formats.delete(value);
    else gamesState.filters.formats.add(value);
  }
  if (toggleKey === 'gender') {
    if (gamesState.filters.genders.has(value)) gamesState.filters.genders.delete(value);
    else gamesState.filters.genders.add(value);
  }

  if (singleKey === 'date') {
    gamesState.filters.date = gamesState.filters.date === value ? '' : value;
    if (gamesState.filters.date !== 'custom') gamesState.filters.customDate = '';
  }
  if (singleKey === 'cost') gamesState.filters.cost = gamesState.filters.cost === value ? '' : value;
  if (singleKey === 'seats') gamesState.filters.freeSeats = gamesState.filters.freeSeats === value ? '' : value;

  if (locationKey === 'metro') {
    if (gamesState.filters.metros.has(value)) gamesState.filters.metros.delete(value);
    else gamesState.filters.metros.add(value);
  }
  if (locationKey === 'district') {
    if (gamesState.filters.districts.has(value)) gamesState.filters.districts.delete(value);
    else gamesState.filters.districts.add(value);
  }
  if (locationKey === 'radius') gamesState.filters.radius = gamesState.filters.radius === value ? '' : value;
  rerenderGames();
}

function initGamesSection() {
  if (!gamesGrid) return;

  if (gamesSearchInput) {
    gamesSearchInput.addEventListener('input', () => {
      gamesState.filters.query = gamesSearchInput.value.trim();
      if (gamesSearchClear) gamesSearchClear.hidden = gamesState.filters.query.length === 0;
      trackGamesEvent('search_games', { query: gamesState.filters.query });
      rerenderGames();
    });
  }
  if (gamesSearchClear) {
    gamesSearchClear.addEventListener('click', () => {
      gamesState.filters.query = '';
      if (gamesSearchInput) gamesSearchInput.value = '';
      gamesSearchClear.hidden = true;
      rerenderGames();
    });
  }

  if (gamesTodayButton) gamesTodayButton.addEventListener('click', () => { gamesState.filters.today = !gamesState.filters.today; rerenderGames(); });
  if (gamesFreeButton) gamesFreeButton.addEventListener('click', () => { gamesState.filters.free = !gamesState.filters.free; rerenderGames(); });
  if (gamesNewButton) gamesNewButton.addEventListener('click', () => { gamesState.filters.isNew = !gamesState.filters.isNew; rerenderGames(); });
  if (gamesAlmostButton) gamesAlmostButton.addEventListener('click', () => { gamesState.filters.almostFull = !gamesState.filters.almostFull; rerenderGames(); });
  if (gamesSlotsButton) gamesSlotsButton.addEventListener('click', () => { gamesState.filters.hasSlots = !gamesState.filters.hasSlots; rerenderGames(); });
  if (gamesCoachButton) gamesCoachButton.addEventListener('click', () => { gamesState.filters.hasCoach = !gamesState.filters.hasCoach; rerenderGames(); });

  [gamesSportMenu, gamesDateMenu, gamesTimeMenu, gamesLevelMenu, gamesFormatMenu, gamesPriceMenu, gamesLocationMenu, gamesSeatsMenu, gamesGenderMenu]
    .forEach((menu) => {
      if (!menu) return;
      menu.addEventListener('click', handleGamesMenuClicks);
    });

  const gamesDropdowns = [
    gamesSportDropdown,
    gamesDateDropdown,
    gamesTimeDropdown,
    gamesLevelDropdown,
    gamesFormatDropdown,
    gamesPriceDropdown,
    gamesLocationDropdown,
    gamesSeatsDropdown,
    gamesGenderDropdown
  ];

  gamesDropdowns
    .forEach((dropdown) => {
      if (!dropdown) return;
      dropdown.addEventListener('toggle', () => {
        renderGamesFilterLabels();
        if (!dropdown.open) return;
        gamesDropdowns.forEach((other) => {
          if (other && other !== dropdown && other.open) other.removeAttribute('open');
        });
      });
    });

  if (gameModalOverlay) gameModalOverlay.addEventListener('click', closeGameDetails);
  if (gameModalClose) gameModalClose.addEventListener('click', closeGameDetails);
  if (gamesCreateButton) gamesCreateButton.addEventListener('click', openCreateGameModal);
  if (gameCreateOverlay) gameCreateOverlay.addEventListener('click', closeCreateGameModal);
  if (gameCreateClose) gameCreateClose.addEventListener('click', closeCreateGameModal);

  if (gameCreateContent) {
    gameCreateContent.addEventListener('click', (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      const action = target.closest('[data-create-action]')?.getAttribute('data-create-action') || '';
      if (!action) return;
      if (action === 'cancel') closeCreateGameModal();
      if (action === 'back') handleCreateGameBack();
      if (action === 'next') handleCreateGameNext();
      if (action === 'submit') handleCreateGameSubmit();
    });
  }

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    if (gameCreateModal && !gameCreateModal.hidden) {
      closeCreateGameModal();
      return;
    }
    if (gameModal && !gameModal.hidden) {
      closeGameDetails();
      return;
    }
    if ((teamRequestsModal && !teamRequestsModal.hidden) || (teamEventModal && !teamEventModal.hidden) || (teamCreateModal && !teamCreateModal.hidden)) {
      closeTeamModals();
      return;
    }
    if (profileAvatarModal && !profileAvatarModal.hidden) {
      closeAvatarModal();
      return;
    }
    if (profileSportModal && !profileSportModal.hidden) {
      closeSportModal();
    }
  });

  renderGamesFilterLabels();
  renderGamesFilterMenus();
  renderGamesActiveTokens();
  renderGameCards();
}

function ensureGamesLoadedOnFirstOpen() {
  if (!gamesGrid) return;
  if (state.section !== 'games') return;
  if (gamesState.loaded || gamesState.loading) return;
  trackGamesEvent('view_games_section');
  loadGamesFixtures();
}

function render() {
  renderNavState();
  renderPanels();
  mountSharedFiltersForActiveSection();
  renderFilterLabels();
  renderFilterButtons();
  renderFilterMenus();
  renderSportActiveRow();
  renderVenueCards();
  ensureGamesLoadedOnFirstOpen();
  renderGamesFilterLabels();
  renderGamesActiveTokens();
  renderGameCards();
  renderTeamSection();
  renderProfile();
  requestAnimationFrame(fitAllOpenDropdownMenus);
  document.body.dataset.venuesCount = String(getFilteredVenues().length);
  updateNavIndicator();
}

sectionButtons.forEach((button) => button.addEventListener('click', () => {
  state.section = button.dataset.section;
  state.quickAction = '';
  render();
}));

quickButtons.forEach((button) => button.addEventListener('click', () => {
  const key = button.dataset.quick || '';
  state.quickAction = state.quickAction === key ? '' : key;
  renderNavState();
}));

if (notificationsButton) {
  notificationsButton.addEventListener('mouseenter', () => retriggerClass(notificationsButton, 'is-bell-hover'));
  notificationsButton.addEventListener('mouseleave', () => retriggerClass(notificationsButton, 'is-bell-leave'));
}

if (settingsButton) {
  settingsButton.addEventListener('mouseenter', () => {
    clearSettingsSettleTimer();
    setSettingsRotation(45);
  });
  settingsButton.addEventListener('mouseleave', () => {
    clearSettingsSettleTimer();
    setSettingsRotation(settingsRotationDeg - 45);
    settleSettingsRotation(200);
  });
}

if (searchInput) {
  searchInput.addEventListener('input', (event) => {
    state.filters.query = event.target.value.trim();
    render();
  });
}

if (newButton) newButton.addEventListener('click', () => { state.filters.isNew = !state.filters.isNew; render(); });
if (favoriteButton) favoriteButton.addEventListener('click', () => { state.filters.isFavorite = !state.filters.isFavorite; render(); });
if (freeButton) freeButton.addEventListener('click', () => { state.filters.isFree = !state.filters.isFree; render(); });

filterDropdowns.forEach((dropdown) => {
  dropdown.addEventListener('toggle', () => {
    if (dropdown.open) {
      filterDropdowns.forEach((other) => {
        if (other !== dropdown && other.open) {
          if (other === locationDropdown) closeLocationDropdownAnimated();
          else other.removeAttribute('open');
        }
      });
      const menu = dropdown.querySelector('.filter-menu');
      if (menu) delete menu.dataset.anim;
      fitDropdownMenuToViewport(dropdown);
      if (menu) {
        void menu.offsetWidth;
        menu.dataset.anim = '1';
      }
    } else {
      const menu = dropdown.querySelector('.filter-menu');
      if (menu) delete menu.dataset.anim;
    }
    requestAnimationFrame(() => renderFilterLabels());
  });
});

document.addEventListener('pointerdown', (event) => {
  const target = event.target;
  if (!(target instanceof Node)) return;
  filterDropdowns.forEach((dropdown) => {
    if (dropdown.open && !dropdown.contains(target)) {
      if (dropdown === locationDropdown) closeLocationDropdownAnimated();
      else dropdown.removeAttribute('open');
    }
  });
});

if (amenitiesDropdown) {
  amenitiesDropdown.addEventListener('toggle', () => {
    if (amenitiesDropdown.open) {
      state.amenitiesDraft = cloneSet(state.filters.amenities);
      state.amenitiesDraftQuery = '';
      renderAmenitiesMenu();
    }
    renderFilterLabels();
  });
}

if (sportDropdown) {
  sportDropdown.addEventListener('toggle', () => {
    if (sportDropdown.open) {
      state.sportDraft = cloneSet(state.filters.sports);
      state.sportDraftQuery = '';
      renderSportMenu();
    }
    renderFilterLabels();
  });
}

if (priceDropdown) {
  priceDropdown.addEventListener('toggle', () => {
    if (!priceDropdown.open) return;
    state.priceDraft.min = state.filters.priceMin;
    state.priceDraft.max = state.filters.priceMax;
    renderPriceMenu();
  });
}

if (metroDropdown) {
  metroDropdown.addEventListener('toggle', () => {
    if (!metroDropdown.open) return;
    resetMetroDraftFromFilters();
    renderMetroMenu();
  });
}

if (locationDropdown) {
  locationDropdown.addEventListener('toggle', () => {
    if (locationDropdown.open) {
      if (locationMenu) {
        locationMenu.dataset.anim = '1';
        window.setTimeout(() => {
          if (!locationMenu) return;
          delete locationMenu.dataset.anim;
        }, LOCATION_SHEET_OPEN_ANIM_MS);
      }
    }
    document.body.classList.toggle('location-sheet-open', locationDropdown.open);
    if (!locationDropdown.open) {
      if (locationMenu) delete locationMenu.dataset.anim;
      return;
    }
    resetMetroDraftFromFilters();
    state.metroDraft.tab = 'metro';
    renderLocationGeoMenu();
  });
}

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  if (state.selectedVenueId) {
    state.selectedVenueId = null;
    render();
    return;
  }
  if (locationDropdown && locationDropdown.open) closeLocationDropdownAnimated();
  if (metroDropdown && metroDropdown.open) metroDropdown.removeAttribute('open');
});

window.addEventListener('resize', updateNavIndicator);
window.addEventListener('resize', fitAllOpenDropdownMenus);
window.addEventListener('load', updateNavIndicator);

initAuth();
initGamesSection();
initTeamSection();
initProfileSection();
render();
