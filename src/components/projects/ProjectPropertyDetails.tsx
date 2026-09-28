import {
  RiSofaLine,
  RiBuildingLine,
  RiCalendarCheckLine,
  RiMoneyEuroCircleLine,
} from "react-icons/ri";
import { formatEurAmount } from "@/lib/format-currency";

export interface ProjectPropertyDetailsProps {
  furnishingLabel: string;
  floorStatusLabel?: string;
  leaseTerm: string;
  depositAmount?: number;
}

export default function ProjectPropertyDetails({
  furnishingLabel,
  floorStatusLabel,
  leaseTerm,
  depositAmount,
}: ProjectPropertyDetailsProps) {
  const rows: {
    icon: typeof RiSofaLine;
    label: string;
    value: string;
  }[] = [];

  rows.push({
    icon: RiSofaLine,
    label: "Furnishing",
    value: furnishingLabel,
  });
  rows.push({
    icon: RiCalendarCheckLine,
    label: "Lease term",
    value: leaseTerm,
  });
  if (floorStatusLabel) {
    rows.push({
      icon: RiBuildingLine,
      label: "Floor",
      value: floorStatusLabel,
    });
  }
  if (depositAmount !== undefined && depositAmount !== null) {
    rows.push({
      icon: RiMoneyEuroCircleLine,
      label: "Security deposit",
      value: formatEurAmount(depositAmount),
    });
  }

  return (
    <div className="relative overflow-hidden rounded-[1.25rem] border border-gray-100/80 bg-white shadow-[0_10px_40px_rgba(20,83,45,0.06)] px-6 py-6">
      <h3 className="text-base font-bold text-[#14532d]">
        Lease &amp; Specifications
      </h3>
      <div className="mt-1.5 mb-4 h-[3px] w-12 rounded-full bg-lime-400" />

      <div className="relative z-10">
        {rows.map(({ icon: Icon, label, value }) => (
          <div
            key={label}
            className="flex items-center justify-between gap-3 py-3.5 border-b border-gray-100 last:border-b-0"
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#ecfccb] text-[#14532d]">
                <Icon className="h-4 w-4" />
              </span>
              <span className="text-sm text-gray-500">{label}</span>
            </div>
            <span className="text-sm font-bold text-[#14532d] text-right shrink-0 max-w-[50%] truncate">
              {value}
            </span>
          </div>
        ))}
      </div>

      <svg
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 h-24 w-24 text-lime-200/50"
        viewBox="0 0 96 96"
        fill="currentColor"
      >
        <path d="M78 22c-18 6-34 22-42 42-4-14-12-24-24-32 16 4 28 14 36 28 6-14 16-28 30-38z" />
        <path
          d="M36 64c12-8 22-10 32-10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.45"
        />
      </svg>
    </div>
  );
}
