// components/golden-visa/Benefits.tsx
"use client";
import { useEffect, useRef, useState } from "react";
import {
  FiGlobe,
  FiHome,
  FiRefreshCw,
  FiStar,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";

const benefits = [
  {
    title: "Visa-Free Travel",
    desc: "Visa-free access across 29 Schengen countries.",
    Icon: FiGlobe,
  },
  {
    title: "5-Year Renewable",
    desc: "Renewable residency permit as long as you maintain investment.",
    Icon: FiRefreshCw,
  },
  {
    title: "No Stay Requirement",
    desc: "Keep your permit without relocating permanently.",
    Icon: FiHome,
  },
  {
    title: "Family Inclusion",
    desc: "Include eligible family members under one application.",
    Icon: FiUsers,
  },
  {
    title: "High Rental",
    desc: "Potential for strong yields in prime locations.",
    Icon: FiTrendingUp,
  },
  {
    title: "Path to EU",
    desc: "Long-term European access with renewal options.",
    Icon: FiStar,
  },
];

export default function Benefits() {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            benefits.forEach((_, index) => {
              setTimeout(() => {
                setVisibleCards((prev) => [...prev, index]);
              }, index * 100);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-[#050712] text-white relative overflow-hidden"
    >
      <div className="absolute -top-32 -right-32 w-[560px] h-[560px] bg-lime-500/6 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="inline-block px-4 py-2 bg-lime-500/10 text-lime-300 rounded-full text-sm font-semibold mb-4 border border-lime-400/20">
            Program Benefits
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">Key Benefits</h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Unlock exclusive advantages with the Greece Golden Visa program
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className={`transition-all duration-700 ${
                visibleCards.includes(index)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div className="flex gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-lime-400/20 hover:bg-white/6 transition-colors">
                <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-lime-500/10 border border-lime-400/20 text-lime-300 flex items-center justify-center">
                  <benefit.Icon size={18} />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-base text-white">{benefit.title}</h3>
                  <p className="mt-1 text-sm text-white/60 leading-relaxed">{benefit.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <button className="group px-10 py-4 bg-lime-500 hover:bg-lime-400 text-black font-semibold rounded-2xl transition-all duration-200 shadow-lg shadow-lime-500/15">
            <span className="flex items-center gap-2">
              Get Started Today
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
