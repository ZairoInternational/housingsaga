"use client";

import { useHouseFormStore } from "@/store/HouseStore";
import { Toggle, SectionTitle } from "./FormFields";
import { Shield } from "lucide-react";

const LEGAL_FIELDS = [
  { name: "titleDeed",                   label: "Title Deed Available",            hint: "Original ownership document is available" },
  { name: "titleDeedFromPreviousOwner",   label: "Title Deed from Previous Owner",  hint: "Transfer deed from the previous owner" },
  { name: "conversionCertificate",        label: "Conversion Certificate",           hint: "Agricultural to non-agricultural conversion" },
  { name: "encumbranceCertificate",       label: "Encumbrance Certificate",          hint: "Confirms no pending loans or mortgages" },
  { name: "isPlotFreeOfAnyLegalIssues",   label: "Plot Free of Legal Issues",        hint: "No disputes, litigation, or encroachments" },
] as const;

export default function StepLegal() {
  const { formData, updateField } = useHouseFormStore();

  const checkedCount = LEGAL_FIELDS.filter(f => !!formData[f.name]).length;

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-xl">
        <Shield size={16} className="text-blue-500 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-blue-700 dark:text-blue-400 leading-relaxed">
          Legal transparency builds buyer trust. Check only documents that are genuinely available and verified. Providing false information may lead to listing removal.
        </p>
      </div>

      <SectionTitle>Document Checklist</SectionTitle>

      <div className="divide-y divide-gray-100 dark:divide-gray-800">
        {LEGAL_FIELDS.map(field => (
          <div key={field.name} className="py-3.5 first:pt-0 last:pb-0">
            <Toggle
              id={field.name}
              label={field.label}
              hint={field.hint}
              checked={!!formData[field.name]}
              onChange={v => updateField(field.name, v)}
            />
          </div>
        ))}
      </div>

      <div className="mt-2 p-3 bg-gray-50 dark:bg-[#0f1117] rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="text-gray-500">Documents verified</span>
          <span className="font-semibold text-gray-700 dark:text-gray-300">{checkedCount} / {LEGAL_FIELDS.length}</span>
        </div>
        <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 rounded-full transition-all duration-300"
            style={{ width: `${(checkedCount / LEGAL_FIELDS.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
