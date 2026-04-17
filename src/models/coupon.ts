import mongoose from "mongoose";

export interface ICoupon {
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  propertiesAllowed?: number;
  pricePerProperty?: number;
  offerDiscountScope?: "PER_PROPERTY" | "TOTAL";
  minPurchaseAmount?: number;
  maxDiscountAmount?: number | null;
  validFrom: Date;
  validUntil: Date;
  expiresAt?: Date | null;
  usageLimit?: number | null;
  usedCount: number;
  applicablePlans?: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const couponSchema = new mongoose.Schema<ICoupon>(
  {
    code: {
      type: String,
      required: [true, "Coupon code is required"],
      unique: true,
      uppercase: true,
      trim: true,
    },
    discountType: {
      type: String,
      enum: ["percentage", "fixed"],
      required: [true, "Discount type is required"],
    },
    discountValue: {
      type: Number,
      required: [true, "Discount value is required"],
      min: [0, "Discount value cannot be negative"],
    },
    propertiesAllowed: {
      type: Number,
      min: [1, "Properties allowed must be at least 1"],
      default: 1,
    },
    pricePerProperty: {
      type: Number,
      min: [0, "Price per property cannot be negative"],
      default: 0,
    },
    offerDiscountScope: {
      type: String,
      enum: ["PER_PROPERTY", "TOTAL"],
      default: "TOTAL",
    },
    minPurchaseAmount: {
      type: Number,
      default: 0,
    },
    maxDiscountAmount: {
      type: Number,
      default: null,
    },
    validFrom: {
      type: Date,
      required: [true, "Valid from date is required"],
    },
    validUntil: {
      type: Date,
      required: [true, "Valid until date is required"],
    },
    expiresAt: {
      type: Date,
      default: null,
    },
    usageLimit: {
      type: Number,
      default: null,
    },
    usedCount: {
      type: Number,
      default: 0,
    },
    applicablePlans: {
      type: [String],
      default: [],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

// Index for efficient coupon lookup by active period.
couponSchema.index({ isActive: 1, validFrom: 1, validUntil: 1 });

couponSchema.methods.isValid = function isValid(params: {
  planId: string;
  purchaseAmount: number;
}): boolean {
  const { planId, purchaseAmount } = params;

  if (!this.isActive) return false;

  const now = new Date();
  if (now < this.validFrom) return false;
  const expiryDate = this.expiresAt ?? this.validUntil;
  if (now > expiryDate) return false;

  if (typeof this.usageLimit === "number" && this.usageLimit !== null) {
    if (this.usedCount >= this.usageLimit) return false;
  }

  const plans = this.applicablePlans ?? [];
  if (plans.length > 0 && !plans.includes(planId)) return false;

  const minPurchase = this.minPurchaseAmount ?? 0;
  if (minPurchase > 0 && purchaseAmount < minPurchase) return false;

  return true;
};

couponSchema.methods.calculateDiscount = function calculateDiscount(amount: number) {
  // Amount is in euros.
  if (amount <= 0) return 0;

  let discountAmount = 0;

  if (this.discountType === "percentage") {
    discountAmount = (amount * this.discountValue) / 100;
  } else {
    discountAmount = this.discountValue;
  }

  const isFullPercentageOff =
    this.discountType === "percentage" && this.discountValue >= 100;

  const maxDiscount = this.maxDiscountAmount ?? null;
  if (
    !isFullPercentageOff &&
    typeof maxDiscount === "number" &&
    maxDiscount >= 0
  ) {
    discountAmount = Math.min(discountAmount, maxDiscount);
  }

  discountAmount = Math.max(0, Math.min(discountAmount, amount));
  return discountAmount;
};

const Coupon =
  mongoose.models.Coupon || mongoose.model<ICoupon>("Coupon", couponSchema);

export { Coupon, couponSchema };

