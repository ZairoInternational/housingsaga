"use client";

import React from "react";

type SocialButtonProps = {
  children: React.ReactNode;
  delay?: string;
  href: string;
  label: string;
};

export default function SocialButton({
  children,
  delay = "",
  href,
  label,
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
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="w-9 h-9 rounded-md bg-white flex items-center justify-center shadow hover:bg-lime-400 transition text-black"
      >
        {children}
      </a>
    </div>
  );
}
