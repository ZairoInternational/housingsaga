"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { useTranslations } from "next-intl";
import { ArrowLeft, ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import SaveHomeButton from "@/components/account/SaveHomeButton";
import { formatEurAmount } from "@/lib/format-currency";
import { isGoldenVisaEligible } from "@/lib/golden-visa-eligibility";
import type { PropertyCardData } from "@/components/ui/propertyCard";

export interface ProjectsSectionClientProps {
  projects: PropertyCardData[];
}

const HIGHLIGHT_COUNT = 5;
const MAX_AREA_FILTERS = 4;

export default function ProjectsSectionClient({
  projects,
}: ProjectsSectionClientProps) {
  const t = useTranslations("homeSections");
  const [area, setArea] = useState("all");
  const { areas, hasMoreRegions } = useMemo(() => {
    const counts = new Map<string, { count: number; first: number }>();
    projects.forEach((project, index) => {
      const region = project.region?.trim();
      if (!region) return;
      const current = counts.get(region);
      if (current) current.count += 1;
      else counts.set(region, { count: 1, first: index });
    });
    const ranked = [...counts.entries()].sort(
      (a, b) => b[1].count - a[1].count || a[1].first - b[1].first,
    );
    const shown = ranked
      .map(([name]) => name)
      .filter((name) => /^\S+$/.test(name))
      .slice(0, MAX_AREA_FILTERS);
    const shownSet = new Set(shown);
    return {
      areas: shown,
      hasMoreRegions: ranked.some(([name]) => !shownSet.has(name)),
    };
  }, [projects]);

  const visible = useMemo(() => {
    if (area === "all") return projects.slice(0, HIGHLIGHT_COUNT);
    return projects.filter((project) => project.region === area);
  }, [area, projects]);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    loop: false,
  });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const sync = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    sync();
    emblaApi.on("select", sync);
    emblaApi.on("reInit", sync);
    const onResize = () => emblaApi.reInit();
    window.addEventListener("resize", onResize);
    return () => {
      emblaApi.off("select", sync);
      emblaApi.off("reInit", sync);
      window.removeEventListener("resize", onResize);
    };
  }, [emblaApi, sync]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.reInit();
    emblaApi.scrollTo(0);
  }, [emblaApi, area, visible.length]);

  return (
    <section className="relative overflow-hidden bg-[#070b12] py-14 text-slate-100 sm:py-20">
      <style>{`
        @keyframes highlight-ping {
          0% { transform: scale(1); opacity: 0.75; }
          75%, 100% { transform: scale(2.6); opacity: 0; }
        }
        .highlight-ping {
          animation: highlight-ping 1.1s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-[12%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.16)_0%,transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 right-[8%] h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(0,242,254,0.1)_0%,transparent_70%)]"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-6 lg:mb-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 overflow-visible rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-400">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="highlight-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.95)]" />
              </span>
              {t("projectsEyebrow")}
            </div>
            <h2 className="text-4xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-6xl">
              {t("projectsTitle1")}
              <br className="hidden sm:inline" />{" "}
              <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                {t("projectsTitle2")}
              </span>
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">
              {t("projectsLead")}
            </p>
          </div>

          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center lg:self-end">
            {(areas.length > 0 || hasMoreRegions) && (
              <div className="flex max-w-full flex-wrap items-center gap-1.5 rounded-2xl border border-white/10 bg-slate-900/80 p-1 text-xs font-medium">
                {areas.map((name) => (
                  <AreaButton
                    key={name}
                    active={area === name}
                    onClick={() => setArea(area === name ? "all" : name)}
                  >
                    {name}
                  </AreaButton>
                ))}
                {hasMoreRegions && (
                  <Link
                    href="/projects"
                    className="inline-flex shrink-0 items-center gap-1 rounded-xl px-3 py-1.5 text-emerald-300 transition hover:bg-white/10 hover:text-white"
                  >
                    {t("projectsOtherRegions")}
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                  </Link>
                )}
              </div>
            )}

            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label={t("projectsPrev")}
                disabled={visible.length <= 1 || !canPrev}
                onClick={() => emblaApi?.scrollPrev()}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-slate-900/70 text-slate-300 shadow-md backdrop-blur-md transition hover:border-emerald-500/40 hover:bg-white/10 hover:text-white disabled:pointer-events-none disabled:opacity-40"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label={t("projectsNext")}
                disabled={visible.length <= 1 || !canNext}
                onClick={() => emblaApi?.scrollNext()}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-slate-900/70 text-slate-300 shadow-md backdrop-blur-md transition hover:border-emerald-500/40 hover:bg-white/10 hover:text-white disabled:pointer-events-none disabled:opacity-40"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {visible.length > 0 ? (
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {visible.map((card) => (
                <div
                  key={card.id}
                  className="min-w-0 flex-[0_0_100%] sm:flex-[0_0_calc(50%-0.75rem)] lg:flex-[0_0_calc(33.333%-1rem)]"
                >
                  <ShowcaseCard card={card} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="rounded-3xl border border-white/10 bg-slate-900/60 px-6 py-14 text-center text-slate-400">
            <p className="text-base font-semibold text-slate-200">
              {t("projectsEmpty")}
            </p>
            <button
              type="button"
              onClick={() => setArea("all")}
              className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-500/20 px-4 py-2 text-xs font-bold text-emerald-300"
            >
              {t("projectsShowAll")}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function AreaButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 rounded-xl px-3 py-1.5 transition ${
        active
          ? "bg-emerald-600 text-white shadow-md"
          : "text-slate-400 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

function ShowcaseCard({ card }: { card: PropertyCardData }) {
  const t = useTranslations("homeSections");
  const property = useTranslations("property");
  const goldenVisa = isGoldenVisaEligible(card.goldenVisaEligible);
  const price =
    typeof card.price === "number" && card.price > 0
      ? formatEurAmount(card.price)
      : null;

  return (
    <article className="group relative h-[380px] overflow-hidden rounded-3xl border border-white/10 bg-slate-900/65 shadow-lg transition duration-500 hover:-translate-y-2 hover:border-emerald-500/35 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7),0_0_30px_-5px_rgba(16,185,129,0.18)] sm:h-[420px]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={card.img}
        alt=""
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#070b12] via-black/25 to-black/40" />

      <div className="absolute inset-x-4 top-4 z-30 flex items-start justify-between gap-3">
        {card.tag ? (
          <span className="inline-flex max-w-[70%] items-center gap-1.5 rounded-full border border-white/15 bg-black/45 px-3.5 py-1.5 text-xs font-medium text-slate-100 shadow-md backdrop-blur-md">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-emerald-400" aria-hidden />
            <span className="truncate">{card.tag}</span>
          </span>
        ) : (
          <span />
        )}
        <SaveHomeButton propertyId={card.id} className="relative" />
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-3 p-5 sm:p-6">
        <div className="min-w-0">
          <div className="mb-1 flex flex-wrap items-center gap-2">
            {card.featured && (
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                {t("projectsFeatured")}
              </span>
            )}
            {goldenVisa && (
              <Link
                href="/golden-visa"
                className="relative z-30 text-[11px] font-bold uppercase tracking-wider text-emerald-300 underline-offset-2 hover:underline"
              >
                {property("goldenVisa")}
              </Link>
            )}
          </div>
          <h3 className="truncate text-xl font-bold tracking-tight text-white transition-colors group-hover:text-emerald-300 sm:text-2xl">
            {card.title}
          </h3>
          {price && (
            <p className="mt-1 text-lg font-extrabold text-emerald-400">{price}</p>
          )}
        </div>
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white shadow-lg backdrop-blur-md transition duration-300 group-hover:border-emerald-400 group-hover:bg-emerald-500">
          <ArrowUpRight className="h-4 w-4" aria-hidden />
        </span>
      </div>

      <Link
        href={`/projects/${card.id}`}
        aria-label={property("viewProperty", { title: card.title })}
        className="absolute inset-0 z-20"
      />
    </article>
  );
}
