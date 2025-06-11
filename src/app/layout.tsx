import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import Navbar from "@/components/Navbar";

import "./globals.css";


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
})

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
      <body className={poppins.className}>
        {/* <div id="sidebar-root"></div> */}
        <Navbar />
        {children}
      </body>
    </html>
  );
}
