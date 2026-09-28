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
    { label: "Project Detail" },
  ],
  title = "Project Detail",
}: ProjectsDetailHeroProps) {
  return (
    <section className="relative w-full h-[220px] sm:h-[280px] flex items-center justify-center text-white overflow-hidden">
      <Image
        src="/faq.jpg"
        alt=""
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-black/65" />

      <div className="relative z-10 text-center px-4 flex flex-col items-center gap-3 max-w-4xl mx-auto">
        {breadcrumbs.length > 0 && (
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center justify-center gap-2 text-sm text-white/70"
          >
            {breadcrumbs.map((crumb, i) => (
              <span key={`${crumb.label}-${i}`} className="flex items-center gap-2">
                {i > 0 && (
                  <span className="h-1.5 w-1.5 rounded-full bg-lime-400 shrink-0" />
                )}
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="hover:text-white transition-colors"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white/90 truncate max-w-[200px] sm:max-w-none">
                    {crumb.label}
                  </span>
                )}
              </span>
            ))}
          </nav>
        )}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-white">
          {title}
        </h1>
      </div>
    </section>
  );
}
