"use client";

import React, { ReactNode, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

type SliderProps = {
  children: ReactNode;
  itemWidth?: number;
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
  const [resolvedWidth, setResolvedWidth] = useState(itemWidth);

  useEffect(() => {
    if (!itemWidth) {
      setResolvedWidth(undefined);
      return;
    }

    const update = () => {
      const max = Math.max(260, window.innerWidth - 48);
      setResolvedWidth(Math.min(itemWidth, max));
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [itemWidth]);

  const loopSlides =
    resolvedWidth && slides.length < 8
      ? [...slides, ...slides, ...slides]
      : slides;

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: resolvedWidth ? "start" : "center",
    containScroll: "trimSnaps",
    dragFree: false,
  });

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <div className={`w-full min-w-0 overflow-hidden ${className}`}>
      <div ref={emblaRef} className="overflow-hidden min-w-0">
        <div className="flex" style={{ gap: `${gap}px` }}>
          {loopSlides.map((child, i) => (
            <div
              key={i}
              className="flex-[0_0_auto] min-w-0"
              style={{
                width: resolvedWidth ? `${resolvedWidth}px` : "100%",
                maxWidth: "100%",
              }}
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
                type="button"
                onClick={scrollPrev}
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white"
              >
                ‹
              </button>

              <button
                type="button"
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
