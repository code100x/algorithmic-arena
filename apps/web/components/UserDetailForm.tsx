import React from "react";
import UserImage from "./UserImage";
import { User } from "@prisma/client";
import { Input } from "../../../packages/ui/src/@/components/ui/Input";
import { Label } from "@repo/ui/label";
import { UserRound } from "lucide-react";

export default function UserDetailForm({ user }: { user: User }) {
  return (
    <form className="flex flex-col gap-4">
      <Label className="mb-2">Profile Picture</Label>
      <div className="flex items-center justify-center">
        <div className="!w-[6rem] !h-[6rem] flex items-center  p-[0.2rem] justify-center ">
          {!user?.image ? (
            <div className="p-1 h-full flex items-center justify-center w-full border-2 rounded-full dark:border-[#ffffffab] border-[#1a1a1a]">
              <UserRound size={55} />
            </div>
          ) : (
            <UserImage image={user?.image}  />
          )}
        </div>
      </div>

      <div>
        <Label className="">Your name</Label>
        <Input
          disabled
          placeholder="Enter your name"
          value={user?.name ? user?.name : ""}
          className="p-2 mt-2"
        />
      </div>
      <div>
        <Label className="">Your Email</Label>
        <Input
          disabled
          placeholder="Enter your name"
          value={user?.email ? user?.email : ""}
          className="p-2 mt-2"
        />
      </div>
    </form>
  );
}
