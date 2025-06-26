"use client";

import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import "react-phone-input-2/lib/style.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import { ArrowLeft, Eye, EyeClosed, LucideLoader2 } from "lucide-react";

import { useAuthStore } from "@/store/AuthStore";
import { userSchema } from "@/schemas/housingUser.schema";

interface User {
  name: string;
  phone: number;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Redirect to home if user is already logged in
  useEffect(() => {
    if (useAuthStore.getState().accessToken) {
      router.push("/");
    }
  }, []);

  const [user, setUser] = useState<User>({
    name: "",
    phone: 0,
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async () => {
    const result = userSchema.safeParse(user);
    setError({
      name: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    if (!result.success) {
      Object.entries(result.error?.flatten().fieldErrors).forEach((entry) => {
        setError((prev) => ({
          ...prev,
          [entry[0]]: entry[1][0],
        }));
      });
      return;
    }
    if (user.password !== user.confirmPassword) {
      setError((prev) => ({
        ...prev,
        confirmPassword: "Password does not match",
      }));
      return;
    }

    try {
      setIsLoading(true);
      await axios.post("/api/users/create-user", user);
      toast.success("User created successfully");
    } catch (err: any) {
      toast.error(err.response.data.error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className=" w-full h-screen dark:bg-secondary flex relative">
      {/* Image */}
      <aside className=" w-1/2 h-full hidden sm:block">
        <img src={"/form-3.jpeg"} className=" w-full h-full" />
      </aside>

      <div className=" w-8 h-8 rounded-full opacity-80 absolute right-6 top-8 bg-radial-[at_25%_25%] from-teal-400 to-teal-900 to-75%" />
      <div className=" w-8 h-8 rounded-full opacity-80 absolute right-8 top-12 bg-radial-[at_25%_25%] from-teal-400 to-teal-900 to-75%" />
      <div className=" w-8 h-8 rounded-full opacity-80 absolute right-4 top-12 bg-radial-[at_25%_25%] from-teal-400 to-teal-900 to-75%" />

      {/* Form */}
      <div className=" flex flex-col w-full sm:w-1/2 gap-y-2 justify-center items-center">
        {/* Back Button and Sign-in */}
        <div className=" w-[70%] flex justify-between items-center mb-8">
          <Link href={"/"}>
            <button className=" flex gap-x-1 items-center bg-black hover:bg-black/80 cursor-pointer p-2 rounded-md text-white">
              <ArrowLeft size={18} />
              Back
            </button>
          </Link>

          {/* Sign-in Button */}
          <Link href={"/sign-in"} className=" font-semibold underline">
            Sign In
          </Link>
        </div>

        {/* Name */}
        <div className=" flex flex-col w-[70%]">
          <label htmlFor="name" className="font-semibold text-lg">
            Name
          </label>
          <input
            type="text"
            id="name"
            required
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            className=" rounded-md border border-gray-600 p-2 w-full"
          />
          {error.name && <p className=" text-sm text-red-600">{error.name}</p>}
        </div>

        {/* Phone */}
        <div className=" flex flex-col w-[70%]">
          <label htmlFor="phone" className="font-semibold text-lg">
            Phone
          </label>
          {/* <PhoneInput /> */}
          <PhoneInput
            country={"in"}
            inputStyle={{
              borderColor: "#4a5565",
              padding: "20px",
              marginLeft: "30px",
              // borderWidth: "20px",
              borderRadius: "6px",
              width: "94%",
            }}
            buttonStyle={{
              borderColor: "gray",
              borderRadius: "6px 0 0 6px",
              padding: "5px",
            }}
            onChange={(e) => setUser({ ...user, phone: parseInt(e) })}
          />
          {error.phone && (
            <p className=" text-sm text-red-600">{error.phone}</p>
          )}
        </div>

        {/*email*/}
        <div className=" flex flex-col w-[70%]">
          <label htmlFor="email" className="font-semibold text-lg">
            Email
          </label>
          <input
            type="text"
            id="email"
            required
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
        <div className=" flex flex-col w-[70%] relative">
          <label htmlFor="password" className="font-semibold text-lg">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            required
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className=" rounded-md border border-gray-600 p-2 w-full"
          />
          {showPassword ? (
            <Eye
              size={18}
              className=" absolute right-2 top-10 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            />
          ) : (
            <EyeClosed
              size={18}
              className=" absolute right-2 top-10 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            />
          )}
          {error.password && (
            <p className=" text-sm text-red-600">{error.password}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className=" flex flex-col w-[70%]">
          <label htmlFor="confirmPassword" className="font-semibold text-lg">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            className=" rounded-md border border-gray-600 p-2 w-full"
            onChange={(e) =>
              setUser({ ...user, confirmPassword: e.target.value })
            }
          />
          {error.confirmPassword && (
            <p className=" text-red-600 text-sm">Password does not match</p>
          )}
        </div>

        <div className=" w-full flex justify-center mt-8">
          <button
            className=" w-[70%] bg-teal-700 text-white hover:bg-teal-800 font-semibold px-4 py-2 rounded-md mx-auto cursor-pointer "
            onClick={handleSubmit}
          >
            {isLoading ? (
              <LucideLoader2 className=" animate-spin mx-auto" />
            ) : (
              "Register"
            )}
          </button>
        </div>
      </div>
    </section>
  );
};
export default SignUp;
