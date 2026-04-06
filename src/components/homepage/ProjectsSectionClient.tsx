"use client";

import React from "react";
import PropertyCard, { type PropertyCardData } from "@/components/ui/propertyCard";
import Slider from "@/components/ui/slider";

export interface ProjectsSectionClientProps {
  projects: PropertyCardData[];
}

const ProjectsSectionClient: React.FC<ProjectsSectionClientProps> = ({
  projects,
}) => {
  return (
    <section className="bg-[#171717] text-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2.5 text-xs text-lime-400 mb-5 tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-lime-400 inline-block" />
            <span>Highlighted Real Projects</span>
          </div>

          <h2 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-[1.05] tracking-tight">
            Showcasing Innovative
            <br />
            Property Projects
          </h2>

          <p className="mt-5 max-w-xl text-[15px] text-white/55 leading-relaxed font-light">
            Redefine modern living through innovation, quality, and meaningful
            property experiences that elevate everyday life.
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
