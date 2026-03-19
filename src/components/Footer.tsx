"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUp } from "lucide-react";
import FooterColumn from "./ui/FooterColumn";

type FooterColumn = {
  title: string;
  links: { label: string; href: string }[];
};

const columns: FooterColumn[] = [
  {
    title: "Quick Links",
    links: [
      { label: "Overview", href: "/overview" },
      { label: "Features", href: "/features" },
      { label: "Solutions", href: "/solutions" },
      { label: "Tutorials", href: "/tutorials" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about-us" },
      { label: "Our Team", href: "/our-team" },
      { label: "News", href: "/news" },
      { label: "Media Kit", href: "/media-kit" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blogs" },
      { label: "Help Center", href: "/help-center" },
      { label: "Tutorials", href: "/tutorials" },
      { label: "FAQ", href: "/faq" },
      { label: "Services", href: "/services" },
    ],
  },
  {
    title: "Addresses",
    links: [
      {
        label: "Greece: 2 Charokopou str, Kallithea 17671 Athens, Greece",
        href: "/contact",
      },
      {
        label: "India: 117/N/70 3rd Floor Kakadeo Kanpur",
        href: "/contact",
      },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative w-full text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/ft2-bg.jpg"
          alt="footer background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#0c0f14]/90" />
      </div>

      {/* Content */}
      <div className="relative max-w-[1320px] mx-auto px-6 py-24">
        {/* Footer Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {columns.map((col) => (
            <FooterColumn key={col.title} column={col} />
          ))}
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/10 my-14" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/80 mb-20">
          <p>Copyright © 2026 Housing Saga. All rights reserved</p>

          <div className="flex gap-6">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/terms-and-conditions">Terms And Conditions</Link>
          </div>
        </div>
      </div>

      {/* Big Background Text */}
      <div className="absolute bottom-[-16px] left-1/2 -translate-x-1/2 pointer-events-none">
        <h2 className="text-[200px] font-semibold text-white opacity-30 tracking-widest select-none">
          housingsaga
        </h2>
      </div>

      {/* Scroll to Top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-amber-400 flex items-center justify-center text-black shadow-lg hover:scale-105 transition"
      >
        <ArrowUp size={20} />
      </button>
    </footer>
  );
}
