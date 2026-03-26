"use client";

import Slider from "@/components/ui/slider";
import { ArrowUpRight } from "lucide-react";
import EmployeeCard, { TeamMember } from "@/components/ui/EmployeeCard";

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Maria saridou",
    role: "Founder of Greece Branch",
    image: "/team-1.png",
    socials: { facebook: "#", twitter: "#", instagram: "#", linkedin: "#" },
  
    
  },
  {
    id: 2,
    name: "Seda Celen",
    role: "Real Estate Consultant",
    image: "/team-2.png",
    socials: { facebook: "#", twitter: "#", instagram: "#", linkedin: "#" },
  },
  {
    id: 3,
    name: "Maria Boutali",
    role: "Real Estate Consultant",
    image: "/team-3.png",
    socials: { facebook: "#", twitter: "#", instagram: "#", linkedin: "#" },
  },
  {
    id: 4,
    name: "Siddartha Jain",
    role: "Chief Marketing Officer",
    image: "/team-4.jpeg",
    socials: { facebook: "#", twitter: "#", instagram: "#", linkedin: "#" },
  },
];

export default function TeamSection() {
  return (
    <section className="w-full bg-[#f5f5f5] py-24">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-14 gap-6">
          <div>
            <p className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <span className="w-[6px] h-[6px] bg-lime-400 rounded-full"></span>
              Professional Team
            </p>

            <h2 className="text-[44px] md:text-[52px] font-semibold leading-[1.1] text-[#1c1c1c] max-w-[540px]">
              Your Property, Our Professional Team
            </h2>
          </div>

          <button className="flex items-center gap-2 bg-lime-400 hover:bg-lime-300 transition px-6 py-3 rounded-full text-sm font-medium text-black">
            Meet Our Team
            <ArrowUpRight size={16} />  
          </button>
        </div>

        {/* Slider */}
        <Slider itemWidth={400} gap={24} showDots={false} showArrows={false}>
          {teamMembers.map((member) => (
            <EmployeeCard key={member.id} member={member} />
          ))}
        </Slider>
      </div>
    </section>
  );
}
