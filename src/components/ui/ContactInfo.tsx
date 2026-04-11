"use client";

import Image from "next/image";

export default function ContactInfo() {
  return (
    <div className="flex flex-col gap-10">
      <h2 className="text-[52px] font-semibold leading-[1.1]">
        Contact our agency
      </h2>

      <div className="grid grid-cols-2 gap-y-10 gap-x-12 text-[15px]">
        <div>
          <p className="text-white/60 text-sm mb-2">Phone Support</p>
          <p className="text-lg font-medium">+91 9076621166</p>
        </div>

        <div>
          <p className="text-white/60 text-sm mb-2">Email Us</p>
          <p className="text-lg font-medium">support@housingsaga.com</p>
        </div>

        <div>
          <p className="text-white/60 text-sm mb-2">Chat Support</p>
          <p className="text-lg font-medium underline">Start live chat</p>
        </div>

        <div>
          <p className="text-white/60 text-sm mb-2">Opening Hour</p>
          <p className="text-lg font-medium">Mon-Fri: 8am–6pm</p>
        </div>
      </div>

      <div className="w-full h-px bg-white/10" />

      <div className="flex flex-col gap-4">
        <h3 className="text-lime-400 font-semibold text-lg">Book A Call</h3>

        <p className="text-white/70 text-sm max-w-[380px]">
          A 30-min discovery call to see how we can help.
        </p>

        <div className="flex items-center gap-4 mt-2">
          <Image
            src="/team-1.png"
            alt="agent"
            width={42}
            height={42}
            className="rounded-full"
          />

          <div>
            <p className="font-medium">Maria Saridou</p>
            <p className="text-sm text-white/60">Founder of Greece Branch</p>
          </div>
        </div>
      </div>
    </div>
  );
}
