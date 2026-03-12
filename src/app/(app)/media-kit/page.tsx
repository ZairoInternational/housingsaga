import TeamCTA from "@/components/our-team/TeamCTA";
import ContactSection from "@/components/homepage/ContactSection";
import MediaKitHero from "@/components/media-kit/MediaKitHero";
import MediaAssets from "@/components/media-kit/MediaAssets";

export default function MediaKitPage() {
  return (
    <main className="flex flex-col">
      <MediaKitHero />
      <MediaAssets />
      <TeamCTA />
      <ContactSection />
    </main>
  );
}

