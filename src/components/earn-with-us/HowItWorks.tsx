import { Check, Clock, Home, Settings, Trees } from "lucide-react";
import Reveal from "./Reveal";

const steps = [
  {
    step: "01",
    title: "Buy through HousingSaga",
    body: "Choose your ideal property from our curated listings.",
    Icon: Home,
  },
  {
    step: "02",
    title: "Choose VacationSaga",
    body: "Let us manage your property with professional vacation rental services.",
    Icon: Trees,
  },
  {
    step: "03",
    title: "We manage the rental",
    body: "Listings, guests, cleaning, maintenance and more.",
    Icon: Settings,
  },
  {
    step: "04",
    title: "You receive rental income",
    body: "Enjoy your share of the rental income, hassle-free.",
    Icon: Clock,
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-28 bg-white py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-lime-800">
            Simple. Transparent. No hidden fees.
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            How it works
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
            From buying to earning — it&apos;s a simple 4-step process.
          </p>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-12">
          {steps.map((item, index) => (
            <Reveal
              key={item.step}
              delay={index * 0.06}
              className="xl:col-span-2"
            >
              <article className="flex h-full flex-col rounded-2xl border border-slate-100 bg-slate-50/80 p-5 transition duration-300 hover:-translate-y-1 hover:shadow-md">
                <div className="mb-4 flex items-center gap-2.5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-lime-500 text-[11px] font-bold text-white">
                    {item.step}
                  </span>
                  <item.Icon className="h-5 w-5 text-slate-700" aria-hidden />
                </div>
                <h3 className="text-base font-semibold leading-snug text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {item.body}
                </p>
              </article>
            </Reveal>
          ))}

          <Reveal delay={0.24} className="sm:col-span-2 xl:col-span-4">
            <aside className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-base font-semibold text-slate-950">The key difference</h3>
              <div className="mt-4 grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="flex flex-col justify-between rounded-2xl bg-slate-50 p-4">
                  <h4 className="text-sm font-semibold leading-snug text-slate-900">
                    Standard VacationSaga customer
                  </h4>
                  <p className="mt-4 text-sm leading-relaxed text-slate-600">
                    A management fee applies, and it varies by property type.
                  </p>
                </div>
                <div className="flex flex-col justify-between rounded-2xl bg-lime-600 p-4 text-white">
                  <h4 className="text-sm font-semibold leading-snug">
                    HousingSaga property buyer
                  </h4>
                  <div className="mt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-4xl font-semibold leading-none">
                        0%
                      </span>
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-950 text-lime-400">
                        <Check className="h-3.5 w-3.5" aria-hidden />
                      </span>
                    </div>
                    <p className="mt-2 text-sm font-medium text-white">
                      management fee
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
