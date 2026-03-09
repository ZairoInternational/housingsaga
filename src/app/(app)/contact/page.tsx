import ContactHero from "@/components/contact/ContactHero";
import ContactFormSection from "@/components/contact/ContactFormSection";
import MapSection from "@/components/contact/MapSection";
import ContactInfoSection from "@/components/contact/ContactInfoSection";
import ContactImageShowcase from "@/components/contact/ContactImageShowcase";

export default function ContactPage() {
  return (
    <main className="w-full">
      <ContactHero />
      <ContactInfoSection />
      <ContactImageShowcase />
      <MapSection />
      <ContactFormSection />
    </main>
  );
}
