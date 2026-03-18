export type WelcomeEmailParams = {
  name: string;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function renderWelcomeEmail(params: WelcomeEmailParams) {
  const safeName = escapeHtml(params.name);

  const subject = "Welcome to HousingSaga";

  const html = `
  <div style="margin:0;padding:0;background:#0b101b;color:#e5e7eb;font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;">
    <div style="max-width:600px;margin:0 auto;padding:28px 18px;">
      <div style="background:#050712;border:1px solid rgba(255,255,255,.08);border-radius:18px;padding:22px;">
        <div style="font-size:12px;letter-spacing:.22em;text-transform:uppercase;color:rgba(163,230,53,.9);font-weight:700;">
          HousingSaga
        </div>
        <h1 style="margin:10px 0 0 0;font-size:22px;line-height:1.2;color:#fff;">
          Welcome, ${safeName}
        </h1>
        <p style="margin:12px 0 0 0;font-size:14px;line-height:1.6;color:rgba(229,231,235,.8);">
          Your account has been created successfully. You can now sign in and start listing properties, saving favourites, and exploring recommendations.
        </p>
        <div style="margin-top:18px;padding-top:18px;border-top:1px solid rgba(255,255,255,.08);font-size:12px;color:rgba(229,231,235,.6);">
          If you didn’t create this account, please ignore this email.
        </div>
      </div>
    </div>
  </div>`;

  const text = `Welcome to HousingSaga, ${params.name}.\n\nYour account has been created successfully. You can now sign in and get started.\n\nIf you didn’t create this account, please ignore this email.`;

  return { subject, html, text };
}

