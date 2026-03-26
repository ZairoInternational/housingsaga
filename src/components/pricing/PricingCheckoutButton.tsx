"use client";

import React, { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

type CheckoutProps = {
  planSlug: string;
  label: string;
  highlighted: boolean;
  addressKey?: string;
  redirectTo?: string;
};

type RazorpayOrderResponse = {
  orderId: string;
  amount: number;
  currency: string;
  keyId: string;
};

type RazorpayVerifyResponse = { ok: true } | { ok?: false; error?: string };

type RazorpayHandlerResponse = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};

type RazorpayOptions = {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description?: string;
  order_id: string;
  handler: (response: RazorpayHandlerResponse) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme?: {
    color: string;
  };
  modal?: {
    ondismiss?: () => void;
  };
  retry?: {
    enabled?: boolean;
  };
};

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => {
      open: () => void;
      on: (eventName: "payment.failed", callback: (response: unknown) => void) => void;
    };
  }
}

const RAZORPAY_SCRIPT_SRC = "https://checkout.razorpay.com/v1/checkout.js";

function normalizePhoneForRazorpay(phone: string | null | undefined): string | undefined {
  if (!phone) return undefined;
  const digits = phone.replaceAll(/\D/g, "");
  if (!digits) return undefined;
  // Razorpay checkout commonly expects numeric contact, usually 10-15 digits.
  if (digits.length < 10 || digits.length > 15) return undefined;
  return digits;
}

async function loadRazorpayScript(): Promise<void> {
  const existing = document.querySelector<HTMLScriptElement>(`script[src="${RAZORPAY_SCRIPT_SRC}"]`);
  if (existing) return;

  await new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = RAZORPAY_SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Razorpay script"));
    document.head.appendChild(script);
  });
}

export default function PricingCheckoutButton({
  planSlug,
  label,
  highlighted,
  addressKey: addressKeyProp,
  redirectTo: redirectToProp,
}: CheckoutProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession() as {
    data: {
      user?: {
        id?: string;
        email?: string | null;
        name?: string | null;
        phone?: string | null;
      };
    } | null;
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const addressKey = addressKeyProp ?? searchParams.get("addressKey");
  const redirectTo =
    redirectToProp ??
    searchParams.get("redirect") ??
    (addressKey ? `/add-property?addressKey=${encodeURIComponent(addressKey)}` : "/add-property");

  const buttonClassName = useMemo(() => {
    return `mt-8 inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium transition ${
      highlighted
        ? "bg-lime-400 text-black hover:bg-lime-300"
        : "bg-white/10 hover:bg-white/20 text-white"
    }`;
  }, [highlighted]);

  const openCheckout = useCallback(
    (order: RazorpayOrderResponse) => {
      const userName = session?.user?.name ?? undefined;
      const userEmail = session?.user?.email ?? undefined;
      const userPhone = normalizePhoneForRazorpay(session?.user?.phone);

      const options: RazorpayOptions = {
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: "HousingSaga",
        description: "Property Listing Fee (€200)",
        order_id: order.orderId,
        theme: { color: "#A3E635" },
        prefill: {
          name: userName ?? undefined,
          email: userEmail ?? undefined,
          contact: userPhone,
        },
        modal: {
          ondismiss: () => {
            setIsSubmitting(false);
            setFeedback("Payment was cancelled or timed out. Please try again.");
          },
        },
        retry: { enabled: true },
        handler: (response) => {
          void (async () => {
            setFeedback(null);

            try {
              const verifyRes = await fetch("/api/payments/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_signature: response.razorpay_signature,
                }),
              });

              const verifyJson = (await verifyRes.json()) as RazorpayVerifyResponse;

              if (!verifyRes.ok || !("ok" in verifyJson) || verifyJson.ok !== true) {
                const errMsg =
                  "error" in verifyJson && typeof verifyJson.error === "string"
                    ? verifyJson.error
                    : "Payment verification failed";
                throw new Error(errMsg);
              }

              setFeedback("Payment successful. You can now list your property.");
              router.push(redirectTo);
            } catch (err) {
              const message = err instanceof Error ? err.message : "Payment verification failed";
              setFeedback(message);
            } finally {
              setIsSubmitting(false);
            }
          })();
        },
      };

      if (!window.Razorpay) {
        throw new Error("Razorpay checkout library not available");
      }

      const checkout = new window.Razorpay(options);
      checkout.on("payment.failed", (failedResponse: unknown) => {
        setIsSubmitting(false);

        const maybeError = (failedResponse as {
          error?: { description?: unknown; reason?: unknown };
        }).error;

        const description =
          typeof maybeError?.description === "string"
            ? maybeError.description
            : null;
        const reason = typeof maybeError?.reason === "string" ? maybeError.reason : null;

        const message = description
          ? `Payment declined: ${description}${reason ? ` (${reason})` : ""}`
          : `Payment could not be completed.${reason ? ` Reason: ${reason}.` : ""} Please retry or use a different card/network.`;

        setFeedback(message);
      });
      checkout.open();
    },
    [session, redirectTo, router],
  );

  const handleClick = useCallback(async () => {
    if (!session?.user?.id) {
      router.push("/sign-in");
      return;
    }

    if (!addressKey) {
      setFeedback("Please fill your property address first, then pay for that address.");
      return;
    }

    setIsSubmitting(true);
    setFeedback(null);

    try {
      const res = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planSlug, addressKey }),
      });

      const json = (await res.json()) as
        | RazorpayOrderResponse
        | { error?: string; message?: string };

      if (!res.ok || !("orderId" in json)) {
        const msg =
          "error" in json && typeof json.error === "string"
            ? json.error
            : "Failed to create payment order";
        throw new Error(msg);
      }

      await loadRazorpayScript();
      openCheckout(json);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Checkout failed";
      setFeedback(message);
      setIsSubmitting(false);
    }
  }, [openCheckout, planSlug, router, session?.user?.id, addressKey]);

  return (
    <>
      <button
        type="button"
        className={buttonClassName}
        onClick={handleClick}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Processing..." : label}
      </button>
      {feedback && (
        <p className="mt-2 text-xs sm:text-sm text-gray-300" aria-live="polite">
          {feedback}
        </p>
      )}
    </>
  );
}

