import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const SignIn = () => {
  return (
    <section className=" w-full h-screen dark:bg-secondary flex relative">
      {/* Image */}
      <aside className=" w-1/2 h-full hidden sm:block ">
        <img src={"/form-3.jpeg"} className=" w-full h-full" />
      </aside>

      <div className=" w-8 h-8 rounded-full opacity-80 absolute right-6 top-8 bg-radial-[at_25%_25%] from-teal-400 to-teal-900 to-75%" />
      <div className=" w-8 h-8 rounded-full opacity-80 absolute right-8 top-12 bg-radial-[at_25%_25%] from-teal-400 to-teal-900 to-75%" />
      <div className=" w-8 h-8 rounded-full opacity-80 absolute right-4 top-12 bg-radial-[at_25%_25%] from-teal-400 to-teal-900 to-75%" />

      {/* Form */}
      <div className=" flex flex-col w-full sm:w-1/2 gap-y-4 justify-center items-center">
        {/* Back Button and Sign-up */}
        <div className=" w-[70%] flex justify-between items-center mb-8">
          <Link href={"/"}>
            <button className=" flex gap-x-1 items-center bg-black hover:bg-black/80 cursor-pointer p-2 rounded-md text-white">
              <ArrowLeft size={18} />
              Back
            </button>
          </Link>

          {/* Sign-up Button */}
          <Link href={"/sign-up"} className=" font-semibold underline">
            Sign Up
          </Link>
        </div>

        {/*email*/}
        <div className=" flex flex-col w-[70%]">
          <label htmlFor="email" className="font-semibold text-lg">
            Email
          </label>
          <input
            type="text"
            id="email"
            className=" rounded-md border border-gray-600 p-2 w-full"
          />
        </div>

        {/*password*/}
        <div className=" flex flex-col w-[70%]">
          <label htmlFor="password" className="font-semibold text-lg">
            Password
          </label>
          <input
            type="text"
            id="password"
            className=" rounded-md border border-gray-600 p-2 w-full"
          />
        </div>

        <div className=" w-full flex justify-center mt-8">
          <button className=" w-[70%] bg-teal-700 text-white hover:bg-teal-800 font-semibold px-4 py-2 rounded-md mx-auto cursor-pointer ">
            Login
          </button>
        </div>
      </div>
    </section>
  );
};
export default SignIn;
