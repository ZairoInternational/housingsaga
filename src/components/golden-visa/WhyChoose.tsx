"use client";

import { useEffect, useRef, useState } from "react";
import { FiCheckCircle, FiCompass, FiHome, FiShield } from "react-icons/fi";

const items = [
  {
    Icon: FiHome,
    title: "Property Experts",
    desc: "Specialized Greek real estate team ensuring best investment opportunities.",
  },
  {
    Icon: FiShield,
    title: "Precise Verification",
    desc: "Thorough document checks to avoid delays or rejections.",
  },
  {
    Icon: FiCompass,
    title: "Expert Guidance",
    desc: "End-to-end assistance from consultation to residency.",
  },
  {
    Icon: FiCheckCircle,
    title: "Asset Management",
    desc: "Rental, maintenance & investment optimization support.",
  },
];

export default function WhyChoose() {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            items.forEach((_, index) => {
              setTimeout(() => {
                setVisibleCards((prev) => [...prev, index]);
              }, index * 150);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-14 sm:py-16 lg:py-20 relative overflow-hidden bg-[#f5f5f5]"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-12 space-y-3">
          <div className="inline-block px-4 py-2 bg-lime-400/20 text-lime-800 rounded-full text-sm font-semibold border border-lime-500/30">
            Why Choose Us
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1c1c1c]">
            Property · Residency ·{" "}
            <span className="text-lime-600">Long-term care</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Expert guidance for Golden Visa pathways and standard property
            purchases — with clear execution at every step.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {items.map((item, index) => (
            <div
              key={item.title}
              className={`group transition-all duration-700 ${
                visibleCards.includes(index)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div className="relative h-full bg-white p-7 sm:p-8 rounded-2xl border border-gray-300 shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.1)] hover:border-lime-400/50 transition-all duration-300 overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-lime-400" />

                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-lime-400/15 border border-lime-500/25 flex items-center justify-center text-lime-700">
                    <item.Icon size={20} />
                  </div>

                  <div>
                    <h3 className="font-bold text-xl mb-2 text-[#1c1c1c]">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
