"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Moon, Sun, UserRound } from "lucide-react";

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
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
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
      <header id="header_id" className="w-full h-20">
        <nav className=" max-w-[95%] xl:max-w-[85%] mx-auto h-full flex items-center justify-between">
          <div className=" flex items-center">
            {/* LOGO */}
            <Link href={"/"}>
              <img
                src={"https://vacationsaga.b-cdn.net/assets/vsround.png"}
                alt="logo"
                className=" w-14 h-14 md:w-16 md:h-16"
              />
            </Link>

            {/* Navigation Links */}
            <div className=" hidden md:block">
              {["Home", "Real Estate", "FAQs", "Blogs", "Contact"].map(
                (item, index) => (
                  <Link
                    key={index}
                    href={`/${item.toLowerCase().split(" ").join("-")}`}
                    className="mx-4 font-medium cursor-pointer dark:text-white"
                  >
                    {item}
                  </Link>
                )
              )}
            </div>
          </div>

          <div className=" flex flex-row-reverse md:flex-row items-center gap-x-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className=" cursor-pointer hidden md:block"
            >
              {isDarkMode ? <Moon /> : <Sun />}
            </button>

            {/* Hamburger Menu */}
            <Menu
              onClick={() => setSidebarOpen(true)}
              className={`cursor-pointer md:hidden`}
            />

            {/* Loading state for auth button */}
            <div className="w-20 h-10 bg-gray-300 animate-pulse rounded-md"></div>
          </div>
        </nav>
      </header>
    );
  }

  return (
    <header id="header_id" className="w-full h-20">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} onOpenChange={setSidebarOpen} />

      <nav className=" max-w-[95%] xl:max-w-[85%] mx-auto h-full flex items-center justify-between">
        <div className=" flex items-center">
          {/* LOGO */}
          <Link href={"/"}>
            <img
              src={"https://vacationsaga.b-cdn.net/assets/vsround.png"}
              alt="logo"
              className=" w-14 h-14 md:w-16 md:h-16"
            />
          </Link>

          {/* Navigation Links */}
          <div className=" hidden md:block">
            {["Home", "Real Estate", "FAQs", "Blogs", "Contact"].map(
              (item, index) => (
                <Link
                  key={index}
                  href={`/${item.toLowerCase().split(" ").join("-")}`}
                  className="mx-4 font-medium cursor-pointer dark:text-white"
                >
                  {item}
                </Link>
              ),
            )}
          </div>
        </div>

        <div className=" flex flex-row-reverse md:flex-row items-center gap-x-4">
          {/* Dark Mode Toggle */}
          {isClient && (
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className=" cursor-pointer hidden md:block"
            >
              {isDarkMode ? <Moon /> : <Sun />}
            </button>
          )}

          {/* Hamburger Menu */}
          <Menu
            onClick={() => setSidebarOpen(true)}
            className={`cursor-pointer md:hidden`}
          />

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

                    <div className="flex flex-col py-2" role="menu" id="profile-menu">
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
                onClick={handleAuthToggle} // For testing - replace with actual login function
                className="dark:text-white mx-4 font-medium cursor-pointer px-4 py-2 rounded-md bg-teal-500 hover:bg-teal-600 transition-colors"
              >
                <Link
                  href="/sign-in"
                  className="dark:text-white mx-4 font-medium cursor-pointer px-4 py-2 rounded-md bg-teal-500 hover:bg-teal-600 transition-colors text-white"
                >
                  Login
                </Link>
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};
export default Navbar;
