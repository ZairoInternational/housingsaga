import TeamHero from "@/components/our-team/TeamHero";
import TeamCTA from "@/components/our-team/TeamCTA";
import ContactSection from "@/components/homepage/ContactSection";
import PartnersProgramContent from "@/components/partners-program/PartnersProgramContent";

export default function PartnersProgramPage() {
  return (
    <main className="flex flex-col">
      <TeamHero />
      <PartnersProgramContent />
      <TeamCTA />
      <ContactSection />
    </main>
  );
}

