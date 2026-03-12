const items = [
  {
    title: "Logo Pack",
    description: "Primary and secondary HousingSaga logos in PNG and SVG formats.",
  },
  {
    title: "Brand Guidelines",
    description: "Usage rules, clear space, and color specifications for the brand.",
  },
  {
    title: "Product Screens",
    description: "High-resolution product and UI screenshots for media coverage.",
  },
];

export default function MediaAssets() {
  return (
    <section className="bg-[#f5f5f5] text-[#111] py-20 sm:py-24 lg:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-10 sm:mb-12">
          <p className="text-xs sm:text-sm text-emerald-500 mb-3 uppercase tracking-[0.22em]">
            Brand Resources
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
            Ready-To-Use Media Assets
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {items.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-7"
            >
              <h3 className="text-lg sm:text-xl font-semibold mb-3">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 mb-4">{item.description}</p>
              <button className="inline-flex items-center justify-center rounded-full px-4 py-2 text-xs sm:text-sm font-medium bg-emerald-500 hover:bg-emerald-600 text-white transition">
                Request Access
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

