"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  ChevronDown,
  Globe2,
  Mail,
  MessageSquare,
  Send,
  UserRound,
} from "lucide-react";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";

type FormStatus = { type: "success" | "error"; message: string } | null;

const SUBJECTS = [
  { value: "General Inquiry", labelKey: "general" },
  { value: "Support", labelKey: "support" },
  { value: "Partnership", labelKey: "partnership" },
  { value: "Golden Visa", labelKey: "goldenVisa" },
] as const;

export default function ContactForm() {
  const t = useTranslations("contactBlock");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
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
        message: t("required"),
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
          phone: null,
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
          t("failed");
        setStatus({
          type: "error",
          message: errorMessage,
        });
        toast.error(errorMessage);
        return;
      }

      setStatus({
        type: "success",
        message: t("sent"),
      });
      toast.success(t("sentToast"));
      setName("");
      setEmail("");
      setSubject("General Inquiry");
      setMessage("");
    } catch {
      const errorMessage = t("failed");
      setStatus({ type: "error", message: errorMessage });
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-[560px] lg:max-w-none lg:ml-0 rounded-[22px] border border-white/20 bg-[#1a2330]/92 backdrop-blur-md p-5 sm:p-7 lg:p-8 shadow-[0_24px_70px_rgba(0,0,0,0.35)] ring-1 ring-white/10 min-w-0 box-border">
      <div className="flex items-start gap-3 mb-6 sm:mb-7">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-lime-400 text-black">
          <Send className="h-4 w-4" />
        </span>
        <div className="min-w-0">
          <h3 className="text-lg sm:text-xl font-semibold text-white">
            {t("formTitle")}
          </h3>
          <p className="mt-1 text-sm text-white/55 leading-relaxed">
            {t("formLead")}
          </p>
        </div>
      </div>

      <form className="flex flex-col gap-3.5 sm:gap-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
          <Field
            icon={<UserRound className="h-4 w-4" />}
            placeholder={t("name")}
            value={name}
            onChange={setName}
            ariaLabel={t("nameLabel")}
            autoComplete="name"
          />
          <Field
            icon={<Mail className="h-4 w-4" />}
            placeholder={t("emailField")}
            value={email}
            onChange={setEmail}
            ariaLabel={t("emailLabel")}
            type="email"
            autoComplete="email"
          />
        </div>

        <div className="relative">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
            <Globe2 className="h-4 w-4" />
          </span>
          <select
            aria-label={t("subject")}
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="h-[52px] w-full appearance-none rounded-xl bg-[#0d131c]/70 border border-white/15 pl-11 pr-11 text-sm text-white outline-none focus:border-lime-400 transition"
          >
            {SUBJECTS.map((option) => (
              <option key={option.value} value={option.value} className="bg-[#111]">
                {t(`subjects.${option.labelKey}`)}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/40">
            <ChevronDown className="h-4 w-4" />
          </span>
        </div>

        <div className="relative">
          <span className="pointer-events-none absolute left-4 top-4 text-white/40">
            <MessageSquare className="h-4 w-4" />
          </span>
          <textarea
            aria-label={t("messageLabel")}
            placeholder={t("message")}
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full min-h-[120px] rounded-xl bg-[#0d131c]/70 border border-white/15 pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-white/35 outline-none focus:border-lime-400 transition resize-y"
          />
        </div>

        {status && (
          <div
            role="status"
            aria-live="polite"
            className={`rounded-xl px-4 py-3 text-sm ${
              status.type === "success"
                ? "bg-lime-400/10 text-lime-300 border border-lime-400/25"
                : "bg-red-500/10 text-red-300 border border-red-500/25"
            }`}
          >
            {status.message}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-1 w-full h-[54px] rounded-full bg-lime-400 text-black font-semibold flex items-center justify-center gap-2 hover:bg-lime-300 transition disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <Send className="h-4 w-4" />
          {isSubmitting ? t("sending") : t("send")}
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}

function Field({
  icon,
  placeholder,
  value,
  onChange,
  ariaLabel,
  type = "text",
  autoComplete,
}: {
  icon: React.ReactNode;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  ariaLabel: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div className="relative min-w-0">
      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
        {icon}
      </span>
      <input
        type={type}
        aria-label={ariaLabel}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        className="h-[52px] w-full rounded-xl bg-[#0d131c]/70 border border-white/15 pl-11 pr-4 text-sm text-white placeholder:text-white/35 outline-none focus:border-lime-400 transition"
      />
    </div>
  );
}
