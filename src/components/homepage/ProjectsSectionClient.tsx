"use client";

import React from "react";
import { useTranslations } from "next-intl";
import PropertyCard, { type PropertyCardData } from "@/components/ui/propertyCard";
import Slider from "@/components/ui/slider";

export interface ProjectsSectionClientProps {
  projects: PropertyCardData[];
}

const ProjectsSectionClient: React.FC<ProjectsSectionClientProps> = ({
  projects,
}) => {
  const t = useTranslations("homeSections");

  return (
    <section className="bg-[#171717] text-white py-16 sm:py-24 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 min-w-0">
        {/* Header */}
        <div className="mb-12 min-w-0">
          <div className="flex items-center gap-2.5 text-xs text-lime-400 mb-5 tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-lime-400 inline-block" />
            <span>{t("projectsEyebrow")}</span>
          </div>

          <h2 className="text-[clamp(2rem,8vw,4.5rem)] font-extrabold leading-[1.05] tracking-tight break-words">
            {t("projectsTitle1")}
            <br />
            {t("projectsTitle2")}
          </h2>

          <p className="mt-5 max-w-xl text-[15px] text-white/55 leading-relaxed font-light">
            {t("projectsLead")}
          </p>
        </div>

        {/* Slider */}
        {projects.length > 0 && (
          <Slider itemWidth={500} gap={28} showArrows showDots>
            {projects.map((card) => (
              <PropertyCard key={card.id} card={card} />
            ))}
          </Slider>
        )}
      </div>
    </section>
  );
};

export default ProjectsSectionClient;
