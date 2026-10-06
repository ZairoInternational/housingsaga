"use client";

import { useLocale, useTranslations } from "next-intl";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import { Check, ChevronDown, Languages } from "lucide-react";

import { setLocaleCookie } from "@/i18n/actions";
import { isLocale, localeDisplayNames, locales, type Locale } from "@/i18n/config";

export default function LanguageSwitcher({
  tone = "dark",
}: {
  tone?: "dark" | "light";
}) {
  const locale = useLocale();
  const current: Locale = isLocale(locale) ? locale : "en";
  const t = useTranslations("language");
  const router = useRouter();
  const { data: session, update } = useSession();
  const [pending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const [mobileTop, setMobileTop] = useState<number | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  function placeMenu() {
    const narrow = window.matchMedia("(max-width: 767px)").matches;
    if (!narrow || !rootRef.current) {
      setMobileTop(null);
      return;
    }
    setMobileTop(rootRef.current.getBoundingClientRect().bottom + 8);
  }

  useEffect(() => {
    if (!open) return;

    function onPointer(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function choose(next: Locale) {
    setOpen(false);
    if (next === current || pending) return;

    startTransition(async () => {
      const userId = (session?.user as { id?: string } | undefined)?.id;
      if (userId) {
        await fetch("/api/account/language", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ locale: next }),
        });
        await update();
      }
      await setLocaleCookie(next);
      router.refresh();
    });
  }

  const trigger =
    tone === "dark"
      ? "bg-[#22272e] text-white hover:bg-[#2b323a]"
      : "bg-white text-[#22272e] border border-gray-200 shadow-sm hover:bg-gray-50";

  return (
    <div ref={rootRef} className="relative" translate="no">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t("label")}
        disabled={pending}
        onClick={() => {
          setOpen((value) => {
            if (value) {
              setMobileTop(null);
              return false;
            }
            placeMenu();
            return true;
          });
        }}
        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-2 text-xs font-semibold transition disabled:opacity-60 ${trigger}`}
      >
        <Languages size={16} aria-hidden />
        <span lang={current}>{localeDisplayNames[current].native}</span>
        <ChevronDown
          size={14}
          aria-hidden
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={t("label")}
          style={mobileTop == null ? undefined : { top: mobileTop }}
          className={`z-[9999] w-56 max-w-[calc(100vw-2rem)] overflow-hidden rounded-xl border border-gray-200 bg-white p-1 text-[#22272e] shadow-xl ${
            mobileTop == null
              ? "absolute right-0 mt-2"
              : "fixed left-1/2 -translate-x-1/2"
          }`}
        >
          {locales.map((code) => {
            const active = current === code;
            const names = localeDisplayNames[code];
            return (
              <li key={code} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => choose(code)}
                  className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-sm transition ${
                    active
                      ? "bg-lime-400 font-semibold text-black"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <span>
                    <span lang={code}>{names.native}</span>
                    {names.native !== names.english && (
                      <span className={active ? "font-medium" : "text-gray-500"}>
                        {" "}
                        ({names.english})
                      </span>
                    )}
                  </span>
                  {active && <Check size={14} aria-hidden />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
