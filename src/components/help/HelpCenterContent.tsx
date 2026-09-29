import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  LifeBuoy,
  Mail,
  MessageCircle,
  Phone,
} from "lucide-react";
import {
  SITE_EMAIL,
  SITE_PHONE_DISPLAY,
  SITE_PHONE_TEL,
  SITE_WHATSAPP_URL,
} from "@/lib/site-contact";

const topics = [
  {
    title: "Buying a property",
    body: "Shortlisting, viewings, offers, and what happens after you choose a home.",
    href: "/blogs",
  },
  {
    title: "Golden Visa guidance",
    body: "Eligibility, thresholds, documentation overview, and next steps.",
    href: "/golden-visa",
  },
  {
    title: "Account & listings",
    body: "Help with profile access, listing submission, and owner workflows.",
    href: "/contact#contact-form",
  },
  {
    title: "Payments & pricing",
    body: "Understand plans, fees, and what is included before you proceed.",
    href: "/pricing",
  },
];

export default function HelpCenterContent() {
  return (
    <section className="bg-[#f6f7f4] py-14 sm:py-18 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-lime-600 mb-3">
            · Help Center
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#14532d] tracking-tight">
            How can we help you today?
          </h2>
          <p className="mt-3 text-gray-600 leading-relaxed">
            Browse support topics or contact our team directly. For quick
            answers, also check the FAQ page.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {topics.map((topic) => (
            <Link
              key={topic.title}
              href={topic.href}
              className="rounded-2xl border border-gray-100 bg-white p-5 hover:border-lime-300 hover:shadow-md transition group"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-lime-100 text-[#14532d] mb-3">
                <BookOpen className="h-5 w-5" />
              </span>
              <h3 className="font-bold text-[#14532d] group-hover:text-lime-700 transition">
                {topic.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                {topic.body}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-lime-700">
                Open
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>

        <div className="rounded-3xl border border-lime-100 bg-white p-6 sm:p-8 grid md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-lime-400 text-black">
              <Phone className="h-5 w-5" />
            </span>
            <div>
              <p className="font-bold text-[#14532d]">Call us</p>
              <a
                href={`tel:${SITE_PHONE_TEL}`}
                className="text-sm text-gray-600 hover:text-lime-700"
              >
                {SITE_PHONE_DISPLAY}
              </a>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-lime-400 text-black">
              <Mail className="h-5 w-5" />
            </span>
            <div>
              <p className="font-bold text-[#14532d]">Email support</p>
              <a
                href={`mailto:${SITE_EMAIL}`}
                className="text-sm text-gray-600 hover:text-lime-700 break-all"
              >
                {SITE_EMAIL}
              </a>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-lime-400 text-black">
              <MessageCircle className="h-5 w-5" />
            </span>
            <div>
              <p className="font-bold text-[#14532d]">WhatsApp</p>
              <a
                href={SITE_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-600 hover:text-lime-700"
              >
                Start a chat
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-[#14532d] hover:border-lime-300 transition"
          >
            <LifeBuoy className="h-4 w-4" />
            Browse FAQs
          </Link>
          <Link
            href="/contact#contact-form"
            className="inline-flex items-center gap-2 rounded-full bg-lime-400 hover:bg-lime-300 px-5 py-2.5 text-sm font-bold text-black transition"
          >
            Contact support
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
