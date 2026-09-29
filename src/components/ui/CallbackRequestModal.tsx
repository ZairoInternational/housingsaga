"use client";

import React, { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight, MessageCircle, X } from "lucide-react";
import toast from "react-hot-toast";

const WHATSAPP_NUMBER = "919076621166";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hi HousingSaga, I’d like to book a discovery call.",
)}`;

const TIME_WINDOWS = [
  { value: "9:00 AM – 11:00 AM", short: "9–11 AM" },
  { value: "11:00 AM – 1:00 PM", short: "11–1 PM" },
  { value: "1:00 PM – 3:00 PM", short: "1–3 PM" },
  { value: "3:00 PM – 5:00 PM", short: "3–5 PM" },
] as const;

export const CALLBACK_REASONS = [
  "Golden Visa consultation",
  "Property investment advice",
  "Property viewing / shortlist help",
  "Documents & application support",
  "Pricing or partnership inquiry",
  "Meet the team",
  "General inquiry",
  "Other",
] as const;

export type CallbackReason = (typeof CALLBACK_REASONS)[number];

type Props = {
  open: boolean;
  onClose: () => void;
  /** Pre-selects a reason based on where the modal was opened */
  defaultReason?: CallbackReason | string;
};

function tomorrowISODate() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

function normalizeReason(value?: string): CallbackReason {
  if (value && (CALLBACK_REASONS as readonly string[]).includes(value)) {
    return value as CallbackReason;
  }
  return "General inquiry";
}

export default function CallbackRequestModal({
  open,
  onClose,
  defaultReason,
}: Props) {
  const titleId = useId();
  const [mounted, setMounted] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState<CallbackReason>(
    normalizeReason(defaultReason),
  );
  const [reasonOther, setReasonOther] = useState("");
  const [date, setDate] = useState(tomorrowISODate());
  const [windowSlot, setWindowSlot] = useState<string>(TIME_WINDOWS[2].value);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    setReason(normalizeReason(defaultReason));
  }, [open, defaultReason]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const html = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    const prevBodyPaddingRight = body.style.paddingRight;
    const scrollbarGap = window.innerWidth - html.clientWidth;

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    if (scrollbarGap > 0) {
      body.style.paddingRight = `${scrollbarGap}px`;
    }

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      body.style.paddingRight = prevBodyPaddingRight;
    };
  }, [open, onClose]);

  if (!open || !mounted) return null;

  const resolvedReason =
    reason === "Other"
      ? reasonOther.trim() || "Other"
      : reason;

  const resetAndClose = () => {
    setSubmitted(false);
    setName("");
    setPhone("");
    setEmail("");
    setReason(normalizeReason(defaultReason));
    setReasonOther("");
    setDate(tomorrowISODate());
    setWindowSlot(TIME_WINDOWS[2].value);
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !date || !windowSlot) {
      toast.error("Please fill name, phone, date, and time window.");
      return;
    }
    if (reason === "Other" && !reasonOther.trim()) {
      toast.error("Please tell us the reason for your callback.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim() || null,
          phone: phone.trim(),
          subject: `Callback request — ${resolvedReason}`,
          message: `Please call me back on ${date} between ${windowSlot}.\nReason: ${resolvedReason}`,
          requestType: "callback",
          preferredDate: date,
          preferredWindow: windowSlot,
          reason: resolvedReason,
        }),
      });

      if (!res.ok) {
        const json = (await res.json().catch(() => null)) as {
          error?: string;
        } | null;
        toast.error(json?.error ?? "Could not submit request. Try again.");
        return;
      }

      setSubmitted(true);
      toast.success("Callback window requested.");
    } catch {
      toast.error("Could not submit request. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-end justify-center sm:items-center sm:p-5 md:p-8"
      style={{
        width: "100%",
        maxWidth: "100%",
        height: "100%",
        overflow: "hidden",
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        aria-label="Close dialog backdrop"
        className="absolute inset-0 bg-black/70 backdrop-blur-[2px]"
        onClick={resetAndClose}
      />

      <div
        className="
          relative z-10 flex flex-col box-border
          w-full max-w-full
          sm:max-w-[440px] md:max-w-[480px]
          max-h-[92dvh] sm:max-h-[88dvh]
          bg-[#1a1714] text-white
          rounded-t-[22px] sm:rounded-[24px]
          border border-white/10 border-b-0 sm:border-b
          shadow-2xl overflow-x-hidden overflow-y-hidden
          pb-[env(safe-area-inset-bottom)]
        "
      >
        <div className="sm:hidden flex justify-center pt-3 pb-1 shrink-0">
          <span className="h-1 w-10 rounded-full bg-white/25" />
        </div>

        <div className="shrink-0 flex items-start justify-between gap-3 px-4 sm:px-6 pt-2 sm:pt-6 pb-3 sm:pb-4 border-b border-white/10">
          <div className="min-w-0 flex-1 pr-2">
            <p className="text-lime-400 text-[11px] sm:text-xs font-medium tracking-wide uppercase mb-1">
              Discovery call
            </p>
            <h2
              id={titleId}
              className="text-lg sm:text-xl font-semibold leading-tight"
            >
              Request a callback window
            </h2>
            <p className="text-white/60 text-xs sm:text-sm mt-1.5 sm:mt-2 leading-relaxed">
              Pick a date, time window, and reason. We’ll try to connect within
              that time on Mon–Fri.
            </p>
          </div>
          <button
            type="button"
            onClick={resetAndClose}
            className="shrink-0 w-10 h-10 sm:w-9 sm:h-9 rounded-full bg-white/5 hover:bg-white/10 active:bg-white/15 flex items-center justify-center transition"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain [-webkit-overflow-scrolling:touch]">
          {submitted ? (
            <div className="px-4 sm:px-6 py-6 sm:py-8 flex flex-col gap-4 sm:gap-5">
              <div className="rounded-2xl bg-lime-400/10 border border-lime-400/25 px-4 py-4">
                <p className="font-medium text-lime-300">Request received</p>
                <p className="text-sm text-white/70 mt-1 leading-relaxed">
                  We’ll aim to call you on{" "}
                  <span className="text-white">{date}</span> between{" "}
                  <span className="text-white">{windowSlot}</span>
                  {" "}about{" "}
                  <span className="text-white">{resolvedReason}</span>.
                </p>
              </div>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-12 h-12 w-full rounded-full bg-[#25D366] text-black font-medium flex items-center justify-center gap-2 hover:brightness-110 active:brightness-95 transition text-sm sm:text-base px-3"
              >
                <MessageCircle size={18} className="shrink-0" />
                Chat on WhatsApp now
              </a>

              <button
                type="button"
                onClick={resetAndClose}
                className="min-h-11 text-sm text-white/60 hover:text-white transition py-2"
              >
                Close
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="px-4 sm:px-6 py-4 sm:py-6 flex flex-col gap-3.5 sm:gap-4"
            >
              <Field
                label="Name *"
                value={name}
                onChange={setName}
                placeholder="Your name"
                autoComplete="name"
              />
              <Field
                label="Phone / WhatsApp *"
                value={phone}
                onChange={setPhone}
                placeholder="+91 …"
                autoComplete="tel"
                type="tel"
              />
              <Field
                label="Email (optional)"
                value={email}
                onChange={setEmail}
                placeholder="you@email.com"
                autoComplete="email"
                type="email"
              />

              <label className="flex flex-col gap-2 text-sm w-full">
                <span className="text-white/60">Reason for callback *</span>
                <select
                  required
                  value={reason}
                  onChange={(e) =>
                    setReason(normalizeReason(e.target.value))
                  }
                  className="h-12 w-full rounded-full bg-black border border-white/10 px-4 sm:px-5 text-sm outline-none focus:border-lime-400 appearance-none"
                  style={{ maxWidth: "100%", boxSizing: "border-box" }}
                  aria-label="Reason for callback"
                >
                  {CALLBACK_REASONS.map((option) => (
                    <option key={option} value={option} className="bg-[#111]">
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              {reason === "Other" && (
                <Field
                  label="Tell us more *"
                  value={reasonOther}
                  onChange={setReasonOther}
                  placeholder="What would you like to discuss?"
                />
              )}

              <label className="flex flex-col gap-2 text-sm w-full">
                <span className="text-white/60">Preferred date *</span>
                <input
                  type="date"
                  required
                  min={new Date().toISOString().slice(0, 10)}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="h-12 w-full rounded-full bg-black border border-white/10 px-4 sm:px-5 text-sm outline-none focus:border-lime-400 [color-scheme:dark]"
                  style={{ maxWidth: "100%", boxSizing: "border-box" }}
                />
              </label>

              <div className="flex flex-col gap-2 w-full">
                <span className="text-sm text-white/60">Time window *</span>
                <div className="grid grid-cols-2 gap-2 w-full">
                  {TIME_WINDOWS.map((slot) => {
                    const active = windowSlot === slot.value;
                    return (
                      <button
                        key={slot.value}
                        type="button"
                        onClick={() => setWindowSlot(slot.value)}
                        className={`min-h-11 h-11 sm:h-12 w-full rounded-full text-xs sm:text-sm font-medium border transition px-1.5 sm:px-2 ${
                          active
                            ? "bg-lime-400 text-black border-lime-400"
                            : "bg-black text-white/80 border-white/10 hover:border-white/25 active:border-white/30"
                        }`}
                      >
                        <span className="sm:hidden">{slot.short}</span>
                        <span className="hidden sm:inline">{slot.value}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-1 pt-3 pb-4 sm:pb-1">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full min-h-12 h-12 rounded-full bg-lime-400 text-black font-medium flex items-center justify-center gap-2 hover:brightness-110 active:brightness-95 transition disabled:opacity-70 text-sm sm:text-base px-3"
                >
                  {isSubmitting ? "Sending..." : "Request callback"}
                  <ArrowUpRight size={16} className="shrink-0" />
                </button>

                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 mb-1 block text-center text-xs sm:text-sm text-white/55 hover:text-lime-300 transition leading-relaxed"
                >
                  Prefer instant chat? Message us on WhatsApp
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  autoComplete,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  autoComplete?: string;
  type?: string;
}) {
  return (
    <label className="flex flex-col gap-2 text-sm w-full">
      <span className="text-white/60">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="h-12 w-full rounded-full bg-black border border-white/10 px-4 sm:px-5 text-sm outline-none focus:border-lime-400"
        style={{ maxWidth: "100%", boxSizing: "border-box" }}
      />
    </label>
  );
}
