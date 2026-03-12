import RealEstateExcellenceSection from "@/components/homepage/RealEstateExcellenceSection";
import TeamSection from "@/components/homepage/TeamSection";
import ContactSection from "@/components/homepage/ContactSection";
import ServicesHero from "@/components/services/ServiceHero";

export default function SolutionsPage() {
  return (
    <main className="flex flex-col">
      <ServicesHero />
      <RealEstateExcellenceSection />
      <TeamSection />
      <ContactSection />
    </main>
  );
}

