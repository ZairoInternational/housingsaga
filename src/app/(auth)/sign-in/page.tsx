"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, LucideLoader2 } from "lucide-react";

import axios from "@/lib/axios";
import { useAuthStore } from "@/store/AuthStore";

const SignIn = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const setAccessToken = useAuthStore((s) => s.setAccessToken);
  const REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Redirect to home if user is already logged in
  useEffect(() => {
    if (useAuthStore.getState().accessToken) {
      router.push("/");
    }
  }, []);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    setError({
      email: "",
      password: "",
    });

    if (!REGEX.test(user.email)) {
      setError((prev) => ({
        ...prev,
        email: "Invalid email address",
      }));
      return;
    }
    if (user.password.length === 0) {
      setError((prev) => ({ ...prev, password: "Password cannot be empty" }));
      return;
    }

    try {
      setIsLoading(true);
      const res = await axios.post("/users/user-login", user);
      setAccessToken(res.data.accessToken);
      toast.success("Login successful");
      router.push("/");
    } catch (err: any) {
      toast.error(err.response.data.error);
    } finally {
      setIsLoading(false);
    }
  };

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
            type="email"
            id="email"
            value={user.email}
            onChange={(e) =>
              setUser({ ...user, email: e.target.value.toLowerCase() })
            }
            className=" rounded-md border border-gray-600 p-2 w-full"
          />
          {error.email && (
            <p className=" text-sm text-red-600">{error.email}</p>
          )}
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
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          {error.password && (
            <p className=" text-sm text-red-600">{error.password}</p>
          )}
        </div>

        <div className=" w-full flex justify-center mt-8">
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className=" w-[70%] bg-teal-700 text-white hover:bg-teal-800 font-semibold px-4 py-2 rounded-md mx-auto cursor-pointer "
          >
            {isLoading ? (
              <LucideLoader2 className=" animate-spin mx-auto" />
            ) : (
              "Login"
            )}
          </button>
        </div>
      </div>
    </section>
  );
};
export default SignIn;
