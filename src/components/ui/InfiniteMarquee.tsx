"use client";

import React, { ReactNode } from "react";
import Marquee from "react-fast-marquee";

type MarqueeItem = {
  id: string | number;
  content: ReactNode;
};

type InfiniteMarqueeProps = {
  items: MarqueeItem[];
  speed?: number;
  gap?: number;
  className?: string;
};

const InfiniteMarquee: React.FC<InfiniteMarqueeProps> = ({
  items,
  speed = 40,
  gap = 12,
  className = "",
}) => {
  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <Marquee
        speed={speed}
        gradient={false}
        pauseOnHover
        pauseOnClick={false}
        autoFill
      >
        <div className="flex items-center" style={{ gap: `${gap}px` }}>
          {items.map((item) => (
            <div
              key={item.id}
              className="
                flex items-center gap-2
                px-4 sm:px-6
                py-2 sm:py-3
                rounded-full
                bg-black/50 backdrop-blur-xl
                border border-white/10
                whitespace-nowrap
                text-sm sm:text-base lg:text-xl
                font-medium
              "
            >
              {item.content}
            </div>
          ))}
        </div>
      </Marquee>
    </div>
  );
};

export default InfiniteMarquee;
