import ContactHero from "@/components/contact/ContactHero";
import ContactSection from "@/components/homepage/ContactSection";
import HrPartnerContent from "@/components/hr-partner-program/HrPartnerContent";

export default function HrPartnerProgramPage() {
  return (
    <main className="flex flex-col">
      <ContactHero />
      <HrPartnerContent />
      <ContactSection />
    </main>
  );
}

