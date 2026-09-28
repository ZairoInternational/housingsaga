import FaqHero from "@/components/faq/FaqHero";
import HelpCenterContent from "@/components/help/HelpCenterContent";
import ContactSection from "@/components/homepage/ContactSection";

export default function HelpCenterPage() {
  return (
    <main className="flex flex-col">
      <FaqHero
        title="Help Center"
        breadcrumbLabel="Help Center"
        subtitle="Support topics, contact options, and quick paths to the help you need."
      />
      <HelpCenterContent />
      <ContactSection />
    </main>
  );
}
