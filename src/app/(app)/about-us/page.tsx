import AboutHero from "@/components/about/AboutHero";
import AboutSecond from "@/components/about/AboutSecond";
import AboutFounder from "@/components/about/AboutFounder";
import AboutValues from "@/components/about/AboutValues";

export default function AboutUsPage() {
  return (
    <main className="w-full">
      <AboutHero
        breadcrumbFirstLabel="Home"
        breadcrumbLastLabel="About HousingSaga"
      />
      <AboutSecond />
      <AboutFounder />
      <AboutValues />
    </main>
  );
}
