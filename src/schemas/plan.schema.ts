import { z } from "zod";

export const planSchema = z.object({
  slug: z.string().min(1, "Plan slug is required"),
  name: z.string().min(1, "Plan name is required"),
  description: z.string().optional(),
  amountEuro: z.number().min(0, "Amount must be >= 0"),
  currency: z.string().default("EUR"),
  isActive: z.boolean().default(true),
  features: z.array(z.string()).default([]),
});

export type PlanValidation = z.infer<typeof planSchema>;

