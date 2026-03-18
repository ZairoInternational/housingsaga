// app/golden-visa/page.tsx
import HeroSection from "@/components/golden-visa/HeroSection";
import WhyChoose from "@/components/golden-visa/WhyChoose";
import Benefits from "@/components/golden-visa/Benefits";
import InvestmentOptions from "@/components/golden-visa/InvestmentOptions";
import Services from "@/components/golden-visa/Services";
import ProcessSteps from "@/components/golden-visa/ProcessSteps";
import DocumentsAccordion from "@/components/golden-visa/DocumentsAccordion";
import TrustIndicators from "@/components/golden-visa/TrustIndicators";
import FAQ from "@/components/golden-visa/FAQ";
import FinalCTA from "@/components/golden-visa/FinalCTA";
import ScrollProgress from "@/components/golden-visa/ScrollProgress";
import StickyCTA from "@/components/golden-visa/StickyCTA";

export default function Page() {
  return (
    <>
      {/* Scroll progress indicator */}
      <ScrollProgress />
      
      <main className="max-w-7xl mx-auto px-6 overflow-x-hidden">
        <HeroSection />
        <WhyChoose />
        <Benefits />
        <InvestmentOptions />
        <ProcessSteps />
        <Services />
        <TrustIndicators />
        <DocumentsAccordion />
        <FAQ />
      </main>

      {/* Full-width final CTA */}
      <FinalCTA />

      {/* Sticky bottom CTA bar */}
      <StickyCTA />
    </>
  );
}
