import type { ReactNode } from "react";

export interface ProjectAboutProps {
  description?: string;
  sections?: { title: string; body: string }[];
  bulletPoints?: string[];
}

const DEFAULT_SECTIONS: { title: string; body: string }[] = [
  {
    title: "About this property",
    body: "A family house is more than just a place to live it is a sanctuary where warmth, unity, and comfort naturally come together. Within its walls, cherished moments unfold as family members share their daily lives, celebrate milestones, and create a strong foundation of love and connection. It is the place where ordinary routines become lasting traditions, and where every challenge is faced with support and care. Daily life within this space nurtures relationships and fosters a sense of belonging that endures across generations.",
  },
  {
    title: "Spaces That Bring People Closer",
    body: "Designed with both comfort and function in mind, the family house provides inviting living areas, cozy bedrooms, and a welcoming kitchen that often becomes the true heart of the home. Each space is thoughtfully arranged to encourage relaxation, laughter, and meaningful interactions. From quiet evenings by the fireplace to lively celebrations, the house shapes moments of joy and closeness. Every room is intentionally crafted to support connection, making togetherness an effortless part of everyday life.",
  },
  {
    title: "A Retreat of Comfort",
    body: "Lavish furnishings, soft textures, and warm lighting create an atmosphere that soothes the senses. Every feature is carefully selected to promote deep rest and ease. From quiet evenings alone to shared moments with loved ones, the bedroom becomes a sanctuary where comfort and serenity thrive. Every detail supports a sense of peaceful retreat in daily life.",
  },
];

const DEFAULT_BULLETS = [
  "Compact Design: Fits perfectly into any room or workspace.",
  "Smart Sensing: Automatically adjusts settings based on air quality.",
  "Child Safe: Features a secure, tamper-proof locking mechanism.",
  "Eco Mode: Conserves energy without compromising effectiveness.",
];

const LEGACY_SECTION = {
  title: "Legacy of Love Across Generations",
  body: "Beyond walls and rooms, a family house carries the spirit of those who live within it. It becomes a living archive of laughter, growth, and shared experiences. Passed from one generation to the next, it preserves stories and values, reminding everyone that a home is not only where you live, but where love continues to thrive. Its legacy is built on the small everyday moments that shape enduring family bonds.",
};

export default function ProjectAbout({
  description,
  sections,
  bulletPoints,
}: ProjectAboutProps) {
  const isDefault = !sections && !description;

  // Resolve sections
  const topSections: { title: string; body: ReactNode }[] = isDefault
    ? DEFAULT_SECTIONS
    : sections && sections.length > 0
      ? sections
      : [{ title: "About this property", body: description ?? "" }];

  // Resolve bullets
  const bullets =
    bulletPoints && bulletPoints.length > 0
      ? bulletPoints
      : isDefault
        ? DEFAULT_BULLETS
        : [];

  return (
    <div className="text-[14px] sm:text-[15px] leading-relaxed text-gray-700">
      {/* Sections */}
      <div className="space-y-5">
        {topSections.map((section, i) => (
          <div key={String(section.title)}>
            <h2
              className={`font-bold text-gray-900 mb-2 leading-tight ${
                i === 0
                  ? "text-[26px] sm:text-[30px]"
                  : "text-[18px] sm:text-[20px]"
              }`}
            >
              {section.title}
            </h2>
            <p className="text-gray-600 leading-[1.75] text-[14px] sm:text-[15px]">
              {section.body}
            </p>
          </div>
        ))}
      </div>

      {/* Bullet points */}
      {bullets.length > 0 && (
        <ul className="mt-5 space-y-[10px]">
          {bullets.map((point) => {
            const colonIdx = point.indexOf(":");
            const hasBold = colonIdx !== -1;
            const boldPart = hasBold ? point.slice(0, colonIdx + 1) : null;
            const restPart = hasBold ? point.slice(colonIdx + 1) : point;
            return (
              <li key={point} className="flex items-center gap-2.5">
                <span className="flex-shrink-0 inline-flex h-[18px] w-[18px] items-center justify-center rounded-full bg-lime-400">
                  <svg
                    className="h-[10px] w-[10px] text-white"
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="2,6 5,9 10,3" />
                  </svg>
                </span>
                <span className="text-[14px] text-gray-800 leading-snug">
                  {hasBold ? (
                    <>
                      <strong className="font-semibold text-gray-900">
                        {boldPart}
                      </strong>
                      {restPart}
                    </>
                  ) : (
                    restPart
                  )}
                </span>
              </li>
            );
          })}
        </ul>
      )}

      {/* Legacy / trailing section — shown only in default mode */}
      {isDefault && (
        <div className="mt-5">
          <h2 className="text-[18px] sm:text-[20px] font-bold text-gray-900 mb-2 leading-tight">
            {LEGACY_SECTION.title}
          </h2>
          <p className="text-gray-600 leading-[1.75] text-[14px] sm:text-[15px]">
            {LEGACY_SECTION.body}
          </p>
        </div>
      )}
    </div>
  );
}
