"use client";

import { ArrowUpRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import CountUp from "@/components/CountUp";

const Hero: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative min-h-screen pt-24 w-full overflow-hidden">
      {/* Background */}
      <img
        src="/h1_bg-1.jpg"
        alt="hero background"
        className="absolute inset-0 w-full h-full object-cover object-center zoom-in-10"
      />
      <div className="absolute inset-0 bg-black/55" />

      {/* small tag top-left */}

      {/* Main content */}
      <div className="flex flex-col ">
        <div
          className={`relative z-20 min-h-screen max-w-7xl  px-6 
  flex flex-col md:flex-row items-center justify-center
  transition-all duration-700 ease-out ${
    mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
  }`}
        >
          <div className="w-full md:w-[80%] text-left text-white">
            <div className=" flex items-center gap-3 text-sm ">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
              <span className="uppercase tracking-wide">
                Modern Homes For Modern Life
              </span>
            </div>
            <h1 className="font-medium leading-tight break-words max-w-[70ch] text-[clamp(2.25rem,6vw,4.5rem)] md:text-[clamp(5rem,8vw,9rem)]">
              Discover Your
              <br />
              Dream Property
            </h1>

            <div className="mt-16 flex flex-col md:flex-row items-start gap-6">
              {/* Thumbnail + play */}
              <div className="flex-shrink-0">
                <div className="relative w-[360px] h-24 rounded-full overflow-hidden shadow-lg">
                  {/* Background thumbnail */}
                  <img
                    src="/property-3.jpeg"
                    alt="thumb"
                    className="w-full h-full object-cover"
                  />

                  {/* Video button overlay */}
                  <div className="absolute inset-0 flex items-center justify-end pr-8">
                    <button
                      onClick={() => setShowVideo(true)}
                      className="w-18 h-18 bg-white/20 backdrop-blur-md hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                    >
                      <svg
                        className="w-5 h-5 text-white"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Text */}
              <div className="max-w-xl">
                <p className="text-base sm:text-lg md:text-xl text-white/90 mb-4">
                  Explore homes, offices, and rentals with ease. We connect you
                  with properties that match your lifestyle and needs.
                </p>
              </div>
            </div>

          </div>

          {/* right side circular action (hidden on small screens) */}
          <div className="w-full md:w-[20%] flex items-center justify-end pr-0  mt-8 md:mt-0">
            <div className="hidden md:flex">
              <div className="w-[160px] h-[160px] rounded-full bg-black/30 backdrop-blur-lg ring-1 ring-white/20 flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
                <ArrowUpRight size={44} />
              </div>
            </div>
          </div>
        </div>
        {/* Stats block (desktop absolute, mobile inline) */}
        {/* Contact + Stats Row */}
        <div className="z-30  mb-24 w-full flex flex-col md:flex-row md:items-center md:justify-between gap-8 text-white px-4">
          {/* LEFT — Address */}
          <div className="flex flex-col items-start gap-2 md:ml-5">
            <h1 className="text-lg md:text-xl font-light">
              We are here: 39 Division St, New York
            </h1>
            <h1 className="text-lg md:text-xl font-light">
              Email us: support@example.com
            </h1>
          </div>

          {/* RIGHT — Stats */}
          <div className="flex flex-col md:mr-10 -gap-1">
            <div className="text-4xl md:text-5xl lg:text-9xl font-medium leading-tight">
              <CountUp end={875} duration={1.5} suffix="+" />
            </div>
            <div className="text-2xl text-white/80 ">Properties Listed</div>
          </div>
        </div>
      </div>
      {showVideo && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
          {/* Close area */}
          <div
            className="absolute inset-0"
            onClick={() => setShowVideo(false)}
          />

          {/* Video Container */}
          <div className="relative z-10 w-[90%] max-w-4xl aspect-video">
            <iframe
              className="w-full h-full rounded-xl"
              src="https://www.youtube.com/embed/iMP3Zn2X9sg?autoplay=1"
              title="YouTube video"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>

          {/* Close Button */}
          <button
            onClick={() => setShowVideo(false)}
            className="absolute top-6 right-6 text-white text-2xl"
          >
            ✕
          </button>
        </div>
      )}
    </section>
  );
};

export default Hero;
