"use client";

import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import type { FieldError } from "react-hook-form";
import { useHouseFormStore } from "@/store/HouseStore";
import { Field, Input, Select, Textarea, Toggle } from "./FormFields";

const PROPERTY_TYPES = ["apartment", "house", "villa", "rk", "farmhouse"] as const;
type PropertyType = (typeof PROPERTY_TYPES)[number];

const toOption = (v: string) => ({
  value: v,
  label: v.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
});

export default function StepBasic() {
  const { register, formState: { errors }, watch, setValue } = useFormContext();
  const { formData, updateField } = useHouseFormStore();

  const livingArea = watch("livingArea", formData.livingArea);
  const propertyType = watch("propertyType", formData.propertyType) as string | undefined;

  useEffect(() => {
    const isValid = PROPERTY_TYPES.includes(propertyType as PropertyType);
    if (!propertyType || !isValid) {
      setValue("propertyType", "", {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
      updateField("propertyType", "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          <Select
            {...register("propertyType", {
              onChange: (e: React.ChangeEvent<HTMLSelectElement>) =>
                updateField("propertyType", e.target.value),
            })}
            defaultValue={formData.propertyType}
            options={PROPERTY_TYPES.map(toOption)}
            placeholder="Select property type"
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

      <Field
        label="Short Summary"
        error={errors.summary as FieldError | undefined}
        required
        hint="A concise 1–2 sentence summary that will appear in highlights and detail pages."
      >
        <Textarea
          {...register("summary", {
            onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) =>
              updateField("summary", e.target.value),
          })}
          defaultValue={formData.summary}
          placeholder="Briefly summarize the property in one or two sentences."
          rows={3}
          error={!!errors.summary}
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
