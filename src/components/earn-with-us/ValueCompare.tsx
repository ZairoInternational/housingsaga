"use client";

import { motion, useReducedMotion } from "motion/react";
import { BadgePercent, Coins, Home, Info, ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";
import { ILLUSTRATIVE_STANDARD_FEE, useEarnEstimate } from "./estimate-context";

function euro(value: number) {
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

function SavingsMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 120" fill="none" className={className} aria-hidden>
      <g transform="rotate(-14 62 42)">
        <rect x="18" y="22" width="86" height="48" rx="7" fill="#d9f99d" />
        <circle cx="61" cy="46" r="11" stroke="#3f6212" strokeWidth="2.5" />
      </g>
      <g transform="rotate(8 78 52)">
        <rect x="34" y="30" width="90" height="50" rx="7" fill="#f7fee7" stroke="#365314" strokeWidth="2.5" />
        <circle cx="79" cy="55" r="12" fill="#bef264" />
        <text x="79" y="60" textAnchor="middle" fill="#365314" fontSize="16" fontWeight="700">
          €
        </text>
      </g>
      <ellipse cx="124" cy="96" rx="24" ry="8" fill="#365314" />
      <path d="M100 78h48v16c0 4-11 8-24 8s-24-4-24-8V78z" fill="#eab308" />
      <ellipse cx="124" cy="78" rx="24" ry="8" fill="#facc15" />
      <path d="M100 68h48v10c0 4-11 8-24 8s-24-4-24-8V68z" fill="#facc15" />
      <ellipse cx="124" cy="68" rx="24" ry="8" fill="#fde047" />
      <text x="124" y="72" textAnchor="middle" fill="#365314" fontSize="13" fontWeight="700">
        €
      </text>
    </svg>
  );
}

function IconBubble({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) {
  return (
    <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${className}`}>
      {children}
    </span>
  );
}

export default function ValueCompare() {
  const reduce = useReducedMotion();
  const {
    purchasePrice,
    grossIncome,
    managementFee,
    feeAmount,
    standardFeeAmount,
    feeKept,
    netIncome,
  } = useEarnEstimate();

  const standardNet = Math.max(grossIncome - standardFeeAmount, 0);

  return (
    <section id="benefits" className="scroll-mt-28 bg-[#f6f7f4] py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-6 lg:grid-cols-2 lg:gap-8">
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-lime-800 sm:text-sm">
                The benefit of buying through HousingSaga
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-5xl sm:leading-[1.05]">
                More value. <span className="text-lime-600">Fewer fees.</span>
              </h2>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-slate-600">
                Same purchase price, same rent. The difference is the management fee.
                This comparison follows the estimator above.
              </p>
            </div>

            <article className="relative rounded-3xl border border-slate-200/80 bg-white p-5 shadow-[0_18px_40px_-28px_rgba(15,23,42,0.35)] sm:p-6">
              <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                Buy elsewhere
              </span>

              <div className="mt-4 flex items-start gap-3">
                <IconBubble className="bg-slate-100 text-slate-500">
                  <Home className="h-4 w-4" aria-hidden />
                </IconBubble>
                <div>
                  <h3 className="text-lg font-semibold tracking-tight text-slate-950">
                    A standard management fee
                  </h3>
                  <p className="mt-0.5 text-sm leading-relaxed text-slate-500">
                    Illustrated at {ILLUSTRATIVE_STANDARD_FEE}%. Real fees vary by property.
                  </p>
                </div>
              </div>

              <dl className="mt-5 divide-y divide-slate-100 rounded-2xl border border-slate-200">
                <div className="flex items-center justify-between gap-3 px-3 py-3 sm:px-4 sm:py-3.5">
                  <dt className="flex min-w-0 items-center gap-2.5 text-sm text-slate-600 sm:gap-3">
                    <IconBubble className="bg-slate-100 text-slate-500">
                      <Home className="h-4 w-4" aria-hidden />
                    </IconBubble>
                    <span className="min-w-0 leading-snug">Property purchase price</span>
                    <Info className="hidden h-3.5 w-3.5 shrink-0 text-slate-300 sm:block" aria-hidden />
                  </dt>
                  <dd className="shrink-0 font-semibold tabular-nums text-slate-950">{euro(purchasePrice)}</dd>
                </div>
                <div className="flex items-center justify-between gap-3 px-3 py-3 sm:px-4 sm:py-3.5">
                  <dt className="flex min-w-0 items-center gap-2.5 text-sm text-slate-600 sm:gap-3">
                    <IconBubble className="bg-slate-100 text-slate-500">
                      <Coins className="h-4 w-4" aria-hidden />
                    </IconBubble>
                    <span className="min-w-0 leading-snug">Gross rental income</span> 
                    <Info className="hidden h-3.5 w-3.5 shrink-0 text-slate-300 sm:block" aria-hidden />
                  </dt>
                  <dd className="shrink-0 font-semibold tabular-nums text-slate-950">
                    {euro(grossIncome)}
                    <span className="ml-1 text-xs font-medium text-slate-500">/ year</span>
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-3 px-3 py-3 sm:px-4 sm:py-3.5">
                  <dt className="flex min-w-0 items-center gap-2.5 text-sm text-slate-600 sm:gap-3">
                    <IconBubble className="bg-rose-50 text-rose-500">
                      <BadgePercent className="h-4 w-4" aria-hidden />
                    </IconBubble>
                    <span className="min-w-0 leading-snug">Management fee</span>
                    <Info className="hidden h-3.5 w-3.5 shrink-0 text-slate-300 sm:block" aria-hidden />
                  </dt>
                  <dd className="shrink-0 text-right">
                    <span className="block font-semibold tabular-nums text-slate-950">
                      {euro(standardFeeAmount)}
                    </span>
                    <span className="text-xs text-slate-400">{ILLUSTRATIVE_STANDARD_FEE}% of gross</span>
                  </dd>
                </div>
              </dl>

              <p className="mt-4 flex items-center gap-2 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-500">
                <Info className="h-4 w-4 shrink-0 text-slate-400" aria-hidden />
                Income after that example fee:{" "}
                <span className="font-semibold text-slate-800">{euro(standardNet)}</span>
              </p>

              <div className="pointer-events-none absolute -right-7 top-1/2 z-10 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border-4 border-[#f6f7f4] bg-[#071422] text-sm font-bold text-white shadow-lg lg:flex">
                vs
              </div>
            </article>
          </div>

          <article className="flex h-full flex-col rounded-3xl bg-[#071422] p-5 text-white shadow-[0_24px_60px_-28px_rgba(7,20,34,0.8)] sm:p-6">
            <span className="inline-flex w-fit rounded-full bg-lime-500 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white">
              Buy with HousingSaga
            </span>

            <div className="mt-5 flex items-start gap-3">
              <IconBubble className="bg-lime-500 text-white">
                <Home className="h-4 w-4" aria-hidden />
              </IconBubble>
              <div>
                <h3 className="text-xl font-semibold tracking-tight">Your fee, from the estimator</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-300">
                  {managementFee === 0
                    ? "HousingSaga buyers are set to a 0% management fee."
                    : `You are currently comparing a ${managementFee}% fee.`}
                </p>
              </div>
            </div>

            <dl className="mt-5 space-y-3">
              <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <dt className="inline-flex items-center gap-3 text-sm text-slate-200">
                  <IconBubble className="bg-lime-500/15 text-lime-400">
                    <Home className="h-4 w-4" aria-hidden />
                  </IconBubble>
                  Property purchase price
                </dt>
                <dd className="font-semibold tabular-nums">{euro(purchasePrice)}</dd>
              </div>
              <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <dt className="inline-flex items-center gap-3 text-sm text-slate-200">
                  <IconBubble className="bg-lime-500/15 text-lime-400">
                    <Coins className="h-4 w-4" aria-hidden />
                  </IconBubble>
                  Gross rental income
                </dt>
                <dd className="font-semibold tabular-nums">
                  {euro(grossIncome)}
                  <span className="ml-1 text-xs font-medium text-slate-400">/ year</span>
                </dd>
              </div>
              <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <dt className="inline-flex items-center gap-3 text-sm text-slate-200">
                  <IconBubble className="bg-lime-500 text-white">
                    <ShieldCheck className="h-4 w-4" aria-hidden />
                  </IconBubble>
                  Management fee
                </dt>
                <dd className="text-right">
                  <span className="block text-2xl font-bold leading-none text-lime-400">{managementFee}%</span>
                  <span className="mt-1 block text-xs text-slate-400">{euro(feeAmount)} this year</span>
                </dd>
              </div>
            </dl>

            <motion.div
              key={Math.round(feeKept)}
              initial={reduce ? false : { opacity: 0.6, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative mt-5 overflow-hidden rounded-2xl bg-lime-500 px-5 py-4 text-slate-950"
            >
              <div className="relative z-10 pr-24 sm:pr-36">
                <p className="text-sm font-medium text-slate-800">
                  <span aria-hidden>✦ </span>
                  Kept versus a {ILLUSTRATIVE_STANDARD_FEE}% fee
                </p>
                <p className="mt-1 text-3xl font-bold tabular-nums tracking-tight text-white">{euro(feeKept)}</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-800">
                  Your estimate after fees is {euro(netIncome)} a year.
                </p>
              </div>
              <SavingsMark className="pointer-events-none absolute bottom-1 right-1 h-16 w-24 sm:h-[7.25rem] sm:w-44" />
            </motion.div>
          </article>
        </div>
      </div>
    </section>
  );
}
