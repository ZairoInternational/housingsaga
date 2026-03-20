"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type ProcessStep = {
  number: string;
  title: string;
  summary: string;
  bullets: string[];
};

const steps: ProcessStep[] = [
  {
    number: "01",
    title: "Legal & Compliance Management",
    summary:
      "We work closely with licensed legal professionals in Greece to ensure every transaction is fully compliant and protected.",
    bullets: [
      "Comprehensive due diligence and title checks",
      "Drafting and reviewing of sale agreements",
      "Guidance on taxes, regulatory requirements, and documentation",
      "Coordination with local authorities for approvals and registrations",
    ],
  },
  {
    number: "02",
    title: "Transaction Execution",
    summary:
      "Housing Saga manages the entire purchase process, ensuring a seamless experience from selection to ownership.",
    bullets: [
      "Price negotiation and deal structuring",
      "Coordination with property owners, developers, and agents",
      "Handling documentation and payment processes",
      "Assistance with property registration and ownership transfer",
    ],
  },
  {
    number: "03",
    title: "Cross-Border Expertise",
    summary:
      "Our presence in both India and Greece allows us to provide a truly integrated cross-border solution.",
    bullets: [
      "Seamless communication between clients and Greek partners",
      "Real-time updates on process milestones",
      "Efficient handling of international documentation and procedures",
      "A single point of contact for complete coordination",
    ],
  },
  {
    number: "04",
    title: "Post-Investment & Asset Management",
    summary:
      "Our relationship continues beyond the transaction, helping you manage and grow your investment effectively.",
    bullets: [
      "Property management and maintenance support",
      "Tenant sourcing and rental management",
      "Assistance with Golden Visa renewals and compliance",
      "Ongoing advisory for portfolio growth and optimization",
    ],
  },
];

export default function ServicesProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const [openIndexes, setOpenIndexes] = useState<number[]>([0, 1]);

  const toggleStep = (index: number) => {
    setOpenIndexes((prev) => {
      // Close if already open.
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index);
      }

      // Open if fewer than 2 are open.
      if (prev.length < 2) {
        return [...prev, index];
      }

      // If 2 are already open, close the one with the lowest index.
      const lowest = Math.min(...prev);
      return [...prev.filter((i) => i !== lowest), index];
    });
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const image = sectionRef.current?.querySelector(
        ".house-image",
      ) as HTMLElement | null;
      const cardsContainer = sectionRef.current?.querySelector(
        ".cards-container",
      ) as HTMLElement | null;

      if (!image || !cardsContainer) return;

      const container = sectionRef.current as HTMLElement;
      const containerHeight = container.offsetHeight;
      const imageHeight = image.offsetHeight;
      const imageTop = image.offsetTop;

      // space available below image
      const spaceBelow = containerHeight + 100 - (imageTop + imageHeight);

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

      tl.to(image, { y: maxMove, ease: "none" }, 0);
      tl.to(cardsContainer, { y: 20, ease: "none" }, 0);

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
      className="bg-[#f5f5f5] text-[#111] pt-20 sm:pt-24 lg:pt-20 overflow-hidden relative"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {/* LEFT COLUMN */}
        <div className="flex flex-col justify-start lg:justify-between">
          <div>
            <div className="text-xs sm:text-sm text-lime-500 mb-4 font-medium">
              • Our Support
            </div>

            <h2 className="font-semibold leading-[1.05] tracking-tight text-[clamp(2.3rem,5vw,4.5rem)]">
              A Smooth, Transparent,
              <br />
              Fully Managed Journey
            </h2>

            <p className="text-gray-600 mt-5 sm:mt-6 max-w-md leading-relaxed text-sm sm:text-base">
              We provide a smooth, transparent, and fully managed experience,
              combining local expertise in Greece with personalized support in
              India.
            </p>

            <button className="mt-7 sm:mt-8 inline-flex items-center gap-2 bg-lime-400 hover:bg-lime-300 text-black px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-sm font-medium transition">
              Secure the Greece Golden Visa
              <ArrowUpRight size={16} />
            </button>
          </div>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/h2_img3.png"
            alt="Golden Visa investment journey"
            className="house-image mt-12 sm:mt-14 w-full max-w-md lg:max-w-xl pointer-events-none select-none"
            draggable={false}
          />
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col gap-6 sm:gap-2 cards-container">
          {steps.map((step, i) => (
            <div
              key={step.number}
              ref={(el) => {
                if (el) cardsRef.current[i] = el;
              }}
              className="
                flex flex-col gap-3
                p-5 sm:p-7
                rounded-2xl
                border border-gray-300
                bg-white/60 backdrop-blur-sm
              "
            >
              {(() => {
                const isOpen = openIndexes.includes(i);
                const buttonId = `services-process-button-${i}`;
                const panelId = `services-process-panel-${i}`;

                return (
                  <>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => toggleStep(i)}
                      className="text-left"
                    >
                      <div className="flex items-start gap-4">
                        <div className="bg-lime-400 text-black text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shrink-0">
                          {step.number}
                        </div>

                        <div className="min-w-0">
                          <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-2">
                            {step.title}
                          </h3>
                        </div>
                      </div>
                    </button>

                    <div
                      className={`grid transition-all duration-300 ${
                        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        className="overflow-hidden"
                      >
                        <ul className="mt-1 space-y-2 text-sm sm:text-base text-gray-600 leading-relaxed">
                          {step.bullets.map((bullet) => (
                            <li key={bullet} className="flex items-start gap-2">
                              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-lime-400 shrink-0" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

