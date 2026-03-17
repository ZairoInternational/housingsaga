const highlights = [
  {
    title: "Earn Commissions",
    description:
      "Refer qualified buyers or owners and earn commissions for every successful listing or transaction.",
  },
  {
    title: "Simple Tracking",
    description:
      "Get transparent tracking and reporting so you always know how your referrals are performing.",
  },
  {
    title: "Marketing Support",
    description:
      "Access co-branded creatives and guidance to help you promote HousingSaga effectively.",
  },
];

export default function AffiliateProgramContent() {
  return (
    <section className="bg-white text-[#111] py-20 sm:py-24 lg:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-10 sm:mb-12">
          <p className="text-xs sm:text-sm text-lime-500 mb-3 uppercase tracking-[0.22em]">
            Affiliate Program
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
            Grow With HousingSaga
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {highlights.map((item) => (
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

