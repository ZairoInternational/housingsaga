"use client";

import Image from "next/image";
import Link from "next/link";

type AboutHeroProps = {
  breadcrumbFirstLabel?: string;
  breadcrumbLastLabel?: string;
};

export default function AboutHero({
  breadcrumbFirstLabel = "Home",
  breadcrumbLastLabel = "About Us",
}: AboutHeroProps) {
  return (
    <section className="relative w-full h-[600px] flex items-end justify-start text-white overflow-hidden">
      <Image
        src="/about-hero.webp"
        alt="About hero"
        fill
        priority
        className="object-cover scale-105 transition-transform duration-[8000ms] hover:scale-100"
      />

      {/* Gradient overlay — stronger at bottom-left for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 px-8 md:px-16 pb-14 w-full max-w-[1200px] mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-white/60 mb-4 tracking-wide">
          <Link
            href="/"
            className="hover:text-lime-400 transition-colors duration-200"
          >
            {breadcrumbFirstLabel}
          </Link>
          <span className="w-1.5 h-1.5 bg-lime-400 rounded-full" />
          <span className="text-white/90">{breadcrumbLastLabel}</span>
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight max-w-xl">
          Who We <span className="text-lime-400">Are</span>
        </h1>

        {/* Thin accent line */}
        <div className="mt-6 w-16 h-[3px] bg-lime-400 rounded-full" />
      </div>
    </section>
  );
}
