"use client";

import Image from "next/image";
import Accordion, { AccordionItem } from "../ui/Accordion";


export type FAQItem = {
  id: string;
  question: string;
  answer: string;
};

export default function FaqSection() {
const faqData: FAQItem[] = [
  {
    id: "1",
    question: "How do you ensure the quality of your designs?",
    answer:
      "We maintain high standards through detailed research, creative brainstorming, and multiple review stages to ensure precision and originality.",
  },
  {
    id: "2",
    question: "How does the design process begin?",
    answer:
      "Our process begins with consultation to understand your goals, followed by research, concept development, and iterative design refinement.",
  },
  {
    id: "3",
    question: "How long will it take to complete my design project?",
    answer:
      "Project timelines vary depending on complexity, but we always provide an estimated schedule before starting the work.",
  },
  {
    id: "4",
    question: "Do you work with specific contractors or suppliers?",
    answer:
      "Yes, we collaborate with trusted partners to ensure quality materials and workmanship.",
  },
  {
    id: "5",
    question: "Do I need to hire an architect for my project?",
    answer:
      "Depending on the scope, an architect may be recommended for structural work.",
  },
  {
    id: "6",
    question: "Can you help me choose the right property?",
    answer:
      "Absolutely. Our team provides expert guidance to help you evaluate properties based on location, value, future potential, and your personal requirements.",
  },
  {
    id: "7",
    question: "Do you provide support after the project is completed?",
    answer:
      "Yes, we offer post-project support to ensure everything functions smoothly and to assist with any adjustments or questions you may have.",
  },
  {
    id: "8",
    question: "How much does a typical project cost?",
    answer:
      "The cost varies depending on the size, complexity, and scope of the project. After the initial consultation, we provide a clear estimate tailored to your needs.",
  },
  {
    id: "9",
    question: "Can I customize the design according to my preferences?",
    answer:
      "Of course. Our design approach is highly collaborative, allowing you to personalize every detail to match your vision and lifestyle.",
  },
  {
    id: "10",
    question: "How do I get started with your services?",
    answer:
      "Simply contact us through the website, schedule a consultation, or call our support team. We will guide you through the next steps of your project.",
  },
];

  /** Convert FAQ format to Accordion format */
  const accordionItems: AccordionItem[] = faqData.map((item) => ({
    id: item.id,
    title: item.question,
    content: item.answer,
  }));

  return (
    <section className="py-28 bg-white dark:bg-[#0f0f0f]">
      <div className="max-w-[1300px] mx-auto px-6 grid lg:grid-cols-2 gap-16 items-start">
        {/* Left Content */}
        <div>
          <p className="text-lime-500 text-sm mb-4">
            • Frequently Asked Questions
          </p>

          <h2 className="text-[52px] font-semibold mb-6 text-gray-900 dark:text-white">
            Questions? We&apos;re Here To Assist!
          </h2>

          <p className="text-gray-500 dark:text-gray-400 mb-10 max-w-[480px]">
            Find clear answers to the most common real estate questions. Our FAQ
            section helps you understand every step of buying, selling, or
            managing your property easily.
          </p>

          <div className="relative h-[450px] rounded-[20px] overflow-hidden">
            <Image
              src="/faq-main.webp"
              alt="Luxury house"
              fill
              className="object-cover"
              sizes="(max-width:768px) 100vw, 500px"
            />
          </div>
        </div>

        {/* Accordion */}
        <div>
          <Accordion items={accordionItems} defaultOpen="1" />
        </div>
      </div>
    </section>
  );
}
