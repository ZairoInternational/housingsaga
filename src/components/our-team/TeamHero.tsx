import Image from "next/image";
import Link from "next/link";

export default function TeamHero() {
  return (
    <section className="relative w-full min-h-[400px] sm:min-h-[480px] lg:min-h-[540px] flex items-end text-white overflow-hidden">
      <Image
        src="/team-hero.jfif"
        alt="HousingSaga team"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-transparent" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-lime-400 mb-3">
          <span className="h-px w-6 bg-lime-400" />
          Our Team
        </p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
          Meet Our <span className="text-lime-400">Experts</span>
        </h1>
        <p className="mt-4 max-w-xl text-sm sm:text-base text-white/80 leading-relaxed">
          A cross-border team in India and Greece — advisors, legal partners,
          and operators focused on clear Golden Visa and property journeys.
        </p>
        <nav
          aria-label="Breadcrumb"
          className="mt-6 flex items-center gap-2 text-sm text-white/70"
        >
          <Link href="/" className="hover:text-white transition">
            Home
          </Link>
          <span className="text-white/40">›</span>
          <span className="text-white">Our Team</span>
        </nav>
      </div>
    </section>
  );
}
