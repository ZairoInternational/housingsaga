"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { BadgePercent, Banknote, Building2, CheckCircle2, ChevronDown, Clock3, Info, TriangleAlert, TrendingUp, X } from "lucide-react";
import { useEarnEstimate } from "./estimate-context";

function percentLabel(value: number) {
  const rounded = Math.round(value * 10) / 10;
  return Number.isInteger(rounded) ? `${rounded.toFixed(0)}%` : `${rounded.toFixed(1)}%`;
}

function bookedMonthsLabel(value: number) {
  return value.toLocaleString("en-IE", {
    minimumFractionDigits: Number.isInteger(value) ? 0 : 1,
    maximumFractionDigits: 1,
  });
}

function euro(value: number) {
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

function IncomeHouse({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 72" fill="none" className={className} aria-hidden>
      <path d="M0 50c16-12 30-8 46-2 12 4 20 1 34-8 12-8 26-6 40 4v28H0V50z" fill="#3f6212" fillOpacity="0.45" />
      <path d="M0 60c18-8 32-4 48 1 14 4 24-2 40-8 8-3 18-2 32 4v15H0V60z" fill="#365314" fillOpacity="0.35" />
      <path d="M34 40 L60 22 L86 40 V64 H34 Z" fill="#ecfccb" />
      <path d="M60 18 L92 42 H28 Z" fill="#d9f99d" />
      <rect x="52" y="46" width="16" height="18" rx="1.5" fill="#4d7c0f" />
      <rect x="40" y="44" width="8" height="7" rx="1" fill="#84cc16" />
      <rect x="72" y="44" width="8" height="7" rx="1" fill="#84cc16" />
      <path d="M88 24c6-12 16-14 20-8-8 1-14 7-15 14-3-1-5-3-5-6z" fill="#bef264" />
      <path d="M30 32c-1-10 7-16 14-12-5 3-7 9-7 14-3 0-6-1-7-2z" fill="#a3e635" />
    </svg>
  );
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

function monthsToRecover(price: number, annualRent: number, appreciationRate: number) {
  if (price <= 0) return null;
  const rate = appreciationRate / 100;
  if (annualRent <= 0 && rate <= 0) return null;

  let total = 0;
  for (let year = 1; year <= 80; year += 1) {
    const added = annualRent + price * rate * (1 + rate) ** (year - 1);
    if (total + added >= price) {
      const fraction = added > 0 ? (price - total) / added : 1;
      const monthsIntoYear = Math.min(12, Math.max(1, Math.ceil(fraction * 12 - 1e-9)));
      return (year - 1) * 12 + monthsIntoYear;
    }
    total += added;
  }
  return null;
}

function durationLabel(totalMonths: number | null) {
  if (totalMonths == null) return null;
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  const yearText = years === 1 ? "1 year" : `${years} yrs`;
  const monthText = months === 1 ? "1 month" : `${months} months`;
  if (years === 0) return monthText;
  if (months === 0) return yearText;
  return `${yearText} ${monthText}`;
}

function FieldLabel({ label, tip }: { label: string; tip: string }) {
  return (
    <div className="mb-1.5 flex items-center gap-2">
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
  tip,
  step = 1,
}: {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  label: string;
  display: string;
  ariaLabel: string;
  tip?: string;
  step?: number;
}) {
  const percent = ((value - min) / (max - min)) * 100;

  return (
    <div>
      <div className="mb-1.5 flex items-end justify-between gap-4">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-slate-800">{label}</p>
          {tip ? <GrowthInfo tip={tip} label={label} /> : null}
        </div>
        <p className="text-sm font-semibold tabular-nums tracking-tight text-slate-900">{display}</p>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
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
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-medium tabular-nums text-slate-900 outline-none transition focus:border-lime-600 focus:bg-white focus:ring-4 focus:ring-lime-600/20";

export default function EarningsEstimator() {
  const reduce = useReducedMotion();
  const [yearsOpen, setYearsOpen] = useState(false);
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
    setAppreciationRate,
    bookedMonths,
    grossIncome,
    feeAmount,
    netIncome,
    valueAfter1Year,
  } = estimate;

  const valueGrowthYear1 = Math.max(valueAfter1Year - purchasePrice, 0);
  const yearlyIncome = netIncome + valueGrowthYear1;
  const monthsNow = monthsToRecover(purchasePrice, netIncome, appreciationRate);
  const monthsAtZeroFee = monthsToRecover(purchasePrice, grossIncome, appreciationRate);
  const payback = durationLabel(monthsNow);
  const extraPaybackMonths =
    managementFee > 0 && monthsNow != null && monthsAtZeroFee != null
      ? Math.max(monthsNow - monthsAtZeroFee, 0)
      : 0;
  const yearReturns = useMemo(() => {
    const rate = appreciationRate / 100;
    const rows: {
      year: number;
      rentSoFar: number;
      growthSoFar: number;
      total: number;
      totalSoFar: number;
      percent: number;
    }[] = [];
    if (purchasePrice <= 0) return rows;

    let totalSoFar = 0;
    let rentSoFar = 0;
    let growthSoFar = 0;
    for (let year = 1; year <= 80; year += 1) {
      const growth = purchasePrice * rate * (1 + rate) ** (year - 1);
      const total = netIncome + growth;
      rentSoFar += netIncome;
      growthSoFar += growth;
      totalSoFar += total;
      const percent = (totalSoFar / purchasePrice) * 100;
      rows.push({ year, rentSoFar, growthSoFar, total, totalSoFar, percent });
      if (percent >= 100) break;
    }
    return rows;
  }, [appreciationRate, netIncome, purchasePrice]);
  const recoveredRow = yearReturns.find((row) => row.percent >= 100) ?? yearReturns.at(-1);

  useEffect(() => {
    if (!yearsOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setYearsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [yearsOpen]);

  return (
    <section
      id="estimator"
      className="scroll-mt-28 bg-[#f4f6f1] py-12 sm:py-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-lime-800">
            Estimate your potential income
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            See what your property could generate.
          </h2>
          <p className="mt-2 text-base leading-relaxed text-slate-600">
            Move any control and the results update immediately. These figures
            are an illustration, not a forecast.
          </p>
        </div>

        <div className="mt-6 grid items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
          <div className="flex h-full flex-col rounded-3xl border border-slate-200/80 bg-white p-5 shadow-[0_20px_50px_-24px_rgba(15,23,42,0.25)] sm:p-6">
            <h3 className="text-lg font-semibold text-slate-950">
              Property details
            </h3>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <FieldLabel
                  label="Property purchase price"
                  tip="Used for the value-growth illustration. It does not change rental income."
                />
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-500">
                    €
                  </span>
                  <input
                    type="text"
                    inputMode="numeric"
                    aria-label="Property purchase price in euros"
                    value={purchasePrice.toLocaleString("en-IE")}
                    onChange={(event) => {
                      const next = Number(
                        event.target.value.replace(/[^\d]/g, ""),
                      );
                      setPurchasePrice(Number.isFinite(next) ? next : 0);
                    }}
                    className={`${inputClass} pl-8`}
                  />
                </div>
              </div>

              <div>
                <FieldLabel
                  label="Expected monthly rent"
                  tip="What you expect the home to earn in a fully booked month."
                />
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-500">
                    €
                  </span>
                  <input
                    type="text"
                    inputMode="numeric"
                    aria-label="Expected monthly rent in euros"
                    value={monthlyRent.toLocaleString("en-IE")}
                    onChange={(event) => {
                      const next = Number(
                        event.target.value.replace(/[^\d]/g, ""),
                      );
                      setMonthlyRent(Number.isFinite(next) ? next : 0);
                    }}
                    className={`${inputClass} pl-8`}
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-4">
              <RangeControl
                min={1}
                max={12}
                value={occupiedMonths}
                onChange={setOccupiedMonths}
                label="Occupied months per year"
                display={`${occupiedMonths} ${occupiedMonths === 1 ? "month" : "months"}`}
                ariaLabel="Occupied months per year"
                tip="How many months a year the home is available to guests. This is not how fully those months are booked."
              />
              <RangeControl
                min={0}
                max={100}
                value={occupancyRate}
                onChange={setOccupancyRate}
                label="Occupancy rate"
                display={`${occupancyRate}%`}
                ariaLabel="Occupancy rate"
                tip="How much of the available time is actually booked."
              />
              <p className="text-sm leading-snug text-slate-500">
                {occupiedMonths} {occupiedMonths === 1 ? "month" : "months"} at{" "}
                {occupancyRate}% counts as {bookedMonthsLabel(bookedMonths)}{" "}
                booked {bookedMonths === 1 ? "month" : "months"}.
              </p>

              <div>
                <FieldLabel
                  label="Management fee"
                  tip="HousingSaga buyers start at 0%. The other rates are only here so you can compare."
                />
                <select
                  value={managementFee}
                  aria-label="Management fee"
                  onChange={(event) =>
                    setManagementFee(Number(event.target.value))
                  }
                  className="w-full rounded-xl border border-lime-600/40 bg-lime-100 px-3 py-2.5 text-sm font-semibold text-lime-950 outline-none transition"
                >
                  <option value={0}>0% — HousingSaga buyer benefit</option>
                  <option value={15}>15% — Other platform standard fee</option>
                  <option value={25}>
                    25% — other platform full-service fee
                  </option>
                </select>
              </div>

              <div>
                <FieldLabel
                  label="Value growth"
                  tip="How much the home's value is assumed to rise each year. It is an illustration, not a forecast, and it does not change rental income."
                />
                <div className="relative">
                  <input
                    type="text"
                    inputMode="decimal"
                    aria-label="Value growth per year"
                    value={appreciationRate}
                    onChange={(event) => {
                      const next = Number(
                        event.target.value.replace(/[^\d.]/g, ""),
                      );
                      if (!Number.isFinite(next)) {
                        setAppreciationRate(0);
                        return;
                      }
                      setAppreciationRate(
                        Math.min(20, Math.round(next * 10) / 10),
                      );
                    }}
                    className={`${inputClass} pr-16`}
                  />
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-500">
                    % / year
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-auto pt-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-lime-800">
                From these details
              </p>
              <dl className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
                <div className="rounded-xl bg-[#f4f6f1] px-3 py-2.5">
                  <dt className="text-xs text-slate-500">Booked months</dt>
                  <dd className="mt-1 text-sm font-semibold tabular-nums text-slate-950">
                    {bookedMonthsLabel(bookedMonths)}
                  </dd>
                  <p className="mt-1 text-xs leading-snug text-slate-500">
                    How long guests are actually in the home.
                  </p>
                </div>
                <div className="rounded-xl bg-[#f4f6f1] px-3 py-2.5">
                  <dt className="text-xs text-slate-500">Net rental income</dt>
                  <dd className="mt-1 text-sm font-semibold tabular-nums text-slate-950">
                    {euro(netIncome)} / year
                  </dd>
                  <p className="mt-1 text-xs leading-snug text-slate-500">
                    {managementFee === 0
                      ? "Rent you keep from the booked months, with no fee taken off."
                      : "Rent you keep from the booked months after the fee is taken off."}
                  </p>
                </div>
                <div className="rounded-xl bg-[#f4f6f1] px-3 py-2.5">
                  <dt className="text-xs text-slate-500">
                    Estimated value gain
                  </dt>
                  <dd className="mt-1 text-sm font-semibold tabular-nums text-slate-950">
                    {euro(valueGrowthYear1)}
                  </dd>
                  <p className="mt-1 text-xs leading-snug text-slate-500">
                    Your property's estimated value increase at 5% per year.
                  </p>
                </div>
              </dl>
            </div>
          </div>

          <div className="rounded-3xl bg-[#071422] p-6 text-white shadow-[0_24px_60px_-28px_rgba(7,20,34,0.8)] sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-xl font-semibold">
                Estimated annual results
              </h3>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm text-slate-300">
                <span className="relative flex h-2.5 w-2.5" aria-hidden>
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-70" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,0.95)]" />
                </span>
                Live estimate
              </span>
            </div>

            <motion.div
              key={Math.round(netIncome)}
              initial={reduce ? false : { opacity: 0.55 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
              className="relative mt-6 flex items-center justify-between gap-3 overflow-hidden rounded-2xl bg-lime-600 px-5 py-4 text-white"
            >
              <div className="relative z-10 min-w-0">
                <p className="text-3xl font-bold leading-none tracking-tight sm:text-4xl">
                  {euro(netIncome)}
                  <span className="ml-2 align-middle text-base font-semibold text-white/80 sm:text-lg">
                    / year
                  </span>
                </p>
                <p className="mt-2 text-sm text-white/90">
                  After management fee (from {euro(monthlyRent)} a month)
                </p>
              </div>
              <IncomeHouse className="relative z-10 h-16 w-[5.5rem] shrink-0 sm:h-[4.5rem] sm:w-28" />
            </motion.div>

            <div className="mt-6 space-y-3" aria-live="polite">
              <ResultRow
                icon={<Banknote className="h-5 w-5" />}
                iconClass="bg-lime-500 text-white"
                label="Annual gross rental income"
                detail={`${euro(monthlyRent)} × ${bookedMonthsLabel(bookedMonths)} booked months`}
                value={euro(grossIncome)}
                valueClass="text-lime-400"
              />
              <ResultRow
                icon={<BadgePercent className="h-5 w-5" />}
                iconClass="bg-white/10 text-white"
                label="Rental platform management fee"
                detail={
                  managementFee === 0
                    ? "HousingSaga buyer benefit"
                    : `${managementFee}% of gross income`
                }
                detailTone={managementFee === 0 ? "lime" : "muted"}
                value={euro(feeAmount)}
                valueClass="text-lime-300"
              />
              <ResultRow
                icon={<TrendingUp className="h-4 w-4" />}
                label="Benefit in year 1"
                detail={`${euro(netIncome)} rent + ${euro(valueGrowthYear1)} rise in home value. This year only.`}
                value={euro(yearlyIncome)}
              />
              <ResultRow
                icon={<Building2 className="h-4 w-4" />}
                label="Benefit until full recovery"
                detail={
                  recoveredRow
                    ? `Open to see each year. Covered in ${payback ?? durationLabel(recoveredRow.year * 12)}.`
                    : "Open to see each year until the purchase price is covered."
                }
                value={
                  purchasePrice > 0 && recoveredRow
                    ? euro(recoveredRow.totalSoFar)
                    : "—"
                }
                onClick={() => setYearsOpen(true)}
              />
              <ResultRow
                icon={<Clock3 className="h-4 w-4" />}
                label="Time to earn the purchase price back"
                detail={
                  extraPaybackMonths > 0 ? (
                    <span className="mt-1 inline-flex items-start gap-1.5 rounded-lg bg-amber-400/20 px-2 py-1 text-amber-100">
                      <TriangleAlert
                        className="mt-0.5 h-3.5 w-3.5 shrink-0"
                        aria-hidden
                      />
                      <span>
                        {extraPaybackMonths === 1
                          ? "1 extra month"
                          : `${extraPaybackMonths} extra months`}{" "}
                        versus a 0% fee
                      </span>
                    </span>
                  ) : (
                    "Until rent and value growth cover the price."
                  )
                }
                value={payback ?? "—"}
                valueClass="text-base leading-snug text-white sm:max-w-[9.5rem] sm:text-right"
                showDetailOnMobile={extraPaybackMonths > 0}
              />
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-3xl bg-[#071422] p-6 text-white shadow-[0_24px_60px_-28px_rgba(7,20,34,0.8)] sm:p-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-white">
                Until the purchase price is recovered
              </h3>
              <p className="mt-1 text-sm text-slate-400">
                Rent and home value are separate, and both run through the year
                the price is covered
                {payback ? ` (${payback})` : ""}.
              </p>
            </div>
            <div className="grid gap-8 lg:grid-cols-2">
              <SeriesChart
                title="Rent added up"
                color="#65a30d"
                highlight="#bef264"
                points={yearReturns.map((row) => ({
                  year: row.year,
                  amount: row.rentSoFar,
                  covered: row.percent >= 100,
                }))}
              />
              <SeriesChart
                title="Home value"
                color="#0284c7"
                highlight="#7dd3fc"
                points={yearReturns.map((row) => ({
                  year: row.year,
                  amount: purchasePrice + row.growthSoFar,
                  covered: row.percent >= 100,
                }))}
              />
            </div>
          </div>

          <ul className="mt-6 grid gap-3 rounded-2xl bg-white/5 p-4 text-sm leading-relaxed text-slate-300 sm:grid-cols-2">
            {[
              "Rent is what the home earns, added up through the year the price is covered.",
              "Home value starts from the purchase price and grows separately over those same years.",
              "The highlighted bar is the year the purchase price is covered.",
              `${appreciationRate}% growth is an illustration, not a promise.`,
            ].map((note) => (
              <li key={note} className="flex items-start gap-2">
                <CheckCircle2
                  className="mt-0.5 h-4 w-4 shrink-0 text-lime-400"
                  aria-hidden
                />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <YearReturnsOverlay
        open={yearsOpen}
        onClose={() => setYearsOpen(false)}
        rows={yearReturns}
      />
    </section>
  );
}

function GrowthInfo({ tip, light = false, label = "More information" }: { tip: string; light?: boolean; label?: string }) {
  return (
    <span className="group relative inline-flex">
      <button
        type="button"
        aria-label={`About ${label}`}
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

function mobileYearMarkers(count: number) {
  const maxLabels = 8;
  const stride = Math.max(4, Math.ceil((count - 1) / (maxLabels - 1)));
  const indexes = new Set<number>();
  for (let index = 0; index < count; index += stride) indexes.add(index);
  indexes.add(count - 1);
  return indexes;
}

function SeriesChart({
  title,
  color,
  highlight,
  points,
}: {
  title: string;
  color: string;
  highlight: string;
  points: { year: number; amount: number; covered: boolean }[];
}) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<number | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [narrow, setNarrow] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 639px)");
    const update = () => setNarrow(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  if (points.length === 0) {
    return <p className="text-sm text-slate-400">Add a purchase price to see these years.</p>;
  }

  const max = Math.max(...points.map((point) => point.amount), 1);
  const width = 360;
  const height = 156;
  const left = 48;
  const right = 10;
  const top = 28;
  const baseline = 124;
  const plotH = baseline - top;
  const plotW = width - left - right;
  const step = points.length <= 1 ? 0 : plotW / (points.length - 1);
  const coords = points.map((point, index) => ({
    ...point,
    x: left + step * index,
    y: baseline - (point.amount / max) * plotH,
  }));
  const line = coords.map((point) => `${point.x},${point.y}`).join(" ");
  const depth = coords.map((point) => `${point.x + 3},${point.y + 6}`).join(" ");
  const area = `M ${coords[0].x} ${baseline} L ${line.replaceAll(" ", " L ").replaceAll(",", " ")} L ${coords[coords.length - 1].x} ${baseline} Z`;
  const ticks = [1, 0.5, 0].map((fraction) => ({
    label: compactEuro(max * fraction),
    y: baseline - fraction * plotH,
  }));
  const labelEvery = Math.max(1, Math.ceil(points.length / 8));
  const sparseMarkers = narrow && points.length > 11 ? mobileYearMarkers(points.length) : null;
  const current = active == null ? null : coords[active];
  const showPoint = (index: number) => sparseMarkers == null || sparseMarkers.has(index) || index === active;

  function onMove(event: React.MouseEvent<SVGSVGElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    if (!reduce) setTilt({ x: (0.5 - py) * 8, y: (px - 0.5) * 10 });
    const x = px * width;
    let nearest = 0;
    let best = Infinity;
    coords.forEach((point, index) => {
      const distance = Math.abs(point.x - x);
      if (distance < best) {
        best = distance;
        nearest = index;
      }
    });
    setActive(nearest);
  }

  return (
    <div>
      <p className="text-sm font-semibold text-white">{title}</p>
      <div
        className="mt-2 [perspective:900px]"
        onMouseLeave={() => {
          setActive(null);
          setTilt({ x: 0, y: 0 });
        }}
      >
        <div
          className="origin-center"
          style={{
            transform: reduce ? undefined : `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transition: active == null ? "transform 0.45s ease" : "transform 0.08s linear",
          }}
        >
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="h-44 w-full cursor-pointer"
            role="img"
            aria-label={title}
            onMouseMove={onMove}
          >
            <ellipse cx={width / 2} cy="150" rx="120" ry="6" fill="rgba(0,0,0,0.28)" />
            {ticks.map((tick) => (
              <g key={tick.y}>
                <line x1={left} x2={width - right} y1={tick.y} y2={tick.y} stroke="rgba(255,255,255,0.12)" />
                <text x={left - 8} y={tick.y + 4} textAnchor="end" fill="rgba(203,213,225,0.9)" fontSize="10">
                  {tick.label}
                </text>
              </g>
            ))}
            <path d={area} fill={color} fillOpacity="0.18" />
            <polyline points={depth} fill="none" stroke="rgba(0,0,0,0.45)" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round" />
            <polyline points={line} fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
            {coords.map((point, index) =>
              showPoint(index) ? (
              <text
                key={`amount-${point.year}`}
                x={point.x}
                y={Math.max(point.y - (index === active ? 16 : 9), 11)}
                textAnchor="middle"
                fill={index === active || point.covered ? highlight : "rgba(255,255,255,0.92)"}
                fontSize={index === active ? 11 : 9}
                fontWeight="700"
                stroke="#071422"
                strokeWidth="3"
                paintOrder="stroke"
              >
                {compactEuro(point.amount)}
              </text>
              ) : null,
            )}
            {current ? (
              <line
                x1={current.x}
                x2={current.x}
                y1={current.y + 6}
                y2={baseline}
                stroke={highlight}
                strokeDasharray="3 3"
                strokeOpacity="0.8"
              />
            ) : null}
            {coords.map((point, index) =>
              showPoint(index) ? (
              <circle
                key={point.year}
                cx={point.x}
                cy={index === active ? point.y - 2 : point.y}
                r={index === active ? 6.5 : point.covered ? 5 : 3.5}
                fill={index === active || point.covered ? highlight : color}
                stroke="#071422"
                strokeWidth="2"
              />
              ) : null,
            )}
            {coords.map((point, index) =>
              (sparseMarkers ? sparseMarkers.has(index) || index === active : index % labelEvery === 0 || point.covered || index === active) ? (
                <text
                  key={`year-${point.year}`}
                  x={point.x}
                  y="146"
                  textAnchor="middle"
                  fill={index === active || point.covered ? highlight : "rgba(148,163,184,0.95)"}
                  fontSize="11"
                  fontWeight={index === active || point.covered ? 700 : 500}
                >
                  {point.year}
                </text>
              ) : null,
            )}
          </svg>
        </div>
      </div>
    </div>
  );
}

function YearReturnsOverlay({
  open,
  onClose,
  rows,
}: {
  open: boolean;
  onClose: () => void;
  rows: {
    year: number;
    rentSoFar: number;
    growthSoFar: number;
    total: number;
    totalSoFar: number;
    percent: number;
  }[];
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/55 p-4 sm:items-center"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="five-year-returns-title"
        className="flex max-h-[85vh] w-full max-w-lg flex-col rounded-3xl bg-[#071422] p-6 text-white"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h4 id="five-year-returns-title" className="text-lg font-semibold">
              How much you recover
            </h4>
            <p className="mt-1 text-sm leading-relaxed text-slate-400">
              Each year includes the years before it, until the purchase price is fully covered.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close yearly returns"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <ol className="mt-5 max-h-80 space-y-2 overflow-y-auto overscroll-contain pr-2 [scrollbar-color:#84cc16_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-lime-500 [&::-webkit-scrollbar-track]:bg-white/10">
          {rows.map((row) => (
            <li
              key={row.year}
              className="flex items-center justify-between gap-4 rounded-2xl bg-white/10 px-4 py-3"
            >
              <div>
                <p className="text-sm font-semibold">After year {row.year}</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-400">
                  {euro(row.rentSoFar)} rent + {euro(row.growthSoFar)} rise in home value
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold tabular-nums">{euro(row.totalSoFar)}</p>
                <p className="text-sm font-semibold text-lime-400">
                  {percentLabel(row.percent)} recovered
                </p>
              </div>
            </li>
          ))}
        </ol>
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
  onClick,
  showDetailOnMobile = false,
}: {
  icon: ReactNode;
  label: string;
  detail: ReactNode;
  value: string;
  detailTone?: "muted" | "lime";
  iconClass?: string;
  valueClass?: string;
  onClick?: () => void;
  showDetailOnMobile?: boolean;
}) {
  const className = `flex w-full flex-col gap-1 rounded-2xl bg-white/10 px-3 py-3 text-left ring-1 ring-white/15 sm:flex-row sm:items-start sm:justify-between sm:gap-4 ${
    onClick ? "cursor-pointer hover:bg-white/15" : ""
  }`;
  const detailClass = detailTone === "lime" ? "mt-1 text-sm text-lime-300" : "mt-1 text-sm text-slate-400";
  const body = (
    <>
      <div className="flex min-w-0 flex-1 items-start gap-3">
        <span className={`hidden h-11 w-11 shrink-0 items-center justify-center rounded-2xl sm:flex ${iconClass}`}>
          {icon}
        </span>
        <div className="min-w-0">
          <p className="inline-flex items-center gap-1.5 text-sm font-medium leading-snug text-white sm:text-base">
            {label}
            {onClick ? <ChevronDown className="h-4 w-4 text-lime-400" aria-hidden /> : null}
          </p>
          <div className={`hidden sm:block ${detailClass}`}>{detail}</div>
        </div>
      </div>
      <p className={`text-lg font-bold tabular-nums sm:shrink-0 sm:pt-0.5 sm:text-xl ${valueClass}`}>{value}</p>
      {showDetailOnMobile ? <div className={`sm:hidden ${detailClass}`}>{detail}</div> : null}
    </>
  );

  if (onClick) {
    return (
      <motion.button
        type="button"
        key={value}
        initial={{ opacity: 0.55 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
        onClick={onClick}
        aria-haspopup="dialog"
        className={className}
      >
        {body}
      </motion.button>
    );
  }

  return (
    <motion.div
      key={value}
      initial={{ opacity: 0.55 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      className={className}
    >
      {body}
    </motion.div>
  );
}
