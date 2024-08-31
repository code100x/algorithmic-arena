// This is the root layout component for your Next.js app.
// Learn more: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required

import localFont from "next/font/local";
import { Appbar } from "../components/Appbar";
import { Footer } from "../components/Footer";
import { Providers, ThemeProvider } from "../providers";
import "./globals.css";
import next from "next";
import { cn } from "@repo/common/utils";

const satoshi = localFont({
  src: [
    {
      path: "../public/fonts/satoshi.ttf",
    },
  ],
  variable: "--font-satoshi",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body
        className={cn(
          "bg-background font-satoshi antialiased min-h-screen",
          satoshi.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            <Appbar />
            {children}
            <Footer />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
