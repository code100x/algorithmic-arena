import React from "react";
import UserDetailForm from "./UserDetailForm";
import { ProfileSideBar } from "./ProfileSideBar";
import { getServerSession } from "next-auth";
import { authOptions } from "../app/lib/auth";

export async function Profile() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 w-full p-5">
      <div className="lg:col-span-3 p-5 dark:bg-slate-900 rounded-lg px-6 py-3 shadow-2xl shadow-shadow-500 hidden lg:block">
        <ProfileSideBar />
      </div>
      <div className="lg:col-span-9 dark:bg-slate-900 rounded-lg px-6 py-3 shadow-2xl shadow-shadow-500">
        <UserDetailForm user={user} />
      </div>
    </div>
  );
}
