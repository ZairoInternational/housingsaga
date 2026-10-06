export type OwnerAccessEmailParams = {
  name: string;
  accessUrl: string;
  pin: string;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function renderOwnerAccessEmail(params: OwnerAccessEmailParams) {
  const safeName = escapeHtml(params.name.trim() || "there");
  const safeUrl = escapeHtml(params.accessUrl);
  const safePin = escapeHtml(params.pin);

  const subject = "Access your HousingSaga properties";

  const html = `
  <div style="margin:0;padding:0;background:#0b101b;color:#e5e7eb;font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;">
    <div style="max-width:600px;margin:0 auto;padding:28px 18px;">
      <div style="background:#050712;border:1px solid rgba(255,255,255,.08);border-radius:18px;padding:22px;">
        <div style="font-size:12px;letter-spacing:.22em;text-transform:uppercase;color:rgba(163,230,53,.9);font-weight:700;">
          HousingSaga
        </div>
        <h1 style="margin:10px 0 0 0;font-size:22px;line-height:1.2;color:#fff;">
          Manage your properties
        </h1>
        <p style="margin:12px 0 0 0;font-size:14px;line-height:1.6;color:rgba(229,231,235,.8);">
          Hello ${safeName}, use the private link below to view your listings and mark a property as sold. This does not use your HousingSaga password.
        </p>
        <p style="margin:18px 0 0 0;">
          <a href="${safeUrl}" style="display:inline-block;background:#a3e635;color:#111827;text-decoration:none;font-weight:700;font-size:14px;padding:12px 18px;border-radius:999px;">
            Access My Properties
          </a>
        </p>
        <p style="margin:18px 0 0 0;font-size:14px;line-height:1.6;color:rgba(229,231,235,.8);">
          Your temporary PIN is
          <strong style="letter-spacing:.28em;color:#fff;">${safePin}</strong>.
          The first time you open the link, choose your own PIN.
        </p>
        <p style="margin:12px 0 0 0;font-size:12px;line-height:1.6;color:rgba(229,231,235,.6);word-break:break-all;">
          ${safeUrl}
        </p>
        <div style="margin-top:18px;padding-top:18px;border-top:1px solid rgba(255,255,255,.08);font-size:12px;color:rgba(229,231,235,.6);">
          If you didn’t request this link, you can ignore this email.
        </div>
      </div>
    </div>
  </div>`;

  const text = `Hello ${params.name},\n\nAccess My Properties:\n${params.accessUrl}\n\nYour temporary PIN is ${params.pin}.\nThe first time you open the link, choose your own PIN.\n\nIf you didn’t request this link, you can ignore this email.`;

  return { subject, html, text };
}
