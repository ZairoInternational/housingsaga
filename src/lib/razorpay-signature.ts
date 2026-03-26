import crypto from "crypto";

export function computeRazorpayPaymentSignature(
  orderId: string,
  paymentId: string,
  secret: string,
): string {
  return crypto
    .createHmac("sha256", secret)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");
}

export function isValidRazorpayPaymentSignature(
  orderId: string,
  paymentId: string,
  signature: string,
  secret: string,
): boolean {
  const expected = computeRazorpayPaymentSignature(orderId, paymentId, secret);
  return expected.toLowerCase() === signature.toLowerCase();
}

