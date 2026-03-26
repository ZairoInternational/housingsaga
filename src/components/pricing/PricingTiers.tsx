import PricingCheckoutButton from "./PricingCheckoutButton";
import type { ReactNode } from "react";
import { Suspense } from "react";

type PricingTiersProps = {
  eyebrow: string;
  title: ReactNode;
  description: string;
};

export default function PricingTiers({
  eyebrow,
  title,
  description,
}: PricingTiersProps) {
  return (
    <section className="py-20 sm:py-24 lg:py-28">
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div className="mb-16 text-center">
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

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* 🔵 LEFT: MAIN PRICING CARD */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 rounded-2xl border border-lime-400 bg-white/5 p-8 flex flex-col justify-between h-full">
              <div>
                <h3 className="text-xl font-semibold mb-3">
                  Property Listing Fee
                </h3>

                <p className="text-gray-400 text-sm mb-6">
                  One-time onboarding fee to list your property and reach
                  serious global investors.
                </p>

                <p className="text-4xl font-semibold mb-6">€200</p>

                <ul className="space-y-3 text-sm text-gray-700 mb-8">
                  <li className="flex gap-2">
                    <span className="h-1.5 w-1.5 mt-2 bg-lime-400 rounded-full" />
                    Verified property onboarding
                  </li>
                  <li className="flex gap-2">
                    <span className="h-1.5 w-1.5 mt-2 bg-lime-400 rounded-full" />
                    Global investor exposure
                  </li>
                  <li className="flex gap-2">
                    <span className="h-1.5 w-1.5 mt-2 bg-lime-400 rounded-full" />
                    Golden Visa buyer targeting
                  </li>
                </ul>
              </div>

              <Suspense fallback={null}>
                <PricingCheckoutButton
                  planSlug="property-listing"
                  label="Pay & Continue"
                  highlighted
                />
              </Suspense>
            </div>
          </div>

          {/* 🟢 RIGHT: EXPLANATION + VALUE */}
          <div className="lg:col-span-3 space-y-8">
            {/* Success-Based Commission */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-7">
              <h3 className="text-lg font-semibold mb-2">
                Success-Based Commission
              </h3>
              <p className="text-gray-700 text-sm mb-4">
                We only succeed when you do. Our commission aligns with your
                final sale.
              </p>
              <p className="text-lime-400 font-semibold">
                4% on final sale value
              </p>
            </div>

            {/* Value Section */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-7">
              <h3 className="text-lg font-semibold mb-4">What You Get</h3>

              <ul className="grid sm:grid-cols-2 gap-3 text-sm text-gray-600">
                <li>✔ Verified global investors</li>
                <li>✔ Greece Golden Visa buyers</li>
                <li>✔ Professional deal handling</li>
                <li>✔ Cross-border expertise</li>
                <li>✔ No hidden charges</li>
                <li>✔ Full transparency</li>
              </ul>
            </div>

            {/* Trust Box */}
            <div className="rounded-2xl border border-lime-400/30 bg-lime-400/5 p-7">
              <h3 className="text-lg font-semibold mb-2 text-lime-400">
                Why This Fee Exists
              </h3>
              <p className="text-sm text-gray-800">
                This ensures only serious property listings enter the platform,
                maintaining high quality and attracting genuine international
                buyers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
