"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export const ILLUSTRATIVE_STANDARD_FEE = 15;
export const FIXED_APPRECIATION_RATE = 5;

type EstimateContextValue = {
  purchasePrice: number;
  monthlyRent: number;
  occupiedMonths: number;
  occupancyRate: number;
  managementFee: number;
  appreciationRate: number;
  setPurchasePrice: (value: number) => void;
  setMonthlyRent: (value: number) => void;
  setOccupiedMonths: (value: number) => void;
  setOccupancyRate: (value: number) => void;
  setManagementFee: (value: number) => void;
  bookedMonths: number;
  grossIncome: number;
  feeAmount: number;
  netIncome: number;
  standardFeeAmount: number;
  feeKept: number;
  valueAfter1Year: number;
  valueAfter5Years: number;
};

const EstimateContext = createContext<EstimateContextValue | null>(null);

export function EarnEstimateProvider({ children }: { children: ReactNode }) {
  const [purchasePrice, setPurchasePrice] = useState(500000);
  const [monthlyRent, setMonthlyRent] = useState(2000);
  const [occupiedMonths, setOccupiedMonths] = useState(10);
  const [occupancyRate, setOccupancyRate] = useState(100);
  const [managementFee, setManagementFee] = useState(0);
  const appreciationRate = FIXED_APPRECIATION_RATE;

  const value = useMemo<EstimateContextValue>(() => {
    const bookedMonths = occupiedMonths * (occupancyRate / 100);
    const grossIncome = monthlyRent * bookedMonths;
    const feeAmount = grossIncome * (managementFee / 100);
    const netIncome = Math.max(grossIncome - feeAmount, 0);
    const standardFeeAmount = grossIncome * (ILLUSTRATIVE_STANDARD_FEE / 100);
    const feeKept = Math.max(standardFeeAmount - feeAmount, 0);

    return {
      purchasePrice,
      monthlyRent,
      occupiedMonths,
      occupancyRate,
      managementFee,
      appreciationRate,
      setPurchasePrice,
      setMonthlyRent,
      setOccupiedMonths,
      setOccupancyRate,
      setManagementFee,
      bookedMonths,
      grossIncome,
      feeAmount,
      netIncome,
      standardFeeAmount,
      feeKept,
      valueAfter1Year: purchasePrice * (1 + appreciationRate / 100),
      valueAfter5Years: purchasePrice * (1 + appreciationRate / 100) ** 5,
    };
  }, [
    purchasePrice,
    monthlyRent,
    occupiedMonths,
    occupancyRate,
    managementFee,
  ]);

  return <EstimateContext.Provider value={value}>{children}</EstimateContext.Provider>;
}

export function useEarnEstimate() {
  const value = useContext(EstimateContext);
  if (!value) {
    throw new Error("useEarnEstimate must be used within EarnEstimateProvider");
  }
  return value;
}
