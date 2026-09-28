"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { FiArrowRight, FiDownload } from "react-icons/fi";
import { HiOutlineShieldCheck } from "react-icons/hi";
import { LuBuilding2, LuClock, LuGlobe } from "react-icons/lu";
import ScheduleCallbackButton from "@/components/golden-visa/ScheduleCallbackButton";
import toast from "react-hot-toast";

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
    <section className="relative min-h-[92vh] flex items-center py-20 overflow-hidden bg-[#070a12]">
      <Image
        src="/Web-2.png"
        alt="Greece — EU property and residency pathways"
        fill
        className="object-cover mask-shape"
        priority
      />
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 grid lg:grid-cols-2 gap-14 items-center w-full max-w-7xl mx-auto px-6">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 mt-2 rounded-full bg-lime-500/15 border border-lime-500/25 text-lime-100 text-sm font-medium">
            <HiOutlineShieldCheck size={16} />
            EU Property & Residency Pathways — Greece
          </div>

          <div>
            <h1 className="text-5xl lg:text-[4.25rem] font-bold leading-[1.08] tracking-tight text-white">
              Greece
              <br />
              <span className="text-lime-400">Golden Visa</span>
              <br />
              & Beyond
            </h1>
            <p className="mt-5 text-base sm:text-lg text-white/70 leading-relaxed max-w-lg">
              Buy property for residency, investment, or lifestyle — with or
              without the Golden Visa route. Visa-free Schengen access when
              eligible, plus rental potential through VacationSaga.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <ScheduleCallbackButton className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-lime-400 hover:bg-lime-300 text-black font-semibold text-sm transition-all duration-200 shadow-lg shadow-lime-500/20">
              Schedule a Meeting
              <FiArrowRight
                size={16}
                className="group-hover:translate-x-0.5 transition-transform"
              />
            </ScheduleCallbackButton>
            <button
              type="button"
              onClick={() =>
                toast("Guide coming soon — we’ll publish the PDF shortly.")
              }
              className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white/5 hover:bg-white/8 border border-white/10 hover:border-white/20 text-white/80 hover:text-white font-semibold text-sm transition-all duration-200"
            >
              <FiDownload size={15} />
              Download Guide
            </button>
          </div>

          <div
            ref={statsRef}
            className="grid grid-cols-3 gap-6 pt-8 border-t border-white/8"
          >
            {stats.map(({ Icon, value, label, dataTarget }) => (
              <div key={label} className="space-y-1">
                <div className="flex items-center gap-1.5 text-lime-300/80 mb-2">
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

        <div className="relative hidden lg:block">
          <div className="absolute inset-0 bg-lime-500/10 rounded-[2rem] blur-2xl scale-95 translate-y-4" />
        </div>
      </div>
    </section>
  );
}
