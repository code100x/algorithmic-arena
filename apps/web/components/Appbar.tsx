"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import { Button } from "@repo/ui/button";
import { ModeToggle } from "./ModeToggle";
import logo from "../public/logo.svg";
import Avatar from "../public/Avatar.svg";
import Image from "next/image";
export function Appbar() {
  const { data: session, status: sessionStatus } = useSession();
  const isLoading = sessionStatus === "loading";
  return (
    <header className="bg-background border-b border-gray-800 text-white px-4 md:px-6 py-3 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2" prefetch={false}>
        <Image src={logo} alt="Code100x" />
        <div className="text-sm font-bold">
          <div className="text-foreground">algorithmic</div>
          <div className="text-primary">arena</div>
        </div>
      </Link>
      <div className="flex items-center gap-4">
        {!isLoading && session?.user && (
          <>
            <nav className="hidden text-foreground md:flex items-center gap-6 mx-5">
              <Link href="/contests" className="opacity-80 hover:underline" prefetch={false}>
                Contests
              </Link>
              <Link href="/problems" className="opacity-80 hover:underline" prefetch={false}>
                Problems
              </Link>
              <Link href="/standings" className="opacity-80 hover:underline" prefetch={false}>
                Standings
              </Link>
            </nav>
            <div className="flex items-center gap-4">
              <Image className="hidden md:flex" src={Avatar} alt="avatar" />
              <div className="border md:hidden border-gray-800 p-3 rounded-lg">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M2 8.00065C2 7.63246 2.29848 7.33398 2.66667 7.33398H13.3333C13.7015 7.33398 14 7.63246 14 8.00065C14 8.36884 13.7015 8.66732 13.3333 8.66732H2.66667C2.29848 8.66732 2 8.36884 2 8.00065Z" fill="#94A3B8" />
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M2 4.00065C2 3.63246 2.29848 3.33398 2.66667 3.33398H13.3333C13.7015 3.33398 14 3.63246 14 4.00065C14 4.36884 13.7015 4.66732 13.3333 4.66732H2.66667C2.29848 4.66732 2 4.36884 2 4.00065Z" fill="#94A3B8" />
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M2 12.0007C2 11.6325 2.29848 11.334 2.66667 11.334H13.3333C13.7015 11.334 14 11.6325 14 12.0007C14 12.3688 13.7015 12.6673 13.3333 12.6673H2.66667C2.29848 12.6673 2 12.3688 2 12.0007Z" fill="#94A3B8" />
                </svg>
              </div>
              <ModeToggle />
            </div>
          </>
        )}

        {!isLoading && !session?.user && (
          <div className="flex items-center gap-4">
            <div className="border md:hidden border-gray-800 p-3 rounded-lg">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M2 8.00065C2 7.63246 2.29848 7.33398 2.66667 7.33398H13.3333C13.7015 7.33398 14 7.63246 14 8.00065C14 8.36884 13.7015 8.66732 13.3333 8.66732H2.66667C2.29848 8.66732 2 8.36884 2 8.00065Z" fill="#94A3B8" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M2 4.00065C2 3.63246 2.29848 3.33398 2.66667 3.33398H13.3333C13.7015 3.33398 14 3.63246 14 4.00065C14 4.36884 13.7015 4.66732 13.3333 4.66732H2.66667C2.29848 4.66732 2 4.36884 2 4.00065Z" fill="#94A3B8" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M2 12.0007C2 11.6325 2.29848 11.334 2.66667 11.334H13.3333C13.7015 11.334 14 11.6325 14 12.0007C14 12.3688 13.7015 12.6673 13.3333 12.6673H2.66667C2.29848 12.6673 2 12.3688 2 12.0007Z" fill="#94A3B8" />
              </svg>
            </div>
            <ModeToggle />
            <Button className="hidden md:flex text-white" onClick={() => signIn()}>Sign Up Now</Button>
          </div>

        )}

      </div>
      {isLoading && <div className="flex items-center gap-4"></div>}
    </header>
  );
}
