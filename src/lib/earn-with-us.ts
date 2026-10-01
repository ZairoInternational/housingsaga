/** Transparent VacationSaga management commission tiers (% of rental revenue). */
export type CommissionTierId = "listing" | "full" | "premium";

export type CommissionTier = {
  id: CommissionTierId;
  name: string;
  rate: number;
  blurb: string;
  includes: string[];
  recommended?: boolean;
};

export const COMMISSION_TIERS: CommissionTier[] = [
  {
    id: "listing",
    name: "Listing Support",
    rate: 0.12,
    blurb: "We list and book; you handle day-to-day guest care.",
    includes: [
      "VacationSaga listing & calendar sync",
      "Guest booking & payments",
      "Basic performance reporting",
    ],
  },
  {
    id: "full",
    name: "Full Management",
    rate: 0.18,
    blurb: "Hands-off ownership — we run the rental end to end.",
    recommended: true,
    includes: [
      "Everything in Listing Support",
      "Cleaning, check-in & guest messaging",
      "Maintenance coordination",
      "Occupancy & pricing optimization",
    ],
  },
  {
    id: "premium",
    name: "Premium Host Care",
    rate: 0.22,
    blurb: "Maximum yield focus with concierge-level guest experience.",
    includes: [
      "Everything in Full Management",
      "Furnishing & staging guidance",
      "Priority guest recovery & reviews",
      "Quarterly owner strategy review",
    ],
  },
];

export function getCommissionTier(id: CommissionTierId): CommissionTier {
  return (
    COMMISSION_TIERS.find((t) => t.id === id) ??
    COMMISSION_TIERS.find((t) => t.recommended)!
  );
}

export type EarningsEstimateInput = {
  purchasePrice: number;
  nightlyRate: number;
  occupancyPercent: number;
  commissionRate: number;
};

export type EarningsEstimate = {
  nightsBooked: number;
  grossAnnual: number;
  commissionAnnual: number;
  netAnnual: number;
  paybackYears: number | null;
  paybackMonths: number | null;
};

export function estimateEarnings({
  purchasePrice,
  nightlyRate,
  occupancyPercent,
  commissionRate,
}: EarningsEstimateInput): EarningsEstimate {
  const occ = Math.min(Math.max(occupancyPercent, 0), 100) / 100;
  const nightsBooked = Math.round(365 * occ);
  const grossAnnual = nightlyRate * nightsBooked;
  const commissionAnnual = grossAnnual * commissionRate;
  const netAnnual = Math.max(grossAnnual - commissionAnnual, 0);
  const paybackYears =
    purchasePrice > 0 && netAnnual > 0 ? purchasePrice / netAnnual : null;
  const paybackMonths =
    paybackYears !== null ? Math.ceil(paybackYears * 12) : null;

  return {
    nightsBooked,
    grossAnnual,
    commissionAnnual,
    netAnnual,
    paybackYears,
    paybackMonths,
  };
}

export const VACATION_SAGA_URL =
  process.env.NEXT_PUBLIC_VACATION_SAGA_URL ?? "https://vacationsaga.com";
