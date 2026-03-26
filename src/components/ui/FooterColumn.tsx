import Link from "next/link";
import Image from "next/image";

type FooterColumnProps = {
  column: {
    title: string;
    links: { label: string; href: string }[];
  };
};

type CountryFlagMatch = {
  src: string;
  alt: string;
  remainder: string;
};

function matchCountryFlag(label: string): CountryFlagMatch | null {
  const trimmed = label.trimStart();

  if (trimmed.startsWith("Greece:")) {
    return {
      src: "/greeceflag.png",
      alt: "Greece flag",
      remainder: trimmed.slice("Greece:".length).trimStart(),
    };
  }

  if (trimmed.startsWith("India:")) {
    return {
      src: "/indiaflag.png",
      alt: "India flag",
      remainder: trimmed.slice("India:".length).trimStart(),
    };
  }

  return null;
}

export default function FooterColumn({ column }: FooterColumnProps) {
  return (
    <div>
      {/* Title */}
      <div className="flex items-center gap-2 mb-5">
        <span className="w-[6px] h-[6px] bg-lime-400"></span>
        <h3 className="uppercase text-sm tracking-wider font-semibold">
          {column.title}
        </h3>
      </div>

      <div className="w-12 h-px bg-white/20 mb-6" />

      {/* Links */}
      <ul className="space-y-3 text-[15px] text-white/80">
        {column.links.map((link) => {
          const country = matchCountryFlag(link.label);

          return (
            <li key={link.label}>
              <Link
                href={link.href}
                className="hover:text-lime-400 transition inline-flex items-start gap-2"
              >
                {country ? (
                  <>
                    <Image
                      src={country.src}
                      alt={country.alt}
                      width={44}
                      height={44}
                      className="shrink-0 mt-[2px]"
                    />
                    <span>{country.remainder}</span>
                  </>
                ) : (
                  link.label
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
