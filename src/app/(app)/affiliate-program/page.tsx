import ContactHero from "@/components/contact/ContactHero";
import TeamCTA from "@/components/our-team/TeamCTA";
import ContactSection from "@/components/homepage/ContactSection";
import AffiliateProgramContent from "@/components/affiliate-program/AffiliateProgramContent";

export default function AffiliateProgramPage() {
  return (
    <main className="flex flex-col">
      <ContactHero />
      <AffiliateProgramContent />
      <TeamCTA />
      <ContactSection />
    </main>
  );
}

