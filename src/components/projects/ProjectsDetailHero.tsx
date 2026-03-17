import Image from "next/image";
import Link from "next/link";


interface Crumb {
  label: string;
  href?: string;
}

export interface ProjectsDetailHeroProps {
  breadcrumbs?: Crumb[];
  title?: string;
}

export default function ProjectsDetailHero({
  breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "Projects Detail" },
  ],

}: ProjectsDetailHeroProps) {
  return (
    <section className="relative w-full h-[420px] sm:h-[420px] flex items-center justify-center text-white overflow-hidden">
      <Image
        src="/faq.jpg"
        alt="Projects detail hero"
        fill
        priority
        className="object-cover scale-105"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />

      <div className="relative text-center px-4 flex flex-col items-center gap-4">
    

        {/* Breadcrumb */}
        {breadcrumbs.length > 0 && (
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-5 text-xs sm:text-sm text-white/70"
          >
            {breadcrumbs.map((crumb, i) => (
              <span key={crumb.label} className="flex items-center gap-4">
                {i > 0 && (
                  <span className="h-1.5 w-1.5  bg-lime-400 " />
                )}
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="hover:text-white transition-colors text-lg"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white font-medium">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
      </div>
    </section>
  );
}
