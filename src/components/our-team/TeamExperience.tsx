"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Linkedin,
  Mail,
  MapPin,
  Twitter,
  UserRound,
  X,
} from "lucide-react";
import { getTeamMember, TEAM_MEMBERS, type TeamMemberProfile } from "@/data/team";
import TeamCTA from "@/components/our-team/TeamCTA";

export default function TeamExperience() {
  const searchParams = useSearchParams();
  const [selected, setSelected] = useState<TeamMemberProfile | null>(null);
  const detailRef = useRef<HTMLElement | null>(null);
  const teamGridRef = useRef<HTMLElement | null>(null);
  const openedFromQuery = useRef(false);

  useEffect(() => {
    if (openedFromQuery.current) return;
    const memberId = searchParams.get("member");
    if (!memberId) return;
    const match = getTeamMember(memberId);
    if (!match) return;
    openedFromQuery.current = true;
    setSelected(match);
  }, [searchParams]);

  useEffect(() => {
    if (!selected || !detailRef.current) return;
    detailRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [selected]);

  const closeProfile = () => {
    setSelected(null);
    // Allow the detail section to unmount, then scroll back to the team grid
    window.setTimeout(() => {
      teamGridRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);
  };

  return (
    <>
      {/* Grid */}
      <section
        ref={teamGridRef}
        id="our-team-members"
        className="bg-[#f6f7f4] py-12 sm:py-16 scroll-mt-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {TEAM_MEMBERS.map((member) => {
              const active = selected?.id === member.id;
              return (
                <article
                  key={member.id}
                  className={`rounded-2xl border bg-[#fbfcfa] p-3 sm:p-4 transition ${
                    active
                      ? "border-lime-400 shadow-[0_12px_40px_rgba(20,83,45,0.1)]"
                      : "border-gray-100 hover:border-lime-300 hover:shadow-md"
                  }`}
                >
                  <div className="flex gap-4">
                    <div className="relative h-[140px] w-[110px] sm:h-[160px] sm:w-[120px] shrink-0 overflow-hidden rounded-xl">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        sizes="120px"
                        className="object-cover object-top"
                      />
                    </div>

                    <div className="min-w-0 flex-1 flex flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h3 className="text-base sm:text-lg font-bold text-[#111] leading-snug truncate">
                            {member.name}
                          </h3>
                          <p className="text-sm text-gray-500 mt-0.5">
                            {member.role}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setSelected(member)}
                          aria-label={`View ${member.name}'s profile`}
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-lime-400 text-black hover:bg-lime-300 transition"
                        >
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>

                      <p className="mt-2 text-xs sm:text-[13px] text-gray-600 leading-relaxed line-clamp-3 flex-1">
                        {member.shortBio}
                      </p>

                      <div className="mt-3 flex items-center gap-2">
                        {member.socials?.linkedin && (
                          <a
                            href={member.socials.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-[#14532d] transition"
                            aria-label={`${member.name} LinkedIn`}
                          >
                            <Linkedin className="h-4 w-4" />
                          </a>
                        )}
                        {member.socials?.twitter && (
                          <a
                            href={member.socials.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-[#14532d] transition"
                            aria-label={`${member.name} X`}
                          >
                            <Twitter className="h-4 w-4" />
                          </a>
                        )}
                        <a
                          href={`mailto:${member.email}`}
                          className="text-gray-400 hover:text-[#14532d] transition"
                          aria-label={`Email ${member.name}`}
                        >
                          <Mail className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <TeamCTA />

      {/* Dynamic detail */}
      {selected && (
        <section
          ref={detailRef}
          id="team-member-detail"
          className="bg-[#12150f] text-white py-12 sm:py-16 scroll-mt-20"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-lime-400">
                Team profile
              </p>
              <button
                type="button"
                onClick={closeProfile}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 hover:bg-white/10 transition"
                aria-label="Close profile"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-6 lg:gap-8 items-start">
              <div className="rounded-3xl bg-white text-[#111] p-4 sm:p-6 shadow-xl">
                <div className="grid sm:grid-cols-[220px_1fr] gap-5 sm:gap-6">
                  <div>
                    <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                      <Image
                        src={selected.image}
                        alt={selected.name}
                        fill
                        sizes="220px"
                        className="object-cover object-top"
                      />
                    </div>
                    <div className="mt-4 flex items-center justify-center gap-3">
                      {selected.socials?.linkedin && (
                        <a
                          href={selected.socials.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-[#14532d]"
                        >
                          <Linkedin className="h-5 w-5" />
                        </a>
                      )}
                      {selected.socials?.twitter && (
                        <a
                          href={selected.socials.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-[#14532d]"
                        >
                          <Twitter className="h-5 w-5" />
                        </a>
                      )}
                      <a
                        href={`mailto:${selected.email}`}
                        className="text-gray-400 hover:text-[#14532d]"
                      >
                        <Mail className="h-5 w-5" />
                      </a>
                    </div>
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-2xl sm:text-3xl font-bold text-[#14532d]">
                      {selected.name}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-gray-500">
                      {selected.role}
                    </p>
                    <p className="mt-4 text-sm text-gray-600 leading-relaxed">
                      {selected.fullBio}
                    </p>

                    <ul className="mt-5 space-y-2.5">
                      <li className="flex items-center gap-2.5 text-sm text-gray-700">
                        <UserRound className="h-4 w-4 text-lime-600" />
                        {selected.experience}
                      </li>
                      <li className="flex items-center gap-2.5 text-sm text-gray-700">
                        <MapPin className="h-4 w-4 text-lime-600" />
                        {selected.location}
                      </li>
                      <li className="flex items-center gap-2.5 text-sm text-gray-700">
                        <Mail className="h-4 w-4 text-lime-600" />
                        <a
                          href={`mailto:${selected.email}`}
                          className="hover:text-[#14532d] break-all"
                        >
                          {selected.email}
                        </a>
                      </li>
                    </ul>

                    <Link
                      href="/contact#contact-form"
                      className="mt-6 inline-flex items-center gap-2 rounded-full border-2 border-lime-500 text-[#14532d] hover:bg-lime-50 font-semibold text-sm px-5 py-2.5 transition"
                    >
                      Get in Touch
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xl sm:text-2xl font-bold mb-5">
                  What You&apos;ll Find in{" "}
                  {selected.name.split(" ")[0]}
                  &apos;s Profile
                </h4>
                <ul className="space-y-4">
                  {selected.highlights.map((item) => (
                    <li key={item.title} className="flex items-start gap-3">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#1a3a1a] border border-lime-500/30 text-lime-400">
                        <Briefcase className="h-5 w-5" />
                      </span>
                      <div className="min-w-0 pt-0.5">
                        <p className="font-semibold text-white">
                          {item.title}
                        </p>
                        <p className="mt-1 text-sm text-white/60 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
