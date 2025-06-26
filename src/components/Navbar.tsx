"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, Moon, Sun, UserRound } from "lucide-react";

import useDarkMode from "@/hooks/useToggleTheme";
import { useAuthStore } from "@/store/AuthStore";

import Sidebar from "./Sidebar";

const Navbar = () => {
  const { isLoggedIn, logout } = useAuthStore();
  const [isDarkMode, setIsDarkMode] = useDarkMode();

  const [isClient, setIsClient] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleAuthToggle = () => {
    if (isLoggedIn) {
      logout();
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
              )
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
              <div
                className=" rounded-full p-2 bg-slate-300 cursor-pointer hover:bg-slate-400 transition-colors"
                onClick={handleAuthToggle} // For testing - remove in production
              >
                <UserRound size={20} />
              </div>
            ) : (
              <button
                onClick={handleAuthToggle} // For testing - replace with actual login function
                className="dark:text-white mx-4 font-medium cursor-pointer px-4 py-2 rounded-md bg-teal-500 hover:bg-teal-600 transition-colors"
              >
                <Link href={"/sign-in"} className="text-white">Login</Link>
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};
export default Navbar;
