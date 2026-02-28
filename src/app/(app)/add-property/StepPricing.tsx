"use client";

import { useFormContext } from "react-hook-form";
import type { FieldError } from "react-hook-form";
import { useHouseFormStore } from "@/store/HouseStore";
import { Field, Input, Toggle, SectionTitle } from "./FormFields";
import { IndianRupee } from "lucide-react";

const PRICING_TOGGLES = [
  { name: "negotiable",         label: "Price is Negotiable",         hint: "Buyers can discuss the listed price" },
  { name: "allInclusivePrice",  label: "All-Inclusive Price",          hint: "Maintenance, parking, etc. are included" },
  { name: "govChargesIncluded", label: "Government Charges Included",  hint: "Stamp duty & registration fees included" },
] as const;

export default function StepPricing() {
  const { register, formState: { errors }, watch } = useFormContext();
  const { formData, updateField } = useHouseFormStore();

  const reg = (name: string) =>
    register(name as keyof typeof formData, {
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        updateField(name as keyof typeof formData, (e.target as HTMLInputElement).value),
    });

  const price = watch("price", formData.price);

  const formatINR = (v: string) => {
    const n = parseFloat(v);
    if (!n || isNaN(n)) return null;
    if (n >= 1e7) return `₹${(n / 1e7).toFixed(2)} Cr`;
    if (n >= 1e5) return `₹${(n / 1e5).toFixed(2)} L`;
    return `₹${n.toLocaleString("en-IN")}`;
  };

  return (
    <div className="space-y-6">
      <SectionTitle>Price & Deposit</SectionTitle>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Asking Price (₹)" error={errors.price as FieldError | undefined} required>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <IndianRupee size={14} />
            </span>
            <Input
              type="number"
              {...reg("price")}
              defaultValue={formData.price}
              placeholder="e.g., 5000000"
              error={!!errors.price}
              className="pl-8"
            />
          </div>
          {price && formatINR(price) && (
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-1">
              ≈ {formatINR(String(price))}
            </span>
          )}
        </Field>

        <Field label="Security Deposit (₹)">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <IndianRupee size={14} />
            </span>
            <Input
              type="number"
              {...reg("depositAmount")}
              defaultValue={formData.depositAmount}
              placeholder="e.g., 100000"
              className="pl-8"
            />
          </div>
        </Field>

        <Field
          label="Lease Term"
          error={errors.leaseTerm as FieldError | undefined}
          required
          hint="Duration in months, e.g. '11 months' or '24 months'"
        >
          <Input
            {...reg("leaseTerm")}
            defaultValue={formData.leaseTerm}
            placeholder="e.g., 11 months"
            error={!!errors.leaseTerm}
          />
        </Field>
      </div>

      <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
        <SectionTitle>Pricing Options</SectionTitle>
        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {PRICING_TOGGLES.map(t => (
            <div key={t.name} className="py-3.5 first:pt-0 last:pb-0">
              <Toggle
                id={t.name}
                label={t.label}
                hint={t.hint}
                checked={!!formData[t.name]}
                onChange={v => updateField(t.name, v)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
