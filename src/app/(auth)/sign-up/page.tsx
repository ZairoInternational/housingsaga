 "use client";

import axios from "@/lib/axios";
import { isAxiosError } from "axios";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import "react-phone-input-2/lib/style.css";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Eye, EyeClosed, LucideLoader2 } from "lucide-react";
import { getSession, signIn } from "next-auth/react";

import { useAuthStore } from "@/store/AuthStore";
import { userSchema } from "@/schemas/housingUser.schema";
import { PhoneNumberInput } from "@/components/ui/PhoneNumberInput";

interface User {
  name: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  // Redirect to home if user is already logged in
  useEffect(() => {
    if (useAuthStore.getState().accessToken) {
      router.push("/");
    }
  }, [router]);

  const [user, setUser] = useState<User>({
    name: "",
    phone: "",
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

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
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
      const payload = {
        ...user,
        phone: user.phone.trim() ? user.phone : null,
      };
      await axios.post("/users/create-user", payload);
      const result = await signIn("credentials", {
        redirect: false,
        email: user.email,
        password: user.password,
      });

      if (result?.error) {
        // A defensive session check helps avoid false negatives from transient callback errors.
        const session = await getSession();
        const hasSession = Boolean(
          (session?.user as Record<string, unknown> | undefined)?.email,
        );
        if (hasSession) {
          toast.success("Account created. Complete onboarding.");
          router.replace("/onboarding");
          return;
        }
        toast.error("Account created, but auto sign-in failed. Please sign in.");
        router.replace("/sign-in");
        return;
      }

      toast.success("Account created. Complete onboarding.");
      router.replace("/onboarding");
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        toast.error(err.response?.data?.error ?? err.message);
      } else if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="w-full h-screen bg-gray-50 dark:bg-[#0f1117] flex relative overflow-hidden">
      {/* Image */}
      <aside className="relative w-1/2 h-screen hidden lg:block">
        <Image
          src="/3d-house-2.png"
          alt="3D house render"
          fill
          priority
          sizes="50vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-black/35 to-transparent" />

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
            Create your account.
          </h2>
          <p className="mt-2 text-sm text-white/75 max-w-md leading-relaxed">
            Join to list properties, save favourites, and access personalized
            recommendations.
          </p>
        </div>
      </aside>

      {/* Accent glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-lime-400/20 blur-3xl" />
      <div className="pointer-events-none absolute right-10 top-16 h-10 w-10 rounded-full bg-lime-400/20 blur-xl" />

      {/* Form */}
      <div className="flex flex-col w-full lg:w-1/2 justify-center items-center px-5 sm:px-8 py-6">
        <div className="w-full max-w-md">
          {/* Top row */}
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-white/80 dark:bg-white/5 backdrop-blur px-3 py-2 text-xs font-semibold text-gray-700 dark:text-gray-200 ring-1 ring-gray-200 dark:ring-white/10 hover:bg-white dark:hover:bg-white/8 transition"
            >
              <ArrowLeft size={14} />
              Back
            </Link>
            <Link
              href="/sign-in"
              className="text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-lime-600 dark:hover:text-lime-400 transition-colors"
            >
              Sign in
            </Link>
          </div>

          {/* Card */}
          <div className="rounded-3xl border border-gray-200/80 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur shadow-sm p-5 sm:p-6">
            <div className="mb-4">
              <p className="text-xs font-semibold tracking-[0.22em] uppercase text-lime-600 dark:text-lime-400">
                Sign up
              </p>
              <h1 className="mt-2 text-xl sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Create your HousingSaga account
              </h1>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 hidden sm:block">
                It only takes a minute. You can update your profile later.
              </p>
            </div>

            <form
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              onSubmit={handleSubmit}
            >
              {/* -------- NAME -------- */}
              <div>
                <label className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  placeholder="Full name"
                  className={`${inputBase} mt-2 ${
                    error.name
                      ? "border-red-400/70 focus:ring-red-500/25 focus:border-red-500/40"
                      : ""
                  }`}
                />
                {error.name && (
                  <p className="mt-1 text-xs font-medium text-red-600">
                    {error.name}
                  </p>
                )}
              </div>

              {/* -------- PHONE -------- */}
              <div>
                <PhoneNumberInput
                  label="Phone"
                  required
                  value={user.phone}
                  onChange={(digitsOnly) =>
                    setUser({ ...user, phone: digitsOnly })
                  }
                  error={error.phone}
                  defaultCountry="auto"
                />
              </div>

              {/* -------- EMAIL -------- */}
              <div className="sm:col-span-2">
                <label className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={user.email}
                  onChange={(e) =>
                    setUser({ ...user, email: e.target.value.toLowerCase() })
                  }
                  placeholder="you@example.com"
                  className={`${inputBase} mt-2 ${
                    error.email
                      ? "border-red-400/70 focus:ring-red-500/25 focus:border-red-500/40"
                      : ""
                  }`}
                />
                {error.email && (
                  <p className="mt-1 text-xs font-medium text-red-600">
                    {error.email}
                  </p>
                )}
              </div>

              {/* -------- PASSWORD -------- */}
              <div>
                <label className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Password
                </label>

                <div className="relative mt-2">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={user.password}
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                    placeholder="Password"
                    className={`${inputBase} pr-11 ${
                      error.password
                        ? "border-red-400/70 focus:ring-red-500/25 focus:border-red-500/40"
                        : ""
                    }`}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 h-9 w-9 flex items-center justify-center rounded-lg text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100/80 dark:hover:bg-white/10 transition"
                  >
                    {showPassword ? <Eye size={16} /> : <EyeClosed size={16} />}
                  </button>
                </div>

                {error.password && (
                  <p className="mt-1 text-xs font-medium text-red-600">
                    {error.password}
                  </p>
                )}
              </div>

              {/* -------- CONFIRM PASSWORD -------- */}
              <div>
                <label className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Confirm Password
                </label>

                <div className="relative mt-2">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={user.confirmPassword}
                    onChange={(e) =>
                      setUser({ ...user, confirmPassword: e.target.value })
                    }
                    placeholder="Repeat password"
                    className={`${inputBase} pr-11 ${
                      error.confirmPassword
                        ? "border-red-400/70 focus:ring-red-500/25 focus:border-red-500/40"
                        : ""
                    }`}
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((v) => !v)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 h-9 w-9 flex items-center justify-center rounded-lg text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100/80 dark:hover:bg-white/10 transition"
                  >
                    {showConfirmPassword ? (
                      <Eye size={16} />
                    ) : (
                      <EyeClosed size={16} />
                    )}
                  </button>
                </div>

                {error.confirmPassword && (
                  <p className="mt-1 text-xs font-medium text-red-600">
                    {error.confirmPassword}
                  </p>
                )}
              </div>

              {/* -------- SUBMIT -------- */}
              <button
                type="submit"
                disabled={isLoading}
                className="sm:col-span-2 w-full flex items-center justify-center gap-2 rounded-xl bg-lime-500 hover:bg-lime-600 active:bg-lime-700 text-white font-semibold px-4 py-3 text-sm shadow-md shadow-lime-500/25 disabled:opacity-60 disabled:cursor-not-allowed transition"
              >
                {isLoading ? (
                  <>
                    <LucideLoader2 className="animate-spin" />
                    Creating account…
                  </>
                ) : (
                  "Create account"
                )}
              </button>
            </form>

            <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className="font-semibold text-lime-700 dark:text-lime-400 hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default SignUp;
