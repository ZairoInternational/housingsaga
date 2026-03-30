"use client";

import Image from "next/image";
import {
  ArrowUpRight,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";
import SocialButton from "./SocialButton";

export type TeamMember = {
  id: number;
  name: string;
  role: string;
  image: string;
  socials?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
};

type Props = {
  member: TeamMember;
};

export default function EmployeeCard({ member }: Props) {
  return (
    <div className="relative h-[420px] rounded-[20px] overflow-hidden group">
      {/* Image */}
      <Image
        src={member.image}
        alt={member.name}
        fill
        className="object-cover object-top "
        sizes="(max-width:768px) 100vw, 25vw"
      />

      {/* Social Hover Panel */}
      {member.socials && (
        <div className="absolute top-4 right-4 flex flex-col gap-3">
          <SocialButton delay="delay-0">
            <Facebook />
          </SocialButton>

          <SocialButton delay="delay-100">
            <Twitter />
          </SocialButton>

          <SocialButton delay="delay-200">
            <Linkedin />
          </SocialButton>

          <SocialButton delay="delay-300">
            <Instagram />
          </SocialButton>
        </div>
      )}

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

      {/* Bottom Info */}
      <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
        <div>
          <h3 className="text-white text-lg font-semibold">{member.name}</h3>
          <p className="text-white/70 text-sm">{member.role}</p>
        </div>

        {/* Arrow Button */}
        <div
          className="
            ml-4 shrink-0
            opacity-0 scale-0
            pointer-events-none
            transition-all duration-300 ease-out
            group-hover:opacity-100
            group-hover:scale-125
            group-hover:pointer-events-auto
          "
        >
          <button className="w-10 h-10 rounded-full bg-lime-400 flex items-center justify-center">
            <ArrowUpRight size={18} className="text-black" />
          </button>
        </div>
      </div>
    </div>
  );
}
