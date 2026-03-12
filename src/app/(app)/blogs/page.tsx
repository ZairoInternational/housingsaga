import TestimonialSection from "@/components/homepage/TestimonialSection";
import ContactSection from "@/components/homepage/ContactSection";
import BlogHero from "@/components/blogs/BlogHero";
import BlogList from "@/components/blogs/BlogList";

export default function BlogsPage() {
  return (
    <main className="flex flex-col">
      <BlogHero />
      <BlogList />
      <TestimonialSection />
      <ContactSection />
    </main>
  );
}

