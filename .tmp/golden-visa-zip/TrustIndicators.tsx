// components/golden-visa/TrustIndicators.tsx
"use client";

const stats = [
  {
    number: "500+",
    label: "Successful Applications",
    icon: "✓"
  },
  {
    number: "98%",
    label: "Approval Rate",
    icon: "📊"
  },
  {
    number: "45+",
    label: "Countries Served",
    icon: "🌍"
  },
  {
    number: "15+",
    label: "Years Experience",
    icon: "⭐"
  }
];

const partners = [
  { name: "Greek Ministry", icon: "🏛️" },
  { name: "EU Certified", icon: "🇪🇺" },
  { name: "Legal Partner", icon: "⚖️" },
  { name: "Banking Partner", icon: "🏦" }
];

export default function TrustIndicators() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-900 to-gray-800 text-white relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="absolute top-1/4 left-0 w-96 h-96 bg-gradient-to-br from-amber-500/20 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-transparent rounded-full blur-3xl"></div>

      <div className="relative z-10">
        {/* Stats */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Trusted by{" "}
              <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
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
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-500 hover:scale-105">
                    {/* Icon */}
                    <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-500">
                      {stat.icon}
                    </div>
                    
                    {/* Number */}
                    <div className="text-5xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent mb-2">
                      {stat.number}
                    </div>
                    
                    {/* Label */}
                    <p className="text-gray-300 font-medium">
                      {stat.label}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Partners */}
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
                <span className="text-3xl group-hover:scale-110 transition-transform">
                  {partner.icon}
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
