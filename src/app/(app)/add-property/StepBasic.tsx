"use client";

import { useFormContext } from "react-hook-form";
import type { FieldError } from "react-hook-form";
import { useHouseFormStore } from "@/store/HouseStore";
import { Field, Input, Textarea, Toggle } from "./FormFields";

export default function StepBasic() {
  const { register, formState: { errors }, watch, setValue } = useFormContext();
  const { formData, updateField } = useHouseFormStore();

  const livingArea = watch("livingArea", formData.livingArea);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Property Name" error={errors.name as FieldError | undefined} required>
          <Input
            {...register("name", {
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => updateField("name", e.target.value)
            })}
            defaultValue={formData.name}
            placeholder="e.g., Green Valley Villa"
            error={!!errors.name}
          />
        </Field>

        <Field label="Property Type" error={errors.propertyType as FieldError | undefined} required>
          <Input
            {...register("propertyType", {
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => updateField("propertyType", e.target.value)
            })}
            defaultValue={formData.propertyType}
            placeholder="e.g., Villa, Apartment, House"
            error={!!errors.propertyType}
          />
        </Field>
      </div>

      <Field
        label="Description"
        error={errors.description as FieldError | undefined}
        required
        hint="Minimum 20 characters. Describe key highlights, surroundings, and what makes this property special."
      >
        <Textarea
          {...register("description", {
            onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => updateField("description", e.target.value)
          })}
          defaultValue={formData.description}
          placeholder="Describe your property in detail — layout, highlights, nearby landmarks…"
          rows={4}
          error={!!errors.description}
        />
      </Field>

      <div className="p-4 bg-gray-50 dark:bg-[#0f1117] rounded-xl border border-gray-200 dark:border-gray-700">
        <Toggle
          id="livingArea"
          label="Has Living Area"
          hint="Check if the property includes a dedicated living/lounge space"
          checked={!!livingArea}
          onChange={v => {
            setValue("livingArea", v);
            updateField("livingArea", v);
          }}
        />
      </div>
    </div>
  );
}
