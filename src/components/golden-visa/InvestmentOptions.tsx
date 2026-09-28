"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiArrowRight, FiCheck } from "react-icons/fi";
import ScheduleCallbackButton from "@/components/golden-visa/ScheduleCallbackButton";
import { signalProjectsNavigation } from "@/components/projects/ProjectsRouteProgress";

const options = [
  {
    price: "€250,000",
    title: "Special Investment",
    popular: false,
    minPrice: 250000,
    maxPrice: 350000,
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
    minPrice: 350000,
    maxPrice: 700000,
    points: [
      "Outside premium zones",
      "Min 120 sqm",
      "Single residential unit",
      "Best value for families",
    ],
  },
  {
    price: "€800,000",
    title: "Premium Zones",
    popular: false,
    minPrice: 700000,
    maxPrice: 2000000,
    points: [
      "Athens, Mykonos, Santorini",
      "High-demand areas",
      "Single unit (no combination)",
      "Maximum rental potential",
    ],
  },
];

export default function InvestmentOptions() {
  const router = useRouter();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      id="investment-options"
      className="py-14 sm:py-16 lg:py-20 relative overflow-hidden bg-white scroll-mt-24"
    >
      <div className="absolute inset-0 bg-gray-50" />
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-gradient-to-br from-lime-500/15 to-transparent rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-12 space-y-3">
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-lime-500/22 to-white/0 text-lime-800 rounded-full text-sm font-semibold border border-lime-400/30">
            Investment Tiers
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
            Investment Options
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Golden Visa tiers when you need residency — or browse all properties
            if you simply want to invest or live in Greece.
          </p>
          <button
            type="button"
            onClick={() => {
              signalProjectsNavigation();
              router.push("/projects");
            }}
            className="text-sm font-semibold text-lime-700 hover:text-lime-800 underline underline-offset-4"
          >
            Browse all properties (visa optional)
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
          {options.map((option, index) => (
            <div
              key={option.title}
              className="relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div
                className={`group relative h-full rounded-3xl transition-all duration-500 overflow-hidden border bg-white shadow-sm ${
                  option.popular
                    ? "border-lime-400/50 shadow-[0_20px_60px_-10px_rgba(132,204,22,0.25)]"
                    : "border-gray-300 hover:border-gray-400"
                } ${hoveredIndex === index ? "translate-y-[-4px]" : ""}`}
              >
                {option.popular && (
                  <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-lime-400 text-black text-xs font-bold">
                    Popular
                  </div>
                )}

                <div className="px-7 sm:px-8 pt-10 pb-8 space-y-7 relative z-10">
                  <div className="text-center space-y-2">
                    <h2
                      className={`text-4xl sm:text-5xl font-extrabold tracking-tight ${
                        option.popular ? "text-lime-600" : "text-gray-900"
                      }`}
                    >
                      {option.price}
                    </h2>
                    <p className="text-sm text-gray-500">Minimum Investment</p>
                  </div>

                  <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {option.title}
                    </h3>
                  </div>

                  <ul className="space-y-3">
                    {option.points.map((point) => (
                      <li key={point} className="flex items-start gap-3">
                        <div className="mt-1 w-5 h-5 rounded-full bg-lime-500/20 flex items-center justify-center shrink-0">
                          <FiCheck size={12} className="text-lime-600" />
                        </div>
                        <span className="text-sm text-gray-700 leading-relaxed">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    onClick={() => {
                      signalProjectsNavigation();
                      router.push(
                        `/projects?minPrice=${option.minPrice}&maxPrice=${option.maxPrice}`,
                      );
                    }}
                    className={`w-full py-3.5 rounded-xl font-semibold transition-all duration-300 ${
                      option.popular
                        ? "bg-lime-400 text-black hover:bg-lime-300 shadow-lg shadow-lime-500/20"
                        : "bg-gray-900 text-white hover:opacity-90"
                    }`}
                  >
                    <span className="flex items-center justify-center gap-2">
                      View matching properties
                      <FiArrowRight size={16} />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10 sm:mt-12 space-y-3">
          <p className="text-gray-600">Not sure which option is right for you?</p>
          <ScheduleCallbackButton className="px-8 py-3 bg-white border-2 border-gray-300 text-gray-900 font-semibold rounded-xl hover:bg-gray-50 hover:border-lime-400 transition-all duration-300">
            Schedule a Free Consultation
          </ScheduleCallbackButton>
        </div>
      </div>
    </section>
  );
}
