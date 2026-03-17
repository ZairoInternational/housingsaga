"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ImageViewerProps {
  images: string[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function ImageViewer({
  images,
  initialIndex = 0,
  isOpen,
  onClose,
}: ImageViewerProps) {
  const [current, setCurrent] = useState(initialIndex);

  useEffect(() => {
    setCurrent(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen]);

  if (!isOpen) return null;

  const next = () => setCurrent((p) => (p + 1) % images.length);

  const prev = () => setCurrent((p) => (p - 1 + images.length) % images.length);

  return (
    <div className="fixed inset-0 z-[999] bg-black/95 flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 text-white">
        <p className="text-sm opacity-80">
          {current + 1} / {images.length}
        </p>

        <button onClick={onClose}>
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* Main Image */}
      <div className="flex-1 flex items-center justify-center relative">
        <button
          onClick={prev}
          className="absolute left-4 text-white opacity-70 hover:opacity-100"
        >
          <ChevronLeft size={32} />
        </button>

        <div className="relative w-[90vw] h-[80vh]">
          <Image
            src={images[current]}
            alt=""
            fill
            className="object-contain"
            priority
          />
        </div>

        <button
          onClick={next}
          className="absolute right-4 text-white opacity-70 hover:opacity-100"
        >
          <ChevronRight size={32} />
        </button>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 overflow-x-auto px-6 pb-4">
        {images.map((img, i) => (
          <div
            key={i}
            onClick={() => setCurrent(i)}
            className={`relative h-16 w-24 flex-shrink-0 rounded-lg overflow-hidden cursor-pointer border ${
              current === i ? "border-white" : "border-transparent"
            }`}
          >
            <Image src={img} alt="" fill className="object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}
