import FaqHero from "@/components/faq/FaqHero";
import TutorialsContent from "@/components/help/TutorialsContent";
import ContactSection from "@/components/homepage/ContactSection";

export default function TutorialsPage() {
  return (
    <main className="flex flex-col">
      <FaqHero
        title="Tutorials"
        breadcrumbLabel="Tutorials"
        subtitle="Step-by-step guides for property buying, investing, and Golden Visa decisions."
      />
      <TutorialsContent />
      <ContactSection />
    </main>
  );
}
