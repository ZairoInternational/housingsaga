import ContactHero from "@/components/contact/ContactHero";
import ContactInfoSection from "@/components/contact/ContactInfoSection";
import ContactFormSection from "@/components/contact/ContactFormSection";
import MapSection from "@/components/contact/MapSection";

export default function ContactPage() {
  return (
    <main className="w-full bg-white">
      <ContactHero />
      <ContactInfoSection />
      <ContactFormSection />
      <MapSection />
    </main>
  );
}
