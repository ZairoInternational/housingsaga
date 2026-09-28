"use client";

import { useState, type ReactNode } from "react";
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  Headset,
  Mail,
  MessageCircle,
  Phone,
} from "lucide-react";
import CallbackRequestModal from "@/components/ui/CallbackRequestModal";
import {
  SITE_EMAIL,
  SITE_PHONE_DISPLAY,
  SITE_PHONE_TEL,
  SITE_WHATSAPP_URL,
} from "@/lib/site-contact";

export default function ContactInfo() {
  const [callbackOpen, setCallbackOpen] = useState(false);

  return (
    <div className="flex flex-col gap-8 sm:gap-10 min-w-0 w-full max-w-full">
      <div className="min-w-0">
        <p className="flex items-center gap-3 text-[12px] sm:text-[13px] font-semibold uppercase tracking-[0.18em] text-lime-400 mb-4">
          <span className="h-px w-8 bg-lime-400" aria-hidden />
          Get In Touch
        </p>

        <h2 className="text-[clamp(2rem,5.5vw,3.35rem)] font-semibold leading-[1.1] tracking-tight">
          Contact Our{" "}
          <span className="text-lime-400">Agency</span>
        </h2>

        <p className="mt-4 text-[15px] sm:text-base text-white/65 leading-relaxed max-w-[540px]">
          Have a question about Golden Visa, property investment, or viewing
          homes in Greece? Our team is ready to help.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
        <ContactItem
          icon={<Phone className="h-4 w-4" />}
          label="Phone Support"
        >
          <a
            href={`tel:${SITE_PHONE_TEL}`}
            className="text-[15px] sm:text-base font-semibold text-white hover:text-lime-300 transition break-all"
          >
            {SITE_PHONE_DISPLAY}
          </a>
        </ContactItem>

        <ContactItem icon={<Mail className="h-4 w-4" />} label="Email Us">
          <a
            href={`mailto:${SITE_EMAIL}`}
            className="text-[15px] sm:text-base font-semibold text-white hover:text-lime-300 transition break-all"
          >
            {SITE_EMAIL}
          </a>
        </ContactItem>

        <ContactItem
          icon={<MessageCircle className="h-4 w-4" />}
          label="Chat Support"
        >
          <a
            href={SITE_WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[15px] sm:text-base font-semibold text-white hover:text-lime-300 transition"
          >
            Start WhatsApp chat
            <ArrowRight className="h-3.5 w-3.5 text-lime-400" />
          </a>
        </ContactItem>

        <ContactItem
          icon={<Clock3 className="h-4 w-4" />}
          label="Opening Hours"
          className="sm:col-span-2 xl:col-span-1"
        >
          <p className="text-[15px] sm:text-base font-semibold text-white">
            Mon – Fri: 8am – 6pm
          </p>
        </ContactItem>
      </div>

      {/* Book a Call card */}
      <div className="rounded-2xl border border-white/18 bg-[#1a2330]/85 backdrop-blur-md p-4 sm:p-5 shadow-[0_16px_50px_rgba(0,0,0,0.28)] ring-1 ring-white/8">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5">
          <div className="relative mx-auto sm:mx-0 h-[72px] w-[72px] sm:h-[80px] sm:w-[80px] shrink-0">
            <span className="absolute inset-0 rounded-full bg-lime-400/30 blur-[2px]" />
            <span className="absolute inset-[2px] rounded-full ring-2 ring-lime-400" />
            <div className="absolute inset-[5px] rounded-full bg-[#243041] flex items-center justify-center text-lime-400">
              <Headset className="h-7 w-7 sm:h-8 sm:w-8" aria-hidden />
            </div>
          </div>

          <div className="min-w-0 flex-1 text-center sm:text-left">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-lime-400">
              Book A Call
            </p>
            <p className="mt-1 text-base sm:text-lg font-semibold text-white leading-snug">
              Let&apos;s find your perfect property
            </p>
            <p className="mt-1 text-sm text-white/55 leading-relaxed">
              Pick a date and a 2-hour window — we&apos;ll try to connect within
              that time.
            </p>
          </div>

          <div className="sm:shrink-0 flex flex-col items-center sm:items-end gap-2.5 w-full sm:w-auto">
            <p className="text-xs text-white/55 text-center sm:text-right">
              HousingSaga Agent
            </p>
            <button
              type="button"
              onClick={() => setCallbackOpen(true)}
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-lime-400/90 text-lime-300 hover:bg-lime-400 hover:text-black text-sm font-semibold px-5 py-2.5 transition"
            >
              <CalendarDays className="h-4 w-4" />
              Request callback
            </button>
          </div>
        </div>
      </div>

      <CallbackRequestModal
        open={callbackOpen}
        onClose={() => setCallbackOpen(false)}
      />
    </div>
  );
}

function ContactItem({
  icon,
  label,
  children,
  className = "",
}: {
  icon: ReactNode;
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`min-w-0 flex items-start gap-3 ${className}`}>
      <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-lime-400/15 text-lime-400 ring-1 ring-lime-400/25">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-sm text-white/55 mb-1">{label}</p>
        {children}
      </div>
    </div>
  );
}
