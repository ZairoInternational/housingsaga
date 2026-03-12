import AboutFounder from "@/components/about/AboutFounder";
import AboutHero from "@/components/about/AboutHero";
import AboutSecond from "@/components/about/AboutSecond"

const AboutPage = () => {
  return(
    <main className="w-full">
      <AboutHero />
      <AboutSecond />
      <AboutFounder />
    </main>
  )
}

export default AboutPage;