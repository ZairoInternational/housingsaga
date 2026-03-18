// components/golden-visa/Benefits.tsx
"use client";
import { useEffect, useRef, useState } from "react";

const benefits = [
  {
    icon: "✈️",
    title: "Visa-Free Travel",
    desc: "29 Countries",
    color: "from-blue-500 to-cyan-500",
    bgColor: "from-blue-50 to-cyan-50"
  },
  {
    icon: "🔄",
    title: "5-Year Renewable",
    desc: "Residency",
    color: "from-emerald-500 to-teal-500",
    bgColor: "from-emerald-50 to-teal-50"
  },
  {
    icon: "🏠",
    title: "No Stay",
    desc: "Requirement",
    color: "from-purple-500 to-pink-500",
    bgColor: "from-purple-50 to-pink-50"
  },
  {
    icon: "👨‍👩‍👧‍👦",
    title: "Family",
    desc: "Inclusion",
    color: "from-orange-500 to-red-500",
    bgColor: "from-orange-50 to-red-50"
  },
  {
    icon: "📈",
    title: "High Rental",
    desc: "Yield",
    color: "from-amber-500 to-yellow-500",
    bgColor: "from-amber-50 to-yellow-50"
  },
  {
    icon: "🇪🇺",
    title: "Path to EU",
    desc: "Residency",
    color: "from-indigo-500 to-blue-500",
    bgColor: "from-indigo-50 to-blue-50"
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
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="text-center mb-16">
        <div className="inline-block px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 rounded-full text-sm font-semibold mb-4">
          Program Benefits
        </div>
        <h2 className="text-4xl lg:text-5xl font-bold mb-4">
          Key Benefits
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Unlock exclusive advantages with the Greece Golden Visa program
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {benefits.map((benefit, index) => (
          <div
            key={benefit.title}
            className={`group transition-all duration-700 ${
              visibleCards.includes(index)
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}
          >
            <div className={`relative h-full bg-gradient-to-br ${benefit.bgColor} p-8 rounded-3xl border border-gray-200/50 hover:border-transparent transition-all duration-500 hover:scale-105 hover:shadow-2xl overflow-hidden`}>
              {/* Animated gradient border on hover */}
              <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-[2px] bg-gradient-to-br ${benefit.color}`}>
                <div className={`h-full w-full rounded-3xl bg-gradient-to-br ${benefit.bgColor}`}></div>
              </div>

              <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                {/* Icon */}
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${benefit.color} flex items-center justify-center text-4xl shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`}>
                  {benefit.icon}
                </div>

                {/* Title */}
                <h3 className="font-bold text-xl text-gray-900">
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className={`text-lg font-semibold bg-gradient-to-r ${benefit.color} bg-clip-text text-transparent`}>
                  {benefit.desc}
                </p>

                {/* Decorative pulse on hover */}
                <div className={`absolute top-8 left-1/2 -translate-x-1/2 w-32 h-32 bg-gradient-to-br ${benefit.color} rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-16">
        <button className="group px-10 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-2xl hover:shadow-2xl hover:shadow-amber-500/40 transition-all duration-300 hover:scale-105">
          <span className="flex items-center gap-2">
            Get Started Today
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
        </button>
      </div>
    </section>
  );
}
