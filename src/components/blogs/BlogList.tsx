"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import {
  BLOG_CATEGORIES,
  blogPosts,
  getFeaturedPosts,
  getLatestPosts,
  type BlogCategory,
  type BlogPost,
} from "@/data/blogs";
import { localizeBlogPost } from "@/lib/localize-blog";

function parseCategory(
  value: string | null,
): "All" | BlogCategory {
  if (!value || value === "All") return "All";
  if ((BLOG_CATEGORIES as string[]).includes(value)) {
    return value as BlogCategory;
  }
  return "All";
}

export default function BlogList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const locale = useLocale();
  const t = useTranslations("blog");
  const show = (post: BlogPost) =>
    localizeBlogPost(post, locale, t(`categories.${post.category}`));
  const featured = getFeaturedPosts().map(show);
  const primary = featured[0];
  const secondary = featured.slice(1, 3);
  const latest = getLatestPosts(4).map(show);

  const [activeCategory, setActiveCategory] = useState<"All" | BlogCategory>(
    () => parseCategory(searchParams.get("category")),
  );

  useEffect(() => {
    setActiveCategory(parseCategory(searchParams.get("category")));
  }, [searchParams]);

  const setCategory = (cat: "All" | BlogCategory) => {
    setActiveCategory(cat);
    const params = new URLSearchParams(searchParams.toString());
    if (cat === "All") params.delete("category");
    else params.set("category", cat);
    const qs = params.toString();
    router.replace(qs ? `/blogs?${qs}` : "/blogs", { scroll: false });
  };

  const filtered = useMemo(() => {
    if (activeCategory === "All") return blogPosts.map(show);
    return blogPosts.filter((p) => p.category === activeCategory).map(show);
  }, [activeCategory, locale]);

  const gridPosts =
    activeCategory === "All" ? latest : filtered.slice(0, 8);

  return (
    <>
      {/* Featured */}
      <section className="bg-[#f4f4f2] py-14 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-lime-600 mb-8">
            <span className="h-px w-6 bg-lime-500" />
            {t("featured")}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6 lg:gap-8">
            {primary && (
              <article className="group rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm">
                <Link href={`/blogs/${primary.slug}`} className="block">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={primary.image}
                      alt={primary.title}
                      fill
                      sizes="(min-width: 1024px) 60vw, 100vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                    <span className="absolute top-4 left-4 rounded-full bg-lime-400 text-black text-[11px] font-bold px-3 py-1">
                      {primary.categoryLabel}
                    </span>
                  </div>
                </Link>
                <div className="p-6 sm:p-7">
                  <p className="text-xs text-gray-500 mb-2">{primary.readTime}</p>
                  <Link href={`/blogs/${primary.slug}`}>
                    <h2 className="text-xl sm:text-2xl lg:text-[1.7rem] font-bold text-[#111] leading-snug group-hover:text-[#14532d] transition">
                      {primary.title}
                    </h2>
                  </Link>
                  <p className="mt-3 text-sm text-gray-600 leading-relaxed line-clamp-3">
                    {primary.excerpt}
                  </p>
                  <Link
                    href={`/blogs/${primary.slug}`}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-lime-600 hover:text-lime-700"
                  >
                    {t("readArticle")}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            )}

            <div className="flex flex-col gap-6">
              {secondary.map((post) => (
                <article
                  key={post.slug}
                  className="group flex flex-col sm:flex-row gap-4 rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm p-3 sm:p-4"
                >
                  <Link
                    href={`/blogs/${post.slug}`}
                    className="relative shrink-0 w-full sm:w-[160px] aspect-[4/3] sm:aspect-square rounded-xl overflow-hidden"
                  >
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="160px"
                      className="object-cover transition duration-500 group-hover:scale-[1.04]"
                    />
                  </Link>
                  <div className="flex flex-col justify-center min-w-0 py-1 pr-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="rounded-full bg-lime-400 text-black text-[10px] font-bold px-2.5 py-0.5">
                        {post.categoryLabel}
                      </span>
                      <span className="text-[11px] text-gray-500">
                        {post.readTime}
                      </span>
                    </div>
                    <Link href={`/blogs/${post.slug}`}>
                      <h3 className="text-base sm:text-lg font-bold text-[#111] leading-snug line-clamp-2 group-hover:text-[#14532d] transition">
                        {post.title}
                      </h3>
                    </Link>
                    <p className="mt-1.5 text-xs text-gray-500 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <Link
                      href={`/blogs/${post.slug}`}
                      className="mt-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-lime-400 text-black hover:bg-lime-300 transition self-start"
                      aria-label={t("readNamed", { title: post.title })}
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section
        id="browse-category"
        className="bg-[#f4f4f2] pb-10 sm:pb-12 scroll-mt-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-lime-600 mb-5">
            <span className="h-px w-6 bg-lime-500" />
            {t("browse")}
          </p>
          <div className="flex flex-wrap gap-2.5">
            {BLOG_CATEGORIES.map((cat) => {
              const active = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition border ${
                    active
                      ? "bg-lime-400 border-lime-400 text-black"
                      : "bg-white border-gray-200 text-gray-700 hover:border-lime-300"
                  }`}
                >
                  {t(`categories.${cat}`)}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Latest / filtered grid */}
      <section
        id="latest-articles"
        className="bg-[#1a1f18] text-white py-14 sm:py-16 lg:py-20 scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-lime-400 mb-3">
                <span className="h-px w-6 bg-lime-400" />
                {t("latest")}
              </p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
                {t("explore")}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setCategory("All")}
              className="inline-flex items-center gap-2 text-sm font-semibold text-lime-400 hover:text-lime-300 self-start sm:self-auto"
            >
              {t("viewAll")}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {gridPosts.map((post) => (
                <article key={post.slug} className="group">
                  <Link href={`/blogs/${post.slug}`} className="block">
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        sizes="(min-width: 1024px) 25vw, 50vw"
                        className="object-cover transition duration-500 group-hover:scale-[1.04]"
                      />
                      <span className="absolute bottom-3 left-3 rounded-full bg-lime-400 text-black text-[10px] font-bold px-2.5 py-1">
                        {post.categoryLabel}
                      </span>
                    </div>
                    <p className="text-[11px] text-white/50 mb-2">
                      {post.readTime}
                    </p>
                    <h3 className="text-base sm:text-lg font-bold leading-snug group-hover:text-lime-300 transition line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-sm text-white/55 leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                  </Link>
                </article>
            ))}
          </div>

          {activeCategory !== "All" && filtered.length === 0 && (
            <p className="text-sm text-white/50">
              {t("empty")}
            </p>
          )}
        </div>
      </section>
    </>
  );
}
