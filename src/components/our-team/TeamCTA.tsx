"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Connect With Us CTA — original floating banner image + parallax on desktop;
 * stacked image inside the card on smaller screens.
 */
export default function TeamCTA() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const container = sectionRef.current;
      const image = imageRef.current;
      if (!container || !image) return;

      // Same parallax as the original implementation
      const maxMove = 200;

      gsap.fromTo(
        image,
        { x: 0 },
        {
          x: -maxMove,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: 3,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-16 sm:py-20 lg:py-28 bg-[#f5f5f5] dark:bg-[#121212] overflow-x-clip lg:overflow-visible"
    >
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6">
        <div className="relative rounded-[24px] overflow-hidden bg-[#2d2823] text-white flex flex-col lg:flex-row lg:items-center lg:justify-between px-6 sm:px-10 lg:px-16 py-10 sm:py-12 lg:py-14">
          <div className="relative z-10 min-w-0 max-w-[420px]">
            <p className="text-lime-400 text-sm mb-3">• Connect With Us</p>

            <h2 className="text-[28px] sm:text-[36px] lg:text-[44px] font-semibold mb-5 sm:mb-6 leading-snug">
              Discover Amazing Properties Easily
            </h2>

            <Link
              href="/contact#contact-form"
              className="inline-flex items-center gap-2 bg-lime-400 hover:bg-lime-300 text-black px-6 py-3 rounded-full font-medium transition"
            >
              Get In Touch
              <ArrowUpRight size={16} />
            </Link>
          </div>

          {/* Mobile / tablet only — keeps image visible without breaking layout */}
          <div className="relative lg:hidden mt-8 w-full max-w-[280px] sm:max-w-[340px] mx-auto aspect-square">
            <Image
              src="/banner-img.png"
              alt="Featured property"
              fill
              sizes="340px"
              className="object-contain object-bottom"
            />
          </div>
        </div>
      </div>

      {/*
        Desktop floating image — matches original:
        absolute to the SECTION, right-20, top-0, 520×520, object-cover, GSAP x parallax
      */}
      <div
        ref={imageRef}
        className="absolute right-4 sm:right-10 lg:right-20 top-0 hidden lg:block w-[420px] h-[420px] xl:w-[520px] xl:h-[520px] pointer-events-none z-20 will-change-transform"
      >
        <Image
          src="/banner-img.png"
          alt="Featured property"
          fill
          sizes="520px"
          className="object-cover"
          priority
        />
      </div>
    </section>
  );
}
