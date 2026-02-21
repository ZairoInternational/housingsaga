 "use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import AuthSync from "./AuthSync";

type Props = {
  children: React.ReactNode;
};

export default function ClientProviders({ children }: Props): React.ReactElement {
  return (
    <SessionProvider>
      <AuthSync />
      {children}
    </SessionProvider>
  );
}

