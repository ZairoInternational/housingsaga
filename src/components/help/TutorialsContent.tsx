import Image from "next/image";
import Link from "next/link";
import { ArrowRight, PlayCircle } from "lucide-react";
import { getLatestPosts } from "@/data/blogs";

const staticTutorials = [
  {
    title: "How to evaluate a Greece property investment",
    summary:
      "A practical checklist for location, yield, and Golden Visa fit before you buy.",
    href: "/blogs/aegean-properties-investment-opportunity",
    image: "/palmhouse.jpg",
    tag: "Investment",
  },
  {
    title: "First-time buyer steps for Greece",
    summary:
      "Documents, timelines, and common pitfalls for international buyers.",
    href: "/blogs/first-time-buyer-checklist-greece",
    image: "/mixed.jpg",
    tag: "Buying Guide",
  },
  {
    title: "Golden Visa property basics",
    summary:
      "What qualifying thresholds mean and how to shortlist the right asset class.",
    href: "/blogs/golden-visa-property-basics",
    image: "/ft1-bg.jpg",
    tag: "Golden Visa",
  },
];

export default function TutorialsContent() {
  const fromBlog = getLatestPosts(3);
  const cards =
    fromBlog.length > 0
      ? fromBlog.map((post) => ({
          title: post.title,
          summary: post.excerpt,
          href: `/blogs/${post.slug}`,
          image: post.image,
          tag: post.category,
        }))
      : staticTutorials;

  return (
    <section className="bg-white py-14 sm:py-18 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-lime-600 mb-3">
            · Tutorials
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#14532d] tracking-tight">
            Step-by-step guides for smarter decisions
          </h2>
          <p className="mt-3 text-gray-600 leading-relaxed">
            Practical walkthroughs for buying, investing, and understanding
            Greece Golden Visa pathways — written for HousingSaga clients.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group rounded-2xl overflow-hidden border border-gray-100 bg-[#fbfcfa] hover:border-lime-300 hover:shadow-lg transition"
            >
              <div className="relative aspect-[16/10]">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(min-width:1024px) 33vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                />
                <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-lime-400 text-black text-[11px] font-bold px-2.5 py-1">
                  <PlayCircle className="h-3.5 w-3.5" />
                  {card.tag}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-[#14532d] leading-snug group-hover:text-lime-700 transition line-clamp-2">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed line-clamp-3">
                  {card.summary}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-lime-700">
                  Read tutorial
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 rounded-full bg-lime-400 hover:bg-lime-300 text-black font-bold text-sm px-6 py-3 transition"
          >
            View all articles
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
