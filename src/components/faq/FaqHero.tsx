"use client";

import Image from "next/image";
import Link from "next/link";

type FaqHeroProps = {
  title?: string;
  breadcrumbLabel?: string;
  subtitle?: string;
};

export default function FaqHero({
  title = "FAQs",
  breadcrumbLabel = "FAQ",
  subtitle,
}: FaqHeroProps) {
  return (
    <section className="relative w-full min-h-[320px] sm:min-h-[400px] lg:min-h-[480px] flex items-end text-white overflow-hidden">
      <Image
        src="/faq-hero.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <nav className="flex items-center gap-2 text-sm text-white/70 mb-4">
          <Link href="/" className="hover:text-white transition">
            Home
          </Link>
          <span className="h-1.5 w-1.5 rounded-full bg-lime-400" />
          <span className="text-white">{breadcrumbLabel}</span>
        </nav>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-xl text-sm sm:text-base text-white/75 leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
