"use client";

import { useMemo, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { BadgePercent, Banknote, Building2, CheckCircle2, Clock3, Info, TrendingUp } from "lucide-react";
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

function paybackLabel(price: number, annualNet: number) {
  if (price <= 0 || annualNet <= 0) return null;
  const totalMonths = Math.max(1, Math.round((price / annualNet) * 12));
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  const yearText = years === 1 ? "1 year" : `${years} years`;
  const monthText = months === 1 ? "1 month" : `${months} months`;
  if (years === 0) return monthText;
  if (months === 0) return yearText;
  return `${yearText} ${monthText}`;
}

function chartMax(value: number) {
  if (value <= 0) return 1;
  const power = 10 ** Math.floor(Math.log10(value));
  const scaled = value / power;
  const steps = [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 7, 8, 10];
  const nice = steps.find((step) => step >= scaled - 0.001) ?? 10;
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

  const incomeMax = chartMax(Math.max(...years.map((year) => year.income), 1));
  const valueMax = chartMax(Math.max(...years.map((year) => year.value), purchasePrice, 1));
  const valueTicks = [4, 3, 2, 1, 0].map((step) => (valueMax / 4) * step);
  const incomeTicks = [4, 3, 2, 1, 0].map((step) => (incomeMax / 4) * step);
  const payback = paybackLabel(purchasePrice, netIncome);

  return (
    <section id="estimator" className="scroll-mt-28 bg-[#f4f6f1] py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-6 lg:grid-cols-2 lg:gap-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-lime-700">
              Estimate your potential income
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-5xl sm:leading-[1.1]">
              See what your property could generate.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              Move any control and the results update immediately. These figures are
              an illustration, not a forecast.
            </p>

          <div className="mt-8 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-[0_20px_50px_-24px_rgba(15,23,42,0.25)] sm:p-8">
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
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-slate-800">Annual value growth</p>
                    <GrowthInfo tip="Based on a standard marketplace illustration of about 5% a year. It is not a forecast of what your property will be worth." />
                  </div>
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
                <span className="ml-2 text-xl font-semibold sm:text-2xl">/ year</span>
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
                icon={<Clock3 className="h-4 w-4" />}
                label="Time to earn the purchase price back"
                detail="From rental income alone, before value growth."
                value={payback ?? "—"}
                valueClass="max-w-[9.5rem] text-right text-base leading-snug text-white"
              />
              <ResultRow
                icon={<TrendingUp className="h-4 w-4" />}
                label="Property value after 1 year"
                detail={
                  <span className="inline-flex items-center gap-1.5">
                    {appreciationRate}% illustrative growth
                    <GrowthInfo tip="Based on a standard marketplace illustration of about 5% a year. It is not a forecast of what your property will be worth." light />
                  </span>
                }
                value={euro(valueAfter1Year)}
              />
              <ResultRow
                icon={<Building2 className="h-4 w-4" />}
                label="Value after 5 years"
                detail="Same growth, compounded"
                value={euro(valueAfter5Years)}
              />
            </div>

            <div className="mt-8 space-y-6 border-t border-white/10 pt-6">
              <div>
                <h4 className="text-base font-semibold text-white">Five-year picture</h4>
                <p className="mt-1 text-sm text-slate-400">
                  Bars use the left scale. The line uses the right scale. Lime amounts are rental income. Blue amounts are property value.
                </p>
              </div>
              <CombinedChart
                years={years}
                incomeMax={incomeMax}
                valueMax={valueMax}
                incomeTicks={incomeTicks}
                valueTicks={valueTicks}
                reduce={Boolean(reduce)}
              />
            </div>

            <ul className="mt-6 grid gap-3 rounded-2xl bg-white/5 p-4 text-sm leading-relaxed text-slate-300 sm:grid-cols-2">
              {[
                "Rental income is what the home earns, added up over the years.",
                "Property value starts from the purchase price and grows separately.",
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

function GrowthInfo({ tip, light = false }: { tip: string; light?: boolean }) {
  return (
    <span className="group relative inline-flex">
      <button
        type="button"
        aria-label="About the 5% growth illustration"
        className={`flex h-5 w-5 items-center justify-center rounded-full border text-[11px] font-bold leading-none ${
          light
            ? "border-white/40 text-white hover:border-white"
            : "border-slate-300 text-slate-500 hover:border-slate-500"
        }`}
      >
        i
      </button>
      <span
        className={`pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 hidden w-60 -translate-x-1/2 rounded-xl px-3 py-2 text-left text-sm font-medium leading-snug shadow-lg group-hover:block group-focus-within:block ${
          light ? "bg-white text-slate-900" : "bg-slate-900 text-white"
        }`}
      >
        {tip}
      </span>
    </span>
  );
}

function CombinedChart({
  years,
  incomeMax,
  valueMax,
  incomeTicks,
  valueTicks,
  reduce,
}: {
  years: { year: number; income: number; value: number }[];
  incomeMax: number;
  valueMax: number;
  incomeTicks: number[];
  valueTicks: number[];
  reduce: boolean;
}) {
  const slot = 304 / years.length;
  const barWidth = 22;
  const baseline = 158;
  const plotHeight = 108;
  const points = years.map((year, index) => {
    const cx = 8 + slot * index + slot / 2;
    const incomeHeight = incomeMax <= 0 ? 0 : (year.income / incomeMax) * plotHeight;
    const valueHeight = valueMax <= 0 ? 0 : (year.value / valueMax) * plotHeight;
    const incomeTop = baseline - incomeHeight;
    const valueTop = baseline - valueHeight;
    let incomeLabel = incomeTop - 9;
    let valueLabel = valueTop - 9;
    if (Math.abs(incomeLabel - valueLabel) < 14) {
      const upper = Math.min(incomeTop, valueTop);
      valueLabel = upper - 22;
      incomeLabel = upper - 9;
    }
    return {
      year: year.year,
      income: year.income,
      value: year.value,
      cx,
      barX: cx - barWidth / 2,
      incomeHeight,
      valueTop,
      incomeLabel: Math.max(incomeLabel, 10),
      valueLabel: Math.max(valueLabel, 10),
    };
  });

  return (
    <div>
      <div className="mb-3 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-white">
        <p className="inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-lime-400" />
          Rental income
        </p>
        <p className="inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-sky-400" />
          Property value
        </p>
      </div>
      <div className="grid grid-cols-[3.25rem_minmax(0,1fr)_3.25rem] items-start gap-1.5">
        <div className="relative h-48">
          <div
            className="absolute inset-x-0 flex flex-col justify-between text-right text-[11px] leading-none text-lime-200/80"
            style={{ top: "28%", bottom: "10%" }}
          >
            {incomeTicks.map((tick) => (
              <span key={`income-${tick}`}>{compactEuro(tick)}</span>
            ))}
          </div>
        </div>
        <div className="min-w-0">
          <svg viewBox="0 0 320 176" className="h-48 w-full overflow-visible" role="img" aria-label="Rental income and property value over five years">
            {[0, 1, 2, 3, 4].map((line) => (
              <line
                key={line}
                x1="4"
                x2="316"
                y1={baseline - plotHeight + line * (plotHeight / 4)}
                y2={baseline - plotHeight + line * (plotHeight / 4)}
                stroke="rgba(255,255,255,0.08)"
              />
            ))}
            {points.map((point) => {
              const height = Math.max(point.incomeHeight, 0);
              return (
                <motion.rect
                  key={`income-${point.year}`}
                  x={point.barX}
                  width={barWidth}
                  rx="5"
                  initial={reduce ? false : { height: 0, y: baseline }}
                  animate={{ height, y: baseline - height }}
                  fill="#c6ef4a"
                />
              );
            })}
            <polyline
              points={points.map((point) => `${point.cx},${point.valueTop}`).join(" ")}
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2.5"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            {points.map((point) => (
              <circle
                key={`value-${point.year}`}
                cx={point.cx}
                cy={point.valueTop}
                r="4.5"
                fill="#38bdf8"
                stroke="#071422"
                strokeWidth="2"
              />
            ))}
            {points.map((point) => (
              <g key={`labels-${point.year}`}>
                <text
                  x={point.cx}
                  y={point.incomeLabel}
                  textAnchor="middle"
                  fill="#c6ef4a"
                  fontSize="8.5"
                  fontWeight="700"
                  stroke="#071422"
                  strokeWidth="3"
                  paintOrder="stroke"
                >
                  {euro(point.income)}
                </text>
                <text
                  x={point.cx}
                  y={point.valueLabel}
                  textAnchor="middle"
                  fill="#7dd3fc"
                  fontSize="8.5"
                  fontWeight="700"
                  stroke="#071422"
                  strokeWidth="3"
                  paintOrder="stroke"
                >
                  {euro(point.value)}
                </text>
              </g>
            ))}
          </svg>
          <div className="grid grid-cols-5 text-center text-xs text-slate-400">
            {points.map((point) => (
              <span key={point.year}>Year {point.year}</span>
            ))}
          </div>
        </div>
        <div className="relative h-48">
          <div
            className="absolute inset-x-0 flex flex-col justify-between text-[11px] leading-none text-sky-200/80"
            style={{ top: "28%", bottom: "10%" }}
          >
            {valueTicks.map((tick) => (
              <span key={`value-${tick}`}>{compactEuro(tick)}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
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
  detail: ReactNode;
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
          <div className={detailTone === "lime" ? "mt-1 text-sm text-lime-300" : "mt-1 text-sm text-slate-400"}>
            {detail}
          </div>
        </div>
      </div>
      <p className={`shrink-0 pt-0.5 text-lg font-bold tabular-nums sm:text-xl ${valueClass}`}>{value}</p>
    </motion.div>
  );
}
