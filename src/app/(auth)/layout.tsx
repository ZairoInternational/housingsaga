import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";

import "../globals.css";
import { Toaster } from "react-hot-toast";
import AuthChrome from "@/components/i18n/AuthChrome";
import IntlProvider from "@/components/i18n/IntlProvider";

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
      <body>
        <IntlProvider>
          <AuthChrome>{children}</AuthChrome>
          <Toaster position="top-right" />
        </IntlProvider>
      </body>
    </html>
  );
}
