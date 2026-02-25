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
    <section className="bg-[#f3f4f6] text-gray-900 py-28">
      <div className="max-w-[95%]  mx-auto px-8">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 text-xs text-emerald-500 mb-6 tracking-wide">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
              <span className="uppercase">About The Property</span>
            </div>

            <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[1.1] tracking-tight">
              Innovating Property
              <br />
              Solutions Together
            </h2>
          </div>

          <div className="shrink-0 mt-4 md:mt-0">
            <button className="inline-flex items-center gap-2 bg-emerald-400 hover:bg-emerald-500 text-gray-900 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300">
              More About Us
              <ArrowUpRight size={16} />
            </button>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-14   items-end ">
          {aboutItems.map((item, index) => (
            <div key={index} className="flex flex-col gap-6 ">
              {/* TEXT BLOCK */}
              <div className="flex items-start gap-5 mb-10">
                <div className="w-24 h-16 flex items-center justify-center text-emerald-500">
                  <img src={`/${item.icon}`} alt={item.title} className="w-24 h-16" />
                </div>

                <div>
                  <h3 className="text-4xl roboto-condensed font-normal mb-2">{item.title}</h3>
                  <p className="text-md font-normal text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* IMAGE */}
              <div
                className={`
          overflow-hidden rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.08)]
          ${index === 0 ? "h-[580px]" : index === 1 ? "h-[550px]" : "h-[520px]"}
        `}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
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
