"use client";

import { useSession } from "next-auth/react";
import type { Session } from "next-auth";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

interface OnboardingSession extends Session {
  user?: Session["user"] & {
    onboarded?: boolean;
  };
}

export function useOnboardingRedirect() {
  const { data: session, status } = useSession() as { data: OnboardingSession | null; status: string };
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Skip redirect on auth pages and onboarding page
    const skipPaths = ["/sign-in", "/sign-up", "/onboarding"];
    if (skipPaths.some(path => pathname.startsWith(path))) {
      return;
    }

    // Only redirect after session is loaded
    if (status === "loading") {
      return;
    }

    // If not authenticated, let NextAuth handle it
    if (status === "unauthenticated") {
      return;
    }

    // If user is authenticated but not onboarded, redirect to onboarding
    if (session?.user && !session.user.onboarded) {
      console.log("[Onboarding] Redirecting user to onboarding page");
      router.push("/onboarding");
    }
  }, [session, status, pathname, router]);
}
