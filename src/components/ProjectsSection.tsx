 "use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";

type Project = {
  id: string;
  img: string;
  title: string;
  tag: string;
  area: string;
  beds: number;
  baths: number;
  cars: number;
};

const dummyProjects = (): Project[] => [
  {
    id: "p1",
    img: "/property.jpeg",
    title: "Premier Office Tower",
    tag: "Seattle, Washington",
    area: "3,200 sq ft",
    beds: 4,
    baths: 3,
    cars: 2,
  },
  {
    id: "p2",
    img: "/palmhouse.jpg",
    title: "The Palm Residence",
    tag: "Chicago, Illinois",
    area: "2,450 sq ft",
    beds: 3,
    baths: 2,
    cars: 2,
  },
  {
    id: "p3",
    img: "/lakeview.jpg",
    title: "Lakeview Estate",
    tag: "Denver, Colorado",
    area: "4,100 sq ft",
    beds: 5,
    baths: 4,
    cars: 3,
  },
];

const Icon = ({ name }: { name: "area" | "beds" | "baths" | "cars" }) => {
  switch (name) {
    case "area":
      return (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14V7L12 3 3 7z" />
        </svg>
      );
    case "beds":
      return (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M3 7h18v10H3z M5 7v-2a2 2 0 012-2h10a2 2 0 012 2v2" />
        </svg>
      );
    case "baths":
      return (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M8 3v4M16 3v4M3 13h18v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6z" />
        </svg>
      );
    case "cars":
      return (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M3 13l1-4h16l1 4M5 13v4a1 1 0 001 1h1M17 13v4a1 1 0 001 1h1" />
        </svg>
      );
  }
};

const ProjectsSection: React.FC = () => {
  const projects = useMemo(() => dummyProjects(), []);
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(projects.length - 1, i + 1));

  // card width + gap must match CSS (used for transform)
  const cardWidth = 480; // px (bigger cards)
  const gap = 32; // px

  return (
    <section className="bg-[#171717] text-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-start justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 text-sm text-emerald-400 mb-4">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
              <span className="uppercase">Highlighted Real Projects</span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
              Showcasing Innovative
              <br />
              Property Projects
            </h2>

            <p className="mt-6 max-w-2xl text-lg text-white/80">
              Redefine modern living through innovation, quality, and meaningful
              property experiences that elevate everyday life.
            </p>
          </div>

          <div className="shrink-0 hidden md:flex items-center gap-3">
            <button
              aria-label="previous"
              onClick={prev}
              className="p-3 rounded-full bg-white/8 hover:bg-white/12 disabled:opacity-40"
              disabled={index === 0}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              aria-label="next"
              onClick={next}
              className="p-3 rounded-full bg-white/8 hover:bg-white/12 disabled:opacity-40"
              disabled={index === projects.length - 1}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="mt-12 overflow-hidden">
          <div
            className="flex transition-transform duration-500"
            style={{
              transform: `translateX(-${index * (cardWidth + gap)}px)`,
            }}
          >
            {projects.map((card) => (
              <article
                key={card.id}
                className="group relative bg-black/40 rounded-2xl overflow-hidden shadow-xl min-w-[480px] mr-8"
                style={{ width: `${cardWidth}px` }}
              >
                <div className="relative h-[420px] overflow-hidden">
                  <img
                    src={card.img}
                    alt={card.title}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:translate-x-6"
                  />

                  <div className="absolute top-4 left-4 bg-black/40 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
                    {card.tag}
                  </div>

                  <div className="absolute left-6 bottom-6 text-white">
                    <h3 className="text-2xl font-semibold drop-shadow-lg">{card.title}</h3>
                  </div>

                  {/* Hover panel */}
                  <div className="absolute inset-0 flex items-end">
                    <div className="w-full bg-gradient-to-t from-black/80 to-transparent p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6 text-sm text-white/90">
                          <div className="flex items-center gap-2">
                            <Icon name="area" />
                            <span>{card.area}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Icon name="beds" />
                            <span>{card.beds} Beds</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Icon name="baths" />
                            <span>{card.baths} Baths</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Icon name="cars" />
                            <span>{card.cars} Cars</span>
                          </div>
                        </div>

                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Link href={`/projects/${card.id}`} className="inline-flex items-center gap-2 bg-emerald-400 text-black px-4 py-2 rounded-full text-sm font-medium">
                            View Property
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* mobile indicators */}
        <div className="mt-6 flex items-center justify-center gap-3 md:hidden">
          <button
            onClick={prev}
            className="p-2 rounded-full bg-white/8 hover:bg-white/12 disabled:opacity-40"
            disabled={index === 0}
            aria-label="prev"
          >
            ‹
          </button>
          <div className="flex items-center gap-2">
            {projects.map((p, i) => (
              <button
                key={p.id}
                onClick={() => setIndex(i)}
                className={`w-3 h-3 rounded-full ${i === index ? "bg-emerald-400" : "bg-white/20"}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="p-2 rounded-full bg-white/8 hover:bg-white/12 disabled:opacity-40"
            disabled={index === projects.length - 1}
            aria-label="next"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;

