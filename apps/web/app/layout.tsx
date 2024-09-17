// This is the root layout component for your Next.js app.
// Learn more: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required
"use client"

import { Chivo } from "next/font/google";
import { Rubik } from "next/font/google";
import { usePathname } from "next/navigation";
import "./globals.css";
import { Appbar } from "../components/Appbar";
import { Footer } from "../components/Footer";
import { Providers, ThemeProvider } from "../providers";

const chivo = Chivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-chivo",
});
const rubik = Rubik({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-rubik",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const pathname = usePathname(); 

  const excludedPaths = ["/404", "/login", "/reset-password", "/forgot-password" , "/signup","/signup/complete-profile", "/signup/verify-otp",];

  return (
    <html lang="en">
      <body className={chivo.variable + " " + rubik.variable}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            {/* Conditionally render the Appbar and Footer */}
            {!excludedPaths.includes(pathname) && <Appbar />}
            {children}
            {!excludedPaths.includes(pathname) && <Footer />}
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
