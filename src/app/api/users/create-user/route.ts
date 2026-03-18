import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { connectDb } from "@/lib/db";
import { sendEmail } from "@/lib/mailer";
import { renderWelcomeEmail } from "@/lib/email-templates/welcome";
import { HousingUsers } from "@/models/housingUser";

connectDb();

const createUserBodySchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  phone: z
    .union([z.string(), z.number()])
    .transform((v) => (v === null || v === undefined ? null : String(v)))
    .nullable()
    .optional()
    .refine(
      (v) => {
        if (v === null || v === undefined || v.trim() === "") return true;
        // react-phone-input-2 returns digits (no +). Allow 7-15 digits.
        return /^\d{7,15}$/.test(v);
      },
      { message: "Invalid phone number" }
    ),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
});

export async function POST(req: NextRequest) {
  const reqBody = await req.json();

  try {
    const parsed = createUserBodySchema.safeParse(reqBody);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { name, phone, email, password, confirmPassword } = parsed.data;

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: "Password does not match" },
        { status: 400 }
      );
    }

    const isUserAlreadyPresent = await HousingUsers.findOne({ email });
    if (isUserAlreadyPresent) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await HousingUsers.create({
      name,
      email,
      phone: phone && phone.trim() ? phone : null,
      password: hashedPassword,
    });
    user.save();

    try {
      const { subject, html, text } = renderWelcomeEmail({ name });
      await sendEmail({ to: email, subject, html, text });
    } catch (mailErr) {
      console.error("[MAILER][WELCOME] failed:", mailErr);
    }

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (err) {
    console.error("create-user error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 400 });
  }
}
