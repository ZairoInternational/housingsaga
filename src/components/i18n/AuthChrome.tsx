"use client";

import { SessionProvider } from "next-auth/react";

import LanguageSwitcher from "@/components/i18n/LanguageSwitcher";

export default function AuthChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <div className="relative min-h-screen">
        <div className="absolute top-4 right-4 z-50">
          <LanguageSwitcher tone="light" />
        </div>
        {children}
      </div>
    </SessionProvider>
  );
}
