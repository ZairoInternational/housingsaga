import TeamHero from "@/components/our-team/TeamHero";
import TeamSection from "@/components/homepage/TeamSection";
import TeamCTA from "@/components/our-team/TeamCTA";
import ContactSection from "@/components/homepage/ContactSection";
import CommunityIntro from "@/components/community/CommunityIntro";

export default function CommunityPage() {
  return (
    <main className="flex flex-col">
      <TeamHero />
      <CommunityIntro />
      <TeamSection />
      <TeamCTA />
      <ContactSection />
    </main>
  );
}

