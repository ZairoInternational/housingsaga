 "use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import AuthSync from "./AuthSync";
import OnboardingRedirectGuard from "./OnboardingRedirectGuard";

type Props = {
  children: React.ReactNode;
};

export default function ClientProviders({ children }: Props): React.ReactElement {
  return (
    <SessionProvider>
      <AuthSync />
      <OnboardingRedirectGuard />
      {children}
    </SessionProvider>
  );
}

