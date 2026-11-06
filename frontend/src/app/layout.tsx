import { QueryProvider } from "@/components/shared/QueryProvider";
import { ThemeProvider } from "@/components/shared/ThemeProvider";
import { Toaster } from "@/components/ui/toast";
import { estedad } from "@/lib/fonts";
import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import { ViewTransition } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "اخبار رحق", template: "%s | رحق" },
  description: "آخرین اخبار، رویدادها و اطلاعیه‌های رحق و شهرستان کاشان",
  applicationName: "اخبار رحق",
  openGraph: {
    type: "website",
    locale: "fa_IR",
    siteName: "اخبار رحق",
    title: "اخبار رحق | اخبار رحق و کاشان",
    description: "مرجع اخبار و اطلاع رسانی رحق و کاشان",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className={`${estedad.variable} font-sans min-h-screen`}>
        <NextTopLoader
          color="#be2038"
          speed={200}
          showSpinner={false}
          shadow="0 0 10px #be2038,0 0 5px #be2038"
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <Toaster />
            <ViewTransition>{children}</ViewTransition>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
