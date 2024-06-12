import React from "react";
import UserDetailForm from "./UserDetailForm";
import { ProfileSideBar } from "./ProfileSideBar";
import { getServerSession } from "next-auth";
import { authOptions } from "../app/lib/auth";

export async function Profile() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  return (
    <div className="flex flex-col lg:flex-row w-full">
      <div className="hidden lg:block lg:w-3/12 mt-10 mx-5 p-5  dark:bg-slate-900 rounded-lg">
        <ProfileSideBar />
      </div>
      <div className="w-full lg:w-9/12 mt-10 mx-5 p-5 dark:bg-slate-900 rounded-lg">
        <UserDetailForm user={user} />
      </div>
    </div>
  );
}
