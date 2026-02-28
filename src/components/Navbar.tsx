"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { Menu, Moon, Sun, UserRound, Phone, ArrowRight} from "lucide-react";

import useDarkMode from "@/hooks/useToggleTheme";
import { useAuthStore } from "@/store/AuthStore";
import Sidebar from "./Sidebar";
import { signOut } from "next-auth/react";
import Image from "next/image";

const NAV_LINKS = ["Home", "Pages", "Services", "Projects", "Blog", "Contact"];

const Navbar = () => {
  const router = useRouter();
  const { isLoggedIn, logout, role } = useAuthStore();
  const [isDarkMode, setIsDarkMode] = useDarkMode();

  const [isClient, setIsClient] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const profileRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => setIsClient(true), []);

  /* ── Scroll shadow ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Close profile dropdown on outside click ── */
  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node))
        setIsProfileOpen(false);
    };
    if (isProfileOpen) document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [isProfileOpen]);

  /* ── Close profile dropdown on Escape ── */
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsProfileOpen(false);
    };
    if (isProfileOpen) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isProfileOpen]);

  const handleAuthToggle = () => {
    if (isLoggedIn) router.push("/profile");
    else router.push("/sign-in");
  };

  return (
    <>
      <header
        className={`
          absolute top-0 left-0 right-0 z-50
          transition-all duration-300   
          ${scrolled ? "py-2" : "py-3 sm:py-4"}
        `}
      >
        <div className="w-full max-w-[95%] xl:max-w-[95%] mx-auto flex justify-between items-center gap-3">
          {/* ── DARK PILL: logo + nav ── */}
          <div
            className={`
              bg-[#22272e] rounded-full flex items-center
              px-3 sm:px-5 lg:px-6 max-w-fit 
              h-12 sm:h-14 lg:h-16
              gap-4 sm:gap-6 lg:gap-10
              transition-all duration-300
              ${scrolled ? "shadow-lg shadow-black/30" : ""}
              flex-1 min-w-0 
            `}
          >
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 sm:gap-3 flex-shrink-0"
            >
              <Image
                src="/housinglogo.png"
                alt="HousingSaga logo"
                width={100}
                height={100}
                className="w-8 h-10 sm:w-9 sm:h-11 lg:w-10 lg:h-12 object-contain"
              />
              <span className="hidden sm:inline text-white font-semibold text-base lg:text-lg whitespace-nowrap tracking-tight">
                HousingSaga
              </span>
            </Link>

            {/* Nav links — hidden on mobile, shown on lg+ */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8 ">
              {NAV_LINKS.map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="relative block overflow-hidden h-5 text-gray-300 hover:text-white text-sm font-medium group"
                >
                  <span className="block transition-transform duration-300 ease-out group-hover:translate-y-full">
                    {item}
                  </span>
                  <span className="absolute left-0 top-0 block -translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0">
                    {item}
                  </span>
                </Link>
              ))}
            </nav>

            {/* On md screens show a condensed nav (fewer items or abbreviated) */}
            <nav className="hidden md:flex lg:hidden items-center gap-4">
              {["Home", "Services", "Projects", "Contact"].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="relative block overflow-hidden h-5 text-gray-300 hover:text-white text-xs font-medium group"
                >
                  <span className="block transition-transform duration-300 ease-out group-hover:translate-y-full">
                    {item}
                  </span>
                  <span className="absolute left-0 top-0 block -translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0">
                    {item}
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          {/* ── RIGHT SIDE ACTIONS ── */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {/* Phone badge — hidden below lg */}
            <div className="hidden lg:flex items-center gap-2 bg-[#22272e] text-emerald-300 rounded-3xl px-3 py-1 text-sm whitespace-nowrap">
              <div className="border rounded-full p-2 -ml-2 bg-emerald-300 flex-shrink-0">
                <Phone size={14} className="text-black" />
              </div>
              <span className="text-white hover:text-emerald-300 transition-colors text-xs xl:text-sm">
                Call us: +1890 123 456
              </span>
            </div>

            {/* Get In Touch — hidden on mobile */}
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white px-3 lg:px-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-colors whitespace-nowrap"
            >
              <span>Get In Touch</span>
              <ArrowRight size={14} />
            </Link>

            {/* Dark mode toggle — hidden on mobile */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="hidden md:flex items-center justify-center w-9 h-9 rounded-full bg-[#22272e] text-gray-300 hover:text-white transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Moon size={16} /> : <Sun size={16} />}
            </button>

            {/* Auth / Profile */}
            {isClient && (
              <div>
                {isLoggedIn ? (
                  <div className="relative" ref={profileRef}>
                    <button
                      aria-haspopup="menu"
                      aria-expanded={isProfileOpen}
                      onClick={() => setIsProfileOpen((v) => !v)}
                      className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-100 dark:bg-slate-800 hover:shadow-md transition"
                    >
                      <UserRound size={16} />
                    </button>

                    {/* Dropdown */}
                    {isProfileOpen && (
                      <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-xl ring-1 ring-black/5 p-2 z-[9999] animate-in fade-in-0 zoom-in-95">
                        <div className="px-3 py-2">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                              <UserRound size={16} />
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

                        <div className="flex flex-col py-2" role="menu">
                          <Link
                            role="menuitem"
                            href="/profile"
                            onClick={() => setIsProfileOpen(false)}
                            className="px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                          >
                            My Profile
                          </Link>
                          {role === "owner" && (
                            <Link
                              role="menuitem"
                              href="/my-listings"
                              onClick={() => setIsProfileOpen(false)}
                              className="px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                            >
                              My Listings
                            </Link>
                          )}
                          {role === "buyer" && (
                            <Link
                              role="menuitem"
                              href="/my-purchases"
                              onClick={() => setIsProfileOpen(false)}
                              className="px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                            >
                              My Purchases
                            </Link>
                          )}
                          <Link
                            role="menuitem"
                            href="/dashboard"
                            onClick={() => setIsProfileOpen(false)}
                            className="px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                          >
                            Dashboard
                          </Link>
                          <Link
                            role="menuitem"
                            href="/settings"
                            onClick={() => setIsProfileOpen(false)}
                            className="px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                          >
                            Settings
                          </Link>
                        </div>

                        <div className="border-t border-gray-100 dark:border-gray-800" />

                        <div className="px-3 py-2">
                          <button
                            type="button"
                            className="w-full text-left px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                            onClick={async () => {
                              try {
                                await signOut({ redirect: false });
                              } catch {}
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
                    className="hidden md:inline-flex items-center px-4 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white text-sm font-medium transition-colors"
                  >
                    Login
                  </button>
                )}
              </div>
            )}

            {/* Hamburger — visible on mobile/tablet */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-full bg-[#22272e] text-white hover:bg-[#2d3440] transition-colors"
              aria-label="Open menu"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>

      <Sidebar open={sidebarOpen} onOpenChange={setSidebarOpen} />
    </>
  );
};

export default Navbar;
