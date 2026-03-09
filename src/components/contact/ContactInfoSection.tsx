"use client";

import { Phone, Mail, Clock, MapPin } from "lucide-react";

export default function ContactInfoSection() {
  return (
    <section className="bg-[#f5f5f5] py-28">
      <div className="max-w-[1200px] mx-auto px-6 text-center">
        <p className="text-lime-500 text-sm mb-3">• Get In Touch</p>

        <h2 className="text-[52px] font-semibold mb-16">
          Get In Touch With Us
        </h2>

        <div className="grid md:grid-cols-4 gap-12">
          <ContactItem
            icon={<Phone />}
            title="Contact Us"
            text="Phone 01: +1890 123 456"
          />

          <ContactItem
            icon={<Mail />}
            title="Email Address"
            text="support01@example.com"
          />

          <ContactItem
            icon={<Clock />}
            title="Opening Hours"
            text="Mon - Sat: 7.00 am - 8.00 pm"
          />

          <ContactItem
            icon={<MapPin />}
            title="Our Office"
            text="Spokane Valley, WA 99212"
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
      <div className="w-14 h-14 rounded-full bg-lime-400 flex items-center justify-center">
        {icon}
      </div>

      <h3 className="font-semibold">{title}</h3>

      <p className="text-gray-500 text-sm">{text}</p>
    </div>
  );
}
