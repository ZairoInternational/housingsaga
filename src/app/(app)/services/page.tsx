
import ServiceHero from "@/components/services/ServiceHero";
import ServicesCardSection from "@/components/services/ServicesCardSection";
import ServicesEcosystemSection from "@/components/services/ServicesEcosystemSection";
import ServicesProcessSection from "@/components/services/ServicesProcessSection";

export default function ServicesPage() {
  return (
    <main className="w-full">
      <ServiceHero
        heroTitle="Our Services"
        breadcrumbFirstLabel="Housing Saga"
        breadcrumbLastLabel="Our Services"
      />
      <ServicesCardSection />
      <ServicesEcosystemSection />
      <ServicesProcessSection />
    </main>
  );
}
