"use client";

import { useState, type ReactNode } from "react";
import CallbackRequestModal from "@/components/ui/CallbackRequestModal";

type Props = {
  children: ReactNode;
  className?: string;
  type?: "button" | "submit";
};

/** Opens the shared callback-window modal used across the site. */
export default function ScheduleCallbackButton({
  children,
  className,
  type = "button",
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type={type} className={className} onClick={() => setOpen(true)}>
        {children}
      </button>
      <CallbackRequestModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
