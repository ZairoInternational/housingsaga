 "use client";

import React, { useEffect, useRef, useState } from "react";

type CountUpProps = {
  end: number;
  duration?: number; // seconds
  suffix?: string;
};

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

const CountUp: React.FC<CountUpProps> = ({ end, duration = 1.5, suffix = "+" }) => {
  const elRef = useRef<HTMLSpanElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const startedRef = useRef(false);
  const [value, setValue] = useState<number>(0);

  useEffect(() => {
    const node = elRef.current;
    if (!node) return;

    const durMs = Math.max(0, duration) * 1000;

    const step = (ts: number) => {
      if (startRef.current === null) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const progress = Math.min(elapsed / durMs, 1);
      const eased = easeOutCubic(progress);
      const current = Math.round(eased * end);
      setValue(current);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        setValue(end);
        if (rafRef.current !== null) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }
      }
    };

    const startOnce = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      startRef.current = null;
      rafRef.current = requestAnimationFrame(step);
    };

    if ("IntersectionObserver" in window) {
      const obs = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              startOnce();
              obs.disconnect();
              break;
            }
          }
        },
        { threshold: 0.3 }
      );
      obs.observe(node);

      return () => {
        obs.disconnect();
        if (rafRef.current !== null) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }
      };
    }

    // fallback: start immediately
    startOnce();
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [end, duration]);

  return (
    <span ref={elRef} aria-live="polite">
      {value.toLocaleString()}
      {suffix}
    </span>
  );
};

export default CountUp;

