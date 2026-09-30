import Link from "next/link";
import { isGoldenVisaEligible } from "@/lib/golden-visa-eligibility";

type Props = {
  /** Set only when the listing was marked eligible for Golden Visa */
  eligible?: boolean | null;
  /** Visual size for cards vs detail banners */
  size?: "sm" | "md";
  /** Optional link to Golden Visa page */
  href?: string;
  className?: string;
};

/**
 * Corner ribbon shown on Golden Visa–eligible properties.
 */
export default function GoldenVisaRibbon({
  eligible,
  size = "sm",
  href = "/golden-visa",
  className = "",
}: Props) {
  if (!isGoldenVisaEligible(eligible)) return null;

  const compact = size === "sm";

  return (
    <div
      className={`absolute top-0 right-0 z-20 overflow-hidden pointer-events-none ${
        compact ? "w-[118px] h-[118px]" : "w-[148px] h-[148px]"
      } ${className}`}
      aria-label="Golden Visa Eligible"
    >
      <Link
        href={href}
        className={`
          pointer-events-auto absolute
          block text-center font-bold uppercase tracking-[0.06em] text-black
          bg-lime-400 shadow-lg
          hover:bg-lime-300 transition-colors
          rotate-45 origin-center
          ${
            compact
              ? "top-[22px] right-[-34px] w-[160px] py-1.5 text-[9px] leading-tight"
              : "top-[30px] right-[-38px] w-[190px] py-2 text-[11px] leading-tight"
          }
        `}
      >
        Golden Visa
        <span className="block font-semibold normal-case tracking-normal opacity-90">
          Eligible
        </span>
      </Link>
    </div>
  );
}
