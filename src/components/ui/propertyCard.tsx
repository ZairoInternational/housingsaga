"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { IoLocationOutline } from "react-icons/io5";
import SaveHomeButton from "@/components/account/SaveHomeButton";
import { isGoldenVisaEligible } from "@/lib/golden-visa-eligibility";

// ─── Types ───────────────────────────────────────────────────────────────────

export type PropertyCardData = {
  id: string;
  img: string;
  title: string;
  tag: string;
  area: string;
  beds: number;
  baths: number;
  cars: number;
  price?: number;
  goldenVisaEligible?: boolean;
};

type PropertyCardProps = {
  card: PropertyCardData;
  href?: string;
  isNavigationBlocked?: boolean;
  style?: React.CSSProperties;
  /**
   * "default"  → original tall card, ideal for wide/hero grids
   * "compact"  → shorter card for narrow sidebar / multi-column layouts
   */
  size?: "default" | "compact";
};

// ─── Internal icon set ───────────────────────────────────────────────────────

const StatIcon = ({ name }: { name: "area" | "beds" | "baths" | "cars" }) => {
  const cls = "w-[13px] h-[13px] opacity-60 shrink-0";
  switch (name) {
    case "area":
      return (
        <svg
          className={cls}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 7v10a2 2 0 002 2h14V7L12 3 3 7z"
          />
        </svg>
      );
    case "beds":
      return (
        <svg
          className={cls}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 7h18v10H3z M5 7v-2a2 2 0 012-2h10a2 2 0 012 2v2"
          />
        </svg>
      );
    case "baths":
      return (
        <svg
          className={cls}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 3v4M16 3v4M3 13h18v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6z"
          />
        </svg>
      );
    case "cars":
      return (
        <svg
          className={cls}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 13l1-4h16l1 4M5 13v4a1 1 0 001 1h1M17 13v4a1 1 0 001 1h1"
          />
        </svg>
      );
  }
};

// ─── Component ───────────────────────────────────────────────────────────────

const PropertyCard: React.FC<PropertyCardProps> = ({
  card,
  href,
  isNavigationBlocked = false,
  style,
  size = "default",
}) => {
  const destination = href ?? `/projects/${card.id}`;
  const isCompact = size === "compact";

  const stats: {
    name: "area" | "beds" | "baths" | "cars";
    value: string | number;
  }[] = [
    { name: "area", value: card.area },
    { name: "beds", value: card.beds },
    { name: "baths", value: card.baths },
    { name: "cars", value: card.cars },
  ];

  return (
    <article
      style={style}
      className="
        group relative bg-[#111] rounded-2xl overflow-hidden
        shadow-[0_4px_24px_rgba(0,0,0,0.35)]
        hover:shadow-[0_28px_60px_rgba(0,0,0,0.55)]
        transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.34,1.1,0.64,1)]
        hover:-translate-y-1
        will-change-transform
      "
    >
      {/* Full-card hit target */}
      {!isNavigationBlocked && (
        <Link
          href={destination}
          aria-label={`View ${card.title}`}
          className="absolute inset-0 z-30"
        />
      )}

      {/* ── Image ─────────────────────────────────────────── */}
      <div
        className={`
          relative overflow-hidden
          ${
            isCompact
              ? "h-[270px] sm:h-[260px]"
              : "h-[360px] sm:h-[440px] lg:h-[550px]"
          }
        `}
      >
        <SaveHomeButton
          propertyId={card.id}
          className="absolute top-3 right-3 z-50"
        />
        {isGoldenVisaEligible(card.goldenVisaEligible) && (
          <Link
            href="/golden-visa"
            className="absolute left-3.5 top-14 z-40 inline-flex items-center rounded-full bg-lime-400 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-black shadow-md hover:bg-lime-300"
          >
            Golden Visa
          </Link>
        )}

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={card.img}
          alt={card.title}
          draggable={false}
          className="
            absolute inset-0 w-full h-full object-cover object-center
            scale-[1.08]
            transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
            group-hover:scale-[1.14]
          "
        />

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-transparent" />

        {/* ── Location pill ──────────────────────────────── */}
        <div className="absolute top-0 left-0 m-3.5 z-10 pointer-events-none">
          <div
            className="
              relative flex items-center
              bg-black/50 backdrop-blur-xl
              border border-white/10 rounded-full
              px-3 py-1.5 text-white text-[13px]
              shadow-[0_2px_12px_rgba(0,0,0,0.3)]
              overflow-hidden
            "
          >
            <div className="flex items-center gap-1.5 whitespace-nowrap shrink-0">
              <IoLocationOutline size={16} color="rgb(52 211 153)" />
              <span className="font-medium">{card.tag}</span>
            </div>

            <div
              className={`
                relative flex items-center overflow-hidden
                w-0 transition-[width] duration-500 ease-[cubic-bezier(0.34,1.2,0.64,1)]
                ${isCompact ? "group-hover:w-[140px]" : "group-hover:w-[200px]"}
              `}
            >
              <div
                className="
                  flex items-center gap-3
                  ml-3 pl-3 border-l border-white/15
                  whitespace-nowrap
                  opacity-0 translate-x-4
                  group-hover:opacity-100 group-hover:translate-x-0
                  transition-[opacity,transform] duration-400
                "
              >
                {(isCompact ? stats.slice(1, 3) : stats).map(
                  ({ name, value }, i) => (
                    <div
                      key={name}
                      className="
                      flex items-center gap-1
                      opacity-0 translate-y-1.5
                      group-hover:opacity-100 group-hover:translate-y-0
                      transition-[opacity,transform] duration-300
                    "
                      style={{ transitionDelay: `${120 + i * 60}ms` }}
                    >
                      <StatIcon name={name} />
                      <span className="text-white/75">{value}</span>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── Footer ────────────────────────────────────────── */}
        <div
          className={`
            absolute bottom-0 left-0 w-full
            flex items-end justify-between
            z-10 pointer-events-none
            ${isCompact ? "px-4 pb-4" : "px-6 pb-5"}
          `}
        >
          <div className="min-w-0 pr-3">
            <h3
              className={`
                font-semibold leading-snug text-white tracking-tight
                ${isCompact ? "text-[1.1rem]" : "text-[1.55rem]"}
              `}
            >
              {card.title}
            </h3>
            {typeof card.price === "number" && card.price > 0 && (
              <p className="mt-1 text-lime-300 text-sm font-medium">
                €{card.price.toLocaleString("en-US")}
              </p>
            )}
          </div>

          <div
            className="
              ml-4 shrink-0
              opacity-0 scale-0
              transition-all duration-300 ease-out
              group-hover:opacity-100
              group-hover:scale-125
            "
          >
            <span
              className={`
                inline-flex items-center justify-center rounded-full
                bg-lime-400 text-black
                ${isCompact ? "w-8 h-8" : "w-10 h-10"}
              `}
            >
              <ArrowUpRight size={isCompact ? 14 : 17} />
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PropertyCard;
