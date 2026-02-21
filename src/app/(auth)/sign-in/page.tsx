 "use client";

import Link from "next/link";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, LucideLoader2 } from "lucide-react";

import axios from "@/lib/axios";
import { isAxiosError, type AxiosError } from "axios";
import { useAuthStore } from "@/store/AuthStore";
import { signIn } from "next-auth/react";

// Google Identity Services types (top-level so it's allowed by TS)
declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (opts: {
            client_id: string;
            callback: (res: { credential: string }) => void;
          }) => void;
          renderButton: (parent: HTMLElement | null, options?: Record<string, unknown>) => void;
          prompt: () => void;
        };
      };
    };
  }
}

const SignIn = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const setAccessToken = useAuthStore((s) => s.setAccessToken);
  const REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  // Redirect to home if user is already logged in
  useEffect(() => {
    if (useAuthStore.getState().accessToken) {
      router.push("/");
    }
  }, [router]);

 

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
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
      router.replace("/");
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        const axiosErr = err as AxiosError<{ error?: string }>;
        toast.error(axiosErr.response?.data?.error ?? axiosErr.message);
      } else if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Use NextAuth signIn for Google

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
            type="password"
            id="password"
            value={user.password}
            className=" rounded-md border border-gray-600 p-2 w-full"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          {error.password && (
            <p className=" text-sm text-red-600">{error.password}</p>
          )}
        </div>

        <form className=" w-full flex justify-center mt-8" onSubmit={handleSubmit}>
          <button
            type="submit"
            disabled={isLoading}
            className=" w-[70%] bg-teal-700 text-white hover:bg-teal-800 font-semibold px-4 py-2 rounded-md mx-auto cursor-pointer "
          >
            {isLoading ? (
              <LucideLoader2 className=" animate-spin mx-auto" />
            ) : (
              "Login"
            )}
          </button>
        </form>
        <div className=" w-full flex justify-center mt-4">
          {googleClientId ? (
            <button
              type="button"
              onClick={() => signIn("google", { callbackUrl: "/" })}
              className=" w-[70%] bg-white border border-gray-300 text-black font-semibold px-4 py-2 rounded-md mx-auto cursor-pointer "
            >
              Sign in with Google
            </button>
          ) : (
            <button
              type="button"
              onClick={() =>
                toast.error("Set NEXT_PUBLIC_GOOGLE_CLIENT_ID in your .env")
              }
              className=" w-[70%] bg-red-600 text-white font-semibold px-4 py-2 rounded-md mx-auto cursor-pointer "
            >
              Sign in with Google
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
export default SignIn;
