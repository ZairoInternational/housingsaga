import Image from "next/image";

export default function PricingHero() {
  return (
    <section className="relative w-full h-[520px] sm:h-[600px] flex items-center justify-center text-white">
      <Image
        src="/pricing-hero.webp"
        alt="Pricing hero"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative text-center px-4">
        <p className="text-sm sm:text-base text-lime-400 mb-3 tracking-[0.24em] uppercase">
          Pricing &amp; Plans
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold mb-4 tracking-tight">
          Transparent Pricing,
          <br className="hidden sm:block" />
          No Hidden Surprises
        </h1>
        <p className="text-sm sm:text-base text-white/80 max-w-xl mx-auto">
          Choose a plan that matches your goals. From owners listing properties to buyers
          exploring options, our pricing is built for clarity and value.
        </p>
      </div>
    </section>
  );
}

