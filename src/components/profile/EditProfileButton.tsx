"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RiEdit2Line } from "react-icons/ri";

import { useAuthStore } from "@/store/AuthStore";

export default function EditProfileButton({
  name,
  email,
  phone,
}: {
  name: string;
  email: string;
  phone?: string | null;
}) {
  const router = useRouter();
  const setProfile = useAuthStore((state) => state.setProfile);
  const [open, setOpen] = useState(false);
  const [nextName, setNextName] = useState(name);
  const [nextPhone, setNextPhone] = useState(phone ?? "");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const openEditor = () => {
    setNextName(name);
    setNextPhone(phone ?? "");
    setError(null);
    setOpen(true);
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setPending(true);
    setError(null);
    try {
      const res = await fetch("/api/account/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: nextName, phone: nextPhone }),
      });
      const json = (await res.json().catch(() => null)) as {
        error?: string;
        name?: string;
        email?: string;
      } | null;
      if (!res.ok) {
        setError(json?.error || "Could not save your profile.");
        return;
      }
      setProfile({
        name: json?.name ?? nextName.trim(),
        email: json?.email ?? email,
      });
      setOpen(false);
      router.refresh();
    } catch {
      setError("Could not save your profile.");
    } finally {
      setPending(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={openEditor}
        className="inline-flex items-center gap-2 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/8 hover:text-gray-900 dark:hover:text-white transition-all shadow-sm"
      >
        <RiEdit2Line className="h-4 w-4" />
        Edit profile
      </button>

      {open && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center px-4">
          <button
            type="button"
            aria-label="Close edit profile"
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />
          <form
            onSubmit={onSubmit}
            className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-[#161616]"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Edit profile
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Update the name and phone shown on your account.
            </p>

            <label className="mt-5 block text-sm font-medium text-gray-700 dark:text-gray-200">
              Name
              <input
                value={nextName}
                onChange={(event) => setNextName(event.target.value)}
                required
                minLength={3}
                className="mt-1.5 w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm text-gray-900 focus:border-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-500/30 dark:border-white/15 dark:bg-white/5 dark:text-white"
              />
            </label>

            <label className="mt-4 block text-sm font-medium text-gray-700 dark:text-gray-200">
              Email
              <input
                value={email}
                readOnly
                className="mt-1.5 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-500 dark:border-white/10 dark:bg-white/5 dark:text-gray-400"
              />
            </label>

            <label className="mt-4 block text-sm font-medium text-gray-700 dark:text-gray-200">
              Phone
              <input
                value={nextPhone}
                onChange={(event) => setNextPhone(event.target.value)}
                placeholder="Optional"
                className="mt-1.5 w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm text-gray-900 focus:border-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-500/30 dark:border-white/15 dark:bg-white/5 dark:text-white"
              />
            </label>

            {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={pending}
                className="rounded-full bg-lime-500 px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-lime-400 disabled:opacity-60"
              >
                {pending ? "Saving…" : "Save"}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
