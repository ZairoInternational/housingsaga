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
    <section className="relative min-h-screen w-full overflow-hidden pt-24">
      {/* Background */}
      <img
        src="/h1_bg-1.jpg"
        alt="hero background"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      <div className="absolute inset-0 bg-black/55" />

      <div className="relative z-20 flex flex-col min-h-screen">
        {/* HERO CONTENT */}
        <div
          className={`flex-1 flex items-center transition-all duration-700 ease-out ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="max-w-7xl mx-auto w-full px-5 sm:px-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12">
              {/* LEFT CONTENT */}
              <div className="w-full lg:w-[80%] text-white">
                <div className="flex items-center gap-3 text-xs sm:text-sm mb-4">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="uppercase tracking-wide">
                    Modern Homes For Modern Life
                  </span>
                </div>

                <h1 className="font-medium leading-[1.05] break-words max-w-[22ch] text-[clamp(2.2rem,6vw,5rem)] lg:text-[clamp(4rem,7vw,8rem)]">
                  Discover Your
                  <br />
                  Dream Property
                </h1>

                {/* VIDEO + DESCRIPTION */}
                <div className="mt-10 sm:mt-14 flex flex-col sm:flex-row items-start gap-6 sm:gap-8">
                  {/* VIDEO THUMB */}
                  <div className="relative w-full sm:w-[300px] h-20 sm:h-24 rounded-full overflow-hidden shadow-lg flex-shrink-0">
                    <img
                      src="/property-3.jpeg"
                      alt="property preview"
                      className="w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 flex items-center justify-end pr-6">
                      <button
                        onClick={() => setShowVideo(true)}
                        className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 backdrop-blur-md hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                      >
                        <svg
                          className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* DESCRIPTION */}
                  <div className="max-w-xl">
                    <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed">
                      Explore homes, offices, and rentals with ease. We connect
                      you with properties that match your lifestyle and needs.
                    </p>
                  </div>
                </div>
              </div>

              {/* RIGHT ACTION */}
              <div className="hidden lg:flex items-center justify-end w-[20%]">
                <div className="w-[140px] h-[140px] xl:w-[160px] xl:h-[160px] rounded-full bg-black/30 backdrop-blur-lg ring-1 ring-white/20 flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
                  <ArrowUpRight size={42} className="text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CONTACT + STATS */}
        <div className="relative z-30 w-full pb-16">
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 text-white">
              {/* ADDRESS */}
              <div className="space-y-2 text-sm sm:text-base md:text-lg font-light">
                <p>We are here: 39 Division St, New York</p>
                <p>Email us: support@example.com</p>
              </div>

              {/* STATS */}
              <div className="flex flex-col items-start md:items-end">
                <div className="text-4xl sm:text-5xl lg:text-7xl font-medium leading-none">
                  <CountUp end={875} duration={1.5} suffix="+" />
                </div>

                <p className="text-lg sm:text-xl text-white/80 mt-2">
                  Properties Listed
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* VIDEO MODAL */}
      {showVideo && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
          <div
            className="absolute inset-0"
            onClick={() => setShowVideo(false)}
          />

          <div className="relative z-10 w-[92%] max-w-5xl aspect-video">
            <iframe
              className="w-full h-full rounded-xl"
              src="https://www.youtube.com/embed/iMP3Zn2X9sg?autoplay=1"
              title="YouTube video"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>

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
