import Link from "next/link";
import {
  RiAddCircleLine,
  RiArrowRightLine,
  RiLightbulbLine,
} from "react-icons/ri";

export default function OwnerActions() {
  return (
    <section className="py-10">
      <div className="mb-8">
        <p className="text-lime-500 font-semibold uppercase tracking-widest text-xs mb-3">
          Next Steps
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
          Build a stronger owner presence
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr,360px] gap-5">
      {/* Main CTA card */}
      <article className="relative overflow-hidden rounded-2xl border border-gray-200 bg-[#f7f6f3] dark:border-white/8 dark:bg-[#13161f] px-7 py-7 shadow-sm">
        {/* Decorative gradient blob */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-lime-300/20 blur-3xl dark:bg-lime-400/10" />

        <div className="relative">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-lime-100 dark:bg-lime-500/10 px-3 py-1 text-xs font-semibold text-lime-700 dark:text-lime-400 mb-4">
            <RiAddCircleLine className="h-3.5 w-3.5" />
            Portfolio
          </span>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Grow your portfolio
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-md">
            List your properties to reach verified buyers, track interest, and
            manage all your listings from a single dashboard.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link href="/add-property">
              <button className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 active:scale-95 transition-all">
                <RiAddCircleLine className="h-4 w-4" />
                Add new property
              </button>
            </Link>
            <button className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              View listing tips
              <RiArrowRightLine className="h-4 w-4" />
            </button>
          </div>
        </div>
      </article>

      {/* Tip card */}
      <article className="relative overflow-hidden rounded-2xl border border-lime-200/70 dark:border-lime-500/15 bg-gradient-to-br from-lime-50 to-emerald-50/60 dark:from-lime-500/8 dark:to-emerald-500/5 px-6 py-6">
        <div className="flex items-start gap-3 mb-3">
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-lime-100 dark:bg-lime-500/15">
            <RiLightbulbLine className="h-4 w-4 text-lime-600 dark:text-lime-400" />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-lime-600 dark:text-lime-400 pt-1.5">
            Pro tip
          </span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
          Complete your listing details and upload high-quality photos to appear
          higher in buyer searches and get more inquiries.
        </p>
        <div className="mt-4 h-1.5 w-full rounded-full bg-lime-100 dark:bg-lime-500/15 overflow-hidden">
          <div className="h-full w-3/5 rounded-full bg-gradient-to-r from-lime-400 to-emerald-400" />
        </div>
        <p className="mt-1.5 text-xs text-lime-600/70 dark:text-lime-400/60">
          Profile completeness: 60%
        </p>
      </article>
      </div>
    </section>
  );
}
