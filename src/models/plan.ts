import mongoose, { Schema } from "mongoose";
import { type PlanValidation } from "@/schemas/plan.schema";

const PlanSchema = new Schema<PlanValidation>(
  {
    slug: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    description: { type: String, required: false },
    amountEurocent: { type: Number, required: true },
    currency: { type: String, required: true, default: "EUR" },
    isActive: { type: Boolean, required: true, default: true },
    features: { type: [String], required: true, default: [] },
  },
  { timestamps: true },
);

export const Plan: mongoose.Model<PlanValidation> =
  mongoose.models.Plan || mongoose.model<PlanValidation>("Plan", PlanSchema);

