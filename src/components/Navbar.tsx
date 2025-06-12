"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Moon, Sun, UserRound } from "lucide-react";

import useDarkMode from "@/hooks/useToggleTheme";

import Sidebar from "./Sidebar";

const Navbar = () => {

  const [isDarkMode, setIsDarkMode] = useDarkMode();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
            {
              ["Home", "Real Estate", "FAQs", "Blogs", "Contact"].map((item, index) => (
                <Link
                  key={index}
                  href={`/${item.toLowerCase().split(" ").join("-")}`}
                  className="mx-4 font-medium cursor-pointer dark:text-white"
                >
                  {item}
                </Link>
              ))
            }
          </div>
        </div>

        <div className=" flex items-center gap-x-4">

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

          <div>
            {
              isLoggedIn ?
                <div className=" rounded-full p-2 bg-slate-300 cursor-pointer">
                  <UserRound size={20} />
                </div>
                :
                <span className="dark:text-white mx-4 font-medium cursor-pointer">Login</span>
            }
          </div>
        </div>
      </nav>
    </header>
  )
}
export default Navbar;