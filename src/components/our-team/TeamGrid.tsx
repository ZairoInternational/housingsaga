"use client";

import EmployeeCard from "../ui/EmployeeCard";

export type TeamMember = {
  id: number;
  name: string;
  role: string;
  image: string;
};

export default function TeamGrid() {
 const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Mira Thompson",
      role: "CEO & Founder",
      image: "/team-5.jpg",
    },
    {
      id: 2,
      name: "James Anderson",
      role: "Real Estate Consultant",
      image: "/team-4.jpg",
    },
    {
      id: 3,
      name: "Andrea Willson",
      role: "Operations Manager",
      image: "/team-1.jpg",
    },
    {
      id: 4,
      name: "Oliver Black",
      role: "Director of Architecture",
      image: "/team-2.jpg",
    },
    {
      id: 5,
      name: "Laura Bennett",
      role: "Marketing Manager",
      image: "/team-3.jpg",
    },
    {
      id: 6,
      name: "Katy Hator",
      role: "Real Estate Consultant",
      image: "/team-6.jpg",
    },
  ];
  return (
    <section className="py-28 bg-white dark:bg-[#0f0f0f]">
      <div className="max-w-[1300px] mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-lime-500 text-sm mb-3">• Professional Team</p>

          <h2 className="text-[52px] font-semibold">
            Your Property, Our Professional Team
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <EmployeeCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}
