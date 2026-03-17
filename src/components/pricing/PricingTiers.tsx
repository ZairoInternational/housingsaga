type PricingTier = {
  name: string;
  description: string;
  price: string;
  features: string[];
  highlighted: boolean;
};

const pricingTiers: PricingTier[] = [
  {
    name: "Basic",
    description: "Perfect for first-time owners listing a single property.",
    price: "Free",
    features: ["1 active property", "Standard listing visibility", "Email support"],
    highlighted: false,
  },
  {
    name: "Professional",
    description: "For growing portfolios and serious investors.",
    price: "₹1,999/mo",
    features: [
      "Up to 10 active properties",
      "Priority listing placement",
      "Advanced analytics overview",
      "Priority support",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    description: "Tailored solutions for agencies and large portfolios.",
    price: "Talk to us",
    features: [
      "Unlimited active properties",
      "Dedicated account manager",
      "Custom integrations",
      "Onboarding & training",
    ],
    highlighted: false,
  },
];

export default function PricingTiers() {
  return (
    <section className="bg-[#0f1115] text-white py-20 sm:py-24 lg:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12 text-center">
          <p className="text-xs sm:text-sm text-lime-400 mb-3 uppercase tracking-[0.22em]">
            Plans For Every Journey
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight mb-3">
            Choose The Right Plan
          </h2>
          <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto">
            Start free and upgrade when you&apos;re ready. Our pricing is designed to support
            you from your first listing to a full portfolio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {pricingTiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-2xl border ${
                tier.highlighted ? "border-lime-400 bg-white/5" : "border-white/10 bg-white/5"
              } p-7 sm:p-8 flex flex-col justify-between`}
            >
              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">{tier.name}</h3>
                <p className="text-sm text-gray-400 mb-5">{tier.description}</p>
                <p className="text-3xl sm:text-4xl font-semibold mb-5">{tier.price}</p>
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
                {tier.price === "Talk to us" ? "Contact sales" : "Get started"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

