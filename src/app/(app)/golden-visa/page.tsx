import Benefits from "@/components/golden-visa/Benefits";
import BrandBridgeBanner from "@/components/golden-visa/BrandBridgeBanner";
import DocumentsAccordion from "@/components/golden-visa/DocumentsAccordion";
import FinalCTA from "@/components/golden-visa/FinalCTA";
import HeroSection from "@/components/golden-visa/HeroSection";
import InvestmentOptions from "@/components/golden-visa/InvestmentOptions";
import ProcessSteps from "@/components/golden-visa/ProcessSteps";
import ScrollProgress from "@/components/golden-visa/ScrollProgress";
import Services from "@/components/golden-visa/Services";
import StickyCTA from "@/components/golden-visa/StickyCTA";
import TrustIndicators from "@/components/golden-visa/TrustIndicators";
import WhyChoose from "@/components/golden-visa/WhyChoose";

export default function Page() {
  return (
    <div style={{ fontFamily: '"Open Sans", ui-sans-serif, system-ui, sans-serif' }}>
      <ScrollProgress />

      <main className="overflow-x-hidden">
        <HeroSection />
        <WhyChoose />
        <Benefits />
        <InvestmentOptions />
        <BrandBridgeBanner />
        <ProcessSteps />
        <Services />
        <TrustIndicators />
        <DocumentsAccordion />
      </main>

      <FinalCTA />
      <StickyCTA />
    </div>
  );
}
