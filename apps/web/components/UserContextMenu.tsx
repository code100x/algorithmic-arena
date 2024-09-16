import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui/dropdown-menu";
import { Session } from "next-auth";
import Link from "next/link";
import { User } from "lucide-react";
import { signOut } from "next-auth/react";

const UserContextMenu = ({ session }: { session: Session }) => {
  console.log(session.user);
  const { user } = session;
  if (!user) return null;
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="rounded-full bg-muted  p-2">
          <User size={18} />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link href="/dashboard">Settings</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              signOut();
            }}
          >
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserContextMenu;
