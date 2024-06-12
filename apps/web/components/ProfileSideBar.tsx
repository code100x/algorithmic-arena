"use client";
import { UserRound } from "lucide-react";
import UserImage from "./UserImage";
import { useSession } from "next-auth/react";
import ProfileOptions from "./ProfileOptions";

export function ProfileSideBar() {
  const session = useSession();
  const user = session.data?.user;
  return (
    <div className="w-full">
      <div>
        <div className=" text-center flex flex-col items-center justify-center">
          <div className=" mb-4 ">
            {!user?.image ? (
              <div className="p-1  flex items-center justify-center w-full border-2 rounded-full dark:border-[#ffffffab] border-[#1a1a1a]">
                <UserRound size={55} />
              </div>
            ) : (
              <UserImage image={user?.image} />
            )}
          </div>
          <div className="font-bold text-lg">{user?.name}</div>
          <div className="text-xs text-gray-400">{user?.email}</div>
        </div>

        <div className="my-6 w-full"></div>

        <ProfileOptions />
      </div>
    </div>
  );
}
