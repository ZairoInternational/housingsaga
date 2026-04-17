import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { z } from "zod";

import { authOptions } from "@/lib/authConfig";
import { connectDb } from "@/lib/db";
import { getRazorpayKeySecret } from "@/lib/razorpay";
import { isValidRazorpayPaymentSignature } from "@/lib/razorpay-signature";
import { renderPaymentConfirmationEmail } from "@/lib/email-templates/payment-confirmation";
import { sendEmail } from "@/lib/mailer";
import { HousingUsers } from "@/models/housingUser";
import { Plan } from "@/models/plan";
import { Payment } from "@/models/payment";
import { grantAddressEntitlement } from "@/lib/services/entitlement-service";
import { markPaymentCaptured } from "@/lib/services/payment-service";
import { incrementCouponUsedCount } from "@/lib/services/coupon-service";

const verifySchema = z.object({
  razorpay_payment_id: z.string().min(1),
  razorpay_order_id: z.string().min(1),
  razorpay_signature: z.string().min(1),
});

export async function POST(request: NextRequest) {
  try {
    await connectDb();

    const session = await getServerSession(authOptions);
    const sessionUser = session?.user as { id?: string | null; email?: string | null } | undefined;
    const userId = sessionUser?.id ?? null;
    const sessionEmail = sessionUser?.email ?? null;

    if (!userId || typeof userId !== "string" || !sessionEmail) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { razorpay_order_id: orderId, razorpay_payment_id: paymentId, razorpay_signature: signature } =
      verifySchema.parse(body);

    const secret = getRazorpayKeySecret();

    if (!isValidRazorpayPaymentSignature(orderId, paymentId, signature, secret)) {
      return Response.json({ error: "Invalid payment signature" }, { status: 400 });
    }

    const payment = await Payment.findOne({ razorpayOrderId: orderId, userId });
    if (!payment) {
      return Response.json({ error: "Payment not found" }, { status: 404 });
    }

    const captureResult = await markPaymentCaptured({
      orderId,
      paymentId,
      signature,
      source: "verify",
    });
    if (!captureResult.payment) {
      return Response.json({ error: "Payment not found" }, { status: 404 });
    }
    if (captureResult.alreadyCaptured) {
      return Response.json({ ok: true });
    }

    const capturedAt = captureResult.payment.capturedAt ?? new Date();

    // Best-effort: increment coupon usage only for first-time captures.
    if (captureResult.payment.couponCode) {
      void incrementCouponUsedCount({
        couponCode: captureResult.payment.couponCode,
      });
    }

    const plan = await Plan.findById(captureResult.payment.planId);
    const planSlug = plan?.slug ?? null;
    const planName = plan?.name ?? "Property Listing Fee";

    await grantAddressEntitlement({
      paymentId: String(captureResult.payment._id),
      userId,
      addressKey: captureResult.payment.addressKey,
      planSlug,
      paidAt: capturedAt,
      propertiesAllowed: captureResult.payment.propertiesAllowedSnapshot,
    });
    console.info("[HS Payment] entitlement.granted.verify", {
      userId,
      paymentId: String(captureResult.payment._id),
      propertiesAllowed: captureResult.payment.propertiesAllowedSnapshot,
    });

    // Best-effort confirmation email. Do not fail the payment if SMTP is down.
    try {
      const user = await HousingUsers.findById(userId);
      const to = user?.email ?? sessionEmail;
      const { subject, html, text } = renderPaymentConfirmationEmail({
        name: user?.name ?? "there",
        planName,
        amountEuro: captureResult.payment.amountEuro,
        razorpayPaymentId: paymentId,
        razorpayOrderId: orderId,
        paidAt: capturedAt,
      });
      await sendEmail({ to, subject, html, text });
    } catch (emailError) {
      console.error("[Verify] Email send failed:", emailError);
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error("[Verify] Error:", error);
    return Response.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

