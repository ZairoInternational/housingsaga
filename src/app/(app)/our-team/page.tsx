import TeamHero from "@/components/our-team/TeamHero";
import TeamGrid from "@/components/our-team/TeamGrid";
import TeamCTA from "@/components/our-team/TeamCTA";

export default function TeamPage() {
  return (
    <main className="w-full">
      <TeamHero />
      <TeamGrid />
      <TeamCTA />
    </main>
  );
}
