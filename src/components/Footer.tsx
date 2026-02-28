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
      { label: "Overview", href: "#" },
      { label: "Features", href: "#" },
      { label: "Solutions", href: "#" },
      { label: "Tutorials", href: "#" },
      { label: "Pricing", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#" },
      { label: "Careers", href: "#" },
      { label: "News", href: "#" },
      { label: "Media Kit", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "#" },
      { label: "Help Center", href: "#" },
      { label: "Tutorials", href: "#" },
      { label: "Support", href: "#" },
      { label: "Services", href: "#" },
    ],
  },
  {
    title: "Collaborate",
    links: [
      { label: "Partners", href: "#" },
      { label: "Partners Program", href: "#" },
      { label: "Affiliate Program", href: "#" },
      { label: "Community", href: "#" },
      { label: "HR Partner Program", href: "#" },
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
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Contact</Link>
            <Link href="#">Terms And Conditions</Link>
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
        className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-lime-400 flex items-center justify-center text-black shadow-lg hover:scale-105 transition"
      >
        <ArrowUp size={20} />
      </button>
    </footer>
  );
}
