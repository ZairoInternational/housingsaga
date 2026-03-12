import Image from "next/image";

const AboutFounder = () => {
  return (
    <section className="bg-gray-50 dark:bg-[#141414] py-20">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        {/* Section label */}
        <p className="text-lime-500 font-semibold uppercase tracking-widest text-xs mb-4">
          Meet the Founder
        </p>

        <div className="grid lg:grid-cols-2 gap-14 xl:gap-20 items-start">
          {/* Image column */}
          <div className="relative">
            {/* Decorative lime accent behind image */}
            <div className="absolute -top-4 -left-4 w-2/3 h-2/3 bg-lime-400/10 rounded-2xl -z-10" />

            <div className="relative w-full h-[480px] lg:h-[640px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/about1.jpg"
                alt="Zaid Bin Hashmat – Founder"
                fill
                className="object-cover"
                priority
              />
              {/* subtle bottom gradient so name badge reads clearly */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Name badge */}
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white text-xl font-bold leading-tight">
                  Zaid Bin Hashmat
                </p>
                <p className="text-lime-400 text-sm mt-1">
                  Founder &amp; CEO · 18+ Years in Real Estate
                </p>
              </div>
            </div>
          </div>

          {/* Content column */}
          <div className="pt-2 lg:pt-6">
            <h2 className="text-3xl lg:text-[2.6rem] font-bold text-gray-900 dark:text-white mb-8 leading-snug">
              Building trust, one{" "}
              <span className="text-lime-500">property</span> at a time
            </h2>

            <div className="space-y-5 text-gray-500 dark:text-gray-400 leading-[1.85] text-[15.5px]">
              <p>
                I have been working in real estate for more than 18 years,
                building my career with dedication, honesty, and genuine care
                for every client. My journey began on the beautiful Greek
                islands of Crete, Corfu, and Rhodes, where I learned how
                important trust and personal connection are when helping people
                find their ideal home or investment.
              </p>

              <p>
                Over the years, I have built strong relationships with reliable
                partners and a professional team that I have been working with
                for many years. Together, we offer a full range of services —
                from legal and notary support to architecture, engineering, and
                interior design.
              </p>

              <p>
                I also have extensive experience in the{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  Greek Golden Visa investment field
                </span>
                , helping international clients successfully obtain residency
                through real estate investment.
              </p>

              <p>
                We work only with{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  reliable and proven developers
                </span>
                , ensuring that every project meets high standards of quality,
                safety, and value.
              </p>

              <p>
                Today, we proudly work with both local and international buyers,
                property owners, and investors — always providing honest advice
                and tailored solutions for each client.
              </p>
            </div>

            {/* Key highlights */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: "🇬🇷", label: "Greek Islands Expert" },
                { icon: "🏅", label: "Golden Visa Specialist" },
                { icon: "🤝", label: "Trusted by 500+ Clients" },
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutFounder;
