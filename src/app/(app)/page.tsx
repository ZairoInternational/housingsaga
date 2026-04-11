import Hero from "@/components/homepage/Hero";
import AboutSection from "@/components/homepage/AboutSection";
import ProjectsSection from "@/components/homepage/ProjectsSection";
import RealEstateExcellenceSection from "@/components/homepage/RealEstateExcellenceSection";
import ResidenceVideoHero from "@/components/homepage/ResidenceVideoHero";
import HowWeBuildSuccessSection from "@/components/homepage/HowWeBuildSuccessSection";
// import TestimonialSection from "@/components/homepage/TestimonialSection";
import TeamSection from "@/components/homepage/TeamSection";
import ContactSection from "@/components/homepage/ContactSection";

export default function Home() {
  return (
    <main className="flex flex-col ">
      <Hero />
      <AboutSection />
      <ProjectsSection />
      <RealEstateExcellenceSection />
      <ResidenceVideoHero />
      <HowWeBuildSuccessSection />
      {/* <TestimonialSection /> */}
      <TeamSection />
      <ContactSection />

      {/* House List */}
      {/* <section className="max-w-[95%] xl:max-w-[85%] mx-auto pb-16 sm:pb-24 lg:pb-32">
        <HouseList />
      </section> */}
    </main>
  );
}
