import type { HouseFormData } from "@/store/HouseStore";

function normalizePart(value: string): string {
  return value.trim().toLowerCase().replaceAll(/\s+/g, " ");
}

function normalizeNumberPart(value: string | number | null | undefined): string {
  if (value === null || value === undefined) return "";
  const s = String(value).trim();
  // Remove trailing .0 etc. for values that came through as numbers-as-strings.
  const asNumber = Number(s);
  if (Number.isFinite(asNumber)) return String(asNumber);
  return s;
}

export type AddressKeyInput = Pick<
  HouseFormData,
  "address" | "city" | "state" | "country" | "postalCode" | "houseNumber"
>;

/**
 * Stable address key used to decide if a user already paid for a specific address.
 * Floors / apartment number are intentionally excluded (payment is per-address).
 */
export function computeAddressKey(input: AddressKeyInput): string {
  const address = normalizePart(input.address);
  const city = normalizePart(input.city);
  const state = normalizePart(input.state);
  const country = normalizePart(input.country);
  const postalCode = normalizeNumberPart(input.postalCode);
  // In the form, `houseNumber` starts at `0` even when the user hasn't provided a value.
  // Treat `0` as "not provided" so different listings without a house number still match.
  const rawHouseNumber = input.houseNumber;
  const houseNumber =
    rawHouseNumber === "" ||
    rawHouseNumber === 0 ||
    rawHouseNumber === "0" ||
    rawHouseNumber === null ||
    rawHouseNumber === undefined
      ? ""
      : normalizeNumberPart(rawHouseNumber);

  return [
    address,
    houseNumber,
    city,
    state,
    country,
    postalCode,
  ].join("|");
}

