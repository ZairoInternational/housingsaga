import type { Metadata } from "next";

import "../globals.css";

export const metadata: Metadata = {
  title: "Manage Your Properties",
  description: "Private owner access for HousingSaga property listings.",
  robots: { index: false, follow: false },
};

export default function OwnerPortalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="referrer" content="no-referrer" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
        <style>{`
          @keyframes owner-rise {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: none; }
          }
          .owner-rise { animation: owner-rise 0.45s ease both; }
          @media (prefers-reduced-motion: reduce) {
            .owner-rise { animation: none; }
          }
        `}</style>
      </head>
      <body
        className="min-h-dvh overflow-x-hidden bg-[#f4fbf7] text-[#1c1917] antialiased"
        style={{ fontFamily: '"Open Sans", sans-serif' }}
      >
        {children}
      </body>
    </html>
  );
}
