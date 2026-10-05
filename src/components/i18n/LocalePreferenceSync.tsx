"use client";

import { useSession } from "next-auth/react";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

import { setLocaleCookie } from "@/i18n/actions";
import { isLocale } from "@/i18n/config";

export default function LocalePreferenceSync() {
  const { data: session, status } = useSession();
  const locale = useLocale();
  const router = useRouter();
  const applied = useRef<string | null>(null);

  useEffect(() => {
    if (status !== "authenticated") return;
    const preferred = (session?.user as { preferredLanguage?: string } | undefined)
      ?.preferredLanguage;
    if (!isLocale(preferred) || preferred === locale) return;
    if (applied.current === preferred) return;
    applied.current = preferred;
    void setLocaleCookie(preferred).then(() => router.refresh());
  }, [status, session, locale, router]);

  return null;
}
