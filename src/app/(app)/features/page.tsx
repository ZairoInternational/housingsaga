import HowWeBuildSuccessSection from "@/components/homepage/HowWeBuildSuccessSection";
import ProjectsSection from "@/components/homepage/ProjectsSection";
import ContactSection from "@/components/homepage/ContactSection";
import ServicesHero from "@/components/services/ServiceHero";

export default function FeaturesPage() {
  return (
    <main className="flex flex-col">
      <ServicesHero />
      <HowWeBuildSuccessSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  );
}

