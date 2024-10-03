"use client";

import { useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import { Button } from "@repo/ui/button";
import { ModeToggle } from "./ModeToggle";
import UserContextMenu from "./UserContextMenu";
import { usePathname } from "next/navigation";
import { cn } from "../../../packages/ui/src/@/lib/utils";

export function Appbar({ className }: { className?: string }) {
  const pathname = usePathname();
  const { data: session, status: sessionStatus } = useSession();
  const isLoading = sessionStatus === "loading";

  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    {
      name: "Roadmap",
      href: "/roadmap",
    },
  ];

  return (
    <header
      className={cn(
        `px-4 md:px-6 py-3 flex items-center justify-between border-b ${className}`
      )}
    >
      <Link href="/" className="flex items-center gap-2" prefetch={false}>
        <img
          className="hidden dark:block"
          src="/App-logo-light.svg"
          alt="Light mode hero image"
        />
        <img
          className="block dark:hidden"
          src="/App-logo-dark.svg"
          alt="Dark mode hero image"
        />
      </Link>

      {/* Hamburger Menu Button */}
      <button
        className="md:hidden text-primary"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <div className="space-y-1">
          <span className="block w-6 h-0.5 bg-current"></span>
          <span className="block w-6 h-0.5 bg-current"></span>
          <span className="block w-6 h-0.5 bg-current"></span>
        </div>
      </button>

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

      {/* Desktop Session and Toggle */}
      {!isLoading && session?.user && (
        <div className="hidden md:flex items-center gap-4">
          <ModeToggle />
          <UserContextMenu session={session} />
        </div>
      )}

      {!isLoading && !session?.user && (
        <div className="hidden md:flex items-center gap-4">
          <ModeToggle />
          <Button onClick={() => signIn()}>Sign in</Button>
        </div>
      )}

      {isLoading && <div className="flex items-center gap-4"></div>}

      {/* Mobile Menu (Dropdown) */}
      {isMenuOpen && (
        <nav className="absolute top-14 left-0 w-full bg-white dark:bg-gray-900 flex flex-col items-center gap-4 p-4 md:hidden">
          {links.map((link, index) => (
            <Link
              href={link.href}
              key={index}
              className={`w-full text-center py-2 border-b ${pathname === link.href ? "text-primary font-medium" : "text-muted-foreground"}`}
              prefetch={false}
              onClick={() => setIsMenuOpen(false)} // Close menu after link click
            >
              {link.name}
            </Link>
          ))}

          {/* Mobile Session and Toggle */}
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
        </nav>
      )}
    </header>
  );
}
