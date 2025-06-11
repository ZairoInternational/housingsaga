import HouseList from "@/components/Layout/HouseList";

export default function Home() {
  return (
    <main>
      <section className=" relative flex justify-center">

        {/* Background Image */}
        <img
          src="/bg-image.jpeg"
          alt="bg-image"
          className=" h-[46rem] w-full object-cover -z-10"
        // className=" h-[calc(100vh - 96px)]"
        />
        <div className=" h-[46rem] w-full object-cover absolute inset-0 bg-black/30 -z-10" />

        <div className=" max-w-[85%] absolute top-1/8 md:top-1/3">
          <h1 className=" text-2xl md:text-6xl font-bold md:leading-20 tracking-wide">
            Discover the art of luxury accommodation</h1>
          <h3 className=" md:text-base leading-tight mt-4 w-full md:max-w-[60%]">
            From breathtaking views to exquisite furnishings, our accommodations redefine luxury and offer an experience beyond compare.
          </h3>
        </div>
      </section>

      {/* House List */}
      <section className=" max-w-[85%] mx-auto">
        <HouseList />
      </section>

    </main>
  );
}
