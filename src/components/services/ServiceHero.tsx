"use client";

import Image from "next/image";
import type { FC } from "react";

type ServiceHeroProps = {
  heroTitle?: string;
  breadcrumbFirstLabel?: string;
  breadcrumbLastLabel?: string;
};

const ServiceHero: FC<ServiceHeroProps> = ({
  heroTitle = "Services Page",
  breadcrumbFirstLabel = "Home",
  breadcrumbLastLabel = "Services Page",
}) => {
  return (
    <section className="relative w-full h-[670px] flex items-center justify-center text-white">
      <Image
        src="/faq-hero.webp"
        alt="FAQ hero"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/40" />

      <div className="relative text-center ">
        <h1 className="text-[96px] font-semibold mb-6">{heroTitle}</h1>

        <div className="flex items-center justify-center gap-3 text-lg mt-20">
          <span>{breadcrumbFirstLabel}</span>
          <span className="w-2 h-2 bg-lime-400 rounded-full"></span>
          <span>{breadcrumbLastLabel}</span>
        </div>
      </div>
    </section>
  );
};

export default ServiceHero;
