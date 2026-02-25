import Hero from "@/components/Hero";
import HouseList from "@/components/Layout/HouseList";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutSection />

      <ProjectsSection />

      {/* <div className=" absolute bottom-1/3 mx-auto z-20">
        <SearchBar />
        </div> */}
      {/* <div className=" h-28 border border-white relative">
        <SearchBar className=" absolute -top-15 left-1/2" />
      </div> */}


      {/* House List */}
      <section className=" max-w-[95%] xl:max-w-[85%] mx-auto mt-40 sm:mt-20 ">
        <HouseList />
      </section>



    </main>
  );
}
