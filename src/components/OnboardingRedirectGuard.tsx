"use client";

import { useOnboardingRedirect } from "@/hooks/useOnboardingRedirect";

export default function OnboardingRedirectGuard() {
  useOnboardingRedirect();
  return null;
}
