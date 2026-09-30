/** Badge and labels follow the listing checkbox only — not the asking price. */
export function isGoldenVisaEligible(explicit?: boolean | null): boolean {
  return explicit === true;
}

export function goldenVisaEligibilityLabel(explicit?: boolean | null): string {
  return isGoldenVisaEligible(explicit)
    ? "Golden Visa Eligible"
    : "Not Golden Visa Eligible";
}
