import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/authConfig";
import { connectDb } from "@/lib/db";
import { HousingUsers } from "@/models/housingUser";

export async function PATCH(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) {
    return NextResponse.json({ error: "Sign in to edit your profile." }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as {
    name?: string;
    phone?: string | null;
  } | null;

  const name = body?.name?.trim() ?? "";
  if (name.length < 3) {
    return NextResponse.json(
      { error: "Name must be at least 3 characters." },
      { status: 400 },
    );
  }

  const phoneRaw = typeof body?.phone === "string" ? body.phone.trim() : "";
  const phone = phoneRaw.length > 0 ? phoneRaw : null;

  await connectDb();
  const user = await HousingUsers.findByIdAndUpdate(
    userId,
    { name, phone },
    { new: true },
  ).select({ name: 1, phone: 1, email: 1 });

  if (!user) {
    return NextResponse.json({ error: "Account not found." }, { status: 404 });
  }

  return NextResponse.json({
    name: user.name,
    phone: user.phone,
    email: user.email,
  });
}
