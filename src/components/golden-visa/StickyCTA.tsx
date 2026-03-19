// components/golden-visa/StickyCTA.tsx
"use client";
import { useEffect, useState } from "react";

export default function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-500 ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="bg-gradient-to-r from-gray-950 via-[#0b101b] to-gray-950 backdrop-blur-xl border-t border-white/10 shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <h3 className="text-white font-bold text-lg mb-1">
                Ready to Start Your EU Residency Journey?
              </h3>
              <p className="text-gray-300 text-sm">Schedule a free consultation with our experts today</p>
            </div>

            <div className="flex gap-3">
              <button className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white border border-white/15 rounded-xl font-medium transition-all duration-300 hover:scale-105 backdrop-blur-sm">
                Download Guide
              </button>
              <button className="group px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black rounded-xl font-semibold shadow-lg shadow-yellow-500/25 hover:shadow-2xl hover:shadow-yellow-500/30 transition-all duration-300 hover:scale-105">
                <span className="flex items-center gap-2">
                  Schedule Meeting
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

