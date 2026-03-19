// components/golden-visa/Services.tsx
"use client";
import { useState } from "react";
import { FiArrowRight, FiBriefcase, FiHome, FiShield, FiTool, FiUserCheck } from "react-icons/fi";

const services = [
  {
    Icon: FiBriefcase,
    title: "Investment Advisory",
    desc: "Strategic guidance on property selection and portfolio optimization",
  },
  {
    Icon: FiShield,
    title: "Legal & Compliance",
    desc: "Expert legal support ensuring full regulatory compliance",
  },
  {
    Icon: FiHome,
    title: "Property Acquisition",
    desc: "End-to-end property purchase and ownership transfer",
  },
  {
    Icon: FiUserCheck,
    title: "Visa Processing",
    desc: "Complete application management and government liaison",
  },
  {
    Icon: FiTool,
    title: "Property Management",
    desc: "Rental optimization, maintenance, and asset care",
  },
  {
    Icon: FiBriefcase,
    title: "Post-Visa Support",
    desc: "Ongoing assistance with renewals and residency matters",
  },
];

export default function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-24 relative overflow-hidden bg-white dark:bg-[#050712]">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-[#070a12] dark:via-[#050712] dark:to-[#070a12]" />

      <div className="absolute inset-0 opacity-20 dark:opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, rgb(203 213 225) 1px, transparent 0)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block px-4 py-2 bg-yellow-500/15 text-yellow-800 dark:text-yellow-200 rounded-full text-sm font-semibold mb-4 border border-yellow-400/30">
            Our Services
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
            What We Provide
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Comprehensive support at every stage of your Golden Visa journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative h-full bg-white dark:bg-[#0b101b] rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-white/10 hover:-translate-y-0.5 overflow-hidden">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-yellow-500/10 pointer-events-none" />

                <div className="relative z-10 space-y-4">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-xl bg-yellow-500/15 border border-yellow-400/30 text-yellow-700 dark:text-yellow-200 flex items-center justify-center shadow-sm">
                      <service.Icon size={22} />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{service.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{service.desc}</p>

                  <div className="flex items-center gap-2 font-semibold text-yellow-700 dark:text-yellow-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-sm">Learn more</span>
                    <FiArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>

                <div className="absolute top-6 right-6 text-6xl font-bold text-gray-100 dark:text-white/10 group-hover:text-gray-200 dark:group-hover:text-white/15 transition-colors">
                  {String(index + 1).padStart(2, "0")}
                </div>
              </div>

              <div
                className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
                  hoveredIndex === index ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>
          ))}
        </div>

        <div className="mt-16 text-center space-y-6">
          <div>
            <button className="px-10 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold rounded-2xl hover:shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 hover:scale-105">
              <span className="flex items-center gap-2">
                View Full Service Details
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
