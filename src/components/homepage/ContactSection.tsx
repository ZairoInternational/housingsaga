"use client";

import Image from "next/image";
import ContactInfo from "@/components/ui/ContactInfo";
import ContactForm from "@/components/ui/ContactForm";

export default function ContactSection() {
  return (
    <section className="relative w-full text-white py-16 sm:py-20 lg:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/contact-agency-bg.jpg"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority={false}
        />
        <div className="absolute inset-0 bg-[#050a0f]/45" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050a0f]/65 via-[#050a0f]/30 to-[#050a0f]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050a0f]/70 via-transparent to-[#050a0f]/25" />
      </div>

      <div className="relative max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 min-w-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-14 items-start">
          <div className="lg:col-span-7 min-w-0">
            <ContactInfo />
          </div>
          <div className="lg:col-span-5 min-w-0 w-full">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
