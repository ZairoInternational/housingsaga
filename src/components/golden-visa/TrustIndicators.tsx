// components/golden-visa/TrustIndicators.tsx
"use client";
import { FiAward, FiCheckCircle, FiGlobe, FiPercent, FiShield } from "react-icons/fi";

const stats = [
  { number: "500+", label: "Successful Applications", Icon: FiCheckCircle },
  { number: "98%", label: "Approval Rate", Icon: FiPercent },
  { number: "45+", label: "Countries Served", Icon: FiGlobe },
  { number: "15+", label: "Years Experience", Icon: FiAward },
];

const partners = [
  { name: "Greek Ministry", Icon: FiShield },
  { name: "EU Certified", Icon: FiAward },
  { name: "Legal Partner", Icon: FiShield },
  { name: "Banking Partner", Icon: FiShield },
];

export default function TrustIndicators() {
  return (
    <section className="py-24 bg-[#2b2420] text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="absolute top-1/4 left-0 w-96 h-96 bg-gradient-to-br from-yellow-500/20 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gradient-to-br from-yellow-500/16 to-transparent rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Trusted by{" "}
              <span className="bg-gradient-to-r from-yellow-300 to-yellow-400 bg-clip-text text-transparent">
                Investors Worldwide
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Proven track record of excellence in EU residency services
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="group text-center"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/24 to-yellow-400/24 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-500 hover:scale-105">
                    <div className="mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 text-yellow-300">
                      <stat.Icon size={34} />
                    </div>

                    <div className="text-5xl font-bold bg-gradient-to-r from-yellow-300 to-yellow-400 bg-clip-text text-transparent mb-2">
                      {stat.number}
                    </div>

                    <p className="text-gray-300 font-medium">{stat.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-white/10 pt-12">
          <p className="text-center text-gray-400 text-sm font-semibold mb-8">
            OFFICIAL PARTNERS & CERTIFICATIONS
          </p>

          <div className="flex flex-wrap justify-center items-center gap-8">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="group flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105"
              >
                <span className="text-yellow-300 group-hover:scale-110 transition-transform">
                  <partner.Icon size={20} />
                </span>
                <span className="text-gray-300 font-medium">
                  {partner.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

