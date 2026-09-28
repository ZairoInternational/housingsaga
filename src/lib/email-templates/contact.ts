export type ContactEmailParams = {
  name: string;
  email?: string | null;
  phone?: string | null;
  subject?: string | null;
  message: string;
  requestType?: "contact" | "callback";
  preferredDate?: string | null;
  preferredWindow?: string | null;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function renderContactEmail(params: ContactEmailParams) {
  const isCallback = params.requestType === "callback";
  const safeName = escapeHtml(params.name);
  const safeEmail = escapeHtml(params.email ?? "");
  const safePhone = escapeHtml(params.phone ?? "");
  const safeMessage = escapeHtml(params.message);
  const safeSubject = escapeHtml(params.subject?.trim() || "");
  const safeDate = escapeHtml(params.preferredDate ?? "");
  const safeWindow = escapeHtml(params.preferredWindow ?? "");

  const subject = isCallback
    ? `Callback request: ${params.preferredDate ?? "TBD"} · ${params.preferredWindow ?? "TBD"}`
    : safeSubject
      ? `New Contact Message: ${safeSubject}`
      : "New Contact Message";

  const html = `
  <div style="margin:0;padding:0;background:#0b101b;color:#e5e7eb;font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;">
    <div style="max-width:720px;margin:0 auto;padding:28px 18px;">
      <div style="background:#050712;border:1px solid rgba(255,255,255,.08);border-radius:18px;padding:22px;">
        <div style="font-size:12px;letter-spacing:.22em;text-transform:uppercase;color:rgba(163,230,53,.9);font-weight:700;">
          HousingSaga ${isCallback ? "Callback" : "Contact"}
        </div>

        <h1 style="margin:10px 0 0 0;font-size:20px;line-height:1.2;color:#fff;">
          ${isCallback ? "Callback window request" : safeSubject ? safeSubject : "Contact request"}
        </h1>

        <div style="margin-top:16px;padding-top:16px;border-top:1px solid rgba(255,255,255,.08);font-size:14px;line-height:1.7;color:rgba(229,231,235,.9);">
          <p style="margin:0 0 8px 0;"><strong style="color:#fff;">From:</strong> ${safeName}${
            safeEmail ? ` (${safeEmail})` : ""
          }</p>
          ${
            safePhone
              ? `<p style="margin:0 0 8px 0;"><strong style="color:#fff;">Phone:</strong> ${safePhone}</p>`
              : ""
          }
          ${
            isCallback
              ? `<p style="margin:0 0 8px 0;"><strong style="color:#fff;">Preferred date:</strong> ${safeDate}</p>
                 <p style="margin:0 0 8px 0;"><strong style="color:#fff;">Time window:</strong> ${safeWindow}</p>`
              : ""
          }
          <p style="margin:0;"><strong style="color:#fff;">Message:</strong></p>
          <p style="margin:8px 0 0 0;white-space:pre-wrap;">${safeMessage}</p>
        </div>
      </div>
    </div>
  </div>
  `;

  const text = isCallback
    ? `Callback request\n\nFrom: ${params.name}${
        params.email ? ` <${params.email}>` : ""
      }\nPhone: ${params.phone ?? "(not provided)"}\nPreferred date: ${
        params.preferredDate ?? "(not provided)"
      }\nTime window: ${params.preferredWindow ?? "(not provided)"}\n\nMessage:\n${params.message}`
    : `New Contact Message\n\nSubject: ${params.subject ?? "(not provided)"}\nFrom: ${params.name} <${params.email ?? ""}>${
        params.phone ? `\nPhone: ${params.phone}` : ""
      }\n\nMessage:\n${params.message}`;

  return { subject, html, text };
}
