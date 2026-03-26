import crypto from "crypto";
import { NextRequest } from "next/server";

import { connectDb } from "@/lib/db";
import { getRazorpayWebhookSecret } from "@/lib/razorpay";
import { Plan } from "@/models/plan";
import { grantAddressEntitlement } from "@/lib/services/entitlement-service";
import { markPaymentCaptured, markPaymentFailed } from "@/lib/services/payment-service";

type RazorpayWebhookPayload = {
  event?: string;
  payload?: {
    payment?: {
      entity?: {
        id?: string;
        order_id?: string;
        status?: string;
      };
    };
  };
};

export async function POST(request: NextRequest) {
  try {
    await connectDb();

    const rawBody = await request.text();

    const signatureHeader =
      request.headers.get("x-razorpay-signature") ??
      request.headers.get("X-Razorpay-Signature") ??
      "";

    const secret = getRazorpayWebhookSecret();

    const expected = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");
    if (!signatureHeader || expected.toLowerCase() !== signatureHeader.toLowerCase()) {
      console.error("[Razorpay Webhook] Signature mismatch");
      return Response.json({ ok: true }, { status: 200 });
    }

    const parsed = JSON.parse(rawBody) as RazorpayWebhookPayload;
    const eventName = parsed.event;

    if (eventName !== "payment.captured" && eventName !== "payment.failed") {
      return Response.json({ ok: true }, { status: 200 });
    }

    const entity = parsed.payload?.payment?.entity;
    const razorpayPaymentId = entity?.id ?? "";
    const razorpayOrderId = entity?.order_id ?? "";

    if (!razorpayOrderId) {
      return Response.json({ ok: true }, { status: 200 });
    }

    if (eventName === "payment.captured") {
      const captureResult = await markPaymentCaptured({
        orderId: razorpayOrderId,
        paymentId: razorpayPaymentId,
        source: "webhook",
      });
      if (!captureResult.payment || captureResult.alreadyCaptured) {
        return Response.json({ ok: true }, { status: 200 });
      }

      const plan = await Plan.findById(captureResult.payment.planId);
      const planSlug = plan?.slug ?? null;

      if (planSlug) {
        await grantAddressEntitlement({
          userId: captureResult.payment.userId,
          addressKey: captureResult.payment.addressKey,
          planSlug,
          paidAt: captureResult.payment.capturedAt ?? new Date(),
        });
      }
    } else {
      await markPaymentFailed({
        orderId: razorpayOrderId,
        reason: entity?.status ?? "payment_failed",
        source: "webhook",
      });
    }
  } catch (error) {
    console.error("[Razorpay Webhook] Error:", error);
    // Per spec: always return 200 so Razorpay doesn’t retry indefinitely.
    return Response.json({ ok: true }, { status: 200 });
  }

  return Response.json({ ok: true }, { status: 200 });
}

