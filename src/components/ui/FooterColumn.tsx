import Link from "next/link";

type FooterColumnProps = {
  column: {
    title: string;
    links: { label: string; href: string }[];
  };
};

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
        {column.links.map((link) => (
          <li key={link.label}>
            <Link href={link.href} className="hover:text-lime-400 transition">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
