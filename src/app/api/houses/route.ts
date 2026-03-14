import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { connectDb } from "@/lib/db";
import { buildHousePayload } from "@/lib/houseForm";
import { authOptions } from "@/lib/authConfig";

import type { HouseFormData } from "@/store/HouseStore";
import { House } from "../../../models/houseModel";

type SessionUser = {
  id?: string;
};

type Session = {
  user?: SessionUser | null;
};

export async function POST(request: Request) {
  try {
    await connectDb();

    const session = (await getServerSession(authOptions)) as Session | null;

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const raw = (await request.json()) as HouseFormData;

    const parsed = buildHousePayload(raw, session.user.id);

    const created = await House.create(parsed);

    return NextResponse.json(
      {
        success: true,
        house: {
          id: created._id.toString(),
          name: created.name,
          owner: created.owner,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error && "issues" in (error as never)) {
      return NextResponse.json(
        { error: "Validation failed", details: (error as unknown as { issues?: unknown }).issues },
        { status: 400 }
      );
    }

    console.error("[HOUSES][POST] error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}

