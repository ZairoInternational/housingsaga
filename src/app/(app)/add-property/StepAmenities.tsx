"use client";

import { useHouseFormStore } from "@/store/HouseStore";
import { CheckChip, SectionTitle } from "./FormFields";

const AMENITIES = ["gym","parking","garden","clubhouse","basement","security","mandir","staff room","swimming pool","elevator","power backup"];
const UTILITIES = ["electricity","water","gas","internet","cable tv","waste management"];

export default function StepAmenities() {
  const { formData, updateArrayField } = useHouseFormStore();

  return (
    <div className="space-y-6">
      <div>
        <SectionTitle>Amenities</SectionTitle>
        <p className="text-xs text-gray-400 mb-3">Select all features available at this property</p>
        <div className="flex flex-wrap gap-2">
          {AMENITIES.map(a => (
            <CheckChip
              key={a}
              label={a}
              checked={formData.amenities.includes(a)}
              onChange={() => updateArrayField("amenities", a)}
            />
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
        <SectionTitle>Utilities Included</SectionTitle>
        <p className="text-xs text-gray-400 mb-3">Which utilities are covered or available</p>
        <div className="flex flex-wrap gap-2">
          {UTILITIES.map(u => (
            <CheckChip
              key={u}
              label={u}
              checked={formData.utilities.includes(u)}
              onChange={() => updateArrayField("utilities", u)}
            />
          ))}
        </div>
      </div>

      {(formData.amenities.length > 0 || formData.utilities.length > 0) && (
        <div className="pt-2 p-3 bg-emerald-50 dark:bg-emerald-950/20 rounded-xl border border-emerald-200 dark:border-emerald-900">
          <p className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
            ✓ {formData.amenities.length} amenities · {formData.utilities.length} utilities selected
          </p>
        </div>
      )}
    </div>
  );
}
