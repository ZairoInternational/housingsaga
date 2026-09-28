"use client";

import { FiArrowRight, FiAward, FiGlobe, FiPercent } from "react-icons/fi";
import toast from "react-hot-toast";
import ScheduleCallbackButton from "@/components/golden-visa/ScheduleCallbackButton";

export default function FinalCTA() {
  return (
    <section className="py-14 sm:py-16 lg:py-20 relative overflow-hidden pb-28">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-[#0b101b] to-gray-950" />
      <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[760px] h-[760px] bg-lime-500/18 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-10 px-4 sm:px-6">
        <div className="space-y-5">
          <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-lime-300 rounded-full text-sm font-semibold">
            Start Your Journey Today
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Ready for your{" "}
            <span className="bg-gradient-to-r from-lime-300 to-lime-400 bg-clip-text text-transparent">
              European property move?
            </span>
          </h2>

          <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Whether you want Golden Visa residency or simply a home or investment
            in Greece — book a free consult and we’ll map the right path.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <ScheduleCallbackButton className="group px-8 py-4 bg-lime-400 hover:bg-lime-300 text-black text-base font-bold rounded-2xl shadow-2xl shadow-lime-500/25 transition-all duration-200">
            <span className="flex items-center gap-3">
              Schedule Free Consultation
              <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </ScheduleCallbackButton>

          <button
            type="button"
            onClick={() =>
              toast("Guide coming soon — we’ll publish the PDF shortly.")
            }
            className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white text-base font-semibold rounded-2xl hover:bg-white/20 hover:border-white/40 transition-all duration-300"
          >
            Download Complete Guide
          </button>
        </div>

        <div className="pt-10 border-t border-white/10">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center space-y-2">
              <div className="w-14 h-14 rounded-full bg-white/8 border border-white/10 flex items-center justify-center text-lime-300">
                <FiPercent size={24} />
              </div>
              <h3 className="text-white font-bold">98% Success Rate</h3>
              <p className="text-gray-400 text-sm">Industry-leading approval</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="w-14 h-14 rounded-full bg-white/8 border border-white/10 flex items-center justify-center text-lime-300">
                <FiAward size={24} />
              </div>
              <h3 className="text-white font-bold">15+ Years Experience</h3>
              <p className="text-gray-400 text-sm">Trusted expertise</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="w-14 h-14 rounded-full bg-white/8 border border-white/10 flex items-center justify-center text-lime-300">
                <FiGlobe size={24} />
              </div>
              <h3 className="text-white font-bold">500+ Clients Served</h3>
              <p className="text-gray-400 text-sm">Global reach</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
