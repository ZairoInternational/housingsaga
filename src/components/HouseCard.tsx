import { MapPin } from "lucide-react";

interface HouseCardData {
  HouseCardData: HouseCardType
}

const HouseCard = ({ HouseCardData }: HouseCardData) => {
  return (
    <article className="max-w-2xl mx-auto bg- dark:bg-neutral-900 rounded-lg overflow-hidden md:max-w-2xl hover:shadow-lg transition-shadow duration-300 border text-black dark:text-white ">
      <header>
        <img
          className="w-full h-96 object-cover"
          src={HouseCardData.images[0]}
          alt="Descriptive alt text"
        />
      </header>

      <section className="p-4 flex flex-col gap-2">

        <div className=" flex justify-between">
          <h2 className="text-2xl font-semibold">
            {HouseCardData.name}
          </h2>
          <p className=" font-semibold bg-[#148991] text-white rounded-sm p-1 text-xs sm:text-sm">
            ₹ {HouseCardData.price}
          </p>
        </div>

        <p className=" flex gap-x-1 text-sm lg:text-base">
          <MapPin className=" size-5 text-neutral-800 dark:text-white" />
          {HouseCardData.address}, {" "}
          {HouseCardData.city}, {" "}
          {HouseCardData.state}, {" "}
          {HouseCardData.country}
        </p>

        <div className=" flex gap-2 flex-wrap">
          {HouseCardData.amenities.map((amenity, index) => (
            <p key={index} className=" border rounded-sm px-2 text-sm">
              {amenity.charAt(0).toUpperCase() + amenity.slice(1)}
            </p>
          ))}
        </div>

        <p className=" text-neutral-500 text-sm">
          {HouseCardData.description}
        </p>

      </section>


      {/* Footer */}
      <footer className="p-4 pt-0 flex justify-between">

        <button className="mt-2 px-4 py-2 bg-teal-700 font-semibold text-white rounded hover:bg-teal-900 transition cursor-pointer">
          View Details
        </button>

        <button className="mt-2 px-4 py-2 font-semibold  text-teal-700 rounded transition cursor-pointer">
          Quick Details
        </button>

      </footer>

    </article >


  )
}
export default HouseCard