import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { authOptions } from "@/lib/authConfig";
import { connectDb } from "@/lib/db";
import { House } from "@/models/houseModel";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function POST(_request: Request, context: RouteContext) {
  try {
    const session = await getServerSession(authOptions);
    const userId = (session?.user as { id?: string } | undefined)?.id;

    if (!userId) {
      return NextResponse.json(
        { error: "Sign in to update this listing." },
        { status: 401 },
      );
    }

    const { id } = await context.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Listing not found." }, { status: 404 });
    }

    await connectDb();
    const updated = await House.findOneAndUpdate(
      { _id: id, owner: userId },
      { $set: { isSold: true, isAvailable: false, isActive: false } },
      { new: true, projection: { isSold: 1 } },
    );

    if (!updated) {
      return NextResponse.json({ error: "Listing not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, sold: true });
  } catch (error) {
    console.error("[HOUSES][SOLD] error:", error);
    return NextResponse.json(
      { error: "Could not mark this listing as sold." },
      { status: 500 },
    );
  }
}
