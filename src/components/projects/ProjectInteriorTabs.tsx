"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Grid2x2,
  Play,
  LayoutTemplate,
  Images,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import ImageViewer from "../ImageViewer.";


export interface ProjectInteriorTabsProps {
  photos: string[];
  videoUrl?: string;
  floorPlanImages?: string[];
}

type TabId = "photos" | "video" | "floor";

const tabConfig = [
  { id: "photos", label: "Photos", Icon: Grid2x2 },
  { id: "video", label: "Video", Icon: Play },
  { id: "floor", label: "Floor Plans", Icon: LayoutTemplate },
];

export default function ProjectInteriorTabs({
  photos,
  videoUrl,
  floorPlanImages,
}: ProjectInteriorTabsProps) {
  const [active, setActive] = useState<TabId>("photos");

  // viewer state
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);

  // floor carousel
  const [floorIndex, setFloorIndex] = useState(0);

  // video state
  const [playVideo, setPlayVideo] = useState(false);

  const hasVideo = Boolean(videoUrl);
  const hasFloor = Boolean(floorPlanImages?.length);

  const visibleTabs = tabConfig.filter(
    (t) =>
      t.id === "photos" ||
      (t.id === "video" && hasVideo) ||
      (t.id === "floor" && hasFloor),
  );

  if (visibleTabs.length === 0) return null;

  return (
    <section className="mt-10 sm:mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Interior Space Design
          </h2>

          <div className="inline-flex bg-gray-100 rounded-full p-1">
            {visibleTabs.map(({ id, label, Icon }) => (
              <button
                key={id}
                onClick={() => {
                  setActive(id as TabId);
                  setPlayVideo(false); // reset video when switching tabs
                }}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm transition ${
                  active === id
                    ? "bg-lime-300 text-gray-900"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Card */}
        <div className="rounded-3xl border border-gray-200 bg-white p-4 sm:p-6">
          {/* ---------------- PHOTOS ---------------- */}
          {active === "photos" && (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
                {photos.slice(0, 6).map((src, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      setViewerIndex(i);
                      setViewerOpen(true);
                    }}
                    className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-gray-100 cursor-pointer"
                  >
                    <Image
                      src={src}
                      alt={`Photo ${i}`}
                      fill
                      placeholder="blur"
                      blurDataURL={src}
                      className="object-cover hover:scale-105 transition duration-500"
                    />
                  </div>
                ))}
              </div>

              {photos.length > 6 && (
                <div className="mt-5 flex justify-center">
                  <button
                    onClick={() => {
                      setViewerIndex(0);
                      setViewerOpen(true);
                    }}
                    className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                  >
                    <Images className="h-4 w-4 text-gray-500" />
                    View All Photos
                  </button>
                </div>
              )}
            </>
          )}

          {/* ---------------- VIDEO ---------------- */}
          {active === "video" && videoUrl && (
            <div className="relative aspect-video rounded-3xl overflow-hidden bg-black shadow-sm">
              {!playVideo && (
                <div
                  onClick={() => setPlayVideo(true)}
                  className="absolute inset-0 flex items-center justify-center cursor-pointer"
                >
                  <div className="h-16 w-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                    <Play className="h-6 w-6 text-black" />
                  </div>
                </div>
              )}

              {playVideo && (
                <iframe
                  src={videoUrl}
                  className="w-full h-full"
                  title="Property video"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              )}
            </div>
          )}

          {/* ---------------- FLOOR PLANS ---------------- */}
          {active === "floor" && hasFloor && floorPlanImages && (
            <div className="flex flex-col items-center">
              <div className="w-full rounded-3xl border border-gray-200 bg-gray-50 p-4 sm:p-6">
                <div className="relative aspect-[16/9]">
                  <Image
                    src={floorPlanImages[floorIndex]}
                    alt="Floor plan"
                    fill
                    placeholder="blur"
                    blurDataURL={floorPlanImages[floorIndex]}
                    className="object-contain cursor-pointer"
                    onClick={() => {
                      setViewerIndex(floorIndex);
                      setViewerOpen(true);
                    }}
                  />

                  {/* center plus icon */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="h-10 w-10 rounded-full bg-lime-400 flex items-center justify-center shadow-md">
                      <span className="text-black text-lg font-bold">+</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* arrows */}
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() =>
                    setFloorIndex(
                      (prev) =>
                        (prev - 1 + floorPlanImages.length) %
                        floorPlanImages.length,
                    )
                  }
                  className="h-10 w-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                <button
                  onClick={() =>
                    setFloorIndex((prev) => (prev + 1) % floorPlanImages.length)
                  }
                  className="h-10 w-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ---------------- IMAGE VIEWER ---------------- */}
      <ImageViewer
        images={active === "floor" ? floorPlanImages || [] : photos}
        initialIndex={viewerIndex}
        isOpen={viewerOpen}
        onClose={() => setViewerOpen(false)}
      />
    </section>
  );
}
