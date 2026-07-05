export const languages = ["en", "zh"] as const;
export type Language = (typeof languages)[number];

export function isLanguage(value: string): value is Language {
  return languages.includes(value as Language);
}

export function alternateLanguage(language: Language) {
  return language === "en" ? "zh" : "en";
}

export function withLanguage(path: string, language: Language) {
  return `/${language}${path === "/" ? "" : path}`;
}
