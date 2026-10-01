"use client";

import { useMemo, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { BadgePercent, Banknote, Building2, CheckCircle2, Info, TrendingUp } from "lucide-react";
import { useEarnEstimate } from "./estimate-context";

function euro(value: number) {
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

function compactEuro(value: number) {
  const abs = Math.abs(value);
  if (abs >= 1_000_000) {
    const millions = value / 1_000_000;
    return `€${Number.isInteger(millions) ? millions.toFixed(0) : millions.toFixed(1)}m`;
  }
  if (abs >= 1_000) return `€${Math.round(value / 1_000)}k`;
  return `€${Math.round(value)}`;
}

function niceMax(value: number) {
  if (value <= 0) return 1;
  const power = 10 ** Math.floor(Math.log10(value));
  const scaled = value / power;
  const nice = scaled <= 1 ? 1 : scaled <= 2 ? 2 : scaled <= 5 ? 5 : 10;
  return nice * power;
}

function FieldLabel({ label, tip }: { label: string; tip: string }) {
  return (
    <div className="mb-2 flex items-center gap-2">
      <span className="text-sm font-semibold text-slate-800">{label}</span>
      <span className="group relative inline-flex">
        <Info className="h-4 w-4 text-slate-400" aria-hidden />
        <span className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 hidden w-56 -translate-x-1/2 rounded-xl bg-slate-900 px-3 py-2 text-sm font-medium leading-snug text-white shadow-lg group-hover:block">
          {tip}
        </span>
      </span>
    </div>
  );
}

function RangeControl({
  min,
  max,
  value,
  onChange,
  label,
  display,
  ariaLabel,
}: {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  label: string;
  display: string;
  ariaLabel: string;
}) {
  const percent = ((value - min) / (max - min)) * 100;

  return (
    <div>
      <div className="mb-3 flex items-end justify-between gap-4">
        <p className="text-sm font-semibold text-slate-800">{label}</p>
        <p className="text-lg font-semibold tabular-nums tracking-tight text-slate-900">{display}</p>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-label={ariaLabel}
        onChange={(event) => onChange(Number(event.target.value))}
        style={{
          background: `linear-gradient(to right, #84cc16 0%, #84cc16 ${percent}%, #e2e8f0 ${percent}%, #e2e8f0 100%)`,
        }}
        className="h-2 w-full cursor-pointer appearance-none rounded-full accent-lime-500"
      />
      <div className="mt-2 flex justify-between text-sm text-slate-400">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}

const inputClass =
  "w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-base font-medium tabular-nums text-slate-900 outline-none transition focus:border-lime-400 focus:bg-white focus:ring-4 focus:ring-lime-400/30";

export default function EarningsEstimator() {
  const reduce = useReducedMotion();
  const estimate = useEarnEstimate();
  const {
    purchasePrice,
    monthlyRent,
    occupiedMonths,
    occupancyRate,
    managementFee,
    appreciationRate,
    setPurchasePrice,
    setMonthlyRent,
    setOccupiedMonths,
    setOccupancyRate,
    setManagementFee,
    bookedMonths,
    grossIncome,
    feeAmount,
    netIncome,
    valueAfter1Year,
    valueAfter5Years,
  } = estimate;

  const years = useMemo(
    () =>
      [1, 2, 3, 4, 5].map((year) => ({
        year,
        income: netIncome * year,
        value: purchasePrice * (1 + appreciationRate / 100) ** year,
      })),
    [netIncome, purchasePrice, appreciationRate],
  );

  const incomeMax = niceMax(Math.max(...years.map((year) => year.income), 1));
  const valueMax = niceMax(Math.max(...years.map((year) => year.value), purchasePrice, 1));
  const valueTicks = [4, 3, 2, 1, 0].map((step) => (valueMax / 4) * step);
  const incomeTicks = [4, 3, 2, 1, 0].map((step) => (incomeMax / 4) * step);

  const plotLeft = 16;
  const plotWidth = 288;
  const barWidth = 22;
  const slot = plotWidth / years.length;
  const linePoints = years
    .map((year, index) => {
      const x = plotLeft + slot * index + slot / 2;
      const y = 148 - (year.value / valueMax) * 120;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <section id="estimator" className="scroll-mt-28 bg-[#f4f6f1] py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-lime-700">
          Estimate your potential income
        </p>
        <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-slate-950 sm:text-5xl sm:leading-[1.1]">
          See what your property could generate.
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
          Move any control and the results update immediately. These figures are
          an illustration, not a forecast.
        </p>

        <div className="mt-10 grid items-start gap-6 lg:grid-cols-2 lg:gap-8">
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-[0_20px_50px_-24px_rgba(15,23,42,0.25)] sm:p-8">
            <h3 className="border-b border-slate-100 pb-4 text-xl font-semibold text-slate-950">
              Property details
            </h3>

            <div className="mt-7 space-y-8">
              <div>
                <FieldLabel
                  label="Property purchase price"
                  tip="Used for the value-growth illustration. It does not change rental income."
                />
                <input
                  type="text"
                  inputMode="numeric"
                  aria-label="Property purchase price in euros"
                  value={purchasePrice.toLocaleString("en-IE")}
                  onChange={(event) => {
                    const next = Number(event.target.value.replace(/[^\d]/g, ""));
                    setPurchasePrice(Number.isFinite(next) ? next : 0);
                  }}
                  className={inputClass}
                />
              </div>

              <div>
                <FieldLabel
                  label="Expected monthly rent"
                  tip="What you expect the home to earn in a fully booked month."
                />
                <input
                  type="text"
                  inputMode="numeric"
                  aria-label="Expected monthly rent in euros"
                  value={monthlyRent.toLocaleString("en-IE")}
                  onChange={(event) => {
                    const next = Number(event.target.value.replace(/[^\d]/g, ""));
                    setMonthlyRent(Number.isFinite(next) ? next : 0);
                  }}
                  className={inputClass}
                />
              </div>

              <RangeControl
                min={1}
                max={12}
                value={occupiedMonths}
                onChange={setOccupiedMonths}
                label="Occupied months per year"
                display={`${occupiedMonths} ${occupiedMonths === 1 ? "month" : "months"}`}
                ariaLabel="Occupied months per year"
              />

              <div>
                <RangeControl
                  min={0}
                  max={100}
                  value={occupancyRate}
                  onChange={setOccupancyRate}
                  label="Occupancy rate"
                  display={`${occupancyRate}%`}
                  ariaLabel="Occupancy rate"
                />
                <p className="mt-3 text-sm leading-relaxed text-slate-500">
                  Months are how long the home is available. Occupancy is how much
                  of that time is actually booked. {occupiedMonths}{" "}
                  {occupiedMonths === 1 ? "month" : "months"} at {occupancyRate}%
                  counts as {bookedMonths.toLocaleString("en-IE", { maximumFractionDigits: 1 })}{" "}
                  booked {bookedMonths === 1 ? "month" : "months"}.
                </p>
              </div>

              <div>
                <FieldLabel
                  label="Management fee"
                  tip="HousingSaga buyers start at 0%. The other rates are only here so you can compare."
                />
                <select
                  value={managementFee}
                  aria-label="Management fee"
                  onChange={(event) => setManagementFee(Number(event.target.value))}
                  className="w-full rounded-2xl border border-lime-300 bg-lime-50 px-4 py-3.5 text-base font-semibold text-lime-950 outline-none transition focus:ring-4 focus:ring-lime-400/40"
                >
                  <option value={0}>0% — HousingSaga buyer benefit</option>
                  <option value={15}>15% — example standard fee</option>
                  <option value={18}>18% — example full-service fee</option>
                </select>
              </div>

              <div className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                <div>
                  <p className="text-sm font-semibold text-slate-800">Annual value growth</p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-500">
                    Fixed at 5% for this illustration.
                  </p>
                </div>
                <p className="text-lg font-semibold tabular-nums text-slate-900">5%</p>
              </div>

              <div className="flex items-start gap-3 rounded-2xl bg-slate-50 px-4 py-3.5">
                <Info className="mt-0.5 h-5 w-5 shrink-0 text-sky-600" aria-hidden />
                <p className="text-sm leading-relaxed text-slate-600">
                  All figures are estimates only. Actual results may vary.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-[#071422] p-6 text-white shadow-[0_24px_60px_-28px_rgba(7,20,34,0.8)] sm:p-8">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-xl font-semibold">Estimated annual results</h3>
              <span className="rounded-full bg-white/10 px-3 py-1 text-sm text-slate-300">
                Live estimate
              </span>
            </div>

            <motion.div
              key={Math.round(netIncome)}
              initial={reduce ? false : { opacity: 0.4, scale: 0.98, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="relative mt-6 overflow-hidden rounded-2xl bg-lime-400 px-5 py-6 text-slate-950 shadow-[0_0_40px_rgba(190,242,100,0.35)]"
            >
              <p className="text-sm font-semibold">You could receive</p>
              <p className="mt-1 text-4xl font-bold tabular-nums tracking-tight sm:text-5xl">
                {euro(netIncome)}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-800">
                after the management fee, from {euro(monthlyRent)} a month.
              </p>
            </motion.div>

            <div className="mt-6 space-y-3" aria-live="polite">
              <ResultRow
                icon={<Banknote className="h-5 w-5" />}
                iconClass="bg-lime-400 text-slate-950 shadow-[0_0_18px_rgba(190,242,100,0.45)]"
                label="Annual gross rental income"
                detail={`${euro(monthlyRent)} × ${bookedMonths.toLocaleString("en-IE", { maximumFractionDigits: 1 })} booked months`}
                value={euro(grossIncome)}
                valueClass="text-lime-300"
              />
              <ResultRow
                icon={<BadgePercent className="h-5 w-5" />}
                iconClass="bg-sky-400 text-slate-950 shadow-[0_0_18px_rgba(56,189,248,0.4)]"
                label="VacationSaga management fee"
                detail={
                  managementFee === 0
                    ? "HousingSaga buyer benefit"
                    : `${managementFee}% of gross income`
                }
                detailTone={managementFee === 0 ? "lime" : "muted"}
                value={euro(feeAmount)}
                valueClass="text-sky-300"
              />
              <ResultRow
                icon={<TrendingUp className="h-4 w-4" />}
                label="Property value after 1 year"
                detail={`${appreciationRate}% illustrative growth`}
                value={euro(valueAfter1Year)}
              />
              <ResultRow
                icon={<Building2 className="h-4 w-4" />}
                label="Value after 5 years"
                detail="Same growth, compounded"
                value={euro(valueAfter5Years)}
              />
            </div>

            <div className="mt-8 border-t border-white/10 pt-6">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <h4 className="text-base font-semibold text-white">Five-year picture</h4>
                <div className="flex gap-4 text-sm text-slate-300">
                  <span className="inline-flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-lime-400" />
                    Rental income
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-sky-400" />
                    Property value
                  </span>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-[3.5rem_minmax(0,1fr)_3.5rem] items-start gap-2">
                <div className="flex h-44 flex-col justify-between text-xs leading-none text-slate-400">
                  {valueTicks.map((tick) => (
                    <span key={`v-${tick}`}>{compactEuro(tick)}</span>
                  ))}
                </div>
                <div className="min-w-0">
                  <svg
                    viewBox="0 0 320 160"
                    className="h-44 w-full"
                    role="img"
                    aria-label="Five year chart of cumulative rental income and property value"
                  >
                    {[0, 1, 2, 3, 4].map((line) => (
                      <line
                        key={line}
                        x1="8"
                        x2="312"
                        y1={16 + line * 33}
                        y2={16 + line * 33}
                        stroke="rgba(255,255,255,0.08)"
                      />
                    ))}
                    {years.map((year, index) => {
                      const height = (year.income / incomeMax) * 120;
                      const x = plotLeft + slot * index + (slot - barWidth) / 2;
                      return (
                        <motion.rect
                          key={year.year}
                          x={x}
                          width={barWidth}
                          rx="5"
                          initial={reduce ? false : { height: 0, y: 148 }}
                          animate={{ height, y: 148 - height }}
                          transition={{ duration: 0.45 }}
                          fill="#c6ef4a"
                        />
                      );
                    })}
                    <polyline
                      points={linePoints}
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth="2.5"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    />
                    {years.map((year, index) => (
                      <circle
                        key={`dot-${year.year}`}
                        cx={plotLeft + slot * index + slot / 2}
                        cy={148 - (year.value / valueMax) * 120}
                        r="3.5"
                        fill="#38bdf8"
                      />
                    ))}
                  </svg>
                  <div className="grid grid-cols-5 text-center text-xs text-slate-400">
                    {years.map((year) => (
                      <span key={year.year}>Year {year.year}</span>
                    ))}
                  </div>
                </div>
                <div className="flex h-44 flex-col justify-between text-right text-xs leading-none text-slate-400">
                  {incomeTicks.map((tick) => (
                    <span key={`i-${tick}`}>{compactEuro(tick)}</span>
                  ))}
                </div>
              </div>
            </div>

            <ul className="mt-6 grid gap-3 rounded-2xl bg-white/5 p-4 text-sm leading-relaxed text-slate-300 sm:grid-cols-2">
              {[
                "Bars show rental income added up over five years.",
                "The line shows property value, on its own scale.",
                "Occupancy and rent can change from year to year.",
                `${appreciationRate}% growth is an illustration, not a promise.`,
              ].map((note) => (
                <li key={note} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-lime-400" aria-hidden />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function ResultRow({
  icon,
  label,
  detail,
  value,
  detailTone = "muted",
  iconClass = "bg-white/10 text-slate-200",
  valueClass = "text-white",
}: {
  icon: ReactNode;
  label: string;
  detail: string;
  value: string;
  detailTone?: "muted" | "lime";
  iconClass?: string;
  valueClass?: string;
}) {
  return (
    <motion.div
      key={value}
      initial={{ opacity: 0.55 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      className="flex items-start justify-between gap-4 rounded-2xl bg-white/10 px-3 py-3 ring-1 ring-white/15"
    >
      <div className="flex min-w-0 flex-1 items-start gap-3">
        <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${iconClass}`}>
          {icon}
        </span>
        <div className="min-w-0">
          <p className="text-sm font-medium leading-snug text-white sm:text-base">{label}</p>
          <p className={detailTone === "lime" ? "mt-1 text-sm text-lime-300" : "mt-1 text-sm text-slate-400"}>
            {detail}
          </p>
        </div>
      </div>
      <p className={`shrink-0 pt-0.5 text-lg font-bold tabular-nums sm:text-xl ${valueClass}`}>{value}</p>
    </motion.div>
  );
}
