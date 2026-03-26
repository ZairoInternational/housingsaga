import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { connectDb } from "@/lib/db";
import { Plan } from "@/models/plan";

const seedPlanRequestSchema = z.object({
  planSlug: z.string().min(1).default("property-listing"),
});

async function seedPlan(planSlug: string) {
  await connectDb();

  await Plan.findOneAndUpdate(
    { slug: planSlug },
    {
      $set: {
        slug: planSlug,
        name: "Property Listing Fee",
        description: "One-time fee to list a property on HousingSaga.",
        amountEurocent: 20000,
        currency: "EUR",
        isActive: true,
        features: [
          "Property onboarding and verification",
          "Professional positioning for international investors",
          "Exposure to a network of serious Golden Visa and global buyers",
        ],
      },
    },
    { upsert: true, new: true },
  );
}

export async function POST(request: NextRequest) {
  // Safety: only allow seeding in dev by default.
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json(
      { error: "Seeding is disabled outside development" },
      { status: 403 },
    );
  }

  const body = await request.json().catch(() => ({}));
  const parsed = seedPlanRequestSchema.safeParse(body);

  const planSlug = parsed.success ? parsed.data.planSlug : "property-listing";

  await seedPlan(planSlug);

  return NextResponse.json({ ok: true, planSlug }, { status: 200 });
}

export async function GET() {
  // Simple one-shot for dev. Uses defaults from the plan.
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json(
      { error: "Seeding is disabled outside development" },
      { status: 403 },
    );
  }

  const planSlug = "property-listing";
  await seedPlan(planSlug);
  return NextResponse.json({ ok: true, planSlug }, { status: 200 });
}

