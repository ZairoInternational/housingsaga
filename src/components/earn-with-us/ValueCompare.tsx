"use client";

import { motion, useReducedMotion } from "motion/react";
import { Check, X } from "lucide-react";
import { ILLUSTRATIVE_STANDARD_FEE, useEarnEstimate } from "./estimate-context";

function euro(value: number) {
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(Math.round(value));
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
    <section id="benefits" className="scroll-mt-28 bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-lime-700">
          The benefit of buying through HousingSaga
        </p>
        <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-slate-950 sm:text-5xl sm:leading-[1.1]">
          More value. Fewer fees.
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
          Same purchase price, same rent. The difference is the management fee.
          This comparison follows the estimator above.
        </p>

        <div className="relative mt-10 grid gap-5 lg:grid-cols-2 lg:gap-8">
          <article className="flex h-full flex-col rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
              Buy elsewhere
            </p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
              A standard management fee
            </h3>
            <p className="mt-3 text-base leading-relaxed text-slate-600">
              Illustrated at {ILLUSTRATIVE_STANDARD_FEE}%. Real fees vary by property.
            </p>

            <dl className="mt-8 space-y-4 text-base">
              <div className="flex items-baseline justify-between gap-4 border-b border-slate-200 pb-4">
                <dt className="text-slate-500">Property purchase</dt>
                <dd className="font-semibold tabular-nums text-slate-950">{euro(purchasePrice)}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 border-b border-slate-200 pb-4">
                <dt className="text-slate-500">Gross rental income</dt>
                <dd className="font-semibold tabular-nums text-slate-950">{euro(grossIncome)}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <dt className="inline-flex items-center gap-2 text-slate-500">
                  <X className="h-4 w-4 text-rose-500" aria-hidden />
                  Management fee
                </dt>
                <dd className="text-right">
                  <span className="block font-semibold tabular-nums text-slate-950">
                    {euro(standardFeeAmount)}
                  </span>
                  <span className="text-sm text-slate-500">{ILLUSTRATIVE_STANDARD_FEE}% of gross</span>
                </dd>
              </div>
            </dl>

            <p className="mt-auto pt-8 text-sm leading-relaxed text-slate-500">
              Income after that example fee:{" "}
              <span className="font-semibold text-slate-800">{euro(standardNet)}</span>
            </p>
          </article>

          <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-white bg-slate-950 text-sm font-semibold text-white shadow-lg lg:flex">
            VS
          </div>

          <article className="flex h-full flex-col rounded-3xl bg-lime-300 p-6 text-slate-950 shadow-[0_24px_50px_-28px_rgba(101,163,13,0.7)] sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-800">
              Buy with HousingSaga
            </p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight">
              Your fee, from the estimator
            </h3>
            <p className="mt-3 text-base leading-relaxed text-slate-800">
              {managementFee === 0
                ? "HousingSaga buyers are set to a 0% management fee."
                : `You are currently comparing a ${managementFee}% fee.`}
            </p>

            <dl className="mt-8 space-y-4 text-base">
              <div className="flex items-baseline justify-between gap-4 border-b border-lime-500/40 pb-4">
                <dt>Property purchase</dt>
                <dd className="font-semibold tabular-nums">{euro(purchasePrice)}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 border-b border-lime-500/40 pb-4">
                <dt>Gross rental income</dt>
                <dd className="font-semibold tabular-nums">{euro(grossIncome)}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <dt className="inline-flex items-center gap-2">
                  <Check className="h-4 w-4" aria-hidden />
                  Management fee
                </dt>
                <dd className="text-right">
                  <span className="block text-3xl font-semibold tabular-nums leading-none">
                    {managementFee}%
                  </span>
                  <span className="mt-1 block text-sm">{euro(feeAmount)} this year</span>
                </dd>
              </div>
            </dl>

            <motion.div
              key={Math.round(feeKept)}
              initial={reduce ? false : { opacity: 0.6, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 rounded-2xl bg-slate-950 px-5 py-4 text-white"
            >
              <p className="text-sm text-lime-200">Kept versus a {ILLUSTRATIVE_STANDARD_FEE}% fee</p>
              <p className="mt-1 text-3xl font-semibold tabular-nums tracking-tight">{euro(feeKept)}</p>
              <p className="mt-1 text-sm leading-relaxed text-slate-300">
                Your estimate after fees is {euro(netIncome)} a year.
              </p>
            </motion.div>
          </article>
        </div>
      </div>
    </section>
  );
}
