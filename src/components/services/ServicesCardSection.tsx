import { ArrowRight } from "lucide-react";

type ServiceCardData = {
  iconSrc: string;
  title: string;
  intro: string;
  bullets: string[];
  imageSrc: string;
  imageAlt: string;
};

const serviceCards: ServiceCardData[] = [
  {
    iconSrc: "/minimalist.png",
    title: "Greece Golden Visa Solutions",
    intro:
      "Complete assistance for obtaining European residency through the Greece Golden Visa program.",
    bullets: [
      "Detailed consultation on eligibility, investment thresholds, and program structure",
      "Step-by-step guidance on documentation and compliance requirements",
      "Coordination with Greek authorities for application submission",
      "Assistance with biometric appointments and residency issuance",

    ],
    imageSrc: "/about1.jpg",
    imageAlt: "Golden Visa journey",
  },
  {
    iconSrc: "/target.png",
    title: "Strategic Property Advisory",
    intro:
      "Well-informed investment guidance aligned with your goals—residency, rental income, or capital growth.",
    bullets: [
      "Understanding your investment purpose",
      "Identifying the most suitable locations and property types in Greece",
      "Recommending properties aligned with Golden Visa eligibility",
      "Insights into market trends, rental demand, and future appreciation",
    ],
    imageSrc: "/about2.jpg",
    imageAlt: "Advisory and property selection",
  },
  {
    iconSrc: "/premium.png",
    title: "Verified Property Access",
    intro:
      "Carefully curated, pre-verified properties evaluated for ownership, compliance, and Golden Visa eligibility.",
    bullets: [
      "Clear ownership and title verification",
      "Legal and regulatory compliance",
      "Eligibility under the Greece Golden Visa program",
      "Rental yield potential and market demand",
    ],
    imageSrc: "/about3.jpg",
    imageAlt: "Verified properties",
  },
];

export default function ServicesCardSection() {
  return (
    <section className="bg-[#f3f4f6] text-gray-900 py-16 sm:py-16 lg:py-18 overflow-hidden">
      <div className="max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 lg:gap-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 text-xs text-lime-500 mb-5 lg:mb-6 tracking-wide">
              <span className="w-2 h-2 rounded-full bg-lime-400 inline-block" />
              <span className="uppercase">Our Services</span>
            </div>

            <h2 className="text-[clamp(2.2rem,5vw,4.5rem)] font-medium leading-[1.1] tracking-tight">
              Comprehensive Solution for Greece Golden Visa
            </h2>
          </div>

          <div className="shrink-0">
            <div className="inline-flex items-center gap-2 bg-lime-400 hover:bg-lime-500 text-gray-900 px-5 sm:px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300">
              Secure the Greece Golden Visa
              <ArrowRight size={16} />
            </div>
          </div>
        </div>

        <div className="mt-8 sm:mt-16 lg:mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 lg:gap-5 items-start ">
          {serviceCards.map((card, index) => (
            <div
              key={card.title}
              className={`
      flex flex-col rounded-3xl bg-white/70 border border-gray-100 
      shadow-[0_20px_50px_rgba(0,0,0,0.06)]
      ${index === 0 ? "md:pb-0" : ""}
      ${index === 1 ? "md:pb-0" : ""}
      ${index === 2 ? "md:pb-0" : ""}
    `}
            >
              <div className="p-7 sm:p-8 flex flex-col">
                <div className="flex items-start gap-4 sm:gap-5">
                  <div className="w-14 h-14 flex items-center justify-center text-lime-500  shrink-0">
                    <img
                      src={card.iconSrc}
                      alt={`${card.title} icon`}
                      className="w-full h-full object-contain"
                      draggable={false}
                    />
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-xl sm:text-2xl font-semibold leading-snug mb-2">
                      {card.title}
                    </h3>
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {card.intro}
                  </p>
                </div>

                <ul className="mt-5 sm:mt-6 space-y-2 text-sm sm:text-base text-gray-600 leading-relaxed">
                  {card.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-lime-400 shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-7 sm:mt-8 rounded-2xl overflow-hidden h-[160px] sm:h-[200px]">
                  <img
                    src={card.imageSrc}
                    alt={card.imageAlt}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

