"use client";

import { Chivo, Rubik } from "next/font/google";
import { ThemeProvider } from "../providers";
import { Appbar } from "../components/Appbar";
import { Footer } from "../components/Footer";
import { usePathname } from "next/navigation";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

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

  const excludedPaths = [
    "/login",
    "/reset-password",
    "/forgot-password",
    "/signup",
    "/signup/complete-profile",
    "/signup/verify-otp",
  ];

  return (
    <html lang="en">
      <body className={`${chivo.variable} ${rubik.variable}`}>
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {!excludedPaths.includes(pathname) && <Appbar />}
            {children}
            {!excludedPaths.includes(pathname) && <Footer />}
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
