"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Reveal from "./Reveal";

const faqs = [
  {
    question: "Is VacationSaga really free for HousingSaga buyers?",
    answer:
      "Buyers who purchase through HousingSaga pay a 0% VacationSaga management fee on rental income from that property. Operating costs such as cleaning, utilities, and maintenance are separate.",
  },
  {
    question: "Is the rental income guaranteed?",
    answer:
      "No. Every figure on this page is an estimate. Actual income depends on location, season, demand, pricing, and how often the home is booked.",
  },
  {
    question: "Why is the estimate based on monthly rent?",
    answer:
      "A monthly figure is easier to compare than a nightly rate. The estimator then adjusts it by how many months you expect the home to be let, and by occupancy.",
  },
  {
    question: "Why is 10 occupied months the default?",
    answer:
      "Ten months is a starting point that leaves room for seasonality and time you may use the home yourself. Change it anytime in the estimator.",
  },
  {
    question: "Can occupancy be 12 months?",
    answer:
      "Yes. Choose 12 months if you expect the property to be available to guests all year.",
  },
  {
    question: "Is a 5% annual growth used?",
    answer:
      "The estimator starts at 5% a year to illustrate how value might compound. You can change that rate. It is not a forecast, and it does not change the rental income figure.",
  },
  {
    question: "What costs are not included?",
    answer:
      "The 0% benefit applies to the VacationSaga management fee only. Cleaning, utilities, maintenance, taxes, and other operating costs are not included in that fee.",
  },
];

export default function EarnFaq() {
  const [open, setOpen] = useState<number | null>(0);
  const midpoint = Math.ceil(faqs.length / 2);
  const columns = [faqs.slice(0, midpoint), faqs.slice(midpoint)];

  return (
    <section id="faq" className="scroll-mt-28 bg-[#f6f7f4] py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-lime-800">
            Before you decide
          </p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Frequently asked questions
          </h2>
        </Reveal>

        <div className="mt-8 grid items-start gap-3 md:grid-cols-2">
          {columns.map((column, columnIndex) => (
            <div key={columnIndex} className="space-y-3">
              {column.map((faq, index) => {
                const id = columnIndex * midpoint + index;
                const isOpen = open === id;
                return (
                  <Reveal key={faq.question} delay={index * 0.04}>
                    <div className="rounded-3xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() => setOpen(isOpen ? null : id)}
                        className="flex w-full items-center justify-between gap-4 text-left text-base font-semibold leading-snug text-slate-900"
                      >
                        <span>{faq.question}</span>
                        <ChevronDown
                          className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-300 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                          aria-hidden
                        />
                      </button>
                      <div
                        className={`grid transition-[grid-template-rows] duration-300 ${
                          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                        }`}
                      >
                        <div className="overflow-hidden" aria-hidden={!isOpen}>
                          <p className="mt-3 border-t border-slate-100 pt-3 text-base leading-relaxed text-slate-600">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
