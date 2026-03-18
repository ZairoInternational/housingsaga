// components/golden-visa/DocumentsAccordion.tsx
"use client";
import { useState } from "react";
import { FiCreditCard, FiFileText, FiHeart, FiKey, FiUsers } from "react-icons/fi";

const docs = [
  {
    title: "Passports",
    Icon: FiFileText,
    content:
      "Clean scan of all pages including blank pages for all applicants. Must be valid for at least 6 months from application date.",
  },
  {
    title: "Birth/Family Certificates",
    Icon: FiUsers,
    content:
      "Required for family inclusion verification. All certificates must be officially translated and apostilled.",
  },
  {
    title: "Power of Attorney",
    Icon: FiKey,
    content:
      "Apostilled legal authorization document allowing our team to act on your behalf during the application process.",
  },
  {
    title: "Financial Documentation",
    Icon: FiCreditCard,
    content:
      "Bank statements, proof of funds, and investment source verification. Must demonstrate sufficient capital for investment.",
  },
  {
    title: "Health Insurance",
    Icon: FiHeart,
    content:
      "Valid health insurance coverage for all applicants. Must meet Greek residency requirements.",
  },
];

export default function DocumentsAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-[#070a12] dark:to-[#050712] relative overflow-hidden">
      <div className="absolute inset-0 opacity-30 dark:opacity-15">
        <div className="absolute -top-12 -left-12 w-96 h-96 bg-lime-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-16 -right-16 w-96 h-96 bg-lime-500/8 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <div className="mb-16 space-y-6">
          <div className="space-y-4">
            <div className="inline-block px-4 py-2 bg-lime-500/10 text-lime-700 dark:text-lime-300 rounded-full text-sm font-semibold border border-lime-400/20">
              Documentation
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
              Required Documents
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl">
              Our team manages the entire document procurement and submission process on your
              behalf. Here&apos;s a comprehensive checklist of the primary documents required for a
              successful application.
            </p>
          </div>

          <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-6 flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-lime-500/10 border border-lime-400/20 flex items-center justify-center text-lime-600 dark:text-lime-300">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-1">We Handle Everything</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                Our team will guide you through the document collection process and ensure everything
                is properly prepared, translated, and submitted.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {docs.map((doc, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={doc.title} className="group relative">
                <div
                  className={`relative bg-white dark:bg-[#0b101b] rounded-2xl border-2 transition-all duration-500 overflow-hidden ${
                    isOpen
                      ? "border-lime-300/60 dark:border-lime-400/20 shadow-2xl shadow-lime-500/10"
                      : "border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 shadow-lg hover:shadow-xl"
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full px-8 py-6 flex items-center justify-between gap-4 text-left transition-all duration-300"
                    type="button"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div
                        className={`flex-shrink-0 w-14 h-14 rounded-xl bg-lime-500/10 border border-lime-400/20 flex items-center justify-center shadow-sm transition-all duration-300 ${
                          isOpen ? "scale-110 rotate-6" : "group-hover:scale-105"
                        }`}
                      >
                        <doc.Icon size={20} className="text-lime-600 dark:text-lime-300" />
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{doc.title}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {isOpen ? "Click to collapse" : "Click to expand details"}
                        </p>
                      </div>
                    </div>

                    <div
                      className={`flex-shrink-0 w-10 h-10 rounded-full bg-lime-500/10 border border-lime-400/20 flex items-center justify-center transition-all duration-500 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    >
                      <svg className="w-6 h-6 text-lime-700 dark:text-lime-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>

                  <div
                    className={`transition-all duration-500 ease-in-out ${
                      isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    } overflow-hidden`}
                  >
                    <div className="px-8 pb-8">
                      <div className="h-px bg-lime-500/25 mb-6" />

                      <div className="flex items-start gap-4">
                        <div
                          className="flex-shrink-0 w-6 h-6 rounded-full bg-lime-500/12 border border-lime-400/25 text-lime-600 dark:text-lime-300 flex items-center justify-center mt-1"
                        >
                          <FiFileText size={12} />
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed flex-1">
                          {doc.content}
                        </p>
                      </div>

                      <div className="mt-4 p-4 rounded-xl bg-lime-500/5 border border-lime-400/15">
                        <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Our team will provide detailed guidance on obtaining this document
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`absolute inset-0 opacity-0 ${
                      isOpen ? "opacity-5" : "group-hover:opacity-5"
                    } transition-opacity duration-300 pointer-events-none bg-lime-500/6`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8 text-center space-y-4">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Need Help with Documentation?</h3>
          <p className="text-gray-700 dark:text-gray-300">
            Our document specialists will guide you through every step of the preparation process
          </p>
          <button className="px-8 py-3 bg-lime-500 hover:bg-lime-400 text-black font-semibold rounded-xl shadow-lg shadow-lime-500/15 transition-all duration-200 hover:scale-105">
            Get Document Checklist
          </button>
        </div>
      </div>
    </section>
  );
}
