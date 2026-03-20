import Image from "next/image";

const AboutFounder = () => {
  return (
    <section className="bg-gray-50 dark:bg-[#141414] py-20">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        {/* Section label */}
        <p className="text-lime-500 font-semibold uppercase tracking-widest text-xs mb-4">
          Our Mission & Vision
        </p>

        <div className="grid lg:grid-cols-2 gap-14 xl:gap-20 items-start">
          {/* Image column */}
          <div className="relative">
            {/* Decorative lime accent behind image */}
            <div className="absolute -top-4 -left-4 w-2/3 h-2/3 bg-lime-400/10 rounded-2xl -z-10" />

            <div className="relative w-full h-[480px] lg:h-[640px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/about1.jpg"
                alt="Housing Saga Team"
                fill
                className="object-cover"
                priority
              />
              {/* subtle bottom gradient so name badge reads clearly */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Name badge */}
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white text-xl font-bold leading-tight">
                  Housing Saga
                </p>
                <p className="text-lime-400 text-sm mt-1">
                  Greece Golden Visa Experts · India to Greece
                </p>
              </div>
            </div>
          </div>

          {/* Content column */}
          <div className="pt-2 lg:pt-6">
            <h2 className="text-3xl lg:text-[2.6rem] font-bold text-gray-900 dark:text-white mb-8 leading-snug">
              Simplifying the{" "}
              <span className="text-lime-500">Greece Golden Visa</span>{" "}
              Journey
            </h2>

            <div className="space-y-5 text-gray-500 dark:text-gray-400 leading-[1.85] text-[15.5px]">
              <p>
                Our Mission: To simplify Greece Golden Visa investment for
                Indian clients by providing:
                <br />
                <span className="text-gray-900 dark:text-white font-semibold">
                  • Secure and transparent investment opportunities
                  <br />
                  • Verified and compliant real estate solutions
                  <br />
                  • Hassle-free residency application support
                </span>
              </p>

              <p>
                Our Vision: To become a leading global platform for residency
                by investment and international real estate, helping Indian
                investors expand their presence across Europe and beyond.
              </p>

              <p>
                Our Approach: At Housing Saga, we believe that international
                property investment should be simple, secure, and strategic.
                <br />
                <span className="text-gray-900 dark:text-white font-semibold">
                  • Trust and transparency
                  <br />
                  • Legal compliance and due diligence
                  <br />
                  • Efficient execution through local expertise
                  <br />
                  • Client-first investment solutions
                </span>
              </p>
            </div>

            {/* Key highlights */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: "✓", label: "Trust and transparency" },
                { icon: "✓", label: "Legal compliance and due diligence" },
                { icon: "✓", label: "Efficient execution through local expertise" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-xl px-4 py-3 hover:border-lime-400/50 transition-colors duration-300"
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            <p className="mt-8 text-gray-500 dark:text-gray-400 leading-[1.85] text-[15.5px]">
              Whether you are looking for Greece Golden Visa residency,
              European travel freedom, or real estate investment in Greece,
              Housing Saga ensures a smooth, secure, and result-driven journey.
              Build Your European Future with Housing Saga. We help you not just
              invest, but unlock global opportunities.
            </p>

            <button className="mt-10 w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-lime-400 hover:bg-lime-300 text-black px-7 py-3 text-sm font-medium transition">
              Start Your Greece Golden Visa Journey Today with Housing Saga
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutFounder;
