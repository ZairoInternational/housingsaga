import Image from "next/image";
import Link from "next/link";

export default function ProjectsHero() {
  return (
    <section className="relative w-full h-[520px] sm:h-[600px] flex items-center justify-start text-white overflow-hidden">
      <Image
        src="/projects-hero.webp"
        alt="Projects hero"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent" />

      <div className="relative z-10 px-6 sm:px-10 md:px-16 w-full max-w-[1200px] mx-auto">
        <div className="flex items-center gap-2 text-sm text-white/60 mb-4 tracking-wide">
          <Link
            href="/"
            className="hover:text-lime-300 transition-colors duration-200"
          >
            Home
          </Link>
          <span className="w-1.5 h-1.5 bg-lime-400 rounded-full" />
          <span className="text-white/90">Projects</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight tracking-tight max-w-2xl">
          Explore Our{" "}
          <span className="text-lime-400">Featured Properties</span>
        </h1>

        <p className="mt-5 max-w-xl text-sm sm:text-base text-white/80 leading-relaxed">
          Browse curated residential and investment projects across prime
          locations, all vetted and powered by HousingSaga&apos;s modern
          property platform.
        </p>

        <div className="mt-6 w-16 h-[3px] bg-lime-400 rounded-full" />
      </div>
    </section>
  );
}

