"use client";

import { ArrowUpRight } from "lucide-react";

export default function ContactForm() {
  return (
    <div className="bg-[#1e1b18] rounded-[22px] p-10 w-full max-w-[520px] ml-auto">
      <h3 className="text-center text-xl font-semibold mb-8">
        Leave Us A Message
      </h3>

      <form className="flex flex-col gap-4">
        <Input placeholder="Name *" />
        <Input placeholder="Email address *" />
        <Select placeholder="Subject" />
        <Textarea placeholder="Message" />

        <button
          type="submit"
          className="mt-4 w-full h-[56px] rounded-full bg-lime-400 text-black font-medium flex items-center justify-center gap-2 hover:brightness-110 transition"
        >
          Send A Message
          <ArrowUpRight size={16} />
        </button>
      </form>
    </div>
  );
}

type InputProps = {
  placeholder: string;
};

function Input({ placeholder }: InputProps) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="h-[52px] rounded-full bg-black border border-white/10 px-6 text-sm outline-none focus:border-lime-400"
    />
  );
}

function Select({ placeholder }: InputProps) {
  return (
    <select className="h-[52px] rounded-full bg-black border border-white/10 px-6 text-sm outline-none focus:border-lime-400">
      <option>{placeholder}</option>
      <option>General Inquiry</option>
      <option>Support</option>
      <option>Partnership</option>
    </select>
  );
}

function Textarea({ placeholder }: InputProps) {
  return (
    <textarea
      placeholder={placeholder}
      rows={4}
      className="rounded-[18px] bg-black border border-white/10 px-6 py-4 text-sm outline-none focus:border-lime-400 resize-none"
    />
  );
}
