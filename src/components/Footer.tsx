"use client";

import Link from "next/link";
import { useState } from "react";
import { Facebook, Instagram, Linkedin, Mail, Menu, Phone, Twitter, X } from "lucide-react";
import Sidebar from "./Sidebar";

const Footer = () => {

  // const [isDarkMode, setIsDarkMode] = useDarkMode();
  // const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <footer id="header_id" className="w-full py-4">

      {/* Sidebar */}
      <Sidebar open={sidebarOpen} onOpenChange={setSidebarOpen} />

      <nav className=" max-w-[95%] xl:max-w-[85%] mx-auto h-full flex flex-col gap-y-4 items-between justify-between">

        <div className=" flex flex-col xl:flex-row gap-y-2 justify-between items-center  w-full">

          <div className=" flex flex-col xl:flex-row gap-y-3 items-center">

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

            <div className=" flex items-center gap-x-4">
              {/* Hamburger Menu */}
              <Menu
                onClick={() => setSidebarOpen(true)}
                className={`cursor-pointer md:hidden`}
              />
            </div>

          </div>

          <div className=" flex flex-col xl:flex-row gap-y-3 items-center gap-x-2">
            <p className=" flex gap-x-2 items-center font-light"><Mail size={18} /> abc@gmail.com</p>
            <p className=" hidden xl:block">|</p>
            <p className=" flex gap-x-2 items-center font-light"><Phone size={18} /> +91 123456789</p>
          </div>

        </div>

        <div className=" flex flex-col items-center gap-y-4 md:flex-row justify-between">
          <p className=" text-sm">&copy; HousingSaga. All Rights Reserved</p>

          <div className=" flex gap-x-3">
            <p><Facebook size={18} /></p>
            <p><Linkedin size={18} /></p>
            <p><Twitter size={18} /></p>
            <p><Instagram size={18} /></p>
          </div>
        </div>

      </nav>
    </footer>
  )
}
export default Footer