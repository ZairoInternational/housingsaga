import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import ContactSection from "@/components/homepage/ContactSection";
import { blogPosts, getBlogPost } from "@/data/blogs";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const related = blogPosts
    .filter((p) => p.slug !== post.slug)
    .filter((p) => p.category === post.category)
    .slice(0, 3);

  const relatedFallback =
    related.length > 0
      ? related
      : blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <main className="bg-white min-h-screen">
      <section className="relative w-full h-[320px] sm:h-[420px] overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/30" />
        <div className="relative z-10 h-full max-w-4xl mx-auto px-4 sm:px-6 flex flex-col justify-end pb-10 text-white">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-sm text-white/75 hover:text-lime-300 mb-5 w-fit"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
          <span className="inline-flex w-fit rounded-full bg-lime-400 text-black text-[11px] font-bold px-3 py-1 mb-3">
            {post.category}
          </span>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight tracking-tight">
            {post.title}
          </h1>
          <p className="mt-3 text-sm text-white/70">
            {post.author} · {post.readTime} ·{" "}
            {new Date(post.publishedAt).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>
      </section>

      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <p className="text-lg text-gray-600 leading-relaxed border-l-4 border-lime-400 pl-4 mb-8">
          {post.excerpt}
        </p>
        <div className="space-y-5">
          {post.content.map((paragraph, i) => (
            <p
              key={i}
              className="text-[15px] sm:text-base text-gray-700 leading-[1.85]"
            >
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <p className="text-sm text-gray-500">
            Want help applying this to a property search?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-lime-400 hover:bg-lime-300 text-black font-semibold text-sm px-5 py-2.5 transition"
          >
            Talk to HousingSaga
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </article>

      {relatedFallback.length > 0 && (
        <section className="bg-[#f4f4f2] py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl sm:text-2xl font-bold text-[#111] mb-8">
              Related articles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedFallback.map((item) => (
                <Link
                  key={item.slug}
                  href={`/blogs/${item.slug}`}
                  className="group rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm"
                >
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="object-cover transition group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-[11px] text-gray-500 mb-1">
                      {item.category} · {item.readTime}
                    </p>
                    <h3 className="font-bold text-[#111] leading-snug group-hover:text-[#14532d] transition line-clamp-2">
                      {item.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <ContactSection />
    </main>
  );
}
