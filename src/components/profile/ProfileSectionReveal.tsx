"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface ProfileSectionRevealProps {
  children: ReactNode;
  delay?: number;
}

export default function ProfileSectionReveal({
  children,
  delay = 0,
}: ProfileSectionRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

