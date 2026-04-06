import { formatEurAmount } from "@/lib/format-currency";

export interface ProjectPropertyDetailsProps {
  furnishingLabel: string;
  floorStatusLabel?: string;
  leaseTerm: string;
  depositAmount?: number;
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4 py-3 border-b border-gray-100 last:border-b-0">
      <span className="text-[13px] font-medium text-gray-500">{label}</span>
      <span className="text-[14px] font-semibold text-gray-900 text-right sm:max-w-[65%]">
        {value}
      </span>
    </div>
  );
}

export default function ProjectPropertyDetails({
  furnishingLabel,
  floorStatusLabel,
  leaseTerm,
  depositAmount,
}: ProjectPropertyDetailsProps) {
  const rows: { label: string; value: string }[] = [];

  if (floorStatusLabel) {
    rows.push({ label: "Floor", value: floorStatusLabel });
  }
  rows.push({ label: "Furnishing", value: furnishingLabel });
  rows.push({ label: "Lease term", value: leaseTerm });
  if (depositAmount !== undefined && depositAmount !== null) {
    rows.push({
      label: "Security deposit",
      value: formatEurAmount(depositAmount),
    });
  }

  if (rows.length === 0) return null;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm px-5 pt-4 pb-2">
      <h3 className="text-[13px] font-semibold text-gray-900 tracking-[0.05em] mb-1">
        Lease & specifications
      </h3>
      <div>
        {rows.map((row) => (
          <DetailRow key={row.label} label={row.label} value={row.value} />
        ))}
      </div>
    </div>
  );
}
