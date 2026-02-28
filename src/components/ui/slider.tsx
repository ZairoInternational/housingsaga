"use client";

import React, { ReactNode } from "react";
import useEmblaCarousel from "embla-carousel-react";

type SliderProps = {
  children: ReactNode;
  itemWidth?: number; // optional
  gap?: number;
  showArrows?: boolean;
  showDots?: boolean;
  className?: string;
};

const Slider: React.FC<SliderProps> = ({
  children,
  itemWidth,
  gap = 24,
  showArrows = true,
  showDots = true,
  className = "",
}) => {
  const slides = React.Children.toArray(children);

  
const loopSlides =
  itemWidth && slides.length < 8 ? [...slides, ...slides, ...slides] : slides;

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: itemWidth ? "start" : "center",
    containScroll: false,
    dragFree: false,
  });

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <div className={`w-full ${className}`}>
      {/* viewport */}
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex" style={{ gap: `${gap}px` }}>
          {loopSlides.map((child, i) => (
            <div
              key={i}
              className="flex-[0_0_auto]"
              style={{ width: itemWidth ? `${itemWidth}px` : "100%" }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {(showArrows || showDots) && (
        <div className="flex items-center justify-between mt-6">
          {showDots && <div />}

          {showArrows && (
            <div className="flex gap-3">
              <button
                onClick={scrollPrev}
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white"
              >
                ‹
              </button>

              <button
                onClick={scrollNext}
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white"
              >
                ›
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Slider;
