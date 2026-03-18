// components/golden-visa/Services.tsx
"use client";
import { useState } from "react";

const services = [
  {
    icon: "📊",
    title: "Investment Advisory",
    desc: "Strategic guidance on property selection and portfolio optimization",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: "⚖️",
    title: "Legal & Compliance",
    desc: "Expert legal support ensuring full regulatory compliance",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: "🏠",
    title: "Property Acquisition",
    desc: "End-to-end property purchase and ownership transfer",
    color: "from-emerald-500 to-teal-500"
  },
  {
    icon: "🛂",
    title: "Visa Processing",
    desc: "Complete application management and government liaison",
    color: "from-amber-500 to-orange-500"
  },
  {
    icon: "🔧",
    title: "Property Management",
    desc: "Rental optimization, maintenance, and asset care",
    color: "from-rose-500 to-red-500"
  },
  {
    icon: "🤝",
    title: "Post-Visa Support",
    desc: "Ongoing assistance with renewals and residency matters",
    color: "from-indigo-500 to-blue-500"
  },
];

export default function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-24 relative overflow-hidden bg-white">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-gray-50"></div>

      {/* Decorative grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgb(203 213 225) 1px, transparent 0)`,
          backgroundSize: '48px 48px'
        }}></div>
      </div>

      <div className="relative z-10">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
            Our Services
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold">
            What We Provide
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
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
              {/* Card */}
              <div className="relative h-full bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-gray-100 hover:border-transparent overflow-hidden">
                {/* Gradient border effect on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                <div className="absolute inset-[2px] bg-white rounded-2xl"></div>

                {/* Content */}
                <div className="relative z-10 space-y-4">
                  {/* Icon with gradient background */}
                  <div className="relative">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                      {service.icon}
                    </div>
                    
                    {/* Glow effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.color} blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500`}></div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-gray-950 transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                    {service.desc}
                  </p>

                  {/* Learn more link */}
                  <div className={`flex items-center gap-2 font-semibold bg-gradient-to-r ${service.color} bg-clip-text text-transparent opacity-0 group-hover:opacity-100 transition-all duration-500`}>
                    <span className="text-sm">Learn more</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>

                {/* Number indicator */}
                <div className="absolute top-6 right-6 text-6xl font-bold text-gray-100 group-hover:text-gray-200 transition-colors">
                  {String(index + 1).padStart(2, '0')}
                </div>

                {/* Hover background glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl pointer-events-none`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-full">
            <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-amber-700 font-semibold text-sm">
              All services included in our comprehensive package
            </span>
          </div>
          
          <div>
            <button className="px-10 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-2xl hover:shadow-2xl hover:shadow-amber-500/40 transition-all duration-300 hover:scale-105">
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
