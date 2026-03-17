"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    title: "Initial Consultation",
    text: "We discuss your goals, define priorities, and create a personalized plan for success.",
  },
  {
    number: "02",
    title: "Market Research",
    text: "We analyze market trends and locations to find the best property opportunities available.",
  },
  {
    number: "03",
    title: "Project Execution",
    text: "Our team manages all details efficiently, ensuring quality, transparency, and timely completion.",
  },
  {
    number: "04",
    title: "Final Delivery",
    text: "We deliver finished projects flawlessly, exceeding expectations and ensuring complete client satisfaction.",
  },
];

const HowWeBuildSuccessSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

useLayoutEffect(() => {
  const ctx = gsap.context(() => {
    const image = sectionRef.current?.querySelector(
      ".house-image",
    ) as HTMLElement;
    const cardsContainer = sectionRef.current?.querySelector(
      ".cards-container",
    ) as HTMLElement;

    if (!image || !cardsContainer) return;

    const container = sectionRef.current as HTMLElement;

    const containerHeight = container.offsetHeight;
    const imageHeight = image.offsetHeight;
    const imageTop = image.offsetTop;

    // space available below image
    const spaceBelow = containerHeight+100 - (imageTop + imageHeight);

    // movement limit (never exceed container)
    const maxMove = Math.min(120, spaceBelow);
      
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.2,
      },
    });

    tl.to(
      image,
      {
        y: maxMove,
        ease: "none",
      },
      0,
    );

    tl.to(
      cardsContainer,
      {
        y: 20,
        ease: "none",
      },
      0,
    );

    cardsRef.current.forEach((card) => {
      gsap.fromTo(
        card,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
        },
      );
    });
  }, sectionRef);

  return () => ctx.revert();
}, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#f5f5f5] text-[#111] pt-20 sm:pt-24 lg:pt-32 overflow-hidden relative"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {/* LEFT COLUMN */}
        <div className="flex flex-col justify-start lg:justify-between">
          <div>
            <div className="text-xs sm:text-sm text-lime-500 mb-4 font-medium">
              • How We Work
            </div>

            <h2 className="font-semibold leading-[1.05] tracking-tight text-[clamp(2.3rem,5vw,4.5rem)]">
              Understand How
              <br />
              We Build Success
            </h2>

            <p className="text-gray-600 mt-5 sm:mt-6 max-w-md leading-relaxed text-sm sm:text-base">
              We combine strategic planning, market expertise, and client
              collaboration to create impactful real estate solutions that drive
              growth, ensure quality, and deliver long-term success.
            </p>

            <button className="mt-7 sm:mt-8 inline-flex items-center gap-2 bg-lime-400 hover:bg-lime-300 text-black px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-sm font-medium transition">
              Join Us Now
              <ArrowUpRight size={16} />
            </button>
          </div>

          <img
            src="/h2_img3.png"
            alt="Modern house"
            className="house-image mt-12 sm:mt-14 w-full max-w-md lg:max-w-xl pointer-events-none select-none"
            draggable={false}
          />
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col gap-6 sm:gap-8 cards-container">
          {steps.map((step, i) => (
            <div
              key={step.number}
              ref={(el) => {
                if (el) cardsRef.current[i] = el;
              }}
              className="
                flex gap-4 sm:gap-6 items-start
                p-5 sm:p-7
                rounded-2xl
                border border-gray-300
                bg-white/60 backdrop-blur-sm
              "
            >
              <div className="bg-lime-400 text-black text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shrink-0">
                {step.number}
              </div>

              <div>
                <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-1 sm:mb-2">
                  {step.title}
                </h3>

                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed max-w-sm">
                  {step.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWeBuildSuccessSection;
