import type { Metadata } from "next";
// import { Poppins } from "next/font/google";

import "../globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
import ClientProviders from "@/components/ClientProviders";

// const poppins = Poppins({
//   subsets: ["latin"],
//   weight: ["300", "400", "500", "600", "700", "800", "900"],
// })

export const metadata: Metadata = {
  title: "Housing Saga",
  description: "Get your dream home",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=location_on"
        />
      </head>
      <body>
        {/* Client-side providers mounted here */}
        <Navbar />
        <ClientProviders>
          {children}
          <Footer />
          <Toaster position="top-right" />
        </ClientProviders>
      </body>
    </html>
  );
}
