"use client";

import { useState, type ReactNode } from "react";
import CallbackRequestModal, {
  type CallbackReason,
} from "@/components/ui/CallbackRequestModal";

type Props = {
  children: ReactNode;
  className?: string;
  type?: "button" | "submit";
  /** Pre-fills the callback reason based on where this CTA is used */
  defaultReason?: CallbackReason | string;
};

/** Opens the shared callback-window modal used across the site. */
export default function ScheduleCallbackButton({
  children,
  className,
  type = "button",
  defaultReason = "Golden Visa consultation",
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type={type} className={className} onClick={() => setOpen(true)}>
        {children}
      </button>
      <CallbackRequestModal
        open={open}
        onClose={() => setOpen(false)}
        defaultReason={defaultReason}
      />
    </>
  );
}
