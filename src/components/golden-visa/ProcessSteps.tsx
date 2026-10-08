"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  Award,
  Briefcase,
  Building2,
  ChevronLeft,
  ChevronRight,
  Clock,
  FileText,
  Lock,
  MessagesSquare,
  Pause,
  Play,
  Scale,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

type PanelPos = "top" | "bottom";

type StepData = {
  number: string;
  phase: string;
  title: string;
  subtitle: string;
  description: string;
  time: string;
  Icon: LucideIcon;
  deliverables: string[];
  x: number;
  y: number;
  panelPos: PanelPos;
};

const STEPS: StepData[] = [
  {
    number: "01",
    phase: "Initial Phase",
    title: "Consultation",
    subtitle: "Eligibility Assessment",
    description:
      "Initial assessment of your investment goals, tax considerations, and family residency eligibility.",
    time: "Days 1–7",
    Icon: MessagesSquare,
    deliverables: [
      "Bespoke Investment Profile",
      "KYC & Pre-Screening",
      "Family Eligibility Roadmap",
    ],
    x: 80,
    y: 250,
    panelPos: "top",
  },
  {
    number: "02",
    phase: "Discovery",
    title: "Property Selection",
    subtitle: "Curated Portfolio",
    description:
      "Curated portfolio matching your criteria, including private viewings and yield analysis.",
    time: "Days 8–25",
    Icon: Building2,
    deliverables: [
      "Prime Real Estate Selection",
      "ROI & Rental Yield Projections",
      "Virtual & VIP On-site Tours",
    ],
    x: 260,
    y: 165,
    panelPos: "bottom",
  },
  {
    number: "03",
    phase: "Verification",
    title: "Legal Due Diligence",
    subtitle: "Compliance & Check",
    description:
      "Comprehensive title verification, background checks, and preparation of legal representation.",
    time: "Days 26–40",
    Icon: Scale,
    deliverables: [
      "Property Title & Deed Verification",
      "Power of Attorney Setup",
      "Tax ID & Bank Account Opening",
    ],
    x: 450,
    y: 250,
    panelPos: "top",
  },
  {
    number: "04",
    phase: "Execution",
    title: "Investment",
    subtitle: "Property Acquisition",
    description:
      "Secure property acquisition with complete escrow legal safeguards and contract signing.",
    time: "Days 41–60",
    Icon: Briefcase,
    deliverables: [
      "Promissory Contract Signing",
      "Secure Funds Transfer",
      "Deed Execution & Registry",
    ],
    x: 630,
    y: 335,
    panelPos: "bottom",
  },
  {
    number: "05",
    phase: "Filing",
    title: "Application",
    subtitle: "Dossier Submission",
    description:
      "Complete document translation, legal apostille, and formal submission to government authorities.",
    time: "Days 61–75",
    Icon: FileText,
    deliverables: [
      "Certified Legal Dossier",
      "Official Submission & Fee Settlement",
      "Biometric Appointment Booking",
    ],
    x: 810,
    y: 250,
    panelPos: "top",
  },
  {
    number: "06",
    phase: "Completion",
    title: "Residency Approval",
    subtitle: "Permit Issuance",
    description:
      "Receive your official EU residency permit cards, opening Schengen-wide travel and business benefits.",
    time: "Days 76–90",
    Icon: Award,
    deliverables: [
      "EU Residence Cards Delivery",
      "Schengen Zone Visa-Free Access",
      "Ongoing Renewal Concierge",
    ],
    x: 1020,
    y: 250,
    panelPos: "bottom",
  },
];

const PATH_D =
  "M 80 250 C 220 120, 320 380, 450 250 C 580 120, 680 380, 810 250 C 890 170, 960 210, 1020 250";

const CANVAS_W = 1100;
const CANVAS_H = 500;

export default function ProcessSteps() {
  const [activeStep, setActiveStep] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(false);
  const [pathLength, setPathLength] = useState(0);
  const pathRef = useRef<SVGPathElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const userPausedRef = useRef(false);
  const hasEnteredRef = useRef(false);

  const current = STEPS[activeStep] ?? STEPS[0];

  useLayoutEffect(() => {
    if (!pathRef.current) return;
    try {
      setPathLength(pathRef.current.getTotalLength());
    } catch {
      setPathLength(0);
    }
  }, []);

  // Auto-start the journey when it enters the viewport
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;

        if (entry.isIntersecting) {
          if (!hasEnteredRef.current) {
            hasEnteredRef.current = true;
            setActiveStep(0);
          }
          if (!userPausedRef.current) {
            setIsAutoplay(true);
          }
        } else {
          setIsAutoplay(false);
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isAutoplay) {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
        autoplayRef.current = null;
      }
      return;
    }

    autoplayRef.current = setInterval(() => {
      setActiveStep((prev) => (prev < STEPS.length - 1 ? prev + 1 : 0));
    }, 3500);

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
        autoplayRef.current = null;
      }
    };
  }, [isAutoplay]);

  const goToStep = useCallback((index: number) => {
    if (index < 0 || index >= STEPS.length) return;
    setActiveStep(index);
  }, []);

  const navigate = useCallback(
    (direction: -1 | 1) => {
      goToStep(activeStep + direction);
    },
    [activeStep, goToStep],
  );

  const toggleAutoplay = useCallback(() => {
    setIsAutoplay((prev) => {
      const next = !prev;
      userPausedRef.current = !next;
      return next;
    });
  }, []);

  const progressRatio = activeStep / (STEPS.length - 1);
  const strokeDashoffset = pathLength ? pathLength * (1 - progressRatio) : 0;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#fafaf7] py-14 sm:py-16 lg:py-20 selection:bg-lime-400 selection:text-[#0a192f]"
    >
      <style>{`
        @keyframes processPulseRing {
          0% { transform: scale(0.95); opacity: 0.8; }
          50% { transform: scale(1.35); opacity: 0.2; }
          100% { transform: scale(0.95); opacity: 0.8; }
        }
        .process-pulse-ring {
          animation: processPulseRing 2.8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>

      <div className="relative z-20 mx-auto w-full max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-lime-400/30 bg-lime-400/10 px-3.5 py-1.5">
          <span className="h-2 w-2 animate-pulse rounded-full bg-lime-500" />
          <span className="text-xs font-bold uppercase tracking-widest text-lime-700">
            Our Process
          </span>
        </div>

        <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-[#0a192f] sm:text-4xl md:text-5xl">
          Your Path to{" "}
          <span className="relative inline-block px-1 text-lime-700">
            EU Residency
            <svg
              className="absolute -bottom-1 left-0 h-2 w-full text-lime-400/40"
              viewBox="0 0 100 15"
              preserveAspectRatio="none"
              aria-hidden
            >
              <path
                d="M0,10 Q50,0 100,10"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
              />
            </svg>
          </span>
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-base font-normal text-slate-600 sm:text-lg">
          A streamlined 6-step journey designed for clarity, legal security, and
          speed.
        </p>

        {/* Controls */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            disabled={activeStep === 0}
            title="Previous Step"
            className="rounded-full border border-slate-200 bg-white p-2.5 text-[#0a192f] shadow-sm transition-all hover:border-lime-400 hover:text-lime-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="flex max-w-full items-center gap-1.5 overflow-x-auto rounded-full border border-slate-200/80 bg-white/80 p-1.5 shadow-sm backdrop-blur-md">
            {STEPS.map((step, idx) => {
              const isActive = idx === activeStep;
              const isDone = idx < activeStep;
              return (
                <button
                  key={step.number}
                  type="button"
                  onClick={() => goToStep(idx)}
                  className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-bold transition-all duration-300 ${
                    isActive
                      ? "border border-lime-400/50 bg-[#0a192f] px-3.5 py-1.5 font-extrabold text-lime-400 shadow-sm"
                      : isDone
                        ? "border border-lime-400/30 bg-lime-400/10 font-semibold text-lime-700"
                        : "font-medium text-slate-500 hover:text-[#0a192f]"
                  }`}
                >
                  {step.number} {step.title}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => navigate(1)}
            disabled={activeStep === STEPS.length - 1}
            title="Next Step"
            className="rounded-full border border-slate-200 bg-white p-2.5 text-[#0a192f] shadow-sm transition-all hover:border-lime-400 hover:text-lime-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={toggleAutoplay}
            className={`flex items-center gap-2 rounded-full border bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm transition-all hover:border-lime-400 ${
              isAutoplay ? "border-lime-400 bg-lime-400/10" : "border-slate-200"
            }`}
          >
            {isAutoplay ? (
              <Pause className="h-3.5 w-3.5 text-lime-700" />
            ) : (
              <Play className="h-3.5 w-3.5 text-lime-700" />
            )}
            <span>{isAutoplay ? "Pause Journey" : "Auto-Play Journey"}</span>
          </button>
        </div>
      </div>

      <div className="relative mx-auto flex w-full max-w-7xl flex-grow flex-col justify-center px-4 py-6 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute left-1/4 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-lime-400/10 blur-3xl" />
        <div className="pointer-events-none absolute right-1/4 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-blue-500/5 blur-3xl" />

        {/* Desktop interactive journey */}
        <div className="relative my-4 hidden h-[540px] w-full lg:block">
          {/* Floating panels */}
          <div className="pointer-events-none absolute inset-0">
            {STEPS.map((step, idx) => {
              const leftPercent = (step.x / CANVAS_W) * 100;
              const isTop = step.panelPos === "top";
              const topStyle = isTop
                ? `calc(${(step.y / CANVAS_H) * 100}% - 140px)`
                : `calc(${(step.y / CANVAS_H) * 100}% + 55px)`;
              const isActive = idx === activeStep;
              const isDone = idx < activeStep;

              return (
                <button
                  key={step.number}
                  type="button"
                  onClick={() => goToStep(idx)}
                  className={`absolute w-64 -translate-x-1/2 cursor-pointer rounded-2xl p-4 text-left transition-all duration-500 pointer-events-auto ${
                    isActive
                      ? "z-30 scale-105 border-[1.5px] border-lime-400/50 bg-white/98 opacity-100 shadow-[0_25px_60px_-12px_rgba(132,204,22,0.2)] backdrop-blur-xl"
                      : isDone
                        ? "scale-95 border border-slate-200/80 bg-white/88 opacity-60 shadow-lg backdrop-blur-md hover:opacity-100"
                        : "scale-95 border border-slate-200/80 bg-white/88 opacity-40 shadow-lg backdrop-blur-md hover:opacity-90"
                  }`}
                  style={{ left: `${leftPercent}%`, top: topStyle }}
                >
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-lime-700">
                      {step.phase}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-400">
                      {step.time}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold leading-snug text-[#0a192f]">
                    {step.title}
                  </h4>
                  <p className="mt-1 line-clamp-2 text-xs font-normal text-slate-600">
                    {step.description}
                  </p>
                </button>
              );
            })}
          </div>

          <svg
            className="relative z-10 h-full w-full overflow-visible"
            viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
            fill="none"
            aria-hidden
          >
            <defs>
              <linearGradient id="gvPathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#84CC16" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#84CC16" stopOpacity="1" />
                <stop offset="100%" stopColor="#65A30D" stopOpacity="1" />
              </linearGradient>
              <filter id="gvPathGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            <path
              d={PATH_D}
              stroke="#E2E8F0"
              strokeWidth="3"
              strokeDasharray="6 6"
              fill="none"
            />

            <path
              ref={pathRef}
              d={PATH_D}
              stroke="url(#gvPathGradient)"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
              filter="url(#gvPathGlow)"
              style={{
                strokeDasharray: pathLength || 1,
                strokeDashoffset,
                transition: "stroke-dashoffset 1.8s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            />

            <g
              className="transition-all duration-700"
              style={{
                filter:
                  "drop-shadow(0px 0px 8px #84CC16) drop-shadow(0px 0px 15px #84CC16)",
                transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
            >
              <circle
                cx={current.x}
                cy={current.y}
                r="7"
                fill="#84CC16"
                stroke="#FFFFFF"
                strokeWidth="2"
              />
              <circle
                cx={current.x}
                cy={current.y}
                r="14"
                fill="#84CC16"
                opacity="0.3"
                className="animate-ping"
              />
            </g>
          </svg>

          {/* Milestone nodes */}
          <div className="pointer-events-auto absolute inset-0 z-20">
            {STEPS.map((step, idx) => {
              const leftPercent = (step.x / CANVAS_W) * 100;
              const topPercent = (step.y / CANVAS_H) * 100;
              const isFinal = idx === STEPS.length - 1;
              const isActive = idx === activeStep;
              const isDone = idx < activeStep;
              const Icon = step.Icon;

              return (
                <button
                  key={step.number}
                  type="button"
                  onClick={() => goToStep(idx)}
                  className="group absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-500"
                  style={{ left: `${leftPercent}%`, top: `${topPercent}%` }}
                >
                  {isFinal ? (
                    <div className="process-pulse-ring pointer-events-none absolute inset-0 rounded-full bg-lime-400/40" />
                  ) : null}

                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-full transition-all duration-500 sm:h-20 sm:w-20 ${
                      isActive
                        ? "z-30 scale-110 border-4 border-lime-400 bg-[#0a192f] shadow-[0_0_35px_rgba(132,204,22,0.5)]"
                        : isDone
                          ? "z-20 border-2 border-lime-400 bg-white text-lime-700"
                          : "z-10 border-2 border-slate-200 bg-white text-slate-400 opacity-70 group-hover:scale-110 group-hover:border-lime-400"
                    }`}
                  >
                    <div
                      className={`flex h-12 w-12 flex-col items-center justify-center rounded-full transition-all duration-500 sm:h-[3.75rem] sm:w-[3.75rem] ${
                        isActive
                          ? "bg-lime-400 font-bold text-[#0a192f] shadow-inner"
                          : isDone
                            ? "bg-lime-400/10 font-bold text-lime-700"
                            : "bg-slate-50 font-medium text-slate-400"
                      }`}
                    >
                      <Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                      <span className="mt-0.5 text-[10px] font-extrabold tracking-tight">
                        {step.number}
                      </span>
                    </div>
                  </div>

                  <div className="absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap text-center">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs transition-all duration-300 ${
                        isActive
                          ? "scale-105 border border-lime-700 bg-lime-400 px-3 font-extrabold text-[#0a192f] shadow-md"
                          : isDone
                            ? "border border-slate-200 bg-white/90 font-bold text-slate-700 opacity-80 shadow-sm"
                            : "border border-slate-200 bg-white/80 font-medium text-slate-400 opacity-60 shadow-sm"
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile / tablet vertical journey */}
        <div className="relative mx-auto my-6 block max-w-xl px-2 lg:hidden">
          <div className="absolute bottom-8 left-7 top-8 w-1 rounded-full bg-gradient-to-b from-lime-400/20 via-lime-400 to-lime-700" />
          <div className="relative z-10 space-y-6">
            {STEPS.map((step, idx) => {
              const isActive = idx === activeStep;
              const isDone = idx < activeStep;
              const Icon = step.Icon;
              return (
                <button
                  key={step.number}
                  type="button"
                  onClick={() => goToStep(idx)}
                  className={`flex w-full items-start gap-4 rounded-2xl p-4 text-left transition-all duration-300 ${
                    isActive
                      ? "scale-[1.02] border-2 border-lime-400 bg-white shadow-[0_20px_50px_-10px_rgba(10,25,47,0.07)]"
                      : isDone
                        ? "border border-slate-200 bg-white opacity-70"
                        : "border border-slate-200/80 bg-white/60 opacity-50"
                  }`}
                >
                  <div
                    className={`flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl border font-extrabold transition-colors ${
                      isActive
                        ? "border-lime-700 bg-lime-400 text-[#0a192f] shadow-sm"
                        : isDone
                          ? "border-lime-400/20 bg-lime-400/10 font-bold text-lime-700"
                          : "border-slate-200 bg-slate-100 font-medium text-slate-400"
                    }`}
                  >
                    <Icon className="mb-0.5 h-5 w-5" />
                    <span className="text-[9px]">{step.number}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-extrabold uppercase text-lime-700">
                        {step.phase}
                      </span>
                      <span className="text-[10px] font-medium text-slate-400">
                        {step.time}
                      </span>
                    </div>
                    <h4 className="mt-0.5 text-base font-bold text-[#0a192f]">
                      {step.title}
                    </h4>
                    <p className="mt-1 text-xs text-slate-600">
                      {step.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step details drawer */}
        <div className="mx-auto mt-4 w-full max-w-4xl rounded-2xl border border-slate-200/90 bg-white/90 p-5 shadow-[0_20px_50px_-10px_rgba(10,25,47,0.07)] backdrop-blur-xl transition-all duration-500 sm:p-6">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-lime-400/30 bg-lime-400/10 text-lg font-extrabold text-lime-700 shadow-sm">
                {current.number}
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-lime-700">
                    {current.phase}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="flex items-center gap-1 text-xs font-medium text-slate-500">
                    <Clock className="h-3.5 w-3.5 text-lime-700" />
                    {current.time}
                  </span>
                </div>
                <h3 className="mt-0.5 text-lg font-bold text-[#0a192f] sm:text-xl">
                  {current.title} — {current.subtitle}
                </h3>
                <p className="mt-1 max-w-xl text-sm text-slate-600">
                  {current.description}
                </p>
              </div>
            </div>

            <div className="w-full shrink-0 border-t border-slate-200 pt-4 md:w-auto md:border-l md:border-t-0 md:pl-6 md:pt-0">
              <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400">
                Key Deliverables
              </span>
              <ul className="space-y-1.5 text-xs font-medium text-slate-700">
                {current.deliverables.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-lime-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer metrics */}
      <div className="relative z-20 px-4 pb-4 pt-4 text-center">
        <div className="inline-flex flex-wrap items-center justify-center gap-3 rounded-full border border-slate-200 bg-white/90 px-6 py-3 text-xs font-semibold text-[#0a192f] shadow-[0_20px_50px_-10px_rgba(10,25,47,0.07)] backdrop-blur-lg transition-all hover:border-lime-400/50 sm:gap-6 sm:text-sm">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-lime-400/15 p-1.5 text-lime-700">
              <Clock className="h-4 w-4" />
            </span>
            <span>
              Average timeline:{" "}
              <strong className="font-bold text-[#0a192f]">~90 days</strong>
            </span>
          </div>
          <div className="hidden h-4 w-px bg-slate-200 sm:block" />
          <div className="flex items-center gap-2 text-slate-600">
            <ShieldCheck className="h-4 w-4 text-lime-700" />
            <span>100% Legal Guarantee</span>
          </div>
          <div className="hidden h-4 w-px bg-slate-200 sm:block" />
          <div className="flex items-center gap-2 text-slate-600">
            <Lock className="h-4 w-4 text-lime-700" />
            <span>Strict Confidentiality</span>
          </div>
        </div>
      </div>
    </section>
  );
}
