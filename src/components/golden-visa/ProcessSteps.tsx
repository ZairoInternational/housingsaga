"use client";
import { useEffect, useRef, useState } from "react";
import {
  FiCheckCircle,
  FiDollarSign,
  FiFileText,
  FiHome,
  FiMessageCircle,
  FiShield,
} from "react-icons/fi";

const steps = [
  {
    number: "01",
    title: "Consultation",
    desc: "Initial assessment of your investment goals and eligibility",
    Icon: FiMessageCircle,
  },
  {
    number: "02",
    title: "Property Selection",
    desc: "Curated portfolio matching your investment criteria",
    Icon: FiHome,
  },
  {
    number: "03",
    title: "Legal Due Diligence",
    desc: "Comprehensive verification and compliance checks",
    Icon: FiShield,
  },
  {
    number: "04",
    title: "Investment",
    desc: "Secure property acquisition with legal safeguards",
    Icon: FiDollarSign,
  },
  {
    number: "05",
    title: "Application",
    desc: "Complete documentation and submission process",
    Icon: FiFileText,
  },
  {
    number: "06",
    title: "Residency Approval",
    desc: "Receive your EU residency permit and travel benefits",
    Icon: FiCheckCircle,
  },
];

export default function ProcessSteps() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pathRef = useRef<SVGPathElement>(null);

  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const [pathD, setPathD] = useState("");
  const [pathLength, setPathLength] = useState(0);

  /* ─────────────────────────────
     Intersection animation
  ───────────────────────────── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          steps.forEach((_, i) => {
            setTimeout(() => {
              setVisibleSteps((prev) => [...prev, i]);
            }, i * 120);
          });
        }
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const visiblePct = visibleSteps.length / steps.length;

  /* ─────────────────────────────
     Dynamic Path Generator
  ───────────────────────────── */
  useEffect(() => {
    const updatePath = () => {
      if (!sectionRef.current) return;

      const sectionRect = sectionRef.current.getBoundingClientRect();

      const points = cardRefs.current
        .map((el) => {
          if (!el) return null;
          const rect = el.getBoundingClientRect();

          return {
            x: rect.left + rect.width / 2 - sectionRect.left,
            y: rect.top + rect.height / 2 - sectionRect.top,
          };
        })
        .filter(Boolean) as { x: number; y: number }[];

      if (points.length < 2) return;

      let d = `M ${points[0].x},${points[0].y}`;

      for (let i = 1; i < points.length; i++) {
        const prev = points[i - 1];
        const curr = points[i];

        const midX = (prev.x + curr.x) / 2;

        d += ` C ${midX},${prev.y} ${midX},${curr.y} ${curr.x},${curr.y}`;
      }

      setPathD(d);
    };

    updatePath();
    window.addEventListener("resize", updatePath);

    return () => window.removeEventListener("resize", updatePath);
  }, []);

  /* ─────────────────────────────
     Path length for animation
  ───────────────────────────── */
  useEffect(() => {
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength();
      setPathLength(length);
    }
  }, [pathD]);

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-white dark:bg-[#050712] relative"
    >
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-sm text-lime-600 font-medium mb-2">Our Process</p>
          <h2 className="text-4xl font-semibold text-gray-900 dark:text-white">
            Your Path to <span className="text-lime-600">EU Residency</span>
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            A streamlined 6-step journey designed for clarity and efficiency
          </p>
        </div>

        {/* SVG Path */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {/* Background */}
          <path
            d={pathD}
            fill="none"
            stroke="rgba(132,204,22,0.15)"
            strokeWidth="2"
            strokeDasharray="6 6"
          />

          {/* Active */}
          <path
            ref={pathRef}
            d={pathD}
            fill="none"
            stroke="rgb(132,204,22)"
            strokeWidth="3"
            strokeLinecap="round"
            style={{
              strokeDasharray: pathLength,
              strokeDashoffset: pathLength * (1 - visiblePct),
              transition: "stroke-dashoffset 1.2s ease-out",
            }}
          />

          {/* Nodes */}
          {cardRefs.current.map((el, i) => {
            if (!el || !sectionRef.current) return null;

            const rect = el.getBoundingClientRect();
            const parent = sectionRef.current.getBoundingClientRect();

            const x = rect.left + rect.width / 2 - parent.left;
            const y = rect.top + rect.height / 2 - parent.top;

            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r={visibleSteps.includes(i) ? 6 : 4}
                fill="rgb(132,204,22)"
                opacity={visibleSteps.includes(i) ? 1 : 0.3}
                className="transition-all duration-500"
              />
            );
          })}
        </svg>

        {/* Cards */}
        <div className="grid grid-cols-3 gap-16 relative">
          {steps.map((step, index) => (
            <div
              key={step.number}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className={`transition-all duration-500 ${
                visibleSteps.includes(index)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              } ${index % 2 !== 0 ? "mt-28" : ""}`}
            >
              <div className="bg-gray-50 dark:bg-white/5 rounded-2xl p-6 border border-gray-100 dark:border-white/10 hover:shadow-md transition-all">
                <step.Icon className="text-lime-600 mb-4" size={22} />

                <span className="text-xs text-gray-400">
                  STEP {step.number}
                </span>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-1">
                  {step.title}
                </h3>

                <p className="text-sm text-gray-500 mt-2">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Info */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-gray-200 dark:border-white/10 text-sm text-gray-600 dark:text-gray-300">
            ⏱ Average Timeline: 90 Days
          </div>
        </div>
      </div>
    </section>
  );
}
