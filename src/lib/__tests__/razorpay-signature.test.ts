import test from "node:test";
import assert from "node:assert/strict";

import {
  computeRazorpayPaymentSignature,
  isValidRazorpayPaymentSignature,
} from "@/lib/razorpay-signature";

test("computeRazorpayPaymentSignature returns deterministic hmac", () => {
  const sig1 = computeRazorpayPaymentSignature("order_123", "pay_456", "secret");
  const sig2 = computeRazorpayPaymentSignature("order_123", "pay_456", "secret");
  assert.equal(sig1, sig2);
});

test("isValidRazorpayPaymentSignature validates correct signature", () => {
  const signature = computeRazorpayPaymentSignature(
    "order_123",
    "pay_456",
    "secret",
  );
  const valid = isValidRazorpayPaymentSignature(
    "order_123",
    "pay_456",
    signature,
    "secret",
  );
  assert.equal(valid, true);
});

test("isValidRazorpayPaymentSignature rejects incorrect signature", () => {
  const valid = isValidRazorpayPaymentSignature(
    "order_123",
    "pay_456",
    "wrong-signature",
    "secret",
  );
  assert.equal(valid, false);
});

