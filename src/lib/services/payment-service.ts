import { Payment } from "@/models/payment";

type CaptureInput = {
  orderId: string;
  paymentId: string;
  signature?: string;
  source: "verify" | "webhook";
};

type FailInput = {
  orderId: string;
  reason?: string;
  source: "verify" | "webhook";
};

export async function markPaymentCaptured({
  orderId,
  paymentId,
  signature,
  source,
}: CaptureInput): Promise<{
  payment: (typeof Payment)["prototype"] | null;
  alreadyCaptured: boolean;
}> {
  const payment = await Payment.findOne({ razorpayOrderId: orderId });
  if (!payment) {
    return { payment: null, alreadyCaptured: false };
  }

  if (payment.status === "captured") {
    return { payment, alreadyCaptured: true };
  }

  payment.razorpayPaymentId = paymentId || payment.razorpayPaymentId;
  if (signature) {
    payment.razorpaySignature = signature;
  }
  payment.status = "captured";
  payment.capturedAt = payment.capturedAt ?? new Date();
  payment.verifiedAt = source === "verify" ? new Date() : payment.verifiedAt;
  payment.source = source;
  await payment.save();

  return { payment, alreadyCaptured: false };
}

export async function markPaymentFailed({
  orderId,
  reason,
  source,
}: FailInput): Promise<{
  payment: (typeof Payment)["prototype"] | null;
  alreadyFinalized: boolean;
}> {
  const payment = await Payment.findOne({ razorpayOrderId: orderId });
  if (!payment) {
    return { payment: null, alreadyFinalized: false };
  }

  // Never downgrade captured payment.
  if (payment.status === "captured" || payment.status === "failed") {
    return { payment, alreadyFinalized: true };
  }

  payment.status = "failed";
  payment.failureReason = reason ?? payment.failureReason;
  payment.source = source;
  await payment.save();

  return { payment, alreadyFinalized: false };
}

