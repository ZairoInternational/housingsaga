// components/golden-visa/WhyChoose.tsx
"use client";
import { useEffect, useRef, useState } from "react";

const items = [
  {
    icon: "🏛️",
    title: "Property Experts",
    desc: "Specialized Greek real estate team ensuring best investment opportunities.",
    gradient: "from-blue-500/20 to-cyan-500/20",
    iconBg: "from-blue-500 to-cyan-500"
  },
  {
    icon: "✓",
    title: "Precise Verification",
    desc: "Thorough document checks to avoid delays or rejections.",
    gradient: "from-emerald-500/20 to-teal-500/20",
    iconBg: "from-emerald-500 to-teal-500"
  },
  {
    icon: "🎯",
    title: "Expert Guidance",
    desc: "End-to-end assistance from consultation to residency.",
    gradient: "from-amber-500/20 to-orange-500/20",
    iconBg: "from-amber-500 to-orange-500"
  },
  {
    icon: "💼",
    title: "Asset Management",
    desc: "Rental, maintenance & investment optimization support.",
    gradient: "from-purple-500/20 to-pink-500/20",
    iconBg: "from-purple-500 to-pink-500"
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
            // Stagger the card animations
            items.forEach((_, index) => {
              setTimeout(() => {
                setVisibleCards((prev) => [...prev, index]);
              }, index * 150);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(203 213 225 / 0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Gradient blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-amber-400/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-3xl"></div>

      <div className="relative z-10">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold mb-4">
            Why Choose Us
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold">
            Why Choose Our{" "}
            <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              Greece Golden Visa
            </span>{" "}
            Service?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Expert guidance, precise execution, and comprehensive support throughout your residency journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, index) => (
            <div
              key={item.title}
              className={`group relative transition-all duration-700 ${
                visibleCards.includes(index)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
            >
              {/* Glassmorphic card */}
              <div className="relative h-full bg-white/70 backdrop-blur-xl p-8 rounded-3xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:bg-white/80 overflow-hidden">
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`}></div>
                
                {/* Animated border glow */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
                  background: `linear-gradient(135deg, transparent 0%, rgba(251, 191, 36, 0.3) 50%, transparent 100%)`,
                }}></div>

                <div className="relative z-10 space-y-4">
                  {/* Icon with gradient background */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.iconBg} flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                    {item.icon}
                  </div>

                  <div>
                    <h3 className="font-bold text-xl mb-2 text-gray-900 group-hover:text-gray-950 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                      {item.desc}
                    </p>
                  </div>

                  {/* Hover indicator */}
                  <div className="flex items-center gap-2 text-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="text-sm font-semibold">Learn more</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>

                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-amber-400/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
