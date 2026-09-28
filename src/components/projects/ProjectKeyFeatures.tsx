import {
  RiHotelBedLine,
  RiShowersLine,
  RiAspectRatioLine,
  RiAwardLine,
} from "react-icons/ri";

export interface ProjectKeyFeaturesProps {
  bedrooms?: number;
  bathrooms?: number;
  areaSqft?: number;
  hasAmenities?: boolean;
}

export default function ProjectKeyFeatures({
  bedrooms,
  bathrooms,
  areaSqft,
  hasAmenities = false,
}: ProjectKeyFeaturesProps) {
  // Order matches the design mockup: beds, area, baths, amenities
  const items = [
    bedrooms !== undefined && {
      icon: RiHotelBedLine,
      label: "Bedrooms",
      value: String(bedrooms),
    },
    areaSqft !== undefined && {
      icon: RiAspectRatioLine,
      label: "Built Area",
      value: `${areaSqft.toLocaleString()} SQFT`,
    },
    bathrooms !== undefined && {
      icon: RiShowersLine,
      label: "Bathrooms",
      value: String(bathrooms),
    },
    {
      icon: RiAwardLine,
      label: "Luxury Amenities",
      value: hasAmenities ? "Yes" : "—",
    },
  ].filter(Boolean) as {
    icon: typeof RiHotelBedLine;
    label: string;
    value: string;
  }[];

  return (
    <div className="rounded-[1.25rem] border border-gray-100/80 bg-white shadow-[0_10px_40px_rgba(20,83,45,0.06)] px-6 py-6">
      <h3 className="text-base font-bold text-[#14532d]">
        Key Property Features
      </h3>
      <div className="mt-1.5 mb-5 h-[3px] w-12 rounded-full bg-lime-400" />

      <div className="grid grid-cols-2 gap-x-4 gap-y-5">
        {items.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-center gap-3 min-w-0">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ecfccb] text-[#14532d]">
              <Icon className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <p className="text-[12px] text-gray-500 leading-tight">{label}</p>
              <p className="text-sm font-bold text-[#14532d] truncate">
                {value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
