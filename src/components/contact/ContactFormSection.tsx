"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  Check,
  Mail,
  MessageSquare,
  Phone,
  Send,
  User,
} from "lucide-react";
import toast from "react-hot-toast";

type FormStatus = { type: "success" | "error"; message: string } | null;

const SUBJECTS = [
  "General Inquiry",
  "Property Viewing",
  "Golden Visa",
  "Investment Advice",
  "Partnership",
  "Other",
];

const WHY_POINTS = [
  "Expert guidance across Greece & India",
  "Curated residential & investment properties",
  "Transparent process from inquiry to closing",
  "End-to-end assistance including Golden Visa",
];

export default function ContactFormSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("General Inquiry");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<FormStatus>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);

    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus({
        type: "error",
        message: "Please fill in name, email, and message.",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim() || null,
          subject: subject.trim() || null,
          message: message.trim(),
        }),
      });

      if (!res.ok) {
        const json = (await res.json().catch(() => null)) as {
          error?: string;
          details?: unknown;
        } | null;
        const errorMessage =
          (typeof json?.error === "string" && json.error) ||
          (typeof json?.details === "string" && json.details) ||
          "Something went wrong while sending your message. Please try again.";
        setStatus({ type: "error", message: errorMessage });
        toast.error(errorMessage);
        return;
      }

      setStatus({
        type: "success",
        message: "Message sent. We’ll reply within 1–2 business days.",
      });
      toast.success("Message sent successfully.");
      setName("");
      setEmail("");
      setPhone("");
      setSubject("General Inquiry");
      setMessage("");
    } catch {
      const errorMessage =
        "Something went wrong while sending your message. Please try again.";
      setStatus({ type: "error", message: errorMessage });
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact-form" className="bg-white py-12 sm:py-16 lg:py-20 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-[1.75rem] bg-[#eef6e6] border border-lime-100/80 p-5 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8 lg:gap-10 items-start">
            {/* Form */}
            <div>
              <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-lime-700 mb-3">
                <span className="h-px w-5 bg-lime-600" />
                Let&apos;s talk
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#14532d] tracking-tight">
                Send Us a Message
              </h2>
              <p className="mt-2 text-sm text-gray-600 max-w-md">
                Tell us what you need — property search, viewing, or Golden Visa
                guidance — and we&apos;ll get back to you.
              </p>

              <form onSubmit={handleSubmit} className="mt-7 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field
                    icon={<User className="h-4 w-4" />}
                    label="Your Name"
                  >
                    <input
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Full name"
                      className="w-full bg-transparent outline-none text-sm text-gray-900 placeholder:text-gray-400"
                    />
                  </Field>
                  <Field
                    icon={<Mail className="h-4 w-4" />}
                    label="Email Address"
                  >
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@email.com"
                      className="w-full bg-transparent outline-none text-sm text-gray-900 placeholder:text-gray-400"
                    />
                  </Field>
                  <Field
                    icon={<Phone className="h-4 w-4" />}
                    label="Phone Number"
                  >
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Optional"
                      className="w-full bg-transparent outline-none text-sm text-gray-900 placeholder:text-gray-400"
                    />
                  </Field>
                  <Field
                    icon={<MessageSquare className="h-4 w-4" />}
                    label="Subject"
                  >
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-transparent outline-none text-sm text-gray-900"
                    >
                      {SUBJECTS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>

                <div className="rounded-2xl border border-gray-200/80 bg-white px-4 py-3 min-h-[140px]">
                  <label className="block text-[11px] font-semibold uppercase tracking-wide text-gray-400 mb-1">
                    Your Message
                  </label>
                  <textarea
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we help?"
                    rows={5}
                    className="w-full resize-y bg-transparent outline-none text-sm text-gray-900 placeholder:text-gray-400 min-h-[100px]"
                  />
                </div>

                {status && (
                  <div
                    role="status"
                    className={`rounded-xl px-4 py-3 text-sm border ${
                      status.type === "success"
                        ? "bg-lime-50 border-lime-200 text-lime-900"
                        : "bg-red-50 border-red-200 text-red-800"
                    }`}
                  >
                    {status.message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-lime-400 hover:bg-lime-300 text-black font-bold text-sm px-8 py-3.5 transition disabled:opacity-60"
                >
                  <Send className="h-4 w-4" />
                  {isSubmitting ? "Sending..." : "Send Message"}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </div>

            {/* Side promo */}
            <aside className="space-y-5">
              <div className="relative overflow-hidden rounded-2xl min-h-[240px] sm:min-h-[280px]">
                <Image
                  src="/contact-show1.webp"
                  alt="Your dream home awaits"
                  fill
                  sizes="(min-width: 1024px) 420px, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
                <p className="absolute bottom-6 left-6 right-6 text-2xl sm:text-3xl font-semibold text-white italic leading-snug">
                  Your Dream Home Awaits
                </p>
              </div>

              <div className="rounded-2xl bg-white border border-gray-100 p-5 sm:p-6 shadow-sm">
                <h3 className="text-lg font-bold text-[#14532d] mb-4">
                  Why Choose HousingSaga?
                </h3>
                <ul className="space-y-3">
                  {WHY_POINTS.map((point) => (
                    <li key={point} className="flex items-start gap-2.5">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-lime-400 text-black">
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      <span className="text-sm text-gray-700 leading-snug">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-gray-200/80 bg-white px-4 py-3 flex items-center gap-3">
      <span className="text-lime-600 shrink-0">{icon}</span>
      <div className="min-w-0 flex-1">
        <label className="block text-[11px] font-semibold uppercase tracking-wide text-gray-400 mb-0.5">
          {label}
        </label>
        {children}
      </div>
    </div>
  );
}
