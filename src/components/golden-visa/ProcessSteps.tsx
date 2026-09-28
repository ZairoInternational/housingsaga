"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  FiCheckCircle,
  FiFileText,
  FiHome,
  FiMessageCircle,
  FiShield,
} from "react-icons/fi";

function EuroCurrencyIcon({
  className,
  size = 22,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <span
      className={className}
      style={{ fontSize: size, lineHeight: 1, fontWeight: 600 }}
      aria-hidden
    >
      €
    </span>
  );
}

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
    Icon: EuroCurrencyIcon,
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

type Point = { x: number; y: number };

export default function ProcessSteps() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pathRef = useRef<SVGPathElement>(null);

  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const [points, setPoints] = useState<Point[]>([]);
  const [pathD, setPathD] = useState("");
  const [pathLength, setPathLength] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        steps.forEach((_, i) => {
          window.setTimeout(() => {
            setVisibleSteps((prev) =>
              prev.includes(i) ? prev : [...prev, i],
            );
            setActiveStep(i);
          }, i * 280);
        });
        observer.disconnect();
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    const updatePath = () => {
      if (!trackRef.current) return;
      const parent = trackRef.current.getBoundingClientRect();
      const nextPoints = cardRefs.current
        .map((el) => {
          if (!el) return null;
          const rect = el.getBoundingClientRect();
          return {
            x: rect.left + rect.width / 2 - parent.left,
            y: rect.top + rect.height / 2 - parent.top,
          };
        })
        .filter(Boolean) as Point[];

      if (nextPoints.length < 2) return;

      let d = `M ${nextPoints[0].x},${nextPoints[0].y}`;
      for (let i = 1; i < nextPoints.length; i++) {
        const prev = nextPoints[i - 1];
        const curr = nextPoints[i];
        const midX = (prev.x + curr.x) / 2;
        d += ` C ${midX},${prev.y} ${midX},${curr.y} ${curr.x},${curr.y}`;
      }

      setPoints(nextPoints);
      setPathD(d);
    };

    updatePath();
    const t = window.setTimeout(updatePath, 120);
    window.addEventListener("resize", updatePath);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("resize", updatePath);
    };
  }, [visibleSteps]);

  useLayoutEffect(() => {
    if (!pathRef.current || !pathD) {
      setPathLength(0);
      return;
    }
    try {
      setPathLength(pathRef.current.getTotalLength());
    } catch {
      setPathLength(0);
    }
  }, [pathD]);

  const visiblePct =
    visibleSteps.length === 0 ? 0 : visibleSteps.length / steps.length;

  return (
    <section
      ref={sectionRef}
      className="py-14 sm:py-16 lg:py-20 bg-white relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[70%] h-64 bg-lime-400/10 blur-3xl rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-sm text-lime-700 font-semibold mb-2 tracking-wide uppercase">
            Our Process
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900">
            Your Path to <span className="text-lime-600">EU Residency</span>
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm sm:text-base">
            A streamlined 6-step journey designed for clarity and efficiency
          </p>
        </div>

        {/* Desktop / tablet journey */}
        <div ref={trackRef} className="relative hidden md:block">
          {pathD ? (
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
              aria-hidden
            >
              <defs>
                <linearGradient
                  id="limeJourneyPath"
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="0"
                >
                  <stop offset="0%" stopColor="#a3e635" />
                  <stop offset="100%" stopColor="#65a30d" />
                </linearGradient>
                <filter
                  id="limeGlow"
                  x="-40%"
                  y="-40%"
                  width="180%"
                  height="180%"
                >
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <path
                d={pathD}
                fill="none"
                stroke="rgba(163,230,53,0.18)"
                strokeWidth="3"
                strokeDasharray="6 10"
              />

              <path
                ref={pathRef}
                d={pathD}
                fill="none"
                stroke="url(#limeJourneyPath)"
                strokeWidth="3"
                strokeLinecap="round"
                filter="url(#limeGlow)"
                style={{
                  strokeDasharray: pathLength || 1,
                  strokeDashoffset: pathLength
                    ? pathLength * (1 - visiblePct)
                    : 0,
                  transition:
                    "stroke-dashoffset 0.85s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              />

              {points.map((p, i) => {
                const on = visibleSteps.includes(i);
                return (
                  <g key={i}>
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={on ? 10 : 6}
                      fill={on ? "#a3e635" : "rgba(163,230,53,0.25)"}
                    />
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={3}
                      fill="#111"
                      opacity={on ? 1 : 0.35}
                    />
                  </g>
                );
              })}
            </svg>
          ) : null}

          <div className="grid grid-cols-3 gap-x-10 gap-y-16 relative z-10">
            {steps.map((step, index) => {
              const isLower = index % 2 === 1;
              return (
                <div
                  key={step.number}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  className={`transition-all duration-700 ${
                    visibleSteps.includes(index)
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  } ${isLower ? "mt-10 lg:mt-14" : ""}`}
                  style={{ transitionDelay: `${index * 60}ms` }}
                >
                  <StepCard
                    step={step}
                    active={
                      activeStep === index || visibleSteps.includes(index)
                    }
                    highlight={activeStep === index}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile vertical journey */}
        <div className="md:hidden relative pl-2">
          <div className="absolute left-[27px] top-4 bottom-4 w-0.5 bg-gray-200 overflow-hidden">
            <div
              className="w-full bg-lime-400 transition-all duration-700 ease-out"
              style={{ height: `${visiblePct * 100}%` }}
            />
          </div>

          <div className="space-y-5">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`relative flex gap-4 transition-all duration-700 ${
                  visibleSteps.includes(index)
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-4"
                }`}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div
                  className={`relative z-10 mt-5 w-3.5 h-3.5 rounded-full border-2 shrink-0 ml-[21px] ${
                    visibleSteps.includes(index)
                      ? "bg-lime-400 border-lime-500 shadow-[0_0_0_4px_rgba(163,230,53,0.25)]"
                      : "bg-white border-gray-300"
                  }`}
                />
                <div className="flex-1">
                  <StepCard
                    step={step}
                    active={visibleSteps.includes(index)}
                    highlight={activeStep === index}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 sm:mt-14 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-lime-400/40 bg-lime-50 text-sm text-lime-900 font-medium">
            Average timeline: ~90 days
          </div>
        </div>
      </div>
    </section>
  );
}

function StepCard({
  step,
  active,
  highlight,
}: {
  step: (typeof steps)[number];
  active: boolean;
  highlight: boolean;
}) {
  const Icon = step.Icon;
  return (
    <div
      className={`bg-white rounded-2xl p-5 sm:p-6 border shadow-sm transition-all duration-500 ${
        highlight
          ? "border-lime-400 shadow-[0_16px_40px_rgba(132,204,22,0.18)] -translate-y-0.5"
          : active
            ? "border-gray-200 hover:border-lime-300 hover:shadow-md"
            : "border-gray-200"
      }`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div
          className={`w-11 h-11 rounded-xl flex items-center justify-center border ${
            highlight || active
              ? "bg-lime-400 border-lime-400 text-black"
              : "bg-lime-50 border-lime-200 text-lime-700"
          }`}
        >
          <Icon size={20} />
        </div>
        <span className="text-[11px] font-bold tracking-wider text-gray-400">
          STEP {step.number}
        </span>
      </div>
      <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
      <p className="text-sm text-gray-500 mt-2 leading-relaxed">{step.desc}</p>
    </div>
  );
}
