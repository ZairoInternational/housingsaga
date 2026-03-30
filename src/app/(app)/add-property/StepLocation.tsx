"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import type { FieldError } from "react-hook-form";
import { useHouseFormStore } from "@/store/HouseStore";
import { Field, Input, SectionTitle } from "./FormFields";
import { MapPin } from "lucide-react";
import LocationPicker from "@/components/LocationPicker";
import type { ExistingAddressOption } from "./address-reuse-types";

type StepLocationProps = {
  existingAddressOptions?: ExistingAddressOption[];
};

export default function StepLocation({
  existingAddressOptions,
}: StepLocationProps) {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
  const { formData, updateField } = useHouseFormStore();

  const [selectedAddressId, setSelectedAddressId] = useState<string>("new");

  useEffect(() => {
    // Reset to default "new address" whenever options change (e.g. navigating
    // to a different add-property flow).
    setSelectedAddressId("new");
  }, [existingAddressOptions]);

  const reg = (name: keyof typeof formData) =>
    register(name, {
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        updateField(name as keyof typeof formData, e.target.value as string),
    });

  const address = watch("address") as string | undefined;
  const latitude = watch("latitude") as string | undefined;
  const longitude = watch("longitude") as string | undefined;

  const clearAddressFields = () => {
    updateField("address", "");
    updateField("city", "");
    updateField("state", "");
    updateField("country", "");
    updateField("postalCode", "");
    updateField("houseNumber", "");
    updateField("latitude", "");
    updateField("longitude", "");

    setValue("address", "", {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
    setValue("city", "", { shouldDirty: true, shouldTouch: true, shouldValidate: true });
    setValue("state", "", {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
    setValue("country", "", {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
    setValue("postalCode", "", {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
    setValue("houseNumber", "", {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
    setValue("latitude", "", {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
    setValue("longitude", "", {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const applyExistingAddress = (option: ExistingAddressOption) => {
    updateField("address", option.address);
    updateField("city", option.city);
    updateField("state", option.state);
    updateField("country", option.country);
    updateField("postalCode", option.postalCode);
    updateField("houseNumber", option.houseNumber);
    updateField("latitude", option.latitude);
    updateField("longitude", option.longitude);

    setValue("address", option.address, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
    setValue("city", option.city, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
    setValue("state", option.state, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
    setValue("country", option.country, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
    setValue("postalCode", option.postalCode, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
    setValue("houseNumber", option.houseNumber, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
    setValue("latitude", option.latitude, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
    setValue("longitude", option.longitude, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  return (
    <div className="space-y-6">
      <SectionTitle>Property Address</SectionTitle>

      {existingAddressOptions && existingAddressOptions.length > 0 && (
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0d0f17] p-4">
          <div className="text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-3">
            Address reuse
          </div>

          <div className="space-y-3">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="radio"
                name="addressReuse"
                value="new"
                checked={selectedAddressId === "new"}
                onChange={() => {
                  setSelectedAddressId("new");
                  clearAddressFields();
                }}
                className="mt-1"
              />
              <div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  Use new address
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Enter a different address for this listing.
                </div>
              </div>
            </label>

            {existingAddressOptions.map((option) => (
              <label key={option.id} className="flex items-start gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="addressReuse"
                  value={option.id}
                  checked={selectedAddressId === option.id}
                  onChange={() => {
                    setSelectedAddressId(option.id);
                    applyExistingAddress(option);
                  }}
                  className="mt-1"
                />
                <div className="min-w-0">
                  <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {option.address}, {option.city}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {option.state} • {option.country}
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>
      )}

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
          <MapPin size={14} className="text-lime-500" />
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
