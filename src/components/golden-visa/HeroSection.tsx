// components/golden-visa/HeroSection.tsx
"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { FiArrowRight, FiDownload } from "react-icons/fi";
import { HiOutlineShieldCheck } from "react-icons/hi";
import { LuBuilding2, LuClock, LuGlobe } from "react-icons/lu";

const stats = [
  {
    Icon: LuBuilding2,
    value: "€250K+",
    label: "Min. Investment",
    dataTarget: "€250K+",
  },
  {
    Icon: LuClock,
    value: "90 Days",
    label: "Processing Time",
    dataTarget: "90 Days",
  },
  {
    Icon: LuGlobe,
    value: "29 Countries",
    label: "Visa-Free Access",
    dataTarget: "29 Countries",
  },
];

export default function HeroSection() {
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!statsRef.current) return;

    const els = statsRef.current.querySelectorAll<HTMLElement>(".stat-number");
    els.forEach((el) => {
      const target = el.getAttribute("data-target") || "0";
      const match = target.match(/\d+/);
      if (!match) return;

      const final = parseInt(match[0]);
      const duration = 1800;
      const step = final / (duration / 16);
      let current = 0;

      const timer = setInterval(() => {
        current += step;
        if (current >= final) {
          el.textContent = target;
          clearInterval(timer);
        } else {
          el.textContent = target.replace(/\d+/, Math.floor(current).toString());
        }
      }, 16);
    });
  }, []);

  return (
    <section className="relative min-h-[92vh] flex items-center py-20 overflow-hidden bg-[#050712]">
      {/* Single subtle lime glow — top-left only */}
      <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-lime-500/8 rounded-full blur-3xl pointer-events-none" />
      {/* Faint grid overlay for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative z-10 grid lg:grid-cols-2 gap-14 items-center w-full max-w-7xl mx-auto px-6">
        {/* ── Left column ── */}
        <div className="space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lime-500/10 border border-lime-500/20 text-lime-300 text-sm font-medium">
            <HiOutlineShieldCheck size={16} />
            Official EU Residency Program — Greece
          </div>

          {/* Headline */}
          <div>
            <h1 className="text-5xl lg:text-[4.25rem] font-bold leading-[1.08] tracking-tight text-white">
              Greece
              <br />
              <span className="text-lime-400">Golden Visa</span>
              <br />
              Program
            </h1>
            <p className="mt-5 text-base sm:text-lg text-white/60 leading-relaxed max-w-lg">
              Secure EU residency through strategic real estate investment. Enjoy
              visa-free travel across 29 countries, high rental yields, and
              long-term European access for your entire family.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-lime-500 hover:bg-lime-400 text-black font-semibold text-sm transition-all duration-200 shadow-lg shadow-lime-500/15">
              Schedule a Meeting
              <FiArrowRight
                size={16}
                className="group-hover:translate-x-0.5 transition-transform"
              />
            </button>
            <button className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white/5 hover:bg-white/8 border border-white/10 hover:border-white/20 text-white/80 hover:text-white font-semibold text-sm transition-all duration-200">
              <FiDownload size={15} />
              Download Guide
            </button>
          </div>

          {/* Stats row */}
          <div
            ref={statsRef}
            className="grid grid-cols-3 gap-6 pt-8 border-t border-white/8"
          >
            {stats.map(({ Icon, value, label, dataTarget }) => (
              <div key={label} className="space-y-1">
                <div className="flex items-center gap-1.5 text-lime-400/70 mb-2">
                  <Icon size={15} />
                </div>
                <p
                  className="text-2xl font-bold text-white stat-number"
                  data-target={dataTarget}
                >
                  {value}
                </p>
                <p className="text-xs text-white/45 font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right column — image ── */}
        <div className="relative">
          {/* Subtle lime glow behind image */}
          <div className="absolute inset-0 bg-lime-500/6 rounded-[2rem] blur-2xl scale-95 translate-y-4" />

          <div className="relative w-full h-[480px] lg:h-[560px] rounded-[2rem] overflow-hidden shadow-2xl shadow-black/50">
            {/* Gradient overlay — only at the very bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent z-10" />

            <Image
              src="/3d-house-2.jpg"
              alt="Greece — Golden Visa property investment"
              fill
              className="object-cover mask-shape"
              priority
            />

            {/* Bottom info card */}
            <div className="absolute bottom-6 left-6 right-6 z-20">
              <div className="bg-[#0b101b]/90 backdrop-blur-md border border-white/10 rounded-xl px-6 py-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-[11px] text-white/45 font-medium uppercase tracking-widest mb-0.5">
                    Starting from
                  </p>
                  <p className="text-xl font-bold text-lime-400">€250,000</p>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div>
                  <p className="text-[11px] text-white/45 font-medium uppercase tracking-widest mb-0.5">
                    Processing Time
                  </p>
                  <p className="text-xl font-bold text-white">~90 Days</p>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div>
                  <p className="text-[11px] text-white/45 font-medium uppercase tracking-widest mb-0.5">
                    Validity
                  </p>
                  <p className="text-xl font-bold text-white">5 Years</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
