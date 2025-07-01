"use client";

import { motion } from "motion/react";
import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

import { useAuthStore } from "@/store/AuthStore";
import Link from "next/link";

interface ProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
}

const Modal = ({ open, onOpenChange, className }: ProfileModalProps) => {
  const router = useRouter();
  const portalRef = useRef<HTMLDivElement>(null);
  const profileModalRef = useRef<HTMLDivElement>(null);

  const { isLoggedIn, logout } = useAuthStore();

  // Creating a new portal & appending to root
  useEffect(() => {
    if (!portalRef.current) {
      portalRef.current = document.createElement("div");
      portalRef.current.id = "modal-root";

      {
        /* Append portal to body*/
      }
      document.body.appendChild(portalRef.current);
    }
  }, []);

  // handling open and close of modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileModalRef.current &&
        !profileModalRef.current.contains(event.target as Node)
      ) {
        onOpenChange(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden"; // Disable scrolling when sidebar is open
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, onOpenChange]);

  if (!portalRef.current) return null;

  return createPortal(
    <motion.section
      ref={profileModalRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: open ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      className={` p-4 border border-red-700  bg-white/70 dark:bg-black z-50 flex flex-col gap-y-1 rounded-md ${className}`}
    >
      <div className=" bg-white w-4 h-4 absolute -top-4 left-1/3" />

      <Link href={"/profile"} className=" cursor-pointer hover:bg-black/80">
        My Profile
      </Link>
      <div
        onClick={logout}
        className=" flex items-center gap-x-1 cursor-pointer"
      >
        {isLoggedIn ? "Logout" : "Login"}
      </div>
    </motion.section>,
    document.getElementById("modal-root") as HTMLElement
  );
};
export default Modal;
