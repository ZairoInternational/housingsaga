const AboutSecond = () => {
  return (
    <section className="py-20 bg-white dark:bg-[#0f0f0f]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        {/* Section label */}
        <p className="text-lime-500 font-semibold uppercase tracking-widest text-xs mb-4">
          Our Story
        </p>

        {/* Headline */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-14 max-w-2xl leading-snug">
          Greece's most trusted partner for real estate &amp; Golden Visa
          investment
        </h2>

        {/* Divider */}
        <div className="w-full h-px bg-gray-100 dark:bg-white/10 mb-14" />

        {/* Two-column text */}
        <div className="grid md:grid-cols-2 gap-10 md:gap-20">
          <p className="text-gray-500 dark:text-gray-400 leading-[1.85] text-[15.5px]">
            At{" "}
            <span className="text-lime-500 font-semibold">
              HousingSaga Group
            </span>
            , we make real estate investment in Greece simple, secure, and
            rewarding. Our experienced team guides you through every step — from
            property selection to Golden Visa approval. We provide personalised
            solutions for renovation, interior design, furnishing, and property
            management, tailored to your goals and investment strategy.
          </p>
          <p className="text-gray-500 dark:text-gray-400 leading-[1.85] text-[15.5px]">
            We work with trusted developers, suppliers, and contractors to
            ensure quality, reliability, and transparency. Beyond property, we
            assist with bank accounts, insurance, and family needs — including
            schools and universities. Your success and satisfaction are our
            priority, and we are here whenever you need us.
          </p>
        </div>

        {/* Stats row */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "18+", label: "Years of Experience" },
            { value: "500+", label: "Clients Served" },
            { value: "3", label: "Greek Island Markets" },
            { value: "100%", label: "Dedicated to You" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="border border-gray-100 dark:border-white/10 rounded-xl p-6 hover:border-lime-400/50 transition-colors duration-300"
            >
              <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSecond;
