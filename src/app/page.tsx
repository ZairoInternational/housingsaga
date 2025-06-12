import SearchBar from "@/components/SearchBar";
import HouseList from "@/components/Layout/HouseList";

export default function Home() {
  return (
    <main>
      <section className=" relative flex flex-col items-center justify-center bg-white dark:bg-secondary">

        {/* Background Image */}
        <div className=" w-full h-[26rem] relative">
          <img
            src="/bg-image3.jpeg"
            alt="bg-image"
            className=" h-[26rem] w-full object-cover z-10"
          />
          <div className=" h-full w-full object-cover absolute inset-0 bg-black/70" />
        </div>

        <div className=" max-w-[85%] absolute top-1/8 md:top-16 xl:top-32 z-20 text-white">
          <h1 className=" text-3xl sm:text-5xl xl:text-6xl font-bold md:leading-16 tracking-wide">
            Discover Your Home Away From Home
          </h1>
        </div>

        <SearchBar className=" absolute -bottom-30 sm:-bottom-15" />

      </section>

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
