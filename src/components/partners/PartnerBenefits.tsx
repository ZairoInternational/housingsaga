const items = [
  {
    title: "Expanded Visibility",
    description:
      "Showcase your listings to a wider audience of serious buyers and renters across key markets.",
  },
  {
    title: "Performance Insights",
    description:
      "Access high-level engagement metrics to understand how your properties perform over time.",
  },
  {
    title: "Dedicated Support",
    description:
      "Work with a specialist team focused on making your partnership successful.",
  },
];

export default function PartnerBenefits() {
  return (
    <section className="bg-white text-[#111] py-20 sm:py-24 lg:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-10 sm:mb-12">
          <p className="text-xs sm:text-sm text-emerald-500 mb-3 uppercase tracking-[0.22em]">
            Partner With Us
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
            Why Agencies Choose HousingSaga
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {items.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-gray-200 bg-[#f5f5f5] p-6 sm:p-7"
            >
              <h3 className="text-lg sm:text-xl font-semibold mb-3">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

