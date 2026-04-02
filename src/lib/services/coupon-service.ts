import { Coupon } from "@/models/coupon";

type EvaluateCouponInput = {
  couponCode: string;
  planSlug: string;
  planId: string;
  purchaseAmountEuro: number;
};

export type EvaluateCouponResult =
  | {
      ok: true;
      coupon: ICouponDoc;
      discountEuro: number;
      payableEuro: number;
    }
  | { ok: false; reason: string };

type ICouponDoc = {
  _id: { toString(): string };
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minPurchaseAmount?: number;
  maxDiscountAmount?: number | null;
  usageLimit?: number | null;
  usedCount: number;
  applicablePlans?: string[];
  validFrom: Date;
  validUntil: Date;
  isActive: boolean;
};

function normalizeCouponCode(code: string): string {
  return code.trim().toUpperCase();
}

function getCouponPlanMatch(coupon: ICouponDoc, planSlug: string, planId: string) {
  const plans = coupon.applicablePlans ?? [];
  if (plans.length === 0) return true;

  return plans.includes(planSlug) || plans.includes(planId);
}

function roundToEuro(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.round(value * 100) / 100;
}

function computeDiscountEuro(params: {
  coupon: ICouponDoc;
  purchaseAmountEuro: number;
}): { discountEuro: number; payableEuro: number } {
  const { coupon, purchaseAmountEuro } = params;
  const amountEuro = Math.max(0, roundToEuro(purchaseAmountEuro));

  let discountEuro = 0;

  if (coupon.discountType === "percentage") {
    // discountValue is treated as percentage points (e.g. 15 means 15%).
    discountEuro = (amountEuro * coupon.discountValue) / 100;
  } else {
    // discountValue is treated as euros.
    discountEuro = coupon.discountValue;
  }

  // maxDiscountAmount caps partial promos (e.g. "20% off, max €50 off").
  // For 100% off, the order must go to €0 — do not let a max cap block that.
  const isFullPercentageOff =
    coupon.discountType === "percentage" && coupon.discountValue >= 100;

  const maxDiscount = coupon.maxDiscountAmount ?? null;
  if (
    !isFullPercentageOff &&
    typeof maxDiscount === "number" &&
    Number.isFinite(maxDiscount) &&
    maxDiscount >= 0
  ) {
    discountEuro = Math.min(discountEuro, maxDiscount);
  }

  discountEuro = roundToEuro(discountEuro);
  discountEuro = Math.max(0, discountEuro);
  discountEuro = Math.min(discountEuro, amountEuro);

  const payableEuro = roundToEuro(Math.max(0, amountEuro - discountEuro));
  return { discountEuro, payableEuro };
}

export async function evaluateCoupon({
  couponCode,
  planSlug,
  planId,
  purchaseAmountEuro,
}: EvaluateCouponInput): Promise<EvaluateCouponResult> {
  if (!couponCode.trim()) {
    return { ok: false, reason: "Coupon code is required" };
  }

  const normalized = normalizeCouponCode(couponCode);
  const now = new Date();

  const coupon = (await Coupon.findOne({ code: normalized }).lean<ICouponDoc | null>()) as
    | ICouponDoc
    | null;

  if (!coupon) return { ok: false, reason: "Invalid coupon code" };
  if (!coupon.isActive) return { ok: false, reason: "Coupon is not active" };
  if (now < coupon.validFrom) return { ok: false, reason: "Coupon is not yet valid" };
  if (now > coupon.validUntil) return { ok: false, reason: "Coupon has expired" };

  if (typeof coupon.usageLimit === "number" && coupon.usageLimit !== null) {
    if (coupon.usedCount >= coupon.usageLimit) {
      return { ok: false, reason: "Coupon usage limit reached" };
    }
  }

  if (!getCouponPlanMatch(coupon, planSlug, planId)) {
    return { ok: false, reason: "Coupon is not applicable to this plan" };
  }

  const minPurchase = coupon.minPurchaseAmount ?? 0;
  if (typeof minPurchase === "number" && minPurchase > 0) {
    if (purchaseAmountEuro < minPurchase) {
      return {
        ok: false,
        reason: `Minimum purchase amount of €${minPurchase} is required`,
      };
    }
  }

  const { discountEuro, payableEuro } = computeDiscountEuro({
    coupon,
    purchaseAmountEuro,
  });

  return {
    ok: true,
    coupon,
    discountEuro,
    payableEuro,
  };
}

export async function incrementCouponUsedCount({
  couponCode,
}: {
  couponCode: string;
}): Promise<{ ok: true } | { ok: false; reason: string }> {
  const normalized = normalizeCouponCode(couponCode);
  const coupon = await Coupon.findOne({ code: normalized })
    .select({ usageLimit: 1, usedCount: 1 })
    .lean<{
      _id: unknown;
      usageLimit?: number | null;
      usedCount: number;
    } | null>();

  if (!coupon) return { ok: false, reason: "Invalid coupon code" };

  const filter =
    typeof coupon.usageLimit === "number" && coupon.usageLimit !== null
      ? { code: normalized, usedCount: { $lt: coupon.usageLimit } }
      : { code: normalized };

  const res = await Coupon.updateOne(filter, { $inc: { usedCount: 1 } });
  if (res.matchedCount === 0) {
    return { ok: false, reason: "Coupon usage limit reached" };
  }

  return { ok: true };
}

