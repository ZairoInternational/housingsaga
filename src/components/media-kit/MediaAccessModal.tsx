"use client";

import React, { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight, X } from "lucide-react";
import toast from "react-hot-toast";

type Props = {
  open: boolean;
  onClose: () => void;
  assetTitle?: string;
};

export default function MediaAccessModal({
  open,
  onClose,
  assetTitle = "Media Kit",
}: Props) {
  const titleId = useId();
  const [mounted, setMounted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const html = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
    };
  }, [open, onClose]);

  if (!open || !mounted) return null;

  const resetAndClose = () => {
    setSubmitted(false);
    setName("");
    setEmail("");
    setCompany("");
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      toast.error("Please enter your name and email.");
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
          subject: `Media Kit Access — ${assetTitle}`,
          message: [
            `Media kit access request for: ${assetTitle}`,
            company.trim() ? `Company / publication: ${company.trim()}` : null,
            "Please share the official brand assets / download link.",
          ]
            .filter(Boolean)
            .join("\n"),
        }),
      });

      if (!res.ok) {
        const json = (await res.json().catch(() => null)) as {
          error?: string;
        } | null;
        toast.error(json?.error ?? "Could not send request. Try again.");
        return;
      }

      setSubmitted(true);
      toast.success("Request sent. We’ll follow up by email.");
    } catch {
      toast.error("Could not send request. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/55"
        aria-label="Close"
        onClick={resetAndClose}
      />

      <div className="relative z-10 w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl bg-white shadow-2xl overflow-hidden">
        <div className="flex items-start justify-between gap-3 px-5 sm:px-6 pt-5 pb-3 border-b border-gray-100">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-lime-600">
              Media kit
            </p>
            <h2
              id={titleId}
              className="text-xl font-bold text-[#14532d] mt-1"
            >
              Request Access
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              For <span className="font-medium text-gray-700">{assetTitle}</span>
            </p>
          </div>
          <button
            type="button"
            onClick={resetAndClose}
            className="h-9 w-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {submitted ? (
          <div className="px-5 sm:px-6 py-8 text-center">
            <p className="text-base font-semibold text-[#14532d]">
              Request received
            </p>
            <p className="mt-2 text-sm text-gray-600 leading-relaxed">
              Thanks — our team will email approved brand assets shortly.
            </p>
            <button
              type="button"
              onClick={resetAndClose}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-lime-400 hover:bg-lime-300 text-black font-semibold text-sm px-5 py-2.5"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-5 sm:px-6 py-5 space-y-3">
            <Field label="Your name">
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full outline-none text-sm"
                placeholder="Full name"
              />
            </Field>
            <Field label="Work email">
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full outline-none text-sm"
                placeholder="you@publication.com"
              />
            </Field>
            <Field label="Company / publication (optional)">
              <input
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full outline-none text-sm"
                placeholder="Outlet or brand"
              />
            </Field>

            <p className="text-xs text-gray-500 leading-relaxed pt-1">
              Assets are shared on request so we can keep brand usage consistent
              and support press / partners properly.
            </p>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-lime-400 hover:bg-lime-300 text-black font-bold text-sm px-5 py-3 disabled:opacity-60"
            >
              {isSubmitting ? "Sending..." : "Submit request"}
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </form>
        )}
      </div>
    </div>,
    document.body,
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3">
      <span className="block text-[11px] font-semibold uppercase tracking-wide text-gray-400 mb-1">
        {label}
      </span>
      {children}
    </label>
  );
}
