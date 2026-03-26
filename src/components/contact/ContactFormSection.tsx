"use client";

import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";

type FormStatus = { type: "success" | "error"; message: string } | null;

export default function ContactFormSection() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const [status, setStatus] = useState<FormStatus>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone: phone.trim().length ? phone : null,
          subject: subject.trim().length ? subject : null,
          message,
        }),
      });

      if (!res.ok) {
        const json = (await res.json().catch(() => null)) as
          | { error?: string; details?: unknown }
          | null;
        setStatus({
          type: "error",
          message:
            json?.error ??
            "Something went wrong while sending your message. Please try again.",
        });
        return;
      }

      setStatus({ type: "success", message: "Message sent successfully." });
      setName("");
      setEmail("");
      setPhone("");
      setSubject("");
      setMessage("");
    } catch {
      setStatus({
        type: "error",
        message: "Something went wrong while sending your message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-[#f5f5f5] py-28">
      <div className="max-w-[1100px] mx-auto px-6 text-center">
        <p className="text-lime-500 text-sm mb-3">• Share Your Thoughts</p>

        <h2 className="text-[52px] font-semibold mb-4">Let’s Contact Today</h2>

        <p className="text-gray-500 max-w-[520px] mx-auto mb-12">
          Reach out to our team today for quick assistance, reliable guidance,
          and tailored solutions designed to support your business growth.
        </p>

        <form className="grid md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
          <Input
            ariaLabel="Your name"
            placeholder="Your name *"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            ariaLabel="Email address"
            placeholder="Email address *"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            ariaLabel="Your phone"
            placeholder="Your phone *"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <Input
            ariaLabel="Subject"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />

          <textarea
            aria-label="Your message"
            placeholder="Your message *"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="md:col-span-2 h-[140px] rounded-[18px] border border-gray-300 px-6 py-4 outline-none focus:border-lime-400"
          />

          {status && (
            <div
              className="md:col-span-2 rounded-xl px-4 py-3 text-sm"
              role="status"
              aria-live="polite"
              style={{
                background:
                  status.type === "success" ? "rgba(132,204,22,0.12)" : "rgba(239,68,68,0.12)",
                color: status.type === "success" ? "#2e7d00" : "#b91c1c",
                border:
                  status.type === "success"
                    ? "1px solid rgba(132,204,22,0.25)"
                    : "1px solid rgba(239,68,68,0.25)",
              }}
            >
              {status.message}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-10 md:col-span-2 px-8 py-4 bg-lime-400 rounded-full font-medium flex items-center gap-2 mx-auto disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Sending..." : "Send A Message"}
            <ArrowUpRight size={16} />
          </button>
        </form>
      </div>
    </section>
  );
}

function Input({
  placeholder,
  value,
  onChange,
  ariaLabel,
}: {
  placeholder: string;
  value: string;
  ariaLabel: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <input
      aria-label={ariaLabel}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="h-[56px] rounded-full border border-gray-300 px-6 outline-none focus:border-lime-400"
    />
  );
}
