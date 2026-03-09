"use client";

import { useState, useRef, useEffect } from "react";
import { Plus } from "lucide-react";
import gsap from "gsap";

export type AccordionItem = {
  id: string;
  title: string;
  content: string;
};

type Props = {
  items: AccordionItem[];
  defaultOpen?: string;
};

export default function Accordion({ items, defaultOpen }: Props) {
  const [openId, setOpenId] = useState<string | null>(defaultOpen || null);

  const contentRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  /* GSAP animation */
  useEffect(() => {
    items.forEach((item) => {
      const el = contentRefs.current[item.id];
      if (!el) return;

      if (openId === item.id) {
        gsap.to(el, {
          height: el.scrollHeight,
          opacity: 1,
          duration: 0.35,
          ease: "power2.out",
        });

        buttonRefs.current[item.id]?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      } else {
        gsap.to(el, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    });
  }, [openId, items]);

  if (!items?.length) {
    return <p className="text-gray-500">No FAQs available.</p>;
  }

  return (
    <>
      {/* SEO FAQ Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: items.map((item) => ({
              "@type": "Question",
              name: item.title,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.content,
              },
            })),
          }),
        }}
      />

      <div className="w-full space-y-2">
        {items.map((item) => {
          const isOpen = openId === item.id;

          return (
            <div
              key={item.id}
              className="border-b border-gray-200 dark:border-gray-700"
            >
              <button
                ref={(el) => {
                  if (el) {
                    buttonRefs.current[item.id] = el;
                  }
                }}
                onClick={() => toggle(item.id)}
                className="w-full flex justify-between items-center py-5 text-left"
              >
                <span className="font-medium text-lg">{item.title}</span>

                <Plus
                  size={20}
                  className={`transition-transform duration-300 ${
                    isOpen ? "rotate-45" : "rotate-0"
                  }`}
                />
              </button>

              <div
                ref={(el) => {
                  if (el) {
                    contentRefs.current[item.id] = el;
                  }
                }}
                style={{ height: 0 }}
                className="overflow-hidden opacity-0"
              >
                <p className="text-gray-600 dark:text-gray-400 pb-5 pr-6">
                  {item.content}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
