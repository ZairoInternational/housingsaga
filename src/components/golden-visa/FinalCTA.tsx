// components/golden-visa/FinalCTA.tsx
"use client";
import { FiArrowRight, FiAward, FiCheckCircle, FiGlobe, FiPercent } from "react-icons/fi";

export default function FinalCTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-[#0b101b] to-gray-950" />

      {/* Single subtle accent glow (no rainbow blobs) */}
      <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[760px] h-[760px] bg-yellow-500/18 rounded-full blur-3xl" />

      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "4rem 4rem",
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-12 px-6">
        <div className="space-y-6">
          <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-yellow-300 rounded-full text-sm font-semibold mb-4">
            Start Your Journey Today
          </div>

          <h2 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
            Ready to Secure Your{" "}
            <span className="bg-gradient-to-r from-yellow-300 to-yellow-400 bg-clip-text text-transparent">
              European Future?
            </span>
          </h2>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Join hundreds of successful investors who have obtained EU residency through our expert
            guidance. Schedule your free consultation today and take the first step towards your
            Greece Golden Visa.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button className="group px-10 py-5 bg-yellow-500 hover:bg-yellow-400 text-black text-lg font-bold rounded-2xl shadow-2xl shadow-yellow-500/25 transition-all duration-200 hover:scale-110">
            <span className="flex items-center gap-3">
              Schedule Free Consultation
              <FiArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>

          <button className="px-10 py-5 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white text-lg font-semibold rounded-2xl hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105">
            Download Complete Guide
          </button>
        </div>

        <div className="pt-12 border-t border-white/10">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center space-y-2">
              <div className="w-16 h-16 rounded-full bg-white/8 border border-white/10 flex items-center justify-center shadow-xl text-yellow-300">
                <FiPercent size={26} />
              </div>
              <h3 className="text-white font-bold">98% Success Rate</h3>
              <p className="text-gray-400 text-sm">Industry-leading approval</p>
            </div>

            <div className="flex flex-col items-center space-y-2">
              <div className="w-16 h-16 rounded-full bg-white/8 border border-white/10 flex items-center justify-center shadow-xl text-yellow-300">
                <FiAward size={26} />
              </div>
              <h3 className="text-white font-bold">15+ Years Experience</h3>
              <p className="text-gray-400 text-sm">Trusted expertise</p>
            </div>

            <div className="flex flex-col items-center space-y-2">
              <div className="w-16 h-16 rounded-full bg-white/8 border border-white/10 flex items-center justify-center shadow-xl text-yellow-300">
                <FiGlobe size={26} />
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

