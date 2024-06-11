"use client";
import * as React from "react";
import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import "react-toastify/dist/ReactToastify.css";

export const Providers = ({ children }: { children: ReactNode }) => {
  const contextClass = {
    success: "bg-blue-600",
    error: "bg-red-600",
    info: "bg-gray-600",
    warning: "bg-orange-400",
    default: "bg-indigo-600",
    dark: "bg-white-600 font-gray-300",
  };

  return (
    <SessionProvider>
      <ToastContainer
        // toastClassName={(context) =>
        //   contextClass[context?.type || "default"] +
        //   " relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer"
        // }
        // bodyClassName={() => "text-sm font-white font-med block p-3"}
        position="top-right"
        autoClose={3000}
      />
      {children}
    </SessionProvider>
  );
};

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
