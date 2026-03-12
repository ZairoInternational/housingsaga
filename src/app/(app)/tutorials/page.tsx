import FaqHero from "@/components/faq/FaqHero";
import FaqSection from "@/components/faq/FaqSection";
import ContactSection from "@/components/homepage/ContactSection";

export default function TutorialsPage() {
  return (
    <main className="flex flex-col">
      <FaqHero />
      <FaqSection />
      <ContactSection />
    </main>
  );
}

