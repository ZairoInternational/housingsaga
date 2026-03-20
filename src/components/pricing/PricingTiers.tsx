type PricingTier = {
  name: string;
  description: string;
  price: string;
  features: string[];
  highlighted: boolean;
  buttonLabel: string;
  priceVariant?: "value" | "badge";
};

const ownerPricingTiers: PricingTier[] = [
  {
    name: "Property Listing Fee",
    description:
      "To ensure every listing on our platform meets high standards and attracts qualified buyers, we provide a structured onboarding process.",
    price: "€200 per property (one-time listing fee)",
    features: [
      "Property onboarding and verification",
      "Professional positioning for international investors",
      "Exposure to a network of serious Golden Visa and global buyers",
    ],
    highlighted: false,
    buttonLabel: "List Your Property",
  },
  {
    name: "Success-Based Commission",
    description:
      "Housing Saga operates on a performance-driven model, where our success is aligned with yours.",
    price: "4% commission on the final sale value",
    features: [
      "Buyer sourcing and targeted outreach",
      "Negotiation support and deal structuring",
      "End-to-end coordination until closure",
    ],
    highlighted: true,
    buttonLabel: "Start Your Selling Journey",
  },
  {
    name: "The Value You Receive",
    description:
      "By partnering with Housing Saga, property owners gain access to serious investors, targeted visibility, and streamlined transaction management.",
    price: "Transparency at Every Step",
    priceVariant: "badge",
    features: [
      "A global network of verified Indian and international investors",
      "Targeted visibility among Greece Golden Visa buyers",
      "Professional handling of inquiries and negotiations",
      "Streamlined transaction management",
      "Cross-border expertise from India to Greece",
      "No hidden costs",
      "No unexpected charges",
      "Complete clarity before every stage of engagement",
    ],
    highlighted: false,
    buttonLabel: "Connect with Housing Saga",
  },
];

type PricingTiersProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  tiers?: PricingTier[];
};

export default function PricingTiers({
  eyebrow = "Owner Pricing Plan",
  title = "Transparent Pricing, Built on Trust and Results",
  description = "At Housing Saga, our pricing reflects transparency, value, and performance-driven results, aligned with your success from listing to closure.",
  tiers = ownerPricingTiers,
}: PricingTiersProps) {
  return (
    <section className="bg-[#0f1115] text-white py-20 sm:py-24 lg:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12 text-center">
          <p className="text-xs sm:text-sm text-lime-400 mb-3 uppercase tracking-[0.22em]">
            {eyebrow}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight mb-3">
            {title}
          </h2>
          <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-2xl border ${
                tier.highlighted ? "border-lime-400 bg-white/5" : "border-white/10 bg-white/5"
              } p-7 sm:p-8 flex flex-col justify-between`}
            >
              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">{tier.name}</h3>
                <p className="text-sm text-gray-400 mb-5">{tier.description}</p>
                {tier.priceVariant === "badge" ? (
                  <p className="inline-flex items-center justify-center rounded-full bg-lime-400/15 border border-lime-400/30 text-lime-400 px-4 py-2 text-sm sm:text-base font-semibold mb-5">
                    {tier.price}
                  </p>
                ) : (
                  <p className="text-3xl sm:text-4xl font-semibold mb-5">
                    {tier.price}
                  </p>
                )}
                <ul className="space-y-2 text-sm text-gray-300">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-lime-400" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                className={`mt-8 inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium transition ${
                  tier.highlighted
                    ? "bg-lime-400 text-black hover:bg-lime-300"
                    : "bg-white/10 hover:bg-white/20 text-white"
                }`}
              >
                {tier.buttonLabel}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

