// This is the root layout component for your Next.js app.
// Learn more: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required

import { cn } from "@repo/common/utils";
import localFont from "next/font/local";
import { Appbar } from "../components/Appbar";
import { Footer } from "../components/Footer";
import { Providers, ThemeProvider } from "../providers";
import "./globals.css";

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
            <div className="flex flex-col min-h-screen ">
              <Appbar className="sticky top-0 bg-background z-10" />
              <main className="flex-1 grid">{children}</main>
              <Footer />
            </div>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
