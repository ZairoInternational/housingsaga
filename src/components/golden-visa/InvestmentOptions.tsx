// components/golden-visa/InvestmentOptions.tsx
"use client";
import { useState } from "react";
import { FiArrowRight, FiCheck } from "react-icons/fi";

const options = [
  {
    price: "€250,000",
    title: "Special Investment",
    popular: false,
    points: [
      "Commercial → Residential Conversion",
      "Historic Property Restoration",
      "Ideal for redevelopment",
      "Limited availability",
    ],
  },
  {
    price: "€400,000",
    title: "Standard Regions",
    popular: true,
    points: ["Outside premium zones", "Min 120 sqm", "Single residential unit", "Best value for families"],
  },
  {
    price: "€800,000",
    title: "Premium Zones",
    popular: false,
    points: [
      "Athens, Mykonos, Santorini",
      "High-demand areas",
      "Single unit (no combination)",
      "Maximum rental potential",
    ],
  },
];

export default function InvestmentOptions() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-24 relative overflow-hidden bg-white dark:bg-[#050712]">
      <div className="absolute inset-0 bg-gray-50" />

      <div className="absolute top-1/4 left-0 w-96 h-96 bg-gradient-to-br from-yellow-500/20 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gradient-to-br from-yellow-500/16 to-transparent rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-yellow-500/22 to-white/0 text-yellow-800 dark:text-yellow-200 rounded-full text-sm font-semibold mb-4 border border-yellow-400/30">
            Investment Tiers
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
            Investment Options
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Choose the investment tier that aligns with your goals and budget
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {options.map((option, index) => (
            <div
              key={option.title}
              className="relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div
                className={`group relative h-full rounded-3xl transition-all duration-500 overflow-hidden ${
                  option.popular
                    ? "border border-yellow-400/40 shadow-[0_20px_60px_-10px_rgba(234,179,8,0.25)]"
                    : "border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20"
                } ${hoveredIndex === index ? "translate-y-[-6px]" : ""} bg-white/80 dark:bg-white/5 backdrop-blur-xl`}
              >
                {/* Glow effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-yellow-400/10 via-transparent to-transparent" />

                {/* Popular Badge */}
                {option.popular && (
                  <div className="absolute top-4 right-4 px-3 py-1 text-xs font-semibold bg-yellow-500 text-black rounded-full shadow-md">
                    Most Popular
                  </div>
                )}

                <div className="px-8 pt-10 pb-8 space-y-8 relative z-10">
                  {/* Price */}
                  <div className="text-center space-y-2">
                    <h2
                      className={`text-5xl font-extrabold tracking-tight ${
                        option.popular
                          ? "text-yellow-500"
                          : "text-gray-900 dark:text-white"
                      }`}
                    >
                      {option.price}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Minimum Investment
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-white/20 to-transparent" />

                  {/* Title */}
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {option.title}
                    </h3>
                  </div>

                  {/* Features */}
                  <ul className="space-y-4">
                    {option.points.map((point) => (
                      <li key={point} className="flex items-start gap-3">
                        <div className="mt-1 w-5 h-5 rounded-full bg-yellow-500/20 flex items-center justify-center">
                          <FiCheck size={12} className="text-yellow-500" />
                        </div>
                        <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <button
                    className={`w-full py-3.5 rounded-xl font-semibold transition-all duration-300 ${
                      option.popular
                        ? "bg-yellow-500 text-black hover:bg-yellow-400 shadow-lg shadow-yellow-500/20"
                        : "bg-gray-900 dark:bg-white text-white dark:text-black hover:opacity-90"
                    }`}
                  >
                    <span className="flex items-center justify-center gap-2">
                      Explore Option
                      <FiArrowRight size={16} />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16 space-y-4">
          <p className="text-gray-600 dark:text-gray-400">
            Not sure which option is right for you?
          </p>
          <button className="px-8 py-3 bg-white dark:bg-white/5 border-2 border-gray-300 dark:border-white/15 text-gray-900 dark:text-white font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-white/8 hover:border-gray-400 dark:hover:border-white/25 transition-all duration-300">
            Schedule a Free Consultation
          </button>
        </div>
      </div>
    </section>
  );
}
