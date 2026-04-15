"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { createFirstAddressQuotaToken } from "@/lib/entitlement-quota";
import toast from "react-hot-toast";

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

type CouponEvaluationResponse =
  | {
      ok: true;
      planSlug: string;
      currency: string;
      baseAmountEuro: number;
      discountEuro: number;
      payableAmountEuro: number;
      couponCode: string;
    }
  | { error?: string; message?: string };

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
  const [couponCode, setCouponCode] = useState<string>("");
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [didAutoApplyOfferCoupon, setDidAutoApplyOfferCoupon] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<{
    couponCode: string;
    currency: string;
    baseAmountEuro: number;
    discountEuro: number;
    payableAmountEuro: number;
  } | null>(null);

  const addressKey = addressKeyProp ?? searchParams.get("addressKey");
  const offerCouponCode = (searchParams.get("couponCode") ?? "").trim();
  const hasOfferCouponCode = offerCouponCode.length > 0;
  const redirectTo =
    redirectToProp ??
    searchParams.get("redirect") ??
    (addressKey
      ? `/add-property?addressKey=${encodeURIComponent(addressKey)}`
      : "/add-property?payment=success");

  // Only generate a one-time quota token when the user is paying directly from
  // the pricing CTA (no explicit `addressKey` or `redirectTo` passed in props).
  const canGenerateQuotaToken = addressKeyProp == null && redirectToProp == null;



  const formatEuro = useCallback((amountEuro: number) => {
    const value = Math.max(0, Math.round(amountEuro * 100) / 100);
    return `€${value.toFixed(2)}`;
  }, []);

  const applyCoupon = useCallback(
    async (rawCouponCode: string, opts?: { silent?: boolean }) => {
      if (!session?.user?.id) {
        if (!opts?.silent) {
          toast.error("Please sign in to apply a coupon.");
          router.push("/sign-in");
        }
        return;
      }

      const raw = rawCouponCode.trim();
      if (!raw) {
        setAppliedCoupon(null);
        if (!opts?.silent) {
          toast.error("Enter a coupon code.");
        }
        return;
      }

      setIsApplyingCoupon(true);

      try {
        const res = await fetch("/api/coupons/evaluate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ planSlug, couponCode: raw }),
        });

        const json = (await res.json()) as CouponEvaluationResponse;

        if (!res.ok || !("ok" in json) || json.ok !== true) {
          const msg =
            "message" in json && typeof json.message === "string"
              ? json.message
              : "Invalid coupon";
          throw new Error(msg);
        }

        setCouponCode(json.couponCode);
        setAppliedCoupon({
          couponCode: json.couponCode,
          currency: json.currency,
          baseAmountEuro: json.baseAmountEuro,
          discountEuro: json.discountEuro,
          payableAmountEuro: json.payableAmountEuro,
        });
        if (!opts?.silent) {
          toast.success(
            json.discountEuro > 0 ? "Coupon applied." : "Coupon applied (no discount).",
          );
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to apply coupon";
        setAppliedCoupon(null);
        if (!opts?.silent) {
          toast.error(message);
        }
      } finally {
        setIsApplyingCoupon(false);
      }
    },
    [planSlug, router, session?.user?.id],
  );

  const handleApplyCoupon = useCallback(() => {
    void applyCoupon(couponCode, { silent: false });
  }, [applyCoupon, couponCode]);

  useEffect(() => {
    if (!hasOfferCouponCode || didAutoApplyOfferCoupon || !session?.user?.id) return;

    setDidAutoApplyOfferCoupon(true);
    void applyCoupon(offerCouponCode, { silent: true });
  }, [
    applyCoupon,
    didAutoApplyOfferCoupon,
    hasOfferCouponCode,
    offerCouponCode,
    session?.user?.id,
  ]);

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
            toast.error("Payment was cancelled or timed out. Please try again.");
          },
        },
        retry: { enabled: true },
        handler: (response) => {
          void (async () => {
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

              toast.success("Payment successful.");
              router.push(redirectTo);
            } catch (err) {
              const message = err instanceof Error ? err.message : "Payment verification failed";
              toast.error(message);
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

        toast.error(message);
      });
      checkout.open();
    },
    [session, redirectTo, router],
  );

  const handleClick = useCallback(async () => {
    if (!session?.user?.id) {
      toast.error("Please sign in to continue.");
      router.push("/sign-in");
      return;
    }

    if (!addressKey && !canGenerateQuotaToken) {
      toast.error("Please fill your property address first.");
      return;
    }

    const effectiveAddressKey =
      addressKey ?? createFirstAddressQuotaToken(session.user.id);

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planSlug,
          addressKey: effectiveAddressKey,
          couponCode:
            appliedCoupon?.couponCode ??
            (couponCode.trim().length > 0 ? couponCode : undefined),
        }),
      });

      const json = (await res.json()) as
        | RazorpayOrderResponse
        | { skipRazorpay: true; payableAmountEuro?: number }
        | { error?: string; message?: string };

      if (!res.ok) {
        const msg =
          "message" in json && typeof json.message === "string"
            ? json.message
            : "Failed to create payment order";
        throw new Error(msg);
      }

      if ("skipRazorpay" in json && json.skipRazorpay === true) {
        setIsSubmitting(false);
        toast.success("Payment successful.");
        router.push(redirectTo);
        return;
      }

      if (!("orderId" in json)) {
        throw new Error("Unexpected checkout response");
      }

      await loadRazorpayScript();
      openCheckout(json);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Checkout failed";
      setIsSubmitting(false);
      toast.error(message);
    }
  }, [
    openCheckout,
    planSlug,
    router,
    session?.user?.id,
    addressKey,
    canGenerateQuotaToken,
    couponCode,
    appliedCoupon?.couponCode,
    redirectTo,
  ]);

  return (
    <>
      <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        {!hasOfferCouponCode ? (
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => {
                setCouponCode(e.target.value);
                setAppliedCoupon(null);
              }}
              placeholder="Enter coupon code"
              className="flex-1 min-w-0 text-sm rounded-full border border-gray-300 bg-gray-50 px-4 py-2 outline-none transition focus:border-lime-500 focus:ring-2 focus:ring-lime-100"
              disabled={isSubmitting || isApplyingCoupon}
              aria-label="Coupon code"
            />

            <button
              type="button"
              onClick={handleApplyCoupon}
              className={`px-4 py-2 rounded-full text-sm font-medium transition 
        ${
          isSubmitting || isApplyingCoupon
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-lime-500 text-white hover:bg-lime-600 active:scale-[0.98]"
        }`}
              disabled={isSubmitting || isApplyingCoupon}
            >
              {isApplyingCoupon ? "Applying..." : "Apply"}
            </button>
          </div>
        ) : (
          <p className="text-xs sm:text-sm text-lime-700 font-medium">
            Offer discount applied automatically.
          </p>
        )}

        {appliedCoupon && (
          <div className="mt-4 grid grid-cols-3 gap-3 text-xs sm:text-sm">
            <div className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-3 text-center">
              <p className="text-gray-500">Original</p>
              <p className="font-semibold text-gray-800">
                {formatEuro(appliedCoupon.baseAmountEuro)}
              </p>
            </div>

            <div className="rounded-xl border border-lime-200 bg-lime-50 px-3 py-3 text-center">
              <p className="text-gray-500">Discount</p>
              <p className="text-lime-600 font-semibold">
                -{formatEuro(appliedCoupon.discountEuro)}
              </p>
            </div>

            <div className="rounded-xl border border-gray-300 bg-white px-3 py-3 text-center shadow-sm">
              <p className="text-gray-500">To Pay</p>
              <p className="font-bold text-gray-900">
                {formatEuro(appliedCoupon.payableAmountEuro)}
              </p>
            </div>
          </div>
        )}
      </div>

      <button
        type="button"
        className={`mt-4 w-full rounded-xl py-3 text-sm font-semibold transition
    ${
      isSubmitting
        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
        : "bg-black text-white hover:bg-gray-900 active:scale-[0.99]"
    }`}
        onClick={handleClick}
        disabled={isSubmitting}
      >
        {isSubmitting
          ? "Processing..."
          : appliedCoupon
            ? `${label} (${formatEuro(appliedCoupon.payableAmountEuro)})`
            : label}
      </button>

    </>
  );
}

