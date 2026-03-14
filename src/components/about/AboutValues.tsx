const values = [
  {
    icon: "🔍",
    title: "Transparency",
    description:
      "We believe every client deserves complete clarity — no hidden fees, no surprises. Just honest, straightforward guidance at every step.",
  },
  {
    icon: "🛡️",
    title: "Trust",
    description:
      "With 18+ years of experience, our reputation is built on reliability. We only recommend developers and properties we genuinely stand behind.",
  },
  {
    icon: "🎯",
    title: "Personalisation",
    description:
      "No two clients are the same. We tailor every solution — from property selection to Golden Visa strategy — to your unique goals.",
  },
  {
    icon: "🌐",
    title: "Global Network",
    description:
      "Our connections span legal, architectural, financial, and design fields, giving you a one-stop service that removes complexity.",
  },
];

const AboutValues = () => {
  return (
    <section className="py-20 bg-white dark:bg-[#0f0f0f]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="mb-14">
          <p className="text-lime-500 font-semibold uppercase tracking-widest text-xs mb-4">
            What Drives Us
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white max-w-xl leading-snug">
            Our core values, reflected in every deal
          </h2>
        </div>
        {/* Values grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v) => (
            <div
              key={v.title}
              className="group border border-gray-100 dark:border-white/10 rounded-2xl p-7 hover:border-lime-400/60 hover:shadow-lg hover:shadow-lime-400/5 transition-all duration-300"
            >
              <span className="text-3xl mb-5 block">{v.icon}</span>
              <h3 className="text-gray-900 dark:text-white font-semibold text-lg mb-3 group-hover:text-lime-500 transition-colors duration-200">
                {v.title}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                {v.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutValues;
