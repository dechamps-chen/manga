type LanguageType = {
  label: string;
  value: string;
  navigator: string;
}

export const LANGUAGES: LanguageType[] = [
  {
    label: "English",
    value: "en",
    navigator: "en-US",
  },
  {
    label: "中文(简体)",
    value: "zh",
    navigator: "zh-CN",
  },
  {
    label: "中文(繁體)",
    value: "zh-hk",
    navigator: "zh-HK",
  },
  {
    label: "Español",
    value: "es-la",
    navigator: "es",
  },
  {
    label: "Italiano",
    value: "it",
    navigator: "it",
  },
  {
    label: "Português",
    value: "pt-br",
    navigator: "pt",
  },
  {
    label: "Deutsch",
    value: "de",
    navigator: "de-DE",
  },
  {
    label: "Français",
    value: "fr",
    navigator: "fr-FR",
  },
  {
    label: "日本語",
    value: "ja",
    navigator: "ja",
  },
]

interface Resources {
  [key: string]: {
    [label: string]: string;
  };
}

export const resources: Resources = {
  "en": {
    homeTitle: "Manga - Read unlimited free manga online",
    language: "Language",
    familySafe: "Family Safe",
    lastestUpdates: "Latest Updates",
    popular: "Popular Mangas",
    recentlyAdded: "New Mangas",
    order: "Order",
    asc: "ASC",
    desc: "DESC",
    expand: "Expand",
    reduce: "Reduce",
  },
  "zh": {
    homeTitle: "Manga - Read unlimited free manga online",
    language: "语言",
    familySafe: "安全模式",
    lastestUpdates: "今日更新",
    popular: "人气漫画",
    recentlyAdded: "最新漫画",
    order: "排序",
    asc: "顺序",
    desc: "倒序",
    expand: "展开",
    reduce: "收缩",
  },
  "zh-hk": {
    homeTitle: "Manga - Read unlimited free manga online",
    language: "語言",
    familySafe: "安全模式",
    lastestUpdates: "Latest Updates",
    popular: "Popular Mangas",
    recentlyAdded: "New Mangas",
    order: "Order",
    asc: "ASC",
    desc: "DESC",
    expand: "Expand",
    reduce: "Reduce",
  },
  "es-la": {
    homeTitle: "Manga - Read unlimited free manga online",
    language: "Idioma",
    familySafe: "Modo Familiar",
    lastestUpdates: "Latest Updates",
    popular: "Popular Mangas",
    recentlyAdded: "New Mangas",
    order: "Order",
    asc: "ASC",
    desc: "DESC",
    expand: "Expand",
    reduce: "Reduce",
  },
  "it": {
    homeTitle: "Manga - Read unlimited free manga online",
    language: "Lingua",
    familySafe: "Filtro Famiglia",
    lastestUpdates: "Latest Updates",
    popular: "Popular Mangas",
    recentlyAdded: "New Mangas",
    order: "Order",
    asc: "ASC",
    desc: "DESC",
    expand: "Expand",
    reduce: "Reduce",
  },
  "pt-br": {
    homeTitle: "Manga - Read unlimited free manga online",
    language: "Idioma",
    familySafe: "Modo Seguro",
    lastestUpdates: "Latest Updates",
    popular: "Popular Mangas",
    recentlyAdded: "New Mangas",
    order: "Order",
    asc: "ASC",
    desc: "DESC",
    expand: "Expand",
    reduce: "Reduce",
  },
  "de": {
    homeTitle: "Manga - Read unlimited free manga online",
    language: "Sprache",
    familySafe: "Jugendschutz",
    lastestUpdates: "Latest Updates",
    popular: "Popular Mangas",
    recentlyAdded: "New Mangas",
    order: "Order",
    asc: "ASC",
    desc: "DESC",
    expand: "Expand",
    reduce: "Reduce",
  },
  "fr": {
    homeTitle: "Manga - Read unlimited free manga online",
    language: "Langue",
    familySafe: "Tout public",
    lastestUpdates: "Derniers Updates",
    popular: "Mangas populaires",
    recentlyAdded: "Nouveaux mangas",
    order: "Ordre",
    asc: "ASC",
    desc: "DESC",
    expand: "Etendre",
    reduce: "Réduire",
  },
  "ja": {
    homeTitle: "Manga - Read unlimited free manga online",
    language: "言語",
    familySafe: "安心モード",
    lastestUpdates: "Latest Updates",
    popular: "Popular Mangas",
    recentlyAdded: "New Mangas",
    order: "Order",
    asc: "ASC",
    desc: "DESC",
    expand: "Expand",
    reduce: "Reduce",
  },
}