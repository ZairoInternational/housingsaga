"use client";

import Image from "next/image";

export default function ContactHero() {
  return (
    <section className="relative w-full h-[520px] flex items-center justify-center text-white">
      <Image
        src="/contact-hero.jpg"
        alt="contact hero"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/40" />

      <div className="relative text-center">
        <h1 className="text-[64px] font-semibold mb-6">Contact Us</h1>

        <div className="flex items-center justify-center gap-3 text-sm">
          <span>Home</span>
          <span className="w-2 h-2 bg-lime-400 rounded-full"></span>
          <span>Contact Us</span>
        </div>
      </div>
    </section>
  );
}
