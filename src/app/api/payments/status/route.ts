import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { authOptions } from "@/lib/authConfig";
import { connectDb } from "@/lib/db";
import { isAddressPaid } from "@/lib/services/entitlement-service";

const statusQuerySchema = z.object({
  addressKey: z.string().min(1).max(500),
});

export async function GET(request: NextRequest) {
  try {
    await connectDb();

    const session = await getServerSession(authOptions);
    const userId = (session?.user as { id?: string } | undefined)?.id;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const parsed = statusQuerySchema.safeParse({
      addressKey: request.nextUrl.searchParams.get("addressKey") ?? "",
    });

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const { addressKey } = parsed.data;

    const paid = await isAddressPaid(userId, addressKey);

    return NextResponse.json({ paid, addressKey }, { status: 200 });
  } catch (error) {
    console.error("[PAYMENTS][STATUS] error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

