import ApproximateAreaMap from "@/components/projects/ApproximateAreaMap";
import { APPROXIMATE_AREA_RADIUS_KM_LABEL } from "@/lib/map-privacy";

export interface ProjectMapSectionProps {
  latitude?: number;
  longitude?: number;
  /** City / neighborhood label — never used as an exact pin drop */
  areaLabel?: string;
  /** Fallback for geocoding when coordinates are missing */
  address?: string;
}

export default function ProjectMapSection({
  latitude,
  longitude,
  areaLabel,
  address,
}: ProjectMapSectionProps) {
  const hasCoords =
    typeof latitude === "number" &&
    Number.isFinite(latitude) &&
    typeof longitude === "number" &&
    Number.isFinite(longitude);

  const canShowMap = hasCoords || Boolean(address?.trim());

  return (
    <section className="mt-12 sm:mt-16 mb-12 sm:mb-16">
      <div className="max-w-6xl md:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between mb-5">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              Map &amp; Location
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Approximate area only — exact address is shared after inquiry.
            </p>
          </div>
          {areaLabel && (
            <p className="text-sm font-medium text-gray-700">{areaLabel}</p>
          )}
        </div>

        <div className="rounded-3xl overflow-hidden border border-gray-200 bg-white shadow-sm">
          <div className="relative w-full h-[320px] sm:h-[380px] lg:h-[420px]">
            {canShowMap ? (
              <ApproximateAreaMap
                latitude={latitude}
                longitude={longitude}
                address={address}
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-gray-50 text-sm text-gray-400">
                Map preview is not available for this property.
              </div>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-gray-100 bg-white px-5 py-3 text-xs text-gray-500">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-lime-500 ring-2 ring-lime-200" />
              Approximate area · house marker
            </span>
            <span>
              ~{APPROXIMATE_AREA_RADIUS_KM_LABEL} km radius (exact address
              shared on inquiry)
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
