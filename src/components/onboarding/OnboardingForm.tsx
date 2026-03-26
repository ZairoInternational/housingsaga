"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { RoleSelector } from "./RoleSelector";
import "react-phone-input-2/lib/style.css";
import { PhoneNumberInput } from "@/components/ui/PhoneNumberInput";

type SubmitStatus = "idle" | "loading" | "success" | "error";

export function OnboardingForm() {
  const router = useRouter();
  const { data: session, update } = useSession();
  const [role, setRole] = useState<"buyer" | "owner" | null>(null);
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    if (phone) return;
    const sessionPhone = (session?.user as Record<string, unknown> | undefined)
      ?.phone;
    if (typeof sessionPhone === "string" && sessionPhone.trim()) {
      setPhone(sessionPhone);
    }
  }, [phone, session]);

  const isValid = role && phone && phone.replace(/\D/g, "").length >= 10;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValid) {
      setError("Please fill in all required fields correctly");
      return;
    }

    setStatus("loading");
    setError("");

    try {
      const response = await fetch("/api/user/onboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role: role,
          phone: phone.replace(/\D/g, ""),
        }),
      });

      if (!response.ok) {
        const data = await response.json() as { error?: string };
        throw new Error(data.error || "Onboarding failed");
      }

      const data = await response.json();
      setStatus("success");

      console.log("[Onboarding] Success response:", data);

      // After successful onboarding, trigger session refresh to generate accessToken
      // This will cause the jwt callback to run again with the updated onboarded=true
      await update();

      // Show success state briefly, then redirect
      setTimeout(() => {
        // Redirect based on role
        const redirectPath = role === "buyer" ? "/properties" : "/profile";
        console.log("[Onboarding] Redirecting to:", redirectPath);
        router.push(redirectPath);
      }, 1500);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  return (
    <div className="w-full max-w-md space-y-6 mt-10">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-50 mb-2">
          👋 Welcome!
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Let&apos;s set up your account
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Role Selection */}
        <RoleSelector selected={role} onSelect={setRole} />

        {/* Phone Number Input */}
        <PhoneNumberInput
          label="Phone Number"
          required
          value={phone}
          onChange={setPhone}
          error={error && !role ? error : ""}
          defaultCountry="auto"
        />

        {/* Error Message */}
        {error && status === "error" && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-red-700 dark:text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Success Message */}
        {status === "success" && (
          <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <div className="flex items-center gap-3">
              <span className="text-2xl">✓</span>
              <p className="text-green-700 dark:text-green-400 text-sm">
                Setup complete! Redirecting...
              </p>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isValid || status === "loading" || status === "success"}
          className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            isValid && status === "idle"
              ? "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 cursor-pointer"
              : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
          }`}
        >
          {status === "loading" && (
            <span className="flex items-center justify-center gap-2">
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Completing setup...
            </span>
          )}
          {status === "success" && (
            <span className="flex items-center justify-center gap-2">
              ✓ Setup complete!
            </span>
          )}
          {status === "idle" && "Complete Setup"}
          {status === "error" && "Try again"}
        </button>
      </form>

      {/* Info Text */}
      <p className="text-center text-xs text-gray-500 dark:text-gray-400">
        You can change your role and phone number in your profile settings
        later.
      </p>
    </div>
  );
}
