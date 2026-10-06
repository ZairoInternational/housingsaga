"use client";

import { useState } from "react";

export default function OwnerAccessLinkCard() {
  const [pending, setPending] = useState(false);
  const [emailedTo, setEmailedTo] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function createLink() {
    setPending(true);
    setError(null);
    setEmailedTo(null);
    try {
      const response = await fetch("/api/account/owner-access-link", { method: "POST" });
      const body = (await response.json().catch(() => null)) as {
        emailedTo?: string;
        error?: string;
      } | null;
      if (!response.ok || !body?.emailedTo) {
        throw new Error(body?.error || "We couldn't email your private link. Please try again.");
      }
      setEmailedTo(body.emailedTo);
    } catch (createError) {
      setError(
        createError instanceof Error
          ? createError.message
          : "We couldn't email your private link. Please try again.",
      );
    } finally {
      setPending(false);
    }
  }

  return (
    <section className="mb-8 rounded-2xl border border-gray-200 bg-[#f7f6f3] px-5 py-6 shadow-sm dark:border-white/10 dark:bg-[#13161f] sm:px-7">
      <p className="text-xs font-semibold uppercase tracking-widest text-lime-600 dark:text-lime-400">
        Private access
      </p>
      <h2 className="mt-2 text-xl font-bold text-gray-900 dark:text-white">
        Manage properties without signing in
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600 dark:text-gray-300">
        We email you a private link and a temporary PIN. The first time you open it, you choose your own PIN. It does not use your HousingSaga password.
      </p>
      <button
        type="button"
        onClick={createLink}
        disabled={pending}
        className="mt-5 inline-flex h-12 items-center justify-center rounded-full bg-lime-400 px-5 text-sm font-semibold text-black hover:bg-lime-300 disabled:opacity-60"
      >
        {pending ? "Sending email…" : "Email my private access link"}
      </button>
      {error && (
        <p className="mt-4 text-sm text-red-600 dark:text-red-400" role="alert">
          {error}
        </p>
      )}
      {emailedTo && (
        <p className="mt-4 text-sm leading-6 text-gray-700 dark:text-gray-200" role="status">
          We sent the private link and temporary PIN to {emailedTo}. Open Access My Properties in that email, then choose your own PIN.
        </p>
      )}
    </section>
  );
}
