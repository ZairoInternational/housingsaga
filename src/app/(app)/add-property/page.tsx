"use client";

import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Home,
  MapPin,
  Ruler,
  Sparkles,
  FileText,
  DollarSign,
  Camera,
  Settings,
  ChevronRight,
  ChevronLeft,
  Check,
  AlertCircle,
} from "lucide-react";
import { useHouseFormStore } from "@/store/HouseStore";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import StepBasic from "./StepBasic";
import StepLocation from "./StepLocation";
import StepSpecs from "./StepSpecs";
import StepAmenities from "./StepAmenities";
import StepLegal from "./StepLegal";
import StepPricing from "./StepPricing";
import StepMedia from "./StepMedia";
import StepStatus from "./StepStatus";
import Link from "next/link";

const STEPS = [
  { id: "basic", label: "Basics", icon: Home, desc: "Name & description" },
  {
    id: "location",
    label: "Location",
    icon: MapPin,
    desc: "Address & coordinates",
  },
  {
    id: "specs",
    label: "Details",
    icon: Ruler,
    desc: "Rooms & specifications",
  },
  {
    id: "amenities",
    label: "Amenities",
    icon: Sparkles,
    desc: "Features & utilities",
  },
  {
    id: "legal",
    label: "Legal",
    icon: FileText,
    desc: "Documents & compliance",
  },
  {
    id: "pricing",
    label: "Pricing",
    icon: DollarSign,
    desc: "Price & lease terms",
  },
  { id: "media", label: "Media", icon: Camera, desc: "Photos & video" },
  { id: "status", label: "Status", icon: Settings, desc: "Listing settings" },
];

// Per-step validation schemas
const basicSchema = z.object({
  name: z.string().min(3, "Property name must be at least 3 characters"),
  propertyType: z.string().min(2, "Property type is required"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  livingArea: z.boolean().optional(),
});

const locationSchema = z.object({
  address: z.string().min(5, "Full address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  country: z.string().min(2, "Country is required"),
  postalCode: z.string().min(4, "Valid postal code required"),
  houseNumber: z.string().optional(),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
});

const specsSchema = z.object({
  bedrooms: z.string().min(1, "Bedrooms required"),
  bathrooms: z.string().min(1, "Bathrooms required"),
  carpetArea: z.string().min(1, "Carpet area required"),
  floors: z.string().min(1, "Total floors required"),
  constructionYear: z.string().min(4, "Valid year required").max(4),
  facing: z.string().min(1, "Facing direction required"),
  ownership: z.string().min(1, "Ownership type required"),
  furnishing: z.string().min(1, "Furnishing status required"),
  flooring: z.string().min(1, "Flooring type required"),
  balconies: z.string().optional(),
  builtUpArea: z.string().optional(),
  propertyOnFloor: z.string().optional(),
});

const pricingSchema = z.object({
  price: z.string().min(1, "Price is required"),
  leaseTerm: z.string().min(1, "Lease term is required"),
  depositAmount: z.string().optional(),
  negotiable: z.boolean().optional(),
  allInclusivePrice: z.boolean().optional(),
  govChargesIncluded: z.boolean().optional(),
});

const STEP_SCHEMAS: Record<string, z.ZodTypeAny> = {
  basic: basicSchema,
  location: locationSchema,
  specs: specsSchema,
  pricing: pricingSchema,
};

export default function HouseForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const { formData, submitForm } = useHouseFormStore();

  const methods = useForm({
    mode: "onChange",
    resolver: zodResolver(STEP_SCHEMAS[STEPS[currentStep].id] ?? z.object({})),
    defaultValues: formData as z.infer<typeof basicSchema>,
  });

  const {
    trigger,
    formState: { errors },
  } = methods;
  const hasErrors = Object.keys(errors).length > 0;

  const goNext = useCallback(async () => {
    const stepId = STEPS[currentStep].id;
    const schema = STEP_SCHEMAS[stepId];
    if (schema) {
      const valid = await trigger();
      if (!valid) return;
    }
    setCompletedSteps((prev) => new Set([...prev, currentStep]));
    setCurrentStep((s) => Math.min(s + 1, STEPS.length - 1));
  }, [currentStep, trigger]);

  const goPrev = useCallback(() => {
    setCurrentStep((s) => Math.max(s - 1, 0));
  }, []);

  const onFinalSubmit = async () => {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200)); // simulate async
    submitForm();
    setIsSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return <SuccessScreen />;
  }

  const StepComponent = [
    StepBasic,
    StepLocation,
    StepSpecs,
    StepAmenities,
    StepLegal,
    StepPricing,
    StepMedia,
    StepStatus,
  ][currentStep];

  const isLastStep = currentStep === STEPS.length - 1;
  const progress = (completedSteps.size / STEPS.length) * 100;

  return (
    <FormProvider {...methods}>
      <div className="min-h-screen bg-gray-50 dark:bg-[#0f1117] transition-colors duration-300 mt-20">
        <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                <Home size={18} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                List Your Property
              </h1>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 ml-12">
              Complete all sections to publish your listing on HousingSaga
            </p>
          </div>

          <div className="flex gap-6 lg:gap-8">
            {/* Sidebar stepper */}
            <aside className="hidden md:flex flex-col gap-1 w-52 flex-shrink-0 pt-1">
              {STEPS.map((step, i) => {
                const Icon = step.icon;
                const isActive = i === currentStep;
                const isDone = completedSteps.has(i);
                return (
                  <button
                    key={step.id}
                    onClick={() =>
                      isDone || i < currentStep ? setCurrentStep(i) : undefined
                    }
                    className={`
                      group flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200
                      ${
                        isActive
                          ? "bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/30"
                          : isDone
                            ? "hover:bg-gray-100 dark:hover:bg-white/5 cursor-pointer"
                            : "cursor-default opacity-60"
                      }
                    `}
                  >
                    <div
                      className={`
                      w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all
                      ${isActive ? "bg-emerald-500 shadow-md shadow-emerald-500/40" : isDone ? "bg-emerald-500/20" : "bg-gray-200 dark:bg-gray-700"}
                    `}
                    >
                      {isDone && !isActive ? (
                        <Check size={13} className="text-emerald-500" />
                      ) : (
                        <Icon
                          size={13}
                          className={
                            isActive
                              ? "text-white"
                              : "text-gray-500 dark:text-gray-400"
                          }
                        />
                      )}
                    </div>
                    <div>
                      <div
                        className={`text-xs font-semibold leading-tight ${isActive ? "text-emerald-600 dark:text-emerald-400" : "text-gray-700 dark:text-gray-300"}`}
                      >
                        {step.label}
                      </div>
                      <div className="text-[10px] text-gray-400 dark:text-gray-500 leading-tight mt-0.5">
                        {step.desc}
                      </div>
                    </div>
                  </button>
                );
              })}

              {/* Progress */}
              <div className="mt-4 px-3">
                <div className="flex justify-between text-[10px] text-gray-400 mb-1.5">
                  <span>Progress</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </aside>

            {/* Main form area */}
            <div className="flex-1 min-w-0">
              {/* Mobile step indicator */}
              <div className="md:hidden mb-4 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {STEPS.map((step, i) => {
                  const Icon = step.icon;
                  const isActive = i === currentStep;
                  const isDone = completedSteps.has(i);
                  return (
                    <button
                      key={step.id}
                      onClick={() => (isDone ? setCurrentStep(i) : undefined)}
                      className={`
                        flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all
                        ${isActive ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/30" : isDone ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-gray-100 dark:bg-gray-800 text-gray-400"}
                      `}
                    >
                      {isDone && !isActive ? (
                        <Check size={10} />
                      ) : (
                        <Icon size={10} />
                      )}
                      {step.label}
                    </button>
                  );
                })}
              </div>

              {/* Step card */}
              <div className="bg-white dark:bg-[#1a1f2e] rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {(() => {
                      const Icon = STEPS[currentStep].icon;
                      return <Icon size={18} className="text-emerald-500" />;
                    })()}
                    <div>
                      <h2 className="text-base font-semibold text-gray-900 dark:text-white">
                        {STEPS[currentStep].label}
                      </h2>
                      <p className="text-xs text-gray-400">
                        {STEPS[currentStep].desc}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400 font-mono">
                    {currentStep + 1} / {STEPS.length}
                  </span>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.2 }}
                    className="p-6"
                  >
                    {hasErrors && (
                      <div className="mb-5 flex items-start gap-2.5 px-4 py-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-xl">
                        <AlertCircle
                          size={15}
                          className="text-red-500 flex-shrink-0 mt-0.5"
                        />
                        <p className="text-xs text-red-600 dark:text-red-400">
                          Please fix the errors below before continuing.
                        </p>
                      </div>
                    )}
                    <StepComponent />
                  </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div className="px-6 py-4 bg-gray-50 dark:bg-[#161b27] border-t border-gray-100 dark:border-gray-800 flex items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={goPrev}
                    disabled={currentStep === 0}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronLeft size={16} />
                    Back
                  </button>

                  <div className="flex items-center gap-3">
                    {isLastStep ? (
                      <button
                        type="button"
                        onClick={onFinalSubmit}
                        disabled={isSubmitting}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white shadow-md shadow-emerald-500/30 disabled:opacity-60 transition-all"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />{" "}
                            Submitting…
                          </>
                        ) : (
                          <>
                            <Check size={16} /> Submit Listing
                          </>
                        )}
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={goNext}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white shadow-md shadow-emerald-500/30 transition-all"
                      >
                        Continue
                        <ChevronRight size={16} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FormProvider>
  );
}

function SuccessScreen() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0f1117] flex items-center justify-center p-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center max-w-md"
      >
        <div className="w-20 h-20 rounded-full bg-emerald-500/15 flex items-center justify-center mx-auto mb-6 border-2 border-emerald-500/40">
          <Check size={36} className="text-emerald-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Listing Submitted!
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
          Your property has been submitted for review. We&apos;ll notify you once
          it&apos;s live on HousingSaga.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-medium text-sm transition-colors shadow-lg shadow-emerald-500/30"
        >
          <Home size={16} />
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}
