'use client';
import * as React from 'react';
import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
       {children}
    </SessionProvider>
  );
};