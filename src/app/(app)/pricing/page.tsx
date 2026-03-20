import ProjectsSection from "@/components/homepage/ProjectsSection";
import ContactSection from "@/components/homepage/ContactSection";
import PricingHero from "@/components/pricing/PricingHero";
import PricingTiers from "@/components/pricing/PricingTiers";

export default function PricingPage() {
  return (
    <main className="flex flex-col">
      <PricingHero
        eyebrow="For Property Owners"
        title={
          <>
            Transparent Owner Pricing,
            <br className="hidden sm:block" />
            No Hidden Costs
          </>
        }
        description="At Housing Saga, our pricing is designed to reflect transparency, value, and performance-driven results. Property owners benefit from serious buyer engagement, global exposure, and successful transactions."
      />
      <PricingTiers
        eyebrow="Owner Pricing Plan"
        title="Transparent Pricing, Built on Trust and Results"
        description="At Housing Saga, our pricing reflects transparency, value, and performance-driven results, aligned with your success from listing to closure."
      />
      <ProjectsSection />
      <ContactSection />
    </main>
  );
}

