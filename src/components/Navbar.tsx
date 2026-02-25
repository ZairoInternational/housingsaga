"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Moon, Sun, UserRound, Phone, ArrowRight } from "lucide-react";

import useDarkMode from "@/hooks/useToggleTheme";
import { useAuthStore } from "@/store/AuthStore";

import Sidebar from "./Sidebar";
import { signOut } from "next-auth/react";
import { useRef } from "react";

const Navbar = () => {
  const router = useRouter();
  const { isLoggedIn, logout, role } = useAuthStore();
  const [isDarkMode, setIsDarkMode] = useDarkMode();

  const [isClient, setIsClient] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };
    if (isProfileOpen) document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [isProfileOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsProfileOpen(false);
      }
    };
    if (isProfileOpen) {
      document.addEventListener("keydown", handleEsc);
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isProfileOpen]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleAuthToggle = () => {
    if (isLoggedIn) {
      // logout();
      router.push("/profile");
    } else {
      // login();
    }
  };

  // placeholder till the client side is rendered
  if (!isClient) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="max-w-[95%] xl:max-w-[90%] mx-auto py-4">
          <div className="h-12 bg-gray-800 rounded-full flex items-center px-4 md:px-6 gap-6">
            <Link href={"/"} className="flex items-center gap-3">
              <img src="/housinglogo.png" alt="logo" className="w-8 h-8" />
              <span className="hidden md:inline text-white font-semibold">
                HousingSaga
              </span>
            </Link>

            <div className="flex-1 hidden md:flex items-center gap-6 justify-center">
              {["Home", "Pages", "Services", "Projects", "Blog", "Contact"].map(
                (item, index) => (
                  <span
                    key={index}
                    className="text-gray-300 text-sm cursor-pointer transform-gpu transition-transform duration-300 hover:text-white hover:translate-y-1 hover:translate-x-1"
                  >
                    {item}
                  </span>
                ),
              )}
            </div>

            <div className="flex items-center gap-4 ml-auto">
              <div className="hidden md:flex items-center gap-3 bg-gray-700 text-white rounded-full px-3 py-1 text-sm">
                <Phone size={16} />
                <span>+1890 123 456</span>
              </div>
              <div className="hidden md:block bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-1 rounded-full text-sm">
                Get In Touch
              </div>
              <Menu
                className="md:hidden text-white"
                onClick={() => setSidebarOpen(true)}
              />
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="absolute top-0 left-0 right-0 z-50 flex items-center border px-2">
      <Sidebar open={sidebarOpen} onOpenChange={setSidebarOpen} />

      <div className="w-full max-w-[95%] xl:max-w-[95%] mx-auto py-4 flex items-center gap-8">
        {/* DARK NAV PILL (logo + nav only) */}
        <div className="h-16 bg-[#22272e] rounded-full px-6 flex items-center gap-10">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <img src="/housinglogo.png" alt="logo" className="w-10 h-12" />
            <span className="hidden md:inline text-white font-semibold text-lg">
              HousingSaga
            </span>
          </Link>

          {/* Nav */}
          <div className="hidden md:flex items-center gap-8">
            {["Home", "Pages", "Services", "Projects", "Blog", "Contact"].map(
              (item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="relative block overflow-hidden h-5 group"
                >
                  {/* Default text */}
                  <span
                    className="
      block
      transition-transform duration-300 ease-out
      group-hover:translate-y-full
    "
                  >
                    {item}
                  </span>

                  {/* Hover text */}
                  <span
                    className="
      absolute left-0 top-0
      block
      -translate-y-full
      transition-transform duration-300 ease-out
      group-hover:translate-y-0
    "
                  >
                    {item}
                  </span>
                </Link>
              ),
            )}
          </div>
        </div>

        {/* RIGHT SIDE ACTIONS (outside dark pill) */}
        <div className="flex items-center gap-4 ml-auto">
          <div className="hidden md:flex items-center gap-3 bg-[#22272e] text-emerald-300 rounded-3xl px-3 py-1 text-sm">
            <div className="border rounded-full p-2 -ml-2 bg-emerald-300">
              <Phone size={16} className="text-black" />
            </div>
            <span className="text-white hover:text-emerald-300 transition-colors">Call us: +1890 123 456</span>
          </div>

          <Link
            href="/contact"
            className="hidden md:inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-3 rounded-full text-sm font-medium"
          >
            <span>Get In Touch</span>
            <ArrowRight size={16} />
          </Link>

          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="hidden md:block text-gray-300"
          >
            {isDarkMode ? <Moon /> : <Sun />}
          </button>
          {/* Hamburger */}
          <Menu
            onClick={() => setSidebarOpen(true)}
            className="md:hidden text-white"
          />

          {/* Auth / Profile */}
          <div>
            {isLoggedIn ? (
              <div className="relative" ref={profileRef}>
                <button
                  aria-haspopup="menu"
                  aria-expanded={isProfileOpen}
                  onClick={() => setIsProfileOpen((v) => !v)}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 hover:shadow-md transition"
                >
                  <UserRound size={18} />
                </button>

                {/* Popover */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg ring-1 ring-black/5 p-2 animate-in fade-in-0 zoom-in-95 z-[9999]">
                    <div className="px-3 py-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                          <UserRound size={18} />
                        </div>
                        <div>
                          <div className="text-sm font-medium">Account</div>
                          <div className="text-xs text-gray-500">
                            Manage your account
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-100 dark:border-gray-800 mt-2" />

                    <div
                      className="flex flex-col py-2"
                      role="menu"
                      id="profile-menu"
                    >
                      <Link
                        role="menuitem"
                        href="/profile"
                        className="px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 rounded"
                      >
                        My Profile
                      </Link>
                      {role === "OWNER" && (
                        <Link
                          role="menuitem"
                          href="/my-listings"
                          className="px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 rounded"
                        >
                          My Listings
                        </Link>
                      )}
                      {role === "BUYER" && (
                        <Link
                          role="menuitem"
                          href="/my-purchases"
                          className="px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 rounded"
                        >
                          My Purchases
                        </Link>
                      )}
                      <Link
                        role="menuitem"
                        href="/dashboard"
                        className="px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 rounded"
                      >
                        Dashboard
                      </Link>
                      <Link
                        role="menuitem"
                        href="/settings"
                        className="px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 rounded"
                      >
                        Settings
                      </Link>
                    </div>

                    <div className="border-t border-gray-100 dark:border-gray-800 mt-2" />

                    <div className="px-3 py-2">
                      <button
                        type="button"
                        className="w-full text-left px-3 py-2 rounded text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900"
                        onClick={async () => {
                          try {
                            await signOut({ redirect: false });
                          } catch {
                            // ignore
                          }
                          await logout();
                          setIsProfileOpen(false);
                          router.push("/");
                        }}
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={handleAuthToggle}
                className="hidden md:inline-flex items-center px-4 py-3 rounded-full bg-emerald-500 text-white text-sm"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
