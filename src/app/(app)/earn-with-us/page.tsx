import { EarnEstimateProvider } from "@/components/earn-with-us/estimate-context";
import EarnHero from "@/components/earn-with-us/EarnHero";
import HowItWorks from "@/components/earn-with-us/HowItWorks";
import EarningsEstimator from "@/components/earn-with-us/EarningsEstimator";
import ValueCompare from "@/components/earn-with-us/ValueCompare";
import PropertyCanWork from "@/components/earn-with-us/PropertyCanWork";
import EstimateFactors from "@/components/earn-with-us/EstimateFactors";
import EarnFaq from "@/components/earn-with-us/EarnFaq";
import EarnCTA from "@/components/earn-with-us/EarnCTA";

export const metadata = {
  title: "Earn with Us | HousingSaga × VacationSaga",
  description:
    "Buy a property through HousingSaga and rent it with VacationSaga. HousingSaga buyers pay a 0% management fee.",
};

export default function EarnWithUsPage() {
  return (
    <EarnEstimateProvider>
      <main className="w-full bg-white">
        <EarnHero />
        <HowItWorks />
        <EarningsEstimator />
        <ValueCompare />
        <PropertyCanWork />
        <EstimateFactors />
        <EarnFaq />
        <EarnCTA />
      </main>
    </EarnEstimateProvider>
  );
}
