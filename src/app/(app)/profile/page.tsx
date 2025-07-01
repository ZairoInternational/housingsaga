import { MailIcon, Phone } from "lucide-react";
import Link from "next/link";

const Profile = () => {
  return (
    <section className=" h-screen max-w-[90%] xl:max-w-[80%] mx-auto flex flex-col lg:flex-row">
      {/* <div className=" my-4">
        <h1 className=" text-3xl font-bold mb-2">My Profile</h1>
        <p>Manage your account information and preference</p>
      </div> */}

      {/* Profile Card */}
      <section className=" border border-white flex flex-col items-center min-w-[330px] py-6 bg-black/20 dark:bg-neutral-600/20 h-fit rounded-md mt-4 shadow-lg">
        <div className=" w-24 h-24 rounded-full bg-gradient-to-br text-white from-teal-400 via-teal-600 to-teal-700 flex justify-center items-center font-semibold text-lg">
          AM
        </div>

        <div className=" flex flex-col items-center w-full gap-y-0.5 mt-4">
          <p className=" font-bold text-lg">Aviral Mishra</p>
          <p className=" text-black dark:text-gray-300">aviralm522@gmail.com</p>
          <p className=" text-gray-500 text-sm">Member since June 2024</p>
        </div>

        <div className=" h-0.5 bg-gray-600 w-[90%] mx-auto my-6 " />

        <div className=" flex flex-col justify-start w-[90%] gap-y-2">
          <div className=" flex gap-x-2 items-center w-full text-gray-400">
            <MailIcon size={16} />
            aviralm522@gmail.com
          </div>
          <div className=" flex gap-x-2 items-center w-full text-gray-400">
            <Phone size={16} fill="gray" />
            +91 9696277390
          </div>
        </div>
      </section>

      <section>
        <h2 className=" text-2xl font-semibold">
          Listing
          <Link href={"/add-property"}>
            {" "}
            <button className=" px-4 py-2 rounded-md cursor-pointer bg-teal-600 hover:bg-teal-700 text-white">
              Add Property
            </button>
          </Link>
        </h2>
      </section>
    </section>
  );
};
export default Profile;
