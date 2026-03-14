import { RiHeartLine, RiSearchLine, RiSparklingLine } from "react-icons/ri";

interface BuyerSummaryCardsProps {
  savedHomes?: number;
  savedSearches?: number;
  recommendations?: number;
}

export default function BuyerSummaryCards({
  savedHomes = 0,
  savedSearches = 0,
  recommendations = 0,
}: BuyerSummaryCardsProps) {
  const stats = [
    {
      label: "Saved homes",
      value: savedHomes,
      icon: RiHeartLine,
      accent: "text-rose-600 dark:text-rose-400",
      iconBg: "bg-rose-50 dark:bg-rose-500/10",
      bar: "bg-rose-500",
    },
    {
      label: "Saved searches",
      value: savedSearches,
      icon: RiSearchLine,
      accent: "text-sky-600 dark:text-sky-400",
      iconBg: "bg-sky-50 dark:bg-sky-500/10",
      bar: "bg-sky-500",
    },
    {
      label: "Recommended",
      value: recommendations,
      icon: RiSparklingLine,
      accent: "text-violet-600 dark:text-violet-400",
      iconBg: "bg-violet-50 dark:bg-violet-500/10",
      bar: "bg-violet-500",
    },
  ];

  return (
    <section className="py-10">
      <div className="mb-8">
        <p className="text-lime-500 font-semibold uppercase tracking-widest text-xs mb-3">
          Buyer Activity
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
          Everything shaping your next move
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {stats.map((stat) => (
          <article
            key={stat.label}
            className="group relative rounded-2xl border border-gray-200 bg-[#f7f6f3] px-6 py-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-white/8 dark:bg-[#13161f]"
          >
            <div className="flex items-center justify-between gap-4 mb-6">
              <div
                className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl ${stat.iconBg}`}
              >
                <stat.icon className={`h-5 w-5 ${stat.accent}`} />
              </div>
              <span className={`text-4xl font-bold tabular-nums ${stat.accent}`}>
                {stat.value}
              </span>
            </div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">
              {stat.label}
            </p>
            <div className="h-1.5 w-full rounded-full bg-white dark:bg-white/6 overflow-hidden">
              <div className={`h-full w-1/3 rounded-full ${stat.bar}`} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
