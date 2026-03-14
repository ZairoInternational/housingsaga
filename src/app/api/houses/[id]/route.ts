import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { authOptions } from "@/lib/authConfig";
import { connectDb } from "@/lib/db";
import {
  buildHousePayload,
  toHouseFormData,
  type HouseForForm,
} from "@/lib/houseForm";
import type { HouseFormData } from "@/store/HouseStore";
import { House } from "../../../../models/houseModel";

type SessionUser = {
  id?: string;
};

type Session = {
  user?: SessionUser | null;
};

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

async function getAuthorizedSession() {
  const session = (await getServerSession(authOptions)) as Session | null;

  if (!session?.user?.id) {
    return null;
  }

  return session;
}

export async function GET(_request: Request, context: RouteContext) {
  try {
    await connectDb();

    const session = await getAuthorizedSession();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;
    const house = await House.findOne({ _id: id, owner: session.user.id }).lean<HouseForForm | null>();

    if (!house) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        success: true,
        house,
        formData: toHouseFormData(house),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[HOUSES][GET_BY_ID] error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(request: Request, context: RouteContext) {
  try {
    await connectDb();

    const session = await getAuthorizedSession();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;
    const existingHouse = await House.findOne({ _id: id, owner: session.user.id });

    if (!existingHouse) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    const raw = (await request.json()) as HouseFormData;
    const parsed = buildHousePayload(raw, session.user.id);

    const updated = await House.findByIdAndUpdate(id, parsed, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        success: true,
        house: {
          id: updated._id.toString(),
          name: updated.name,
          owner: updated.owner,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error && "issues" in (error as never)) {
      return NextResponse.json(
        { error: "Validation failed", details: (error as { issues?: unknown }).issues },
        { status: 400 }
      );
    }

    console.error("[HOUSES][PATCH] error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

