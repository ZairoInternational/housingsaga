"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function TeamCTA() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

useEffect(() => {
  gsap.registerPlugin(ScrollTrigger);

  const ctx = gsap.context(() => {
    const container = sectionRef.current;
    const image = imageRef.current;

    if (!container || !image) return;

    const maxMove = 200;

    gsap.to(image, {
      x: -maxMove,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top bottom",
        end: "bottom top",
        scrub: 3, // controls smoothness (higher = slower)
      },
    });
  }, sectionRef);

  return () => ctx.revert();
}, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-28 bg-[#f5f5f5] dark:bg-[#121212] overflow-visible"
    >
      <div className="max-w-[1300px] mx-auto px-6">
        <div className="relative rounded-[24px] overflow-hidden bg-[#2d2823] text-white flex items-center justify-between px-16 py-14">
          <div>
            <p className="text-lime-400 text-sm mb-3">• Connect With Us</p>

            <h2 className="text-[44px] font-semibold max-w-[420px] mb-6">
              Discover Amazing Properties Easily
            </h2>

            <button className="flex items-center gap-2 bg-lime-400 text-black px-6 py-3 rounded-full">
              Get In Touch
              <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* IMAGE */}
      <div
        ref={imageRef}
        className="absolute right-20 top-0 hidden lg:block w-[520px] h-[520px]"
      >
        <Image
          src="/banner-img.png"
          alt="house"
          fill
          className="object-cover"
        />
      </div>
    </section>
  );
}
