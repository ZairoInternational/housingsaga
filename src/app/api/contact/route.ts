import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";

import { sendEmail } from "@/lib/mailer";
import { renderContactEmail } from "@/lib/email-templates/contact";

const contactBodySchema = z.object({
  name: z.string().min(1, "Name is required").max(120),
  email: z.string().email("Valid email is required").max(200),
  phone: z.string().optional().nullable(),
  subject: z.string().optional().nullable(),
  message: z.string().min(1, "Message is required").max(5000),
});

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as unknown;
    const parsed = contactBodySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const recipient =
      process.env.CONTACT_RECIPIENT_EMAIL ?? "no-reply@housingsaga.com";

    const { subject, html, text } = renderContactEmail(parsed.data);

    await sendEmail({
      to: recipient,
      subject,
      html,
      text,
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("[CONTACT][POST] error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

