// components/golden-visa/InvestmentOptions.tsx
"use client";
import { useState } from "react";

const options = [
  {
    price: "€250,000",
    title: "Special Investment",
    popular: false,
    points: [
      "Commercial → Residential Conversion",
      "Historic Property Restoration",
      "Ideal for redevelopment",
      "Limited availability"
    ],
    gradient: "from-blue-600 to-cyan-600",
    accentColor: "blue"
  },
  {
    price: "€400,000",
    title: "Standard Regions",
    popular: true,
    points: [
      "Outside premium zones",
      "Min 120 sqm",
      "Single residential unit",
      "Best value for families"
    ],
    gradient: "from-amber-600 to-orange-600",
    accentColor: "amber"
  },
  {
    price: "€800,000",
    title: "Premium Zones",
    popular: false,
    points: [
      "Athens, Mykonos, Santorini",
      "High-demand areas",
      "Single unit (no combination)",
      "Maximum rental potential"
    ],
    gradient: "from-purple-600 to-pink-600",
    accentColor: "purple"
  },
];

export default function InvestmentOptions() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-gradient-to-br from-amber-400/20 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-transparent rounded-full blur-3xl"></div>

      <div className="relative z-10">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 rounded-full text-sm font-semibold mb-4">
            Investment Tiers
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold">
            Investment Options
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
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


              {/* Card */}
              <div className={`relative h-full bg-white rounded-3xl border-2 transition-all duration-500 overflow-hidden ${
                option.popular 
                  ? 'border-amber-500 shadow-2xl shadow-amber-500/20' 
                  : 'border-gray-200 hover:border-gray-300 shadow-xl hover:shadow-2xl'
              } ${hoveredIndex === index ? 'scale-105 -translate-y-2' : ''}`}>
                
                {/* Gradient header */}
                <div className={`relative h-32 bg-gradient-to-br ${option.gradient} overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  
                  {/* Animated circles */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
                </div>

                {/* Price tag overlapping header */}
                <div className="relative -mt-12 px-8">
                  <div className="bg-white rounded-2xl shadow-2xl p-6 border-4 border-white">
                    <div className="text-center">
                      <div className={`text-4xl font-bold bg-gradient-to-r ${option.gradient} bg-clip-text text-transparent mb-1`}>
                        {option.price}
                      </div>
                      <div className="text-gray-600 text-sm font-medium">
                        Starting investment
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="px-8 py-8 space-y-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {option.title}
                    </h3>
                  </div>

                  {/* Features list */}
                  <ul className="space-y-3">
                    {option.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-3 group/item">
                        <div className={`flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br ${option.gradient} flex items-center justify-center mt-0.5`}>
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-700 leading-relaxed group-hover/item:text-gray-900 transition-colors">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <button className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 ${
                    option.popular
                      ? `bg-gradient-to-r ${option.gradient} text-white shadow-lg hover:shadow-xl hover:scale-105`
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}>
                    <span className="flex items-center justify-center gap-2">
                      Learn More
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </button>
                </div>

                {/* Hover glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${option.gradient} opacity-0 ${
                  hoveredIndex === index ? 'opacity-5' : ''
                } transition-opacity duration-500 pointer-events-none`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom info */}
        <div className="text-center mt-16 space-y-4">
          <p className="text-gray-600">
            Not sure which option is right for you?
          </p>
          <button className="px-8 py-3 bg-white border-2 border-gray-300 text-gray-900 font-semibold rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-300">
            Schedule a Free Consultation
          </button>
        </div>
      </div>
    </section>
  );
}
