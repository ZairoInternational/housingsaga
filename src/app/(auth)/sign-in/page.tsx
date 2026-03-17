 "use client";

import Link from "next/link";
import toast from "react-hot-toast";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Eye, EyeClosed, LucideLoader2 } from "lucide-react";

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
  const [showPassword, setShowPassword] = useState(false);
  const setAccessToken = useAuthStore((s) => s.setAccessToken);
  const setRole = useAuthStore((s) => s.setRole);
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

  const inputBase = useMemo(
    () =>
      [
        "w-full rounded-xl px-4 py-3 text-sm",
        "bg-white dark:bg-white/5",
        "border border-gray-200 dark:border-white/10",
        "text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500",
        "outline-none",
        "focus:ring-2 focus:ring-lime-500/30 focus:border-lime-500/40",
        "transition",
      ].join(" "),
    [],
  );

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
      setRole(res.data.role);
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
    <section className="w-full min-h-screen bg-gray-50 dark:bg-[#0f1117] flex relative overflow-hidden">
      {/* Image */}
      <aside className="relative w-1/2 min-h-screen hidden lg:block">
        <img src={"/3d-house.png"} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-black/35 to-transparent" />
        {/* <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-lime-400/20 blur-3xl" /> */}
        <div className="absolute top-10 left-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-black/40 backdrop-blur px-4 py-2 text-xs font-semibold text-white ring-1 ring-white/10 hover:bg-black/55 transition"
          >
            <ArrowLeft size={14} />
            Back to home
          </Link>
        </div>
        <div className="absolute bottom-10 left-10 right-10">
          <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-lime-300/90">
            HousingSaga
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white leading-tight">
            Welcome back.
          </h2>
          <p className="mt-2 text-sm text-white/75 max-w-md leading-relaxed">
            Sign in to manage your profile, listings, and property activity with a
            premium experience.
          </p>
        </div>
      </aside>

      {/* Accent glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-lime-400/20 blur-3xl" />
      <div className="pointer-events-none absolute right-10 top-16 h-10 w-10 rounded-full bg-lime-400/20 blur-xl" />

      {/* Form */}
      <div className="flex flex-col w-full lg:w-1/2 justify-center items-center px-5 sm:px-8 py-10">
        <div className="w-full max-w-md">
          {/* Top row */}
          <div className="flex items-center justify-between mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-white/80 dark:bg-white/5 backdrop-blur px-3 py-2 text-xs font-semibold text-gray-700 dark:text-gray-200 ring-1 ring-gray-200 dark:ring-white/10 hover:bg-white dark:hover:bg-white/8 transition"
            >
              <ArrowLeft size={14} />
              Back
            </Link>
            <Link
              href="/sign-up"
              className="text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-lime-600 dark:hover:text-lime-400 transition-colors"
            >
              Create account
            </Link>
          </div>

          {/* Card */}
          <div className="rounded-3xl border border-gray-200/80 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur shadow-sm p-6 sm:p-7">
            <div className="mb-6">
              <p className="text-xs font-semibold tracking-[0.22em] uppercase text-lime-600 dark:text-lime-400">
                Sign in
              </p>
              <h1 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Continue to HousingSaga
              </h1>
              <p className="mt-1.5 text-sm text-gray-600 dark:text-gray-400">
                Use your email and password to access your dashboard.
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={user.email}
                  onChange={(e) =>
                    setUser({ ...user, email: e.target.value.toLowerCase() })
                  }
                  placeholder="you@example.com"
                  className={`${inputBase} mt-2 ${error.email ? "border-red-400/70 focus:ring-red-500/25 focus:border-red-500/40" : ""}`}
                />
                {error.email && (
                  <p className="mt-1.5 text-xs font-medium text-red-600">{error.email}</p>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                    Password
                  </label>
                  <Link
                    href="#"
                    className="text-xs font-semibold text-gray-500 hover:text-lime-600 dark:text-gray-400 dark:hover:text-lime-400 transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative mt-2">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={user.password}
                    className={`${inputBase} pr-11 ${error.password ? "border-red-400/70 focus:ring-red-500/25 focus:border-red-500/40" : ""}`}
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 inline-flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100/80 dark:hover:bg-white/10 transition"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <Eye size={16} /> : <EyeClosed size={16} />}
                  </button>
                </div>
                {error.password && (
                  <p className="mt-1.5 text-xs font-medium text-red-600">{error.password}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-lime-500 hover:bg-lime-600 active:bg-lime-700 text-white font-semibold px-4 py-3 text-sm shadow-md shadow-lime-500/25 disabled:opacity-60 disabled:cursor-not-allowed transition"
              >
                {isLoading ? (
                  <>
                    <LucideLoader2 className="animate-spin" />
                    Signing in…
                  </>
                ) : (
                  "Sign in"
                )}
              </button>
            </form>

            <div className="my-5 flex items-center gap-3">
              <div className="h-px flex-1 bg-gray-200/70 dark:bg-white/10" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gray-400">
                Or
              </span>
              <div className="h-px flex-1 bg-gray-200/70 dark:bg-white/10" />
            </div>

            {googleClientId ? (
              <button
                type="button"
                onClick={() => signIn("google", { callbackUrl: "/" })}
                className="w-full inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold bg-white hover:bg-gray-50 text-gray-900 ring-1 ring-gray-200 dark:bg-white/5 dark:hover:bg-white/8 dark:text-white dark:ring-white/10 transition"
              >
                Sign in with Google
              </button>
            ) : (
              <button
                type="button"
                onClick={() =>
                  toast.error("Set NEXT_PUBLIC_GOOGLE_CLIENT_ID in your .env")
                }
                className="w-full inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold bg-red-600 hover:bg-red-700 text-white transition"
              >
                Sign in with Google
              </button>
            )}

            <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
              New here?{" "}
              <Link href="/sign-up" className="font-semibold text-lime-700 dark:text-lime-400 hover:underline">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default SignIn;
