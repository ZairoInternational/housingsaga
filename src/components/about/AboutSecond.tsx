const AboutSecond = () => {
  return (
    <section className="py-20 bg-white dark:bg-[#0f0f0f]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        {/* Section label */}
        <p className="text-lime-500 font-semibold uppercase tracking-widest text-xs mb-4">
          Why Choose Housing Saga
        </p>

        {/* Headline */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-14 max-w-2xl leading-snug">
          Greece Golden Visa Experts for
          <br />
          Indian Investors
        </h2>

        {/* Divider */}
        <div className="w-full h-px bg-gray-100 dark:bg-white/10 mb-14" />

        {/* Two-column text */}
        <div className="grid md:grid-cols-2 gap-10 md:gap-20">
          <p className="text-gray-500 dark:text-gray-400 leading-[1.85] text-[15.5px]">
            At Housing Saga, we specialize in helping Indian investors access
            Greece Golden Visa opportunities through strategic real estate
            investment. As a trusted international real estate advisory, we
            provide a seamless pathway for obtaining European residency
            through property investment in Greece.
          </p>
          <p className="text-gray-500 dark:text-gray-400 leading-[1.85] text-[15.5px]">
            With a strong focus on Greece Golden Visa services for Indians,
            Housing Saga acts as a bridge between India and Greece, offering a
            secure, transparent, and fully managed investment experience. We
            combine local expertise in Greece with personalized client support
            in India, simplifying international property investment for
            Indian clients.
          </p>
        </div>

        {/* Our expertise */}
        <div className="mt-14">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Our Expertise
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Greece Golden Visa Program
              </h4>
              <p className="text-gray-500 dark:text-gray-400 leading-[1.85] text-[15.5px]">
                We provide end-to-end assistance for the Greece Golden Visa
                program, one of the most popular residency by investment
                options for Indians.
              </p>
              <ul className="mt-4 space-y-2 list-disc pl-5 text-gray-500 dark:text-gray-400 leading-relaxed text-[15.5px]">
                <li>Property selection aligned with Golden Visa requirements</li>
                <li>Legal due diligence and compliance checks</li>
                <li>Golden Visa application processing</li>
                <li>Coordination with Greek authorities and legal partners</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                International Real Estate Investment in Greece
              </h4>
              <p className="text-gray-500 dark:text-gray-400 leading-[1.85] text-[15.5px]">
                Housing Saga offers access to verified, high-growth real estate
                opportunities in Greece, including:
              </p>
              <ul className="mt-4 space-y-2 list-disc pl-5 text-gray-500 dark:text-gray-400 leading-relaxed text-[15.5px]">
                <li>Athens (Attica Region)</li>
                <li>Thessaloniki</li>
                <li>Mykonos &amp; Santorini</li>
                <li>Emerging high-return locations</li>
              </ul>
              <p className="mt-4 text-gray-500 dark:text-gray-400 leading-[1.85] text-[15.5px]">
                Each property is carefully selected to meet Golden Visa
                eligibility and investment potential.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Our Strength – Local Presence in Greece
              </h4>
              <p className="text-gray-500 dark:text-gray-400 leading-[1.85] text-[15.5px]">
                What sets Housing Saga apart is our strong on-ground network in
                Greece. We collaborate with:
              </p>
              <ul className="mt-4 space-y-2 list-disc pl-5 text-gray-500 dark:text-gray-400 leading-relaxed text-[15.5px]">
                <li>Licensed Greek real estate professionals</li>
                <li>Legal and immigration experts</li>
                <li>Property management companies</li>
              </ul>
              <p className="mt-4 text-gray-500 dark:text-gray-400 leading-[1.85] text-[15.5px]">
                This ensures:
              </p>
              <ul className="mt-2 space-y-2 list-disc pl-5 text-gray-500 dark:text-gray-400 leading-relaxed text-[15.5px]">
                <li>Verified Golden Visa eligible properties</li>
                <li>100% legal compliance</li>
                <li>Faster processing and execution</li>
                <li>Smooth coordination with Greek authorities</li>
              </ul>
            </div>
          </div>

          <div className="mt-14">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Why Choose Housing Saga
            </h3>
            <ul className="space-y-2 list-disc pl-5 text-gray-500 dark:text-gray-400 leading-relaxed text-[15.5px]">
              <li>Experts in Greece Golden Visa for Indian investors</li>
              <li>End-to-end support from India to Greece</li>
              <li>Verified and legally compliant properties</li>
              <li>Transparent pricing with no hidden charges</li>
              <li>Faster processing through local partnerships</li>
              <li>Dedicated advisory for investment and residency</li>
            </ul>
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "100%", label: "Legally compliant properties" },
            { value: "4%", label: "Success-based commission only" },
            { value: "€200", label: "One-time listing fee" },
            { value: "2", label: "Countries / India & Greece" },
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
