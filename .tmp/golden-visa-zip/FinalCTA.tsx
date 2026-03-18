// components/golden-visa/FinalCTA.tsx
"use client";

export default function FinalCTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
          backgroundSize: '4rem 4rem'
        }}></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-12">
        {/* Main content */}
        <div className="space-y-6">
          <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-amber-300 rounded-full text-sm font-semibold mb-4">
            Start Your Journey Today
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
            Ready to Secure Your{" "}
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              European Future?
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Join hundreds of successful investors who have obtained EU residency through our expert guidance. Schedule your free consultation today and take the first step towards your Greece Golden Visa.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button className="group px-10 py-5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-lg font-bold rounded-2xl shadow-2xl shadow-amber-500/40 hover:shadow-3xl hover:shadow-amber-500/60 transition-all duration-300 hover:scale-110">
            <span className="flex items-center gap-3">
              Schedule Free Consultation
              <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>
          
          <button className="px-10 py-5 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white text-lg font-semibold rounded-2xl hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105">
            Download Complete Guide
          </button>
        </div>

        {/* Trust badges */}
        <div className="pt-12 border-t border-white/10">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center space-y-2">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-3xl shadow-xl">
                ✓
              </div>
              <h3 className="text-white font-bold">98% Success Rate</h3>
              <p className="text-gray-400 text-sm">Industry-leading approval</p>
            </div>
            
            <div className="flex flex-col items-center space-y-2">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-3xl shadow-xl">
                🏆
              </div>
              <h3 className="text-white font-bold">15+ Years Experience</h3>
              <p className="text-gray-400 text-sm">Trusted expertise</p>
            </div>
            
            <div className="flex flex-col items-center space-y-2">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-3xl shadow-xl">
                🌍
              </div>
              <h3 className="text-white font-bold">500+ Clients Served</h3>
              <p className="text-gray-400 text-sm">Global reach</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
}
