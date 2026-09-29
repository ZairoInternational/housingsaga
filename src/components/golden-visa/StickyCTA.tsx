"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ScheduleCallbackButton from "@/components/golden-visa/ScheduleCallbackButton";

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
      <div className="bg-gradient-to-r from-gray-950 via-[#0b101b] to-gray-950 backdrop-blur-xl border-t border-white/10 shadow-2xl pb-[env(safe-area-inset-bottom)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            <div className="text-center sm:text-left">
              <h3 className="text-white font-bold text-base sm:text-lg mb-0.5">
                Ready to talk property or residency?
              </h3>
              <p className="text-gray-300 text-sm">
                Free consultation — pick a callback window
              </p>
            </div>

            <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={() =>
                  toast("Guide coming soon — we’ll publish the PDF shortly.")
                }
                className="flex-1 sm:flex-none px-4 sm:px-6 py-2.5 sm:py-3 bg-white/5 hover:bg-white/10 text-white border border-white/15 rounded-xl font-medium transition text-sm"
              >
                Download Guide
              </button>
              <ScheduleCallbackButton
                defaultReason="Golden Visa consultation"
                className="flex-1 sm:flex-none group px-4 sm:px-6 py-2.5 sm:py-3 bg-lime-400 hover:bg-lime-300 text-black rounded-xl font-semibold shadow-lg shadow-lime-500/25 transition text-sm"
              >
                <span className="flex items-center justify-center gap-2">
                  Schedule Meeting
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </ScheduleCallbackButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
