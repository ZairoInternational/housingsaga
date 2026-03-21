"use client";

import { useFormContext } from "react-hook-form";
import type { FieldError } from "react-hook-form";
import { useHouseFormStore } from "@/store/HouseStore";
import { Field, Input, Select, SectionTitle } from "./FormFields";

const FACING = ["east","west","north","south","northeast","northwest","southeast","southwest"];
const OWNERSHIP = ["freehold","leasehold","co-operative","power-of-attorney"];
const FURNISHING = ["fully-furnished","semi-furnished","unfurnished"];
const FLOORING = ["marble","concrete","polished-concrete","granite","ceramic","mosaic","cement","stone","vinyl","wood","vitrified","spartex","ipsfinish","other"];

const toOption = (v: string) => ({ value: v, label: v.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase()) });

export default function StepSpecs() {
  const { register, formState: { errors } } = useFormContext();
  const { formData, updateField } = useHouseFormStore();

  const reg = (name: string) =>
    register(name as keyof typeof formData, {
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
        updateField(name as keyof typeof formData, (e.target as HTMLInputElement).value),
    });

  return (
    <div className="space-y-6">
      <SectionTitle>Rooms & Area</SectionTitle>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <Field label="Bedrooms" error={errors.bedrooms as FieldError | undefined} required>
          <Input type="number" min={0} {...reg("bedrooms")} defaultValue={formData.bedrooms} placeholder="0" error={!!errors.bedrooms} />
        </Field>
        <Field label="Bathrooms" error={errors.bathrooms as FieldError | undefined} required>
          <Input type="number" min={0} {...reg("bathrooms")} defaultValue={formData.bathrooms} placeholder="0" error={!!errors.bathrooms} />
        </Field>
        <Field label="Balconies">
          <Input type="number" min={0} {...reg("balconies")} defaultValue={formData.balconies} placeholder="0" />
        </Field>
        <Field label="Carpet Area (sq ft)" error={errors.carpetArea as FieldError | undefined} required>
          <Input type="number" min={0} {...reg("carpetArea")} defaultValue={formData.carpetArea} placeholder="1200" error={!!errors.carpetArea} />
        </Field>
        <Field label="Built-up Area (sq ft)">
          <Input type="number" min={0} {...reg("builtUpArea")} defaultValue={formData.builtUpArea} placeholder="1400" />
        </Field>
      </div>

      <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
        <SectionTitle>Building Info</SectionTitle>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <Field label="Total Floors" error={errors.floors as FieldError | undefined}>
            <Input type="number" min={0} {...reg("floors")} defaultValue={formData.floors} placeholder="5" error={!!errors.floors} />
          </Field>
          <Field label="Property on Floor">
            <Input type="number" min={0} {...reg("propertyOnFloor")} defaultValue={formData.propertyOnFloor} placeholder="2" />
          </Field>
          <Field label="Construction Year" error={errors.constructionYear as FieldError | undefined} required>
            <Input type="number" {...reg("constructionYear")} defaultValue={formData.constructionYear} placeholder="2018" error={!!errors.constructionYear} />
          </Field>
        </div>
      </div>

      <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
        <SectionTitle>Property Character</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Facing Direction" error={errors.facing as FieldError | undefined}>
            <Select
              {...reg("facing")}
              defaultValue={formData.facing}
              options={FACING.map(toOption)}
              placeholder="Select direction"
              error={!!errors.facing}
            />
          </Field>
          <Field label="Ownership Type" error={errors.ownership as FieldError | undefined}>
            <Select
              {...reg("ownership")}
              defaultValue={formData.ownership}
              options={OWNERSHIP.map(toOption)}
              placeholder="Select type"
              error={!!errors.ownership}
            />
          </Field>
          <Field label="Furnishing Status" error={errors.furnishing as FieldError | undefined} required>
            <Select
              {...reg("furnishing")}
              defaultValue={formData.furnishing}
              options={FURNISHING.map(toOption)}
              placeholder="Select status"
              error={!!errors.furnishing}
            />
          </Field>
          <Field label="Flooring Type" error={errors.flooring as FieldError | undefined}>
            <Select
              {...reg("flooring")}
              defaultValue={formData.flooring}
              options={FLOORING.map(toOption)}
              placeholder="Select type"
              error={!!errors.flooring}
            />
          </Field>
        </div>
      </div>
    </div>
  );
}
