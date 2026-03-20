import Image from "next/image";
import type { ReactNode } from "react";

type PricingHeroProps = {
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  imageAlt?: string;
};

export default function PricingHero({
  eyebrow = "For Property Owners",
  title = (
    <>
      Transparent Owner Pricing,
      <br className="hidden sm:block" />
      No Hidden Costs
    </>
  ),
  description = (
    <>
      At Housing Saga, our pricing is designed to reflect transparency, value,
      and performance-driven results. Property owners benefit from serious
      buyer engagement, global exposure, and successful transactions.
    </>
  ),
  imageAlt = "Owner pricing hero",
}: PricingHeroProps) {
  return (
    <section className="relative w-full h-[520px] sm:h-[600px] flex items-center justify-center text-white">
      <Image
        src="/pricing-hero.webp"
        alt={imageAlt}
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative text-center px-4">
        <p className="text-sm sm:text-base text-lime-400 mb-3 tracking-[0.24em] uppercase">
          {eyebrow}
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold mb-4 tracking-tight">
          {title}
        </h1>
        <p className="text-sm sm:text-base text-white/80 max-w-xl mx-auto">
          {description}
        </p>
      </div>
    </section>
  );
}

