"use client";

import ContactInfo from "@/components/ui/ContactInfo";
import ContactForm from "@/components/ui/ContactForm";

export default function ContactSection() {
  return (
    <section className="w-full bg-[#2c2723] text-white py-28">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-start">
        <ContactInfo />
        <ContactForm />
      </div>
    </section>
  );
}
