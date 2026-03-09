
import AboutSection from "@/components/homepage/AboutSection";
import HowWeBuildSuccessSection from "@/components/homepage/HowWeBuildSuccessSection";
import RealEstateExcellenceSection from "@/components/homepage/RealEstateExcellenceSection";
import ServiceHero from "@/components/services/ServiceHero";

export default function ServicesPage() {
  return (
    <main className="w-full">
      <ServiceHero />
      <AboutSection />
      <RealEstateExcellenceSection />
      <HowWeBuildSuccessSection />
    </main>
  );
}
