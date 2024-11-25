import { resources } from "../constants";

type UseTranslationReturnType = { t: (label: string) => string }

export function useTranslation(lang: string): UseTranslationReturnType {
  const languageResources = resources[lang] || resources["en"];

  function t(label: string): string {
    return languageResources[label] || resources["en"][label] || label;
  }
  return { t }
}