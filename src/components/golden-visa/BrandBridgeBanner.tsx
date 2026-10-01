"use client";

import Link from "next/link";
import {
  FiCalendar,
  FiCheckCircle,
  FiHome,
  FiMapPin,
  FiNavigation2,
} from "react-icons/fi";

const VACATION_SAGA_URL =
  process.env.NEXT_PUBLIC_VACATION_SAGA_URL ?? "https://vacationsaga.com";

const features = [
  {
    title: "Holiday Homes",
    sub: "for your next escape",
    Icon: FiHome,
    tone: "orange" as const,
  },
  {
    title: "Flexible Stays",
    sub: "from days to months",
    Icon: FiCalendar,
    tone: "green" as const,
  },
  {
    title: "Top Destinations",
    sub: "across the world",
    Icon: FiMapPin,
    tone: "orange" as const,
  },
  {
    title: "Trusted & Verified",
    sub: "for a worry-free stay",
    Icon: FiCheckCircle,
    tone: "green" as const,
  },
];

/**
 * Brand bridge banner — HousingSaga × VacationSaga
 * Layout inspired by the provided creative (content left, curved collage right).
 */
export default function BrandBridgeBanner() {
  return (
    <section className="bg-[#0a0c10] py-8 sm:py-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-[1.25rem] sm:rounded-[1.75rem] bg-[#f7f4ef] shadow-[0_28px_80px_rgba(0,0,0,0.35)]">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] min-h-[420px] lg:min-h-[470px]">
            {/* ── LEFT ── */}
            <div className="relative z-20 flex flex-col justify-center gap-5 sm:gap-6 px-5 py-8 sm:px-8 lg:px-10 xl:pr-6 xl:pl-12">
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/brands/vacationsaga-logo.png"
                  alt="VacationSaga"
                  className="h-10 sm:h-12 w-auto object-contain rounded-md"
                />
                <span className="text-black/30 text-lg font-light">×</span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/housinglogo.png"
                  alt="HousingSaga"
                  className="h-9 sm:h-11 w-auto object-contain rounded-md"
                />
              </div>

              <div>
                <h2 className="text-[1.85rem] sm:text-[2.35rem] lg:text-[2.6rem] font-extrabold tracking-tight text-[#111] leading-[1.12]">
                  From Homes to Getaways,
                </h2>
                <p className="script-accent text-[2.15rem] sm:text-[2.75rem] lg:text-[3.05rem] leading-[0.95] text-[#ff6a00] mt-1">
                  All in One Place
                </p>
              </div>

              <p className="text-sm sm:text-[15px] text-[#5c5c5c] leading-relaxed max-w-xl">
                VacationSaga &amp; HousingSaga — together to bring you the
                perfect stays, whether it’s a weekend escape or a long-term home.
              </p>

              <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 pt-1">
                {features.map(({ title, sub, Icon, tone }) => (
                  <div key={title} className="flex items-start gap-2.5">
                    <div
                      className={`mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        tone === "orange"
                          ? "bg-orange-100 text-[#ff6a00]"
                          : "bg-lime-100 text-lime-700"
                      }`}
                    >
                      <Icon size={15} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[12px] sm:text-[13px] font-bold text-[#1a1a1a] leading-tight">
                        {title}
                      </p>
                      <p className="text-[11px] text-[#7a7a7a] leading-snug mt-0.5">
                        {sub}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href={VACATION_SAGA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#ff6a00] hover:bg-[#ef5f00] text-white text-sm font-bold shadow-lg shadow-orange-500/25 transition"
                >
                  Explore Stays
                  <span aria-hidden>→</span>
                </a>
                <p className="script-accent text-xl sm:text-2xl text-[#2a2a2a]">
                  Same dream. More options.
                </p>
              </div>

              <Link
                href="/earn-with-us"
                className="w-fit text-xs sm:text-sm font-semibold text-[#5c5c5c] hover:text-black underline underline-offset-4"
              >
                Or learn how to earn with VacationSaga
              </Link>
            </div>

            {/* ── RIGHT ── */}
            <div className="relative min-h-[320px] sm:min-h-[380px] lg:min-h-full">
              {/* Soft cream overlap on desktop so left content feels connected */}
              <div className="hidden lg:block absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#f7f4ef] to-transparent z-20 pointer-events-none" />

              {/* Curved photo stage */}
              <div className="absolute inset-2 sm:inset-3 lg:inset-y-3 lg:right-3 lg:left-0 overflow-hidden rounded-[1.5rem] lg:rounded-l-[3rem] lg:rounded-r-[1.5rem]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/palmhouse.jpg"
                  alt="Mediterranean villa getaway"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-black/20 via-transparent to-black/25" />

                {/* Brand color swooshes on the left edge of the photo */}
                <div className="absolute inset-y-0 left-0 w-10 sm:w-14 overflow-hidden pointer-events-none">
                  <div className="absolute inset-y-[-10%] left-0 w-8 sm:w-10 bg-[#ff6a00] rounded-r-[100%]" />
                  <div className="absolute inset-y-[8%] left-3 sm:left-4 w-5 sm:w-6 bg-lime-400 rounded-r-[100%] opacity-95" />
                </div>

                {/* Flight path */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none z-10 hidden sm:block"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  aria-hidden
                >
                  <path
                    d="M18 28 C 38 12, 62 14, 82 32"
                    fill="none"
                    stroke="white"
                    strokeWidth="0.7"
                    strokeDasharray="1.6 1.8"
                    opacity="0.95"
                  />
                </svg>
                <div className="absolute top-[18%] left-[48%] z-20 hidden sm:flex w-9 h-9 items-center justify-center rounded-full bg-white/25 backdrop-blur-sm border border-white/50 text-white shadow-lg">
                  <FiNavigation2 size={16} className="rotate-[35deg]" />
                </div>

                <p className="script-accent absolute top-4 left-[20%] z-20 text-white text-2xl sm:text-3xl drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)] hidden sm:block">
                  Vacation Stays
                </p>
                <p className="script-accent absolute bottom-6 right-5 z-20 text-white text-2xl sm:text-3xl drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)] hidden sm:block">
                  Long-term Homes
                </p>

                {/* Polaroids */}
                <div className="absolute top-[20%] left-[6%] sm:left-[10%] z-20 w-[44%] max-w-[180px] -rotate-6">
                  <div className="bg-white p-1.5 pb-5 rounded-[6px] shadow-2xl">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/rentalexp.jpg"
                      alt="Vacation stay"
                      className="w-full aspect-[4/3] object-cover rounded-[3px]"
                    />
                  </div>
                  <span className="absolute -top-2 right-0 text-[#ff6a00] text-base">
                    ✦
                  </span>
                </div>

                <div className="absolute bottom-[12%] right-[5%] sm:right-[8%] z-20 w-[48%] max-w-[200px] rotate-[4deg]">
                  <div className="bg-white p-1.5 pb-5 rounded-[6px] shadow-2xl">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/about1.jpg"
                      alt="Long-term home"
                      className="w-full aspect-[4/3] object-cover rounded-[3px]"
                    />
                  </div>
                  <span className="absolute -bottom-1 -left-1 text-lime-400 text-base">
                    ✦
                  </span>
                </div>

                <div className="absolute -bottom-8 -right-8 w-[65%] h-28 bg-[#121212] rounded-full opacity-90 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
