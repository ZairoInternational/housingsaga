import mongoose, { Schema } from "mongoose";
import { type PlanValidation } from "@/schemas/plan.schema";

const PlanSchema = new Schema<PlanValidation>(
  {
    slug: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    description: { type: String, required: false },
    amountEuro: { type: Number, required: true },
    currency: { type: String, required: true, default: "EUR" },
    isActive: { type: Boolean, required: true, default: true },
    features: { type: [String], required: true, default: [] },
  },
  { timestamps: true },
);

// In dev (Next.js hot reload), mongoose model cache can hold a stale schema.
// Delete before registering so schema changes (e.g. field renames) are applied.
delete (mongoose.models as Record<string, unknown>).Plan;

export const Plan: mongoose.Model<PlanValidation> = mongoose.model<PlanValidation>(
  "Plan",
  PlanSchema,
);

