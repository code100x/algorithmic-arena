"use client";
import { Button } from "@repo/ui/button";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SettingAsideBar = () => {
  const pathname = usePathname();
  const links = [
    {
      name: "Manage Profile",
      href: "/user/profile-settings",
    },
  ];
  return (
    <div className="space-y-3">
      {links.map((link, index) => (
        <Link
          href={link.href}
          key={index}
          className={`block p-2 hover:bg-muted duration-300 rounded-md font-medium text-sm  ${pathname === link.href ? "bg-muted" : ""}`}
        >
          {link.name}
        </Link>
      ))}
      <Button
        onClick={() => {
          signOut();
        }}
        className="text-red-500 w-full  bg-background hover:bg-red-500 hover:text-white duration-300 text-left flex gap-1 justify-start"
      >
        <LogOut size={16} />
        Logout
      </Button>
    </div>
  );
};

export default SettingAsideBar;
