"use client";

import React, { useMemo } from "react";
import PropertyCard, { PropertyCardData } from "@/components/ui/propertyCard";
import Slider from "@/components/ui/slider";


// ─── Data ─────────────────────────────────────────────────────────────────────

const dummyProjects = (): PropertyCardData[] => [
  {
    id: "p1",
    img: "/property.jpeg",
    title: "Premier Office Tower",
    tag: "Seattle, Washington",
    area: "3,200",
    beds: 4,
    baths: 3,
    cars: 2,
  },
  {
    id: "p2",
    img: "/palmhouse.jpg",
    title: "The Palm Residence",
    tag: "Chicago, Illinois",
    area: "2,450",
    beds: 3,
    baths: 2,
    cars: 2,
  },
  {
    id: "p3",
    img: "/lakeview.jpg",
    title: "Lakeview Estate",
    tag: "Denver, Colorado",
    area: "4,100",
    beds: 5,
    baths: 4,
    cars: 3,
  },
];

// ─── Section ──────────────────────────────────────────────────────────────────

const ProjectsSection: React.FC = () => {
  const projects = useMemo(() => dummyProjects(), []);

  return (
    <section className="bg-[#171717] text-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2.5 text-xs text-emerald-400 mb-5 tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
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
        <Slider itemWidth={480} gap={28} showArrows showDots>
          {projects.map((card) => (
            <PropertyCard key={card.id} card={card} />
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default ProjectsSection;
