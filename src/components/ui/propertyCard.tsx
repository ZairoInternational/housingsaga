"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { IoLocationOutline } from "react-icons/io5";

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
};

type PropertyCardProps = {
  card: PropertyCardData;
  href?: string;
  isNavigationBlocked?: boolean;
  style?: React.CSSProperties; // ← IMPORTANT
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

/**
 * PropertyCard
 *
 * Self-contained card with:
 *  - Parallax image shift on hover
 *  - Expanding location pill with staggered stat reveal
 *  - Spring-entrance CTA button
 *  - Subtle lift + shadow on hover
 *
 * All hover states are driven by Tailwind's `group` + arbitrary variants.
 * No JS animation logic lives here — parent can simply drop it inside any layout.
 */
const PropertyCard: React.FC<PropertyCardProps> = ({
  card,
  href,
  isNavigationBlocked = false,
  style,
}) => {
  const destination = href ?? `/projects/${card.id}`;

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
        will-change-transform
      "
    >
      {/* ── Image ─────────────────────────────────────────── */}
      <div className="relative h-[360px] sm:h-[440px] lg:h-[550px] overflow-hidden">
        <img
          src={card.img}
          alt={card.title}
          draggable={false}
          className="
            absolute inset-0 w-full h-full object-cover object-center
            scale-[1.08]
            transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
            group-hover:translate-x-5
          "
        />

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />

        {/* ── Location pill ──────────────────────────────── */}
        <div className="absolute top-0 left-0 m-3.5 z-10">
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
            {/* Tag */}
            <div className="flex items-center gap-1.5 whitespace-nowrap shrink-0">
              <IoLocationOutline size={16} color="rgb(52 211 153)"/>
              <span className="font-medium">{card.tag}</span>
            </div>

            {/* Drawer — expands on group hover */}
            {/* Drawer — true slide panel */}
            <div
              className="
    relative flex items-center
    overflow-hidden
    w-0 group-hover:w-[200px]
    transition-[width] duration-500 ease-[cubic-bezier(0.34,1.2,0.64,1)]
  "
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
                {stats.map(({ name, value }, i) => (
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
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Footer ────────────────────────────────────────── */}
        <div
          className="
            absolute bottom-0 left-0 w-full
            flex items-end justify-between
            px-6 pb-5
            z-10
          "
        >
          <h3 className="text-[1.55rem] font-semibold leading-snug text-white tracking-tight">
            {card.title}
          </h3>

          {/* CTA button — spring entrance */}
          <div
            className="
                  ml-4 shrink-0
    opacity-0 scale-0 
    pointer-events-none
    transition-all duration-300 ease-out
    group-hover:opacity-100 
    group-hover:scale-140 

    group-hover:pointer-events-auto
            "
          >
            <Link
              href={destination}
              onClick={(e) => isNavigationBlocked && e.preventDefault()}
              className="
                inline-flex items-center justify-center
                w-10 h-10 rounded-full
                bg-emerald-400 text-black
                hover:bg-emerald-300
                transition-colors duration-150
              "
            >
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PropertyCard;
