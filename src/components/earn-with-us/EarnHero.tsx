"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  BadgeEuro,
  CalendarDays,
  ChevronRight,
  Home,
  MapPin,
  Shield,
} from "lucide-react";

const steps = [
  { title: "BUY", hint: "with HousingSaga", Icon: Home },
  { title: "OWN", hint: "your property", Icon: Shield },
  { title: "RENT", hint: "with VacationSaga", Icon: CalendarDays },
  { title: "EARN", hint: "rental income", Icon: BadgeEuro },
];

const float = {
  duration: 5.5,
  repeat: Infinity,
  repeatType: "mirror" as const,
  ease: "easeInOut" as const,
};

const sparks = [
  { top: "2%", left: "18%", color: "#bef264", size: 9, delay: 0 },
  { top: "14%", left: "82%", color: "#4ade80", size: 7, delay: 0.4 },
  { top: "74%", left: "8%", color: "#86efac", size: 8, delay: 0.8 },
  { top: "84%", left: "68%", color: "#d9f99d", size: 10, delay: 0.2 },
  { top: "36%", left: "0%", color: "#facc15", size: 7, delay: 1.1 },
  { top: "4%", left: "56%", color: "#38bdf8", size: 6, delay: 0.6 },
  { top: "62%", left: "90%", color: "#f472b6", size: 7, delay: 1.4 },
  { top: "28%", left: "92%", color: "#a3e635", size: 8, delay: 0.15 },
];

export default function EarnHero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[#04110d] text-white">
      <motion.div
        className="absolute inset-0"
        initial={false}
        animate={reduce ? undefined : { scale: [1, 1.06] }}
        transition={{ duration: 18, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
      >
        <Image
          src="/test.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[62%_center]"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#03110c]/90 via-[#062018]/45 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#03110c]/40 via-transparent to-[#03110c]/20" />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-20 top-1/3 h-72 w-72 rounded-full bg-lime-400/20 blur-3xl"
        animate={reduce ? undefined : { x: [0, 48, 0], y: [0, -28, 0], opacity: [0.45, 0.8, 0.45] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-[12%] top-16 h-56 w-56 rounded-full bg-sky-300/15 blur-3xl"
        animate={reduce ? undefined : { x: [0, -36, 0], y: [0, 32, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />
      {!reduce && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/15 to-transparent"
          initial={{ x: "-40%" }}
          animate={{ x: "320%" }}
          transition={{ duration: 6.5, repeat: Infinity, repeatDelay: 2.5, ease: "easeInOut" }}
        />
      )}

      <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-28 sm:px-6 sm:pb-14 sm:pt-32 lg:px-8 lg:pb-16 lg:pt-36">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(280px,0.95fr)] lg:gap-8">
          <div className="order-2 lg:order-1">
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="inline-flex rounded-full border border-lime-300/25 bg-lime-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-lime-300"
            >
              Real estate + vacation rentals
            </motion.p>
            <motion.h1
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="mt-5 max-w-xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.35rem]"
            >
              Buy with HousingSaga.
              <span className="mt-1 block text-lime-400">Earn with VacationSaga.</span>
            </motion.h1>
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.16 }}
              className="mt-5 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg"
            >
              Buy a property with HousingSaga. Rent it with VacationSaga — 0%
              management fee for HousingSaga property buyers.
            </motion.p>

            <ol className="mt-8 flex w-full max-w-xl items-stretch">
              {steps.map((step, index) => (
                <motion.li
                  key={step.title}
                  initial={reduce ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.22 + index * 0.07 }}
                  className="flex min-w-0 flex-1 items-stretch"
                >
                  <div className="flex h-full min-h-[8.75rem] w-full flex-col items-center rounded-2xl bg-black/30 px-1.5 py-3 text-center shadow-[0_14px_28px_rgba(0,0,0,0.45)] ring-1 ring-white/10 backdrop-blur-sm">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-lime-400 text-black shadow-[0_10px_22px_rgba(0,0,0,0.4),0_0_18px_rgba(190,242,100,0.55)]">
                      <step.Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <p className="mt-2 text-xs font-bold tracking-wide">{step.title}</p>
                    <p className="mt-1 line-clamp-2 text-xs leading-snug text-white/80">{step.hint}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <span className="z-20 mx-1 mt-5 flex h-6 w-6 shrink-0 items-center justify-center self-start rounded-full bg-lime-400 text-black shadow-[0_0_0_3px_rgba(4,17,13,0.9),0_6px_16px_rgba(0,0,0,0.45)] sm:mx-1.5">
                      <ChevronRight className="h-4 w-4" strokeWidth={3} aria-hidden />
                    </span>
                  )}
                </motion.li>
              ))}
            </ol>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.5 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
            >
              <a
                href="#estimator"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-lime-400 px-5 py-3 text-sm font-semibold text-black transition hover:bg-lime-300"
              >
                See your estimate
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/projects"
                className="inline-flex items-center justify-center rounded-full border border-white/25 bg-black/25 px-5 py-3 text-sm font-semibold backdrop-blur-sm transition hover:bg-white/10"
              >
                Explore properties
              </Link>
            </motion.div>
          </div>

          <motion.div
            className="relative order-1 mx-auto h-[22rem] w-full max-w-lg sm:h-80 lg:order-2 lg:h-[26rem]"
            initial={reduce ? false : { opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <motion.article
              animate={
                reduce
                  ? { rotate: -7 }
                  : { y: [0, -14, 0], rotate: [-9, -4, -9] }
              }
              transition={{ ...float, delay: 0.2 }}
              className="absolute left-1 top-6 w-[9.5rem] overflow-hidden rounded-2xl bg-white text-gray-900 shadow-2xl sm:left-2 sm:top-4 sm:w-48 lg:w-52"
            >
              <div className="relative h-24 sm:h-32">
                <Image
                  src="/faq-hero.webp"
                  alt="Villa in Greece, Santorini"
                  fill
                  className="object-cover"
                  sizes="220px"
                />
              </div>
              <div className="px-3 py-2.5">
                <p className="flex items-center gap-1 text-sm font-semibold">
                  <MapPin className="h-3.5 w-3.5 text-lime-600" aria-hidden />
                  Villa in Greece
                </p>
                <p className="pl-5 text-xs text-gray-500">Santorini</p>
              </div>
            </motion.article>

            <motion.article
              animate={
                reduce
                  ? { rotate: 7 }
                  : { y: [0, 12, 0], rotate: [5, 10, 5] }
              }
              transition={{ ...float, delay: 0.6 }}
              className="absolute bottom-3 right-1 w-[9.5rem] overflow-hidden rounded-2xl bg-white text-gray-900 shadow-2xl sm:right-0 sm:w-48 lg:w-52"
            >
              <div className="relative h-24 sm:h-32">
                <Image
                  src="/contact-hero.jpg"
                  alt="Coastal apartment in Corfu"
                  fill
                  className="object-cover"
                  sizes="220px"
                />
              </div>
              <div className="px-3 py-2.5">
                <p className="flex items-center gap-1 text-sm font-semibold">
                  <MapPin className="h-3.5 w-3.5 text-lime-600" aria-hidden />
                  Coastal Apartment
                </p>
                <p className="pl-5 text-xs text-gray-500">Corfu</p>
              </div>
            </motion.article>

            <div className="absolute left-1/2 top-1/2 z-10 h-44 w-44 -translate-x-1/2 -translate-y-1/2 sm:h-52 sm:w-52">
              {sparks.map((spark) => (
                <motion.span
                  key={`${spark.top}-${spark.left}`}
                  aria-hidden
                  className="absolute rounded-full"
                  style={{
                    top: spark.top,
                    left: spark.left,
                    width: spark.size,
                    height: spark.size,
                    background: spark.color,
                    boxShadow: `0 0 10px ${spark.color}`,
                  }}
                  animate={
                    reduce
                      ? undefined
                      : { scale: [0.4, 1.35, 0.4], opacity: [0.25, 1, 0.25], y: [0, -8, 0] }
                  }
                  transition={{
                    duration: 1.8,
                    delay: spark.delay,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <motion.div
              animate={reduce ? undefined : { y: [0, -8, 0], scale: [1, 1.05, 1] }}
              transition={{ duration: 3.6, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
            >
              {!reduce && (
                <motion.span
                  aria-hidden
                  className="absolute -inset-3 rounded-full"
                  style={{
                    background:
                      "conic-gradient(from 0deg, #bef264, #38bdf8, #f472b6, #facc15, #4ade80, #bef264)",
                    WebkitMask:
                      "radial-gradient(farthest-side, transparent calc(100% - 7px), #000 calc(100% - 5px))",
                    mask: "radial-gradient(farthest-side, transparent calc(100% - 7px), #000 calc(100% - 5px))",
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
              )}
              <div className="relative flex h-32 w-32 flex-col items-center justify-center rounded-full bg-lime-400 px-4 text-center text-black shadow-[0_16px_40px_rgba(0,0,0,0.35),0_0_48px_rgba(190,242,100,0.7)] sm:h-40 sm:w-40">
                <p className="text-4xl font-bold leading-none sm:text-5xl">0%</p>
                <p className="mt-1 text-xs font-semibold leading-snug">
                  management fee for HousingSaga buyers
                </p>
              </div>
            </motion.div>
            </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
