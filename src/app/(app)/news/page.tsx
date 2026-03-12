import TeamCTA from "@/components/our-team/TeamCTA";
import ContactSection from "@/components/homepage/ContactSection";
import NewsHero from "@/components/news/NewsHero";
import NewsList from "@/components/news/NewsList";

export default function NewsPage() {
  return (
    <main className="flex flex-col">
      <NewsHero />
      <NewsList />
      <TeamCTA />
      <ContactSection />
    </main>
  );
}

