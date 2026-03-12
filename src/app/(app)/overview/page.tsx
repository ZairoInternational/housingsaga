import AboutHero from "@/components/about/AboutHero";
import AboutSection from "@/components/homepage/AboutSection";
import ProjectsSection from "@/components/homepage/ProjectsSection";
import RealEstateExcellenceSection from "@/components/homepage/RealEstateExcellenceSection";
import ContactSection from "@/components/homepage/ContactSection";

export default function OverviewPage() {
  return (
    <main className="flex flex-col">
      <AboutHero />
      <AboutSection />
      <ProjectsSection />
      <RealEstateExcellenceSection />
      <ContactSection />
    </main>
  );
}

