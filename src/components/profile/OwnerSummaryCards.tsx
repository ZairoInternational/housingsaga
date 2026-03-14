import { RiHome4Line, RiBuilding2Line, RiTimeLine } from "react-icons/ri";

interface OwnerSummaryCardsProps {
  totalListings?: number;
  activeListings?: number;
  pendingListings?: number;
}

export default function OwnerSummaryCards({
  totalListings = 0,
  activeListings = 0,
  pendingListings = 0,
}: OwnerSummaryCardsProps) {
  const stats = [
    {
      label: "Total listings",
      value: totalListings,
      icon: RiHome4Line,
      accent: "text-emerald-600 dark:text-emerald-400",
      iconBg: "bg-emerald-50 dark:bg-emerald-500/10",
      bar: "bg-emerald-500",
      barWidth: totalListings > 0 ? "100%" : "0%",
    },
    {
      label: "Active listings",
      value: activeListings,
      icon: RiBuilding2Line,
      accent: "text-sky-600 dark:text-sky-400",
      iconBg: "bg-sky-50 dark:bg-sky-500/10",
      bar: "bg-sky-500",
      barWidth:
        totalListings > 0
          ? `${Math.round((activeListings / totalListings) * 100)}%`
          : "0%",
    },
    {
      label: "Pending review",
      value: pendingListings,
      icon: RiTimeLine,
      accent: "text-amber-600 dark:text-amber-400",
      iconBg: "bg-amber-50 dark:bg-amber-500/10",
      bar: "bg-amber-500",
      barWidth:
        totalListings > 0
          ? `${Math.round((pendingListings / totalListings) * 100)}%`
          : "0%",
    },
  ];

  return (
    <section className="py-10">
      <div className="mb-8">
        <p className="text-lime-500 font-semibold uppercase tracking-widest text-xs mb-3">
          Portfolio Overview
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
          A quick look at your property activity
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
              <div
                className={`h-full rounded-full ${stat.bar} transition-all duration-700`}
                style={{ width: stat.barWidth }}
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
