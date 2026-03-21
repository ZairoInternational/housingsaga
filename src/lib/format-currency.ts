/**
 * Consistent EUR display for property prices across the app.
 */
export function formatEurAmount(value: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Parses a numeric string from form input and returns formatted EUR, or null if invalid/empty.
 */
export function formatEurApproxFromInputString(v: string): string | null {
  const n = parseFloat(v);
  if (!Number.isFinite(n) || n <= 0) return null;
  return formatEurAmount(n);
}
