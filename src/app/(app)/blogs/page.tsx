import { Suspense } from "react";
import ContactSection from "@/components/homepage/ContactSection";
import TestimonialSection from "@/components/homepage/TestimonialSection";
import BlogHero from "@/components/blogs/BlogHero";
import BlogList from "@/components/blogs/BlogList";
import BlogTrustSection from "@/components/blogs/BlogTrustSection";

export default function BlogsPage() {
  return (
    <main className="flex flex-col">
      <BlogHero />
      <Suspense fallback={<div className="min-h-[40vh] bg-[#f4f4f2]" />}>
        <BlogList />
      </Suspense>
      <TestimonialSection />
      <BlogTrustSection />
      <ContactSection />
    </main>
  );
}
