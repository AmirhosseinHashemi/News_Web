import { QueryProvider } from "@/components/shared/QueryProvider";
import { ThemeProvider } from "@/components/shared/ThemeProvider";
import { Toaster } from "@/components/ui/toast";
import { estedad } from "@/lib/fonts";
import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";
import { ViewTransition } from "react";

export const metadata: Metadata = {
  title: { default: "اخبار رحق", template: "%s | رحق" },
  description: "آخرین اخبار ایران و جهان",
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
