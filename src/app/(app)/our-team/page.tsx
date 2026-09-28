import { Suspense } from "react";
import TeamHero from "@/components/our-team/TeamHero";
import TeamIntro from "@/components/our-team/TeamIntro";
import TeamExperience from "@/components/our-team/TeamExperience";

export default function TeamPage() {
  return (
    <main className="w-full bg-white">
      <TeamHero />
      <TeamIntro />
      <Suspense fallback={<div className="min-h-[40vh] bg-[#f6f7f4]" />}>
        <TeamExperience />
      </Suspense>
    </main>
  );
}
