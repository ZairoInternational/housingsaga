import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";

import {
  MailerConfigError,
  MailerSendError,
  sendEmail,
} from "@/lib/mailer";
import { renderContactEmail } from "@/lib/email-templates/contact";

const contactBodySchema = z
  .object({
    name: z.string().min(1, "Name is required").max(120),
    email: z.preprocess(
      (value) =>
        typeof value === "string" && value.trim() === "" ? null : value,
      z.string().email("Valid email is required").max(200).nullable().optional(),
    ),
    phone: z.string().optional().nullable(),
    subject: z.string().optional().nullable(),
    message: z.string().min(1, "Message is required").max(5000),
    requestType: z.enum(["contact", "callback"]).optional().default("contact"),
    preferredDate: z.string().optional().nullable(),
    preferredWindow: z.string().optional().nullable(),
    reason: z.string().trim().min(1).max(200).optional().nullable(),
  })
  .superRefine((data, ctx) => {
    if (data.requestType === "callback") {
      if (!data.phone?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Phone is required for callback requests",
          path: ["phone"],
        });
      }
      if (!data.preferredDate?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Preferred date is required",
          path: ["preferredDate"],
        });
      }
      if (!data.preferredWindow?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Preferred time window is required",
          path: ["preferredWindow"],
        });
      }
      if (!data.reason?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Reason is required for callback requests",
          path: ["reason"],
        });
      }
      return;
    }

    if (!data.email?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Valid email is required",
        path: ["email"],
      });
    }
  });

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as unknown;
    const parsed = contactBodySchema.safeParse(body);

    if (!parsed.success) {
      const flat = parsed.error.flatten();
      const fieldMessages = Object.entries(flat.fieldErrors).flatMap(
        ([field, messages]) =>
          (messages ?? []).map((message) => `${field}: ${message}`),
      );
      const formMessages = flat.formErrors ?? [];
      const details = [...formMessages, ...fieldMessages].join("; ");

      return NextResponse.json(
        {
          error: details || "Validation failed",
          details: details || "Validation failed",
        },
        { status: 400 },
      );
    }

    const recipient =
      process.env.CONTACT_RECIPIENT_EMAIL ?? "no-reply@housingsaga.com";

    const { subject, html, text } = renderContactEmail({
      ...parsed.data,
      email: parsed.data.email ?? null,
    });

    await sendEmail({
      to: recipient,
      subject,
      html,
      text,
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("[CONTACT][POST] error:", error);

    if (error instanceof MailerConfigError) {
      return NextResponse.json(
        {
          error:
            "Email service is not configured correctly. Please try again later.",
          details:
            process.env.NODE_ENV === "development" ? error.message : undefined,
        },
        { status: 503 },
      );
    }

    if (error instanceof MailerSendError) {
      return NextResponse.json(
        {
          error: "Failed to send email. Please try again later.",
          details:
            process.env.NODE_ENV === "development" ? error.message : undefined,
        },
        { status: 502 },
      );
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
