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
    language: "Language",
    familySafe: "Family Safe",
    lastestUpdates: "Latest Updates",
    popular: "Popular Mangas",
    recentlyAdded: "New Mangas",
  },
  "zh": {
    language: "语言",
    familySafe: "安全模式",
    lastestUpdates: "今日更新",
    popular: "人气漫画",
    recentlyAdded: "最新漫画",
  },
  "zh-hk": {
    language: "語言",
    familySafe: "安全模式",
    lastestUpdates: "Latest Updates",
    popular: "Popular Mangas",
    recentlyAdded: "Recently Added",
  },
  "es-la": {
    language: "Idioma",
    familySafe: "Modo Familiar",
    lastestUpdates: "Latest Updates",
    popular: "Popular Mangas",
    recentlyAdded: "Recently Added",
  },
  "it": {
    language: "Lingua",
    familySafe: "Filtro Famiglia",
    lastestUpdates: "Latest Updates",
    popular: "Popular Mangas",
    recentlyAdded: "Recently Added",
  },
  "pt-br": {
    language: "Idioma",
    familySafe: "Modo Seguro",
    lastestUpdates: "Latest Updates",
    popular: "Popular Mangas",
    recentlyAdded: "Recently Added",
  },
  "de": {
    language: "Sprache",
    familySafe: "Jugendschutz",
    lastestUpdates: "Latest Updates",
    popular: "Popular Mangas",
    recentlyAdded: "Recently Added",
  },
  "fr": {
    language: "Langue",
    familySafe: "Tout public",
    lastestUpdates: "Latest Updates",
    popular: "Popular Mangas",
    recentlyAdded: "Recently Added",
  },
  "ja": {
    language: "言語",
    familySafe: "安心モード",
    lastestUpdates: "Latest Updates",
    popular: "Popular Mangas",
    recentlyAdded: "Recently Added",
  },
}