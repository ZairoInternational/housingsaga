"use client";

import { motion } from "motion/react";
import {
  Eye,
  Fingerprint,
  Globe2,
  HeartHandshake,
} from "lucide-react";

const values = [
  {
    icon: Eye,
    title: "Transparency",
    description:
      "Complete clarity at every step — no hidden fees, no surprises. Honest guidance you can trust.",
  },
  {
    icon: HeartHandshake,
    title: "Trust",
    description:
      "We only recommend properties and partners we stand behind, with legal compliance first.",
  },
  {
    icon: Fingerprint,
    title: "Personalisation",
    description:
      "Every plan is tailored — from property shortlists to Golden Visa strategy for your goals.",
  },
  {
    icon: Globe2,
    title: "Global Network",
    description:
      "Legal, property, and management partners across India and Greece under one coordinated team.",
  },
];

export default function AboutValues() {
  return (
    <section className="py-16 sm:py-20 bg-[#12150f] text-white overflow-hidden relative">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(163,230,53,0.12),_transparent_55%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 sm:mb-12"
        >
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-lime-400 mb-3">
            <span className="h-px w-6 bg-lime-400" />
            What Drives Us
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight max-w-xl">
            Our core values, reflected in every deal
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {values.map(({ icon: Icon, title, description }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 * i }}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:border-lime-400/50 hover:bg-white/[0.06] transition-all duration-300"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-lime-400/15 text-lime-400 mb-4 group-hover:bg-lime-400 group-hover:text-black transition-colors">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="text-lg font-bold mb-2 group-hover:text-lime-300 transition-colors">
                {title}
              </h3>
              <p className="text-sm text-white/60 leading-relaxed">
                {description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
