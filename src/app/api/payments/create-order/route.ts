import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { z } from "zod";

import { connectDb } from "@/lib/db";
import { getRazorpayClient, getRazorpayKeyId } from "@/lib/razorpay";
import { authOptions } from "@/lib/authConfig";
import { Plan } from "@/models/plan";
import { Payment } from "@/models/payment";

const createOrderSchema = z.object({
  planSlug: z.string().min(1).max(80),
  addressKey: z.string().min(1).max(500),
});

export async function POST(request: NextRequest) {
  try {
    await connectDb();

    const session = await getServerSession(authOptions);
    const sessionUser = session?.user as { id?: string | null; email?: string | null } | undefined;
    const userId = sessionUser?.id ?? null;
    const userEmail = sessionUser?.email ?? null;

    if (!userId || typeof userId !== "string" || !userEmail) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { planSlug, addressKey } = createOrderSchema.parse(body);

    const plan = await Plan.findOne({ slug: planSlug, isActive: true }).lean();
    if (!plan) {
      return Response.json({ error: "Invalid or inactive plan" }, { status: 404 });
    }

    if (!Number.isFinite(plan.amountEurocent) || plan.amountEurocent <= 0) {
      return Response.json({ error: "Invalid plan amount" }, { status: 400 });
    }

    const amount = plan.amountEurocent; // Razorpay expects the smallest currency unit.
    const currency = (plan.currency || "EUR").toString();

    // Razorpay requires `receipt` length <= 40 characters.
    // Using the last part of the userId keeps it short and unique enough for our use.
    const receipt = `hs-${userId.slice(-8)}-${Date.now()}`;
    const razorpay = getRazorpayClient();

    const order = await razorpay.orders.create({
      amount,
      currency,
      receipt,
    });

    const payment = await Payment.create({
      userId,
      planId: plan._id.toString(),
      razorpayOrderId: order.id,
      addressKey,
      amountEurocent: plan.amountEurocent,
      currency,
      status: "created",
    });

    return Response.json({
      orderId: payment.razorpayOrderId,
      amount: payment.amountEurocent,
      currency: payment.currency,
      keyId: getRazorpayKeyId(),
      planSlug,
    });
  } catch (error) {
    console.error("[CreateOrder] Error:", error);
    return Response.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

