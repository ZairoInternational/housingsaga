"use client";

import React, { useRef } from "react";
import CountUp from "@/components/CountUp";
import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const RealEstateExcellenceSection: React.FC = () => {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!imageRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { y: -80, scale: 1.08 },
        {
          y: 80,
          scale: 1.08,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-[#f5f5f5] text-[#111] py-16 sm:py-20 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left */}
          <div>
            <div className="text-xs sm:text-sm text-lime-500 mb-4 font-medium">
              • What We Offer
            </div>

            <h2
              className="font-semibold leading-[1.05] tracking-tight
              text-[clamp(2.2rem,5vw,4rem)]"
            >
              A Century Of Real
              <br />
              Estate Excellence
            </h2>
          </div>

          {/* Right */}
          <div
            className="text-gray-600 leading-relaxed
            text-sm sm:text-base md:text-lg
            max-w-lg lg:ml-auto pt-2 lg:pt-10"
          >
            With over a century of experience, we deliver trusted real estate
            solutions that define quality, integrity, and long-lasting value.
          </div>
        </div>

        {/* Stats Row */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
          mt-14 sm:mt-16
          border-t border-gray-300 pt-8 sm:pt-10"
        >
          {/* Stat */}
          <div
            className="pb-8 sm:pb-10 lg:pb-0
            border-b sm:border-b lg:border-b-0
            sm:border-r border-gray-300
            pr-0 sm:pr-8"
          >
            <div className="text-xs text-gray-500 mb-4">• Property Deliver</div>

            <div
              className="font-semibold
              text-4xl sm:text-5xl lg:text-6xl"
            >
              <CountUp end={34} duration={1.5} suffix="+" />
            </div>
          </div>

          {/* Stat */}
          <div
            className="pb-8 sm:pb-10 lg:pb-0
            border-b lg:border-b-0
            lg:border-r border-gray-300
            px-0 sm:px-8"
          >
            <div className="text-xs text-gray-500 mb-4">• Total Agents</div>

            <div
              className="font-semibold
              text-4xl sm:text-5xl lg:text-6xl"
            >
              <CountUp end={10} duration={1.5} suffix="+" />
            </div>
          </div>

          {/* Stat */}
          <div className="pl-0 sm:pl-8">
            <div className="text-xs text-gray-500 mb-4">• Happy Clients</div>

            <div
              className="font-semibold
              text-4xl sm:text-5xl lg:text-6xl"
            >
              <CountUp end={30} duration={1.5} suffix="+" />
            </div>
          </div>
        </div>

        {/* Image Container */}
        {/* <div
          ref={containerRef}
          className="
            relative
            mt-14 sm:mt-16
            rounded-2xl
            overflow-hidden
            h-[360px]
            sm:h-[500px]
            lg:h-[680px]
          "
        >
          <img
            ref={imageRef}
            src="/rentalexp.jpg"
            alt="Luxury Property"
            draggable={false}
            className="
              absolute inset-0
              w-full h-[120%]
              object-cover
              will-change-transform
            "
          />
        </div> */}
      </div>
    </section>
  );
};

export default RealEstateExcellenceSection;
