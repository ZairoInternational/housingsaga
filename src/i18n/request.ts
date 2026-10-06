import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

import { defaultLocale, isLocale, type Locale } from "@/i18n/config";

const catalogs: Record<Locale, () => Promise<{ default: Record<string, unknown> }>> = {
  en: () => import("../../messages/en.json"),
  el: () => import("../../messages/el.json"),
  it: () => import("../../messages/it.json"),
};

export default getRequestConfig(async () => {
  const store = await cookies();
  const raw = store.get("locale")?.value;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const messages = (await catalogs[locale]()).default;

  return { locale, messages };
});
