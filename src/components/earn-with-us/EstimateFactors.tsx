import { CalendarRange, Home, MapPin, Receipt, Wallet } from "lucide-react";
import Reveal from "./Reveal";

const factors = [
  {
    title: "Location",
    body: "Demand varies by area, season, and what guests will pay.",
    Icon: MapPin,
  },
  {
    title: "Property type",
    body: "Villas, apartments, and homes attract different monthly rents.",
    Icon: Home,
  },
  {
    title: "Monthly rent",
    body: "The estimate starts from the rent you expect in an occupied month.",
    Icon: Wallet,
  },
  {
    title: "Occupied months",
    body: "Typically 6–12 months a year, including time you use the home.",
    Icon: CalendarRange,
  },
  {
    title: "Operating costs",
    body: "Cleaning, utilities, and upkeep sit outside the 0% management fee.",
    Icon: Receipt,
  },
];

export default function EstimateFactors() {
  return (
    <section className="bg-white py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-lime-800">
            Clearly explained
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            What affects your estimate?
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Change any of these and the annual figure moves with it.
          </p>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {factors.map((factor, index) => (
            <Reveal key={factor.title} delay={index * 0.05}>
              <article className="h-full rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-lime-500 text-white">
                  <factor.Icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-slate-950">{factor.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-slate-600">{factor.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
