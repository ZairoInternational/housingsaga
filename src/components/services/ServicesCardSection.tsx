"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

type ServiceCardData = {
  iconSrc: string;
  title: string;
  intro: string;
  bullets: string[];
  imageSrc: string;
  imageAlt: string;
};

const serviceCards: ServiceCardData[] = [
  {
    iconSrc: "/minimalist.png",
    title: "Greece Golden Visa Pathway",
    intro:
      "End-to-end support when you want EU residency through property investment — optional, not required.",
    bullets: [
      "Eligibility, thresholds, and program structure explained clearly",
      "Documentation and compliance guidance step by step",
      "Coordination with Greek authorities for filing",
      "Help through biometrics and residency issuance",
    ],
    imageSrc: "/about1.jpg",
    imageAlt: "Golden Visa journey",
  },
  {
    iconSrc: "/target.png",
    title: "Strategic Property Advisory",
    intro:
      "Investment guidance for residency, rental income, lifestyle living, or capital growth — with or without a visa path.",
    bullets: [
      "Clarify your purpose: visa, yield, second home, or portfolio",
      "Match locations and property types across Greece",
      "Visa-eligible picks when needed — or standard homes when not",
      "Market trends, rental demand, and appreciation outlook",
    ],
    imageSrc: "/about2.jpg",
    imageAlt: "Advisory and property selection",
  },
  {
    iconSrc: "/premium.png",
    title: "Verified Property Access",
    intro:
      "Curated homes and investments — pre-checked for ownership and compliance. Golden Visa eligibility when it matters; open inventory when it doesn’t.",
    bullets: [
      "Clear ownership and title verification",
      "Legal and regulatory compliance",
      "Visa-eligible options plus non-visa properties",
      "Rental yield potential and market demand",
    ],
    imageSrc: "/about3.jpg",
    imageAlt: "Verified properties",
  },
];

export default function ServicesCardSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#f3f4f6] text-gray-900 py-14 sm:py-16 lg:py-20 overflow-hidden"
    >
      <div className="max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 lg:gap-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 text-xs text-lime-500 mb-5 lg:mb-6 tracking-wide">
              <span className="w-2 h-2 rounded-full bg-lime-400 inline-block" />
              <span className="uppercase">Our Services</span>
            </div>

            <h2 className="text-[clamp(2rem,4.5vw,3.75rem)] font-medium leading-[1.1] tracking-tight">
              Property, residency &amp; support —{" "}
              <span className="text-lime-600">your way</span>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-gray-600 max-w-2xl leading-relaxed">
              HousingSaga helps you buy in Greece for investment or living.
              Golden Visa is one pathway we offer — we also list and advise on
              properties that don’t require visa eligibility.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-3">
            <Link
              href="/golden-visa"
              className="inline-flex items-center justify-center gap-2 bg-lime-400 hover:bg-lime-300 text-gray-900 px-5 sm:px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300"
            >
              Explore Golden Visa
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 px-5 sm:px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300"
            >
              Browse all properties
            </Link>
          </div>
        </div>

        <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7 items-stretch">
          {serviceCards.map((card, index) => (
            <article
              key={card.title}
              className={`
                group flex h-full flex-col rounded-3xl bg-white border border-gray-200
                shadow-[0_16px_40px_rgba(0,0,0,0.06)]
                transition-all duration-700 ease-out
                hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(0,0,0,0.1)]
                hover:border-lime-400/40
                ${
                  visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }
              `}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              <div className="p-6 sm:p-7 flex flex-col flex-1 min-h-0">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center text-lime-500 shrink-0 rounded-xl bg-lime-50 border border-lime-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={card.iconSrc}
                      alt=""
                      className="w-8 h-8 object-contain"
                      draggable={false}
                    />
                  </div>

                  <h3 className="text-lg sm:text-xl font-semibold leading-snug text-[#1c1c1c] pt-1">
                    {card.title}
                  </h3>
                </div>

                <p className="mt-4 text-sm text-gray-600 leading-relaxed">
                  {card.intro}
                </p>

                <ul className="mt-5 space-y-2 text-sm text-gray-600 leading-relaxed flex-1">
                  {card.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-lime-400 shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 rounded-2xl overflow-hidden h-[180px] sm:h-[200px] relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={card.imageSrc}
                    alt={card.imageAlt}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
