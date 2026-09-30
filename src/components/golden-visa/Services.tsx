"use client";

import Link from "next/link";
import { useState } from "react";
import {
  FiArrowRight,
  FiBriefcase,
  FiChevronDown,
  FiHome,
  FiShield,
  FiTool,
  FiUserCheck,
} from "react-icons/fi";
import ScheduleCallbackButton from "@/components/golden-visa/ScheduleCallbackButton";

const services = [
  {
    Icon: FiBriefcase,
    title: "Investment Advisory",
    desc: "Strategic guidance on property selection and portfolio optimization",
    details: [
      "Goal-based shortlist (visa, rental yield, or lifestyle)",
      "Market comparison across regions",
      "Budget and risk framing before you commit",
    ],
  },
  {
    Icon: FiShield,
    title: "Legal & Compliance",
    desc: "Expert legal support ensuring full regulatory compliance",
    details: [
      "Title and due-diligence checks",
      "Contract review with local counsel",
      "Compliance with Greek & EU requirements",
    ],
  },
  {
    Icon: FiHome,
    title: "Property Acquisition",
    desc: "End-to-end property purchase and ownership transfer",
    details: [
      "Negotiation and offer management",
      "Notary and transfer coordination",
      "Handover and ownership registration",
    ],
  },
  {
    Icon: FiUserCheck,
    title: "Visa Processing",
    desc: "Complete application management and government liaison",
    details: [
      "Eligibility assessment",
      "Document preparation & filing",
      "Follow-up until residency decision",
    ],
  },
  {
    Icon: FiTool,
    title: "Property Management",
    desc: "Rental optimization, maintenance, and asset care",
    details: [
      "Holiday rental via VacationSaga when you want yield",
      "Maintenance and guest-ready upkeep",
      "Performance reporting for owners",
    ],
  },
  {
    Icon: FiBriefcase,
    title: "Post-Visa Support",
    desc: "Ongoing assistance with renewals and residency matters",
    details: [
      "Renewal reminders and filing support",
      "Family member additions",
      "Long-term residency pathway guidance",
    ],
  },
];

export default function Services() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section
      id="services"
      className="py-14 sm:py-16 lg:py-20 relative overflow-hidden bg-[#f5f5f5] scroll-mt-24"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-12 space-y-3">
          <div className="inline-block px-4 py-2 bg-lime-400/20 text-lime-800 rounded-full text-sm font-semibold border border-lime-500/30">
            Our Services
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
            What We Provide
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            From first consult to ownership — and optional residency — with
            support that continues after you buy.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {services.map((service, index) => {
            const open = expanded === index;
            return (
              <div
                key={service.title}
                className={`relative h-full bg-white rounded-2xl p-7 sm:p-8 border transition-all duration-300 overflow-hidden ${
                  open
                    ? "border-lime-400 shadow-[0_16px_40px_rgba(0,0,0,0.08)]"
                    : "border-gray-300 shadow-[0_8px_24px_rgba(0,0,0,0.05)] hover:border-lime-400/40"
                }`}
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-lime-400" />

                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-xl bg-lime-400/15 border border-lime-400/30 text-lime-700 flex items-center justify-center">
                    <service.Icon size={22} />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                    {service.desc}
                  </p>

                  <button
                    type="button"
                    onClick={() => setExpanded(open ? null : index)}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-lime-700 hover:text-lime-800"
                  >
                    {open ? "Hide details" : "View details"}
                    <FiChevronDown
                      size={16}
                      className={`transition-transform ${open ? "rotate-180" : ""}`}
                    />
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      open ? "max-h-48 opacity-100 mt-1" : "max-h-0 opacity-0"
                    }`}
                  >
                    <ul className="space-y-2 pt-2 border-t border-gray-100">
                      {service.details.map((line) => (
                        <li
                          key={line}
                          className="text-sm text-gray-600 flex gap-2"
                        >
                          <span className="text-lime-500 mt-0.5">•</span>
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                    <ScheduleCallbackButton
                      defaultReason="Golden Visa consultation"
                      className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-black bg-lime-400 hover:bg-lime-300 px-4 py-2 rounded-full transition"
                    >
                      Book a consult
                      <FiArrowRight size={14} />
                    </ScheduleCallbackButton>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/services"
            className="inline-flex px-8 py-3.5 bg-lime-400 hover:bg-lime-300 text-black font-semibold rounded-2xl transition shadow-lg shadow-lime-500/20"
          >
            Explore service details
          </Link>
        </div>
      </div>
    </section>
  );
}
