"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";

const AboutSection: React.FC = () => {
  const aboutItems = [
    {
      title: "Our Mission",
      description:
        "Deliver trusted real estate solutions focused on client success, innovation, and sustainable growth.",
      image: "/about1.jpg",
      icon: "minimalist.png",
    },
    {
      title: "Our Vision",
      description:
        "Redefine modern living through innovation, quality, and meaningful property experiences that elevate everyday life.",
      image: "/about2.jpg",
      icon: "target.png",
    },
    {
      title: "Our Value",
      description:
        "Uphold integrity, professionalism, and dedication in every service to exceed client expectations.",
      image: "/about3.jpg",
      icon: "premium.png",
    },
  ];
  return (
    <section className="bg-[#f3f4f6] text-gray-900 py-16 sm:py-20 lg:py-28 overflow-hidden">
      <div className="max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 lg:gap-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 text-xs text-lime-500 mb-5 lg:mb-6 tracking-wide">
              <span className="w-2 h-2 rounded-full bg-lime-400 inline-block" />
              <span className="uppercase">About The Property</span>
            </div>

            <h2 className="text-[clamp(2.2rem,5vw,4.5rem)] font-medium leading-[1.1] tracking-tight">
              Innovating Property
              <br />
              Solutions Together
            </h2>
          </div>

          <div className="shrink-0">
            <button className="inline-flex items-center gap-2 bg-lime-400 hover:bg-lime-500 text-gray-900 px-5 sm:px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300">
              More About Us
              <ArrowUpRight size={16} />
            </button>
          </div>
        </div>

        {/* CARDS */}
        <div className="mt-12 sm:mt-16 lg:mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 lg:gap-14 items-end">
          {aboutItems.map((item, index) => (
            <div key={index} className="flex flex-col gap-5 sm:gap-6">
              {/* TEXT BLOCK */}
              <div className="flex items-start gap-4 sm:gap-5 mb-6 sm:mb-8 lg:mb-10">
                <div className="w-14 h-10 sm:w-16 sm:h-12 lg:w-20 lg:h-14 flex items-center justify-center text-lime-500 shrink-0">
                  <img
                    src={`/${item.icon}`}
                    alt={item.title}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl lg:text-4xl roboto-condensed font-normal mb-1.5 sm:mb-2">
                    {item.title}
                  </h3>

                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* IMAGE */}
              <div
                className={`
                  overflow-hidden rounded-3xl
                  shadow-[0_20px_50px_rgba(0,0,0,0.08)]
                  ${
                    index === 0
                      ? "h-[230px] sm:h-[320px] lg:h-[550px]"
                      : index === 1
                        ? "h-[200px] sm:h-[290px] lg:h-[520px]"
                        : "h-[170px] sm:h-[260px] lg:h-[480px]"
                  }
                `}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
