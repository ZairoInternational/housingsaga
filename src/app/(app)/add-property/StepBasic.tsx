"use client";

import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import type { FieldError } from "react-hook-form";
import { useHouseFormStore } from "@/store/HouseStore";
import { useTranslations } from "next-intl";

import { Field, Input, Select, Textarea, Toggle } from "./FormFields";

const PROPERTY_TYPES = ["apartment", "house", "villa", "rk", "farmhouse"] as const;
type PropertyType = (typeof PROPERTY_TYPES)[number];

export default function StepBasic() {
  const t = useTranslations("listingForm");
  const propertyLabels = useTranslations("property");
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
        <Field label={t("name")} error={errors.name as FieldError | undefined} required>
          <Input
            {...register("name", {
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => updateField("name", e.target.value)
            })}
            defaultValue={formData.name}
            placeholder={t("namePlaceholder")}
            error={!!errors.name}
          />
        </Field>

        <Field label={t("type")} error={errors.propertyType as FieldError | undefined} required>
          <Select
            {...register("propertyType", {
              onChange: (e: React.ChangeEvent<HTMLSelectElement>) =>
                updateField("propertyType", e.target.value),
            })}
            defaultValue={formData.propertyType}
            options={PROPERTY_TYPES.map((value) => ({
              value,
              label: propertyLabels(`types.${value}`),
            }))}
            placeholder={t("typePlaceholder")}
            error={!!errors.propertyType}
          />
        </Field>
      </div>

      <Field
        label={t("description")}
        error={errors.description as FieldError | undefined}
        required
        hint={t("descriptionHint")}
      >
        <Textarea
          {...register("description", {
            onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => updateField("description", e.target.value)
          })}
          defaultValue={formData.description}
          placeholder={t("descriptionPlaceholder")}
          rows={4}
          error={!!errors.description}
        />
      </Field>

      <Field
        label={t("summary")}
        error={errors.summary as FieldError | undefined}
        required
        hint={t("summaryHint")}
      >
        <Textarea
          {...register("summary", {
            onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) =>
              updateField("summary", e.target.value),
          })}
          defaultValue={formData.summary}
          placeholder={t("summaryPlaceholder")}
          rows={3}
          error={!!errors.summary}
        />
      </Field>

      <div className="p-4 bg-gray-50 dark:bg-[#0f1117] rounded-xl border border-gray-200 dark:border-gray-700">
        <Toggle
          id="livingArea"
          label={t("livingArea")}
          hint={t("livingAreaHint")}
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
