export const locales = ["en", "el", "it"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Fixed labels for the language menu. These do not follow the active locale. */
export const localeDisplayNames: Record<Locale, { native: string; english: string }> = {
  en: { native: "English", english: "English" },
  el: { native: "Ελληνικά", english: "Greek" },
  it: { native: "Italiano", english: "Italian" },
};

export function isLocale(value: unknown): value is Locale {
  return value === "en" || value === "el" || value === "it";
}
