// components/golden-visa/DocumentsAccordion.tsx
"use client";
import { useState } from "react";

const docs = [
  {
    title: "Passports",
    icon: "📘",
    content: "Clean scan of all pages including blank pages for all applicants. Must be valid for at least 6 months from application date.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    title: "Birth/Family Certificates",
    icon: "👨‍👩‍👧‍👦",
    content: "Required for family inclusion verification. All certificates must be officially translated and apostilled.",
    color: "from-emerald-500 to-teal-500"
  },
  {
    title: "Power of Attorney",
    icon: "✍️",
    content: "Apostilled legal authorization document allowing our team to act on your behalf during the application process.",
    color: "from-purple-500 to-pink-500"
  },
  {
    title: "Financial Documentation",
    icon: "💰",
    content: "Bank statements, proof of funds, and investment source verification. Must demonstrate sufficient capital for investment.",
    color: "from-amber-500 to-orange-500"
  },
  {
    title: "Health Insurance",
    icon: "🏥",
    content: "Valid health insurance coverage for all applicants. Must meet Greek residency requirements.",
    color: "from-rose-500 to-red-500"
  },
];

export default function DocumentsAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-16 space-y-6">
          <div className="space-y-4">
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-sm font-semibold">
              Documentation
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold">
              Required Documents
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl">
              Our team manages the entire document procurement and submission process on your behalf. Here's a comprehensive checklist of the primary documents required for a successful application.
            </p>
          </div>

          {/* Info banner */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6 flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-blue-900 mb-1">We Handle Everything</h3>
              <p className="text-blue-700 text-sm leading-relaxed">
                Our team will guide you through the document collection process and ensure everything is properly prepared, translated, and submitted.
              </p>
            </div>
          </div>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {docs.map((doc, index) => {
            const isOpen = openIndex === index;
            
            return (
              <div
                key={doc.title}
                className="group relative"
              >
                {/* Card */}
                <div className={`relative bg-white rounded-2xl border-2 transition-all duration-500 overflow-hidden ${
                  isOpen 
                    ? 'border-amber-300 shadow-2xl shadow-amber-500/10' 
                    : 'border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-xl'
                }`}>
                  
                  {/* Header - clickable */}
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full px-8 py-6 flex items-center justify-between gap-4 text-left transition-all duration-300"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      {/* Icon */}
                      <div className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${doc.color} flex items-center justify-center text-2xl shadow-lg transition-all duration-500 ${
                        isOpen ? 'scale-110 rotate-6' : 'group-hover:scale-105'
                      }`}>
                        {doc.icon}
                      </div>

                      {/* Title */}
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-gray-950 transition-colors">
                          {doc.title}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {isOpen ? 'Click to collapse' : 'Click to expand details'}
                        </p>
                      </div>
                    </div>

                    {/* Toggle icon */}
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br ${doc.color} flex items-center justify-center transition-all duration-500 ${
                      isOpen ? 'rotate-180' : ''
                    }`}>
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>

                  {/* Content - animated */}
                  <div className={`transition-all duration-500 ease-in-out ${
                    isOpen 
                      ? 'max-h-96 opacity-100' 
                      : 'max-h-0 opacity-0'
                  } overflow-hidden`}>
                    <div className="px-8 pb-8">
                      {/* Divider */}
                      <div className={`h-px bg-gradient-to-r ${doc.color} mb-6`}></div>
                      
                      {/* Content text */}
                      <div className="flex items-start gap-4">
                        <div className={`flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br ${doc.color} flex items-center justify-center mt-1`}>
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="text-gray-700 leading-relaxed flex-1">
                          {doc.content}
                        </p>
                      </div>

                      {/* Additional info */}
                      <div className={`mt-4 p-4 bg-gradient-to-r ${doc.color} bg-opacity-5 rounded-xl`}>
                        <p className="text-sm text-gray-600 flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Our team will provide detailed guidance on obtaining this document
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${doc.color} opacity-0 ${
                    isOpen ? 'opacity-5' : 'group-hover:opacity-5'
                  } transition-opacity duration-500 pointer-events-none`}></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-8 text-center space-y-4">
          <h3 className="text-2xl font-bold text-gray-900">
            Need Help with Documentation?
          </h3>
          <p className="text-gray-700">
            Our document specialists will guide you through every step of the preparation process
          </p>
          <button className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-amber-500/30 transition-all duration-300 hover:scale-105">
            Get Document Checklist
          </button>
        </div>
      </div>
    </section>
  );
}
