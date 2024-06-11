"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import { Button } from "@repo/ui/button";
import { CodeIcon } from "./Icon";
import { ModeToggle } from "./ModeToggle";
export function Appbar() {
  const { data: session, status: sessionStatus } = useSession();
  const isLoading = sessionStatus === "loading";

  return (
    <header className="bg-gray-900 text-white px-4 md:px-6 py-3 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2" prefetch={false}>
        <CodeIcon className="h-6 w-6" />
        <span className="text-lg font-bold">Code100x</span>
      </Link>
      <nav className="hidden md:flex items-center gap-6">
        <Link href="/contests" className="hover:underline" prefetch={false}>
          Contests
        </Link>
        <Link href="/problems" className="hover:underline" prefetch={false}>
          Problems
        </Link>
        <Link href="/standings" className="hover:underline" prefetch={false}>
          Standings
        </Link>
      </nav>
      {!isLoading && session?.user && (
        <div className="flex items-center gap-4">
          <ModeToggle />
          <Button onClick={() => signOut()}>Logout</Button>
        </div>
      )}

      {!isLoading && !session?.user && (
        <div className="flex items-center gap-4">
        <ModeToggle />
        <Button onClick={() => signIn()}>Sign in</Button>
        </div>
      
      )}

      {isLoading && <div className="flex items-center gap-4"></div>}
    </header>
  );
}
