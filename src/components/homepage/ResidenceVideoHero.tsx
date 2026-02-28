"use client";

import { Star } from "lucide-react";
import React from "react";
import InfiniteMarquee from "@/components/ui/InfiniteMarquee";

const items = [
  { id: 1, content: <>Exclusive Property</> },
  { id: 2, content: <>Prime Location</> },
  {
    id: 3,
    content: (
      <>
        <Star size={16} /> Luxury Living
      </>
    ),
  },
  { id: 4, content: <>Trusted Agency</> },
  { id: 5, content: <>Modern Design</> },
];

const ResidenceVideoHero: React.FC = () => {
  return (
    <section
      className="
        relative
        min-h-[80vh] sm:min-h-[90vh] lg:min-h-[125vh]
        w-full
        overflow-hidden
        text-white
        flex flex-col items-center justify-center
      "
    >
      {/* Background Video */}
      <video
        className="
          absolute inset-0
          w-full h-full
          object-cover
          scale-[1.15] sm:scale-[1.2] lg:scale-[1.3]
          will-change-transform
        "
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/propertyvideo.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Center Content */}
      <div
        className="
          relative z-10
          flex flex-col
          items-center
          justify-center
          text-center
          h-full
          px-5 sm:px-8
          pb-20
        "
      >
        <div
          className="
            text-xs sm:text-sm
            font-medium
            tracking-widest
            text-white/90
            mb-4
            roboto-condensed
          "
        >
          • Video Introduction
        </div>

        <h1
          className="
            font-semibold
            leading-[1.05]
            roboto-condensed
            text-[clamp(2.4rem,6vw,7rem)]
          "
        >
          See Inside Our
          <br />
          Residence
        </h1>
      </div>

      {/* Marquee */}
      <div
        className="
          absolute bottom-4 sm:bottom-6 lg:bottom-8
          w-full
          px-4 sm:px-6
        "
      >
        <InfiniteMarquee items={items} speed={80} />
      </div>
    </section>
  );
};

export default ResidenceVideoHero;
