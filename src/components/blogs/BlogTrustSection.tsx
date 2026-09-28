import {
  RiUserHeartLine,
  RiBookOpenLine,
  RiShieldCheckLine,
} from "react-icons/ri";

const items = [
  {
    icon: RiUserHeartLine,
    title: "100K+ Monthly Readers",
    body: "A growing community of buyers, investors, and homeowners learning with HousingSaga.",
  },
  {
    icon: RiBookOpenLine,
    title: "Expert Curated Content",
    body: "Guides and insights written with on-ground market experience across Greece.",
  },
  {
    icon: RiShieldCheckLine,
    title: "Trusted & Transparent",
    body: "Clear explanations — no hype — so you can make confident property decisions.",
  },
];

export default function BlogTrustSection() {
  return (
    <section className="relative overflow-hidden bg-[#12150f] text-white py-14 sm:py-16">
      <div
        className="absolute inset-0 opacity-30 bg-cover bg-center"
        style={{ backgroundImage: "url(/faq.jpg)" }}
      />
      <div className="absolute inset-0 bg-[#12150f]/85" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-lime-400 mb-3">
          <span className="h-px w-6 bg-lime-400" />
          Why Readers Trust HousingSaga
        </p>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-10">
          Trusted Insights. Real Value.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {items.map(({ icon: Icon, title, body }) => (
            <div key={title} className="min-w-0">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-lime-400/15 text-lime-400 mb-4">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="text-lg font-bold text-lime-300 mb-2">{title}</h3>
              <p className="text-sm text-white/65 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
