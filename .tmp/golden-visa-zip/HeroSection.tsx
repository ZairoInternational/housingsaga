// components/golden-visa/HeroSection.tsx
"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function HeroSection() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate heading words
    if (headingRef.current) {
      const words = headingRef.current.querySelectorAll('.word');
      words.forEach((word, i) => {
        setTimeout(() => {
          word.classList.add('animate-in');
        }, i * 100);
      });
    }

    // Animate stats with count-up
    if (statsRef.current) {
      const stats = statsRef.current.querySelectorAll('.stat-number');
      stats.forEach((stat) => {
        const target = stat.getAttribute('data-target') || '0';
        const duration = 2000;
        const element = stat as HTMLElement;
        
        // Extract number from string like "€250K+" or "90 Days"
        const match = target.match(/\d+/);
        if (!match) return;
        
        const finalNumber = parseInt(match[0]);
        const increment = finalNumber / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
          current += increment;
          if (current >= finalNumber) {
            element.textContent = target;
            clearInterval(timer);
          } else {
            // Preserve the original format
            element.textContent = target.replace(/\d+/, Math.floor(current).toString());
          }
        }, 16);
      });
    }
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center py-20 overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-20 w-96 h-96 bg-gradient-to-br from-amber-400/20 to-orange-500/20 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-40 -right-20 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-indigo-600/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-1/3 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center w-full">
        {/* Left content */}
        <div className="space-y-8 animate-slide-in-left">
          {/* Trust badges */}
          <div className="flex items-center gap-3 opacity-0 animate-fade-in animation-delay-200">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 border-2 border-white flex items-center justify-center text-xs font-bold text-white">🇬🇷</div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 border-2 border-white flex items-center justify-center text-xs font-bold text-white">🇪🇺</div>
            </div>
            <span className="text-sm font-medium text-gray-600">Official EU Residency Program</span>
          </div>

          {/* Heading */}
          <h1 ref={headingRef} className="text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
            <span className="word opacity-0 inline-block">Greece </span>
            <span className="word opacity-0 inline-block">Golden </span>
            <span className="word opacity-0 inline-block">Visa </span>
            <br />
            <span className="word opacity-0 inline-block bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 bg-clip-text text-transparent">
              Complete 
            </span>{" "}
            <span className="word opacity-0 inline-block bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 bg-clip-text text-transparent">
              Guide
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl text-gray-600 leading-relaxed max-w-xl opacity-0 animate-fade-in animation-delay-600">
            Secure EU residency through strategic real estate investment. Enjoy visa-free travel, high rental yields, and long-term European access.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in animation-delay-800">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-2xl overflow-hidden shadow-xl shadow-amber-500/30 hover:shadow-2xl hover:shadow-amber-500/40 transition-all duration-300 hover:scale-105">
              <span className="relative z-10 flex items-center justify-center gap-2">
                Schedule a Meeting
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
            
            <button className="group px-8 py-4 bg-white/80 backdrop-blur-sm border-2 border-amber-500/30 text-amber-700 font-semibold rounded-2xl hover:bg-amber-50 hover:border-amber-500/50 transition-all duration-300 hover:scale-105 shadow-lg">
              <span className="flex items-center justify-center gap-2">
                Download Guide
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </span>
            </button>
          </div>

          {/* Stats */}
          <div ref={statsRef} className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200 opacity-0 animate-fade-in animation-delay-1000">
            <div className="group cursor-default">
              <div className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent stat-number" data-target="€250K+">
                €0K+
              </div>
              <p className="text-sm text-gray-600 mt-1 group-hover:text-gray-900 transition-colors">Investment</p>
            </div>
            <div className="group cursor-default">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent stat-number" data-target="90 Days">
                0 Days
              </div>
              <p className="text-sm text-gray-600 mt-1 group-hover:text-gray-900 transition-colors">Processing</p>
            </div>
            <div className="group cursor-default">
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent stat-number" data-target="29 Countries">
                0 Countries
              </div>
              <p className="text-sm text-gray-600 mt-1 group-hover:text-gray-900 transition-colors">Visa-Free</p>
            </div>
          </div>
        </div>

        {/* Right image */}
        <div className="relative opacity-0 animate-slide-in-right animation-delay-400">
          {/* Decorative elements */}
          <div className="absolute -top-6 -left-6 w-72 h-72 bg-gradient-to-br from-amber-400/30 to-transparent rounded-full blur-2xl"></div>
          <div className="absolute -bottom-6 -right-6 w-72 h-72 bg-gradient-to-br from-blue-500/30 to-transparent rounded-full blur-2xl"></div>
          
          {/* Image container */}
          <div className="relative w-full h-[500px] lg:h-[600px] rounded-[2.5rem] overflow-hidden shadow-2xl group">
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10"></div>
            <Image
              src="/greece.jpg"
              alt="Greece - Parthenon"
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
              priority
            />
            
            {/* Floating info card */}
            <div className="absolute bottom-8 left-8 right-8 z-20 bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20 transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Starting from</p>
                  <p className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">€250,000</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600 mb-1">Processing Time</p>
                  <p className="text-2xl font-bold text-gray-900">~90 Days</p>
                </div>
              </div>
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
        
        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-out forwards;
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 0.8s ease-out forwards;
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        
        .animation-delay-600 {
          animation-delay: 0.6s;
        }
        
        .animation-delay-800 {
          animation-delay: 0.8s;
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .word.animate-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
