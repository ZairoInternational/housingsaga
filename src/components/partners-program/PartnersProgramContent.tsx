const tiers = [
  {
    name: "Standard Partner",
    description: "Ideal for local agencies listing a small portfolio of properties.",
    perks: ["Branded profile", "Standard listing visibility", "Email support"],
  },
  {
    name: "Preferred Partner",
    description: "For agencies with growing portfolios and regional presence.",
    perks: [
      "Priority visibility",
      "Featured placements on selected pages",
      "Dedicated partner success contact",
    ],
  },
  {
    name: "Strategic Partner",
    description: "Designed for large networks and national-level partners.",
    perks: [
      "Custom integrations",
      "Co-branded campaigns",
      "Strategic reporting and quarterly reviews",
    ],
  },
];

export default function PartnersProgramContent() {
  return (
    <section className="bg-[#f5f5f5] text-[#111] py-20 sm:py-24 lg:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-10 sm:mb-12">
          <p className="text-xs sm:text-sm text-emerald-500 mb-3 uppercase tracking-[0.22em]">
            Program Overview
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
            HousingSaga Partner Program
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-7 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-3">
                  {tier.name}
                </h3>
                <p className="text-sm text-gray-600 mb-4">{tier.description}</p>
                <ul className="space-y-2 text-sm text-gray-700">
                  {tier.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

