"use client";

import { Phone, Clock, MapPin } from "lucide-react";
import { SITE_OFFICES } from "@/lib/site-contact";

export default function ContactInfoSection() {
  const [greece, india] = SITE_OFFICES;

  return (
    <section className="bg-[#f5f5f5] py-28">
      <div className="max-w-[1200px] mx-auto px-6 text-center">
        <p className="text-lime-500 text-sm mb-3">• Get In Touch</p>

        <h2 className="text-[52px] font-semibold mb-16">
          Get In Touch With Us
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          <ContactItem
            icon={<MapPin />}
            title={`${greece.label} office`}
            text={greece.address}
          />

          <ContactItem
            icon={<MapPin />}
            title={`${india.label} office`}
            text={india.address}
          />

          <ContactItem
            icon={<Phone />}
            title="Contact us"
            text="Send us a message using the contact form on this page. We reply by email."
          />

          <ContactItem
            icon={<Clock />}
            title="Response time"
            text="We typically reply within 1–2 business days."
          />
        </div>
      </div>
    </section>
  );
}

function ContactItem({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-14 h-14 rounded-full bg-lime-400 flex items-center justify-center text-black">
        {icon}
      </div>

      <h3 className="font-semibold">{title}</h3>

      <p className="text-gray-500 text-sm max-w-[260px]">{text}</p>
    </div>
  );
}
