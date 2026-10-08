import Image from "next/image";
import {
  BarChart3,
  Building2,
  MessageSquareText,
  Sparkles,
  Wrench,
} from "lucide-react";
import Reveal from "./Reveal";

const steps = [
  {
    label: "Listing & pricing",
    body: "The home is listed and the rate is set for the season.",
    Icon: Building2,
  },
  {
    label: "Guest communication",
    body: "Enquiries, booking messages, and check-in are handled.",
    Icon: MessageSquareText,
  },
  {
    label: "Cleaning",
    body: "Turnovers are coordinated with local partners.",
    Icon: Sparkles,
  },
  {
    label: "Maintenance",
    body: "Issues are reported and repairs are arranged.",
    Icon: Wrench,
  },
  {
    label: "Reporting",
    body: "You can follow bookings and income in one place.",
    Icon: BarChart3,
  },
];

const cards = [
  {
    title: "Smart listings",
    description: "Photos, copy, and pricing aimed at the guests who book this kind of home.",
    image: "/earn/earn-listings.jpg",
    alt: "Laptop showing photos of a villa listing on a terrace",
    Icon: Building2,
  },
  {
    title: "Guest support",
    description: "Someone answers guests so you are not managing the stay from abroad.",
    image: "/earn/earn-guests.jpg",
    alt: "Host handing keys to arriving guests at a villa door",
    Icon: MessageSquareText,
  },
  {
    title: "Cleaning",
    description: "A reliable clean between stays, arranged with the booking calendar.",
    image: "/earn/earn-cleaning.jpg",
    alt: "Housekeeper preparing fresh linens in a sea-view bedroom",
    Icon: Sparkles,
  },
  {
    title: "Maintenance",
    description: "Small problems get a local response before they become a cancelled stay.",
    image: "/earn/earn-maintenance.jpg",
    alt: "Technician repairing a shutter on a white villa",
    Icon: Wrench,
  },
  {
    title: "Reports",
    description: "A clear view of nights booked and income, without chasing spreadsheets.",
    image: "/earn/earn-reports.jpg",
    alt: "Owner reviewing booking and income charts on a tablet",
    Icon: BarChart3,
  },
];

export default function PropertyCanWork() {
  return (
    <section className="bg-[#f4f6f1] py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-lime-800">
            Full-service rental management
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl lg:text-[2.65rem] lg:leading-none">
            Your property can work while you&apos;re away
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            VacationSaga runs the rental. You keep the home, and HousingSaga
            buyers pay a 0% management fee.
          </p>
        </Reveal>

        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((step, index) => (
            <Reveal key={step.label} delay={index * 0.05}>
              <li className="h-full rounded-3xl border border-white bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-lime-500 text-white">
                    <step.Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <span className="text-sm font-semibold text-lime-800">0{index + 1}</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold leading-snug text-slate-950">
                  {step.label}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.body}</p>
              </li>
            </Reveal>
          ))}
        </ol>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
          {cards.map((card, index) => (
            <Reveal key={card.title} delay={index * 0.05}>
              <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.alt}
                    fill
                    sizes="(min-width: 1280px) 18vw, (min-width: 640px) 45vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-lime-500 text-white">
                    <card.Icon className="h-4 w-4" aria-hidden />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-slate-950">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{card.description}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
