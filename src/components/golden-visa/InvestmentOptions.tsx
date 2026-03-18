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
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white dark:from-[#050712] dark:via-[#070a12] dark:to-[#050712]" />

      <div className="absolute top-1/4 left-0 w-96 h-96 bg-gradient-to-br from-lime-400/15 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gradient-to-br from-lime-400/10 to-transparent rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-lime-500/15 to-white/0 text-lime-700 dark:text-lime-300 rounded-full text-sm font-semibold mb-4 border border-lime-400/20">
            Investment Tiers
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">Investment Options</h2>
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
              {option.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                  <div className="px-6 py-2 bg-lime-500 text-black text-sm font-bold rounded-full shadow-lg shadow-lime-500/20">
                    Most Popular
                  </div>
                </div>
              )}

              <div
                className={`relative h-full rounded-3xl border-2 transition-all duration-500 overflow-hidden ${
                  option.popular
                    ? "border-lime-500 shadow-2xl shadow-lime-500/10"
                    : "border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 shadow-lg hover:shadow-xl"
                } ${hoveredIndex === index ? "scale-105 -translate-y-2" : ""} bg-white dark:bg-[#0b101b]`}
              >
                {/* Neutral header */}
                <div className="relative h-24 bg-gray-100 dark:bg-white/5 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-white/0 to-black/5 dark:to-black/20" />
                </div>

                <div className="relative -mt-12 px-8">
                  <div className="bg-white dark:bg-[#0f1117] rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-white/10">
                    <div className="text-center">
                      <div
                        className={`text-4xl font-bold mb-1 ${
                          option.popular ? "text-lime-600 dark:text-lime-300" : "text-gray-900 dark:text-white"
                        }`}
                      >
                        {option.price}
                      </div>
                      <div className="text-gray-600 dark:text-gray-300 text-sm font-medium">Starting investment</div>
                    </div>
                  </div>
                </div>

                <div className="px-8 py-8 space-y-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{option.title}</h3>
                  </div>

                  <ul className="space-y-3">
                    {option.points.map((point) => (
                      <li key={point} className="flex items-start gap-3 group/item">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-lime-500/12 border border-lime-400/25 text-lime-600 dark:text-lime-300 flex items-center justify-center mt-0.5">
                          <FiCheck size={14} />
                        </div>
                        <span className="text-gray-700 dark:text-gray-300 leading-relaxed group-hover/item:text-gray-900 dark:group-hover/item:text-white transition-colors">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 ${
                      option.popular
                        ? "bg-lime-500 hover:bg-lime-400 text-black shadow-lg shadow-lime-500/15 hover:scale-105"
                        : "bg-gray-100 dark:bg-white/5 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-white/8"
                    }`}
                  >
                    <span className="flex items-center justify-center gap-2">
                      Learn More
                      <FiArrowRight size={16} />
                    </span>
                  </button>
                </div>

                <div
                  className={`absolute inset-0 opacity-0 ${
                    hoveredIndex === index ? "opacity-100" : ""
                  } transition-opacity duration-500 pointer-events-none bg-lime-500/3`}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16 space-y-4">
          <p className="text-gray-600 dark:text-gray-400">Not sure which option is right for you?</p>
          <button className="px-8 py-3 bg-white dark:bg-white/5 border-2 border-gray-300 dark:border-white/15 text-gray-900 dark:text-white font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-white/8 hover:border-gray-400 dark:hover:border-white/25 transition-all duration-300">
            Schedule a Free Consultation
          </button>
        </div>
      </div>
    </section>
  );
}
