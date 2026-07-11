export const languages = ["en", "zh"] as const;
export type Language = (typeof languages)[number];
export type Locale = Language;

export function isLanguage(value: string): value is Language {
  return languages.includes(value as Language);
}

export const isSupportedLocale = isLanguage;

export function alternateLanguage(language: Language) {
  return language === "en" ? "zh" : "en";
}

export function withLanguage(path: string, language: Language) {
  return `/${language}${path === "/" ? "" : path}`;
}

export function switchLanguagePath(pathname: string, language: Language, search = "") {
  const nextLanguage = alternateLanguage(language);
  const localizedPath = pathname.replace(new RegExp(`^/${language}(?=/|$)`), `/${nextLanguage}`);
  const normalizedPath = localizedPath || `/${nextLanguage}`;
  const normalizedSearch = search ? `?${search.replace(/^\?/, "")}` : "";
  return `${normalizedPath}${normalizedSearch}`;
}
