"use client";

import React, { FC, useState, useRef, useEffect } from "react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@repo/ui/button";
import { ModeToggle } from "./ModeToggle";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  LogOut,
  User,
  Bookmark,
  Code,
  Trophy,
  BarChart2,
  X,
  Menu,
  LayoutDashboard,
  Users,
} from "lucide-react";

interface NavItemProps {
  icon?: React.ElementType;
  label: string;
  href: string;
  onClick?: () => void;
}

const NavItem: FC<NavItemProps> = ({ icon: Icon, label, href, onClick }) => (
  <Link
    href={href}
    onClick={onClick}
    className={`flex font-medium items-center w-[250px] gap-4 h-10 px-4 py-2 ${label === "Logout" ? "text-red-500" : "text-black dark:text-gray-50"}`}
  >
    {/* <Icon className="w-5 h-5 mr-3" /> */}
    {label}
  </Link>
);

export function Appbar() {
  const { data: session, status: sessionStatus } = useSession();
  const isLoading = sessionStatus === "loading";
  const router = useRouter();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Add this state to simulate admin status (replace with actual admin check)
  const [isAdmin, setIsAdmin] = useState(true);

  const handleMenuToggle = () => setMenuOpen(!isMenuOpen);
  const handleProfileClick = () => setDropdownVisible(!isDropdownVisible);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navItems = [
    { icon: Code, label: "Problems", href: "/problems" },
    { icon: Trophy, label: "Contest", href: "/contests" },
    { icon: BarChart2, label: "Leaderboard", href: "/leaderboard" },
    { icon: Bookmark, label: "Bookmarks", href: "/bookmarks" },
  ];

  const adminNavItems = [
    { label: "Dashboard", href: "/admin" },
    { label: "Problems", href: "/admin/problems" },
    { label: "Contests", href: "/admin/contests" },
    { label: "Users", href: "/admin/users" },
  ];

  // const adminNavItems = [
  //   { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  //   { icon: Code, label: "Problems", href: "/admin/problems" },
  //   { icon: Trophy, label: "Contests", href: "/admin/contests" },
  //   { icon: Users, label: "Users", href: "/admin/users" },
  // ];

  const dropdownItems = [
    { icon: User, label: "View Profile", href: "/profile" },
    { icon: Bookmark, label: "Bookmarks", href: "/bookmarks" },
    { icon: LogOut, label: "Logout", href: "#", onClick: () => signOut() },
  ];

  return (
    <header className="dark:bg-primary-foreground bg-white text-black dark:text-white border-b ">
      {/* Mobile View */}
      <div className="md:hidden flex flex-col items-center p-4 w-full">
        <div className="w-full flex justify-between items-center mb-4">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.svg" width={40} height={40} alt="logo" />
            <div>
              <div className="text-lg font-bold">algorithmic</div>
              <div className="text-blue-500">arena</div>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <ModeToggle />
            <Button
              onClick={handleMenuToggle}
              className="text-black dark:text-white bg-primary-foreground border"
            >
              {!isMenuOpen && <Menu />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {isMenuOpen && (
        <div className="fixed inset-0 w-72 bg-white dark:bg-primary-foreground z-50 md:hidden">
          <div className="flex flex-col h-full">
            <div className="flex flex-row justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
              <Link href="/" className="flex flex-row items-center gap-2">
                <Image src="/logo.svg" width={40} height={40} alt="logo" />
                <div>
                  <div className="text-lg font-bold">algorithmic</div>
                  <div className="text-blue-500">arena</div>
                </div>
              </Link>
              <Button
                onClick={handleMenuToggle}
                className="text-black dark:bg-primary-foreground bg-white dark:text-white border"
              >
                <X />
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {session?.user ? (
                <>
                  <div className="p-4 dark:border-gray-700 flex flex-row items-center">
                    <Image
                      src="/Avatar.png"
                      alt="Profile"
                      width={40}
                      height={40}
                      className="rounded-full mr-2"
                    />
                    <div>
                      <div className="font-medium">Harkirat Singh</div>
                      <div className="text-sm text-blue-500">
                        harkirat96@gmail.com
                      </div>
                    </div>
                  </div>
                  <nav className="py-4 text-black dark:text-white ">
                    {isAdmin
                      ? adminNavItems.map((item, index) => (
                          <NavItem key={index} {...item} />
                        ))
                      : navItems.map((item, index) => (
                          <NavItem key={index} {...item} />
                        ))}
                    <div className="border-t border-grey-400">
                      <NavItem icon={User} label="Profile" href="#" />
                      <NavItem
                        icon={LogOut}
                        label="Logout"
                        href="#"
                        onClick={() => signOut()}
                      />
                    </div>
                  </nav>
                </>
              ) : (
                <div className="p-4 space-y-4">
                  <Button
                    onClick={() => router.push("/signup")}
                    className="w-full bg-blue-600 text-white"
                  >
                    Sign up now
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => router.push("/login")}
                    className="w-full text-black dark:text-white border-gray-300 dark:border-gray-600"
                  >
                    Login
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Desktop View */}
      <div className="hidden md:flex justify-between items-center px-6 py-3">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="logo" width={40} height={40} />
          <div>
            <div className="text-lg font-bold">algorithmic</div>
            <div className="text-blue-500">arena</div>
          </div>
        </Link>
        {!isLoading && session?.user && (
          <div className="flex items-center gap-6">
            {isAdmin ? (
              // Admin Navbar
              <>
                {adminNavItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="text-black dark:text-white font-medium hover:text-blue-500 dark:hover:text-blue-400 flex items-center gap-2"
                  >
                    {/* <item.icon className="w-5 h-5" /> */}
                    {item.label}
                  </Link>
                ))}
              </>
            ) : (
              // Regular User Navbar
              <>
                {navItems.slice(0, 3).map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="text-black dark:text-white font-medium hover:text-blue-500 dark:hover:text-blue-400"
                  >
                    {item.label}
                  </Link>
                ))}
              </>
            )}
            <ModeToggle />
            <div className="relative">
              <Image
                src="/Avatar.png"
                alt="avatar"
                width={40}
                height={40}
                className="rounded-full cursor-pointer"
                onClick={handleProfileClick}
              />
              {isDropdownVisible && (
                <div
                  ref={dropdownRef}
                  className="absolute right-0 mt-2 w-48 bg-white dark:bg-primary-foreground rounded-md shadow-lg z-50"
                >
                  {dropdownItems.map((item, index) => (
                    <NavItem key={index} {...item} />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
        {!isLoading && !session?.user && (
          <div className="flex items-center gap-4">
            <Button onClick={() => signIn()}>Sign in</Button>
            <ModeToggle />
            <Button
              variant="outline"
              onClick={() => router.push("/login")}
              className="text-black dark:text-white border-gray-300 dark:border-gray-600"
            >
              Login
            </Button>
            <Button
              onClick={() => router.push("/signup")}
              className="bg-blue-600 text-white"
            >
              Sign Up Now
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
