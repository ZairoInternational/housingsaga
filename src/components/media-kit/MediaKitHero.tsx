import Image from "next/image";

export default function MediaKitHero() {
  return (
    <section className="relative w-full h-[520px] sm:h-[600px] flex items-center justify-center text-white">
      <Image
        src="/media-kit-hero.webp"
        alt="Media kit hero"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/55" />
      <div className="relative text-center px-4">
        <p className="text-sm sm:text-base text-lime-400 mb-3 tracking-[0.24em] uppercase">
          Press & Brand Assets
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold mb-4 tracking-tight">
          Media Kit
        </h1>
        <p className="text-sm sm:text-base text-white/80 max-w-xl mx-auto">
          Download official logos, brand guidelines, and media resources for HousingSaga.
        </p>
      </div>
    </section>
  );
}

