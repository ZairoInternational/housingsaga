import Image from "next/image";

export default function PrivacyHero() {
  return (
    <section className="relative w-full h-[420px] sm:h-[480px] flex items-center justify-center text-white">
      <Image
        src="/legal-hero.webp"
        alt="Privacy policy hero"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative text-center px-4">
        <p className="text-xs sm:text-sm text-lime-400 mb-3 tracking-[0.24em] uppercase">
          Legal
        </p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-3 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-sm sm:text-base text-white/80 max-w-xl mx-auto">
          How HousingSaga collects, uses, and protects your information.
        </p>
      </div>
    </section>
  );
}

