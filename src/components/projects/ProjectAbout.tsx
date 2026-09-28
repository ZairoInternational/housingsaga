import { Home } from "lucide-react";
import {
  RiHotelBedLine,
  RiBuilding4Line,
  RiStarSmileLine,
  RiShieldCheckLine,
} from "react-icons/ri";

export interface ProjectHighlight {
  title: string;
  subtitle: string;
  icon?: "bed" | "building" | "star" | "shield";
}

export interface ProjectAboutProps {
  title: string;
  description: string;
  summary?: string;
  highlights?: ProjectHighlight[];
}

const iconMap = {
  bed: RiHotelBedLine,
  building: RiBuilding4Line,
  star: RiStarSmileLine,
  shield: RiShieldCheckLine,
};

/** Split title so the last 1–2 words can be accented green (matches design). */
function splitAccentTitle(title: string): { lead: string; accent: string } {
  const parts = title.trim().split(/\s+/);
  if (parts.length <= 2) {
    return { lead: "", accent: title };
  }
  const accentCount = parts.length >= 4 ? 2 : 1;
  return {
    lead: parts.slice(0, -accentCount).join(" "),
    accent: parts.slice(-accentCount).join(" "),
  };
}

export default function ProjectAbout({
  title,
  description,
  summary,
  highlights = [],
}: ProjectAboutProps) {
  const paragraphs = description
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
  const { lead, accent } = splitAccentTitle(title);

  return (
    <div className="min-w-0 relative">
      <span className="inline-flex items-center gap-2 rounded-full bg-[#d9f99d] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#14532d]">
        <Home className="h-3.5 w-3.5" strokeWidth={2.4} />
        About this property
      </span>

      <h2 className="mt-5 text-[1.75rem] sm:text-[2.15rem] lg:text-[2.4rem] font-bold leading-[1.15] tracking-tight text-[#1e293b]">
        {lead ? (
          <>
            {lead}{" "}
            <span className="text-[#14532d]">{accent}</span>
          </>
        ) : (
          <span className="text-[#14532d]">{accent}</span>
        )}
      </h2>

      {summary && (
        <p className="mt-4 text-[15px] sm:text-base text-gray-500 leading-relaxed max-w-2xl">
          {summary}
        </p>
      )}

      <div className="mt-4 space-y-3 max-w-2xl">
        {(paragraphs.length > 0 ? paragraphs : [description]).map((p, i) => (
          <p
            key={i}
            className="text-[14px] sm:text-[15px] leading-[1.85] text-gray-500"
          >
            {p}
          </p>
        ))}
      </div>

      {highlights.length > 0 && (
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 xl:gap-5">
          {highlights.map((item) => {
            const Icon = iconMap[item.icon ?? "building"];
            return (
              <div key={item.title} className="flex items-start gap-3 min-w-0">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#ecfccb] text-[#14532d]">
                  <Icon className="h-[22px] w-[22px]" />
                </span>
                <div className="min-w-0 pt-0.5">
                  <p className="text-[14px] font-bold text-[#14532d] leading-snug">
                    {item.title}
                  </p>
                  <p className="mt-1 text-[12px] text-gray-500 leading-snug">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Soft leaf accents like the mockup */}
      <svg
        aria-hidden
        className="pointer-events-none absolute -bottom-6 left-0 h-16 w-16 text-lime-200/60 hidden sm:block"
        viewBox="0 0 64 64"
        fill="currentColor"
      >
        <path d="M12 48c8-18 22-30 40-36-6 20-18 34-36 42 0-2-2-4-4-6z" />
      </svg>
    </div>
  );
}
