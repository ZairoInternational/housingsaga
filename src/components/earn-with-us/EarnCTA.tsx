import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

export default function EarnCTA() {
  return (
    <section className="bg-white px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <Reveal>
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-3xl bg-[#07110e] text-white lg:grid-cols-[minmax(0,1.15fr)_minmax(240px,0.75fr)]">
          <div className="order-2 px-6 py-10 sm:px-10 sm:py-12 lg:order-1">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-lime-400">
              Your property. Your rental income.
            </p>
            <h2 className="mt-3 max-w-xl text-3xl font-extrabold tracking-tight sm:text-4xl">
              Buy the property. Let it work for you.
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/70 sm:text-base">
              Buy with HousingSaga. Rent with VacationSaga. HousingSaga buyers
              pay a 0% management fee.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/projects"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-lime-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-lime-600"
              >
                Explore HousingSaga homes
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#estimator"
                className="inline-flex items-center justify-center rounded-full border border-white/25 px-5 py-2.5 text-sm font-semibold transition hover:bg-white/10"
              >
                Calculate my return
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-white/25 px-5 py-2.5 text-sm font-semibold transition hover:bg-white/10"
              >
                Talk to an advisor
              </Link>
            </div>
          </div>
          <div className="relative order-1 min-h-64 sm:min-h-72 lg:order-2 lg:min-h-0">
            <Image
              src="/footer-villa-bg.jpg"
              alt="Coastal evening view from a villa"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
