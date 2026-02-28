"use client";

import React from "react";

type SocialButtonProps = {
  children: React.ReactNode;
  delay?: string;
};

export default function SocialButton({
  children,
  delay = "",
}: SocialButtonProps) {
  return (
    <div
      className={`
        transform opacity-0 -translate-y-6
        group-hover:opacity-100
        group-hover:translate-y-0
        transition-all duration-500 ease-out
        ${delay}
      `}
    >
      <button className="w-9 h-9 rounded-md bg-white flex items-center justify-center shadow hover:bg-lime-400 transition text-black">
        {children}
      </button>
    </div>
  );
}
