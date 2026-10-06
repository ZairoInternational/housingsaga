import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { authOptions } from "@/lib/authConfig";
import { markPropertySoldForOwner } from "@/lib/owner-properties";

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
    const updated = await markPropertySoldForOwner(userId, id);

    if (!updated.ok) {
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
