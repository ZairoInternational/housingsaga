import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { connectDb } from "@/lib/db";
import { buildHousePayload } from "@/lib/houseForm";
import { authOptions } from "@/lib/authConfig";
import { computeAddressKey } from "@/lib/address-key";
import {
  consumeAddressQuotaIfNeeded,
  isAddressPaid,
} from "@/lib/services/entitlement-service";

import type { HouseFormData } from "@/store/HouseStore";
import { House } from "../../../models/houseModel";
import { HousingUsers } from "@/models/housingUser";

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

    const addressKey = computeAddressKey(raw);

    const dbUser = await HousingUsers.findById(session.user.id).lean<{
      role?: string | null;
    } | null>();

    const isOwner = dbUser?.role === "owner";
    if (!isOwner) {
      return NextResponse.json(
        {
          error: "Payment required for this address",
          addressKey,
        },
        { status: 403 },
      );
    }

    const parsed = buildHousePayload(raw, session.user.id);

    // Check entitlement without mutating first. We only convert/consume
    // the quota token after House.create succeeds.
    const hasPaidThisAddress = await isAddressPaid(session.user.id, addressKey);

    if (!hasPaidThisAddress) {
      return NextResponse.json(
        {
          error: "Payment required for this address",
          addressKey,
        },
        { status: 403 },
      );
    }

    const created = await House.create(parsed);

    // Convert the "first address quota" token into the real addressKey
    // only after the listing was successfully created.
    await consumeAddressQuotaIfNeeded({
      userId: session.user.id,
      addressKey,
    });

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
    const maybeZod = error as { issues?: unknown };
    if (maybeZod && Array.isArray(maybeZod.issues)) {
      return NextResponse.json(
        { error: "Validation failed", details: maybeZod.issues },
        { status: 400 },
      );
    }

    // Mongoose ValidationError:
    // - name === "ValidationError"
    // - errors is a map: { [field]: { message: string, ... } }
    const maybeMongoose = error as {
      name?: string;
      errors?: Record<string, { message?: string }>;
    };

    if (maybeMongoose?.name === "ValidationError" && maybeMongoose.errors) {
      const details = Object.values(maybeMongoose.errors).map((e) => ({
        message: e.message ?? "Validation failed",
      }));

      return NextResponse.json(
        { error: "Validation failed", details },
        { status: 400 },
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

