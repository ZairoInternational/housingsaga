"use client";

import { ArrowUpRight } from "lucide-react";

export default function ContactFormSection() {
  return (
    <section className="bg-[#f5f5f5] py-28">
      <div className="max-w-[1100px] mx-auto px-6 text-center">
        <p className="text-lime-500 text-sm mb-3">• Share Your Thoughts</p>

        <h2 className="text-[52px] font-semibold mb-4">Let’s Contact Today</h2>

        <p className="text-gray-500 max-w-[520px] mx-auto mb-12">
          Reach out to our team today for quick assistance, reliable guidance,
          and tailored solutions designed to support your business growth.
        </p>

        <form className="grid md:grid-cols-2 gap-6">
          <Input placeholder="Your name *" />
          <Input placeholder="Email address *" />
          <Input placeholder="Your phone *" />
          <Input placeholder="Subject" />

          <textarea
            placeholder="Your message *"
            className="md:col-span-2 h-[140px] rounded-[18px] border border-gray-300 px-6 py-4 outline-none"
          />
        </form>

        <button className="mt-10 px-8 py-4 bg-lime-400 rounded-full font-medium flex items-center gap-2 mx-auto">
          Send A Message
          <ArrowUpRight size={16} />
        </button>
      </div>
    </section>
  );
}

function Input({ placeholder }: { placeholder: string }) {
  return (
    <input
      placeholder={placeholder}
      className="h-[56px] rounded-full border border-gray-300 px-6 outline-none"
    />
  );
}
