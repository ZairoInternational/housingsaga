/** Minimum property price (EUR) to qualify for Greece Golden Visa eligibility UI. */
export const GOLDEN_VISA_MIN_PRICE_EUR = 220_000;

export function isGoldenVisaEligible(
  price?: number | null,
): boolean {
  return (
    typeof price === "number" &&
    Number.isFinite(price) &&
    price >= GOLDEN_VISA_MIN_PRICE_EUR
  );
}

export function goldenVisaEligibilityLabel(price?: number | null): string {
  return isGoldenVisaEligible(price)
    ? "Golden Visa Eligible"
    : "Not Golden Visa Eligible";
}
