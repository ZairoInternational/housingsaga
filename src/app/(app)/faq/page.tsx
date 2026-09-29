import FaqHero from "@/components/faq/FaqHero";
import FaqSection from "@/components/faq/FaqSection";

export default function FAQPage() {
  return (
    <main className="w-full">
      <FaqHero
        title="FAQs"
        breadcrumbLabel="FAQ"
        subtitle="Answers to common questions about buying in Greece, Golden Visa pathways, and working with HousingSaga."
      />
      <FaqSection />
    </main>
  );
}
