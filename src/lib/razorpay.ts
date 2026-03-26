import Razorpay from "razorpay";

let client: Razorpay | null = null;

function getFirstEnv(...names: string[]): string | undefined {
  for (const name of names) {
    const v = process.env[name];
    if (v) return v;
  }
  return undefined;
}

export function getRazorpayClient(): Razorpay {
  if (client) return client;

  const keyId = getFirstEnv(
    "RAZORPAY_KEY_ID",
    "RZP_KEY_ID",
    "RAZORPAY_API_KEY",
  );
  const keySecret = getFirstEnv(
    "RAZORPAY_KEY_SECRET",
    "RZP_KEY_SECRET",
    "RAZORPAY_API_SECRET",
  );

  if (!keyId || !keySecret) {
    throw new Error("Razorpay is not configured (missing RAZORPAY_KEY_ID/RAZORPAY_KEY_SECRET).");
  }

  client = new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
  });

  return client;
}

export function getRazorpayKeyId(): string {
  const keyId = getFirstEnv("RAZORPAY_KEY_ID", "RZP_KEY_ID", "RAZORPAY_API_KEY");
  if (!keyId) throw new Error("Missing RAZORPAY_KEY_ID");
  return keyId;
}

export function getRazorpayKeySecret(): string {
  const keySecret = getFirstEnv(
    "RAZORPAY_KEY_SECRET",
    "RZP_KEY_SECRET",
    "RAZORPAY_API_SECRET",
  );
  if (!keySecret) throw new Error("Missing RAZORPAY_KEY_SECRET");
  return keySecret;
}

export function getRazorpayWebhookSecret(): string {
  const webhookSecret = getFirstEnv("RAZORPAY_WEBHOOK_SECRET", "RZP_WEBHOOK_SECRET");
  if (!webhookSecret) throw new Error("Missing RAZORPAY_WEBHOOK_SECRET");
  return webhookSecret;
}

