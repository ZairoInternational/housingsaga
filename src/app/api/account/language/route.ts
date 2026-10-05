import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { isLocale } from "@/i18n/config";
import { authOptions } from "@/lib/authConfig";
import { connectDb } from "@/lib/db";
import { HousingUsers } from "@/models/housingUser";

export async function PATCH(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) {
    return NextResponse.json({ error: "Sign in to save your language." }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as { locale?: string } | null;
  if (!isLocale(body?.locale)) {
    return NextResponse.json({ error: "Choose English or Greek." }, { status: 400 });
  }

  await connectDb();
  const user = await HousingUsers.findByIdAndUpdate(
    userId,
    { preferredLanguage: body.locale },
    { new: true },
  ).select({ preferredLanguage: 1 });

  if (!user) {
    return NextResponse.json({ error: "Account not found." }, { status: 404 });
  }

  return NextResponse.json({ preferredLanguage: user.preferredLanguage });
}
