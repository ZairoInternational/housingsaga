"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight,
  Check,
  Scale,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";
import ScheduleCallbackButton from "@/components/golden-visa/ScheduleCallbackButton";

const missionPoints = [
  "Secure and transparent investment opportunities",
  "Verified, Golden Visa–compliant real estate",
  "Hassle-free residency application support",
];

const approachPoints = [
  {
    icon: ShieldCheck,
    title: "Trust & transparency",
    desc: "Clear pricing and honest guidance at every step.",
  },
  {
    icon: Scale,
    title: "Legal compliance",
    desc: "Due diligence with licensed Greek partners.",
  },
  {
    icon: Target,
    title: "Local execution",
    desc: "On-ground expertise from India to Greece.",
  },
  {
    icon: Sparkles,
    title: "Client-first plans",
    desc: "Strategies built around your residency & ROI goals.",
  },
];

export default function AboutFounder() {
  return (
    <section className="relative overflow-hidden bg-[#f6f7f4] py-16 sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-lime-300/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-lime-400/10 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-lime-600 mb-4"
        >
          <span className="h-px w-6 bg-lime-500" />
          Our Mission & Vision
        </motion.p>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 xl:gap-16 items-start">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="relative"
          >
            <div className="absolute -top-3 -left-3 w-2/3 h-2/3 rounded-3xl bg-lime-400/15 -z-10" />
            <div className="group relative w-full h-[420px] sm:h-[500px] lg:h-[620px] rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(20,83,45,0.12)]">
              <Image
                src="/about1.jpg"
                alt="Housing Saga Team"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition duration-700 group-hover:scale-[1.04]"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7">
                <p className="text-white text-xl font-bold">HousingSaga</p>
                <p className="text-lime-300 text-sm mt-1">
                  Greece Golden Visa Experts · India to Greece
                </p>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="lg:pt-2"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-bold text-[#14532d] leading-tight tracking-tight">
              Simplifying the{" "}
              <span className="text-lime-500">Greece Golden Visa</span> Journey
            </h2>

            {/* Mission */}
            <div className="mt-8 rounded-2xl border border-lime-100 bg-white p-5 sm:p-6 shadow-sm">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-lime-600 mb-2">
                Mission
              </p>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                Simplify Greece Golden Visa investment for Indian clients by
                providing:
              </p>
              <ul className="space-y-2.5">
                {missionPoints.map((point) => (
                  <li key={point} className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-lime-400 text-black">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    <span className="text-sm font-medium text-[#1a3a1a] leading-snug">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Vision */}
            <div className="mt-4 rounded-2xl border border-gray-100 bg-white/80 p-5 sm:p-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-lime-600 mb-2">
                Vision
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Become a leading platform for residency by investment and
                international real estate — helping Indian investors expand
                across Europe with confidence.
              </p>
            </div>

            {/* Approach */}
            <div className="mt-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-lime-600 mb-3">
                Our Approach
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {approachPoints.map(({ icon: Icon, title, desc }, i) => (
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.05 * i }}
                    className="rounded-2xl border border-gray-100 bg-white p-4 hover:border-lime-300 hover:shadow-md hover:shadow-lime-500/10 transition-all duration-300"
                  >
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-lime-100 text-[#14532d] mb-2.5">
                      <Icon className="h-4 w-4" />
                    </span>
                    <p className="text-sm font-bold text-[#14532d]">{title}</p>
                    <p className="mt-1 text-xs text-gray-500 leading-snug">
                      {desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            <p className="mt-6 text-sm text-gray-600 leading-relaxed">
              Whether you want Golden Visa residency, European travel freedom,
              or a strong Greek property investment — HousingSaga keeps the
              journey clear, secure, and result-driven.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/golden-visa"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-lime-400 hover:bg-lime-300 text-black px-6 py-3.5 text-sm font-bold transition shadow-lg shadow-lime-500/20"
              >
                Start Your Golden Visa Journey
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </Link>
              <ScheduleCallbackButton className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#14532d]/15 hover:border-lime-400 bg-white text-[#14532d] px-6 py-3.5 text-sm font-semibold transition">
                Schedule a Meeting
              </ScheduleCallbackButton>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
