import type { ReactNode } from "react";

interface ProfileShellProps {
  children: ReactNode;
}

export default function ProfileShell({ children }: ProfileShellProps) {
  return (
    <main className="min-h-screen bg-white dark:bg-[#0f0f0f]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 pt-28 pb-20 md:pt-32 md:pb-24">
        {children}
      </div>
    </main>
  );
}
