import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { z } from "zod";

import { authOptions } from "@/lib/authConfig";
import { connectDb } from "@/lib/db";
import { Plan } from "@/models/plan";
import { evaluateCoupon } from "@/lib/services/coupon-service";

const evaluateSchema = z.object({
  planSlug: z.string().min(1).max(80),
  couponCode: z.string().min(1).max(60),
});

export async function POST(request: NextRequest) {
  try {
    await connectDb();

    const session = await getServerSession(authOptions);
    const sessionUser = session?.user as { id?: string | null } | undefined;
    const userId = sessionUser?.id ?? null;

    if (!userId || typeof userId !== "string") {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { planSlug, couponCode } = evaluateSchema.parse(body);

    const plan = await Plan.findOne({ slug: planSlug, isActive: true }).lean<{
      _id: { toString(): string };
      slug: string;
      amountEuro?: number;
      amountEurocent?: number;
      currency?: string | null;
    } | null>();

    if (!plan) {
      return Response.json({ error: "Invalid or inactive plan" }, { status: 404 });
    }

    const amountEuroRaw =
      typeof plan.amountEuro === "number"
        ? plan.amountEuro
        : typeof plan.amountEurocent === "number"
          ? plan.amountEurocent / 100
          : NaN;

    if (!Number.isFinite(amountEuroRaw) || amountEuroRaw < 0) {
      return Response.json({ error: "Invalid plan amount" }, { status: 400 });
    }

    const couponEval = await evaluateCoupon({
      couponCode,
      planSlug: plan.slug,
      planId: plan._id.toString(),
      purchaseAmountEuro: amountEuroRaw,
    });

    if (!couponEval.ok) {
      return Response.json(
        { error: "Invalid coupon", message: couponEval.reason },
        { status: 400 },
      );
    }

    return Response.json({
      ok: true,
      planSlug: plan.slug,
      currency: (plan.currency || "EUR").toString(),
      baseAmountEuro: amountEuroRaw,
      discountEuro: couponEval.discountEuro,
      payableAmountEuro: couponEval.payableEuro,
      couponCode: couponEval.coupon.code,
    });
  } catch (error) {
    console.error("[CouponEvaluate] Error:", error);
    return Response.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

