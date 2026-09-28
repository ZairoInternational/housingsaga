"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";
import SocialButton from "./SocialButton";

export type TeamMember = {
  id: number | string;
  name: string;
  role: string;
  image: string;
  /** Opens this member’s profile on /our-team when the arrow is clicked */
  profileId?: string;
  href?: string;
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

const isValidSocialUrl = (url?: string) =>
  Boolean(url && url !== "#" && /^https?:\/\//i.test(url));

export default function EmployeeCard({ member }: Props) {
  const profileHref =
    member.href ??
    (member.profileId
      ? `/our-team?member=${encodeURIComponent(member.profileId)}`
      : "/our-team");

  const socialEntries = [
    {
      key: "facebook",
      href: member.socials?.facebook,
      icon: <Facebook />,
      label: `${member.name} on Facebook`,
      delay: "delay-0",
    },
    {
      key: "twitter",
      href: member.socials?.twitter,
      icon: <Twitter />,
      label: `${member.name} on Twitter`,
      delay: "delay-100",
    },
    {
      key: "linkedin",
      href: member.socials?.linkedin,
      icon: <Linkedin />,
      label: `${member.name} on LinkedIn`,
      delay: "delay-200",
    },
    {
      key: "instagram",
      href: member.socials?.instagram,
      icon: <Instagram />,
      label: `${member.name} on Instagram`,
      delay: "delay-300",
    },
  ].filter((entry) => isValidSocialUrl(entry.href));

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
      {socialEntries.length > 0 && (
        <div className="absolute top-4 right-4 flex flex-col gap-3 z-10">
          {socialEntries.map((entry) => (
            <SocialButton
              key={entry.key}
              href={entry.href!}
              label={entry.label}
              delay={entry.delay}
            >
              {entry.icon}
            </SocialButton>
          ))}
        </div>
      )}

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

      {/* Bottom Info */}
      <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between z-10">
        <div>
          <h3 className="text-white text-lg font-semibold">{member.name}</h3>
          <p className="text-white/70 text-sm">{member.role}</p>
        </div>

        <Link
          href={profileHref}
          aria-label={`View ${member.name}'s profile`}
          className="
            ml-4 shrink-0
            w-10 h-10 rounded-full bg-lime-400
            flex items-center justify-center
            opacity-100 scale-100
            md:opacity-0 md:scale-90
            transition-all duration-300 ease-out
            hover:bg-lime-300 hover:scale-110
            group-hover:opacity-100 group-hover:scale-110
            focus-visible:opacity-100 focus-visible:scale-110
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white
          "
        >
          <ArrowUpRight size={18} className="text-black" />
        </Link>
      </div>
    </div>
  );
}
