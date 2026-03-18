import nodemailer from "nodemailer";

export type SendEmailInput = {
  to: string;
  subject: string;
  html: string;
  text?: string;
};

function getSmtpConfig() {
  const host = process.env.SMTP_HOST;
  const portRaw = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM;

  const port = portRaw ? Number(portRaw) : undefined;

  return { host, port, user, pass, from };
}

function isSmtpConfigured(config: ReturnType<typeof getSmtpConfig>) {
  return Boolean(
    config.host && config.port && Number.isFinite(config.port) && config.user && config.pass && config.from
  );
}

export async function sendEmail(input: SendEmailInput) {
  const config = getSmtpConfig();

  if (!isSmtpConfigured(config)) {
    throw new Error("SMTP is not configured (missing SMTP_* env vars).");
  }

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.port === 465,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });

  await transporter.sendMail({
    from: config.from,
    to: input.to,
    subject: input.subject,
    html: input.html,
    text: input.text,
  });
}

