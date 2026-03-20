import AboutHero from "@/components/about/AboutHero";
import AboutSecond from "@/components/about/AboutSecond";
import AboutFounder from "@/components/about/AboutFounder";

export default function AboutUsPage() {
  return (
    <main className="w-full">
      <AboutHero
        breadcrumbFirstLabel="Housing Saga"
        breadcrumbLastLabel="About Housing Saga"
      />
      <AboutSecond />
      <AboutFounder />
    </main>
  );
}

