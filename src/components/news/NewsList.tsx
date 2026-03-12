const articles = [
  {
    title: "HousingSaga Expands To New Metros",
    excerpt:
      "We are now supporting property owners and buyers across multiple new metropolitan regions with localized insights.",
    date: "March 2026",
    category: "Company",
  },
  {
    title: "New Tools For Property Owners",
    excerpt:
      "A suite of analytics and listing optimization features designed to boost visibility and conversion.",
    date: "February 2026",
    category: "Product",
  },
  {
    title: "Partnerships With Leading Agencies",
    excerpt:
      "We have onboarded key partners to bring curated, high-quality listings to our users.",
    date: "January 2026",
    category: "Partners",
  },
];

export default function NewsList() {
  return (
    <section className="bg-[#f5f5f5] text-[#111] py-20 sm:py-24 lg:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-10 sm:mb-12">
          <p className="text-xs sm:text-sm text-emerald-500 mb-3 uppercase tracking-[0.22em]">
            Company News
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
            What&apos;s New At HousingSaga
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {articles.map((article) => (
            <article
              key={article.title}
              className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-7 flex flex-col justify-between"
            >
              <div>
                <p className="text-xs text-gray-500 mb-2">
                  {article.date} • {article.category}
                </p>
                <h3 className="text-lg sm:text-xl font-semibold mb-3">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-600">{article.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

