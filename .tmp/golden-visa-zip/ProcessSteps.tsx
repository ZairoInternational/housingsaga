// components/golden-visa/ProcessSteps.tsx
"use client";
import { useEffect, useRef, useState } from "react";

const steps = [
  {
    number: "01",
    title: "Consultation",
    desc: "Initial assessment of your investment goals and eligibility",
    icon: "💬",
    color: "from-blue-500 to-cyan-500"
  },
  {
    number: "02",
    title: "Property Selection",
    desc: "Curated portfolio matching your investment criteria",
    icon: "🏘️",
    color: "from-emerald-500 to-teal-500"
  },
  {
    number: "03",
    title: "Legal Due Diligence",
    desc: "Comprehensive verification and compliance checks",
    icon: "⚖️",
    color: "from-purple-500 to-pink-500"
  },
  {
    number: "04",
    title: "Investment",
    desc: "Secure property acquisition with legal safeguards",
    icon: "💰",
    color: "from-amber-500 to-orange-500"
  },
  {
    number: "05",
    title: "Application",
    desc: "Complete documentation and submission process",
    icon: "📋",
    color: "from-rose-500 to-red-500"
  },
  {
    number: "06",
    title: "Residency Approval",
    desc: "Receive your EU residency permit and travel benefits",
    icon: "🎉",
    color: "from-indigo-500 to-blue-500"
  },
];

export default function ProcessSteps() {
  const [activeStep, setActiveStep] = useState(0);
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            steps.forEach((_, index) => {
              setTimeout(() => {
                setVisibleSteps((prev) => [...prev, index]);
              }, index * 200);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, rgb(203 213 225 / 0.3) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}></div>
      </div>

      <div className="relative z-10">
        <div className="text-center mb-20 space-y-4">
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
            Our Process
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold">
            Your Path to{" "}
            <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              EU Residency
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A streamlined 6-step process designed for clarity and efficiency
          </p>
        </div>

        {/* Desktop Timeline */}
        <div className="hidden lg:block">
          <div className="relative max-w-7xl mx-auto">
            {/* Connecting line */}
            <div className="absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200">
              <div 
                className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-1000 ease-out"
                style={{ width: `${(visibleSteps.length / steps.length) * 100}%` }}
              ></div>
            </div>

            <div className="grid grid-cols-3 gap-12">
              {steps.map((step, index) => (
                <div
                  key={step.number}
                  className={`relative transition-all duration-700 delay-${index * 100} ${
                    visibleSteps.includes(index)
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-10'
                  }`}
                  style={{ 
                    marginTop: index % 2 === 0 ? '0' : '12rem',
                    transitionDelay: `${index * 100}ms`
                  }}
                >
                  {/* Connecting dot */}
                  <div className={`absolute ${index % 2 === 0 ? '-bottom-[12.5rem]' : '-top-[12.5rem]'} left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-r ${step.color} ring-4 ring-white shadow-lg z-10`}></div>

                  {/* Card */}
                  <div 
                    className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border-2 border-transparent hover:border-amber-200"
                    onMouseEnter={() => setActiveStep(index)}
                  >
                    {/* Icon */}
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center text-3xl mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                      {step.icon}
                    </div>

                    {/* Step number */}
                    <div className={`text-6xl font-bold bg-gradient-to-r ${step.color} bg-clip-text text-transparent opacity-20 absolute top-4 right-4`}>
                      {step.number}
                    </div>

                    {/* Content */}
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-gray-950 transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors">
                        {step.desc}
                      </p>
                    </div>

                    {/* Hover gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl pointer-events-none`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Vertical Timeline */}
        <div className="lg:hidden max-w-2xl mx-auto">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-gray-200 via-gray-300 to-gray-200">
              <div 
                className="w-full bg-gradient-to-b from-amber-500 to-orange-500 transition-all duration-1000 ease-out"
                style={{ height: `${(visibleSteps.length / steps.length) * 100}%` }}
              ></div>
            </div>

            <div className="space-y-8">
              {steps.map((step, index) => (
                <div
                  key={step.number}
                  className={`relative flex gap-6 transition-all duration-700 ${
                    visibleSteps.includes(index)
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 -translate-x-10'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Dot */}
                  <div className={`flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-2xl shadow-xl ring-4 ring-white z-10`}>
                    {step.icon}
                  </div>

                  {/* Card */}
                  <div className="flex-1 bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-amber-200">
                    <div className={`text-5xl font-bold bg-gradient-to-r ${step.color} bg-clip-text text-transparent opacity-20 absolute top-4 right-4`}>
                      {step.number}
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline duration info */}
        <div className="mt-20 text-center space-y-4">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-full">
            <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-amber-700 font-semibold">
              Average Timeline: 90 Days from Application to Approval
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
