import TeamHero from "@/components/our-team/TeamHero";
import RealEstateExcellenceSection from "@/components/homepage/RealEstateExcellenceSection";
import TeamCTA from "@/components/our-team/TeamCTA";
import ContactSection from "@/components/homepage/ContactSection";
import PartnerBenefits from "@/components/partners/PartnerBenefits";

export default function PartnersPage() {
  return (
    <main className="flex flex-col">
      <TeamHero />
      <PartnerBenefits />
      <RealEstateExcellenceSection />
      <TeamCTA />
      <ContactSection />
    </main>
  );
}

