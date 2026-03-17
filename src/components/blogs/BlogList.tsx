const posts = [
  {
    title: "How To Evaluate A Property Investment",
    excerpt:
      "Key metrics and signals to review before committing to your next real estate purchase.",
    category: "Guides",
    readTime: "7 min read",
  },
  {
    title: "Understanding Market Cycles In Real Estate",
    excerpt:
      "Learn how market cycles influence pricing, demand, and long-term portfolio planning.",
    category: "Insights",
    readTime: "5 min read",
  },
  {
    title: "Maximizing Rental Yield On Your Property",
    excerpt:
      "Practical steps to improve occupancy, pricing, and tenant satisfaction.",
    category: "Owners",
    readTime: "6 min read",
  },
];

export default function BlogList() {
  return (
    <section className="bg-white text-[#111] py-20 sm:py-24 lg:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-10 sm:mb-12">
          <p className="text-xs sm:text-sm text-lime-500 mb-3 uppercase tracking-[0.22em]">
            Latest Posts
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
            Insights From Our Experts
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {posts.map((post) => (
            <article
              key={post.title}
              className="rounded-2xl border border-gray-200 bg-[#f5f5f5] p-6 sm:p-7 flex flex-col justify-between"
            >
              <div>
                <p className="text-xs text-gray-500 mb-2">
                  {post.category} • {post.readTime}
                </p>
                <h3 className="text-lg sm:text-xl font-semibold mb-3">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-600">{post.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

