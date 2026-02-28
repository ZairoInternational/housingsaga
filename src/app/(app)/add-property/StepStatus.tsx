"use client";

import { useHouseFormStore } from "@/store/HouseStore";
import { Toggle, SectionTitle, Field, Input } from "./FormFields";
import { Info } from "lucide-react";

const STATUS_FIELDS = [
  { name: "isActive",    label: "Active Listing",       hint: "Make this listing visible on the platform" },
  { name: "isAvailable", label: "Available for Rent",   hint: "Property is currently available to move in" },
  { name: "isFeatured",  label: "Featured Property",    hint: "Boost visibility in search & homepage" },
  { name: "isVerified",  label: "Verified Property",    hint: "Property documents have been verified" },
  { name: "isNew",       label: "Mark as New",          hint: "Show a 'New' badge on the listing" },
] as const;

export default function StepStatus() {
  const { formData, updateField } = useHouseFormStore();

  return (
    <div className="space-y-6">
      {/* Owner */}
      <div>
        <SectionTitle>Owner Information</SectionTitle>
        <Field
          label="Owner ID"
          required
          hint="Your account ID or registered owner identifier"
        >
          <Input
            type="text"
            name="owner"
            defaultValue={formData.owner}
            onChange={e => updateField("owner", e.target.value)}
            placeholder="e.g., usr_01HXXX…"
          />
        </Field>
      </div>

      {/* Status */}
      <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
        <SectionTitle>Listing Status</SectionTitle>

        <div className="flex items-start gap-2 mb-4 p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-xl">
          <Info size={14} className="text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
            Set your listing visibility and status flags. You can change these at any time from your dashboard.
          </p>
        </div>

        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {STATUS_FIELDS.map(f => (
            <div key={f.name} className="py-3.5 first:pt-0 last:pb-0">
              <Toggle
                id={f.name}
                label={f.label}
                hint={f.hint}
                checked={!!formData[f.name]}
                onChange={v => updateField(f.name, v)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="mt-2 p-4 bg-emerald-50 dark:bg-emerald-950/15 border border-emerald-200 dark:border-emerald-900 rounded-xl">
        <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 mb-1">
          Almost done! 🎉
        </p>
        <p className="text-xs text-emerald-600/80 dark:text-emerald-500 leading-relaxed">
          Review your settings above and click <strong>Submit Listing</strong> to publish. Our team will review the listing within 24 hours.
        </p>
      </div>
    </div>
  );
}
