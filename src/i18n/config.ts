export const locales = ["en", "el", "it"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function isLocale(value: unknown): value is Locale {
  return value === "en" || value === "el" || value === "it";
}
