"use client";

import type React from "react";
import { useFormContext } from "react-hook-form";
import type { FieldError } from "react-hook-form";
import { useHouseFormStore } from "@/store/HouseStore";
import { Field, Input, SectionTitle } from "./FormFields";
import { MapPin } from "lucide-react";
import LocationPicker from "@/components/LocationPicker";


export default function StepLocation() {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
  const { formData, updateField } = useHouseFormStore();

  const reg = (name: keyof typeof formData) =>
    register(name, {
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        updateField(name as keyof typeof formData, e.target.value as string),
    });

  const address = watch("address") as string | undefined;
  const latitude = watch("latitude") as string | undefined;
  const longitude = watch("longitude") as string | undefined;

  return (
    <div className="space-y-6">
      <SectionTitle>Property Address</SectionTitle>

      <Field label="Full Address" error={errors.address as FieldError | undefined} required>
        <div className="relative">
          <Input
            {...reg("address")}
            defaultValue={formData.address}
            placeholder="Street address, building name…"
            error={!!errors.address}
          />
        </div>
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="City" error={errors.city as FieldError | undefined} required>
          <Input {...reg("city")} defaultValue={formData.city} placeholder="e.g., Mumbai" error={!!errors.city} />
        </Field>
        <Field label="State" error={errors.state as FieldError | undefined} required>
          <Input {...reg("state")} defaultValue={formData.state} placeholder="e.g., Maharashtra" error={!!errors.state} />
        </Field>
        <Field label="Country" error={errors.country as FieldError | undefined} required>
          <Input {...reg("country")} defaultValue={formData.country} placeholder="e.g., India" error={!!errors.country} />
        </Field>
        <Field label="Postal Code" error={errors.postalCode as FieldError | undefined} required>
          <Input {...reg("postalCode")} defaultValue={formData.postalCode} placeholder="e.g., 400001" error={!!errors.postalCode} />
        </Field>
        <Field label="House / Flat Number" error={errors.houseNumber as FieldError | undefined}>
          <Input {...reg("houseNumber")} defaultValue={formData.houseNumber} placeholder="e.g., 4B" />
        </Field>
      </div>

      <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-2 mb-4">
          <MapPin size={14} className="text-emerald-500" />
          <SectionTitle>GPS Coordinates <span className="normal-case font-normal text-gray-400">(optional)</span></SectionTitle>
        </div>

        <LocationPicker
          value={{ address, latitude, longitude }}
          onChange={(next) => {
            updateField("latitude", next.latitude);
            updateField("longitude", next.longitude);
            setValue("latitude", next.latitude, {
              shouldDirty: true,
              shouldTouch: true,
              shouldValidate: true,
            });
            setValue("longitude", next.longitude, {
              shouldDirty: true,
              shouldTouch: true,
              shouldValidate: true,
            });

            if (typeof next.address === "string" && next.address.trim().length > 0) {
              updateField("address", next.address);
              setValue("address", next.address, {
                shouldDirty: true,
                shouldTouch: true,
                shouldValidate: true,
              });
            }
          }}
          className="mb-5"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Latitude" error={errors.latitude as FieldError | undefined} hint="e.g., 19.0760">
            <Input type="number" step="any" {...reg("latitude")} defaultValue={formData.latitude} placeholder="19.0760" />
          </Field>
          <Field label="Longitude" error={errors.longitude as FieldError | undefined} hint="e.g., 72.8777">
            <Input type="number" step="any" {...reg("longitude")} defaultValue={formData.longitude} placeholder="72.8777" />
          </Field>
        </div>
      </div>
    </div>
  );
}
