import type { ReactNode } from "react";

import OwnerDecor from "@/components/owner-access/OwnerDecor";

export default function OwnerPortalFrame({ children }: { children: ReactNode }) {
  return (
    <main className="relative min-h-dvh overflow-hidden bg-[#f4fbf7] text-[#1c1917]">
      <OwnerDecor />
      <div className="relative mx-auto flex min-h-dvh w-full max-w-[440px] flex-col px-6 py-8">
        {children}
      </div>
    </main>
  );
}
