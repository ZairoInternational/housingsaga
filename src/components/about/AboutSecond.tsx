"use client";

import { motion } from "motion/react";
import {
  Building2,
  Check,
  Globe2,
  MapPinned,
  Shield,
} from "lucide-react";

const expertise = [
  {
    icon: Globe2,
    title: "Greece Golden Visa Program",
    body: "End-to-end assistance for one of the most popular residency-by-investment routes for Indian investors.",
    bullets: [
      "Property selection aligned with Golden Visa rules",
      "Legal due diligence and compliance checks",
      "Application coordination with partners",
      "Support through Greek authority workflows",
    ],
  },
  {
    icon: Building2,
    title: "Real Estate in Greece",
    body: "Access verified, high-potential inventory selected for both lifestyle and investment strength.",
    bullets: [
      "Athens (Attica Region)",
      "Thessaloniki",
      "Mykonos & Santorini",
      "Emerging high-return locations",
    ],
  },
  {
    icon: MapPinned,
    title: "Local Presence in Greece",
    body: "On-ground partners keep execution fast, compliant, and transparent from India to Greece.",
    bullets: [
      "Licensed Greek real estate professionals",
      "Legal & immigration experts",
      "Property management companies",
      "Verified Golden Visa–eligible inventory",
    ],
  },
];

const whyPoints = [
  "Experts in Greece Golden Visa for Indian investors",
  "End-to-end support from India to Greece",
  "Verified and legally compliant properties",
  "Transparent pricing with no hidden charges",
  "Faster processing through local partnerships",
  "Dedicated advisory for investment and residency",
];

const stats = [
  { value: "100%", label: "Legally compliant focus" },
  { value: "4%", label: "Success-based commission" },
  { value: "€200", label: "One-time listing fee" },
  { value: "2", label: "Countries · India & Greece" },
];

export default function AboutSecond() {
  return (
    <section className="relative py-16 sm:py-20 lg:py-24 bg-white overflow-hidden">
      <div className="pointer-events-none absolute top-20 right-0 h-80 w-80 rounded-full bg-lime-200/30 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-lime-600 mb-4"
        >
          <span className="h-px w-6 bg-lime-500" />
          Why Choose HousingSaga
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold text-[#14532d] max-w-2xl leading-snug tracking-tight"
        >
          Greece Golden Visa Experts for Indian Investors
        </motion.h2>

        <div className="mt-8 grid md:grid-cols-2 gap-6 md:gap-10">
          <p className="text-[15px] text-gray-600 leading-[1.85]">
            HousingSaga helps Indian investors access Greece Golden Visa
            opportunities through strategic real estate — a clear pathway to
            European residency with secure, managed support.
          </p>
          <p className="text-[15px] text-gray-600 leading-[1.85]">
            We bridge India and Greece with local expertise on both sides:
            transparent advice in India, verified inventory and execution in
            Greece.
          </p>
        </div>

        {/* Expertise cards */}
        <div className="mt-14 grid md:grid-cols-3 gap-5 lg:gap-6">
          {expertise.map(({ icon: Icon, title, body, bullets }, i) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.06 * i, duration: 0.45 }}
              className="group rounded-2xl border border-gray-100 bg-[#fbfcfa] p-6 hover:border-lime-300 hover:bg-white hover:shadow-[0_16px_40px_rgba(20,83,45,0.08)] transition-all duration-300"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-lime-100 text-[#14532d] mb-4 group-hover:bg-lime-400 transition-colors">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="text-lg font-bold text-[#14532d] leading-snug">
                {title}
              </h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                {body}
              </p>
              <ul className="mt-5 space-y-2.5">
                {bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-lime-400 text-black">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    <span className="text-[13px] text-gray-700 leading-snug">
                      {b}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>

        {/* Why choose */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 rounded-3xl border border-lime-100 bg-gradient-to-br from-[#eef6e6] to-white p-6 sm:p-8"
        >
          <div className="flex items-center gap-2 mb-5">
            <Shield className="h-5 w-5 text-lime-600" />
            <h3 className="text-xl sm:text-2xl font-bold text-[#14532d]">
              Why Choose HousingSaga
            </h3>
          </div>
          <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
            {whyPoints.map((point) => (
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
        </motion.div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 * i }}
              className="rounded-2xl border border-gray-100 bg-white p-5 sm:p-6 hover:border-lime-300 hover:-translate-y-0.5 transition-all duration-300 shadow-sm"
            >
              <p className="text-2xl sm:text-3xl font-bold text-[#14532d]">
                {stat.value}
              </p>
              <p className="mt-1 text-[11px] uppercase tracking-wider text-gray-500">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
