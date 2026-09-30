import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/authConfig";
import { connectDb } from "@/lib/db";
import { House } from "@/models/houseModel";
import { HousingUsers } from "@/models/housingUser";

async function currentUserId() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string } | undefined)?.id;
  return userId ?? null;
}

export async function GET() {
  const userId = await currentUserId();
  if (!userId) {
    return NextResponse.json({ ids: [] });
  }

  await connectDb();
  const user = await HousingUsers.findById(userId)
    .select({ savedPropertyIds: 1 })
    .lean<{ savedPropertyIds?: string[] } | null>();

  return NextResponse.json({ ids: user?.savedPropertyIds ?? [] });
}

export async function POST(request: NextRequest) {
  const userId = await currentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Sign in to save homes." }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as { propertyId?: string } | null;
  const propertyId = body?.propertyId?.trim() ?? "";
  if (!mongoose.isValidObjectId(propertyId)) {
    return NextResponse.json({ error: "Invalid property." }, { status: 400 });
  }

  await connectDb();
  const house = await House.findById(propertyId).select({ _id: 1 }).lean();
  if (!house) {
    return NextResponse.json({ error: "Property not found." }, { status: 404 });
  }

  const user = await HousingUsers.findById(userId);
  if (!user) {
    return NextResponse.json({ error: "Account not found." }, { status: 404 });
  }

  const current = new Set((user.savedPropertyIds ?? []).map(String));
  const saved = !current.has(propertyId);
  if (saved) current.add(propertyId);
  else current.delete(propertyId);

  user.savedPropertyIds = [...current];
  await user.save();

  return NextResponse.json({ saved, ids: [...current] });
}
