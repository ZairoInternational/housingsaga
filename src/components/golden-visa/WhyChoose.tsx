// components/golden-visa/WhyChoose.tsx
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
      className="py-24 relative overflow-hidden bg-white dark:bg-[#050712]"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgb(203 213 225 / 0.3) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Single subtle accent glow */}
      <div className="absolute -top-24 -left-24 w-[520px] h-[520px] bg-lime-500/6 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block px-4 py-2 bg-lime-500/10 text-lime-700 dark:text-lime-300 rounded-full text-sm font-semibold mb-4 border border-lime-400/20">
            Why Choose Us
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
            Why Choose Our{" "}
            <span className="bg-gradient-to-r from-lime-600 to-lime-700 bg-clip-text text-transparent">
              Greece Golden Visa
            </span>{" "}
            Service?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Expert guidance, precise execution, and comprehensive support throughout your residency
            journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, index) => (
            <div
              key={item.title}
              className={`group relative transition-all duration-700 ${
                visibleCards.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <div className="relative h-full bg-white dark:bg-[#0b101b] p-8 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 overflow-hidden">
                {/* subtle hover wash */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-lime-500/5 pointer-events-none" />

                <div className="relative z-10 space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-white/70 dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-center text-lime-600 dark:text-lime-400">
                    <item.Icon size={20} />
                  </div>

                  <div>
                    <h3 className="font-bold text-xl mb-2 text-gray-900 dark:text-white">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                  </div>

                  <div className="h-px w-10 bg-lime-500/40" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
