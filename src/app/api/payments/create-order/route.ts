import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { z } from "zod";

import { connectDb } from "@/lib/db";
import { getRazorpayClient, getRazorpayKeyId } from "@/lib/razorpay";
import { authOptions } from "@/lib/authConfig";
import { Plan } from "@/models/plan";
import { Payment } from "@/models/payment";
import { grantAddressEntitlement } from "@/lib/services/entitlement-service";
import { markPaymentCaptured } from "@/lib/services/payment-service";
import { evaluateCoupon, incrementCouponUsedCount } from "@/lib/services/coupon-service";

function toEurocent(amountEuro: number): number {
  if (!Number.isFinite(amountEuro)) return 0;
  return Math.max(0, Math.round(amountEuro * 100));
}

const createOrderSchema = z.object({
  planSlug: z.string().min(1).max(80),
  addressKey: z.string().min(1).max(1000),
  couponCode: z.string().min(1).max(60).optional(),
});

export async function POST(request: NextRequest) {
  try {
    await connectDb();

    const session = await getServerSession(authOptions);
    const sessionUser = session?.user as { id?: string | null; email?: string | null } | undefined;
    const userId = sessionUser?.id ?? null;
    const userEmail = sessionUser?.email ?? null;

    if (!userId || typeof userId !== "string" || !userEmail) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { planSlug, addressKey, couponCode } = createOrderSchema.parse(body);

    const plan = await Plan.findOne({ slug: planSlug, isActive: true }).lean<{
      _id: { toString(): string };
      slug: string;
      amountEuro?: number;
      amountEurocent?: number;
      currency?: string | null;
    } | null>();
    if (!plan) {
      return Response.json({ error: "Invalid or inactive plan" }, { status: 404 });
    }

    const baseAmountEuro =
      typeof plan.amountEuro === "number"
        ? plan.amountEuro
        : typeof plan.amountEurocent === "number"
          ? plan.amountEurocent / 100
          : NaN;

    if (!Number.isFinite(baseAmountEuro) || baseAmountEuro <= 0) {
      return Response.json({ error: "Invalid plan amount" }, { status: 400 });
    }

    const currency = (plan.currency || "EUR").toString();

    let payableAmountEuro = baseAmountEuro;
    let discountEuro = 0;
    let propertiesAllowedSnapshot = 1;
    let pricePerPropertySnapshot = baseAmountEuro;
    let discountSnapshot:
      | { type: "PER_PROPERTY" | "TOTAL"; unit: "FIXED" | "PERCENT"; value: number }
      | undefined;

    if (typeof couponCode === "string" && couponCode.trim().length > 0) {
      const couponEval = await evaluateCoupon({
        couponCode,
        planSlug,
        planId: plan._id.toString(),
        purchaseAmountEuro: baseAmountEuro,
      });

      if (!couponEval.ok) {
        return Response.json(
          { error: "Invalid coupon", message: couponEval.reason },
          { status: 400 },
        );
      }

      payableAmountEuro = couponEval.payableEuro;
      discountEuro = couponEval.discountEuro;
      propertiesAllowedSnapshot = couponEval.propertiesAllowed;
      pricePerPropertySnapshot = couponEval.pricePerPropertyEuro;
      discountSnapshot = {
        type: couponEval.coupon.offerDiscountScope ?? "TOTAL",
        unit: couponEval.coupon.discountType === "percentage" ? "PERCENT" : "FIXED",
        value: Math.max(0, couponEval.coupon.discountValue),
      };
    }

    // Razorpay requires `receipt` length <= 40 characters.
    // Using the last part of the userId keeps it short and unique enough for our use.
    const receipt = `hs-${userId.slice(-8)}-${Date.now()}`;

    // If coupon makes the payable amount 0, skip Razorpay entirely.
    if (payableAmountEuro <= 0) {
      // Coupon-driven redemption is treated as immediate capture.
      if (typeof couponCode === "string" && couponCode.trim().length > 0) {
        const incRes = await incrementCouponUsedCount({ couponCode });
        if (!incRes.ok) {
          return Response.json(
            { error: "Coupon usage limit reached", message: incRes.reason },
            { status: 400 },
          );
        }
      }

      const freeOrderId = `free-${userId.slice(-8)}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      const payment = await Payment.create({
        userId,
        planId: plan._id.toString(),
        razorpayOrderId: freeOrderId,
        addressKey,
        amountEuro: 0,
        currency,
        couponCode: couponCode?.trim() || undefined,
        status: "created",
        propertiesAllowedSnapshot,
        pricePerPropertySnapshot,
        discountSnapshot,
        entitlementGranted: false,
      });

      // Mark as captured for consistency with other flows.
      await markPaymentCaptured({
        orderId: payment.razorpayOrderId,
        paymentId: `free-${payment.razorpayOrderId}`,
        source: "verify",
      });

      await grantAddressEntitlement({
        paymentId: String(payment._id),
        userId,
        addressKey,
        planSlug,
        paidAt: new Date(),
        propertiesAllowed: propertiesAllowedSnapshot,
      });
      console.info("[HS Payment] entitlement.granted.free", {
        userId,
        paymentId: String(payment._id),
        propertiesAllowed: propertiesAllowedSnapshot,
      });

      return Response.json({
        skipRazorpay: true,
        payableAmountEuro: 0,
        discountEuro,
        currency,
        planSlug,
      });
    }

    const razorpay = getRazorpayClient();
    const payableAmountEurocent = toEurocent(payableAmountEuro);
    const order = await razorpay.orders.create({
      amount: payableAmountEurocent,
      currency,
      receipt,
    });

    const payment = await Payment.create({
      userId,
      planId: plan._id.toString(),
      razorpayOrderId: order.id,
      addressKey,
      amountEuro: payableAmountEuro,
      currency,
      couponCode: couponCode?.trim() || undefined,
      status: "created",
      propertiesAllowedSnapshot,
      pricePerPropertySnapshot,
      discountSnapshot,
      entitlementGranted: false,
    });
    console.info("[HS Payment] order.created", {
      userId,
      paymentId: String(payment._id),
      couponCode: couponCode?.trim() || null,
      propertiesAllowedSnapshot,
    });

    return Response.json({
      orderId: payment.razorpayOrderId,
      amount: payableAmountEurocent,
      payableAmountEuro: payment.amountEuro,
      discountEuro,
      currency: payment.currency,
      keyId: getRazorpayKeyId(),
      planSlug,
    });
  } catch (error) {
    console.error("[CreateOrder] Error:", error);
    return Response.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

