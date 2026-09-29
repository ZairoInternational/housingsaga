"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

type AboutHeroProps = {
  breadcrumbFirstLabel?: string;
  breadcrumbLastLabel?: string;
};

export default function AboutHero({
  breadcrumbFirstLabel = "Home",
  breadcrumbLastLabel = "About Us",
}: AboutHeroProps) {
  return (
    <section className="relative w-full min-h-[420px] sm:min-h-[520px] lg:min-h-[580px] flex items-end text-white overflow-hidden">
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1.14 }}
        transition={{
          duration: 16,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      >
        <Image
          src="/contact-hero.jpg"
          alt="About HousingSaga"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/25" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-transparent to-transparent" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <div className="flex items-center gap-2 text-sm text-white/65 mb-4 tracking-wide">
            <Link href="/" className="hover:text-lime-300 transition-colors">
              {breadcrumbFirstLabel}
            </Link>
            <span className="w-1.5 h-1.5 bg-lime-400 rounded-full" />
            <span className="text-white/90">{breadcrumbLastLabel}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight max-w-2xl">
            Who We <span className="text-lime-400">Are</span>
          </h1>
          <p className="mt-4 max-w-lg text-sm sm:text-base text-white/75 leading-relaxed">
            Bridging India and Greece with trusted Golden Visa guidance and
            verified real estate opportunities.
          </p>
          <div className="mt-6 w-16 h-[3px] bg-lime-400 rounded-full" />
        </motion.div>
      </div>
    </section>
  );
}
