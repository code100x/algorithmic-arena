"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import { Button } from "@repo/ui/button";
import { CodeIcon } from "./Icon";
import { ModeToggle } from "./ModeToggle";
import UserContextMenu from "./UserContextMenu";
import { usePathname } from "next/navigation";
import { cn } from "../../../packages/ui/src/@/lib/utils";

export function Appbar({ className }: { className?: string }) {
  const pathname = usePathname();
  const { data: session, status: sessionStatus } = useSession();
  const isLoading = sessionStatus === "loading";

  const links: { name: string; href: string }[] = [
    {
      name: "Contests",
      href: "/contests",
    },
    {
      name: "Problems",
      href: "/problems",
    },
    {
      name: "Standings",
      href: "/standings",
    },
  ];

  return (
    <header
      className={cn(
        `px-4 md:px-6 py-3 flex items-center justify-between border-b ${className}`
      )}
    >
      <Link href="/" className="flex items-center gap-2" prefetch={false}>
        <CodeIcon className="h-6 w-6" />
        <span className="text-lg font-bold">Code100x</span>
      </Link>
      <nav className="hidden md:flex items-center gap-6">
        {links.map((link, index) => (
          <Link
            href={link.href}
            key={index}
            className={`hover:underline ${pathname === link.href ? "text-primary font-medium" : "text-muted-foreground"}`}
            prefetch={false}
          >
            {link.name}
          </Link>
        ))}
      </nav>
      {!isLoading && session?.user && (
        <div className="flex items-center gap-4">
          <ModeToggle />
          <UserContextMenu session={session} />
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
