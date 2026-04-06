import Image from "next/image";

export interface ProjectKeyFeaturesProps {
  bedrooms?: number;
  bathrooms?: number;
  balconies?: number;
  areaSqft?: number;
}

interface FeatureRowProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  isLast?: boolean;
}

function FeatureRow({ icon, label, value, isLast }: FeatureRowProps) {
  return (
    <div
      className={`flex items-center justify-between py-3 ${
        !isLast ? "border-b border-gray-100" : ""
      }`}
    >
      <div className="flex items-center gap-2.5">
        <span className="text-gray-400 flex-shrink-0 w-5 flex items-center justify-center">
          {icon}
        </span>
        <span className="text-[14px] text-gray-600">{label}:</span>
      </div>
      <span className="text-[14px] font-semibold text-gray-900">{value}</span>
    </div>
  );
}

// SVG icons matching the screenshot style (outline, thin stroke)
const BedIcon = () => (
  <svg
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    className="h-[18px] w-[18px]"
  >
    <rect x="2" y="8" width="16" height="8" rx="1.5" />
    <path d="M2 12h16" />
    <path d="M6 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <path d="M2 16v1.5M18 16v1.5" />
  </svg>
);

const BathIcon = () => (
  <svg
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    className="h-[18px] w-[18px]"
  >
    <path d="M3 10h14v3a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-3Z" />
    <path d="M3 10V5a2 2 0 0 1 2-2v0a2 2 0 0 1 2 2v1" />
    <path d="M6 16.5V18M14 16.5V18" />
    <path d="M3 10h14" />
  </svg>
);

const BalconyIcon = () => (
  <svg
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    className="h-[18px] w-[18px]"
  >
    <path d="M3 17h14V3H3v14Z" />
    <path d="M3 10h14" />
    <path d="M10 3v14" />
    <path d="M10 10h7v7" />
  </svg>
);

const RulerIcon = () => (
  <svg
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    className="h-[18px] w-[18px]"
  >
    <rect x="2" y="7" width="16" height="6" rx="1" />
    <path d="M6 7v2M9 7v3M12 7v2M15 7v3" />
  </svg>
);

export default function ProjectKeyFeatures({
  bedrooms,
  bathrooms,
  balconies,
  areaSqft,
}: ProjectKeyFeaturesProps) {
  const rows = [
    bedrooms !== undefined && {
      icon: <BedIcon />,
      label: "Bed",
      value: bedrooms,
    },
    bathrooms !== undefined && {
      icon: <BathIcon />,
      label: "Bath",
      value: bathrooms,
    },
    balconies !== undefined && {
      icon: <BalconyIcon />,
      label: "Balconies",
      value: balconies,
    },
    areaSqft !== undefined && {
      icon: <RulerIcon />,
      label: "SQFT",
      value: `${areaSqft.toLocaleString()} SQFT`,
    },
  ].filter(Boolean) as {
    icon: React.ReactNode;
    label: string;
    value: string | number;
  }[];

  return (
    <div className="space-y-4">
      {/* Key features card */}
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm px-5 pt-4 pb-2">
        <h3 className="text-[13px] font-semibold text-gray-900 tracking-[0.05em] mb-0.5">
          Key Property Features
        </h3>
        <div>
          {rows.map((row, i) => (
            <FeatureRow
              key={row.label}
              icon={row.icon}
              label={row.label}
              value={row.value}
              isLast={i === rows.length - 1}
            />
          ))}
        </div>
      </div>

      {/* Agent card */}
      <div className="rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm">
        {/* Dark image with overlay text */}
        <div className="relative h-[520px] w-full">
          <Image
            src="/ft1-bg.jpg"
            alt="Agent"
            fill
            className="object-cover"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/55" />
          {/* Text over image */}
          <div className="absolute inset-0 flex flex-col justify-between  p-8">
            <p className="text-xl sm:text-3xl font-medium  text-white leading-snug tracking-wide ">
              Connect Directly With The Responsible Agent
            </p>
            <div className="space-y-5">
              <div>
                <p className="text-[13px] font-medium uppercase tracking-[0.16em] text-white/60 mb-0.5">
                  24/7 Support
                </p>
                <p className="text-[23px] font-medium text-white tracking-wide">
                  +1890 123 456
                </p>
              </div>
              <div>
                <p className="text-[13px] font-medium uppercase tracking-[0.16em] text-white/60 mb-0.5">
                  Email Us
                </p>
                <p className="text-[23px] font-medium text-white">
                  support@example.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
