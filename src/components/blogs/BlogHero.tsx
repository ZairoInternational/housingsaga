"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";

function scrollToId(id: string) {
  // Allow the URL/hash to update first, then scroll past sticky nav.
  window.setTimeout(() => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, 50);
}

export default function BlogHero() {
  const router = useRouter();
  const t = useTranslations("blog");

  return (
    <section className="relative w-full min-h-[420px] sm:min-h-[520px] lg:min-h-[600px] flex items-end sm:items-center text-white overflow-hidden">
      <Image
        src="/blog_banner.png"
        alt={t("heroAlt")}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 lg:py-20">
        <p className="flex items-center gap-3 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.22em] text-lime-400 mb-4">
          <span className="h-px w-6 bg-lime-400" />
          {t("learningHub")}
        </p>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[3.75rem] font-bold tracking-tight leading-[1.08] max-w-3xl">
          {t("title")} <span className="text-lime-400">{t("titleAccent")}</span>
        </h1>

        <p className="mt-5 text-sm sm:text-base text-white/80 max-w-xl leading-relaxed">
          {t("lead")}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => {
              router.push("/blogs?category=All#latest-articles", {
                scroll: false,
              });
              scrollToId("latest-articles");
            }}
            className="inline-flex items-center gap-2 rounded-full bg-lime-400 hover:bg-lime-300 text-black font-semibold text-sm px-5 py-2.5 transition"
          >
            {t("allArticles")}
            <ChevronDown className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => {
              // Maps to the Property Tips category filter
              router.push("/blogs?category=Property Tips#latest-articles", {
                scroll: false,
              });
              scrollToId("latest-articles");
            }}
            className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-black/25 hover:bg-black/40 backdrop-blur-sm text-white font-semibold text-sm px-5 py-2.5 transition"
          >
            {t("tips")}
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
