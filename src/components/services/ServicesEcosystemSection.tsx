"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  BriefcaseBusiness,
  Home,
  ShieldCheck,
  Zap,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type EcosystemItem = {
  icon: React.ReactNode;
  label: string;
  position: {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
  };
};

const ecosystemItems: EcosystemItem[] = [
  {
    icon: <Home size={18} />,
    label: "End-to-end service under one roof",
    position: { top: "15%", left: "18%" },
  },
  {
    icon: <ShieldCheck size={18} />,
    label: "Consistent quality and transparency",
    position: { top: "35%", right: "23%" },
  },
  {
    icon: <Zap size={18} />,
    label: "Faster execution with reduced risk",
    position: { bottom: "20%", left: "31%" },
  },
  {
    icon: <BriefcaseBusiness size={18} />,
    label: "A structured and professional investment experience",
    position: { bottom: "10%", right: "28 %" },
  },
];

export default function ServicesEcosystemSection() {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const hotspotRefs = useRef<Array<HTMLButtonElement | null>>([]);

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

      // Subtle independent floating for each hotspot (no ScrollTrigger).
      hotspotRefs.current.forEach((hotspotButton, index) => {
        if (!hotspotButton) return;
        const floatY = index % 2 === 0 ? -10 : 10;
        const duration = 2.8 + index * 0.7;

        gsap.to(hotspotButton, {
          y: floatY,
          duration,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-[#f5f5f5] text-[#111] py-16 sm:py-20 lg:py-10 overflow-hidden">
      <div className="max-w-[90%] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-16 items-start">
          {/* LEFT */}
          <div className="max-w-3xl">
            <div className="text-xs sm:text-sm text-lime-500 mb-4 font-medium">
              • A Complete Investment Ecosystem
            </div>

            <h2 className="font-semibold leading-[1.05] tracking-tight text-[clamp(2.2rem,5vw,4rem)]">
              A Complete Investment
              <br className="hidden sm:block" />
              Ecosystem
            </h2>
          </div>

          {/* RIGHT */}
          <div className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-lg max-w-xl lg:pt-10">
            At Housing Saga, we bring together real estate expertise, legal
            support, and residency solutions into a single, integrated platform.
          </div>
        </div>

        <div
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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={imageRef}
            src="/rentalexp.jpg"
            alt="Housing Saga Ecosystem"
            draggable={false}
            className="
              absolute inset-0
              w-full h-[120%]
              object-cover
              will-change-transform
            "
          />
          {/* Hotspots */}
          {ecosystemItems.map((item, index) => (
            <div
              key={item.label}
              className="absolute z-10"
              style={{
                top: item.position.top,
                left: item.position.left,
                right: item.position.right,
                bottom: item.position.bottom,
              }}
            >
              <div className="group relative -translate-x-1/2 -translate-y-1/2">
                <button
                  ref={(el) => {
                    hotspotRefs.current[index] = el;
                  }}
                  type="button"
                  aria-label={item.label}
                  className="
                    relative
                    flex items-center justify-center
                      w-12 h-12
                    rounded-full
                    bg-white/75 backdrop-blur-sm
                    border border-white/70
                    shadow-[0_8px_22px_rgba(0,0,0,0.12)]
                    hover:scale-105
                    transition-transform
                    focus:outline-none
                    focus-visible:ring-2 focus-visible:ring-lime-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent
                  "
                >
                  <span className="text-lime-500">{item.icon}</span>

                  <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-b from-white/40 to-transparent opacity-60" />
                </button>

                {/* Tooltip */}
                <div
                  className="
                    pointer-events-none absolute
                    left-1/2
                    bottom-full
                    mb-3
                    w-[150px] sm:w-[180px]
                    -translate-x-1/2
                    opacity-100 translate-y-0
                    sm:opacity-0 sm:translate-y-2
                    transition-all duration-200 ease-out
                    sm:group-hover:opacity-100 sm:group-hover:translate-y-0
                    sm:group-focus-within:opacity-100 sm:group-focus-within:translate-y-0
                    z-10
                  "
                >
                  <div className="rounded-2xl bg-white/95 backdrop-blur-sm border border-white/70 shadow-[0_14px_38px_rgba(0,0,0,0.16)] p-3">
                    <p className="text-[13px] leading-snug font-semibold text-gray-900 text-center">
                      {item.label}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

