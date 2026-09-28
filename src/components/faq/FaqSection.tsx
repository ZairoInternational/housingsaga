"use client";

import Image from "next/image";
import Accordion, { AccordionItem } from "../ui/Accordion";

export type FAQItem = {
  id: string;
  question: string;
  answer: string;
};

export const DEFAULT_FAQ_ITEMS: FAQItem[] = [
  {
    id: "1",
    question: "How do I start buying property in Greece?",
    answer:
      "Share your goals and budget with our team. We’ll shortlist verified properties, arrange viewings or remote reviews, and guide you through legal and purchase steps.",
  },
  {
    id: "2",
    question: "What is the Greece Golden Visa pathway?",
    answer:
      "It is a residency-by-investment route tied to qualifying property purchases. We help you understand thresholds, eligible inventory, and the end-to-end process.",
  },
  {
    id: "3",
    question: "How long does a typical purchase take?",
    answer:
      "Timelines vary by property and documentation, but we provide a clear estimated schedule after the initial consultation.",
  },
  {
    id: "4",
    question: "Do you work with local legal partners?",
    answer:
      "Yes. We coordinate with trusted legal and real estate professionals in Greece to support due diligence and compliance.",
  },
  {
    id: "5",
    question: "Can HousingSaga help from India?",
    answer:
      "Absolutely. Our India and Greece teams work together so you get local guidance in India and on-ground support in Greece.",
  },
  {
    id: "6",
    question: "How do I get started?",
    answer:
      "Contact us via the website form, schedule a callback, or reach our support team. We’ll outline the next steps for your goals.",
  },
];

type FaqSectionProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  items?: FAQItem[];
};

export default function FaqSection({
  eyebrow = "Frequently Asked Questions",
  title = "Questions? We’re Here To Assist!",
  description = "Find clear answers about buying property in Greece, Golden Visa pathways, and how HousingSaga supports you from India to closing.",
  items = DEFAULT_FAQ_ITEMS,
}: FaqSectionProps) {
  const accordionItems: AccordionItem[] = items.map((item) => ({
    id: item.id,
    title: item.question,
    content: item.answer,
  }));

  return (
    <section className="py-16 sm:py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        <div>
          <p className="text-lime-600 text-sm font-semibold uppercase tracking-wider mb-4">
            · {eyebrow}
          </p>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-5 text-[#14532d] leading-tight">
            {title}
          </h2>

          <p className="text-gray-500 mb-8 max-w-[480px] leading-relaxed">
            {description}
          </p>

          <div className="relative h-[320px] sm:h-[400px] rounded-2xl overflow-hidden">
            <Image
              src="/faq-main.webp"
              alt="HousingSaga support"
              fill
              className="object-cover"
              sizes="(max-width:768px) 100vw, 500px"
            />
          </div>
        </div>

        <div>
          <Accordion
            items={accordionItems}
            defaultOpen={accordionItems[0]?.id}
          />
        </div>
      </div>
    </section>
  );
}
