import type { Metadata } from "next";
// import { Poppins } from "next/font/google";
import { getLocale, getTranslations } from "next-intl/server";

import "../globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
import ClientProviders from "@/components/ClientProviders";
import ProjectsRouteProgress from "@/components/projects/ProjectsRouteProgress";
import IntlProvider from "@/components/i18n/IntlProvider";
import Link from "next/link";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("meta");
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <head>
        <Link rel="preconnect" href="https://fonts.googleapis.com" />
        <Link
          rel="preconnect"
          href="https://fonts.gstatic.com"
           as="link"
        />
        <Link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
        <Link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=location_on"
        />
      </head>
      <body>
        <IntlProvider>
          <ClientProviders>
            <Navbar />
            {children}
            <Footer />
            <Toaster position="top-right" />
            <ProjectsRouteProgress />
          </ClientProviders>
        </IntlProvider>
      </body>
    </html>
  );
}
