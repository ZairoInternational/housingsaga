// components/golden-visa/FAQ.tsx
"use client";
import { useState } from "react";

const faqs = [
  {
    question: "How long does the Golden Visa process take?",
    answer:
      "The entire process typically takes 90-120 days from initial application to residency approval. This includes property selection (2-4 weeks), legal due diligence (2-3 weeks), investment completion (1-2 weeks), and government processing (60-90 days).",
  },
  {
    question: "Can I include my family members?",
    answer:
      "Yes, the Golden Visa allows you to include your spouse, children under 21 (or under 24 if students), and dependent parents from both sides. All family members receive the same residency rights and benefits.",
  },
  {
    question: "Do I need to live in Greece?",
    answer:
      "No, there is no minimum stay requirement. You can maintain your residency permit while living elsewhere, making it ideal for investors who want EU access without relocating.",
  },
  {
    question: "What are the renewal requirements?",
    answer:
      "The residency permit is valid for 5 years and can be renewed indefinitely as long as you maintain ownership of the property. The renewal process is straightforward and typically takes 30-60 days.",
  },
  {
    question: "Can I work or start a business in Greece?",
    answer:
      "The Golden Visa is primarily a residency permit for investors. While it doesn't automatically grant work rights, you can apply for work authorization separately or establish a business in Greece.",
  },
  {
    question: "What happens if I sell the property?",
    answer:
      "Your residency permit is tied to property ownership. If you sell the property, you must either purchase another qualifying property or your permit will not be renewed. However, you can transfer your investment to a different property while maintaining your residency status.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-[#050712] dark:to-[#070a12]">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block px-4 py-2 bg-lime-500/10 text-lime-700 dark:text-lime-300 rounded-full text-sm font-semibold mb-4 border border-lime-400/20">
            FAQ
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Get answers to common questions about the Greece Golden Visa program
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={faq.question} className="group">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className={`w-full text-left bg-white dark:bg-[#0b101b] rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? "border-lime-300/60 dark:border-lime-400/20 shadow-xl shadow-lime-500/10"
                      : "border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 shadow-lg hover:shadow-xl"
                  }`}
                >
                  <div className="px-8 py-6 flex items-center justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div
                        className={`flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-lime-500 to-lime-600 flex items-center justify-center text-black font-bold transition-all duration-500 ${
                          isOpen ? "scale-110" : ""
                        }`}
                      >
                        {index + 1}
                      </div>

                      <div className="flex-1 pt-1">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                          {faq.question}
                        </h3>
                      </div>
                    </div>

                    <div className={`flex-shrink-0 transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`}>
                      <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  <div
                    className={`transition-all duration-500 ease-in-out ${
                      isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    } overflow-hidden`}
                  >
                    <div className="px-8 pb-8">
                      <div className="pl-14">
                        <div className="h-px bg-gradient-to-r from-lime-500 to-lime-600 mb-4" />
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8 space-y-4">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Still Have Questions?</h3>
          <p className="text-gray-700 dark:text-gray-300">
            Our expert team is here to help. Schedule a free consultation to discuss your specific situation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-lime-500 hover:bg-lime-400 text-black font-semibold rounded-xl shadow-lg shadow-lime-500/15 transition-all duration-200 hover:scale-105">
              Schedule Consultation
            </button>
            <button className="px-8 py-3 bg-white dark:bg-white/5 border-2 border-gray-300/80 dark:border-white/10 text-gray-900 dark:text-white font-semibold rounded-xl hover:bg-gray-100 dark:hover:bg-white/8 transition-all duration-200 hover:scale-105">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

