"use client";

import EmployeeCard, { type TeamMember } from "../ui/EmployeeCard";

export default function TeamGrid() {
 const teamMembers: TeamMember[] = [
   {
     id: 1,
     profileId: "zaid",
     name: "Zaid Bin Hashmat",
     role: "Founder",
     image: "/team-7.jpeg",

   },
   {
     id: 2,
     profileId: "maria-saridou",
     name: "Maria saridou",
     role: "Founder of Greece Branch",
     image: "/team-1.png",
   },
   {
     id: 3,
     profileId: "seda",
     name: "Seda Celen",
     role: "Real Estate Consultant",
     image: "/team-2.png",
   },
   {
     id: 4,
     profileId: "maria-boutali",
     name: "Maria Boutali",
     role: "Lawyer",
     image: "/team-3.png",
   },
   {
     id: 5,
     profileId: "siddartha",
     name: "Siddartha Jain",
     role: "Chief Marketing Officer",
     image: "/team-4.jpeg",
   },
   {
     id: 6,
     profileId: "ankita",
     name: "Ankita Nigam",
     role: "Chief Operating Officer",
     image: "/ankita_nigam.png",
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
