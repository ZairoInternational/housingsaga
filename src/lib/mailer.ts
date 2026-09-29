import nodemailer from "nodemailer";

export type SendEmailInput = {
  to: string;
  subject: string;
  html: string;
  text?: string;
};

export class MailerConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MailerConfigError";
  }
}

export class MailerSendError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MailerSendError";
  }
}

function getSmtpConfig() {
  const host = process.env.SMTP_HOST?.trim();
  const portRaw = process.env.SMTP_PORT?.trim();
  const user = process.env.SMTP_USER?.trim();
  // Gmail app passwords are often pasted with spaces — strip them.
  const pass = process.env.SMTP_PASS?.trim().replace(/\s+/g, "");
  const from = process.env.SMTP_FROM?.trim();

  const port = portRaw ? Number(portRaw) : undefined;

  return { host, port, user, pass, from };
}

function isSmtpConfigured(config: ReturnType<typeof getSmtpConfig>) {
  return Boolean(
    config.host &&
      config.port &&
      Number.isFinite(config.port) &&
      config.user &&
      config.pass &&
      config.from,
  );
}

export async function sendEmail(input: SendEmailInput) {
  const config = getSmtpConfig();

  if (!isSmtpConfigured(config)) {
    throw new MailerConfigError(
      "SMTP is not configured (missing SMTP_HOST/PORT/USER/PASS/FROM).",
    );
  }

  if (!config.host!.includes(".")) {
    throw new MailerConfigError(
      `SMTP_HOST looks invalid: "${config.host}". Use e.g. smtp.gmail.com or smtp.office365.com`,
    );
  }

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.port === 465,
    requireTLS: config.port === 587,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });

  try {
    await transporter.sendMail({
      from: config.from,
      to: input.to,
      subject: input.subject,
      html: input.html,
      text: input.text,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown SMTP send failure";
    console.error("[MAILER] sendMail failed:", message);
    throw new MailerSendError(message);
  }
}
