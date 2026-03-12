import ProjectsSection from "@/components/homepage/ProjectsSection";
import ContactSection from "@/components/homepage/ContactSection";
import PricingHero from "@/components/pricing/PricingHero";
import PricingTiers from "@/components/pricing/PricingTiers";

export default function PricingPage() {
  return (
    <main className="flex flex-col">
      <PricingHero />
      <PricingTiers />
      <ProjectsSection />
      <ContactSection />
    </main>
  );
}

