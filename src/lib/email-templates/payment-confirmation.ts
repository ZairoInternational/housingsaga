import { formatEurAmount } from "@/lib/format-currency";

export type PaymentConfirmationEmailParams = {
  name: string;
  planName: string;
  amountEurocent: number;
  razorpayPaymentId: string;
  razorpayOrderId: string;
  paidAt: Date;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function renderPaymentConfirmationEmail(
  params: PaymentConfirmationEmailParams,
) {
  const safeName = escapeHtml(params.name);
  const safePlanName = escapeHtml(params.planName);

  const amountEur = params.amountEurocent / 100;
  const amountLabel = formatEurAmount(amountEur);

  const subject = "HousingSaga Payment Confirmed";

  const paidAtLabel = params.paidAt.toLocaleString("en-GB", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  const html = `
    <div style="margin:0;padding:0;background:#0b101b;color:#e5e7eb;font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;">
      <div style="max-width:600px;margin:0 auto;padding:28px 18px;">
        <div style="background:#050712;border:1px solid rgba(255,255,255,.08);border-radius:18px;padding:22px;">
          <div style="font-size:12px;letter-spacing:.22em;text-transform:uppercase;color:rgba(163,230,53,.9);font-weight:700;">
            HousingSaga
          </div>
          <h1 style="margin:10px 0 0 0;font-size:22px;line-height:1.2;color:#fff;">
            Payment confirmed for ${safePlanName}
          </h1>
          <p style="margin:12px 0 0 0;font-size:14px;line-height:1.6;color:rgba(229,231,235,.85);">
            Hi ${safeName}, we have received your payment.
          </p>

          <div style="margin-top:18px;padding-top:18px;border-top:1px solid rgba(255,255,255,.08);font-size:13px;color:rgba(229,231,235,.75);line-height:1.7;">
            <div><strong style="color:#fff;font-weight:700;">Amount:</strong> ${amountLabel}</div>
            <div><strong style="color:#fff;font-weight:700;">Order ID:</strong> ${escapeHtml(params.razorpayOrderId)}</div>
            <div><strong style="color:#fff;font-weight:700;">Payment ID:</strong> ${escapeHtml(params.razorpayPaymentId)}</div>
            <div><strong style="color:#fff;font-weight:700;">Paid at:</strong> ${escapeHtml(paidAtLabel)}</div>
          </div>

          <div style="margin-top:18px;padding-top:18px;border-top:1px solid rgba(255,255,255,.08);font-size:12px;color:rgba(229,231,235,.6);">
            If you didn’t make this payment, please contact our support immediately.
          </div>
        </div>
      </div>
    </div>
  `;

  const text = `Payment confirmed for ${params.planName}.\n\nAmount: ${amountLabel}\nOrder ID: ${params.razorpayOrderId}\nPayment ID: ${params.razorpayPaymentId}\nPaid at: ${paidAtLabel}\n\nIf you didn't make this payment, please contact support.`;

  return { subject, html, text };
}

